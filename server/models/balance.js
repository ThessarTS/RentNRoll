"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Balance extends Model {
    static associate(models) {
      Balance.belongsTo(models.User);
      Balance.belongsTo(models.Order);
    }
  }
  Balance.init(
    {
      amount: DataTypes.INTEGER,
      OrderId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Balance",
    }
  );
  return Balance;
};
