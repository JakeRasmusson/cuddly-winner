import React, { useState } from 'react'

const SelectGame = ({ gameList }) => {
    return (
        <>
            <div className="flex flex-col w-1/2 p-2">
                <h1 className="text-[30px] font-extralight tracking-[12px] text-yellow-300 border-b-1">Select a Game</h1>
                {gameList ? <h3>hi</h3> : <h3 className="text-yellow-200 font-extralight italic py-6 text-3xl">No Games Available</h3>}
            </div>
        </>
    )
}

export default SelectGame