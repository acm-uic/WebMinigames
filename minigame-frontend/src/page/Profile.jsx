import React, { useEffect } from 'react'
import { UserContext } from "../domain/UserContext";
import { useContext, useState } from "react";
import { ProfileBioComponent } from "../components/ProfileBioComponent.jsx";
import { ProfileDetails } from "../components/ProfileDetails.jsx";
import "./profile.css";
import { SiteContext } from '../domain/SiteContext.jsx';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const {serverURL} = useContext(SiteContext);
  const {userId, username, profileIcon, aboutMe, updateProfile,isLoggedIn } = useContext(UserContext);
  let params = useParams();

  const [isOwnedAccound, setIsOwnedAccound] = useState(!params.userId || params.userId == userId);

  const [currUserId, setCurrUserId] = useState(params.userId ? params.userId : userId); // TODO set user ID
  const [currUserPosts, setCurrUserPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const updateBio = (username, bio, image) => {
    console.log("updating profile");
    updateProfile(username, bio, image)
    .then((res) => res == true ? handleEdit() : console.log("failed to update profile"));
  }

  const handleEdit = () => {
    setEditing((prev)=> !prev);
  }

  

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`${serverURL}/api/public/posts/get?userId=${currUserId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(response);
        return false;
      }
      const res = await response.json();
      console.log(res);
      setCurrUserPosts(res.data);
    }

    fetchUserPosts();
  }, [])

  return (
    <div>
      <ProfileBioComponent
        imageLink={profileIcon}
        user={username}
        bio={aboutMe}
        handleEdit={handleEdit}
        canEdit={isOwnedAccound && isLoggedIn}
        editing={editing}
        updateBio={updateBio}
      />
      <ProfileDetails
        posts={currUserPosts}
        favorites={["Fortnite", "Smash", "DBZ", "Halo", "Pokemon", "Warhammer"]}
        interests={["First-Person Shooter", "Action", "Adventure", "JRPG", "RPG"]}
      />
    </div>
  )
}