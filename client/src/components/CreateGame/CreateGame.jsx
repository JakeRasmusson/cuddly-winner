import React, { useState, useRef } from "react"

//Contexts
import { useGameList } from "../../contexts/gameListContext"
import { useEditingGame } from "../../contexts/editingGameContext"
import { useHomePlayers } from "../../contexts/homePlayersContext"
import { useAwayPlayers } from "../../contexts/awayPlayersContext"

//Components
import ImportModal from "../ImportModal/ImportModal"

const CreateGame = _ => {

    //Contexts
    const { homePlayers, setHomePlayers } = useHomePlayers()
    const { awayPlayers, setAwayPlayers } = useAwayPlayers()

    const { addGame } = useGameList()
    const { setEditingGame } = useEditingGame()

    //States
    const [homeTeam, setHomeTeam] = useState('') //Define home, away, and sport for a new game
    const [visitingTeam, setVisitingTeam] = useState('')
    const [sport, setSport] = useState('')

    //Show the import modal
    const [showImportModal, setShowImportModal] = useState(false)

    //Upon creation of a new game
    const handleCreateGame = (homeTeam, visitingTeam, sport, homeP, awayP) => {

        //Create object for the new game
        const newGame = {
            id: Date.now(),
            sport: sport,
            team1: {
                town: homeTeam,
                players: homeP,
            },
            team2: {
                town: visitingTeam,
                players: awayP
            }
        }

        setEditingGame(newGame.id)  //Automatically switch the current editing game to the newly created one
        addGame(newGame)            //Add the new game to the current list of available games
    }

    return (
        <>
            <div className="flex w-1/2 flex-col p-2">
                <h1 className="border-b-1 text-[30px] font-extralight tracking-[12px] text-yellow-300">
                    Create a Game
                </h1>
                <div className="grid grid-cols-2 content-center gap-y-5 pt-8">
                    <label className="text-lg font-extralight tracking-wider text-yellow-50">
                        Home Team
                    </label>
                    <input
                        type="text"
                        id="home"
                        className="text-md w-50 rounded-md border border-yellow-200 bg-black p-1 text-center outline-none focus:shadow-[0_0_10px_rgb(250,204,21)]"
                        placeholder="Home Team"
                        required
                        value={homeTeam}
                        onChange={(e) => setHomeTeam(e.target.value)}
                    />

                    <label className="text-lg font-extralight tracking-wider text-yellow-50">
                        Visiting Team
                    </label>
                    <input
                        type="text"
                        id="home"
                        className="text-md w-50 rounded-md border border-yellow-200 bg-black p-1 text-center outline-none focus:shadow-[0_0_10px_rgb(250,204,21)]"
                        placeholder="Visiting Team"
                        required
                        value={visitingTeam}
                        onChange={(e) => setVisitingTeam(e.target.value)}
                    />

                    <label className="text-lg font-extralight tracking-wider text-yellow-50">
                        Sport
                    </label>
                    <select
                        id="sport"
                        className="text-md block w-50 appearance-none border-0 border-b-2 border-yellow-200 bg-transparent text-yellow-200 outline-none"
                        style={{ textAlignLast: "center" }}
                        onChange={(e) => setSport(e.target.value)}
                        value={sport}
                    >
                        <option value="" disabled hidden>
                            Select a Sport
                        </option>
                        <option value="basketball">Basketball</option>
                        <option value="baseball">Baseball</option>
                        <option value="softball">Softball</option>
                        <option value="football">Football</option>
                        <option value="soccer">Soccer</option>
                    </select>
                </div>

                <button
                    className="mx-auto mt-8 w-50 rounded-md border border-yellow-200 bg-black py-2 font-bold tracking-widest text-yellow-50 shadow hover:cursor-pointer hover:bg-neutral-800 hover:shadow-[0_0_10px_rgb(250,204,21)]"
                    onClick={_ => setShowImportModal(true)}
                >
                    Import Teams
                </button>

                <div className="self-center flex w-[30%] flex-col pt-2">
                    <div className="relative flex items-center justify-between">
                        <p className="text-sm">Home Team</p>
                        {
                            homePlayers.length ?
                                <i className="fa-solid fa-check text-green-500 scale-75" /> :
                                <i className="fa-solid fa-x text-red-500 scale-75" />
                        }
                    </div>
                    <div className="relative flex items-center justify-between">
                        <p className="text-sm">Visiting Team</p>
                        {
                            awayPlayers.length ?
                                <i className="fa-solid fa-check text-green-500 scale-75" /> :
                                <i className="fa-solid fa-x text-red-500 scale-75" />
                        }
                    </div>
                </div>

                <button
                    className="mx-auto w-50 mt-8 rounded-md border border-yellow-200
                            bg-black py-2 font-bold tracking-widest text-yellow-50
                              shadow hover:cursor-pointer hover:bg-neutral-800
                              hover:shadow-[0_0_10px_rgb(250,204,21)]"
                    onClick={_ => {
                        if (homeTeam.trim() && visitingTeam.trim()) {
                            handleCreateGame(homeTeam, visitingTeam, sport, homePlayers, awayPlayers)
                            setHomeTeam("")
                            setVisitingTeam("")
                            setSport("")
                            setHomePlayers([])
                            setAwayPlayers([])
                        }
                    }}
                >
                    Create Game
                </button>

                { showImportModal && ( <ImportModal onClose={_ => setShowImportModal(false)} /> ) }
            </div>
        </>
    )
}

export default CreateGame
