const { Review, Order, Vehicle } = require("../models");
class ReviewController {
  static async getReviewUser(req, res, next) {
    try {
      const data = await Review.findAll({ where: { UserId: req.user.id }, include: [Vehicle] });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getReviewVehicle(req, res, next) {
    try {
      const { OrderId } = req.params;
      const data = await Review.findAll({
        where: { OrderId: OrderId },
        include: [
          Order,
          {
            model: Order,
            include: [
              {
                model: Vehicle,
              },
            ],
          },
        ],
      });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  static async postReview(req, res, next) {
    try {
      const { OrderId } = req.params;
      const { message, rating } = req.body;
      const order = await Order.findByPk(OrderId);
      await Review.create({ OrderId, message, rating, UserId: req.user.id, VehicleId: order.VehicleId });
      res.status(201).json({ message: "Review success!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReviewController;
