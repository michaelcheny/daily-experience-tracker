import React, { useState, useEffect } from "react";

const LoginPage = () => {
  const baseUrl = "http://localhost:3001/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("email: " + email);
    console.log("password: " + password);
    // method to post to /api and save token and shieeet

    setEmail("");
    setPassword("");
  };

  const loginThingy = async () => {
    const res = await fetch(baseUrl, {
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
    const data = res.json();
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
