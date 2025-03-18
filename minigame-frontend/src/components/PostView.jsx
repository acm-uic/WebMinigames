import { useState } from "react"

const PostView = ({ username="Guest", icon="https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg", profile="/profile", body="Nothing here...", imgs }) => {
    const [imgIndex, setImgIndex] = useState(0)

    {/* Format all given images
        If none are provided, body will take up image space
        If a link or an array of length 1, image will be displayed
        If an array of more than one image, images will be displayed as a carousel */}
    const displayImgs = () => {
        if (imgs == null)
            return
        else if (Array.isArray(imgs))
            return (
                <div className="min-w-[200px] relative">
                    <img className="size-full bg-zinc-400" src={imgs[imgIndex]} />
                    {/* Previous Image Button */}
                    <button className="absolute h-[35px] w-[20px] top-[82.5px] p-1 bg-zinc-600 font-bold text-white opacity-75"
                        onClick={() => setImgIndex((imgIndex - 1 + imgs.length) % imgs.length)}>&lt;</button>
                    {/* Next Image Button */}
                    <button className="absolute h-[35px] w-[20px] top-[82.5px] right-0 p-1 bg-zinc-600 font-bold text-white opacity-75"
                        onClick={() => setImgIndex((imgIndex + 1) % imgs.length)}>&gt;</button>
                </div>
            )
        else
            return <img className="size-full bg-zinc-400" src={imgs} />
    }
   
    return (
        <div className="w-1/2 p-6 bg-zinc-200 m-auto flex flex-col gap-10">
            {/* Username and Title Row */}
            <div className="flex gap-7 h-[50px]">
                <div className="flex items-center gap-2 text-wrap w-[200px]">
                    <img className="w-[50px] rounded-full" src={icon} />
                    {username}
                </div>

                <div className="flex items-center">
                    <h1 className="text-[24px]">Example Title</h1>
                </div>
            </div>

            {/* Image and Body Row */}
            <div className="flex gap-7 h-[200px]">
                {/* Display image only if provided in imgs array */}
                {displayImgs()}

                <div className="bg-zinc-100 w-full p-1">{body}</div>
            </div>
        </div>
    )
}

export default PostView