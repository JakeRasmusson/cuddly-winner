import React, { useState } from "react"

//Components
import CreateGame from "../../components/CreateGame/CreateGame"
import SelectGame from "../../components/SelectGame/SelectGame"

const Home = _ => {
    return (
        <>
            <div className="flex gap-25">
                <CreateGame />
                <SelectGame />
            </div>
        </>
    )
}

export default Home
