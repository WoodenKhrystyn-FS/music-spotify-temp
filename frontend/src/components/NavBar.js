import React from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function NavBar() {
  //Navigation bar with links to different pages and a logout button
  //Logout function clears token and redirects back to the login page

  return (
    <nav className="navbar" style={styles.navbar}>
      <h2>Spotify Music</h2>
      <div>
        <Link to="/search" style={styles.link}>
          Search
        </Link>
        <Link to="/protected" style={styles.link}>
          Protected
        </Link>
        <LogoutBtn />
      </div>
    </nav>
  );
}

export default NavBar;

//Styles NavBar component
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#1DB954",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
