import { useState } from 'react'
import Player from './components/Player/Player'
import PlayerList from './components/PlayerList/PlayerList'
import Roster from './components/Roster/Roster'
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

const initialHomePlayers = [
  { name: 'abcdefghijklmnop reallylongnametest', number: 5, position: 'Wide Receiver' },
  { name: 'jake you suck', number: 0, position: 'Bench Warmer' },
  { name: 'billy bob joe', number: 43, position: 'Quarterback' },
  { name: 'john jacob jingleheimer-schmidt', number: 75, position: 'Reallylong positiontest' },
  { name: 'john doe', number: 1, position: 'Corner'}
].map((player, index) => ({...player, id: index + 1}))

const initialAwayPlayers = [
  { name: 'another long name but on away this time', number: 5, position: 'Wide Receiver' },
  { name: 'jake you suck', number: 0, position: 'Bench Warmer' },
  { name: 'billy bob joe', number: 43, position: 'Quarterback' },
  { name: 'john jacob jingleheimer-schmidt', number: 75, position: 'Reallylong positiontest' },
  { name: 'john doe', number: 1, position: 'Corner'}
].map((player, index) => ({...player, id: index + 1}))



const App = () => {
    const [homePlayers, setHomePlayers] = useState(initialHomePlayers)
    const [awayPlayers, setAwayPlayers] = useState(initialAwayPlayers)

    const [homeRoster, setHomeRoster] = useState([])
    const [awayRoster, setAwayRoster] = useState([])

    const handleUpdate = (id, updatedData, team) => {
        if(team == 'home'){
            setHomePlayers(prev => {
                const updatedHomePlayers = prev.map(p => {
                    if(p.id == id){
                        return { ...p, ...updatedData }
                    }

                    return p
                })

                return updatedHomePlayers
            })
        }
        else {
            setAwayPlayers(prev => {
                const updatedAwayPlayers = prev.map(p => {
                    if(p.id == id){
                        return { ...p, ...updatedData }
                    }

                    return p
                })

               return updatedAwayPlayers
            })
        }
    }

    const handleDragStart = (e, player, team) => {
        e.dataTransfer.setData('player', JSON.stringify(player))
        e.dataTransfer.setData('team', team)
    }

    const handleDrop = (player, team) => {
      if(team == 'Home'){
        setHomeRoster(prevRoster => [...prevRoster, player])
        setHomePlayers(prevPlayers => prevPlayers.filter(p => p.id != player.id))
      }
      if(team == 'Away'){
        setAwayRoster(prevRoster => [...prevRoster, player])
        setAwayPlayers(prevPlayers => prevPlayers.filter(p => p.id != player.id))
      }
    }

    return (
        <>
            <div className="player-list-wrapper">
                <PlayerList players={homePlayers} handleDragStart={handleDragStart} handleUpdate={handleUpdate} title="Home" team="home"/>
                <PlayerList players={awayPlayers} handleDragStart={handleDragStart} handleUpdate={handleUpdate} title="Away" team="away"/>
            </div>
            <div className="active-rosters">
                <Roster team="Home" roster={homeRoster} handleDrop={handleDrop} />
                <Roster team="Away" roster={awayRoster} handleDrop={handleDrop} />
            </div>
            
        </>
    )
}

export default App
