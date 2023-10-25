const redis = require("../helpers/redis");
const { Review, Vehicle, UserProfile, User } = require("../models");
class ReviewController {
  static async getReviewUser(req, res, next) {
    try {
      // let reviewUser = await redis.get(`reviewUserFinalProject:${req.user.id}`);
      // if (!reviewUser) {
      const data = await Review.findAll({
        where: { UserId: req.user.id },
        include: [{
          model: Vehicle
        }, {
          model: User,
          attributes: { exclude: ["password"] },
          include: UserProfile,
        }],
      });
      let reviewUser = data;
      // await redis.set(`reviewUserFinalProject:${req.user.id}`, JSON.stringify(data));
      // } else {
      //   reviewUser = JSON.parse(reviewUser)
      // }
      res.json(reviewUser);
    } catch (error) {
      next(error);
    }
  }
  static async getReviewVehicle(req, res, next) {
    try {
      const { VehicleId } = req.params;
      let vehicle = await Vehicle.findByPk(VehicleId)
      if (!vehicle) {
        throw { name: 'not_found' }
      }
      // let reviewVehicle = await redis.get(`reviewVehicleFinalProject:${VehicleId}`);
      // if (!reviewVehicle) {
      const data = await Review.findAll({
        where: { VehicleId },
        include: [Vehicle, { model: User, include: UserProfile }],
      });
      let reviewVehicle = data;
      // await redis.set(`reviewVehicleFinalProject:${VehicleId}`, JSON.stringify(data))
      // } else {
      //   reviewVehicle = JSON.parse(reviewVehicle)
      // }
      res.json(reviewVehicle);
    } catch (error) {
      next(error);
    }
  }
  static async postReview(req, res, next) {
    try {
      const { VehicleId } = req.params;
      const { message, rating } = req.body;
      await Review.create({
        message,
        rating,
        UserId: req.user.id,
        VehicleId: VehicleId,
      });
      await redis.del("reviewVehicleFinalProject/" + VehicleId);
      await redis.del("reviewUserProject/" + req.user.id);
      res.status(201).json({ message: "Review success!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReviewController;
