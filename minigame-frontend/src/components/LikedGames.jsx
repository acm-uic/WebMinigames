import { Link } from "react-router-dom"

const LikedGames = ({games}) => {
    if (!games) {
        /* Example data if no games are provided */
        games = [
            {name: "Game 1", link: "/game"}, 
            {name: "Game 2", link: "/game"}, 
            {name: "Game 3", link: "/game"}, 
            {name: "Game 4", link: "/game"},
            {name: "Game 5", link: "/game"}
        ];
    }
    
    return (
        <div className="w-full p-6 bg-zinc-100 text-xl">
            <h1 className="mb-4">Liked Games</h1>
            <ul className="w-full flex flex-nowrap gap-3 overflow-scroll hide-scrollbar">
                {games.map(g => (
                        <li key={g.name} className="min-w-32 w-32 h-20 bg-zinc-300 p-3 items-center justify-center flex text-center">
                            <Link to={g.link}>
                                {g.name}
                            </Link>
                        </li>
                ))}
            </ul>
        </div>
    );
};

export default LikedGames;