import React, { useContext, useEffect, useState } from 'react'
import { GameRowComponent } from "../components/GameRowComponent.jsx";
import { HeroComponent } from '../components/HeroComponent.jsx';
import PostView from "../components/PostView.jsx";
import { SiteContext } from '../domain/SiteContext.jsx';

export default function Homepage () {
  const {serverURL} = useContext(SiteContext);
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

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await fetch(`${serverURL}/api/public/posts/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(response);
        return false;
      }
      const res = await response.json();
      console.log(res);
      const reversedPosts = res.data.reverse();
      setAllPosts(reversedPosts);
    }

    fetchAllPosts();
  }, [])

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

        {allPosts.map((post,index) => (
          <PostView key={post._id + index} post={{postId:post._id, authorId:post.author, title:post.title, body:post.body, imgs:post.images}} />
        ))}
    </div>
  )
}

