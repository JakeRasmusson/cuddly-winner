import React, { createContext, useContext, useState } from "react";

const GameListContext = createContext();

export const GameListProvider = ({ children }) => {
  const [gameList, setGameList] = useState([]);

  const addGame = (newGame) => {
    setGameList((prev) => [...prev, newGame]);
  };

  return (
    <GameListContext.Provider value={{ gameList, addGame }}>
      {children}
    </GameListContext.Provider>
  );
};

export const useGameList = (_) => useContext(GameListContext);
