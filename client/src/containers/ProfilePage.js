import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

export default ProfilePage;
