const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const {
  getUserOrders,
  createOrder,
} = require("../controllers/order.controller");

const router = express.Router();

router.get("/myOrders", protect, getUserOrders);
router.post("/newOrder", protect, createOrder);

module.exports = router;
