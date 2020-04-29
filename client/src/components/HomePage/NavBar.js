import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      {/* INSERT IMAGE HERE */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <h3 className="main-title">EXP TRACKA</h3>
      </Link>
      <ul className="nav-items">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/login">
          <li>Log In</li>
        </Link>
        <Link to="/profile">
          <li>Profile</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
