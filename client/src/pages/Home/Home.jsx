import React, { useState } from 'react'

import CreateGame from '../../components/CreateGame/CreateGame'
import SelectGame from '../../components/SelectGame/SelectGame'

const Home = ({ gameList }) => {
    return (
        <>
            <div className="flex gap-25">
                <CreateGame />
                <SelectGame gameList={gameList}/>
            </div>
        </>
    )
}

export default Home