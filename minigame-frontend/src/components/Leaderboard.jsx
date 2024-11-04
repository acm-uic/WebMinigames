import { useState } from "react";
import "./css/Leaderboard.css";
import PlayerRank from "./PlayerRank";

const Leaderboard = ({ gameName, player = { undefined } }) => {
  // state for tracking the selected time range
  const [timeRange, setTimeRange] = useState("Today");

  const examplePlayer = {rank: "1st", name: "Olha", points: 1000}
  const allExamplePlayers = [
    examplePlayer,
    {rank: "2nd", name: "Adrian", points: 900},
    {rank: "3nd", name: "John", points: 800},
    {rank: "4nd", name: "James", points: 700},
  ]
  const handleTimeRangeClick = (range) => {
    setTimeRange(range);
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard-container">
        <header className="header">
          <h1 className="game-name">{gameName} Game Leaderboard</h1>
        </header>

        {/* time range selection */}
        <section className="time-range">
          <div className="time-range-items grad-bg">
            <button onClick={() => handleTimeRangeClick("Today")} className={`${timeRange == "Today" && "text-red-500"}`}>Today</button>
            <button onClick={() => handleTimeRangeClick("ThisWeek")}  className={`${timeRange == "ThisWeek" && "text-red-500"}`}>This Week</button>
            <button  onClick={() => handleTimeRangeClick("AllTime")}  className={`${timeRange == "AllTime" && "text-red-500"}`}>All Time</button>
          </div>
        </section>
        <section className="players">
          <div className="top-players">
            <div className="top-players-item">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png"
                alt="Player Icon"
              />
              <a href="#" className="top-player-name">
                {player.name}Name
              </a>
              <p className="top-player-points">{player.points}Points</p>
            </div>
            <div className="top-players-item">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png"
                alt="Player Icon"
              />
              <a href="#" className="top-player-name">
                {player.name}Name
              </a>
              <p className="top-player-points">{player.points}Points</p>
            </div>
            <div className="top-players-item">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png"
                alt="Player Icon"
              />
              <a href="#" className="top-player-name">
                {player.name}Name
              </a>
              <p className="top-player-points">{player.points}Points</p>
            </div>
          </div>
        </section>
        <section className="ranks">
          <div className="player-ranks">
            {allExamplePlayers.map((item, index) => (
              <PlayerRank player={item} key={index+item.name}/>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Leaderboard;
