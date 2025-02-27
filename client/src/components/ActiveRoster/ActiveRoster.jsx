import React, { useState } from 'react'

import { useGameList } from '../../contexts/gameListContext'
import { useEditingGame } from '../../contexts/editingGameContext'

const ActiveRoster = game => {

    const { gameList } = useGameList()
    const { editingGame } = useEditingGame()

    return (
        <div className="flex flex-col items-center w-1/2 h-[500px]">
            <h2 className="border-b-1 text-2xl font-extralight tracking-[8px] text-yellow-300 mt-2 mb-4 h-[35px] w-[65%]">Active Roster</h2>
            <div className="flex justify-between w-full min-h-[200px]">
                <div className="px-5 w-[46%] justify-center flex">
                    <p className="border-b-1 text-lg italic tracking-widest w-[70%] h-[30px]">{game.game.team1.town}</p>
                </div>
                <div className="px-5 w-[46%] justify-center flex">
                    <p className="border-b-1 text-lg italic tracking-widest w-[70%] h-[30px]">{game.game.team2.town}</p>
                </div>
            </div>
        </div>
    )
}

export default ActiveRoster