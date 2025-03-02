import React from 'react'
import { UserContext } from "../domain/UserContext";
import { useContext } from "react";
import { ProfileBioComponent } from "../components/ProfileBioComponent.jsx";
import { ProfileDetails } from "../components/ProfileDetails.jsx";
/* A next step can be making a default card */
import "./profile.css";

export default function Profile() {
  const {username, setUsername} = useContext(UserContext);
  return (
  <div>
    {/* {username} */}

    {/* <button onClick={() => setUsername("Hello Username")}>Change username</button> */}
    <ProfileBioComponent
      imageLink = {"https://i.pinimg.com/736x/c6/25/f6/c625f6315130d8329a95ae27d8e95564.jpg"}
      /*Usernames have a 12 character limit to not trigger overflow*/
      user = {"LaserGhost99"}
      bio = {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
      isSignedIn = {true}
    />
    <ProfileDetails
      /*Usernames have a 12 character limit to not trigger overflow*/
      user = {"LaserGhost99"}
    />
    
  </div>
  )
}