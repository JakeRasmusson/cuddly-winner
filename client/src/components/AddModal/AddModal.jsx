import React, { useState, useRef } from 'react'

import { useGameList } from '../../contexts/gameListContext'

const AddModal = ({ game, onClose }) => {

    document.body.style.overflow = "hidden"

    const { gameList, editGame } = useGameList()

    const fileInputRef = useRef(null)

    const [isHome, setIsHome] = useState(true)
    const [homeFileName, setHomeFileName] = useState('')
    const [awayFileName, setAwayFileName] = useState('')

    const [homePlayers, setHomePlayers] = useState([])
    const [awayPlayers, setAwayPlayers] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        number: '',
        position: '',
        grade: '',
        height: '',
        weight: ''
    })


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

    const onConfirm = _ => {
        homePlayers.forEach(player => player.id += game.team1.players.length)
        awayPlayers.forEach(player => player.id += game.team2.players.length)

        game.team1.players = [...game.team1.players, ...homePlayers]
        game.team2.players = [...game.team2.players, ...awayPlayers]

        editGame(game)

        onClose()
    }

    const handleCreatePlayer = e => {
        e.preventDefault()
        const team = isHome ? 'home' : 'away'

        const newPlayer = {
            grade: formData.grade,
            height: formData.height,
            id: team + (isHome ? game.team1.players.length+1 : game.team2.players.length+1),
            name: formData.name,
            number: formData.number,
            position: formData.position,
            team: team,
            weight: formData.weight,
            active: false
        }

        if(isHome){
            game.team1.players = [...game.team1.players, newPlayer]
        }
        else {
            game.team2.players = [...game.team2.players, newPlayer]
        }

        editGame(game)

        setFormData({
            name: '',
            number: '',
            position: '',
            grade: '',
            height: '',
            weight: ''
        })
    }

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <div className="fixed flex w-[100%] h-[100%] left-0 top-0 bg-black/20 items-center justify-center">
                <div className="flex flex-col bg-[rgba(28,12,34,0.9)] w-[80%] h-1/2 rounded-2xl border-2 border-yellow-400 shadow-[0_0_25px_rgb(250,204,21)] relative">
                    <h1 className="self-center pt-4 border-b-1 text-2xl font-extralight tracking-[8px] text-yellow-300 w-[80%]">
                        Import a File or Create a New Player
                    </h1>

                    {/* Toggle */}
                    <div className="absolute bottom-4 w-full flex justify-center items-center">
                        <p className="font-light text-yellow-300 tracking-widest mr-5">{game.team1.town}</p>
                        { /* https://www.creative-tim.com/twcomponents/component/toggle-switches */}
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input id="switch" type="checkbox" className="peer sr-only" checked={!isHome} onChange={handleToggle}/>
                            <div className="peer h-4 w-11 rounded-full border bg-purple-300 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border-6 after:border-gray-300 after:bg-purple-900 after:transition-all duration-100 after:content-[''] peer-checked:bg-yellow-200 peer-checked:after:translate-x-full"></div>
                        </label>
                        <p className="font-light text-yellow-300 tracking-widest ml-5">{game.team2.town}</p>
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
                        className="absolute left-[25%] translate-x-[-25%] top-18 mx-auto w-50 rounded-md border border-purple-500 bg-purple-300/10 py-2 font-bold tracking-widest text-yellow-50 hover:cursor-pointer hover:shadow-[0_0_10px_rgb(168,85,247)]"
                    >Import</button>
                    <button
                        onClick={_ => {clearUpload('home'), clearUpload('away'), onClose()}}
                        className="border-1 border-red-300 text-red-200 bg-red-300/20 px-6 py-2 rounded-lg font-bold hover:shadow-[0_0_10px_rgb(239,68,68)] absolute right-3 bottom-3 hover:cursor-pointer transition-all duration:500 z-1"
                    >
                        Close
                    </button>

                    <p className="absolute left-[25%] translate-x-[-25%] top-30 italic text-yellow-300 font-light tracking-tight">Importing players will <span className="not-italic font-medium">add</span> to the existing team list</p>

                    <div className="w-[60%] py-20">

                        {/* Populate Player Display */}
                        <div className="flex w-full justify-between space-x-8 mt-6">
                            {/* Home Team */}
                            <div className="flex-1 px-4">
                                <h2 className="border-b-1 text-2xl font-extralight tracking-[8px] text-yellow-300 mb-2">{game.team1.town}</h2>
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
                                <h2 className="border-b-1 text-2xl font-extralight tracking-[8px] text-yellow-300 mb-2">{game.team2.town}</h2>
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
                            onClick={onConfirm}
                            className="border-1 border-yellow-200 bg-yellow-200/20 text-yellow-200 px-6 py-2 rounded-lg font-bold hover:shadow-[0_0_10px_rgb(250,204,21)] absolute bottom-3 left-3 hover:cursor-pointer transition-all duration:500"
                        >
                            Confirm Teams
                        </button>
                    </div>
                </div>

                <div className="w-[30%] h-[40%] absolute right-40 bottom-52 p-4">
                    <h2 className="text-yellow-300 text-lg font-bold text-center mb-2">Create Player</h2>

                    <form className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {/* Left Column */}
                        <div className="flex flex-col">
                            <label className="text-yellow-200 text-sm">Name<span className="text-md text-red-500">*</span></label>
                            <input 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                type="text" 
                                className="text-sm rounded-md border border-yellow-200 bg-black p-1 outline-none focus:shadow-[0_0_10px_rgb(250,204,21)]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-yellow-200 text-sm">Number<span className="text-md text-red-500">*</span></label>
                            <input 
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                required
                                type="number"
                                className="text-sm w-[20%] rounded-md border border-yellow-200 bg-black p-1 self-center outline-none focus:shadow-[0_0_10px_rgb(250,204,21)]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-yellow-200 text-sm">Position<span className="text-md text-red-500">*</span></label>
                            <input 
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                required
                                type="text"
                                className="text-sm rounded-md border border-yellow-200 bg-black p-1 outline-none focus:shadow-[0_0_10px_rgb(250,204,21)]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-yellow-200 text-sm">Grade</label>
                            <input
                                name="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                type="text"
                                className="text-sm w-[20%] rounded-md border border-yellow-200 bg-black p-1 self-center outline-none focus:shadow-[0_0_10px_rgb(250,204,21)]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-yellow-200 text-sm">Height</label>
                            <input 
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                type="text"
                                className="text-sm rounded-md border border-yellow-200 bg-black p-1 outline-none focus:shadow-[0_0_10px_rgb(250,204,21)]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-yellow-200 text-sm">Weight</label>
                            <input 
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                type="number"
                                className="text-sm w-[20%] rounded-md border border-yellow-200 bg-black p-1 self-center outline-none focus:shadow-[0_0_10px_rgb(250,204,21)]"
                            />
                        </div>

                        {/* Save Button - Spanning Both Columns */}
                        <div className="col-span-2 flex justify-center mt-2">
                            <button 
                                type="submit"
                                className="bg-yellow-400 text-black py-1 px-4 rounded-md font-bold text-sm hover:bg-yellow-500 transition-all"
                                onClick={handleCreatePlayer}
                            >
                                Add Player
                            </button>
                        </div>
                    </form>
                </div>



            </div>
        </>
    )
}

export default AddModal

