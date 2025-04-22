export default function GameDetails({ game }) {
  return (
    <div className=" flex flex-col ">
      <img src={game.coverImage} alt="Game Cover" className="w-full h-auto" />

      <div className="text-xs break-words whitespace-normal w-full h-auto py-1 mt-3 p-2 bg-gray-400">
        <p className="mb-1">
          <span>Publisher:</span> {game.publisher}
        </p>
        <p className="mb-1">
          <span>Developer:</span> {game.developer}
        </p>
        <p className="mb-1">
          <span>Release Date:</span> {game.releaseDate}
        </p>
      </div>

      <div className="w-full h-auto p-2 py-1 mt-3 bg-gray-400 ">
        <p className="text-xs mb-1 ">PLAY NOW:</p>
        <ul className="text-xs ">
          {game.relatedLinks.map((link, index) => (
            <li className="mb-1" key={index}>
              Source {`${index + 1}: `}
              <a
                href={link}
                className="text-blue-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                HERE
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

