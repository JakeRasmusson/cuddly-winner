import React, { useState } from 'react'
import './Player.css'

const Player = ({ id, player, onDragStart, context, onEdit, onRemove}) => {
    const handleClick = _ => {
        
        if(context == 'list'){
            onEdit('basic', player,)
        }
        if(context == 'roster'){
            onEdit('stats', player)
        }
    }

    return (
        <div className="player" draggable onDragStart={e => onDragStart(e, id)} data-id={id}>
                <div className="player-details" onClick = {handleClick}>
                    <p>{player.position}</p>
                    <h3>#{player.number}</h3>
                    <h5>{player.name}</h5>
                    <i 
                        className="fa-solid fa-user-minus"
                        onClick={e => {
                            e.stopPropagation()
                            onRemove()
                        }}
                    ></i>
                </div>
        </div>
    )
}
export default Player;