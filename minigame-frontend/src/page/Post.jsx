import React, { useState, useEffect, useContext } from 'react'
import CommentSection from '../components/CommentSection';
import { SiteContext } from '../domain/SiteContext';
import { useParams } from 'react-router-dom';
import PostView from '../components/PostView';

const Post = () => {
    const {serverURL} = useContext(SiteContext);
    let params = useParams();

    const [post, setPost] = useState(null);
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
          setPost(res.data[0]);
        }
    
        fetchPost();
      }, [])

    return (
        <div>
            <div className="w-full bg-white-500 h-[700px] border-y-2 border-black relative flex flex-col justify-center">
                {post && <PostView  post={{postId:params.postId, authorId:post.author, title:post.title, body:post.body, imgs:post.images}} />}
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