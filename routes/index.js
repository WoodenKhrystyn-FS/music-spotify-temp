const express = require("express");
const router = express.Router();
const authTracker = require("../middleware/authTracker");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


// GET login status
router.get("/login", authTracker.login)

// GET logout
router.get("/logout", authTracker.logout)

//Callback route
router.get("/callback", authTracker.callback)   

//Refresh token route
router.get("/refresh_token", authTracker.refreshToken)


// POST login
router.post("/", async (req, res) => {});

module.exports = router;
