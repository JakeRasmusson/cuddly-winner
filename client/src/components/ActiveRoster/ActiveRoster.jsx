import React, { useState } from 'react'

import { useGameList } from '../../contexts/gameListContext'
import { useEditingGame } from '../../contexts/editingGameContext'
import { useAwayPlayers } from '../../contexts/awayPlayersContext'
import { useHomePlayers } from '../../contexts/homePlayersContext'

import Player from '../Player/Player'

const ActiveRoster = ({ game }) => {

    const { gameList, editGame } = useGameList()
    const { editingGame } = useEditingGame()
    const { homePlayers, setHomePlayers } = useHomePlayers()
    const { awayPlayers, setAwayPlayers } = useAwayPlayers()
    
    const [homeRoster, setHomeRoster] = useState([])
    const [awayRoster, setAwayRoster] = useState([])

    const onDragOver = e => {
        e.preventDefault()
    }

    const onDrop = (e, team) => {
        const player = JSON.parse(e.dataTransfer.getData('application/json'))

        if(!player) console.error("No data received from player drag!")

        if(team == 'home'){
            if(!homeRoster.filter(p => p.id == player.id).length){
                if(player.team == 'away'){
                    window.alert(`Cannot add player from Team 2 to Team 1`)
                }
                else {
                    setHomeRoster(prev => [...prev, player])
                    
                    const updatedPlayers = game.team1.players.map(p =>
                        p.id == player.id ? { ...player, active: true } : p
                    )

                    game.team1.players = updatedPlayers

                    editGame(game)
                }
            }
        }
        if(team == 'away'){
            if(!awayRoster.filter(p => p.id == player.id).length){
                if(player.team == 'home'){
                    window.alert(`Cannot add player from Team 1 to Team 2`)
                }
                else {
                    setAwayRoster(prev => [...prev, player])
                    
                    const updatedPlayers = game.team2.players.map(p => 
                        p.id == player.id ? { ...player, active: true} : p
                    )

                    game.team2.players = updatedPlayers
                    editGame(game)
                }
            }
        }
    }

    //Remove player completely from active roster (Remove icon when in active roster)
    const handleRemovePlayer = player => {
        if(window.confirm(`Bench ${player.name}?\n\nYou can drag them back to the active roster if they re-enter the game.`)){
            if(player.team == 'home'){
                setHomeRoster(prev => prev.filter(p => p.id != player.id))

                const updatedPlayers = game.team1.players.map(p => p.id == player.id ? { ...player, active: false} : p)

                game.team1.players = updatedPlayers

                editGame(game)
            }
            if(player.team == 'away'){
                const updatedPlayers = game.team2.players.filter(p => p.id != player.id)

                game.team2.players = updatedPlayers

                editGame(game)
            }
        }
    }

    return (
        <div className="flex flex-col items-center w-1/2 h-[500px]">
            <h2 className="border-b-1 text-2xl font-extralight tracking-[8px] text-yellow-300 mt-2 mb-4 h-[35px] w-[65%]">Active Roster</h2>
            <div className="flex justify-between w-full min-h-[200px]">

                <div className="px-5 w-[46%] flex flex-col max-h-[80%] items-center">
                    <p className="border-b-1 text-lg italic tracking-widest w-auto min-w-[70%] self-center mb-5">{game.team1.town}</p>
                    
                    <div 
                        className="overflow-auto flex flex-col h-[400px] w-full self-center bg-black/30 overscroll-none"
                        onDrop={e => onDrop(e, 'home')}
                        onDragOver={onDragOver}
                    >
                        {
                            homeRoster.length ? (
                                homeRoster.map(player => (
                                    <Player key={player.id} player={player} handleIconClick={_ => handleRemovePlayer(player)}/>
                                ))
                            ) : (
                                <div className="h-[400px]">
                                    <p className="text-xl italic text-yellow-200 font-light pt-3">No active players</p>
                                    <p className="italic text-yellow-300 pt-5 font-extralight">Drag a player from <span className="not-italic font-medium">{game.team1.town}</span> to get started</p>
                                </div>
                            )
                        }
                        
                    </div>
                </div>

                <div className="px-5 w-[46%] flex flex-col max-h-[80%] items-center">
                    <p className="border-b-1 text-lg italic tracking-widest w-auto min-w-[70%] self-center mb-5">{game.team2.town}</p>

                    <div 
                        className="overflow-auto flex flex-col h-[400px] w-full self-center bg-black/30 overscroll-none"
                        onDrop={e => onDrop(e, 'away')}
                        onDragOver={onDragOver}
                    >
                        {awayRoster.length ? (
                            awayRoster.map(player => (
                                <Player key={player.id} player={player} handleIconClick={_ => handleRemovePlayer(player)}/>
                        ))) : (
                                <div className="h-[400px]">
                                    <p className="text-xl italic text-yellow-200 font-light pt-3">No active players</p>
                                    <p className="italic text-yellow-300 pt-5 font-extralight">Drag a player from <span className="not-italic font-medium">{game.team2.town}</span> to get started</p>
                                </div>)
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ActiveRoster