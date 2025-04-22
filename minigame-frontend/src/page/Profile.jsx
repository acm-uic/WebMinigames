import React from "react";
import { UserContext } from "../domain/UserContext";
import { useContext, useState } from "react";
import { ProfileBioComponent } from "../components/ProfileBioComponent.jsx";
import { ProfileDetails } from "../components/ProfileDetails.jsx";
import { GoXCircle } from "react-icons/go";
import "./profile.css";

export default function Profile() {
  const { username, profileIcon, aboutMe, updateProfile, isLoggedIn } =
    useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [ChangeImageIcon, setChangeImageIcon] = useState(false);
  const options = ["Embed Link", "Image Upload"];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const updateBio = (username, bio, image) => {
    console.log("updating profile");
    updateProfile(username, bio, image).then((res) =>
      res == true ? handleEdit() : console.log("failed to update profile")
    );
  };

  const handleEdit = () => {
    setEditing((prev) => !prev);
  };

  const toggleTagPopup = () => {
    setChangeImageIcon(!ChangeImageIcon);
  };

  const handleSelect = (option) => {
    setSelected(option);
  };

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
        setChangeImageIcon={setChangeImageIcon}
        ChangeImageIcon={ChangeImageIcon}
      />
      <ProfileDetails
        favorites={["Fortnite", "Smash", "DBZ", "Halo", "Pokemon", "Warhammer"]}
        interests={[
          "First-Person Shooter",
          "Action",
          "Adventure",
          "JRPG",
          "RPG",
        ]}
        user={"LaserGhost99"}
      />
      {ChangeImageIcon && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}
      {ChangeImageIcon && (
        <div className="fixed bg-white shadow-md rounded-xl  xs:w-[80%] xs:h-[40%] md:w-[65%] md:h-[30%] sm:w-[70%] sm:h-[30%] lg:w-[42%] lg:h-[50%]  p-4 z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <div className="  bg-green-300 flex items-center relative w-full h-[22%]">
            <p className="xs:text-2xl sm:text-3xl md:text-3xl lg:text-3xl absolute left-5">
              Update Profile Image
            </p>
            <GoXCircle
              onClick={toggleTagPopup}
              className="   xs:w-[10%] xs:h-[60%]  md:w-[20%] md:h-[50%] sm:w-[20%] sm:h-[75%]  lg:w-[12%] lg:h-[45%]  absolute right-1 cursor-pointer"
            />
          </div>
          <button
            className="w-full h-[10%] bg-green-500 border border-gray-300 rounded px-4 py-2 text-left"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selected || "Select an option"}
          </button>
          {isOpen && (
            <div className=" ">
              <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto bg-white border border-gray-300 rounded shadow-lg">
                {options.map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

