import React, { useState, useEffect } from "react"

import Player from "../Player/Player"

import { useOverlay } from "../../contexts/OverlayContext"

const StatsSelector = ({ sportPositions }) => {

    const { overlayID, setOverlayID } = useOverlay()

    const [ position, setPosition ] = useState('')
    const [ players, setPlayers ] = useState([])

    useEffect( _ => {
        if(players.length) setOverlayID(players.length)
    }, [players])

    const onDragOver = e => {
        e.preventDefault()
    }

    const handleDrop = e => {
        const player = JSON.parse(e.dataTransfer.getData('application/json'))

        if(!player){
            console.error('No data received from player drag!')
        }

        if(players.find(p => p.id == player.id)){
            return alert(`${player.name} is already in the comparison list`)
        }

        setPlayers(prev => [...prev, player])
    }

    const handleClear = _ => {
        setPlayers([])
        setOverlayID('')
    }

    const handleSelect = id => {
        console.log("Setting overlay", id)
        setOverlayID(id)
    }

    return (
        <>
            <div className='w-full flex flex-col'>
                <div className="h-[250px] w-full rounded-3xl flex">
                    <div className="w-1/2 flex flex-col">
                        <h1 className="self-center border-b-1 w-[90%] text-2xl font-extralight tracking-[8px] text-yellow-300">
                            Quick Stats
                        </h1>
                        <select
                            id="position"
                            className="pt-5 text-md w-50 appearance-none border-b-2 border-yellow-200 bg-transparent text-yellow-200 outline-none self-center"
                            style={{ textAlignLast: "center" }}
                            onChange={(e) => setPosition(e.target.value)}
                            value={position}
                        >
                            <option value="" disabled hidden>
                                Select Position
                            </option>
                            {sportPositions.map(pos => 
                                <option value={pos} key={pos}>{pos}</option>
                            )}
                        </select>
                        <button onClick={_ => handleSelect('overall team 1')} className="w-[60%] self-center tracking-tighter font-light text-sm hover:text-yellow-600 hover:tracking-normal hover:scale-105 transition-all duration-300 hover:cursor-pointer border-yellow-200 border-1 py-[3px] px-[15px] rounded-lg mt-2">Overall Team 1 Stats</button>
                        <button onClick={_ => handleSelect('overall team 2')} className="w-[60%] self-center tracking-tighter font-light text-sm hover:text-yellow-600 hover:tracking-normal hover:scale-105 transition-all duration-300 hover:cursor-pointer border-yellow-200 border-1 py-[3px] px-[15px] rounded-lg mt-2">Overall Team 2 Stats</button>
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <h1 className="mb-4 self-center border-b-1 w-[90%] text-2xl font-extralight tracking-[8px] text-yellow-300">
                            Player Comparison
                        </h1>
                        <div className='w-[95%] h-[60%] overflow-y-auto overscroll-none bg-black/30 mb-4' onDragOver={onDragOver} onDrop={handleDrop}>
                            {
                                /* If there's no player, tell them how to work it */
                                !players.length ? (
                                    <div>
                                        <p className="text-xl italic text-yellow-200 font-light pt-3">No players selected</p>
                                        <p className="italic text-yellow-300 pt-5 font-extralight">Drop a player here to get started</p>
                                    </div>
                                ) : (
                                    <>
                                        {
                                            players.map(player => (
                                                <Player key={player.name} player={player} />
                                            ))
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                <button onClick={handleClear} className="w-[30%] self-center tracking-tighter font-light text-sm hover:text-yellow-600 hover:tracking-normal hover:scale-105 transition-all duration-300 hover:cursor-pointer border-yellow-200 border-1 py-[3px] px-[15px] rounded-lg mt-2">Clear Stats Display</button>
            </div>
        </>
    )
}

export default StatsSelector
