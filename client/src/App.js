import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import NavBar from "./components/HomePage/NavBar";
import { UserContext } from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <UserContext.Provider value="helloooo">
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
