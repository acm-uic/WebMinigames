import "./css/ProfileBio.css";
export function ProfileBioComponent(props) {
    const { imageLink, user, bio, isSignedIn } = props;
    return (
        <div className="user-card">
            <div>
                {isSignedIn ? <button class="button"><img className="editButton"
                    src="https://cdn-icons-png.flaticon.com/512/4226/4226577.png"
                    alt="Edit icon" /></button> : ""}
            </div>
            <img className="profilePicture" src={imageLink}
                alt="Profile Picture" />

                <h1 className="username">{user}</h1>
            <h2 className="bio">biography</h2>
            <br></br>
            <p className="description">{bio}</p>
            <br></br>
        </div>
    );
}

ProfileBioComponent.defaultProps = {
    imageLink: "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg",
    user: "username12345",
    bio: "asdadasadasfasdfasdaswerfwfwferrefwerewrwerererwrewercaddcapocmevimoasmv aoimacviocsdasdrandom paragraphs can be an excellent way",
    isSignedIn: false
}