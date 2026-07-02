 const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const { auth, adminOnly } = require("../middleware/authMiddleware");

// ✅ Only admin can add food
router.post("/add", auth, adminOnly, async (req, res) => {
  const food = await Food.create(req.body);
  res.json(food);
});

// Public
router.get("/", async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

module.exports = router;
