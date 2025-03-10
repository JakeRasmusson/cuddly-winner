import React, { useState, useEffect } from "react"

const StatsSelector = ({ sportPositions }) => {

    const [ position, setPosition ] = useState('')

    return (
        <>
            <div className='w-full flex flex-col'>
                <div className="h-[300px] w-full rounded-3xl flex">
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
                                Compare by Position
                            </option>
                            {sportPositions.map(pos => 
                                <option value={pos} key={pos}>{pos}</option>
                            )}
                        </select>
                        <button className='pt-5'>Overall Team 1 Stats</button>
                        <button className='pt-5'>Overall Team 2 Stats</button>
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <h1 className="self-center border-b-1 w-[90%] text-2xl font-extralight tracking-[8px] text-yellow-300">
                            Customize
                        </h1>
                    </div>
                </div>
                <button>Clear Stats Display</button>
            </div>
        </>
    )
}

export default StatsSelector
