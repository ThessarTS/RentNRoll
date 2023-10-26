const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models/index");
const {
  describe,
  expect,
  test,
  beforeAll,
  afterAll,
  it,
} = require("@jest/globals");
const { hashPassword } = require("../helpers/bcrypt");
// const { User } = require("../models/index");
const { signToken } = require("../helpers/jwt");

let access_token;
let userId = "";
beforeAll(async () => {
  let dataReview = [
    {
      rating: 4,
      message: "Memuaskan",
      VehicleId: 2,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      rating: 3,
      message: "Biasa aja",
      VehicleId: 3,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  let dataCategory = require("../data/category.json");
  dataCategory.forEach((el) => {
    el.createdAt = el.updatedAt = new Date();
  });
  let dataVehicle = require("../data/vehicle.json");
  dataVehicle.forEach((el) => {
    el.createdAt = el.updatedAt = new Date();
  });
  let dataUser = require("../data/users.json");
  dataUser.forEach((el) => {
    el.createdAt = el.updatedAt = new Date();
    el.password = hashPassword(el.password);
  });
  await sequelize.queryInterface.bulkInsert("Users", dataUser);
  await sequelize.queryInterface.bulkInsert("Categories", dataCategory);
  await sequelize.queryInterface.bulkInsert("Vehicles", dataVehicle);
  await sequelize.queryInterface.bulkInsert("Reviews", dataReview);
  const userToken = await User.findOne({
    where: {
      email: "sajadhijir@gmail.com",
    },
  });
  access_token = signToken({ id: userToken.id });
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Reviews", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
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

describe("Test get data review endpoint /reviews", () => {
  it("Successfully get review", async function () {
    const response = await request(app)
      .get("/reviews")
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it("Failed get review", async function () {
    const response = await request(app).get("/reviews");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("Test get data vehicle review endpoint /reviews/:VehicleId", () => {
  it("Successfully get review", async function () {
    const response = await request(app)
      .get("/reviews/1")
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it("Failed get review because vehicle not found", async function () {
    const response = await request(app).get("/reviews/200");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", 'Not Found');
  });
});

describe("Test post review endpoint /reviews/:VehicleId", () => {
  it("Successfully post review", async function () {
    const response = await request(app)
      .post("/reviews/1")
      .set("access_token", access_token)
      .send({
        message: "luar biasa",
        rating: 5,
        // UserId: req.user.id,
        // VehicleId: VehicleId,
      });
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed post review without message", async function () {
    const response = await request(app)
      .post("/reviews/1")
      .set("access_token", access_token)
      .send({
        message: "",
        rating: 5,
        // UserId: req.user.id,
        // VehicleId: VehicleId,
      });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed post review without rating", async function () {
    const response = await request(app)
      .post("/reviews/1")
      .set("access_token", access_token)
      .send({
        message: "luar biasa",
      });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});
