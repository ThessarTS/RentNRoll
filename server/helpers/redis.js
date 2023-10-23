const Redis = require("ioredis");
const redis = new Redis({
  port: 15470,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});
module.exports = redis;
