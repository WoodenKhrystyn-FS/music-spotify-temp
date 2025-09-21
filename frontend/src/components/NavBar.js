import React from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/search">Search</Link>
      <Link to="/protected">Protected</Link>
      <LogoutBtn />
    </nav>
  );
}

export default NavBar;
