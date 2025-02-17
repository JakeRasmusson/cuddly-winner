import { useState } from 'react'
import Player from './components/Player/Player'
import PlayerList from './components/PlayerList/PlayerList'
import Roster from './components/Roster/Roster'
import GameSelection from './components/GameSelection/GameSelection'
import './App.css'

const sportsStats = {
    baseball: {
        stats: {
            offense: ['Home Runs', 'RBI', 'Hits', 'Doubles', 'Triples', 'Base on Balls', 'Plate Appearances', 'Strikeouts', 'Stolen Bases', 'Hit by Pitch'],
            defense: ['Strikeouts', 'Walks', 'Errors'],
            autocalculated: ['Batting Average', 'Slugging Average', 'On Base Percentage']
        }
    },
    softball: {
        stats: {
            offense: ['Home Runs', 'RBI', 'Hits', 'Doubles', 'Triples', 'Base on Balls', 'Plate Appearances', 'Strikeouts', 'Stolen Bases', 'Hit by Pitch'],
            defense: ['Strikeouts', 'Walks', 'Errors'],
            autocalculated: ['Batting Average', 'Slugging Average', 'On Base Percentage']
        }
    },
    football: {
        stats: {
            offense: ['Passing Attempts', 'Completions', 'Passing Yards', 'Touchdowns Thrown', 'Interceptions', 'Quarterback Rating', 'Rushing Attempts', 'Rushing Yards', 'Touchdowns', 'Yards per Carry', 'Fumbles', 'Receptions', 'Receiving Yards', 'Yards per Reception', 'Targets', 'Sacks Allowed', 'Penalties', 'Snap Counts'],
            defense: ['Solo Tackles', 'Assisted Tacklkes', 'Tackles for Loss', 'Sacks', 'Quarterback Hits', 'Interceptions', 'Passes Defended', 'Forced Fumbles', 'Fumble Recoveries', 'Defensive Touchdowns', 'Safety', 'Blocked Kicks', 'Pressures', 'Hurries'],
            autocalculated: ['Completion Percentage', 'Tackles']
        }
    },
    basketball: {
        stats: ['Points', 'Field Goals Made', 'Field Goals Attempted', 'Three-Point Field Goals Made', 'Three-Point Field Goals Attempted', 'Free Throws Made', 'Free Throws Attempted', 'Offensive Rebounds', 'Defensive Rebounds', 'Assists', 'Steals', 'Blocks', 'Deflections', 'Fouls'],
        autocalculated: ['Field Goal Percentage', 'Three-Point Percentage', 'Free Throw Percentage', 'Rebounds']
    },
    soccer: {
        stats: ['Goals', 'Assists', 'Shots', 'Shots on Target', 'Chances Created', 'Dribbles Completed', 'Passes Completed', 'Tackles', 'Interceptions', 'Blocks', 'Saves', 'Goals Conceded', 'Penalties Faced', 'Penalties Saved', 'Fouls Committed', 'Yellow Cards', 'Red Cards'],
        autocalculated: ['Shooting Accuracy']
    }
}

/**
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
 * Change posession toggle
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

    const [currentPage, setCurrentPage] = useState('selection')
    const [selectedGame, setSelectedGame] = useState(null)
    const [games, setGames] = useState([
        { id: 1, name: 'Game 1', sport: 'Baseball' },
        { id: 2, name: 'Game 2', sport: 'Football' }
    ])

    const handleCreateGame = (gameName, sport) => {
        const newGame = { id: Date.now(), name: gameName, sport: sport }
        setGames([...games, newGame])
        setSelectedGame(newGame)
        setCurrentPage('roster')
    }
    const handleSelectGame = gameId => {
        const game = games.find(g => g.id == gameId)
        setSelectedGame(game)
        setCurrentPage('roster')
    }

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
            {currentPage == 'selection' ? (
                <GameSelection
                    games={games}
                    onCreateGame={handleCreateGame}
                    onSelectGame={handleSelectGame}
                />
            ) : (
                <>
                    <p>Editing {selectedGame.name}</p>
                    <div className="player-list-wrapper">
                        <PlayerList players={homePlayers} handleDragStart={handleDragStart} handleUpdate={handleUpdate} title="Home" team="home"/>
                        <PlayerList players={awayPlayers} handleDragStart={handleDragStart} handleUpdate={handleUpdate} title="Away" team="away"/>
                    </div>
                    <div className="active-rosters">
                        <Roster team="Home" roster={homeRoster} handleDrop={handleDrop} />
                        <Roster team="Away" roster={awayRoster} handleDrop={handleDrop} />
                    </div>
                    <button onClick={_ => setCurrentPage('selection')}>Back to Game Selection</button>
                </>
            )}
            
        </>
    )
}

export default App
