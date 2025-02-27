import React, { createContext, useContext, useState } from 'react'

const PlayerListContext = createContext()

export const PlayerListProvider = ({ children }) => {
    const [playerList, setPlayerList] = useState([])

    const addPlayer = (player) => {
        setPlayerList(prev => [...prev, player])
    }

    return (
        <PlayerListContext.Provider value={{ playerList, addPlayer }}>
            {children}
        </PlayerListContext.Provider>
    )
}

export const usePlayerList = _ => useContext(PlayerListContext)