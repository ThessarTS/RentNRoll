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
      password: {
        type: STRING,
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
      otp: DataTypes.STRING,
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
