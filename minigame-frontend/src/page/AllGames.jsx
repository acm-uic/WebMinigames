import React from "react";
import Leaderboard from "../components/Leaderboard";

const AllGames = () => {

  const gameName = "EXAMPLE"
  const player = {}

  return (
    <>
      <div>All Games Page</div>
      <Leaderboard gameName={gameName} player={player}/>
    </>
  );
};
export default AllGames;
