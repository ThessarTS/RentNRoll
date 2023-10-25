const Redis = require("ioredis");
const redis = new Redis({
  port: 15470,
  host: "redis-15470.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "2PShrB4c0kHjG2DUY27OfSA6g0vYLZIe",
});
module.exports = redis;
