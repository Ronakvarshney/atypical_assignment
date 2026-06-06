require("dotenv").config();

const Config = {
  port: process.env.PORT || 5000,
  DB_HOST: "localhost",
  DB_PORT: 5432,
  DB_USER: "postgres",
  DB_PASSWORD: "ronak",
  DB_NAME: "realtime_orders",
};

module.exports = Config;
