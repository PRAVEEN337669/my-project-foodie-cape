const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

// ADD FOOD
router.post("/add", async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL FOOD
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;