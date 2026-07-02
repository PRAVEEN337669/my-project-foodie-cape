 const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeItem
} = require("../controllers/cartController");

const auth = require("../middleware/auth");

router.post("/add", auth, addToCart);
router.get("/", auth, getCart);
router.delete("/:productId", auth, removeItem);

module.exports = router;
