import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import NavBar from "./components/HomePage/NavBar";
import { UserContext } from "./context/UserContext";
import ProfilePage from "./containers/ProfilePage";
import { ThemeContext, themes } from "./context/ThemeContext";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/Themes";

function App() {
  const [user, setUser] = useState("");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
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

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="App">
          <UserContext.Provider value={{ user, setUser }}>
            <Router>
              <NavBar toggleTheme={toggleTheme} />
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
      </>
    </ThemeProvider>
  );
}

export default App;
