import React, { useState } from 'react'

import './TeamList.css'

const TeamList = game => {

    const [team1Search, setTeam1Search] = useState('')
    const [team2Search, setTeam2Search] = useState('')

    const filteredTeam1Players = game.game.team1.players.filter(player => player.number.toString().includes(team1Search))
    const filteredTeam2Players = game.game.team2.players.filter(player => player.number.toString().includes(team2Search))

    return (
        <div className="flex flex-col items-center w-1/2 h-[500px]">
            <h2 className="border-b-1 text-2xl font-extralight tracking-[8px] text-yellow-300 mt-2 mb-4 h-[35px] w-[65%]">Player List</h2>
            
            <div className="flex justify-between w-full min-h-[200px]">

                <div className="px-5 w-[46%] flex flex-col max-h-[80%] items-center">
                    <p className="border-b-1 text-lg italic tracking-widest w-[70%] self-center mb-5">{game.game.team1.town}</p>
                    <div className="overflow-auto flex flex-col h-[400px] w-auto self-center">
                        {filteredTeam1Players.map((player, i) => (
                            <p key={player.id + i} className="text-sm">{player.number} - {player.name} - {player.position}</p>
                        ))}
                    </div>
                    <input
                        type="number"
                        placeholder="Number Lookup"
                        value={team1Search}
                        onChange={e => setTeam1Search(e.target.value)}
                        className="text-md self-center rounded-md border border-yellow-200 bg-black p-1 text-center outline-none focus:shadow-[0_0_10px_rgb(250,204,21)] mt-5 w-[58%]"
                    />
                </div>

                <div className="px-5 w-[46%] flex flex-col max-h-[80%] items-center">
                    <p className="border-b-1 text-lg italic tracking-widest w-[70%] self-center mb-5">{game.game.team2.town}</p>
                    <div className="overflow-auto flex flex-col h-[400px] w-auto self-center">
                        {filteredTeam2Players.map((player, i) => (
                            <p key={player.id + i} className="text-sm">{player.number} - {player.name} - {player.position}</p>
                        ))}
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
    )
}

export default TeamList