import React, { useState } from 'react'

//Contexts
import { useGameList } from '../../contexts/gameListContext'

//Components
import Player from '../Player/Player'
import StatsModal from '../StatsModal/statsModal'

const ActiveRoster = ({ game }) => {

    //Contexts
    const { gameList, editGame } = useGameList()
    
    //States
    const [homeRoster, setHomeRoster] = useState([])
    const [awayRoster, setAwayRoster] = useState([])
    const [homeOffense, setHomeOffense] = useState(false)
    const [showStatsModal, setShowStatsModal] = useState(false)
    const [showingPlayer, setShowingPlayer] = useState({})

    //When the user is dragging a player on top of the roster drop zone
    const onDragOver = e => {
        e.preventDefault()
    }

    //When the player is dropped on the drop zone
    const onDrop = (e, team) => {
        const player = JSON.parse(e.dataTransfer.getData('application/json'))  // Get the data that we had stored when the player was picked up

        if(!player) console.error('No data received from player drag!')        // Throw an error if for some reason there is no data stored

        //If they're being dropped into the home side, manipulate team 1 roster
        if(team == 'home'){
            //Make sure this player isn't already in the list!  Since they get removed from the team list on a successful drop, this prevents
            //users from picking up a player from the roster and dropping them right back
            if(!homeRoster.filter(p => p.id == player.id).length){

                //Make sure a player from the other team can't be brought to the home team
                if(player.team == 'away'){
                    window.alert(`Cannot add player from Team 2 to Team 1`)
                }

                else {
                    setHomeRoster(prev => [...prev, player])//Add the dropped player to the roster
                    
                    //Find the player in the overall player list and set its active flag
                    const updatedPlayers = game.team1.players.map(p =>
                        p.id == player.id ? { ...player, active: true } : p
                    )

                    game.team1.players = updatedPlayers

                    //Edit the game state so we get a re-render of the team list
                    editGame(game)
                }
            }
        }

        //Same as home, but for away this time
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

        //Alert warning user of what they're about to do
        if(window.confirm(`Bench ${player.name}?\n\nYou can drag them back to the active roster if they re-enter the game.`)){

            //If they're on the home team, manipulate team 1 roster and list
            if(player.team == 'home'){
                //Filter out the player that was removed
                setHomeRoster(prev => prev.filter(p => p.id != player.id))

                //Update the player's active flag
                const updatedPlayers = game.team1.players.map(p => p.id == player.id ? { ...player, active: false} : p)

                game.team1.players = updatedPlayers

                //Edit the game to trigger re-render
                editGame(game)
            }

            //Same as home, but away
            if(player.team == 'away'){
                setAwayRoster(prev => prev.filter(p => p.id != player.id))

                const updatedPlayers = game.team2.players.map(p => p.id == player.id ? { ...player, active: false} : p)

                game.team2.players = updatedPlayers

                editGame(game)
            }
        }
    }

    const handleClick = player => {
        setShowStatsModal(true)
        setShowingPlayer(player)
    }

    return (
        <div className="flex flex-col items-center w-1/2 h-[500px]">
            {/* Header */}
            <h2 className="border-b-1 text-2xl font-extralight tracking-[8px] text-yellow-300 mt-2 h-[35px] w-[65%]">Active Roster</h2>
            <button className="tracking-tighter font-light text-sm hover:text-yellow-600 hover:tracking-normal hover:scale-105 transition-all duration-300 hover:cursor-pointer border-yellow-200 border-1 py-[3px] px-[15px] rounded-lg mt-2" onClick={_ => setHomeOffense(!homeOffense)}>Toggle Offense/Defense</button>

            <div className="flex justify-between w-full min-h-[200px]">
                {/* Left (home) team title */}
                <div className="px-5 w-[46%] flex flex-col max-h-[80%] items-center">
                    <p className="border-b-1 text-lg italic tracking-widest w-auto min-w-[70%] self-center">{game.team1.town}</p>
                    <p className="text-xs my-1 italic tracking-widest">{homeOffense ? "Offense" : "Defense"}</p>
                    
                    {/* Left (home) team drop zone */}
                    <div 
                        className="overflow-auto flex flex-col h-[400px] w-full self-center bg-black/30 overscroll-none"
                        onDrop={e => onDrop(e, 'home')}
                        onDragOver={onDragOver}
                    >
                        {
                            //If there's someone there, render them
                            homeRoster.length ? (
                                homeRoster.map(player => (
                                    <Player key={player.id} player={player} handleIconClick={_ => handleRemovePlayer(player)} handleClick={_ => handleClick(player)} />
                                ))
                            ) : (
                                //Otherwise, show a message saying how to work it
                                <div className="h-[400px]">
                                    <p className="text-xl italic text-yellow-200 font-light pt-3">No active players</p>
                                    <p className="italic text-yellow-300 pt-5 font-extralight">Drag a player from <span className="not-italic font-medium">{game.team1.town}</span> to get started</p>
                                </div>
                            )
                        }
                        
                    </div>
                </div>

                {/* Right (away) team column, header, and drop zone */}
                <div className="px-5 w-[46%] flex flex-col max-h-[80%] items-center">
                    <p className="border-b-1 text-lg italic tracking-widest w-auto min-w-[70%] self-center">{game.team2.town}</p>
                    <p className="text-xs my-1 italic tracking-widest">{homeOffense ? "Defense" : "Offense"}</p>

                    <div 
                        className="overflow-auto flex flex-col h-[400px] w-full self-center bg-black/30 overscroll-none"
                        onDrop={e => onDrop(e, 'away')}
                        onDragOver={onDragOver}
                    >
                        {awayRoster.length ? (
                            awayRoster.map(player => (
                                <Player key={player.id} player={player} handleIconClick={_ => handleRemovePlayer(player)} handleClick={_ => handleClick(player)} />
                            ))) : (
                                <div className="h-[400px]">
                                    <p className="text-xl italic text-yellow-200 font-light pt-3">No active players</p>
                                    <p className="italic text-yellow-300 pt-5 font-extralight">Drag a player from <span className="not-italic font-medium">{game.team2.town}</span> to get started</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {showStatsModal && (
                <StatsModal player={showingPlayer} isOffense={homeOffense} />
            )}

        </div>
    )
}

export default ActiveRoster