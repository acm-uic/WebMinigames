import { createContext, useState } from "react";

export const SiteContext = createContext();

export const SiteContextProvider = ({children}) => {
  const serverURL = import.meta.env.VITE_APP_SERVER_URL;

  const [allGames, setAllGames] = useState([]);

  const fetchAllGames = async () => {
  
    const response = await fetch(`${serverURL}/api/public/games/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }, 
    );

    if (!response.ok) {
      console.error(response);
      return false;
    }
    const res = await response.json();
    console.log("Games fetched successfully");
    setAllGames(res.data)
    return true;
  }



  return (
    <SiteContext.Provider value={{allGames, fetchAllGames}}>
      {children}
    </SiteContext.Provider>
  )
}