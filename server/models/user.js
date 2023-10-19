"use strict";
const { Model, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Vehicle);
      User.hasOne(models.UserProfile);
      User.hasMany(models.Review);
      User.hasMany(models.Order);
    }
  }
  User.init(
    {
      fullName: {
        type: STRING,
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
      email: {
        type: STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Invalid email format!",
          },
          notEmpty: {
            msg: "Email is required!",
          },
          notNull: {
            msg: "Email is required!",
          },
        },
      },
      phone: {
        type: STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone Number is required!",
          },
          notNull: {
            msg: "Phone Number is required!",
          },
        },
      },
      otp: {
        type: STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "OTP is required!",
          },
          notNull: {
            msg: "OTP is required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
