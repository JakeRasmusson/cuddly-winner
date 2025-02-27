import React, { createContext, useContext, useState } from 'react'

const AwayPlayersContext = createContext()

export const AwayPlayersProvider = ({ children }) => {
    const [ awayPlayers, setAwayPlayers ] = useState([])

    return (
        <AwayPlayersContext.Provider value={{ awayPlayers, setAwayPlayers }}>
            {children}
        </AwayPlayersContext.Provider>
    )
}

export const useAwayPlayers = _ => useContext(AwayPlayersContext)