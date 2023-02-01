const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();
const {
  getAddressById,
  getAddressesByUserId,
  addNewAddress,
  deleteAddress,
} = require("../controllers/address.controller");

router.get("/user", protect, getAddressesByUserId);
router.post("/", protect, addNewAddress);
router.delete("/:id", protect, deleteAddress);

module.exports = router;
