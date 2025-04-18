import React from 'react'
import { GameRowComponent } from "../components/GameRowComponent.jsx";
import { HeroComponent } from '../components/HeroComponent.jsx';
import PostView from "../components/PostView.jsx";

export default function Homepage () {
  const exampleGame = {
    name: "Fortnite",
    cover: "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
    images: [
      "https://images.frandroid.com/wp-content/uploads/2021/05/fortnite-saison-6.jpg",
      "https://images.frandroid.com/wp-content/uploads/2021/05/fortnite-saison-6.jpg",
      "https://images.frandroid.com/wp-content/uploads/2021/05/fortnite-saison-6.jpg"
    ],
    description: "Description of the game",
    publisher: "Epic Games publisher",
    developer: "Epic Games Developer",
    releaseDate: new Date().toUTCString(),
    links: ["https://www.youtube.com/"]
  }
  return (
    <div>
      {/* Create a "Hero Component" -  the Popular games and see 
      see what everyone is playing text
      Create a Showcase Game Card Component - Game cards
      that display the image and text */}
      {/* Hero Component */}
      {/* Showcase Game Card Component */}
      
      <HeroComponent />
      {/* <GameDetailsPopUp game={exampleGame}/> */}

      <PostView imgs={["https://steamuserimages-a.akamaihd.net/ugc/273968969351308719/A642CC447714B0B1F2F927C1738A9C262308E7B0/?imw=128&imh=128&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true", "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"]} />
      <ol >
      <GameRowComponent GameName="Test Game Name" GameDesc="Lorem Ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et. Lorem Ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et." GameImage="https://steamuserimages-a.akamaihd.net/ugc/273968969351308719/A642CC447714B0B1F2F927C1738A9C262308E7B0/?imw=128&imh=128&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"/>
      </ol>
      <ol >
      <GameRowComponent GameName="Test Game Name" GameDesc="Lorem Ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et. Lorem Ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et." GameImage="https://steamuserimages-a.akamaihd.net/ugc/273968969351308719/A642CC447714B0B1F2F927C1738A9C262308E7B0/?imw=128&imh=128&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"/>
      </ol>
      <ol >
      <GameRowComponent GameName="Test Game Name" GameDesc="Lorem Ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et. Lorem Ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et." GameImage="https://steamuserimages-a.akamaihd.net/ugc/273968969351308719/A642CC447714B0B1F2F927C1738A9C262308E7B0/?imw=128&imh=128&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"/>
      </ol>
      <ol >
      <GameRowComponent GameName="Test Game Name" GameDesc="Lorem Ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et. Lorem Ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et." GameImage="https://steamuserimages-a.akamaihd.net/ugc/273968969351308719/A642CC447714B0B1F2F927C1738A9C262308E7B0/?imw=128&imh=128&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"/>
      </ol>
      <ol >
      <GameRowComponent GameName="Test Game Name" GameDesc="Lorem Ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et. Lorem Ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et." GameImage="https://steamuserimages-a.akamaihd.net/ugc/273968969351308719/A642CC447714B0B1F2F927C1738A9C262308E7B0/?imw=128&imh=128&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"/>
      </ol>
    </div>
  )
}
