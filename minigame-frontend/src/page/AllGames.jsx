import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../domain/SiteContext";
import GameCard from "../components/games/GameCard";
import "./AllGames.css";
import GameDetailsPopUp from "../components/GameDetailsPopup";
import { Link } from "react-router-dom";
const AllGames = () => {
  const { allGames, fetchAllGames } = useContext(SiteContext);
  const [currentGame, setCurrentGame] = useState(null);

  useEffect(() => {
    fetchAllGames();
    console.log(allGames);
  }, []);

  const handleSelect = (index) => {
    setCurrentGame(allGames[index]);
  };

  console.log(allGames);
  return (
    <div className="all-games-page">
      <Link to="/create-game">
        <div className={`font-bold bg-slate-400 w-fit h-fit p-4 rounded-lg border-r-4 cursor-pointer`}>
            <button>Add Game Entry</button>
        </div>
      </Link>
      {/* <div>All Games Page</div> */}
      <div className="game-list">
        {allGames.map((game, index) => (
          <GameCard
            key={game.gameName}
            index={index}
            select={handleSelect}
            game={game}
          />
        ))}
      </div>
      {currentGame && (
        <GameDetailsPopUp
          game={currentGame}
          toggleDisplay={() => setCurrentGame(null)}
        />
      )}
    </div>
  );
};
export default AllGames;
