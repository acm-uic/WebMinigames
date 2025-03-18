const PostView = ({ username="Guest", icon="https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg", profile="/profile", body="Nothing here...", imgs }) => {
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

            <div className="flex gap-7 h-[200px]">
                <div className="bg-zinc-100 w-full p-1">{body}</div>
            </div>
        </div>
    )
}

export default PostView