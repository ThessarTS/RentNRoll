"use strict";
const { Model, INTEGER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    static associate(models) {
      Vehicle.belongsTo(models.Category);
      Vehicle.hasMany(models.Order);
      Vehicle.belongsTo(models.User);
      Vehicle.hasMany(models.Review);
    }
  }
  Vehicle.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required!",
          },
          notNull: {
            msg: "Name is required!",
          },
        },
      },
      CategoryId: DataTypes.INTEGER,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price is required!",
          },
          notNull: {
            msg: "Price is required!",
          },
          isNumeric: {
            msg: "Price must be a number!",
          },
        },
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Color is required!",
          },
          notNull: {
            msg: "Color is required!",
          },
        },
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Year is required!",
          },
          notNull: {
            msg: "Year is required!",
          },
        },
      },
      transmission: {
        type: DataTypes.STRING,
      },
      seats: {
        type: DataTypes.INTEGER,
      },
      overViewImage: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Overview image is required!",
          },
          notNull: {
            msg: "Overview image is required!",
          },
        },
      },
      interiorImage: {
        type: DataTypes.TEXT,
      },
      sideImage: {
        type: DataTypes.TEXT,
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Vehicle",
    }
  );
  return Vehicle;
};
