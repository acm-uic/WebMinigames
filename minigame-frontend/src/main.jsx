import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout.jsx";
// import { AdrianContributor } from "./contributors/Contributors";
import Homepage from "./page/Homepage.jsx";
import AllGames from "./page/AllGames.jsx";
import Profile from "./page/Profile.jsx";
import GamePage from "./page/GamePage.jsx";

import { UserContextProvider } from "./domain/UserContext.jsx";

import "./index.css";
import Contributors from "./page/Contributors.jsx";
import GameDetails from "./components/GameDetails.jsx";
import GameDetailsPopUp from "./components/GameDetailsPopup.jsx";

const exampleGame = {
  name: "Fortnite",
  cover: "https://upload.wikimedia.org/wikipedia/en/7/72/Fortnite_BR_cover.jpg",
  publisher: "Epic Games",
  developer: "Epic publish",
  releaseDate: "1/2/20",
  images: [
    "https://i.ytimg.com/vi/5Vzxj6flcfM/maxresdefault.jpg",
    "https://www.videogameschronicle.com/files/2022/12/fortnite-chapter-4.webp",
    "https://www.gamereactor.eu/media/grtv/82/498233_w926.jpg",
  ],
  links: ["hello", "bye", "hello", "bye"],
  description:
    "Fortnite is a fast-paced, free-to-play online game that combines survival, building, and combat in a dynamic battle royale setting. Up to 100 players drop onto an island and fight to be the last one standing using a variety of weapons, tools, and materials to outwit and outbuild their opponents. But Fortnite isn’t just about shooting — it’s known for its unique building mechanic, where players can construct walls, ramps, and forts in real-time to gain the upper hand. Beyond battle royale, Fortnite offers a rich creative mode where players can design their own games, maps, and experiences, as well as limited-time events and collaborations with major franchises like Marvel, Star Wars, and even real-world artists. With constant updates, vibrant visuals, and a thriving global community, Fortnite continues to evolve, making every match feel fresh and unpredictable.",
};

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

