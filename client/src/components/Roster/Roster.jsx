import React from 'react'
import Player from '../Player/Player'
import './Roster.css'

const Roster = ({ team, roster, handleDrop, onEdit }) => {
    const onDragOver = e => {
        e.preventDefault()
    }

    const onDrop = e => {
        const player = JSON.parse(e.dataTransfer.getData('player'))
        const sourceTeam = e.dataTransfer.getData('team')

        //console.log(sourceTeam)

        if(sourceTeam.toLowerCase() == team.toLowerCase()){
            handleDrop(player, team)
        }
        else {
            alert(`Cannot add ${player.name} to the ${team} roster`)
        }
    }

    return (
        <div>
            <h2>{team} Active Roster</h2>
            <div
                className='roster'
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <div className="roster-players">
                    {roster.map(player => (
                        <Player key={player.id} player={player} context='roster' onEdit={onEdit} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Roster