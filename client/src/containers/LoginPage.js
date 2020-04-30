import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const url = "http://localhost:3001/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(email, password);
    setEmail("");
    setPassword("");
  };

  const loginUser = async (email, password) => {
    const res = await fetch(url, {
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
    const data = await res.json();
    const token = res.headers.get("authorization");
    localStorage.setItem("token", token);
    // UserContext
    setUser(data);
    return data;
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
