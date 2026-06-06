const { Pool } = require("pg");
const Config = require("./config");
const path = require("path");
const fs = require("fs");

const pool = new Pool({
  host: Config.DB_HOST,
  port: Config.DB_PORT,
  user: Config.DB_USER,
  password: Config.DB_PASSWORD,
  database: Config.DB_NAME,
});

const InitializeSchema = async () => {
  try {
    const schemaPath = path.join(__dirname, "../src/database/postSchema.sql");
    const schema = fs.readFileSync(schemaPath, "utf-8");

    await pool.query(schema);
    console.log("orders table ready");
  } catch (error) {
    console.error("Schema Error:", error);
  }
};

module.exports = {
  pool,
  InitializeSchema,
};
