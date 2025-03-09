//Have a banner where it says here's what everyone is playing
//The name of the game centered within a div with the image as the background
//Similar to the contributors page for the website
//But ultimately more similar to the score ranking boxes in FighterZ
import "./css/Hero.css";
import { ShowcaseGameCardComponent } from "./ShowcaseGameCardComponent";
export function HeroComponent(props) {
    return (


        <div className="hero-outside-box">
            <div className="hero-inside-box">
                <h1 className="hero-inside-title">Popular games</h1>
                <br></br>
                <h3 className="hero-inside-subtitle">Here's what everyone is playing:</h3>
            </div>

            <ShowcaseGameCardComponent imageLink = "https://images.frandroid.com/wp-content/uploads/2021/05/fortnite-saison-6.jpg" text = "Fortnite is an MMO game on most major gaming consoles and PC that invites players to eliminate one another with weapons in 1-on-1 or teams combat!"/>
            <ShowcaseGameCardComponent/>


        </div>
    );
}