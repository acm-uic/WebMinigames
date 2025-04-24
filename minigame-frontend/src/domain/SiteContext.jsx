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
    <SiteContext.Provider value={{allGames, fetchAllGames, serverURL}}>
      {children}
    </SiteContext.Provider>
  )
}

// POST FORMAT
// {
//   "_id": "67e2386fecbcc4663cdbb595",
//   "author": "67be56067df243b286767045",
//   "title": "Dreams",
//   "body": "Visit Old Trafford next year",
//   "images": [],
//   "isDelete": false,
//   "createdAt": "2025-03-25T05:00:31.642Z",
//   "updatedAt": "2025-04-08T02:27:26.948Z",
//   "__v": 0
// }