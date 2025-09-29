console.log("JWT_SECRET:", process.env.JWT_SECRET);

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetch = require("node-fetch");

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

// Login route - checks if user is logged in by verifying JWT token
const login = (req, res) => {
  try {
    // const user = { id: "123", name: "Test User" };



    //Redirecting to backend upon logging into Spotify:
    const scope = "user-read-email user-read-private";
    const redirectUrl =
      `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
        redirectUri
      )}` +
      `&scope=${encodeURIComponent(scope)}`;

    res.redirect(redirectUrl);

    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    // res.json({ token });

    
  } catch (error) {
    console.error("Error in login route:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Callback route for Spotify Oauth:
const callback = async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: "Code Is Missing" });

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
      return res.status(400).json({
        error: "Failed to get access token from Spotify",
        details: info,
      });
    }

    //Request user profile info:
    const userProfile = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const profile = await userProfile.json();

    //Save or edit user in MongoDB:
    const user = await User.findOneAndUpdate(
      { spotifyId: profile.id },
      { displayName: profile.display_name, refreshToken: refresh_token },
      { upsert: true, new: true }
    );

    //Sign JWT:
    const jwtToken = jwt.sign(
      { id: user._id, spotifyId: profile.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } //Dummy time for testing is 1min, will change to 1hr later
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      maxAge: 3600 * 1000,
      sameSite: "None",
      secure: true,
    }); //1hr cookie
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${jwtToken}`);
  } catch (error) {
    console.error("Error during Spotify callback:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during Spotify callback" });
  }
};

// GET refreshed token:
const refreshToken = async (req, res) => {
  // res.status(200).json({ message: "Successfull token Refeshed" });

  const { refresh_token } = req.body;

  if (!refresh_token)
    return res.status(400).json({ error: "Missing refreshed token" });

  try {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
      client_id: clientId,
      client_secret: clientSecret,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await response.json();
    if (data.error) return res.status(400).json(data);

    res.json({
      access_token: data.access_token,
      expires_in: data.expires_in,
    });
  } catch (error) {
    console.log("Error with refreshing token", error);
    res.status(500).json({ error: "Token refreshed failed" });
  }
};

module.exports = {
  login,
  callback,
  refreshToken,
};
