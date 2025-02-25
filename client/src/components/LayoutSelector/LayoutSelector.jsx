import React, { useState, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LayoutContext } from '../../App'

import './LayoutSelector.css'

const LayoutSelector = ({ gameType }) => {

    const positions = {
        baseball: 'CF LF RF SS 3B 2B 1B C P',
        softball: 'CF LF RF SS 3B 2B 1B C P',
        basketball: 'PG SG SF PF C',
        football: 'QB RB WR TE',
        soccer: 'GK F CB RF LF CM RM LM'
    }

    const [player1, setPlayer1] = useState(null)
    const [player2, setPlayer2] = useState(null)

    const getPosition = type => {
        return positions[type.toLowerCase()]?.split(' ') || []
    }

    const { setSelectedLayout } = useContext(LayoutContext)

    const handlePositionSelect = e => {
        setSelectedLayout(e.target.value)
        localStorage.setItem('selectedLayout', e.target.value)
    }

    const handleButtonSelect = layoutId => {
        setSelectedLayout(layoutId)
        localStorage.setItem('selectedLayout', layoutId)
    }

    const onDragOver = e => {
        e.preventDefault()
    }

    const onRemove = player => {
        if(player == 1){
            setPlayer1(null)
        }
        if(player == 2){
            setPlayer2(null)
        }
    }

    const onDrop = (e, player) => {
        e.preventDefault()
    
        const droppedPlayer = JSON.parse(e.dataTransfer.getData('player'))

        console.log(droppedPlayer)
    
        const updatedPlayer1 = player === 1 ? droppedPlayer : player1
        const updatedPlayer2 = player === 2 ? droppedPlayer : player2
    
        if (player === 1) setPlayer1(droppedPlayer)
        if (player === 2) setPlayer2(droppedPlayer)
    
        if ((updatedPlayer1 || updatedPlayer2) && !(updatedPlayer1 && updatedPlayer2)) {
            localStorage.setItem('selectedLayout', 'singleplayer')
        }
    
        if (updatedPlayer1 && updatedPlayer2) {
            localStorage.setItem('selectedLayout', 'playercompare')
        }
    }

    return (
        <div className="layout-selector-container">
            <div className="quick-action-buttons">
                <h3>Quick Actions</h3>
                <button onClick={ _ => handleButtonSelect('homegeneral')}>Home Team Stats</button>
                <button onClick={ _ => handleButtonSelect('awaygeneral')}>Away Team Stats</button>
                <button onClick={ _ => handleButtonSelect('teamcomparison')}>Team Comparison</button>
                <select
                    onChange = {handlePositionSelect}
                    defaultValue = ''
                    className="position-select"
                >
                    <option value="" disabled hidden>Select a Position</option>
                    {
                        getPosition(gameType).map(position => 
                            <option key={position} value={position}>{position}</option>
                        )
                    }
                </select>
            </div>
            <div className="player-categories">
                <h3>Compare by Player</h3>
                <div className="drop-fields">
                    <div className="player-1-drop" onDrop={e => onDrop(e, 1)} onDragOver={onDragOver}>
                        {player1 && (
                            <div className="player-compare-card">
                                <h3>{player1.name}</h3>
                                <i 
                                    className="fa-solid fa-user-minus remove-player-icon"
                                    onClick={e => {
                                        onRemove(1)
                                    }}
                                ></i>
                            </div>
                        )}
                        {!player1 && (
                            <p className="not-selected-text">No Player Selected</p>
                        )}
                        
                    </div>
                    <div className="player-2-drop" onDrop={e => onDrop(e, 2)} onDragOver={onDragOver}>
                    {player2 && (
                            <div className="player-compare-card">
                                <h3>{player2.name}</h3>
                                <i 
                                    className="fa-solid fa-user-minus remove-player-icon"
                                    onClick={e => {
                                        onRemove(2)
                                    }}
                                ></i>
                            </div>
                        )}
                        {!player2 && (
                            <p className="not-selected-text">No Player Selected</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutSelector