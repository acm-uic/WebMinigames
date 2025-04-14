import React from 'react'
import { UserContext } from "../domain/UserContext";
import { useContext, useState } from "react";
import { ProfileBioComponent } from "../components/ProfileBioComponent.jsx";
import { ProfileDetails } from "../components/ProfileDetails.jsx";
import "./profile.css";

export default function Profile() {
  const { username, profileIcon, aboutMe, updateProfile,isLoggedIn } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const updateBio = (username, bio, image) => {
    console.log("updating profile");
    updateProfile(username, bio, image)
    .then((res) => res == true ? handleEdit() : console.log("failed to update profile"));
  }

  const handleEdit = () => {
    setEditing((prev)=> !prev);
  }

  return (
    <div>
      <ProfileBioComponent
        imageLink={profileIcon}
        user={username}
        bio={aboutMe}
        handleEdit={handleEdit}
        canEdit={isLoggedIn}
        editing={editing}
        updateBio={updateBio}
      />
      <ProfileDetails
        favorites={["Fortnite", "Smash", "DBZ", "Halo", "Pokemon", "Warhammer"]}
        interests={["First-Person Shooter", "Action", "Adventure", "JRPG", "RPG"]}
        user={"LaserGhost99"}
      />
    </div>
  )
}