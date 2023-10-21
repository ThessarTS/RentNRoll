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
      rating: '4,4',
      message: "Memuaskan",
      VehicleId: 1,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      rating: '3,3',
      message: "Biasa aja",
      VehicleId: 1,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  let dataVehicle = require("../data/vehicle.json");
  dataVehicle.forEach((el) => {
    el.createdAt = el.updatedAt = new Date();
  });
  let dataUser = require("../data/users.json");
  dataUser.forEach((el) => {
    el.createdAt = el.updatedAt = new Date();
    el.password = hashPassword(el.password);
  });
  await sequelize.queryInterface.bulkInsert("Users", dataUser)
  await sequelize.queryInterface.bulkInsert("Vehicles", dataVehicle)
  await sequelize.queryInterface.bulkInsert("Reviews", dataReview)
  const userToken = await User.findOne({
    where: {
      email: "pablo@mail.com",
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
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Test get data review endpoint /reviews", () => {
  it("Successfully get review", async function () {
    const response = (await request(app).get("/reviews")).set(
      "access_token",
      access_token
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it("Failed get review without access token", async function () {
    const response = await request(app).get("/reviews");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("Test post review endpoint /reviews", () => {
  it("Successfully post review", async function () {
    const response = await request(app)
      .post("/reviews")
      .send({
        rating: 4,
        message: "Asik",
        VehicleId: 10,
        customerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .set("access_token", access_token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed post review without rating", async function () {
    const response = await request(app)
      .post("/reviews")
      .send({
        message: "Asik",
        VehicleId: 10,
        customerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .set("access_token", access_token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed post review without massage", async function () {
    const response = await request(app)
      .post("/reviews")
      .send({
        rating: 4,
        message: "",
        VehicleId: 10,
        customerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .set("access_token", access_token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed post review without VehicleId", async function () {
    const response = await request(app)
      .post("/reviews")
      .send({
        rating: 4,
        message: "Asik",
        customerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .set("access_token", access_token);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});
