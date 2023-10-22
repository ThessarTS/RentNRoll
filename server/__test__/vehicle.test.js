const {
  describe,
  expect,
  test,
  it,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { sequelize, Vehicle, User } = require("../models/index");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
let access_token;
beforeAll(async () => {
  let dataUsers = require("../data/users.json");
  dataUsers.forEach((el) => {
    el.password = hashPassword(el.password);
    el.createdAt = el.updatedAt = new Date();
  });
  let dataCategories = require("../data/category.json");
  dataCategories.forEach((el) => {
    el.createdAt = el.updatedAt = new Date();
  });
  let dataVehicle = require("../data/vehicle.json");
  dataVehicle.forEach((el) => {
    el.createdAt = el.updatedAt = new Date();
  });
  await sequelize.queryInterface.bulkInsert("Users", dataUsers);
  await sequelize.queryInterface.bulkInsert("Categories", dataCategories);
  await sequelize.queryInterface.bulkInsert("Vehicles", dataVehicle);
  const userToken = await User.findOne({
    where: {
      email: "pablo@mail.com",
    },
  });
  access_token = signToken({ id: userToken.id });
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Vehicles", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Test get data Vehicle endpoint /vehicles", () => {
  it("Successfully get Products (without access_token) without using query filter parameters /pub/products", async function () {
    const response = await request(app).get("/vehicles");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it("Successfully get Products (with access_token) without using query filter parameters /pub/products", async function () {
    const response = await request(app)
      .get("/vehicles")
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("Test get data detail vehicle endpoint /vehicles/:id", () => {
  it("Successfully obtained 1 Main Entity according to the ID params provided", async function () {
    const response = await request(app).get("/vehicles/2");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("Category", expect.any(Object));
    expect(response.body).toHaveProperty("User", expect.any(Object));
  });
  it("Failed to get Main Entity because the given id params does not exist in the database / is invalid", async function () {
    const response = await request(app).get("/vehicles/200");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

// JANGAN DIHAPUS
describe("Test add vehicle endpoint /vehicles method POST", () => {
  it("Successfully added a vehicle", async function () {
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .field("name", "Toyota Rush")
      .field("CategoryId", "1")
      .field("price", "270000")
      .attach("image", "./data/testingImage.png");

    expect(response.status).toBe(201);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Success Add New Vehicle");
  }, 10000);

  it("Failed added a vehicle with empty name field", async function () {
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .field("name", "")
      .field("CategoryId", "1")
      .field("price", "270000")
      .attach("image", "./data/testingImage.png");

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Name is required!");
  });

  it("Faild added a vehicle without price feild", async function () {
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .field("name", "Toyota Rush")
      .field("CategoryId", "1")
      .field("price", "")
      .attach("image", "./data/testingImage.png");

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Price is required!");
  });

  it("Faild added a vehicle with empty image feild", async function () {
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .field("name", "Toyota Rush")
      .field("CategoryId", "1")
      .field("price", "270000")
      .attach("image", "./data/orders.json");

    expect(response.status).toBe(500);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("error");
  }, 10000);
});

describe("Test delete vehicle endpoint /vehicles/:id", () => {
  it("Successfully added a vehicle", async function () {
    const response = await request(app)
      .delete("/vehicles/2")
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Success Delete Vehicle With Id 2"
    );
  });
  it("Failed to delete because the given id params does not exist in the database / is invalid", async function () {
    const response = await request(app)
      .delete("/vehicles/200")
      .set("access_token", access_token);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Not Found");
  });
});
