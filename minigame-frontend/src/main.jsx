import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout.jsx";
import { AdrianContributor } from "./contributors/Contributors";
import Homepage from "./page/Homepage.jsx";
import AllGames from "./page/AllGames.jsx";
import Profile from "./page/Profile.jsx";

import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="contributors" element={<AdrianContributor />} />
          <Route index element={<Homepage />} />
          <Route path="all-games" element={<AllGames />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
