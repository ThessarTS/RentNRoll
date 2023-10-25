const { Order, Vehicle, User, Review, Balance, UserProfile } = require("../models/index");
const midtransClient = require("midtrans-client");
const { Sequelize } = require("sequelize");
const redis = require("../helpers/redis");
const totalDayConverter = require("../helpers/totalDayConverter");

class OrderController {
    static async findAllOrder(req, res, next) {
        try {
            // let userOrders = await redis.get("userOrderFinalProject:" + req.user.id);
            // if (!userOrders) {
            let orders = await Order.findAll({
                where: {
                    UserId: req.user.id,
                },
                include: [
                    {
                        model: Vehicle,
                        include: [
                            {
                                model: User,
                                attributes: { exclude: ["password"] },
                            },
                        ],
                    },
                    {
                        model: User,
                        attributes: { exclude: ["password"] },
                    },
                ],
            });
            if (orders.length == 0) {
                throw { name: 'not_found' }
            }
            //     await redis.set("userOrderFinalProject:" + req.user.id, JSON.stringify(orders))
            //     userOrders = orders
            // } else {
            //     userOrders = JSON.parse(userOrders)
            // }
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    static async findOrderById(req, res, next) {
        try {
            const { id } = req.params;
            // let dataOrder = await redis.get("orderDetailFinalProject:" + id);
            // if (!dataOrder) {
            let order = await Order.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: Vehicle,
                        include: [
                            {
                                model: User,
                                attributes: { exclude: ["password"] },
                            },
                        ],
                    },
                    {
                        model: User,
                        attributes: { exclude: ["password"] },
                    },
                ],
            });
            if (!order) {
                throw { name: "not_found" };
            }
            //     await redis.set("orderDetailFinalProject:" + id, JSON.stringify(order))
            //     dataOrder = order;
            // } else {
            //     dataOrder = JSON.parse(dataOrder)
            // }
            res.json(order);
        } catch (error) {
            next(error);
        }
    }

    static async createOrder(req, res, next) {
        try {
            const { VehicleId } = req.params;
            const { startDate, endDate } = req.body;
            let vehicle = await Vehicle.findByPk(VehicleId);
            if (!vehicle) {
                throw { name: "not_found" };
            }
            if (vehicle.UserId == req.user.id) {
                throw { name: "same-user" };
            }
            let profile = await UserProfile.findOne({
                where: { UserId: req.user.id }
            })

            if (vehicle.CategoryId == 1 && !profile.simA) {
                throw { name: 'sim_a_null' }
            }
            if (vehicle.CategoryId == 2 && !profile.simC) {
                throw { name: 'sim_c_null' }
            }
            const totalDay = totalDayConverter(startDate, endDate);
            const totalPrice = totalDay * vehicle.price;
            let newOrder = await Order.create({
                VehicleId,
                startDate,
                endDate,
                UserId: req.user.id,
                ownerId: vehicle.UserId,
                totalPrice,
                status: 'pending'
            });
            await redis.del("userOrderFinalProject:")
            res.status(201).json(newOrder);
        } catch (error) {
            next(error);
        }
    }

    static async updateOrderStatus(req, res, next) {
        try {
            let status = ''
            let id = ''
            if (req.body.order_id) {
                status = 'ongoing'
                id = req.body.order_id
            } else {
                status = req.body.status
                id = req.params.id
            }

            const findOrder = await Order.findByPk(id);
            if (!findOrder) {
                throw { name: "not_found" };
            }
            await Order.update(
                { status },
                {
                    where: { id },
                }
            );
            if (status === "returned") {
                await Balance.create({ OrderId: id, UserId: findOrder.ownerId, amount: findOrder.totalPrice });
            }
            // await redis.del("orderDetailFinalProject:" + id);
            // await redis.del("userOrderFinalProject:" + req.user.id);
            // await redis.del("vehicleOrderFinalProject");
            // await redis.del("trendingDataFinalProject");
            res.json({ message: `Order status updated to ${status}` });
        } catch (error) {
            next(error);
        }
    }

    static async findAllOrderByVehicle(req, res, next) {
        try {
            const { vehicleid } = req.params;
            // let dataOrder = await redis.get(`order/vehicle/${vehicleid}`)
            // if (!dataOrder) {
            let vehicle = await Vehicle.findByPk(vehicleid);

            if (!vehicle) {
                throw { name: "not_found" };
            }

            let orders = await Order.findAll({
                where: {
                    VehicleId: req.params.vehicleid,
                },
                include: [
                    {
                        model: Vehicle,
                        include: [
                            {
                                model: User,
                                attributes: { exclude: ["password"] },
                            },
                        ],
                    },
                    {
                        model: User,
                        attributes: { exclude: ["password"] },
                    },
                ],
            });
            //     dataOrder = orders;
            //     await redis.set(`order/vehicle/${vehicleid}`, JSON.stringify(orders))
            // } else {
            //     dataOrder = JSON.parse(dataOrder)
            // }
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    static async fetchTrending(req, res, next) {
        try {
            let trendingData //= await redis.get("trendingDataFinalProject");
            // if (!trendingData) {
            let results = await Order.findAll({
                attributes: ["VehicleId", [Sequelize.fn("COUNT", "VehicleId"), "orderCount"]],
                where: { status: "returned" },
                group: ["VehicleId"],
                order: [[Sequelize.fn("COUNT", "VehicleId"), "DESC"]],
                limit: 7,
            });

            if (results.length > 0) {
                let mostOrderedVehicleIds = results.map((result) => result.getDataValue("VehicleId"));
                let mostOrderedVehicles = await Vehicle.findAll({
                    where: { id: mostOrderedVehicleIds },
                    include: [Review, Order],
                });

                let vehicleResults = [];

                for (let vehicle of mostOrderedVehicles) {
                    let { name, image, price, Reviews, Orders, location, id } = vehicle;
                    let totalReviews = Reviews.length;
                    let averageRating = totalReviews > 0 ? Reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;
                    let vehicleInfo = {
                        id,
                        name,
                        image,
                        location,
                        price,
                        totalReviews,
                        averageRating: averageRating.toFixed(1),
                        totalOrders: Orders.length,
                        Order: Orders,
                    };
                    vehicleResults.push(vehicleInfo);
                }
                trendingData = vehicleResults;
                // await redis.set('trendingDataFinalProject', JSON.stringify(trendingData))
            } else {
                throw { name: "No vehicle with status returned" };
            }
            // } else {
            //     trendingData = JSON.parse(trendingData)
            // }
            res.json(trendingData);
        } catch (error) {
            next(error);
        }
    }

    static async midtransToken(req, res, next) {
        try {
            let findOrder = await Order.findByPk(req.params.orderId);
            if (!findOrder) {
                throw { name: "not_found" };
            }

            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
            });

            let parameter = {
                transaction_details: {
                    order_id: req.params.orderId,
                    gross_amount: findOrder.totalPrice,
                },
                credit_card: {
                    secure: true,
                },
                customer_details: {
                    first_name: req.user.username,
                    email: req.user.email,
                },
            };

            const midtransToken = await snap.createTransaction(parameter);
            res.status(201).json(midtransToken);
        } catch (error) {
            next(error);
        }
    }

    static async findAllOrderByOwner(req, res, next) {
        try {

            // let ownerOrders = await redis.get("ownerOrderFinalProject:" + req.user.id);
            // if (!ownerOrders) {
            let orders = await Order.findAll({
                where: {
                    ownerId: req.user.id,
                },
                include: [
                    {
                        model: Vehicle,
                        include: [
                            {
                                model: User,
                                attributes: { exclude: ["password"] },
                            },
                        ],
                    },
                    {
                        model: User,
                        attributes: { exclude: ["password"] },
                    },
                ],
            });
            if (orders.length == 0) {
                throw { name: "not_found" };
            }
            //     ownerOrders = orders;
            //     await redis.set('ownerOrderFinalProject:', JSON.stringify(orders))
            // } else {
            //     ownerOrders = JSON.parse(ownerOrders);
            // }
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OrderController;
