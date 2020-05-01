import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import NavBar from "./components/HomePage/NavBar";
import { UserContext } from "./context/UserContext";
import ProfilePage from "./containers/ProfilePage";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/Themes";
import { useDarkMode } from "./components/useDarkMode";
import Sidebar from "./components/Sidebar";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

function App() {
  const [user, setUser] = useState("");
  const [theme, themeToggler] = useDarkMode();

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
        {/* <div className="App"> */}
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <NavBar toggleTheme={themeToggler} theme={theme} />
            {/* <Sidebar /> */}
            <Switch>
              <main>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/profile" component={ProfilePage} />
              </main>
            </Switch>
          </Router>
        </UserContext.Provider>
        {/* </div> */}
      </>
    </ThemeProvider>
  );
}

export default App;
