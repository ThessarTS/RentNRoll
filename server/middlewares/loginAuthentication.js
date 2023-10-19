const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "unauthenticated" };
    }
    const data = verifyToken(access_token);
    const findUser = await User.findByPk(data.id);
    if (!findUser) {
      throw "unauthenticated";
    }
    req.user = {
      id: findUser.id,
      email: findUser.email,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
