
import { useState, useEffect, useRef, createContext } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

import PlayerList from './components/PlayerList/PlayerList'
import Roster from './components/Roster/Roster'
import GameSelection from './components/GameSelection/GameSelection'
import BasicEditor from './components/BasicEditor/BasicEditor'
import StatsEditor from './components/StatsEditor/StatsEditor'
import ImportModal from './components/ImportModal/ImportModal'
import LayoutSelector from './components/LayoutSelector/LayoutSelector'
import LayoutPreview from './components/LayoutPreview/LayoutPreview'
import LayoutPage from './components/LayoutPage/LayoutPage'
import NotFound from './components/NotFound/NotFound'

import './App.css'

export const LayoutContext = createContext()

const App = () => {
    const navigate = useNavigate()
    const { gameId } = useParams()//Idk why this is greyed out, it's used don't touch it

    const selectedGameRef = useRef(null)

    //Set players in each player list
    const [homePlayers, setHomePlayers] = useState([{name: "Gianarlos Fitzgerald-Schneider VIII", number: 69, position: 'RB/WR', id: 0}])
    const [awayPlayers, setAwayPlayers] = useState([])

    //Set players for active roster list
    const [homeRoster, setHomeRoster] = useState([])
    const [awayRoster, setAwayRoster] = useState([])

    //Are we displaying the game selection screen?
    const [selectedGame, setSelectedGame] = useState(null)
    const [games, setGames] = useState([])

    //Basic editor vs stats editor, and which player is being updated
    const [editorType, setEditorType] = useState(null)
    const [editingPlayer, setEditingPlayer] = useState(null)

    //Import team/create player modal
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [selectedLayout, setSelectedLayout] = useState('')

    useEffect(_ => {
        if(selectedGame) {
            selectedGameRef.current = selectedGame
            //console.log(selectedGame.id)
            navigate(`/edit/${selectedGame.id}`)
        }
    }, [selectedGame, navigate])

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

        console.log(updatedPlayer.team)
        
        const updateList = (list, setList) => setList(list.map(p => (p.id == updatedPlayer.id ? updatedPlayer : p)))

        //console.log("Updated player from " + updatedPlayer.team)

        if(updatedPlayer.team == 'home'){
            editorType == 'basic'
                ? updateList(homePlayers, setHomePlayers)
                : updateList(homeRoster, setHomeRoster)

            console.log(homeRoster)
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
        const newGame = { id: Date.now(), name: gameName, sport: sport }
        setGames([...games, newGame])
        setSelectedGame(newGame)
    }
    //If a user otherwise simply clicks an existing game, select that one
    const handleSelectGame = gameId => {
        const game = games.find(g => g.id == gameId)
        setSelectedGame(game)
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

    const handleRemoveList = (id, team) => {
        if(team == 'home'){
            const playerName = homePlayers.find(p => p.id == id).name
            if(window.confirm(`Are you sure you'd like to permanently remove ${playerName} from the home team?  `+
            `You'll need to recreate the player, all stats will be lost.\n\nThis action cannot be undone.`)){
                setHomePlayers(prev => prev.filter(p => p.id != id))
            }
        }
        if(team == 'away'){
            const playerName = awayPlayers.find(p => p.id == id).name
            if(window.confirm(`Are you sure you'd like to permanently remove ${playerName} from the visiting team?  `+
            `You'll need to recreate the player, all stats will be lost.\n\nThis action cannot be undone.`)){
                setAwayPlayers(prev => prev.filter(p => p.id != id))
            }
        }
    }

    const handleRemoveRoster = (player, team) => {
        if(team == 'Home'){
            if(window.confirm(`Bench ${player.name}?`)){
                setHomePlayers(prev => [...prev, player])
                setHomeRoster(prev => prev.filter(p => p.id != player.id))
            }
        }
        if(team == 'Away'){
            if(window.confirm(`Bench ${player.name}?`)){
                setAwayPlayers(prev => [...prev, player])
                setAwayRoster(prev => prev.filter(p => p.id != player.id))
            }
        }
    }

    const handleDragStart = (e, player, team) => {
        player = {...player, team: team}
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
        <LayoutContext.Provider value={{ selectedLayout, setSelectedLayout }}>
            <Routes>
                <Route path="/" element = {
                    <GameSelection
                        games={games}
                        onCreateGame={handleCreateGame}
                        onSelectGame={handleSelectGame}
                    />
                    
                } />
                <Route path="/edit/:gameId" element = {
                    <>
                        {/* Back button and 'Editing Page' title */}
                        <div className="page-info">
                            <p className="editing-title">{selectedGameRef.current?.name || "Jake you suck"}</p>
                            <h6 className="editing-sport">{selectedGameRef.current?.sport || "Jake you suck"}</h6>
                            <button
                                onClick={_ => {
                                        navigate("/")
                                        setSelectedGame(null)
                                    }
                                }
                                className="back-button"
                            >
                                Back
                            </button>
                        </div>

                        {/* Selection and Preview Header */}
                        <div className="layout-header">
                            <LayoutSelector gameType={selectedGameRef.current?.sport || ""}/>
                            <LayoutPreview />
                        </div>
                        <div className="player-lists">
                            {/* Current Player Lists and Import button*/}
                            <div className="player-list-wrapper">
                                <PlayerList players={homePlayers} handleDragStart={handleDragStart} handleUpdate={handleUpdate} onRemove={handleRemoveList} onEdit={handleEdit} title="Home" team="home"/>
                                <PlayerList players={awayPlayers} handleDragStart={handleDragStart} handleUpdate={handleUpdate} onRemove={handleRemoveList} onEdit={handleEdit} title="Away" team="away"/>

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
                                <Roster team="Home" roster={homeRoster} handleDrop={handleDrop} onEdit={handleEdit} onRemove={handleRemoveRoster} handleDragStart={handleDragStart} />
                                <Roster team="Away" roster={awayRoster} handleDrop={handleDrop} onEdit={handleEdit} onRemove={handleRemoveRoster} handleDragSTart={handleDragStart} />
                            </div>
                        </div>

                        {editorType == 'basic' && (
                            <BasicEditor player={editingPlayer} onSave={handleSave} onClose={closeEditor}/>
                        )}

                        {editorType == 'stats' && (
                            <StatsEditor player={editingPlayer} onSave={handleSave} onClose={closeEditor} sport={selectedGame.sport}/>
                        )}
                        
                    </>
                } />
                <Route path="/stats" element = {<LayoutPage />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </LayoutContext.Provider>
    )
}

export default App
