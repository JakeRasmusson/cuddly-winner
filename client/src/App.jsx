/**

    Modal for importing
        - 'Edit' button, pulls up modal with
          home/away slider, add/remove player, import team


 */

import { useState } from 'react'
import PlayerList from './components/PlayerList/PlayerList'
import Roster from './components/Roster/Roster'
import GameSelection from './components/GameSelection/GameSelection'
import BasicEditor from './components/BasicEditor/BasicEditor'
import StatsEditor from './components/StatsEditor/StatsEditor'
import ImportModal from './components/ImportModal/ImportModal'
import './App.css'

const initialHomePlayers = [].map((player, index) => ({...player, id: index + 1, team: 'home'}))
const initialAwayPlayers = [].map((player, index) => ({...player, id: index + 1, team: 'away'}))

const App = () => {
    const [homePlayers, setHomePlayers] = useState([])
    const [awayPlayers, setAwayPlayers] = useState([])

    const [homeRoster, setHomeRoster] = useState([])
    const [awayRoster, setAwayRoster] = useState([])

    const [currentPage, setCurrentPage] = useState('selection')
    const [selectedGame, setSelectedGame] = useState(null)
    const [games, setGames] = useState([])

    const [editorType, setEditorType] = useState(null)
    const [editingPlayer, setEditingPlayer] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleEdit = (type, player) => {
        setEditorType(type)
        setEditingPlayer(player)
        //console.log('type: ' + type)
        //console.log('player: ' + player)
    }
    const closeEditor = _ => {
        setEditorType(null)
        setEditingPlayer(null)
    }
    const handleSave = updatedPlayer => {
        //console.log(updatedPlayer)
        const updateList = (list, setList) => setList(list.map(p => (p.id == updatedPlayer.id ? updatedPlayer : p)))

        //console.log("Updated player from " + updatedPlayer.team)

        if(updatedPlayer.team == 'home'){
            editorType == 'basic'
                ? updateList(homePlayers, setHomePlayers)
                : updateList(homeRoster, setHomeRoster)
        }
        if(updatedPlayer.team == 'away'){
            editorType == 'basic'
                ? updateList(awayPlayers, setAwayPlayers)
                : updateList(awayRoster, setAwayRoster)
        }

        closeEditor()
    }

    const handleCreateGame = (gameName, sport) => {
        const newGame = { id: new Date(Date.now()), name: gameName, sport: sport }
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
        //console.log("Roster player " + JSON.stringify(player))
        if(team == 'Home'){
            setHomeRoster(prevRoster => [...prevRoster, player])
            setHomePlayers(prevPlayers => prevPlayers.filter(p => p.id != player.id))
        }
        if(team == 'Away'){
            setAwayRoster(prevRoster => [...prevRoster, player])
            setAwayPlayers(prevPlayers => prevPlayers.filter(p => p.id != player.id))
        }
    }

    const handleImportingPlayers = (players, team) => {
        console.log(`Importing players for ${team}: ${players}`)
        if(team == 'home'){
            setHomePlayers(players)
        }
        if(team == 'away'){
            setAwayPlayers(players)
        }
    }

    const handleAddPlayer = (playerData, team) => {
        const newPlayer = {
            ...playerData,
            id: team == 'home' ? homePlayers.length + 1 : awayPlayers.length + 1
        }

        if(team == 'home'){
            setHomePlayers(prevPlayers => [...prevPlayers, newPlayer])
        }
        if(team == 'away'){
            setAwayPlayers(prevPlayers => [...prevPlayers, newPlayer])
        }

        console.log(`Added player to ${team}: ${newPlayer}`)
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
                    <p className="editing-title">Editing {selectedGame.name}</p>
                    <button
                        onClick={_ => setCurrentPage('selection')}
                        className="back-button"
                    >
                        Back to Game Selection
                    </button>
                    
                    <div className="player-list-wrapper">
                        <PlayerList players={homePlayers} handleDragStart={handleDragStart} handleUpdate={handleUpdate} onEdit={handleEdit} title="Home" team="home"/>
                        <PlayerList players={awayPlayers} handleDragStart={handleDragStart} handleUpdate={handleUpdate} onEdit={handleEdit} title="Away" team="away"/>

                        <div>
                            <button className="import-modal-button" onClick={() => setIsModalOpen(true)}>Import Teams</button>
                            {isModalOpen && (
                                <ImportModal
                                    onClose={() => setIsModalOpen(false)}
                                    onPlayersImported={handleImportingPlayers}
                                    onAddPlayer={handleAddPlayer}
                                />
                            )}
                        </div>
                    </div>
                    <div className="active-rosters">
                        <Roster team="Home" roster={homeRoster} handleDrop={handleDrop} onEdit={handleEdit} />
                        <Roster team="Away" roster={awayRoster} handleDrop={handleDrop} onEdit={handleEdit} />
                    </div>

                    {editorType == 'basic' && (
                        <BasicEditor player={editingPlayer} onSave={handleSave} onClose={closeEditor}/>
                    )}

                    {editorType == 'stats' && (
                        <StatsEditor player={editingPlayer} onSave={handleSave} onClose={closeEditor} sport={selectedGame.sport}/>
                    )}
                    
                </>
            )}
            
        </>
    )
}

export default App
