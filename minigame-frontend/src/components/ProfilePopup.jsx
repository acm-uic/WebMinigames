import { Link } from "react-router-dom"

const ProfilePopup = ({ bio = "Nothing here...", profile="/profile" }) => {
    return (
        <div className="w-64 bg-[#3B85E7] text-white font-semibold">
            <p>Biography</p>
            <p className="text-ellipsis line-clamp-3 font-normal">{bio}</p>
            <br/>
            <Link to={profile} className="block text-center p-1 border-2 border-white rounded-sm hover:bg-white hover:text-[#3B85E7] transition duration-300">
                Go to profile
            </Link>
        </div>
    )
}

export default ProfilePopup