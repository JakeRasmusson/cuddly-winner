import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useGameList } from "../../contexts/gameListContext"
import { useEditingGame } from "../../contexts/editingGameContext"

import StatsSelector from "../../components/StatsSelector/StatsSelector"
import OverlayPreview from "../../components/OverlayPreview/OverlayPreview"
import TeamList from "../../components/TeamList/TeamList"
import ActiveRoster from "../../components/ActiveRoster/ActiveRoster"

const Editor = () => {
  //So the back button can navigate us back to the home page
  const navigate = useNavigate()

  //Context to allow us to access the list of available games and the currently editing game
  const { gameList } = useGameList()
  const { editingGame, setEditingGame } = useEditingGame()

  //Get all the details of this current game
  let game = gameList.find((g) => g.id == editingGame) || {
    id: 1,
    sport: "Cup Stacking",
    team1: {
      town: "Town 1",
      players: []
    },
    team2: {
      town: "Town 2",
      players: []
    }
  }

  console.log(game.team1.players)

  //Upon click of the back button
  const handleReturn = (_) => {
    setEditingGame("") //We're no longer editing a game
    navigate("/")      //Take us back home!
  }

  return (
    <>
      <button
        onClick={handleReturn}
        className="absolute top-5 left-5 cursor-pointer rounded-md border-1 border-yellow-400 bg-transparent px-5 py-1 text-yellow-200 shadow transition-all duration-300 hover:bg-white/15 hover:shadow-[0_0_10px_rgb(250,204,21)]"
      >
        Return to Game List
      </button>

      <div className="flex flex-col items-center justify-center">
        <p className="text-4xl font-light tracking-[15px] text-yellow-200 italic">
          {game.team1.town} VS {game.team2.town}
        </p>
        <p className="text-md my-5 font-extralight tracking-[10px] text-yellow-50 italic">
          {game.sport.toUpperCase()}
        </p>
      </div>

      <div className="flex">
        <StatsSelector />
        <OverlayPreview />
      </div>

      <div className="flex">
        <ActiveRoster game={game}/>
        <TeamList game={game}/>
      </div>
    </>
  )
}

export default Editor
