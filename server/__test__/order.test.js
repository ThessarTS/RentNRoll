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
let invalidId = signToken({ id: 200 });
beforeAll(async () => {
  let dataReview = [
    {
      rating: "4,4",
      message: "Memuaskan",
      VehicleId: 1,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      rating: "3,3",
      message: "Biasa aja",
      VehicleId: 1,
      UserId: 1,
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
  let dataOrder = require("../data/orders.json");
  dataOrder.forEach((el) => {
    el.createdAt = el.updatedAt = new Date();
  });
  await sequelize.queryInterface.bulkInsert("Users", dataUser);
  await sequelize.queryInterface.bulkInsert("Categories", dataCategory);
  await sequelize.queryInterface.bulkInsert("Vehicles", dataVehicle);
  //   await sequelize.queryInterface.bulkInsert("Reviews", dataReview);
  await sequelize.queryInterface.bulkInsert("Orders", dataOrder);

  const userToken = await User.findOne({
    where: {
      email: "wididi@mail.com",
    },
  });
  access_token = signToken({ id: userToken.id });
  console.log(access_token);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Orders", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
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

describe("Test get data orders endpoint /orders", () => {
  it("Successfully get all orders", async function () {
    const response = await request(app)
      .get("/orders")
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it("Failed get all orders without access token", async function () {
    const response = await request(app).get("/orders");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("Test get data orders endpoint /orders/:id", () => {
  it("Successfully get order by id", async function () {
    const response = await request(app)
      .get("/orders/1")
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("Failed get order by id without access token", async function () {
    const response = await request(app).get("/orders/200");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed to get a order because the entity id sent does not exist in the database", async function () {
    const response = await request(app)
      .get("/orders/200")
      .set("access_token", access_token);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed to get a order because the entity id sent does not exist in the database and wothout access token", async function () {
    const response = await request(app).get("/orders/200");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("Test add orders endpoint /orders", () => {
  it("Successfully add order", async function () {
    const response = await request(app)
      .post("/orders")
      .send({
        VehicleId: 2,
        UserId: 3,
        startDate: "2023-08-20T15:55:00.375Z",
        endDate: "2024-11-20T15:55:00.375Z",
        ownerId: 2,
        status: "returned",
      })
      .set("access_token", access_token);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed add order without access token", async function () {
    const response = await request(app).post("/orders").send({
      VehicleId: 2,
      UserId: 3,
      startDate: "2023-08-20T15:55:00.375Z",
      endDate: "2024-11-20T15:55:00.375Z",
      ownerId: 2,
      status: "returned",
    });
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed to add order because start date empty", async function () {
    const response = await request(app)
      .post("/orders")
      .send({
        VehicleId: 2,
        UserId: 3,
        startDate: "",
        endDate: "2024-11-20T15:55:00.375Z",
        ownerId: 2,
        status: "returned",
      })
      .set("access_token", access_token);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed to add order because end date empty", async function () {
    const response = await request(app)
      .post("/orders")
      .send({
        VehicleId: 2,
        UserId: 3,
        startDate: "2023-08-20T15:55:00.375Z",
        endDate: "",
        ownerId: 2,
        status: "returned",
      })
      .set("access_token", access_token);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed to add order because vehicleid empty", async function () {
    const response = await request(app).post("/orders").send({
      VehicleId: 200,
      UserId: 3,
      startDate: "2023-08-20T15:55:00.375Z",
      endDate: "2024-11-20T15:55:00.375Z",
      status: "returned",
    })
      .set("access_token", access_token);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed to add order because order self-own vehicle", async function () {
    const response = await request(app).post("/orders").send({
      VehicleId: 5,
      UserId: 3,
      startDate: "2023-08-20T15:55:00.375Z",
      endDate: "2024-11-20T15:55:00.375Z",
      status: "returned",
    })
      .set("access_token", access_token);
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", 'Cannot order your own vehicle');
  });
});

describe("Test edit order status endpoint /orders/:id", () => {
  it("Successfully edit order status from ongoing to returned", async function () {
    const response = await request(app)
      .patch("/orders/3")
      .send({
        VehicleId: 3,
        UserId: 3,
        startDate: "2023-08-20T15:55:00.375Z",
        endDate: "2024-11-20T15:55:00.375Z",
        ownerId: 2,
        status: "returned",
      })
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed edit order status without access token", async function () {
    const response = await request(app).patch("/orders/3").send({
      VehicleId: 3,
      UserId: 3,
      startDate: "2023-08-20T15:55:00.375Z",
      endDate: "2024-11-20T15:55:00.375Z",
      ownerId: 2,
      status: "returned",
    });
    //   .set("access_token", access_token);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed to edit a order because the entity id sent does not exist in the database", async function () {
    const response = await request(app)
      .patch("/orders/100")
      .send({
        VehicleId: 3,
        UserId: 3,
        startDate: "2023-08-20T15:55:00.375Z",
        endDate: "2024-11-20T15:55:00.375Z",
        ownerId: 2,
        status: "returned",
      })
      .set("access_token", access_token);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("Test get order by vehicle id endpoint /orders/vehicle/:vehicleId", () => {
  it("Successfully get order by vehicle id", async function () {
    const response = await request(app)
      .get("/orders/vehicle/3")
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    // expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed get order by vehicle id without access token", async function () {
    const response = await request(app).get("/orders/vehicle/3");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed get order by vehicle id because vehicle id not found", async function () {
    const response = await request(app)
      .get("/orders/vehicle/300")
      .set("access_token", access_token);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("Test get trending endpoint /trending", () => {
  it("Successfully get order by vehicle id", async function () {
    const response = await request(app).get("/trending");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

// describe("Test midtrans token end point /midtrans-token/:orderId", () => {
//   it("Successfully get order by vehicle id", async function () {
//     const response = await request(app)
//       .post("/midtrans-token/1")
//       .set("access_token", access_token);
//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Object);
//   });
// });
