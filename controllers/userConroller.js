exports.getProfile = async (req, res) => {
  res.status(200).json({ profile: req.user })
};

exports.updateProfile = async (req, res) => {
    res.status(200).json({ message: "Profile updated successfully" });
}

exports.addToFavorites = async (req, res) => {
    res.status(200).json({ message: "Added to favorites" });
}

exports.removeFromFavorites = async (req, res) => {
    res.status(200).json({ message: "Removed from favorites" });
}

exports.getFavorites = async (req, res) => {
    res.status(200).json({ favorites: [] });
}