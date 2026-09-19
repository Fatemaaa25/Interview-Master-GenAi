require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");
const generateInterviewReport = require("./src/services/ai.service");

connectToDB();
module.exports = app;
