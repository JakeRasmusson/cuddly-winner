
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PlayerList from './components/PlayerList/PlayerList'
import Roster from './components/Roster/Roster'
import GameSelection from './components/GameSelection/GameSelection'
import BasicEditor from './components/BasicEditor/BasicEditor'
import StatsEditor from './components/StatsEditor/StatsEditor'
import ImportModal from './components/ImportModal/ImportModal'
import LayoutSelector from './components/LayoutSelector/LayoutSelector'
import LayoutPreview from './components/LayoutPreview/LayoutPreview'

import './App.css'

const App = () => {
    //Set players in each player list
    const [homePlayers, setHomePlayers] = useState([])
    const [awayPlayers, setAwayPlayers] = useState([])

    //Set players for active roster list
    const [homeRoster, setHomeRoster] = useState([])
    const [awayRoster, setAwayRoster] = useState([])

    //Are we displaying the game selection screen?
    const [currentPage, setCurrentPage] = useState('selection')
    const [selectedGame, setSelectedGame] = useState(null)
    const [games, setGames] = useState([])

    //Basic editor vs stats editor, and which player is being updated
    const [editorType, setEditorType] = useState(null)
    const [editingPlayer, setEditingPlayer] = useState(null)

    //Import team/create player modal
    const [isModalOpen, setIsModalOpen] = useState(false)

    //What happens when we click a player?  Are they in the player list or the active roster?
    const handleEdit = (type, player) => {
        setEditorType(type)
        setEditingPlayer(player)
        //console.log('type: ' + type)
        //console.log('player: ' + player)
    }
    //Close the editor...
    const closeEditor = _ => {
        setEditorType(null)
        setEditingPlayer(null)
    }

    //Update list of players with new, saved information
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

    //Create a new game object and add it to the previous list of games when a new one is created,
    //By default that page is selected to edit
    const handleCreateGame = (gameName, sport) => {
        const newGame = { id: new Date(Date.now()), name: gameName, sport: sport }
        setGames([...games, newGame])
        setSelectedGame(newGame)
        setCurrentPage('roster')
    }
    //If a user otherwise simply clicks an existing game, select that one
    const handleSelectGame = gameId => {
        const game = games.find(g => g.id == gameId)
        setSelectedGame(game)
        setCurrentPage('roster')
    }

    //When individual player is edited, save that information to the appropriate list
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

    //Add player to the chosen roster, remove them from player list
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

    //Set appropriate team when players are imported
    const handleImportingPlayers = (players, team) => {
        //console.log(`Importing players for ${team}: ${players}`)
        if(team == 'home'){
            setHomePlayers(players)
        }
        if(team == 'away'){
            setAwayPlayers(players)
        }
    }

    //Custom creation of one single player
    const handleAddPlayer = (playerData, team) => {
        const newPlayer = {
            ...playerData,
            id: team == 'home' ? homePlayers.length + 2 : awayPlayers.length + 2
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
        <BrowserRouter>
            {
            //If the current page is the game selection screen, 
            currentPage == 'selection' ? (
                <GameSelection
                    games={games}
                    onCreateGame={handleCreateGame}
                    onSelectGame={handleSelectGame}
                />
            ) : (
                <>
                    {/* Back button and 'Editing Page' title */}
                    <div className="page-info">
                        <p className="editing-title">{selectedGame.name}</p>
                        <h6 className="editing-sport">{selectedGame.sport}</h6>
                        <button
                            onClick={_ => setCurrentPage('selection')}
                            className="back-button"
                        >
                            Back
                        </button>
                    </div>

                    {/* Selection and Preview Header */}
                    <div className="layout-header">
                        <LayoutSelector />
                        <LayoutPreview stats={{yards: 0, passes: 0}}/>
                    </div>
                    
                    <div className="player-lists">
                        {/* Current Player Lists and Import button*/}
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

                        {/* Current active team rosters */}
                        <div className="active-rosters">
                            <Roster team="Home" roster={homeRoster} handleDrop={handleDrop} onEdit={handleEdit} />
                            <Roster team="Away" roster={awayRoster} handleDrop={handleDrop} onEdit={handleEdit} />
                        </div>
                    </div>

                    {editorType == 'basic' && (
                        <BasicEditor player={editingPlayer} onSave={handleSave} onClose={closeEditor}/>
                    )}

                    {editorType == 'stats' && (
                        <StatsEditor player={editingPlayer} onSave={handleSave} onClose={closeEditor} sport={selectedGame.sport}/>
                    )}
                    
                </>
            )}
            
        </BrowserRouter>
    )
}

export default App
