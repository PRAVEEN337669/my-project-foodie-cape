const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://frontend:5173"],
  credentials: true
}));
app.use(express.json());

// Routes
const foodRoute = require("./routes/foodRoutes");
const authRoute = require("./routes/authRoutes");

app.use("/api/food", foodRoute);
app.use("/api/auth", authRoute);

// Default route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/zipEats')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});