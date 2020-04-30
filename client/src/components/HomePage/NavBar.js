import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const NavBar = ({ toggleTheme, theme }) => {
  const { setUser } = useContext(UserContext);

  const handleLogOut = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:3001/logout", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
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
