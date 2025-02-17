import { useState } from 'react'
import './GameSelection.css'

const GameSelection = ({ games, onCreateGame, onSelectGame }) => {
    const [newGameName, setNewGameName] = useState('')
    const [newGameSport, setNewGameSport] = useState('')

    return (
        <div className="game-selection">
            <div className="create-game">
                <h1>Create a New Game</h1>
                <input
                    type="text"
                    placeholder="New Game Name"
                    value={newGameName}
                    onChange={e => setNewGameName(e.target.value)}
                />
                <select
                    onChange={e => setNewGameSport(e.target.value)}
                >
                    <option value="" disabled selected>Select a game</option>
                    <option value="Baseball">Baseball</option>
                    <option value="Softball">Softball</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Soccer">Soccer</option>
                </select>
                <button
                    onClick={_ => {
                        if(newGameName.trim()) {
                            onCreateGame(newGameName, newGameSport)
                            setNewGameName('')
                            setNewGameSport('')
                        }
                    }}
                >
                    Create Game
                </button>
            </div>

            <div className="game-list">
                <h2>Select a Game</h2>
                <ul>
                    {games.length ? (
                        games.map(game => (
                            <li
                                key={game.id}
                                onClick={_ => onSelectGame(game.id)}
                            >
                                <h3>
                                {game.name}
                                </h3>
                                {game.sport}
                            </li>
                        ))
                    ) : (
                        <p>No Games Available</p>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default GameSelection