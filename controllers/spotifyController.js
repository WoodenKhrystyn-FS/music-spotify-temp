const axios = require("axios");

const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

//Handle requests to Spotify API
const handleRequest = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: getAuthHeader(token),
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error in fetching data from Spotify aPI", error);
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
    }
  );
  return response.artists.items;
};


// Search for albums
exports.searchAlbums = async (token, query) => {
  const response = await axios.get("https://api.spotify.com/v1/search", {
    headers: getAuthHeader(token),
    params: {
      q: query,
      type: "album",
    },
  });
  return response.data.albums.items;
};

// Search for tracks
exports.searchTracks = async (token, query) => {
  const response = await axios.get("https://api.spotify.com/v1/search", {
    headers: getAuthHeader(token),
    params: {
      q: query,
      type: "track",
    },
  });
  return response.data.tracks.items;
};
