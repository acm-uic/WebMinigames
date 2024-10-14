import React from 'react'
import { useState } from "react";

export const GamePage = () => {
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
        <div className='w-full bg-white-500 h-[700px] border-y-2 border-black flex flex-col justify-center'>
          <div className='text-center text-[36px] absolute w-full top-[0px]'>(placeholder game name)</div>
          <div className='w-[900px] bg-gray-300 h-[550px] content-center m-auto'>
            
          </div>
        </div>
        <div className='w-full bg-[#DAE7FD] h-[50px] flex flex-row justify-center'>
          <div onClick={()=>handleCommentsMenu(0)} className={`text-center text-[24px] content-center m-auto ${(buttonState==0) ? 'font-bold underline' : 'cursor-pointer'}`}>Comments</div>
          <div onClick={()=>handleCommentsMenu(1)} className={`text-center text-[24px] content-center m-auto ${(buttonState==0) ? 'cursor-pointer' : 'font-bold underline'}`}>Leaderboard</div>
        </div>
        <div className='w-full bg-[#DAE7FD] h-[525px] border border-black'>
            
        </div>
    </div>
  )
}