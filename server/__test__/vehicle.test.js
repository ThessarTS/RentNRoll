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
  userToken = await User.findOne({
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
  it("Successfully got Products (without access_token) without using query filter parameters /pub/products", async function () {
    const response = await request(app).get("/vehicles");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it("Successfully got Products (with access_token) without using query filter parameters /pub/products", async function () {
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
  });
  it("Failed to get Main Entity because the given id params does not exist in the database / is invalid", async function () {
    const response = await request(app).get("/vehicles/200");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});

describe("Test add vehicle endpoint /vehicles method POST", () => {
  it("Successfully added a vehicle", async function () {
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .send({
        name: "Toyota Rush",
        CategoryId: 1,
        price: 270000,
        color: "white",
        year: "2020",
        transmission: "manual",
        seats: 8,
        overViewImage:
          "https://1.bp.blogspot.com/-KCkEiJcf-gc/XdQxSkkgvfI/AAAAAAAAad0/O1OkNdU7lyEU13I7ydL5uyARYA5lVs69wCLcBGAsYHQ/w1200-h630-p-k-no-nu/spesifikasi-grand-new-avanza.jpg",
        interiorImage:
          "https://imgcdn.oto.com/large/gallery/interior/38/1654/toyota-avanza-dashboard-view-493195.jpg",
        sideImage:
          "https://imgcdnblog.carbay.com/wp-content/uploads/2015/07/24051728/2016-Toyota-Avanza-1.jpg",
        UserId: 1,
      });
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Success Add New Vehicle");
  });

  it("Faild added a vehicle with empty name feild", async function () {
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .send({
        name: "",
        CategoryId: 1,
        price: 270000,
        color: "white",
        year: "2020",
        transmission: "manual",
        seats: 8,
        overViewImage:
          "https://1.bp.blogspot.com/-KCkEiJcf-gc/XdQxSkkgvfI/AAAAAAAAad0/O1OkNdU7lyEU13I7ydL5uyARYA5lVs69wCLcBGAsYHQ/w1200-h630-p-k-no-nu/spesifikasi-grand-new-avanza.jpg",
        interiorImage:
          "https://imgcdn.oto.com/large/gallery/interior/38/1654/toyota-avanza-dashboard-view-493195.jpg",
        sideImage:
          "https://imgcdnblog.carbay.com/wp-content/uploads/2015/07/24051728/2016-Toyota-Avanza-1.jpg",
        UserId: 1,
      });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Name is required!");
  });
  it("Faild added a vehicle without price feild", async function () {
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .send({
        name: "Toyota",
        CategoryId: 1,
        color: "white",
        year: "2020",
        transmission: "manual",
        seats: 8,
        overViewImage:
          "https://1.bp.blogspot.com/-KCkEiJcf-gc/XdQxSkkgvfI/AAAAAAAAad0/O1OkNdU7lyEU13I7ydL5uyARYA5lVs69wCLcBGAsYHQ/w1200-h630-p-k-no-nu/spesifikasi-grand-new-avanza.jpg",
        interiorImage:
          "https://imgcdn.oto.com/large/gallery/interior/38/1654/toyota-avanza-dashboard-view-493195.jpg",
        sideImage:
          "https://imgcdnblog.carbay.com/wp-content/uploads/2015/07/24051728/2016-Toyota-Avanza-1.jpg",
        UserId: 1,
      });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Price is required!");
  });
  it("Faild added a vehicle with empty color feild", async function () {
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .send({
        name: "Toyota Rush",
        CategoryId: 1,
        price: 270000,
        color: "",
        year: "2020",
        transmission: "manual",
        seats: 8,
        overViewImage:
          "https://1.bp.blogspot.com/-KCkEiJcf-gc/XdQxSkkgvfI/AAAAAAAAad0/O1OkNdU7lyEU13I7ydL5uyARYA5lVs69wCLcBGAsYHQ/w1200-h630-p-k-no-nu/spesifikasi-grand-new-avanza.jpg",
        interiorImage:
          "https://imgcdn.oto.com/large/gallery/interior/38/1654/toyota-avanza-dashboard-view-493195.jpg",
        sideImage:
          "https://imgcdnblog.carbay.com/wp-content/uploads/2015/07/24051728/2016-Toyota-Avanza-1.jpg",
        UserId: 1,
      });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Color is required!");
  });
  it("Faild added a vehicle with empty year feild", async function () {
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .send({
        name: "Toyota Rush",
        CategoryId: 1,
        price: 270000,
        color: "white",
        year: "",
        transmission: "manual",
        seats: 8,
        overViewImage:
          "https://1.bp.blogspot.com/-KCkEiJcf-gc/XdQxSkkgvfI/AAAAAAAAad0/O1OkNdU7lyEU13I7ydL5uyARYA5lVs69wCLcBGAsYHQ/w1200-h630-p-k-no-nu/spesifikasi-grand-new-avanza.jpg",
        interiorImage:
          "https://imgcdn.oto.com/large/gallery/interior/38/1654/toyota-avanza-dashboard-view-493195.jpg",
        sideImage:
          "https://imgcdnblog.carbay.com/wp-content/uploads/2015/07/24051728/2016-Toyota-Avanza-1.jpg",
        UserId: 1,
      });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Year is required!");
  });
  it("Faild added a vehicle with empty Overview image feild", async function () {
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .send({
        name: "Toyota Rush",
        CategoryId: 1,
        price: 270000,
        color: "white",
        year: "2021",
        transmission: "manual",
        seats: 8,
        overViewImage: "",
        interiorImage:
          "https://imgcdn.oto.com/large/gallery/interior/38/1654/toyota-avanza-dashboard-view-493195.jpg",
        sideImage:
          "https://imgcdnblog.carbay.com/wp-content/uploads/2015/07/24051728/2016-Toyota-Avanza-1.jpg",
        UserId: 1,
      });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Overview image is required!"
    );
  });
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
