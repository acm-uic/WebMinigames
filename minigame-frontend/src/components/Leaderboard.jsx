import { useState } from "react";
import "./css/Leaderboard.css";

const Leaderboard = ({ gameName, player = { undefined } }) => {
  // state for tracking the selected time range
  const [timeRange, setTimeRange] = useState("Today");

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
            <button>Today</button>
            <button>This Week</button>
            <button>All Time</button>
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
            <div className="player-ranks-item grad-bg">
              <p>{player.rank}PlayerRank1</p>
              <p>{player.name}PlayerName1</p>
              <img
                className="player-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png"
                alt="Player Icon"
              />
              <p>{player.points}PlayerPoints</p>
            </div>
            <div className="player-ranks-item grad-bg">
              <p>{player.rank}PlayerRank1</p>
              <p>{player.name}PlayerName1</p>
              <img
                className="player-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png"
                alt="Player Icon"
              />
              <p>{player.points}PlayerPoints</p>
            </div>
            <div className="player-ranks-item grad-bg">
              <p>{player.rank}PlayerRank1</p>
              <p>{player.name}PlayerName1</p>
              <img
                className="player-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png"
                alt="Player Icon"
              />
              <p>{player.points}PlayerPoints</p>
            </div>
            <div className="player-ranks-item grad-bg">
              <p>{player.rank}PlayerRank1</p>
              <p>{player.name}PlayerName1</p>
              <img
                className="player-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png"
                alt="Player Icon"
              />
              <p>{player.points}PlayerPoints</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Leaderboard;
