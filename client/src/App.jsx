import { useState } from 'react'
import Player from './components/Player/Player'
import PlayerList from './components/PlayerList/PlayerList'
import './App.css'

/**
 * 
 * Components
 *     - Player
 *         - Name
 *         - Number
 *         - Position
 *         - Arbitrary stats?
 *     - Templates
 *         - Overall (Team v Team)
 *         - Defense
 *         - Offense
 *         - Arbitrary stats?
 *     - Roster
 *         - Drag players into roster
 *     - Preview
 *         - Selected template displays preview
 *     - Data Webpage
 * 
 * Selecting new template displays updated URL to see live stats
 * 
 */

const initialPlayers = [
    { id: 1, name: 'abcdefghighlmnop reallylongnametest', number: 5, position: 'Wide Receiver'},
    { id: 2, name: 'jake you suck', number: 0, position: 'Bench Warmer'},
    { id: 3, name: 'billy bob joe', number: 43, position: 'Quarterback'}
]

const App = () => {
    const [players, setPlayers] = useState(initialPlayers)

    const handleUpdate = (id, updateData) => {
        setPlayers(players.map(p => (p.id == id ? { ...p, ...updatedData } : p)))
    }

    const handleDragStart = (e, player) => {
        e.dataTransfer.setData('player', JSON.stringify(player))
    }

    return (
        <>
            <div>
                <PlayerList players={players} handleDragSTart={handleDragStart} handleUpdate={handleUpdate} title="Home" />
                <PlayerList players={players} handleDragSTart={handleDragStart} handleUpdate={handleUpdate} title="Away" />
            </div>
        </>
    )
}

export default App
