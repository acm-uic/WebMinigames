export default function GameDetails({ game }) {
  return (
    <div className="w-40 absolute left-[100px] top-[100px] flex flex-col justify-start items-center">
      <img src={game.cover} alt="Game Cover" className="w-full h-auto" />

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

      <div className="w-full h-auto p-2 py-1 mt-3 bg-gray-400">
        <p className="text-xs mb-1 ">PLAY NOW:</p>
        <ul className="text-xs ">
          {game.links.map((link, index) => (
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
