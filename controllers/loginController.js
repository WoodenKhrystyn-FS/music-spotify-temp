const jwt = require("jsonwebtoken");
const User = require("../models/User");

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

// GET app login status
exports.login = (req, res) => {
  const token = req.cookies ? req.cookies.token : null;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ loggedIn: false, message: "Invalid token" });
      } else {
        return res.status(200).json({ loggedIn: true, user: decoded });
      }
    });
  } else {
    return res
      .status(200)
      .json({ loggedIn: false, message: "No token provided" });
  }
};

// GET app logout status
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

// Callback route for Spotify auth:
exports.callback = async (req, res) => {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (error) {
    console.error("Error during Spotify callback:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during Spotify callback" });
  }
};

// Refresh token route
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.query;
  if (!refreshToken) {
    return res.status(400).json({ error: "Missing refresh_token parameter" });
  }

  try{
    

  } catch (error) {

  }
};
