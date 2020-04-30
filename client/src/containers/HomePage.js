// import React from "react";

// const HomePage = () => {
//   return (
//     <div>
//       <h1>YO WE T DA HOMEPAGE</h1>
//     </div>
//   );
// };

// export default HomePage;
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

const HomePage = () => {
  const fromContext = useContext(UserContext);
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
    <div>
      <h1>yoyo</h1>
      <h5>from context: {fromContext}</h5>
      <p>{user.email}</p>
    </div>
  );
};

export default HomePage;
