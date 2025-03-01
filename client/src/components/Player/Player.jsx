import React, { useState } from 'react'

const Player = ({ player, handleIconClick }) => {

    //Set transfer data when we grab a player
    const onDragStart = e => {
        e.dataTransfer.setData('application/json', JSON.stringify(player))
    }

    return (
        <div
            className={`relative border-1 border-yellow-100 rounded-md min-h-[40px] my-1 w-full flex flex-col items-center justify-center bg-yellow-500/10 hover:bg-yellow-500/20 hover:cursor-grab`}
            draggable={true}
            onDragStart={onDragStart}
        >
            <p className="text-xs bottom-[1px] absolute font-light">{player.name}</p>
            <p className="absolute top-0 text-md font-medium">#{player.number}</p>
            <p className="absolute left-2 top-0 text-sm">{player.position}</p>
            <i 
                className="fa-solid fa-user-slash text-md absolute right-1 text-red-500 hover:text-red-700 hover:scale-150 transition-all duration:1000 hover:cursor-pointer p-1.5"
                onClick={e => {
                    e.stopPropagation()
                    handleIconClick()
                }}
            />
        </div>
    )
}

export default Player