const spotifyAPI = require("../services/spotifyAPI");

//Search for All
exports.search = async (req, res) => {
  const { q, type } = req.query;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  if (!q || !type) {
    return res.status(400).json({ error: "Missing query or type parameter" });
  }
  const types = type.split(",");
  let results;

  try {
    for (const t of types)
      switch (t) {
        case "artist":
          results = await spotifyAPI.searchArtist(token, q);
          break;
        case "album":
          results = await spotifyAPI.searchAlbums(token, q);
          break;
        case "track":
          results = await spotifyAPI.searchTracks(token, q);
          break;
        default:
          return res.status(400).json({ error: "Invalid type of parameter" });
      }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Spotify API" });
  }
};

// Search for artists
exports.getArtist = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1]; // Expect
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  if (!id) {
    return res.status(400).json({ error: "Missing artist ID parameter" });
  }

  try {
    const artist = await spotifyAPI.getArtist(token, id);
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Spotify API" });
  }
};

// Search for albums
exports.getAlbum = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1]; // Expect
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  if (!id) {
    return res.status(400).json({ error: "Missing album ID parameter" });
  }

  try {
    const album = await spotifyAPI.getAlbum(token, id);
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Spotify API" });
  }
};

// Search for tracks
exports.getTrack = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1]; // Expect
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  if (!id) {
    return res.status(400).json({ error: "Missing track ID parameter" });
  }

  try {
    const track = await spotifyAPI.getTrack(token, id);
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Spotify API" });
  }
};
