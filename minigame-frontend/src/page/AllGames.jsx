import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../domain/SiteContext";
import GameCard from "../components/games/GameCard";
import "./AllGames.css"
import GameDetailsPopUp from "../components/GameDetailsPopup";
const AllGames = () => {
  
  const {allGames, fetchAllGames} = useContext(SiteContext);
  const [currentGame, setCurrentGame] = useState(null);
  

  useEffect(() => {
    fetchAllGames();
    console.log(allGames);
  }, [])

  const handleSelect = (index) => {
    setCurrentGame(allGames[index])
  }
  
  console.log(allGames);
  return (
    <div className="all-games-page">
      {/* <div>All Games Page</div> */}
      <div className="game-list">
        {allGames.map((game, index) => <GameCard key={game.gameName} index={index} select={handleSelect} game={game} />)}
      </div>
      {currentGame && <GameDetailsPopUp game={currentGame} toggleDisplay={() => setCurrentGame(null)}/>}
      
    </div>
  );
};
export default AllGames;
