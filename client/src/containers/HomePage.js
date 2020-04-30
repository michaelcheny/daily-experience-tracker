// import React from "react";

// const HomePage = () => {
//   return (
//     <div>
//       <h1>YO WE T DA HOMEPAGE</h1>
//     </div>
//   );
// };

// export default HomePage;
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const HomePage = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>yoyo</h1>
      <h5>hello {user ? user.email : null}</h5>
      <p>{user ? user.created_at : null}</p>
    </div>
  );
};

export default HomePage;
