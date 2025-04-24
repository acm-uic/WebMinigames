import "./css/ProfileBio.css";
import { useEffect, useState } from "react";

export function ProfileBioComponent(props) {
    const { user,handleEdit, updateBio, canEdit, editing } = props;
    const [newImageLink, setNewImageLink] = useState(user.avatar);
    const [newUser, setnewUser] = useState(user.userName);
    const [newBio, setNewBio] = useState(user.bio);
    useEffect(()=> {
        if (!editing) {
            setNewImageLink(user.avatar);
            setNewBio(user.bio);
            setnewUser(user.userName);
        }
    }, [editing, user])

    if (!editing) {
        return (
            <div className="user-card">
                <div>
                    {canEdit ? <button className="button" onClick={handleEdit}><img className="editButton"
                        src="https://cdn-icons-png.flaticon.com/512/4226/4226577.png"
                        alt="Edit icon" /></button> : ""}
                </div>
                <img className="profilePicture" src={user.avatar}
                    alt="Profile Picture" />
    
                    <h1 className="username">{user.userName}</h1>
                <h2 className="bio">biography</h2>
                <br></br>
                <p className="description">{user.bio}</p>
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
                <br/>
                <h1 className="username">{user.userName}</h1>
                <br/>
                <input className="username edit" type="text" value={newUser} onChange={() => setnewUser(event.target.value)}/>
                <br/>
                <h2 className="bio">biography</h2>
                <br></br>
                <p className="description">{user.bio}</p>
                <textarea className="description edit" value={newBio} onChange={() => setNewBio(event.target.value)} />
                <br></br>
            </div>
        )
    }
    
}
