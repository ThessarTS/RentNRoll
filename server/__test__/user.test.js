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


// describe("POST login with google account /google-login", function () {
//   it.only("should responds with 200 and body message", async function () {
//     const response = await request(app)
//       .post("/google-login")
//       .set("google_token", "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdkMzM0NDk3NTA2YWNiNzRjZGVlZGFhNjYxODRkMTU1NDdmODM2OTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTM5NDkxNjI2NTI5ODA1MDg5MDAiLCJlbWFpbCI6InRoZXNzYXJ0c0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Im1RbjhtbU1mZkVfb3RRNkdXcERTWlEiLCJuYW1lIjoiVGhlc3NhciBUUyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLUVhUS0tqN05kaXIzcm9YLUFOMTI0d182Tk5DM2Z1cW9TYmd4ZVdWR3lIUT1zOTYtYyIsImdpdmVuX25hbWUiOiJUaGVzc2FyIiwiZmFtaWx5X25hbWUiOiJUUyIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjk4MDgyNjM0LCJleHAiOjE2OTgwODYyMzR9.QayTBxJ9whXG5q27ARj5q49qv4lQjjaL7xa5OuTyJUKVCcJMYviTpizsQt8Xpf5PqarzWTXI_zcv6K3REAu7YJvnL5fJcPzn9oltj_JGUtfj192knZaTWe3_-oMAGyoSuk9ho55SfDHHsfM2aPQsXlc1QlRdzFsavIcc8U5n1BOQ2r0L8o0bAyqoy1Kr0w5MKNPabwBahfVyiHtY2CGgrVoVFzaOVMfqsZwr9l2AkaSrrzTT86S7HLYgCfsW83qx8rfCG7weTlgaP0_-YAOrIQDe-7RN_oUohDlzTqAmQ5Dorm1m18n8_VO0gW2amawPZVMDI5dYUN623AwOfHL0Xg");
//     expect(response.status).toEqual(200);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body).toHaveProperty("access_token", expect.any(String));
//   });


// });
// const emailService = require('../helpers/nodemailer');

// jest.mock('../helpers/nodemailer');

// describe('POST /otp', () => {
//   it('should respond with a server error (500) on Nodemailer error', async function () {
//     // Mock the asynchronous function to reject with an error
//     emailService.sendOTPByEmail.mockRejectedValue(new Error('Nodemailer error'));

//     const response = await request(app).post('/otp').send({
//       email: 'test2@mail.com',
//       password: '123123123',
//     });

//     expect(response.status).toEqual(500);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body).toHaveProperty('message', 'Internal server error');
//   });
// });