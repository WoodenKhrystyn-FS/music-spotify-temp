import axios from 'axios';

const API_URL = process.env.REACT_APP_URL || 'http://localhost:3000/api';

const spotifyAPI = {
  search: async (query, type = 'track,album,artist', limit = 10) => {
    try {
      const response = await axios.get(`${API_URL}/spotify/search`, {
        params: { q: query, type, limit },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error searching Spotify:', error);
      throw error;
    }
  },

  getTrack: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/spotify/track/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching track:', error);
      throw error;
    }
  },

  getAlbum: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/spotify/album/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching album:', error);
      throw error;
    }
  },

  getArtist: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/spotify/artist/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching artist:', error);
      throw error;
    }
  },
};

export default spotifyAPI;