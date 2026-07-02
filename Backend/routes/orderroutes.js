const express = require("express");
const router = express.Router();

const {
  checkout,
  getUserOrders,
  getAllOrders,
  updateStatus
} = require("../controllers/orderController");

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

router.post("/checkout", auth, checkout);
router.get("/my", auth, getUserOrders);
router.get("/all", auth, adminOnly, getAllOrders);
router.put("/update/:id", auth, adminOnly, updateStatus);

module.exports = router;
