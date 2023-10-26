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
  let dataReviews = require("../data/reviews.json");
  dataReviews.forEach((el) => {
    el.createdAt = el.updatedAt = new Date();
  });

  await sequelize.queryInterface.bulkInsert("Users", dataUsers);
  await sequelize.queryInterface.bulkInsert("Categories", dataCategories);
  await sequelize.queryInterface.bulkInsert("Vehicles", dataVehicle);
  await sequelize.queryInterface.bulkInsert("Reviews", dataReviews);
  const userToken = await User.findOne({
    where: {
      email: "sajadhijir@gmail.com",
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
  it("Successfully get vehicles (without access_token) without using query filter parameters /vehicles", async function () {
    const response = await request(app).get("/vehicles");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it("Successfully get vehicles (with access_token) without using query filter parameters /vehicles", async function () {
    const response = await request(app)
      .get("/vehicles")
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it("Successfully get vehicles with using query filter parameters /vehicles", async function () {
    let startdate = new Date('2023-01-02')
    let enddate = new Date('2023-01-03')
    const response = await request(app)
      .get(`/vehicles?location=Jakarta&startdate=${startdate}&enddate=${enddate}`)

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('name', expect.any(String));
    expect(response.body[0]).toHaveProperty('location', expect.any(String));
    expect(response.body[0]).toHaveProperty('totalOrders', expect.any(Number));
  });
  it("fetch vehicles using query startdate and enddate /vehicles", async function () {
    let startdate = new Date('2025-09-01')
    let enddate = new Date('2025-09-03')
    const response = await request(app)
      .get(`/vehicles?startdate=${startdate}&enddate=${enddate}`)

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

  });
  it("failed fetch using query filter parameters because cannot find result /vehicles", async function () {

    let startdate = new Date('2023-01-02')
    let enddate = new Date('2023-01-03')
    const response = await request(app)
      .get(`/vehicles?location=Papua&startdate=${startdate}&enddate=${enddate}`)

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Not Found');
  });

  it("failed fetch using query filter parameters because date match with booking/vehicles", async function () {

    let startdate = new Date('2023-10-02')
    let enddate = new Date('2023-11-03')
    const response = await request(app)
      .get(`/vehicles?location=Jakarata&startdate=${startdate}&enddate=${enddate}`)

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Not Found');
  });

});

describe("Test get data detail vehicle endpoint /vehicles/:id", () => {
  it("Successfully obtained 1 Main Entity according to the ID params provided", async function () {
    const response = await request(app).get("/vehicles/2");

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("vehicle", expect.any(Object));
    expect(response.body).toHaveProperty("rating");
  });
  it("Failed to get Main Entity because the given id params does not exist in the database / is invalid", async function () {
    const response = await request(app).get("/vehicles/200");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});


describe("Test add vehicle endpoint /vehicles method POST", () => {
  it("Successfully added a vehicle", async function () {
    let data = [{ name: "color", value: "red" }]
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .field('name', 'Toyota Rush')
      .field('CategoryId', '1')
      .field('price', '270000')
      .field('location', 'Bandung')
      .field('specifications', JSON.stringify(data))
      .attach('image', './data/testingImage.png')

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Success Add New Vehicle");
  }, 10000);

  it("Failed added a vehicle with empty name field", async function () {
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .field('name', '')
      .field('CategoryId', '1')
      .field('price', '270000')
      .field('location', 'Bandung')
      .attach('image', './data/testingImage.png')

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Name is required!");
  }, 7000);

  it("Faild added a vehicle without price feild", async function () {
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .field('name', 'Toyota Rush')
      .field('CategoryId', '1')
      .field('location', 'Bandung')
      .field('price', '')
      .attach('image', './data/testingImage.png')

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Price is required!");
  }, 7000);

  it("Faild added a vehicle with empty image feild", async function () {
    const response = await request(app)
      .post("/vehicles")
      .set("access_token", access_token)
      .field('name', 'Toyota Rush')
      .field('CategoryId', '1')
      .field('price', '270000')
      .attach('image', './data/orders.json')

    expect(response.status).toBe(500);
    expect(response.body).toBeInstanceOf(Object);

  }, 10000);
});

describe("Test delete vehicle endpoint /vehicles/:id", () => {
  it("Successfully delete a vehicle", async function () {
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


describe("PUT edit vehicle endpoint /vehicles/:id", () => {
  it("Successfully edit vehicle", async function () {
    const response = await request(app)
      .put("/vehicles/3")
      .set("access_token", access_token)
      .field('name', 'Toyota Rush')
      .field('CategoryId', '1')
      .field('price', '270000')
      .field('location', 'Bandung')
      .attach('image', './data/testingImage.png')

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Success Edit Vehicle");
  }, 10000);

  it("Failed edit vehicle because cannot found vehicle", async function () {

    const response = await request(app)
      .put("/vehicles/200")
      .set("access_token", access_token)
      .field('name', 'test')
      .field('CategoryId', '1')
      .field('price', '270000')
      .field('location', 'Bandung')
      .attach('image', './data/testingImage.png')

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Not Found");
  }, 7000);

});


describe("GET all categories /categories", () => {
  it("Successfully get all categories", async function () {
    const response = await request(app)
      .get("/categories")

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

});

describe("GET all vehicles location vehicles/locations", () => {
  it("should responds 200 with body array", async function () {
    const response = await request(app)
      .get("/vehicles/locations")

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

});


describe("GET all vehicle owned by current logged in user /vehicles/my-vehicles", () => {
  it("should responds 200 with body array of object", async function () {
    const response = await request(app)
      .get("/vehicles/my-vehicles")
      .set("access_token", access_token)

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should responds 404 with body message", async function () {
    let access_token_myvehicles = signToken({ id: 4 })
    const response = await request(app)
      .get("/vehicles/my-vehicles")
      .set("access_token", access_token_myvehicles)

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Not Found');
  });

});