const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const loginController = require("../controllers/loginController");
const { verifyToken } = require("../middleware/authTracker");

//Login status
router.get("/login", loginController.login);

//Callback route
router.get("/callback", loginController.callback);

//Protected route example
router.get("/protected", verifyToken, (req, res) => {
  res
    .status(200)
    .json({ message: "Access to protected route granted", user: req.user });
});

//JWT validation route
router.get("/validateToken", verifyToken, (req, res) => {
  res.status(200).json({ message: "Token is valid", user: req.user });
});

//Refresh token route
router.get("/refreshToken", loginController.refreshToken);

//Test route:
router.get("/test", (req, res) => {
  const payload = { id: "testUserId" };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  console.log("Generated Test Token:", token);
  res.json({ token });
});

module.exports = router;
