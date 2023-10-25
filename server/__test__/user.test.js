const request = require("supertest");
const app = require("../app");
const nodemailer = require('nodemailer');
const nodemailerMock = require('nodemailer-mock');
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
const redis = require("../helpers/redis");

let access_token;
let userId = "";

beforeAll(async () => {
  let users = [
    {
      fullName: "test1",
      email: "test1@mail.com",
      password: hashPassword("123123123"),
      phone: "8583251342",
      otp: "12345",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: "test2",
      email: "test2@mail.com",
      password: hashPassword("123123123"),
      phone: "8583251342",
      otp: "67890",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: "test3",
      email: "test3@mail.com",
      password: hashPassword("123123123"),
      phone: "8583251342",
      otp: "52311",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: "test4",
      email: "test4@mail.com",
      password: hashPassword("123123123"),
      phone: "8583251311",
      otp: "22455",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: "test5",
      email: "test5@mail.com",
      password: hashPassword("123123123"),
      phone: "8583251112",
      otp: "54333",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  let dataProfile = require("../data/userProfiles.json");
  dataProfile.forEach((el) => {
    el.createdAt = el.updatedAt = new Date();
  });
  await sequelize.queryInterface.bulkInsert("Users", users);
  await sequelize.queryInterface.bulkInsert("UserProfiles", dataProfile);

  let user = await User.findOne({ where: { email: "test1@mail.com" } });

  access_token = signToken({ id: user.id });
  // redis.flushall()
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("UserProfiles", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST register new user /register", function () {
  it("should responds with 201 and message", async function () {
    const response = await request(app).post("/register").send({
      fullName: "test20",
      email: "test20@mail.com",
      password: "123123123",
      phone: "8583251342",
    });
    expect(response.status).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/register").send({
      fullName: "tsr",
      password: "123123123",
      phone: "628888826",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required!");
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/register").send({
      fullName: "tsr",
      email: "tsr@mail.com",
      phone: "628888826",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required!");
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/register").send({
      fullName: "tsr",
      email: "",
      password: "123123123",
      phone: "628888826",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required!");
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/register").send({
      fullName: "tsr",
      email: "tsr@mail.com",
      password: "",
      phone: "628888826",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required!");
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/register").send({
      fullName: "tsr",
      email: "test1@mail.com",
      password: "123123123",
      phone: "628888826",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email has already registered"
    );
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/register").send({
      fullName: "tsr",
      email: "wrong",
      password: "123123123",
      phone: "628888826",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid email format!");
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/register").send({
      fullName: "tsr",
      email: "tsr@mail.com",
      password: "123",
      phone: "628888826",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Minimum password character is 8!"
    );
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/register").send({
      email: "tsr@mail.com",
      password: "123123123",
      phone: "628888826",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Name is required!");
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/register").send({
      fullName: "",
      email: "tsr@mail.com",
      password: "123123123",
      phone: "628888826",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Name is required!");
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/register").send({
      fullName: "tsr",
      email: "tsr@mail.com",
      password: "123123123",
      phone: "",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Phone Number is required!"
    );
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/register").send({
      fullName: "tsr",
      email: "tsr@mail.com",
      password: "123123123",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Phone Number is required!"
    );
  });
});

describe("POST generate otp /otp", function () {
  it("should responds with 200 and body message", async function () {
    const response = await request(app).post("/otp").send({
      email: "test2@mail.com",
      password: "123123123",
    });
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should responds with 401 and body message", async function () {
    const response = await request(app).post("/otp").send({
      email: "wrong@mail.com",
      password: "123123123",
    });
    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Email / Password");
  });

  it("should responds with 401 and body message", async function () {
    const response = await request(app).post("/otp").send({
      email: "test1@mail.com",
      password: "wrong",
    });
    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Email / Password");
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/otp").send({
      password: "123123123",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email/Password is required!"
    );
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/otp").send({
      email: "tsr@mail.com",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email/Password is required!"
    );
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/otp").send({
      email: "",
      password: "123123123",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email/Password is required!"
    );
  });

  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/otp").send({
      email: "tsr@mail.com",
      password: "",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email/Password is required!"
    );
  });
});

describe("POST match otp code /login", function () {
  it("should responds with 200 and body message", async function () {
    const response = await request(app).post("/login").send({
      email: "test1@mail.com",
      password: "123123123",
      otp: "12345",
    });
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
  it("should responds with 401 and body message", async function () {
    const response = await request(app).post("/login").send({
      email: "wrong@mail.com",
      password: "123123123",
      otp: "12345",
    });
    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Email / Password");
  });
  it("should responds with 401 and body message", async function () {
    const response = await request(app).post("/login").send({
      email: "test1@mail.com",
      password: "wrong",
      otp: "12345",
    });
    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Email / Password");
  });
  it("should responds with 401 and body with message", async function () {
    const response = await request(app).post("/login").send({
      email: "test1@mail.com",
      password: "123123123",
    });
    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid otp code!");
  });
  it("should responds with 401 and body with message", async function () {
    const response = await request(app).post("/login").send({
      email: "test1@mail.com",
      password: "123123123",
      otp: "",
    });
    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid otp code!");
  });
  it("should responds with 401 and body with message", async function () {
    const response = await request(app).post("/login").send({
      email: "test1@mail.com",
      password: "123123123",
      otp: "wrong",
    });
    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid otp code!");
  });
  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/login").send({
      email: "tsr@mail.com",
      otp: "12345",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email and Password required"
    );
  });
  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/login").send({
      otp: "12345",
      password: "123123123",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email and Password required"
    );
  });
  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/login").send({
      email: "tsr@mail.com",
      password: "",
      otp: "12345",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email and Password required"
    );
  });
  it("should responds with 400 and body with message", async function () {
    const response = await request(app).post("/login").send({
      email: "",
      password: "123123123",
      otp: "12345",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email and Password required"
    );
  });
});

describe("GET users profile /profiles", function () {
  it("should responds with 200 and body message", async function () {
    const response = await request(app)
      .get("/profiles")
      .set("access_token", access_token);
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("fullName", expect.any(String));
    expect(response.body).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("phone", expect.any(String));
  });

  it("should responds with 401 and body object with message", async function () {
    const response = await request(app).get("/profiles");

    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should responds with 401 and body object with message", async function () {
    const response = await request(app)
      .get("/profiles")
      .set("access_token", "randomstring");

    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should responds with 401 and body object with message", async function () {
    let access_token_get_profiles = signToken({ id: 200 });
    const response = await request(app)
      .get("/profiles")
      .set("access_token", access_token_get_profiles);

    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

});

describe("POST users profile /profiles", function () {
  it("should responds with 201 and body message", async function () {
    const response = await request(app)
      .post("/profiles")
      .set("access_token", access_token)
      .attach('ktp', './data/testingImage.png')
      .attach('simA', './data/testingImage.png')
      .attach('simC', './data/testingImage.png')
      .attach('profilePicture', './data/testingImage.png')

    expect(response.status).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  }, 10000);

  it("should responds with 401 and body object with message", async function () {
    const response = await request(app).post("/profiles");

    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should responds with 401 and body object with message", async function () {
    const response = await request(app)
      .post("/profiles")
      .set("access_token", "randomstring");

    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should responds with 400 and body object with message", async function () {
    const response = await request(app)
      .post("/profiles")
      .set("access_token", access_token)
      .attach('profilePicture', './data/testingImage.png')
      .attach('simA', './data/testingImage.png')
      .attach('simC', './data/testingImage.png')

    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "KTP is required!");
  }, 7000);
  it("should responds with 400 and body object with message", async function () {
    const response = await request(app)
      .post("/profiles")
      .set("access_token", access_token)
      .attach('ktp', './data/testingImage.png')
      .attach('simA', './data/testingImage.png')
      .attach('simC', './data/testingImage.png')

    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Profile Picture is required!");
  }, 7000);
});

describe("PUT users profile /profiles", function () {
  it("should responds with 200 and body message", async function () {
    const response = await request(app)
      .put("/profiles")
      .set("access_token", access_token)
      .attach('ktp', './data/testingImage.png')
      .attach('simA', './data/testingImage.png')
      .attach('simC', './data/testingImage.png')
      .attach('profilePicture', './data/testingImage.png')

    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Successfully updated!");
  }, 8000);

  it("should responds with 400 and body object with message", async function () {
    const response = await request(app)
      .put("/profiles")
      .set("access_token", access_token)
      .attach('simA', './data/testingImage.png')
      .attach('simC', './data/testingImage.png')
      .attach('profilePicture', './data/testingImage.png')

    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "KTP is required!");
  }, 8000);

  it("should responds with 400 and body object with message", async function () {
    const response = await request(app)
      .put("/profiles")
      .set("access_token", access_token)
      .attach('ktp', './data/testingImage.png')
      .attach('simA', './data/testingImage.png')
      .attach('simC', './data/testingImage.png')

    expect(response.status).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Profile Picture is required!");
  }, 8000);
});

describe("DELETE users profile /profiles", function () {
  it("should responds with 200 and body message", async function () {
    const response = await request(app)
      .delete("/profiles")
      .set("access_token", access_token);
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should responds with 401 and body object with message", async function () {
    const response = await request(app).delete("/profiles");

    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should responds with 401 and body object with message", async function () {
    const response = await request(app)
      .delete("/profiles")
      .set("access_token", "randomstring");

    expect(response.status).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
});