const { Op } = require("sequelize");
const { Vehicle, User, Category, Review, Order, UserProfile, Specification } = require("../models/index");

class VehicleController {
  static async fetchVehicle(req, res, next) {
    try {
      const vehicles = await Vehicle.findAll({
        include: [
          {
            model: Category,
          },
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          {
            model: Order,
          },
          {
            model: Review,
          },
        ],
      });

      const vehicleData = vehicles.map((vehicle) => {
        const { name, image, price, Reviews, Orders, location } = vehicle;
        const totalReviews = Reviews.length;
        const totalOrders = Orders.length;
        const averageRating = totalReviews > 0 ? Reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;

        return {
          name,
          image,
          price,
          totalReviews,
          totalOrders,
          location,
          averageRating: averageRating.toFixed(1),
        };
      });
      res.status(200).json(vehicleData);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async fetchLocation(req, res, next) {
    try {
      const vehicles = await Vehicle.findAll();
      const locations = [...new Set(vehicles.map((vehicle) => vehicle.location))];
      console.log(locations);
      res.status(200).json(locations);
    } catch (error) {
      next(error);
    }
  }
  static async detailVehicle(req, res, next) {
    try {
      const { id } = req.params;
      let averageRating = 0;
      const reviews = await Review.findAll({
        where: {
          VehicleId: id,
        },
      });

      if (reviews.length > 0) {
        const ratingData = reviews.map((el) => {
          return el.rating;
        });
        let average = ratingData.reduce((a, b) => a + b, 0) / ratingData.length;

        averageRating = average.toFixed(1);
      }
      const vehicle = await Vehicle.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Category,
          },
          {
            model: User,
            attributes: { exclude: ["password"] },
            include: UserProfile,
          },
          {
            model: Order,
          },
          {
            model: Specification,
          },
          {
            model: Review,
          },
        ],
      });
      if (!vehicle) {
        throw { name: "not_found" };
      }
      res.status(200).json({ vehicle, rating: averageRating });
    } catch (err) {
      next(err);
    }
  }
  static async addVehicle(req, res, next) {
    try {
      const { name, CategoryId, price, location } = req.body;

      await Vehicle.create({
        name,
        CategoryId,
        price,
        image: req.image,
        UserId: req.user.id,
        location: location,
      });
      res.status(201).json({ message: "Success Add New Vehicle" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async removeVehicle(req, res, next) {
    try {
      const { id } = req.params;
      const findVehicle = await Vehicle.findByPk(id);
      if (!findVehicle) {
        throw { name: "not_found" };
      }
      await Vehicle.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: `Success Delete Vehicle With Id ${id}` });
    } catch (err) {
      next(err);
    }
  }
  static async editVehicle(req, res, next) {
    try {
      const { id } = req.params;

      const { name, CategoryId, price, image, location } = req.body;

      const findVehicle = await Vehicle.findByPk(id);
      if (!findVehicle) {
        throw { name: "not_found" };
      }
      await Vehicle.update(
        {
          name,
          CategoryId,
          price,
          image,
          location,
          UserId: req.user.id,
        },
        { where: { id } }
      );
      res.status(200).json({ message: "Succes Edit Vehicle" });
    } catch (err) {
      next(err);
    }
  }
  static async getCategories(req, res, next) {
    try {
      const data = await Category.findAll();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VehicleController;
