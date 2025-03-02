//The props should be:
//an image link for the pfp, the username, the bioText, and isSignedIn
import "./css/ProfileDetails.css";
export function ProfileDetails(props) {
    const { user } = props;
    return (
        <div>
            <h1 className="interests-link">Interests</h1>
            <h1 className="posts-link">Posts</h1>
            <div className="details-card">

                {/* // Favorites section */}
                <div>
                    <h1 className="rankings-box-title">Liked Games</h1>
                </div>
                <br></br>
                <div>
                    <div className="favorites-box">
                        <p className="favorites-text">Game name</p>
                    </div>
                    <div className="favorites-box">
                        <p className="favorites-text">Game name</p>
                    </div>
                    <div className="favorites-box">
                        <p className="favorites-text">Game name</p>
                    </div>
                    <div className="favorites-box">
                        <p className="favorites-text">Game name</p>
                    </div>
                </div>
                <div className="horizontal-bar"></div>
                {/* // Rankings section */}
                <h1 className="rankings-box-title">Interests</h1>

                <div className="interests-box">
                    <p className="interests-text">First-Person Shooter</p>
                </div>
                <div className="interests-box">
                    <p className="interests-text">Action</p>
                </div>
                <div className="interests-box">
                    <p className="interests-text">Adventure</p>
                </div>
                <div className="interests-box">
                    <p className="interests-text">JRPG</p>
                </div>
                <div className="interests-box">
                    <p className="interests-text">RPG</p>
                </div>

                {/* //Use event listeners to make size more flexible */}
            </div>
        </div>
    );
}

ProfileDetails.defaultProps = {
    user: "username12345"
}