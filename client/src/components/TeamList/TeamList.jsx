import React, { useState } from 'react'

//Components
import Player from '../Player/Player'
import AddModal from '../AddModal/AddModal'

//Contexts
import { useGameList } from '../../contexts/gameListContext'

//CSS cause spinner arrows on the number lookup field  :rolling_eyes:
import './TeamList.css'


const TeamList = ({ game }) => {

    //Contexts
    const { gameList, editGame } = useGameList()

    //STates
    const [team1Search, setTeam1Search] = useState('') //Filtering team 1 by this number
    const [team2Search, setTeam2Search] = useState('') //Filtering team 2 by this number

    //Only show the players that have a number that matches whatever the user wanted to search for
    const filteredTeam1Players = game.team1.players.filter(player => player.number.toString().includes(team1Search)).filter(player => !player.active)
    const filteredTeam2Players = game.team2.players.filter(player => player.number.toString().includes(team2Search)).filter(player => !player.active)

    //Are they wanting to add players?
    const [showAddModal, setShowAddModal] = useState(false)

    //Remove player completely from the game (remove icon when in player list)
    const handleDeletePlayer = player => {
        //Throw an alert that warns the user of what they are going to do, allow them to back out one last time
        if(window.confirm(`Are you sure you want to permanently remove ${player.name} from the game?\n\nAll stats will be lost, this action cannot be undone`)){
            
            //If the victim was on the home (team 1) team, filter them out of the current array, and update the array to not include them
            if(player.team == 'home'){
                const updatedPlayers = game.team1.players.filter(p => p.id != player.id)

                game.team1.players = updatedPlayers

                editGame(game) //Trigger re-render
            }

            //Same as home, but away
            if(player.team == 'away'){
                const updatedPlayers = game.team2.players.filter(p => p.id != player.id)

                game.team2.players = updatedPlayers

                editGame(game)
            }
        }
    }

    //When player itself is clicked to pull up basic editor
    const handleClick = player => {

    }

    return (
        <>
            <div className="relative flex flex-col items-center w-1/2 h-[500px]">
                <h2 className="border-b-1 text-2xl font-extralight tracking-[8px] text-yellow-300 mt-2 mb-4 h-[35px] w-[65%]">Player List</h2>
                <i 
                    className="absolute top-15 fa-solid fa-user-plus text-green-500 hover:cursor-pointer text-2xl hover:text-green-800 hover:scale-120 transition-all duration:500" 
                    onClick={_ => setShowAddModal(true)}
                />
                
                <div className="flex justify-between w-full min-h-[200px]">

                    <div className="px-5 w-[46%] flex flex-col max-h-[400px] items-center">
                        <p className="border-b-1 text-lg italic tracking-widest w-auto min-w-[70%] self-center mb-5">{game.team1.town}</p>
                        <div className="overflow-auto flex flex-col h-[400px] w-full self-center bg-black/30 overscroll-none">
                            {
                                game.team1.players.length? (
                                    filteredTeam1Players.map(player => (
                                        <Player key={player.id} player={player} handleIconClick={_ => handleDeletePlayer(player)} handleClick={_ => handleClick(player)} />
                                    ))
                                ) : (
                                    <div className="">
                                        <p className="text-xl italic text-yellow-200 font-light pt-3">No Players Imported</p>
                                        <p className="italic text-yellow-300 pt-5 font-extralight">Create or import players to get started</p>
                                    </div>
                                    )
                            }
                        </div>
                        <input
                            type="number"
                            placeholder="Number Lookup"
                            value={team1Search}
                            onChange={e => setTeam1Search(e.target.value)}
                            className="text-md self-center rounded-md border border-yellow-200 bg-black p-1 text-center outline-none focus:shadow-[0_0_10px_rgb(250,204,21)] mt-5 w-[58%]"
                        />
                    </div>

                    <div className="px-5 w-[46%] flex flex-col items-center max-h-[400px]">
                    <p className="border-b-1 text-lg italic tracking-widest w-auto min-w-[70%] self-center mb-5">{game.team2.town}</p>
                        <div className="overflow-auto flex flex-col h-[400px] w-full self-center bg-black/30 overscroll-none">
                            {
                                game.team2.players.length? (
                                    filteredTeam2Players.map(player => (
                                        <Player key={player.id} player={player} handleIconClick={_ => handleDeletePlayer(player)} handleClick={_ => handleClick(player)} />
                                    ))
                                ) : (
                                    <div className="">
                                        <p className="text-xl italic text-yellow-200 font-light pt-3">No Players Imported</p>
                                        <p className="italic text-yellow-300 pt-5 font-extralight">Create or import players to get started</p>
                                    </div>
                                    )
                            }
                        </div>
                        <input
                            type="number"
                            placeholder="Number Lookup"
                            value={team2Search}
                            onChange={e => setTeam2Search(e.target.value)}
                            className="text-md self-center rounded-md border border-yellow-200 bg-black p-1 text-center outline-none focus:shadow-[0_0_10px_rgb(250,204,21)] mt-5 w-[58%]"
                        />
                    </div>
                </div>

            </div>

            {showAddModal && ( <AddModal game={game} onClose={_ => (setShowAddModal(false), document.body.style.overflow = "auto")} /> )}
        </>
    )
}

export default TeamList