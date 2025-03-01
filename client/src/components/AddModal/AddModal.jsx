import React, { useState, useRef } from 'react'

const AddModal = ({ onClose }) => {

    const fileInputRef = useRef(null)

    const [isHome, setIsHome] = useState(true)

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
                active: false
            }
            obj[player[1]].id = obj[player[1]].team + index
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

    return (
        <>
            <div className="absolute flex w-[100%] h-full left-0 top-0 bg-black/20 items-center justify-center">
                <div className="flex flex-col bg-[rgba(28,12,34,0.8)] w-[80%] h-1/2 rounded-2xl border-2 border-yellow-400 shadow-[0_0_25px_rgb(250,204,21)] relative">
                    <h1 className="self-center pt-4 border-b-1 text-2xl font-extralight tracking-[8px] text-yellow-300 w-[80%]">
                        Manage Players: Import or Create
                    </h1>

                    {/* Toggle */}
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
                        className="absolute left-[25%] translate-x-[-25%] top-15 mt-4 mx-auto w-50 rounded-md border border-purple-500 bg-purple-300/10 py-2 font-bold tracking-widest text-yellow-50 hover:cursor-pointer hover:shadow-[0_0_10px_rgb(168,85,247)]"
                    >Import</button>
                </div>
            </div>
        </>
    )
}

export default AddModal

