import React from 'react'

export default function GameCard({game, select, index}) {
  return (
    <div className='game-card' onClick={() => select(index)}>
      <div className='game-image-container'>
        <img src={game.coverImage} alt={game.gameName} />
      </div>
      <h2 className='game-title'>{game.gameName}</h2>
    </div>
  )
}