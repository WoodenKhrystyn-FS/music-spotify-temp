import React from "react";
import login from "../api/spotifyAPI";

function Dashboard() {
  return (
    <div>
      <h1> Spotify Dashboard</h1>
      <button onClick={login}>Login with Spotify</button>
    </div>
  );
}

export default Dashboard;
