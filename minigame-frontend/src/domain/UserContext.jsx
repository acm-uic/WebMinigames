import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
  // Default user values
  const [username, setUsername] = useState("Guest");
  const [aboutMe, setAboutMe] = useState("Nothing here yet.");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("")
  const [profileIcon , setProfileIcon] = useState("https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg");
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
//"https://i.pinimg.com/736x/c6/25/f6/c625f6315130d8329a95ae27d8e95564.jpg"
  const serverURL = import.meta.env.VITE_APP_SERVER_URL;
  const createUser = async (userName, email, password, bio="") => {
    console.log({userName, email, password, bio})
    const response = await fetch(`${serverURL}/api/public/users/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userName, email, password, bio})
      }, 
    );

    if (!response.ok) {
      console.error(response);
      return false;
    }
    console.log("User created successfully");
    await loginUser(email, password);

    return true;
  }

  const loginUser = async (email = "", password) => {
    console.log({email, password})
    const response = await fetch(`${serverURL}/api/public/users/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
      },
    );

    if (!response.ok) {
      console.error(response);
      return false;
    }
    const res = await response.json()
    setIsLoggedIn(true);
    setUsername(res.data.user.userName);
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    return true
  }

  const updateProfile = async (newName, bio, avatar) => {
    console.log(accessToken)
    console.log({userName:newName, email:"", bio:bio});
    const response = await fetch(`${serverURL}/api/private/users/updateProfile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": accessToken
        },
        body: JSON.stringify({userName:newName, email:"", bio:bio}),
        file: avatar
      }, 
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
  }

  return (
    <UserContext.Provider value={{ username, 
                                    aboutMe, 
                                    profileIcon, 
                                    fg: [favoriteGames, setFavoriteGames],
                                    createUser,loginUser, isLoggedIn, updateProfile }}>
      {children}
    </UserContext.Provider>
  )
}