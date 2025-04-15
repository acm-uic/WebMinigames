import GameDetails from "./GameDetails";

export default function GameDetailsPopUp({ game }) {
  return (
    <div>
      <div className="fixed inset-0 bg-black opacity-50  z-10"></div>
      <div className="fixed flex flex-col xl:bg-blue-200 lg:bg-yellow-200 md:bg-green-200 sm:bg-red-200 xsm:bg-orange-200 xs:bg-purple-200  shadow-md rounded-xl xl:max-h-[50%] lg:max-h-[30%] xs:w-[97%] xs:h-[40%] md:w-[65%] md:h-[30%] sm:w-[70%] sm:h-[30%] lg:w-[42%] lg:h-[52%] z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        {/* <p className="text-2xl pl-[3.5%] ">{game.name}</p> */}
        <div className=" bg-red-200 h-full w:[50%] rounded-xl pb-2 flex items-center justify-center ">
          {/* <GameDetails game={game} /> */}

          {/* <div className=" overflow-y-auto ml-44 h-full flex flex-col w-[70%]">
            <div className="  bg-green-400  items-center h-[151px] flex whitespace-nowrap ">
              <div className="  w-full mb-2 overflow-x-auto ">
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
            <div className=" p-1 bg-gray-300 flex-1 ">{game.description}</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

