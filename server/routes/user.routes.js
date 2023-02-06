const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  editCurrentUser,
} = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.put("/me/edit/:id", protect, editCurrentUser);

module.exports = router;
