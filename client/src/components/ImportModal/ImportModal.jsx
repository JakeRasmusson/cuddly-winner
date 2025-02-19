import React, { useState } from 'react'
import ImportList from '../ImportList/ImportList'
import Player from '../Player/Player'
import './ImportModal.css'

const ImportModal = ({ onClose, onPlayersImported, onAddPlayer }) => {
    const [selectedTeam, setSelectedTeam] = useState('home')
    const [playerData, setPlayerData] = useState({
        name: '',
        number: '',
        position: ''
    })

    const handleTeamChange = e => {
        setSelectedTeam(e.target.value)
        console.log('Selected team', e.target.value)
    }

    const handleChange = e => {
        const { name, value } = e.target
        setPlayerData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        onAddPlayer(playerData, selectedTeam)
        setPlayerData({ name: '', position: '', number: ''})
    }

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Player Lists</h2>

                {/* Main Content */}
                <div className="modal-body">
                    {/* Left Side: Import Button */}
                    <div className="left-section">
                        <ImportList
                            team={selectedTeam}
                            onPlayersImported={onPlayersImported}
                        />
                    </div>

                    {/* Right Side: Add Player Form */}
                    <div className="right-section">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={playerData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Number:</label>
                                <input
                                    type="number"
                                    name="number"
                                    value={playerData.number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Position:</label>
                                <input
                                    type="text"
                                    name="position"
                                    value={playerData.position}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit">Add Player</button>
                        </form>
                    </div>
                </div>

                {/* Bottom: Team Toggle Buttons */}
                <div className="team-toggle">
                    <label>
                        <input
                            type="radio"
                            value="home"
                            checked={selectedTeam === 'home'}
                            onChange={handleTeamChange}
                        />
                        Home Team
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="away"
                            checked={selectedTeam === 'away'}
                            onChange={handleTeamChange}
                        />
                        Away Team
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ImportModal