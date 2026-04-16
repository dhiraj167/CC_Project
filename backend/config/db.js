// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    // Don't exit - let server keep running so we can debug
  }
};

export default connectDB;