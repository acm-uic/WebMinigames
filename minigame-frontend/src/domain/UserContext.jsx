import { createContext, useContext, useState } from "react";
import { SiteContext } from "./SiteContext";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  // Default user values
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("Guest");
  const [aboutMe, setAboutMe] = useState("Nothing here yet.");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [profileIcon, setProfileIcon] = useState(
    "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
  );
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //"https://i.pinimg.com/736x/c6/25/f6/c625f6315130d8329a95ae27d8e95564.jpg"
  const {serverURL} = useContext(SiteContext);
  const createUser = async (userName, email, password, bio = "") => {
    userName = userName.trim();
    console.log({ userName, email, password, bio });
    const response = await fetch(`${serverURL}/api/public/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, email, password, bio }),
    });

    if (!response.ok) {
      console.error(response);
      return false;
    }
    console.log("User created successfully");
    await loginUser(email, password);

    return true;
  };

  const loginUser = async (email = "", password) => {
    console.log({ email, password });
    const response = await fetch(`${serverURL}/api/public/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.error(response);
      return false;
    }
    const res = await response.json();
    console.log(res);
    setIsLoggedIn(true);
    setUserId(res.data.user._id);
    setUsername(res.data.user.userName);
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    return true;
  };

  const updateProfile = async (newName, bio, avatar) => {
    console.log(accessToken);
    console.log({ userName: newName, email: "", bio: bio });
    const response = await fetch(
      `${serverURL}/api/private/users/updateProfile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: accessToken,
        },
        body: JSON.stringify({ userName: newName, email: "", bio: bio }),
        file: avatar,
      }
    );

    const res = await response.json();
    if (!response.ok) {
      console.error(res.message);
      return false;
    }
    console.log(res);
    console.log("profile updated successfully");
    setProfileIcon(res.data.avatar);
    setAboutMe(res.data.bio);
    setUsername(res.data.userName);
    return true;
  };

  const createPost = async (title, body, media) => {
    // Create form data
    const formData = new FormData();
    formData.append('user', JSON.stringify({ _id: userId, userName: username }));
    formData.append('title', title);
    formData.append('body', body);

    // Append images to the form data
    Array.from(media).forEach((file) => {
      formData.append('images', file);
    });

    console.log({_id:userId, userName: username}, { title:title, body:body }, {media: media})
    const response = await fetch(`${serverURL}/api/private/posts/create`, {
      method: "POST",
      headers: {
        authorization: accessToken,
      },
      body: formData
    });

    const res = await response.json();
    if (!response.ok) {
      console.error(res.message);
      return false;
    }
    console.log(res);
    console.log("post created successfully");

    return true;
  }

  return (
    <UserContext.Provider
      value={{
        userId,
        username,
        aboutMe,
        profileIcon,
        fg: [favoriteGames, setFavoriteGames],
        createUser,
        loginUser,
        isLoggedIn,
        updateProfile,
        createPost
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
