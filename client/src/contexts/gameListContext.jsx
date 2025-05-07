import React, { createContext, useContext, useState, useEffect } from "react"

const GameListContext = createContext()

export const GameListProvider = ({ children }) => {
    const [gameList, setGameList] = useState([])

    const addGame = newGame => {
        setGameList(prev => [...prev, newGame])
    }

    const editGame = editedGame => {
        let previousList = JSON.parse(localStorage.getItem('gameList'))
        setGameList(prev => prev.map(g => g.id == editedGame.id ? {... editedGame} : g))
        previousList = previousList.map(g => g.id == editedGame.id ? {...editedGame} : g)
        localStorage.setItem('gameList', JSON.stringify(previousList))
    }

    const editPlayer = (gameId, team, playerId, updatedStats) => {
        const currentList = JSON.parse(localStorage.getItem('gameList')) || []

        const updatedList = currentList.map(game => {
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

            return {
                ...game,
                [teamKey]: {
                    ...game[teamKey],
                    players: updatedPlayers
                }
            }
        })

        localStorage.setItem('gameList', JSON.stringify(updatedList))

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
