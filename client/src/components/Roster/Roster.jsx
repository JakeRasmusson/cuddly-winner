import React, { useState } from 'react'
import Player from './Player'

const Roster = () => {
    const [playersInRoster, setPlayersInRoster] = useState([])

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('playerId', id)
    }

    const handleDrop = e => {
        const playerId = e.dataTransfer.getData('playerId')
        setPlayersInRoster((prevRoster) => [...prevRoster, `Player ${playerId}`])
        e.preventDefault()
    }

    const handleDragOver = e => {
        e.preventDefault()
    }

    return (
        <div>
            <h2>Active Roster</h2>
            <div
                className="drop-area"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    border: '2px dashed #ccc',
                    padding: '20px',
                    minHeight: '200px'
                }}
            >
                {!playersInRoster.length ? (
                    <p>Drag players here to populate current active roster</p>
                ) : (
                    playersInRoster.map((player, index) => <div key={index}>{player}</div>)
                )}
            </div>

            <Player
                key={player.id}
                id={player.id}
                name={player.name}
            />
        </div>
    )
}

export default Roster