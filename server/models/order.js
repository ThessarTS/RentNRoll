"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Vehicle);
      Order.belongsTo(models.User);
    }
  }
  Order.init(
    {
      status: DataTypes.ENUM,
      VehicleId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Start date required' },
          notEmpty: { msg: 'Start date required' },
        }
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'End date required' },
          notEmpty: { msg: 'End date required' },
        }
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Owner Id required' },
          notEmpty: { msg: 'Owner Id required' },
        }
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
