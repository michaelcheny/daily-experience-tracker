import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import NavBar from "./components/HomePage/NavBar";
import { UserContext } from "./context/UserContext";

function App() {
  const [user, setUser] = useState("");

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
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
