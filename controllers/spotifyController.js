const axios = require("axios");
const User = require("../models/User");

async function getSpotifyData(userId) {
  const user = await User.findById(userId);
  return user;
}

exports.searchArtist = async (req, res) => {
  try {
    const { query } = req.query;
    const artist = await spotifyService.searchArtist(
      req.user.accessToken,
      query
    );
    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: "Failed to search artist " });
  }
};

exports.searchAlbums = async (req, res) => {
  try {
    const { query } = req.query;
    const albums = await spotifyService.searchAlbums(
      req.user.accessToken,
      query
    );
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: "Failed to search albums" });
  }
};

exports.searchTracks = async (req, res) => {
  try {
    const { query } = req.query;
    const tracks = await spotifyService.searchTracks(
      req.user.accessToken,
      query
    );
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: "Failed to search tracks" });
  }
};
