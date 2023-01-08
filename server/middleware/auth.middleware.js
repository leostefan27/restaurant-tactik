const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from the header
      token = req.headers.authorization.split(" ")[1];

      //   Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //   Get user
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "Access Not Allowed" });
    }
  }

  if (!token) {
    res.status(400).json({ message: "Access Token Not Found" });
  }
});

module.exports = { protect };
