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
    { id: 1, name: 'abcdefghijklmnop reallylongnametest', number: 5, position: 'Wide Receiver'},
    { id: 2, name: 'jake you suck', number: 0, position: 'Bench Warmer'},
    { id: 3, name: 'billy bob joe', number: 43, position: 'Quarterback'},
    { id: 4, name: 'john jacob jingleheimer schmidt', number: 53, position: 'Left Tackle'},
    { id: 5, name: 'john doe', number: 29, position: 'Right Tackle'},
    { id: 6, name: 'a lskdf;lksa dfl sdflj', number: 4, position: 'Corner'},
    { id: 7, name: 'asdf asdfasdf', number: 15, position: 'Running Back'},
    { id: 8, name: 'asdfsd asdffdsa', number: 12, position: 'Center'},
    { id: 9, name: 'asdffasdf asdads', number: 23, position: 'Kicker'},
    { id: 10, name: 'asfdfdasfd asdfasdf-asdf', number: 87, position: 'reallylongpositiontest'},
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
            <div className="player-list-wrapper">
                <PlayerList players={players} handleDragStart={handleDragStart} handleUpdate={handleUpdate} title="Away" />
                <PlayerList players={players} handleDragStart={handleDragStart} handleUpdate={handleUpdate} title="Home" />
            </div>
            
        </>
    )
}

export default App
