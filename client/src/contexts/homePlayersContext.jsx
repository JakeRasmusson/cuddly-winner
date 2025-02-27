import React, { createContext, useContext, useState } from 'react'

const HomePlayersContext = createContext()

export const HomePlayersProvider = ({ children }) => {
    const [ homePlayers, setHomePlayers ] = useState([])

    return (
        <HomePlayersContext.Provider value={{ homePlayers, setHomePlayers }}>
            {children}
        </HomePlayersContext.Provider>
    )
}

export const useHomePlayers = _ => useContext(HomePlayersContext)