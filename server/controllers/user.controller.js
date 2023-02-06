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
  const userExists = await User.findOne({
    email: req.body.email,
  });

  if (userExists) {
    res.status(400).json({
      message: "User already exists",
    });
    return;
  }

  const newUser = await User.create({
    email: req.body.email,
    password: encryptedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
  });

  res.status(200).json({
    id: newUser._id,
    email: newUser.email,
    phone: newUser.phone,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    phone: newUser.phone,
    addresses: newUser.addresses,
    token: generateToken(newUser._id),
  });
});

// @desc    Login existing user
// @route   POST request to /api/users/login/
// @access  public
const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

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
    res.status(400).json({
      message: "Email or password incorrect",
    });
    return;
  }
});

// @desc    Get current user data
// @route   GET request to /api/users/me/
// @access  private
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(400).json({
      message: "User not found",
    });
    return;
  }

  res.status(200).json({
    id: req.user._id,
    email: user.email,
    phone: user.phone,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    addresses: user.addresses,
  });
});

// @desc    Update current user
// @route   PUT request to /api/users/me/edit
// @access  private
const editCurrentUser = asyncHandler(async (req, res) => {
  const user = User.findById(req.params.id);
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
  };

  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  await User.findByIdAndUpdate(req.params.id, newUser, { new: false });

  res.status(200).json({ message: "User updated" });
});

const generateToken = (id) => {
  const token = jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  console.log(token);
  return token;
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  editCurrentUser,
};
