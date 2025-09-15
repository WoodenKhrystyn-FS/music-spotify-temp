const express = require("express");
const router = express.Router();
const spotifyController = require("../controllers/spotifyController");

//Search route:
router.get("/search", spotifyController.search);

//Get music info routes: track, album, artist
router.get("/track/:id",spotifyController.getTrack);
router.get("/album/:id",spotifyController.getAlbum);
router.get("/artist/:id",spotifyController.getArtist);

module.exports = router;
