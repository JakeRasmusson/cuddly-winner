import React, { createContext, useContext, useState } from "react"

const GameListContext = createContext()

export const GameListProvider = ({ children }) => {
  const [gameList, setGameList] = useState([])

  const addGame = (newGame) => {
    setGameList((prev) => [...prev, newGame])
  }

  const editGame = editedGame => {
    const game = gameList.filter(g => g.id == editedGame.id)

    setGameList(prev => prev.map(g => g.id == editedGame.id ? editedGame : g))
  }

  return (
    <GameListContext.Provider value={{ gameList, addGame, editGame }}>
      {children}
    </GameListContext.Provider>
  );
};

export const useGameList = (_) => useContext(GameListContext)
