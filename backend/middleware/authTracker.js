const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  // Middleware to verify JWT token
  verifyToken: (req, res, next) => {
    const token = req.cookies ? req.cookies.token : null;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Failed to authenticate token" });
      }
      req.user = decoded;
      next();
    });
  },
};
