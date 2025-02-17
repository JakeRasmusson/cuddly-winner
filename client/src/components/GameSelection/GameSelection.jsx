import { useState } from 'react'

const GameSelection = ({ games, onCreateGame, onSelectGame }) => {
    const [newGameName, setNewGameName] = useState('')

    return (
        <div className="flex flex-col items-center space-y-4 p-4">
            <h1 className="text-2x1 font-bold">Select or Create a Game</h1>

            <select
                className="p-2 border rounded"
                onChange={(e) => onSelectGame(Number(e.target.value))}
                defaultValue=""
            >
                <option value="" disabled>Select a Game</option>
                {
                    games.map(game => (
                        <option key={game.id} value={game.id}>
                            {game.name}
                        </option>
                    ))
                }
            </select>

            <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder="New Game Name"
                    value={newGameName}
                    onChange={(e) => setNewGameName(e.target.value)}
                    className="border p-2 rounded"
                />
                <button
                    onClick={_ => {
                        if(newGameName.trim()){
                            onCreateGame(newGameName)
                            setNewGameName('')
                        }
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded hover: bg-green-600"
                >
                    Create Game
                </button>
            </div>
        </div>
    )
}

export default GameSelection