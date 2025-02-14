import React, { useState } from 'react'
import Player from '../Player/Player'
import './PlayerList.css'

const PlayerList = ({ players, handleDragStart, handleUpdate, title, team }) => {
    return (
        <div className='player-list'>
            <h2 className="list-title">{title}</h2>
            <div className="player-list-container">
                {players.map((player) => (
                    <div
                        key={player.id}
                        draggable
                        onDragStart={e => handleDragStart(e, player)}
                        className="draggable-player"
                    >
                        <Player {...player} onUpdate={(id, updateData) => handleUpdate(id, updateData, team)} onDragStart={handleDragStart} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlayerList