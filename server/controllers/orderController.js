const { Order, Vehicle, User, Review, Balance } = require("../models/index");
const midtransClient = require("midtrans-client");
const { Sequelize } = require("sequelize");
const redis = require("../helpers/redis");
const totalDayConverter = require("../helpers/totalDayConverter");

class OrderController {
  static async findAllOrder(req, res, next) {
    try {
      let userOrders = await redis.get("userOrderFinalProject:" + req.user.id);
      if (!userOrders) {
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
          throw { name: "not_found" };
        }
        userOrders = orders;
      }
      res.json(userOrders);
    } catch (error) {
      next(error);
    }
  }

  static async findOrderById(req, res, next) {
    try {
      const { id } = req.params;
      let dataOrder = await redis.get("orderDetailFinalProject:" + id);
      if (!dataOrder) {
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
        dataOrder = order;
      }
      res.json(dataOrder);
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
      const totalDay = totalDayConverter(startDate, endDate);
      const totalPrice = totalDay * vehicle.price;
      await Order.create({
        VehicleId,
        startDate,
        endDate,
        UserId: req.user.id,
        ownerId: vehicle.UserId,
        totalPrice,
      });
      await redis.del("userOrderFinalProject:" + req.user.id);
      await redis.del("vehicleOrderFinalProject");
      await redis.del("trendingDataFinalProject");
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
      if (status === "returned") {
        await Balance.create({ OrderId: id, UserId: req.user.id, amount: findOrder.totalPrice });
      }
      await redis.del("orderDetailFinalProject:" + id);
      await redis.del("userOrderFinalProject:" + req.user.id);
      await redis.del("vehicleOrderFinalProject");
      await redis.del("trendingDataFinalProject");
      res.json({ message: `Order status updated to ${status}` });
    } catch (error) {
      next(error);
    }
  }

  static async findAllOrderByVehicle(req, res, next) {
    try {
      const { VehicleId } = req.params;
      let dataOrder = await redis.get("vehicleOrderFinalProject");
      if (!dataOrder) {
        let vehicle = await Vehicle.findByPk(VehicleId);

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
        dataOrder = orders;
      }
      res.json(dataOrder);
    } catch (error) {
      next(error);
    }
  }

  static async fetchTrending(req, res, next) {
    try {
      let trendingData = await redis.get("trendingDataFinalProject");
      if (!trendingData) {
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
          trendingData = vehicleResults;
        }
        res.json(trendingData);
      } else {
        throw { name: "No vehicle with status returned" };
      }
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
      if (!req.body) {
        throw { name: "amount_blank" };
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
