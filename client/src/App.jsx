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

function App() {

    const [players, setPlayers] = useState([
      { id: 1, name: "John Jacob Jingleheimer-Schmidt", number: 43, position: 'WR'}
    ])

    const handleUpdate = (id, updatedData) => {
        setPlayers((prev) => {
            console.log('Previous state:', prev);
            const updatedPlayers = prev.map((player) => {
                if (player.id === id) {
                    //console.log(`Updating player ${id} with:`, updatedData);
                    return { ...player, ...updatedData };
                }
                return player;
            });

            //console.log('Updated state:', updatedPlayers);
            return updatedPlayers;
        });
    };
    

    return (
        <>
        <PlayerList players={players} handleUpdate={handleUpdate} />
          <div>
            <h1>Player Test</h1>
            {players.map((player) => (
              <Player
                key={player.id}
                id={player.id}
                name={player.name}
                number={player.number}
                position={player.position}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        </>
    )
}

export default App
