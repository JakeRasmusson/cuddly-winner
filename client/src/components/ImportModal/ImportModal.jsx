import React, { useState, useRef } from 'react'

import { usePlayerList } from '../../contexts/playerListContext';

const ImportModal = ({ onClose }) => {

    const fileInputRef = useRef(null)

    const [isHome, setIsHome] = useState(true)

    const [homePlayers, setHomePlayers] = useState([])
    const [awayPlayers, setAwayPlayers] = useState([])
    const [homeFileName, setHomeFileName] = useState(null)
    const [awayFileName, setAwayFileName] = useState(null)

    //const { addPlayer, playerList } = usePlayerList();

    const handleToggle = () => {
        setIsHome(prev => !prev)
    }

    const handleImportClick = _ => {
        fileInputRef.current.click()
    }

    const handleFileSelection = e => {
        const file = e.target.files[0]
    
        if (file) {
            readFile(file)
        }

        e.target.value = ''
    };
    
    const readFile = (file) => {
        const reader = new FileReader()

        reader.onload = _ => {
            const fileContents = reader.result
            const parsedPlayers = parseCSV(fileContents)

            if(isHome){
                setHomePlayers(Object.values(parsedPlayers))
                setHomeFileName(file.name)
            }
            else {
                setAwayPlayers(Object.values(parsedPlayers))
                setAwayFileName(file.name)
            }

            if(fileInputRef.current){
                fileInputRef.current.value = ''
            }
        }

        reader.onerror = (error) => {
            console.error("Error while reading file:", error)
        }

        reader.readAsText(file)
    }

    const parseCSV = (contents) => {
        const lines = contents.split("\n")

        let players = []

        for (let line of lines) {
            let curLine = line.replace(/\"/g, "").split(",")

            if (!isNaN(parseInt(curLine[0]))) {
                players.push(curLine)
            }
        }

        let obj = {}

        players.forEach((player, index) => {
            obj[player[1]] = {
                name: player[1],
                number: player[0],
                position: player[2],
                grade: player[3],
                height: player[4],
                weight: player[5],
                team: isHome ? 'home' : 'away',
                id: index + 1
            }
        })

        return obj
    }

    const clearUpload = team => {
        if(team == 'home'){
            setHomePlayers([])
            setHomeFileName(null)
        }
        else {
            setAwayPlayers([])
            setAwayFileName(null)
        }

        if(fileInputRef.current){
            fileInputRef.current.value = ""
        }
    }

    const handleConfirm = _ => {
        console.log("DO SOMETHING WITH THE PLAYERS HERE")

        onClose()
    }

    return (
        <div className="flex absolute w-[100%] h-[100%] left-0 top-0 bg-black/20 items-center justify-center">
            <div className="flex flex-col bg-black/80 w-1/2 h-1/2 rounded-2xl border-2 border-yellow-400 shadow-[0_0_25px_rgb(250,204,21)] relative">
                <h1 className="self-center pt-4 border-b-1 text-2xl font-extralight tracking-[8px] text-yellow-300 w-[80%]">
                    Select CSV to Import a Team
                </h1>
                <div className="absolute bottom-4 w-full flex justify-center items-center">
                    <p className="font-light text-yellow-300 tracking-widest mr-5">Home</p>
                    { /* https://www.creative-tim.com/twcomponents/component/toggle-switches */}
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input id="switch" type="checkbox" className="peer sr-only" checked={!isHome} onChange={handleToggle}/>
                        <div className="peer h-4 w-11 rounded-full border bg-purple-300 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border-6 after:border-gray-300 after:bg-purple-900 after:transition-all duration-100 after:content-[''] peer-checked:bg-yellow-200 peer-checked:after:translate-x-full"></div>
                    </label>
                    <p className="font-light text-yellow-300 tracking-widest ml-5">Away</p>
                </div>

                {/* File Upload */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelection}
                    hidden
                />

                <button
                    onClick={handleImportClick}
                    className="mt-4 mx-auto w-50 rounded-md border border-purple-500 bg-black py-2 font-bold tracking-widest text-yellow-50 shadow hover:cursor-pointer hover:bg-neutral-800 hover:shadow-[0_0_10px_rgb(250,204,21)]"
                >Import</button>

                {/* Populate Player Display */}
                <div className="flex w-full justify-between space-x-8 mt-6">
                    {/* Home Team */}
                    <div className="flex-1 px-4">
                        <h2 className="border-b-1 text-2xl font-extralight tracking-[8px] text-yellow-300 mb-2">Home Team</h2>
                        {homeFileName && (
                            <div className="flex justify-between items-center pb-4 rounded-md">
                                <span className="text-xs w-full ">{homeFileName}</span>
                                <button 
                                    className="ml-2 text-red-500 hover:cursor-pointer hover:text-red-800 transition-all duration:500"
                                    onClick={() => clearUpload("home")}
                                >
                                    Clear
                                </button>
                                
                            </div>
                        )}
                        <div className="max-h-25 overflow-y-auto">
                            {homePlayers.length > 0 ? (
                                <ul>
                                    {homePlayers.map((player, index) => (
                                        <li key={index}>{player.number} - {player.name} ({player.position})</li>
                                    ))}
                                </ul>
                            ) : <p className="text-purple-200 italic tracking-widest">No players imported</p>}
                        </div>
                    </div>

                    {/* Away Team */}
                    <div className="flex-1 px-4">
                        <h2 className="border-b-1 text-2xl font-extralight tracking-[8px] text-yellow-300 mb-2">Visiting Team</h2>
                        {awayFileName && (
                            <div className="flex justify-between items-center pb-4 rounded-md">
                                <span className="text-xs w-full ">{awayFileName}</span>
                                <button 
                                    className="ml-2 text-red-500 hover:cursor-pointer hover:text-red-800 transition-all duration:500"
                                    onClick={() => clearUpload("home")}
                                >
                                    Clear
                                </button>
                                
                            </div>
                        )}
                        <div className="max-h-25 overflow-y-auto">
                            {awayPlayers.length > 0 ? (
                                <ul>
                                    {awayPlayers.map((player, index) => (
                                        <li key={index}>{player.number} - {player.name} ({player.position})</li>
                                    ))}
                                </ul>
                            ) : <p className="text-purple-200 italic tracking-widest">No players imported</p>}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleConfirm}
                    className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 absolute bottom-3 left-3 hover:cursor-pointer transition-all duration:500"
                >
                    Confirm Import
                </button>
                <button
                    onClick={onClose}
                    className="ml-4 bg-red-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-red-500 absolute bottom-3 right-3 hover:cursor-pointer transition-all duration:500"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default ImportModal