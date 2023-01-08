const asyncHandler = require("express-async-handler");
const Order = require("../models/order.model");

// @desc        Get current users orders
// @route       GET request to /api/orders/myOrders
// @access      private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

// @desc        Generate a new order
// @route       POST request to /api/orders/newOrder
// @access      private
const createOrder = asyncHandler(async (req, res) => {
  const order = await {
    user: req.user._id,
    price: req.body.price,
    address: req.body.address,
    products: req.body.products,
  };

  if (order) {
    try {
      await Order.create(order);
      res.status(200).json({ message: "Order sent" });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: err });
    }
  }
});

module.exports = { getUserOrders, createOrder };
