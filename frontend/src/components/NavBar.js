import React from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function NavBar() {
  //Navigation bar with links to different pages and a logout button
  return (
    <nav className="navbar" style={styles.navbar}>
      <Link to="/search" style={styles.link}>
        Search
      </Link>
      <Link to="/protected" style={styles.link} s>
        Protected
      </Link>
      <LogoutBtn />
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
