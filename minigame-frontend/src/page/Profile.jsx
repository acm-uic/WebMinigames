import React from 'react'
import { ProfileBioComponent } from "../components/ProfileBioComponent.jsx";
/* A next step can be making a default card */

export default function Profile() {

  return (
  <div>
    <h1>Profile Page</h1>

    <ProfileBioComponent
      imageLink = {"https://i.pinimg.com/736x/c6/25/f6/c625f6315130d8329a95ae27d8e95564.jpg"}
      /*Usernames have a 12 character limit to not trigger overflow*/
      user = {"LaserGhost99"}
      bio = {"Greetings! I enjoy playing Fortnite, Mario Kart, and Minecraft."}
      isSignedIn = {true}
    />
    <ProfileBioComponent
      imageLink = {"https://i.pinimg.com/736x/c6/25/f6/c625f6315130d8329a95ae27d8e95564.jpg"}
      /*Usernames have a 12 character limit to not trigger overflow*/
      user = {"LaserGhost99"}
      bio = {"Greetings! I enjoy playing Fortnite, Mario Kart, and Minecraft."}
      isSignedIn = {false}
    />
    
  </div>
  )
}