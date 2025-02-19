import React, { useState } from 'react'
import ImportList from '../ImportList/ImportList'
import './ImportModal.css'

const ImportModal = ({ onClose, onPlayersImported }) => {
    const [selectedTeam, setSelectedTeam] = useState('home')

    const handleTeamChange = e => {
        setSelectedTeam(e.target.value)
        console.log('Selected team', e.target.value)
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Import Team</h2>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="home"
                            checked={selectedTeam == 'home'}
                            onChange={handleTeamChange}
                        />
                        Home Team
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="away"
                            checked={selectedTeam == 'away'}
                            onChange={handleTeamChange}
                        />
                        Away Team
                    </label>
                </div>
                <ImportList team={selectedTeam} onPlayersImported={onPlayersImported} />
            </div>
        </div>
    )
}

export default ImportModal