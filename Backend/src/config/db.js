const mongoose = require("mongoose");

let isConnected = false;

async function connectToDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;

    console.log("MongoDB connected successfully");
  } catch (err) {
    isConnected = false;
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}

module.exports = connectToDB;
