import React, { useState, useEffect, useContext } from 'react'
import CommentSection from '../components/CommentSection';
import { SiteContext } from '../domain/SiteContext';
import { useParams } from 'react-router-dom';
import PostView from '../components/PostView';

const Post = ({ Post }) => {
    const {serverURL} = useContext(SiteContext);
    let params = useParams();

    const [currPost, setCurrPost] = useState(null);
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

    useEffect(() => {
        const fetchPost = async () => {
          const response = await fetch(`${serverURL}/api/public/posts/get?postId=${params.postId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            console.error(response);
            return false;
          }
          const res = await response.json();
          console.log(res);
          setCurrPost(res.data[0]);
        }
    
        fetchPost();
      }, [])

    return (
        <div>
            <div className="w-full bg-white-500 h-[700px] border-y-2 border-black relative flex flex-col justify-center">
                {currPost && <PostView authorId={currPost.author} username='' icon='' title={currPost.title} body={currPost.body} imgs={currPost.images}/>}
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