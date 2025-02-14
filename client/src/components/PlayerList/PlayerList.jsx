import React, { useState } from 'react'
import Player from '../Player/Player'

const PlayerList = ({ players, handleDragStart, handleUpdate, title }) => {
    return (
        <div className='player-list'>
            <h2>{title}</h2>
            <div className="player-list-container">
                {players.map((player) => (
                    <div
                        key={player.id}
                        draggable
                        onDragStart={e => handleDragStart(e, player)}
                        className="draggable-player"
                    >
                        <Player {...player} onUpdate={handleUpdate} onDragStart={handleDragStart} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlayerList