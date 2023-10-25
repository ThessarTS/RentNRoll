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
const { signToken } = require("../helpers/jwt");

let access_token;

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
  let dataUserProfile = require("../data/userProfiles.json");
  dataUserProfile.forEach((el) => {
    el.createdAt = el.updatedAt = new Date();
  });
  let dataOrder = require("../data/orders.json");
  dataOrder.forEach((el) => {
    el.createdAt = el.updatedAt = new Date();
  });
  await sequelize.queryInterface.bulkInsert("Users", dataUser);
  await sequelize.queryInterface.bulkInsert("UserProfiles", dataUserProfile);
  await sequelize.queryInterface.bulkInsert("Categories", dataCategory);
  await sequelize.queryInterface.bulkInsert("Vehicles", dataVehicle);
  // await sequelize.queryInterface.bulkInsert("Reviews", dataReview);
  await sequelize.queryInterface.bulkInsert("Orders", dataOrder);

  const userToken = await User.findOne({
    where: {
      email: "wididi@mail.com",
    },
  });
  access_token = signToken({ id: userToken.id });
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
  it("Failed get all orders because order with match user id not found", async function () {
    let access_token2 = signToken({ id: 5 });
    const response = await request(app).get("/orders")
      .set("access_token", access_token2)

    expect(response.status).toBe(404);
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
      .post("/orders/1")
      .send({
        startDate: "2025-01-20T15:55:00.375Z",
        endDate: "2025-01-21T15:55:00.375Z",
      })
      .set("access_token", access_token);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('UserId');
    expect(response.body).toHaveProperty('VehicleId');
  });
  it("Failed add order without access token", async function () {
    const response = await request(app).post("/orders/2").send({

      startDate: "2023-01-20T15:55:00.375Z",
      endDate: "2023-01-21T15:55:00.375Z",

    });
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed to add order because start date empty", async function () {
    const response = await request(app)
      .post("/orders/2")
      .send({
        startDate: "",
        endDate: "2024-11-20T15:55:00.375Z",
      })
      .set("access_token", access_token);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed to add order because end date empty", async function () {
    const response = await request(app)
      .post("/orders/2")
      .send({
        startDate: "2023-08-20T15:55:00.375Z",
        endDate: "",
      })
      .set("access_token", access_token);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed to add order because vehicle not found", async function () {
    const response = await request(app).post("/orders/200").send({
      startDate: "2023-08-20T15:55:00.375Z",
      endDate: "2024-11-20T15:55:00.375Z",
    })
      .set("access_token", access_token);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  it("Failed to add order because order self-own vehicle", async function () {
    const response = await request(app).post("/orders/5").send({
      startDate: "2025-01-20T15:55:00.375Z",
      endDate: "2025-01-21T15:55:00.375Z",
    })
      .set("access_token", access_token);
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", 'Cannot order your own vehicle');
  });

  it("Failed to add order because simA null", async function () {
    let access_token_post_order = signToken({ id: 5 });
    const response = await request(app).post("/orders/5").send({
      startDate: "2025-01-20T15:55:00.375Z",
      endDate: "2025-01-21T15:55:00.375Z",
    })
      .set("access_token", access_token_post_order);
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", 'SIM A required, please upload the required document');
  });

  it("Failed to add order because simC null", async function () {
    let access_token_post_order = signToken({ id: 5 });
    const response = await request(app).post("/orders/7").send({
      startDate: "2025-01-20T15:55:00.375Z",
      endDate: "2025-01-21T15:55:00.375Z",
    })
      .set("access_token", access_token_post_order);
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", 'SIM C required, please upload the required document');
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
    expect(response.body).toBeInstanceOf(Array);
    // expect(response.body).toHaveProperty("message", expect.any(String));
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

describe("GET trending vehicle based on order /trending", () => {
  it("Successfully get order by vehicle id", async function () {
    const response = await request(app).get("/trending");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it("GET failed fetch trending because not found vehicle with status returned /trending", async function () {
    await sequelize.queryInterface.bulkDelete("Orders", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    let dataOrder2 = require("../data/orders.json");
    dataOrder2.forEach((el) => {
      el.createdAt = el.updatedAt = new Date()
      el.status = 'ongoing'
    });
    await sequelize.queryInterface.bulkInsert("Orders", dataOrder2);

    const response = await request(app).get("/trending");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'No vehicle with status returned');
  });
});

describe("Test midtrans token end point /midtrans-token/:orderId", () => {
  it("should responds with 201, successfully generate midtrans-token", async function () {
    const response = await request(app)
      .post("/midtrans-token/1")
      .send({ amount: 500000 })
      .set("access_token", access_token);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object)
  })
  it("should responds with 404 with body message", async function () {
    const response = await request(app)
      .post("/midtrans-token/1000")
      .send({ amount: 500000 })
      .set("access_token", access_token);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Not Found')
  });

});

describe("Test find all order based on ownerId /orders/owner", () => {
  it("should responds with 200, successfully get all orders by ownerId", async function () {
    const response = await request(app)
      .get("/orders/owner")
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array)
  })
  it("should responds with 404, successfully get all orders by ownerId", async function () {
    let access_token_for_owner = signToken({ id: 5 })
    const response = await request(app)
      .get("/orders/owner")
      .set("access_token", access_token_for_owner);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object)
  })


});
