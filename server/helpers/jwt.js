var jwt = require("jsonwebtoken");
let JWT_SECRET = process.env.JWT_SECRET;

const signToken = (data) => {
  return jwt.sign(data, JWT_SECRET);
};
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { signToken, verifyToken };
