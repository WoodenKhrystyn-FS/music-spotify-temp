const axios = require("axios");

const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

//Handle requests to Spotify API
const handleRequest = async (url, token, params = {}) => {
  try {
    const response = await axios.get(url, {
      headers: getAuthHeader(token),
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error in fetching data from Spotify API", error);
    throw error;
  }
};

// Search for artists
exports.searchArtist = async (token, query) => {
  const response = await handleRequest(
    "https://api.spotify.com/v1/search",
    token,
    {
      q: query,
      type: "artist",
      params: { limit: 10 },
    }
  );
  return response.artists.items;
};

// Search for albums
exports.searchAlbums = async (token, query) => {
  const response = await handleRequest(
    "https://api.spotify.com/v1/search",
    token,
    {
      q: query,
      type: "album",
      params: { limit: 10 },
    }
  );
  return response.albums.items;
};

// Search for tracks
exports.searchTracks = async (token, query) => {
    const response = await handleRequest(
      "https://api.spotify.com/v1/search",
      token,
      {
        q: query,
        type: "track",
        params: { limit: 10 },
      }
    );
    return response.tracks.items;
};