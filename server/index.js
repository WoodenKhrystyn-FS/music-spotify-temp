require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
// const SpotifyWebApi = require("spotify-web-api-node");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Basic route to check server status
app.get("/", (req, res) => {
  res.json({
    message:
      "Server is running. Navigate to /login to authenticate with Spotify.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
