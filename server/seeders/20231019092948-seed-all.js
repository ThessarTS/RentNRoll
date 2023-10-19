"use strict";

const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require("../data/users.json");
    const dataUsers = users.map((el) => {
      el.password = hashPassword(el.password);
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Users", dataUsers, {});

    const userProfiles = require("../data/userProfiles.json");
    const dataProfiles = userProfiles.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("UserProfiles", dataProfiles, {});

    const categories = require("../data/category.json");
    const dataCategories = categories.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Categories", dataCategories, {});

    const vehicles = require("../data/vehicle.json");
    const dataVehicles = vehicles.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Vehicles", dataVehicles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Vehicles", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("UserProfiles", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
