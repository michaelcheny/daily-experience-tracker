import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const baseUrl = "http://localhost:3001/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("email: " + email);
    console.log("password: " + password);
    // method to post to /api and save token and shieeet
    loginUser(email, password);
    setEmail("");
    setPassword("");
  };

  const loginUser = async (email, password) => {
    const res = await fetch(`${baseUrl}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    const token = res.headers.get("authorization");
    const data = res.json();
    localStorage.setItem("token", token);
    setUser(user);

    return data;
    // STORE THE FUCKING TOKEN and authed user in context api
    // TOKEN /////// res.headers.get("authorization")
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      ></input>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      ></input>
      <input type="submit" />
    </form>
  );
};

export default LoginPage;
