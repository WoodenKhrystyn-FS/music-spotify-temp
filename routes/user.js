const express = require("express");
const router = express.Rputer();
const userController = require("../controllers/loginController");

//Login route
router.get("/login", userController.login);

//Logout route
router.post("/logout", userController.logout);

//Spotify callback route
router.get("/callback", userController.callback);

module.exports = router;