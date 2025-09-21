const express = require("express");
const router = express.Rputer();
const userController = require("../controllers/userController");

//Login route
router.get("/login", userController.login);

//Logout route
router.post("/logout", userController.logout);

//Spotify callback route
router.get("/callback", userController.callback);

//Favorites routes
router.get("/favorites", userController.getFavorites);
router.post("/favorites", userController.addFavorite);
router.delete("/favorites/:id", userController.removeFavorite);

module.exports = router;