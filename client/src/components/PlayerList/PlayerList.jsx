import React, { useState } from 'react'
import Player from '../Player/Player'
import './PlayerList.css'

const PlayerList = ({ players, handleDragStart, onEdit, onRemove, title, team }) => {

    return (
        <div className='player-list'>
            <h2 className="list-title">{title}</h2>
            <div className="player-list-container">
                {players.map((player) => (
                    <div
                        key={player.id}
                        draggable
                        onDragStart={e => handleDragStart(e, player, team)}
                        className="draggable-player"
                    >
                        <Player key={player.id} player={player} context='list' onEdit={onEdit} onRemove={_ => onRemove(player.id, team)} onDragStart={handleDragStart} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlayerList