const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetch = require("node-fetch");

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

// GET app login status
exports.login = (req, res) => {
  const token = req.cookies?.token;
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
  const { code } = req.query;

  if (!code) return res.status(400).json({ error: "Code Missing" });

  try {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

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
        body: params.toString(),
      }
    );
    const info = await tokenResponse.json();
    const { access_token, refresh_token } = info;

    if (!access_token) {
      return res
        .status(400)
        .json({ error: "Failed to get access token from Spotify" });
    }

    //Request user profile info:
    const userProfile = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const profile = await userProfile.json();

    //Request to save/edit user and save in Mongo:
    const user = await User.findOneAndUpdate(
      { spotifyId: profile.id },
      { displayName: profile.display_name, refreshToken: refresh_token },
      { upsert: true, new: true }
    );

    //JWT:
    const jwtToken = jwt.sign(
      { id: user._id, spotifyId: profile.id },
      process.env.JWT_SECRET,
      { expiresIn: "3600s" }
    );

    res.cookie("token", jwtToken, { httpOnly: true, maxAge: 3600 * 1000 });
    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    console.error("Error during Spotify callback:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during Spotify callback" });
  }
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  const info = await tokenResponse.json();
  if (!info.access_token) {
    return res.status(400).json({ error: "Failed to refresh access token" });
  }
  res
    .status(200)
    .json({
      access_token: info.access_token,
      refresh_token: info.refresh_token,
    });
};
