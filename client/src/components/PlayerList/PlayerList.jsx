import React, { useState } from 'react'
import Player from '../Player/Player'

const PlayerList = (players, handleUpdate) => {
    return (
        <div>
            <h1>All Players</h1>
            {players.map((player) => {
                <Player
                    key={player.id}
                    id={player.id}
                    name={player.name}
                    number={player.number}
                    position={player.position}
                    onUpdate={handleUpdate}
                />
            })}
        </div>
    )
}

export default PlayerList