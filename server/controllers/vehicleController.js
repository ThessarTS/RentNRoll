const { Vehicle, User, Category, Review, Order } = require("../models/index");

class VehicleController {
  static async fetchVehicle(req, res, next) {
    try {
      const vehicle = await Vehicle.findAll({
        include: [
          {
            model: Category,
          },
          {
            model: User,
          },
          {
            model: Order,
          },
        ],
      });
      res.status(200).json(vehicle);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async detailVehicle(req, res, next) {
    try {
      // console.log(req.params);
      const { id } = req.params;
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
          },
          {
            model: Order,
          },
        ],
      });
      if (!vehicle) {
        throw { name: "not_found" };
      }
      res.status(200).json(vehicle);
    } catch (err) {
      next(err);
    }
  }
  static async addVehicle(req, res, next) {
    try {
      const { name, CategoryId, price, seats, image } = req.body;
      const newVehicle = await Vehicle.create({
        name,
        CategoryId,
        price,
        seats,
        image,
        UserId: req.user.id,
      });
      res.status(201).json({ message: "Success Add New Vehicle" });
    } catch (err) {
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
      const { name, CategoryId, price, seats, image } = req.body;
      const findVehicle = await Vehicle.findByPk(id);
      if (!findVehicle) {
        throw { name: "not_found" };
      }
      await Vehicle.update(
        {
          name,
          CategoryId,
          price,
          seats,
          image,
          UserId: req.user.id,
        },
        { where: { id } }
      );
      res.status(200).json({ message: "Succes Edit Vehicle" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = VehicleController;
