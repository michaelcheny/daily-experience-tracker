import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import NavBar from "./components/HomePage/NavBar";
import { UserContext } from "./context/UserContext";
import ProfilePage from "./containers/ProfilePage";
import { ThemeContext, themes } from "./context/ThemeContext";

function App() {
  const [user, setUser] = useState("");
  const [theme, setTheme] = useState({ theme: themes.light });

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3001/auto_login", {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          console.log(data);
        });
    }
  }, []);

  const GlobalStyles = createGlobalStyle`
  body {
    background: ${theme};
  }
  `;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <GlobalStyles />
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <NavBar />
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/profile">
                <ProfilePage />
              </Route>
            </Switch>
          </Router>
        </UserContext.Provider>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
