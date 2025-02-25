import React from "react";
import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
  // Default user values
  const [username, setUsername] = useState("Guest");
  const [aboutMe, setAboutMe] = useState("Nothing here yet.");
  const [profileIcon , setProfileIcon] = useState("https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg");
  const [favoriteGames, setFavoriteGames] = useState([]);

  return (
    <UserContext.Provider value={{ un: [username, setUsername], 
                                    am: [aboutMe, setAboutMe], 
                                    pi: [profileIcon, setProfileIcon], 
                                    fg: [favoriteGames, setFavoriteGames] }}>
      {children}
    </UserContext.Provider>
  )
}