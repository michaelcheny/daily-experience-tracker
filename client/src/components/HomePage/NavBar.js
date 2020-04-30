import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ThemeContext } from "../../context/ThemeContext";

const NavBar = () => {
  const { setUser } = useContext(UserContext);
  const { toggleTheme } = useContext(ThemeContext);

  const handleLogOut = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/logout", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    // return await res.json();
    setUser(null);
  };

  return (
    <nav className="navbar">
      {/* INSERT IMAGE HERE */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <h3 className="main-title" onClick={toggleTheme}>
          EXP TRACKA
        </h3>
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
        <Link>
          <li onClick={handleLogOut}>Log Out</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;