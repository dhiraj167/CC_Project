import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint - helps debug deployment
app.get("/", (req, res) => {
  res.json({ status: "ok", mongo_uri_set: !!process.env.MONGO_URI });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Connect to DB after server starts (don't crash if DB fails)
  connectDB();
});
