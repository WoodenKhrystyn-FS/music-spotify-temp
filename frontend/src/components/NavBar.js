import React from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function NavBar() {
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
