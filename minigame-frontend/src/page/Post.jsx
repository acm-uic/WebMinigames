import React, { useState } from 'react'
import CommentSection from '../components/CommentSection';

const Post = ({ Post }) => {
    const [buttonState, setButtonState] = useState(0);
    
    function handleCommentsMenu(iState){
        if(buttonState == 0 && iState == 1){
            setButtonState(1);
        }
        else if(buttonState == 1 && iState == 0){
            setButtonState(0);
        }
        //console.log(buttonState); //debug that prints the comments section state
    }

    return (
        <div>
            <div className="w-full bg-white-500 h-[700px] border-y-2 border-black relative flex flex-col justify-center">
                {React.cloneElement(Post, { className: "lg:w-full h-[90%]" })}
                {/* <PostView className="lg:w-full h-[90%]" /> */}
            </div>
            <div className="w-full bg-[#DAE7FD] h-[50px] flex flex-row justify-center">
                <div
                onClick={() => handleCommentsMenu(0)}
                className="text-center text-[24px] content-center m-auto font-bold underline"
                >
                    Comments
                </div>
            </div>
            <div className="w-full bg-[#DAE7FD] min-h-[525px] max-h-screen border border-black overflow-y-auto hide-scrollbar">
                <CommentSection />
            </div>
        </div>
    )
}

export default Post