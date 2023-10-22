const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { generateOTP, sendOTPByEmail } = require("../helpers/nodemailer");
const { User, UserProfile, Order } = require("../models");
const { OAuth2Client } = require("google-auth-library");
class UserController {
  static async register(req, res, next) {
    try {
      const { fullName, email, password, phone } = req.body;
      await User.create({ fullName, email, password, phone });
      res.status(201).json({ message: `Account succesfully created!` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getOTP(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password) throw { name: "login_empty_field" };
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "email_is_not_registered" };
      const passValid = comparePassword(password, user.password);
      if (!passValid) throw { name: "invalid_password" };
      const generate_otp = generateOTP();

      await user.update({ otp: generate_otp });

      await sendOTPByEmail(user.email, generate_otp);
      res.json({ message: "OTP sent" });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    const { email, password, otp } = req.body;
    try {
      if (!email || !password) throw { name: "empty_field" };
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "invalid_email_password" };
      const passValid = comparePassword(password, user.password);
      if (!passValid) throw { name: "invalid_email_password" };
      console.log(user, "===", otp);
      if (user.otp !== otp) throw { name: "invalid_otp" };
      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async gLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const [user, isCreated] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          fullName: payload.name,
          email: payload.email,
          password: "iniRandomAja",
        },
        hooks: false,
      });
      const access_token = signToken({
        id: user.id,
      });
      let status = 200;
      if (isCreated) {
        status = 201;
      }
      res.status(status).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
  static async createProfile(req, res, next) {
    try {
      const { ktp, simA, simC } = req.body;
      await UserProfile.create({ ktp, simA, simC, UserId: req.user.id });
      res.status(201).json({ message: `Account profile succesfully created!` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getProfile(req, res, next) {
    try {
      const data = await User.findOne({
        where: { email: req.user.email },
        attributes: { exclude: ["password"] },
        include: [UserProfile, Order],
      });

      // Get the total number of orders
      const totalOrders = data.Orders.length;

      // Remove the Orders array to avoid circular serialization
      delete data.dataValues.Orders;

      // Add totalOrders to the response
      data.dataValues.totalOrders = totalOrders;

      // Console log the totalOrders
      console.log("Total Orders:", totalOrders);

      res.json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async editProfile(req, res, next) {
    try {
      const { ktp, simA, simC } = req.body;
      if (!ktp) {
        throw { name: "KTP is required!" };
      }
      await UserProfile.update({ ktp, simA, simC }, { where: { UserId: req.user.id } });
      res.json({ message: "Successfully updated!" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      await User.destroy({ where: { id: req.user.id } });
      res.json({ message: "Account successfully deleted!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
