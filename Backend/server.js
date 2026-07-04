const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://my-project-foodie-cape.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

// MongoDB Connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
    process.exit(1);
  }
};

connectDB();

// Routes
const foodRoute = require("./routes/foodRoutes");
const authRoute = require("./routes/authRoutes");

app.use("/api/food", foodRoute);
app.use("/api/auth", authRoute);

// Home Route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});