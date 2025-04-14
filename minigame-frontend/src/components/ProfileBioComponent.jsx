import "./css/ProfileBio.css";
import { useEffect, useState } from "react";

export function ProfileBioComponent(props) {
    const { imageLink, user, bio,handleEdit, updateBio, canEdit, editing } = props;
    const [newImageLink, setNewImageLink] = useState(imageLink);
    const [newUser, setnewUser] = useState(user);
    const [newBio, setNewBio] = useState(bio);
    useEffect(()=> {
        if (!editing) {
            setNewImageLink(imageLink);
            setNewBio(bio);
            setnewUser(user);
        }
    }, [user, bio, imageLink])

    if (!editing) {
        return (
            <div className="user-card">
                <div>
                    {canEdit ? <button className="button" onClick={handleEdit}><img className="editButton"
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
    } else {
        return (
            <div className="user-card">
                <div>
                    <button className="button" onClick={() => updateBio(newUser, newBio, newImageLink)}><img className="editButton"
                        src="https://cdn-icons-png.flaticon.com/512/4226/4226577.png"
                        alt="Edit icon" /></button>
                </div>
                <img className="profilePicture" src={newImageLink} alt="Profile Picture" />
                <input className="edit" type="text" value={newImageLink} onChange={() => setNewImageLink(event.target.value)}/>
                <h1 className="username">{user}</h1>
                <input className="username edit" type="text" value={newUser} onChange={() => setnewUser(event.target.value)}/>
                <h2 className="bio">biography</h2>
                <br></br>
                <p className="description">{bio}</p>
                <textarea className="description edit" value={newBio} onChange={() => setNewBio(event.target.value)} />
                <br></br>
            </div>
        )
    }
    
}

// ProfileBioComponent.defaultProps = {
//     imageLink: "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg",
//     user: "username12345",
//     bio: "asdadasadasfasdfasdaswerfwfwferrefwerewrwerererwrewercaddcapocmevimoasmv aoimacviocsdasdrandom paragraphs can be an excellent way",
//     isSignedIn: false
// }