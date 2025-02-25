import React from 'react'
import { UserContext } from "../domain/UserContext";
import { useContext } from "react";
import { ProfileBioComponent } from "../components/ProfileBioComponent.jsx";
import LikedGames from "../components/LikedGames.jsx";
/* A next step can be making a default card */

export default function Profile() {
  // Import all user context values
  const {un, am, pi, fg} = useContext(UserContext);
  const [username, setUsername] = un;
  const [aboutMe, setAboutMe] = am;
  const [profileIcon, setProfileIcon] = pi;
  const [favoriteGames, setFavoriteGames] = fg;

  return (
  <div>
    <h1>Profile Page</h1>
    <button onClick={() => {
      setUsername("LaserGhost99")
      setAboutMe("Greetings! I enjoy playing Fortnite, Mario Kart, and Minecraft.")
      setProfileIcon("https://i.pinimg.com/736x/c6/25/f6/c625f6315130d8329a95ae27d8e95564.jpg")
      setFavoriteGames([{name: "Fortnite", link: "/game"}, {name: "Mario Kart", link: "/game"}, {name: "Minecraft", link: "/game"}])
    }}>Change context</button>

    <ProfileBioComponent
      imageLink = {profileIcon}
      /*Usernames have a 12 character limit to not trigger overflow*/
      user = {username}
      bio = {aboutMe}
      isSignedIn = {username !== "Guest"}
    />

    <LikedGames games={favoriteGames} />
    
  </div>
  )
}