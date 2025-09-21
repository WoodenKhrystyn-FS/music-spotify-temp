require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./backend/routes/index");
const spotifyRoutes = require("./backend/routes/spotify");

const app = express();

// Initialize Express app

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/api", authRoutes);
app.use("/spotify", spotifyRoutes);

app.use("/auth", authRoutes);

// Load env. variables
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/musicDB";

//CORS:
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json({
    message:
      "Server is running. Navigate to /login to authenticate with Spotify.",
  });
});

//Start serverL
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
