export default function PlayerRank({player}) {

  return (
    <div className="player-ranks-item grad-bg">
      <p>{player.rank}</p>
      <p>{player.name}</p>
      <img
        className="player-icon"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png"
        alt="Player Icon"
      />
      <p>{player.points}</p>
    </div>
  );
}
