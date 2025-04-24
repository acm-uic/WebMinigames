import React from "react";
import { UserContext } from "../domain/UserContext";
import { useContext, useState, useRef } from "react";
import { ProfileBioComponent } from "../components/ProfileBioComponent.jsx";
import { ProfileDetails } from "../components/ProfileDetails.jsx";
import { GoXCircle } from "react-icons/go";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import "./profile.css";
// bg-gray-100 xs:bg-green-300 xsm:bg-red-300 sm:bg-yellow-200 md:bg-purple-800 lg:bg-pink-300 xl:bg-orange-600

export default function Profile() {
  const { username, profileIcon, aboutMe, updateProfile, isLoggedIn } =
    useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [ChangeImageIcon, setChangeImageIcon] = useState(false);
  const options = ["Image Upload"];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [imagePreview, setimagePreview] = useState([]);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    e.preventDefault();
    const validFile = [];
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    validFile.push({
      file: file,
      previewUrl: imageUrl,
    });
    setimagePreview(validFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const validFile = [];
    const file = e.dataTransfer.files[0];
    const imageUrl = URL.createObjectURL(file);
    validFile.push({
      file: file,
      previewUrl: imageUrl,
    });
    setimagePreview(validFile);
  };

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

  const handleRemoveImage = () => {
    setimagePreview([]);
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
        <div className="fixed bg-white shadow-md rounded-xl  xs:w-[80%] xs:h-[60%] md:w-[65%] md:h-[50%] sm:w-[70%] sm:h-[30%] lg:w-[42%] lg:h-[63%]  p-4 z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <div className="  flex items-center relative w-full h-[18%]">
            <p className="xs:text-2xl sm:text-3xl md:text-3xl lg:text-3xl absolute left-5">
              Update Profile Image
            </p>
            <GoXCircle
              onClick={() => {
                toggleTagPopup(), handleRemoveImage();
              }}
              className="   xs:w-[10%] xs:h-[60%]  md:w-[20%] md:h-[50%] sm:w-[20%] sm:h-[75%]  lg:w-[12%] lg:h-[45%]  absolute right-1 cursor-pointer"
            />
          </div>
          <button
            className="w-full h-[10%] bg-blue-200 flex items-center rounded border border-gray-300  px-4 py-2 text-left"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selected || "Select an option"}
          </button>
          {isOpen && (
            <div>
              <ul className="absolute z-10 mt-1 max-h-40 w-[95%] overflow-y-auto bg-white border border-gray-300 rounded shadow-lg">
                {options.map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleSelect(option),
                        setIsOpen(!isOpen),
                        handleRemoveImage();
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selected == "Embed Link" && (
            <div className="w-full h-[70%]">
              <textarea
                type="text"
                id="subject-title"
                className="w-full mt-[30px] max-h-[50px]  lg:max-h-[40%] xs:max-h-[29%] text-gray-500 text-2xl xs:text-xl lg:text-2xl bg-gray-100  pl-1 rounded-md focus:outline-none resize-none"
                placeholder="Link"
              />
              <div className="bg-gray-200 mt-1 rounded-lg absolute bottom-[5%] right-[5%] items-center justify-center flex w-[15%] h-[8%]">
                <button>Submit</button>
              </div>
            </div>
          )}
          {selected == "Image Upload" && imagePreview.length == 0 && (
            <div
              className="bg-gray-100 mt-1 w-full h-[50%] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <p className="text-black">
                Drag and drop an image here, or click to upload
              </p>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}
          {selected == "Image Upload" && imagePreview.length == 1 && (
            <>
              <div className="mt-1 bg-gray-400 w-full h-[60%] flex items-center justify-center border-2 rounded-xl">
                {/* Delete Button */}
                <button
                  className=" absolute top-[32%] right-7 xsm:w-[5%] xsm:h-[5%] xs:w-[7%] sm:w-[5%] md:h-[3.5%] md:w-[4%] lg:w-[6.5%] lg:h-[7%] lg:max-h-[30px] xl:w-[3.8%] xl:h-[4%]   bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
                  onClick={() => handleRemoveImage()}
                >
                  <FaTimes className="w-[100%] h-[100%]" />
                </button>
                <div className="rounded-full h-[200px] w-[200px]  overflow-hidden flex items-center justify-center">
                  {imagePreview.length > 0 && (
                    <img
                      src={imagePreview[0].previewUrl}
                      className="h-full w-full object-cover"
                      alt="Profile preview"
                    />
                  )}
                </div>
              </div>
              <div className="bg-gray-200 mt-1 rounded-lg absolute right-[5%] items-center justify-center flex w-[18%] h-[8%]">
                <button>Submit</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

