"use strict";
const { Model, STRING } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Vehicle);
      User.hasOne(models.UserProfile);
      User.hasMany(models.Review);
      User.hasMany(models.Order);
      User.hasMany(models.Balance);
    }
  }
  User.init(
    {
      fullName: {
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email has already registered" },
        validate: {
          notEmpty: {
            msg: "Email is required!",
          },
          notNull: {
            msg: "Email is required!",
          },
          isEmail: {
            msg: "Invalid email format!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required!",
          },
          notNull: {
            msg: "Password is required!",
          },
          len: {
            args: [8],
            msg: "Minimum password character is 8!",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
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
      otp: DataTypes.STRING,
      expoToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((el) => {
    el.password = hashPassword(el.password);
  });
  return User;
};
