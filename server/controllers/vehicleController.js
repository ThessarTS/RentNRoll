const { Vehicle, User, Category, Review, Order, UserProfile, Specification } = require("../models/index");
const redis = require("../helpers/redis");
const { sequelize } = require('../models/index')

class VehicleController {
  static async fetchVehicle(req, res, next) {
    try {
      let { location, startdate, enddate } = req.query;
      let options = {
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
      };
      if (location) {
        options.where = { location };
      }
      const vehicles = await Vehicle.findAll(options);

      if (vehicles.length == 0) {
        throw { name: "not_found" };
      }

      let filteredVehicles;
      if (startdate && enddate) {
        startdate = new Date(startdate)
        enddate = new Date(enddate)
        filteredVehicles = vehicles.filter((vehicle) => {
          let isNotIncluded = true;
          vehicle.Orders.forEach((el) => {
            if (startdate < el.endDate && enddate > el.startDate) {
              isNotIncluded = false;
            }
          });
          if (isNotIncluded) {
            return vehicle;
          }
        });
      } else {
        filteredVehicles = vehicles;
      }

      const vehicleData = filteredVehicles.map((vehicle) => {
        const { name, image, price, Reviews, Orders, location, id, Category } = vehicle;
        const totalReviews = Reviews.length;
        const totalOrders = Orders.length;
        const averageRating = totalReviews > 0 ? Reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;

        return {
          id,
          name,
          location,
          image,
          price,
          totalReviews,
          totalOrders,
          location,
          averageRating: averageRating.toFixed(1),
          Category
        };
      });
      res.status(200).json(vehicleData);
    } catch (err) {
      next(err);
    }
  }
  static async fetchMyVehicle(req, res, next) {
    try {
      // let dataVehicle = await redis.get("myVehicleFinalProject:" + req.user.id);
      // if (!dataVehicle) {
      const vehicle = await Vehicle.findAll({ where: { UserId: req.user.id } });
      if (vehicle.length == 0) {
        throw { name: "not_found" };
      }
      let dataVehicle = vehicle;
      // }
      res.json(dataVehicle);
    } catch (error) {
      next(error);
    }
  }
  static async fetchLocation(req, res, next) {
    try {
      // let locationsData = await redis.get("locationFinalProject");
      // if (!locationsData) {
      const vehicles = await Vehicle.findAll();
      const locations = [...new Set(vehicles.map((vehicle) => vehicle.location))];
      //   locationsData = locations;
      // }
      res.status(200).json(locations);
    } catch (error) {
      next(error);
    }
  }
  static async detailVehicle(req, res, next) {
    try {
      const { id } = req.params;
      let detailVehicleData = await redis.get("detailVehicle:" + id);
      if (!detailVehicleData) {
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
        detailVehicleData = {
          vehicle,
          averageRating,
        };
      }
      res.status(200).json({ vehicle: detailVehicleData.vehicle, rating: detailVehicleData.averageRating });
    } catch (err) {
      next(err);
    }
  }
  static async addVehicle(req, res, next) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { name, CategoryId, price, location, specificationName, value } = req.body;
        const vehicle = await Vehicle.create(
          {
            name,
            CategoryId,
            price,
            image: req.image,
            UserId: req.user.id,
            location,
          },
          { transaction: t }
        );
        // await vehicle.Specification.bulkCreate({ name: specificationName, value }, { transaction: t });
        await redis.del("locationFinalProject");
        // return result;
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
      await redis.del("detailVehicle/" + id);
      await redis.del("locationFinalProject");
      await redis.del("myVehicleFinalProject:" + req.user.id);
      res.status(200).json({ message: `Success Delete Vehicle With Id ${id}` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async editVehicle(req, res, next) {
    try {
      const { id } = req.params;

      const { name, CategoryId, price, location } = req.body;

      const findVehicle = await Vehicle.findByPk(id);
      if (!findVehicle) {
        throw { name: "not_found" };
      }
      await Vehicle.update(
        {
          name,
          CategoryId,
          price,
          image: req.image,
          location,
          UserId: req.user.id,
        },
        { where: { id } }
      );
      await redis.del("detailVehicle/" + id);
      await redis.del("myVehicleFinalProject:" + req.user.id);
      res.status(200).json({ message: "Success Edit Vehicle" });
    } catch (err) {
      next(err);
    }
  }
  static async getCategories(req, res, next) {
    try {
      // let dataCategories = await redis.get("categoryFinalProject");
      // if (!dataCategories) {
      const data = await Category.findAll();
      let dataCategories = data;
      // await redis.set("categoryFinalProject", JSON.stringify(data))
      // } else {
      //   dataCategories = JSON.parse(dataCategories)
      // }
      res.json(dataCategories);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VehicleController;
