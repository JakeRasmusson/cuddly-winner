import React, { useState, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LayoutContext } from '../../App'

import './LayoutSelector.css'

const LayoutSelector = _ => {

    const [player1, setPlayer1] = useState({})
    const [player2, setPlayer2] = useState({})

    const { setSelectedLayout } = useContext(LayoutContext)

    const handleButtonSelect = layoutId => {
        setSelectedLayout(layoutId)
        console.log(layoutId)
        localStorage.setItem('selectedLayout', layoutId)
    }

    const onDragOver = e => {
        e.preventDefault()

    }

    const onDrop = (e, player) => {
        e.preventDefault()

        const droppedPlayer = JSON.parse(e.dataTransfer.getData('player'))

        if(player == 1){
            setPlayer1(droppedPlayer)
        }
        if(player == 2){
            setPlayer2(droppedPlayer)
        }
    }

    return (
        <div className="layout-selector-container">
            <div className="quick-action-buttons">
                <h3>Quick Actions</h3>
                <button onClick={ _ => handleButtonSelect('homegeneral')}>Home Team Stats</button>
                <button onClick={ _ => handleButtonSelect('awaygeneral')}>Away Team Stats</button>
                <button onClick={ _ => handleButtonSelect('teamcomparison')}>Team Comparison</button>
            </div>
            <div className="player-categories">
                <h3>Player Statistics</h3>
                <button onClick={ _ => handleButtonSelect('runningback')}>Top Runningbacks</button>
                <button onClick={ _ => handleButtonSelect('quarterback')}>Top Quarterbacks</button>
                <button onClick={ _ => handleButtonSelect('widereceiver')}>Top Wide Receivers</button>
                <div className="drop-fields">
                    <div className="player-1-drop" onDrop={e => onDrop(e, 1)} onDragOver={onDragOver}>
                        <h3>{player1.name}</h3>
                    </div>
                    <div className="player-2-drop" onDrop={e => onDrop(e, 2)} onDragOver={onDragOver}>
                        <h3>{player2.name}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutSelector