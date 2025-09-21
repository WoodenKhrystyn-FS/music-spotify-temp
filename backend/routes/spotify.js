const express = require("express");
const router = express.Router();
const spotifyController = require("../controllers/spotifyController");
const { verifyToken } = require("../middleware/authTracker");

//Search route:
router.get("/search", verifyToken, spotifyController.search);

//Get music info routes: track, album, artist
router.get("/track/:id", verifyToken, spotifyController.getTrack);
router.get("/album/:id", verifyToken, spotifyController.getAlbum);
router.get("/artist/:id", verifyToken, spotifyController.getArtist);

module.exports = router;
