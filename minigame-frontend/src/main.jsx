import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout.jsx";
// import { AdrianContributor } from "./contributors/Contributors";
import Homepage from "./page/Homepage.jsx";
import AllGames from "./page/AllGames.jsx";
import Profile from "./page/Profile.jsx";
import GamePage from "./page/GamePage.jsx";

import {UserContextProvider} from "./domain/UserContext.jsx";

import "./index.css";
import Contributors from "./page/Contributors.jsx";

export default function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="contributors" element={<Contributors />} />
            <Route index element={<Homepage />} />
            <Route path="all-games" element={<AllGames />} />
            <Route path="profile" element={<Profile />} />
            <Route path="game" element={<GamePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
