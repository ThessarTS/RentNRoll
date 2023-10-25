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
        type: DataTypes.STRING,
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
      profilePicture: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Profile picture is required!",
          },
          notNull: {
            msg: "Profile picture is required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "UserProfile",
    }
  );
  return UserProfile;
};
