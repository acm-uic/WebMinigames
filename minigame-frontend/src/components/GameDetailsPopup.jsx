import GameDetails from "./GameDetails";

export default function GameDetailsPopUp({ game }) {
  return (
    <div>
      <div className="fixed inset-0 bg-black opacity-50  z-10"></div>
      <div className="fixed flex flex-col bg-gray-300 shadow-md rounded-xl h-[70%] md:h-[60%] lg:h-[60%]     w-[80%] md:w-[75%] lg:w-[60%]    z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <p className=" text-2xl pl-[3.5%]  ">{game.name}</p>
        <div className="h-[80%] w-full flex-1  rounded-xl flex items-center justify-center">
          <div className="  overflow-y-auto flex h-full w-[30%] ml-[3.5%]">
            <GameDetails game={game} />
          </div>
          <div className="h-full w-[70%] flex flex-col items-center overflow-y-auto ">
            <div className="items-center h-[36%] flex whitespace-nowrap ">
              <div className="w-full overflow-x-auto ">
                {game.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Game image ${index + 1}`}
                    className="inline-block h-32 w-auto object-cover scale-90"
                  />
                ))}
              </div>
            </div>
            <div className=" p-1 h-full box-border w-[90%] mt-[9%] lg:mt-[4%] bg-white flex-1 ml-3 mr-3">
              {game.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

