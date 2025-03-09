import "./css/ShowcaseGameCard.css";
import TrentonProfileImg from "../images/TrentonPFP.jpg";
export function ShowcaseGameCardComponent(props) {
    return (
        <div className="showcase-box">
            <img className="showcase-image" src={props.imageLink}></img>
            <br></br>
            <p className="showcase-text">{props.text}</p>
        </div>
    );
}


ShowcaseGameCardComponent.defaultProps = {
    imageLink: "https://www.ledr.com/colours/black.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}