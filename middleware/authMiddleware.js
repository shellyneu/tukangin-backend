const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const authentication = asyncHandler(async (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const verified = jwt.verify(
    token,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized!" });
      }

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "Unauthorized!" });
      }

      req.user = user;
      next();
    }
  );
});

module.exports = { authentication };
