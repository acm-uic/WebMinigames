import "./css/ProfileDetails.css";
import { useState } from "react";
import PostView from "./PostView";

export function ProfileDetails(props) {
  const { favorites, interests, posts } = props;

  const [view, setView] = useState("posts");

  return (
    <div>
      <h1 className={`interests-link profile-nav ${view == "interests" ? "active" : ""}`}
        onClick={() => setView("interests")}>
        Interests
      </h1>
      <h1 className={`posts-link profile-nav ${view == "posts" ? "active" : ""}`}
        onClick={() => setView("posts")}>
        Posts
      </h1>
      <div className="details-card">
        {view == "posts" && (posts.length == 0 ? "User has no posts" :
          (
            <>
            {posts.map((post,index) => (
              <PostView key={"profile-"+post._id +index} username='' icon='' profile='' title={post.title} body={post.body} imgs={post.images} />
            ))}
            </>
          )
        ) }
        {view == "interests" && (
          <>
            <div>
              <h1 className="details-box-title">Liked Games</h1>
            </div>
            <br></br>
            <div className="favorites-container">
              {favorites.map((item) => {
                return (
                  <div key={"f" + item} className="favorites-box">
                    <p className="favorites-text">{item}</p>
                  </div>
                );
              })}
            </div>

            <div className="horizontal-bar"></div>

            <h1 className="details-box-title">Interests</h1>

            <div className="interests-container">
              {interests.map((item) => {
                return (
                  <div key={"i" + item} className="interests-box">
                    <p className="interests-text">{item}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ProfileDetails.defaultProps = {
//   favorites: ["Game name", "Game name", "Game name", "Game name"],
//   interests: ["First-Person Shooter", "Action", "Adventure", "RPG"],
//   user: "username12345",
// };
