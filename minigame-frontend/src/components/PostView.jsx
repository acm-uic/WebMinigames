import { Link } from "react-router-dom"
import { useState } from "react"
import Popup from "./Popup.jsx"
import ProfilePopup from "./ProfilePopup.jsx"

const PostView = ({ username="Guest", icon="https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg", profile="/profile", title="Untitled Post", body="Nothing here...", imgs }) => {
    const [imgIndex, setImgIndex] = useState(0)

    /* Format all given images
        If none are provided, body will take up image space
        If a link or an array of length 1, image will be displayed
        If an array of more than one image, images will be displayed as a carousel */
    const displayImgs = () => {
        if (imgs == null)
            return
        else if (Array.isArray(imgs) && imgs.length > 1) {
            return (
                <div className="flex items-center bg-[#6763DE] border border-black w-2/5 max-h-[300px] aspect-square relative"> 
                    <img className="size-full object-contain" src={imgs[imgIndex]} />
                    {/* Previous Image Button */}
                    <button className="absolute h-[35px] w-[20px] top-[1/2] p-1 bg-zinc-600 font-bold text-white opacity-75"
                        onClick={() => setImgIndex((imgIndex - 1 + imgs.length) % imgs.length)}>&lt;</button>
                    {/* Next Image Button */}
                    <button className="absolute h-[35px] w-[20px] top-[1/2] right-0 p-1 bg-zinc-600 font-bold text-white opacity-75"
                        onClick={() => setImgIndex((imgIndex + 1) % imgs.length)}>&gt;</button>
                    <div className="absolute bottom-0 right-0 pl-1 pr-1 bg-zinc-600 text-white opacity-75">{imgIndex+1}/{imgs.length}</div>
                </div>
            )
        } else if (Array.isArray(imgs)) {
            return (
                <div className="flex items-center bg-[#6763DE] border border-black w-2/5 aspect-square relative"> 
                    <img className="size-full object-contain" src={imgs[0]} />
                </div>
            )
        } else {
            return  (
                <div className="flex items-center bg-[#6763DE] border border-black w-2/5 aspect-square relative"> 
                    <img className="size-full object-contain" src={imgs} />
                </div>
            )
        }
    }
   
    /* Post View Div */
    return (
        <div className="flex flex-col lg:w-3/4 w-full h-[350px] p-2 pt-0 bg-[#5B6EE1] m-auto">
            <div className="text-[20px] font-semibold text-white italic tracking-widest">
                {title}
                <div className="size-[20px] mt-[5px] border border-black rounded-sm bg-[#D95763] float-right"></div>
            </div>

            <div className="flex items-center grow overflow-hidden gap-3 p-3 bg-[#CBDBFC]">
                {/* Username and Body Column */}
                <div className="flex flex-col gap-3 size-full">
                    <Popup className="flex items-center gap-2 text-wrap h-[50px] text-[20px]" 
                            popupClassName="bg-[#3B85E7] text-white font-semibold" 
                            PopupInfo={ProfilePopup} 
                            popupProps={{ bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }} >
                        <img className="w-[50px] rounded-full" src={icon} />
                        {username}
                    </Popup>

                    <p className="bg-[#DEE7FB] grow p-2 overflow-y-auto hide-scrollbar">
                        {body}
                    </p>
                </div>

                {/* Display image only if provided in imgs array */}
                {displayImgs()}
            </div>
        </div>
    )
}

export default PostView