import React from "react";

function MyFavorites() {
  if (track === "track") {
    return <div>Track Card</div>;
  }

  return (
    <div className="my-favorites">
      <h1>My Favorites</h1>
      <p>Welcome to Your Favorites!</p>

      {/* Add your favorite tracks, albums, or artists here */}
      <div>
        <h2>Favorite Tracks</h2>
      </div>
      <div>
        <h2>Favorite Albums</h2>
      </div>
      <div>
        <h2>Favorite Artists</h2>
      </div>
    </div>
  );
}

export default MyFavorites;
