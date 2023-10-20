const { Review, Vehicle } = require("../models");
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
      const { VehicleId } = req.params;
      const data = await Review.findAll({
        where: { VehicleId },
        include: [Vehicle],
      });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  static async postReview(req, res, next) {
    try {
      const { VehicleId } = req.params;
      const { message, rating } = req.body;
      await Review.create({ message, rating, UserId: req.user.id, VehicleId: VehicleId });
      res.status(201).json({ message: "Review success!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReviewController;
