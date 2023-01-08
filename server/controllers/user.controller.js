const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

// @desc    Register new user
// @route   POST request to /api/users/
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(req.body.password, salt);
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  await User.create({
    email: req.body.email,
    password: encryptedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
  });

  res.status(200).json({
    email: User.email,
    phone: User.phone,
    firstName: User.firstName,
    lastName: User.lastName,
    phone: User.phone,
    addresses: User.addresses,
    token: generateToken(User._id),
  });
});

// @desc    Login existing user
// @route   POST request to /api/users/login/
// @access  public
const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    res.status(200).json({
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      addresses: user.addresses,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Email or password incorrect" });
    return;
  }
});

// @desc    Get current user data
// @route   GET request to /api/users/me/
// @access  private
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  res.status(200).json({
    email: user.email,
    phone: user.phone,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    addresses: user.addresses,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
