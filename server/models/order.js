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
      isPaid: DataTypes.BOOLEAN,
      VehicleId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      isAccepted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
