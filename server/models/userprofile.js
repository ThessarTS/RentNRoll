"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
      UserProfile.belongsTo(models.User);
    }
  }
  UserProfile.init(
    {
      UserId: DataTypes.INTEGER,
      ktp: {
        type: STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "KTP is required!",
          },
          notNull: {
            msg: "KTP is required!",
          },
        },
      },
      simA: DataTypes.STRING,
      simC: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserProfile",
    }
  );
  return UserProfile;
};
