import GameDetails from "./GameDetails";

export default function GameDetailsPopUp({ game }) {
  return (
    <div>
      <div className="fixed inset-0 bg-black opacity-50  z-10"></div>
      <div className="fixed flex flex-col bg-gray-300 shadow-md rounded-xl xl:max-h-[50%] xl:w-[45%]  lg:max-w-[500px] lg:max-h-[30%] xs:w-[90%] xs:h-[40%] xsm:w-[70%] xsm:h-[40%] md:w-[65%] md:h-[30%] sm:w-[70%] sm:h-[30%] lg:h-[50%] z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <p className=" text-2xl pl-[3.5%]  ">{game.name}</p>
        <div className="h-[80%] w-full flex-1  rounded-xl flex items-center justify-center">
          <div className="  bg-green-300 overflow-y-auto flex h-full w-[30%] ml-[3.5%]">
            <GameDetails game={game} />
          </div>
          <div className="h-full w-[70%] flex flex-col items-center overflow-y-auto ">
            <div className="   items-center h-[36%] flex whitespace-nowrap ">
              <div className=" w-full  overflow-x-auto ">
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
            <div className=" p-1 mt-[3%] bg-white flex-1 ml-3 mr-3">
              {game.description}
            </div>
          </div>

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

