require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/db");

connectToDB().catch((err) => {
  console.error("Database connection failed:", err);
});

module.exports = app;
