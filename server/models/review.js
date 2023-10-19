"use strict";
const { Model, FLOAT, TEXT } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User);
      Review.belongsTo(models.Vehicle);
    }
  }
  Review.init(
    {
      rating: {
        type: FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Rating is required!",
          },
          notEmpty: {
            msg: "Rating is required!",
          },
          isNumeric: {
            msg: "Rating must be a number!",
          },
          min: {
            args: 1,
            msg: "Minimal Rating is 1",
          },
          max: {
            args: 5,
            msg: "Maximal Rating is 5!",
          },
        },
      },
      message: {
        type: TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Message is required!",
          },
          notEmpty: {
            msg: "Message is required!",
          },
        },
      },
      VehicleId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
