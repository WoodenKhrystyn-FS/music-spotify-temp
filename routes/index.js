const express = require("express");
const router = express.Router();
const authTracker = require("../middleware/authTracker");

// GET login status
router.get("/login", authTracker.login);

// GET logout
router.get("/logout", authTracker.logout);

//Callback route
router.get("/callback", authTracker.callback);

//Refresh token route
router.get("/refresh_token", authTracker.refreshToken);

// POST login
router.post("/token", authTracker.getAccessToken);

module.exports = router;
