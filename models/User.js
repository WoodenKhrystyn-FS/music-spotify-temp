const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    spotifyId: { type: String, required: true, unique: true },
    displayName: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
