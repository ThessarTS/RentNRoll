const { Order, Vehicle, User, Review } = require("../models/index");
const midtransClient = require("midtrans-client");
const { Sequelize } = require("sequelize");

class OrderController {
    static async findAllOrder(req, res, next) {
        try {
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
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    static async findOrderById(req, res, next) {
        try {
            let order = await Order.findOne({
                where: {
                    id: req.params.id,
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
            res.json(order);
        } catch (error) {
            next(error);
        }
    }

    static async createOrder(req, res, next) {
        try {
            const { VehicleId, startDate, endDate } = req.body;

            let vehicle = await Vehicle.findByPk(VehicleId);
            if (!vehicle) {
                throw { name: "not_found" };
            }
            if (vehicle.UserId == req.user.id) {
                throw { name: "same-user" };
            }
            await Order.create({
                VehicleId,
                startDate,
                endDate,
                UserId: req.user.id,
                ownerId: vehicle.UserId,
            });
            res.status(201).json({ message: "Success create new order" });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async updateOrderStatus(req, res, next) {
        try {
            const id = req.params.id;
            const { status } = req.body;
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
            res.json({ message: `Order status updated to ${status}` });
        } catch (error) {
            next(error);
        }
    }

    static async findAllOrderByVehicle(req, res, next) {
        try {
            let vehicle = await Vehicle.findByPk(req.params.vehicleid);

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
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    static async fetchTrending(req, res, next) {
        try {
            const results = await Order.findAll({
                attributes: ["VehicleId", [Sequelize.fn("COUNT", "VehicleId"), "orderCount"]],
                where: { status: "returned" },
                group: ["VehicleId"],
                order: [[Sequelize.fn("COUNT", "VehicleId"), "DESC"]],
                limit: 7,
            });

            if (results.length > 0) {
                const mostOrderedVehicleIds = results.map((result) => result.getDataValue("VehicleId"));
                const mostOrderedVehicles = await Vehicle.findAll({
                    where: { id: mostOrderedVehicleIds },
                    include: [Review, Order],
                });

                const vehicleResults = [];

                for (const vehicle of mostOrderedVehicles) {
                    const { name, image, price, Reviews, Orders, location, id } = vehicle;
                    const totalReviews = Reviews.length;
                    const averageRating = totalReviews > 0 ? Reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;
                    const vehicleInfo = {
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

                res.json(vehicleResults);
            } else {
                throw { name: "No vehicle with status returned" };
            }
        } catch (error) {
            next(error);
        }
    }

    static async midtransToken(req, res, next) {
        try {
            let findOrder = await Order.findByPk(req.params.orderId)
            if (!findOrder) {
                throw { name: 'not_found' }
            }
            if (!req.body) {
                throw { name: 'amount_blank' }
            }
            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
            });

            let parameter = {
                transaction_details: {
                    order_id: req.params.orderId,
                    gross_amount: req.body.amount,
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
}

module.exports = OrderController;
