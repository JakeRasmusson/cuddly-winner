import React, { useState } from 'react'

import CreateGame from '../../components/CreateGame/CreateGame'
import SelectGame from '../../components/SelectGame/SelectGame'

const Home = ({ gameList }) => {

    const handleCreateGame = (homeTeam, visitingTeam, sport) => {
        const newGame = { id: Date.now(), home: homeTeam, away: visitingTeam, sport: sport }
        
    }

    return (
        <>
            <div className="flex gap-25">
                <CreateGame gameList={gameList} onCreateGame={handleCreateGame} />
                <SelectGame gameList={gameList} />
            </div>
        </>
    )
}

export default Home