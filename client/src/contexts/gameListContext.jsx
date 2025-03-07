import React, { createContext, useContext, useState } from "react"

const GameListContext = createContext()

export const GameListProvider = ({ children }) => {
    const [gameList, setGameList] = useState([])

    const addGame = newGame => {
        setGameList((prev) => [...prev, newGame])
    }

    const editGame = editedGame => {
        setGameList(prev => prev.map(g => g.id == editedGame.id ? {... editedGame} : g))
    }

    const editPlayer = (gameId, team, playerId, updatedStats) => {
        console.log("Stats passed to edit player", updatedStats)
        setGameList(prev =>
            prev.map(game => {
                if(game.id != gameId) return game

                const teamKey = team == 'home' ? 'team1' : 'team2'
                const updatedPlayers = game[teamKey].players.map(player => 
                    player.id == playerId
                        ? {
                            ...player,
                            stats: {
                                ...player.stats,
                                [updatedStats.isOffense ? 'offense' : 'defense']: {
                                    base: { ...updatedStats.baseStats },
                                    autocalculated: { ...updatedStats.autoStats }
                                }
                            }
                        }
                        : player
                )

                console.log("Updated players:", updatedPlayers)

                return {
                    ...game,
                    [teamKey]: {
                        ...game[teamKey],
                        players: updatedPlayers
                    }
                }
            })
        )
    }

    return (
        <GameListContext.Provider value={{ gameList, addGame, editGame, editPlayer }}>
            {children}
        </GameListContext.Provider>
    )
}

export const useGameList = _ => useContext(GameListContext)
