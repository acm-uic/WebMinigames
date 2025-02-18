import React from "react";
import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
  const [username, setUsername] = useState("Example username");

  return (
    <UserContext.Provider value={{username,setUsername}}>
      {children}
    </UserContext.Provider>
  )
}