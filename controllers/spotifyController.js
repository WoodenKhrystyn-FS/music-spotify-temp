const axios = require("axios");

const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

exports.searchArtist = async (token, query) => {
  const response = await axios.get("https://api.spotify.com/v1/search", {
    headers: getAuthHeader(token),
    params: {
      q: query,
      type: "artist",
    },
  });
  return response.data.artists.items;
};

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
