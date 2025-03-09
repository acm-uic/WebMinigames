import "./css/ProfileDetails.css";
export function ProfileDetails(props) {
    const { user } = props;
    let favorites = ["Fortnite", "Smash", "DBZ", "Halo", "Pokemon", "Warhammer"]
    let interests = ["First-Person Shooter", "Action", "Adventure", "JRPG", "RPG"]

    return (
        <div>
            <h1 className="interests-link">Interests</h1>
            <h1 className="posts-link">Posts</h1>
            <div className="details-card">

                <div>
                    <h1 className="details-box-title">Liked Games</h1>
                </div>
                <br></br>
                <div className="favorites-container">
                    {
                        favorites.map((item) => {
                            return (
                                <div className="favorites-box">
                                    <p className="favorites-text">{item}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="horizontal-bar"></div>

                <h1 className="details-box-title">Interests</h1>

                <div className="interests-container">
                    {
                        interests.map((item) => {
                            return (
                                <div className="interests-box">
                                    <p className="interests-text">{item}</p>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    );
}

ProfileDetails.defaultProps = {
    user: "username12345"
}