"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Specification.belongsTo(models.Vehicle);
    }
  }
  Specification.init(
    {
      name: DataTypes.STRING,
      value: DataTypes.STRING,
      VehicleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Specification",
    }
  );
  return Specification;
};
