import profileImg from "../assets/images/JinCardImage.jpeg"

export function JinContributor() {
    return (
        <div className="contributor-jin mx-2 flex bg-indigo-500 w-[300px] p-1 ">
            <img src={profileImg} width={"100px"} />
            <div className="text-white text-center justify-center m-auto">
                <div>Jin</div>
                <div>@jlee927</div>
            </div>
        </div>
    )
}
