import React from "react";
import { UserContext } from "../domain/UserContext";
import { useContext } from "react";

const Profile = () => {
  const {username, setUsername} = useContext(UserContext);
  return <div>Profile Page
    {username}

    <button onClick={() => setUsername("Hello Username")}>Change username</button>
  </div>;
};
export default Profile;
