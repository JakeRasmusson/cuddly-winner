import React, { useState, useContext, useEffect } from 'react'
import { LayoutContext } from '../../App'

import './LayoutPage.css'

const LayoutPage = _ => {

    //const { selectedLayout } = useContext(LayoutContext)

    const [selectedLayout, setSelectedLayout] = useState(localStorage.getItem('selectedLayout') || null)
    const [player1, setPlayer1] = useState(localStorage.getItem('player1'))
    const [player2, setPlayer2] = useState(localStorage.getItem('player2'))

    useEffect(_ => {
        const handleStorageChange = event => {
            if(event.key == 'selectedLayout'){
                setSelectedLayout(event.newValue)
            }
            if(event.key == 'player1'){
                setPlayer1(event.newValue)
            }
            if(event.key == 'player2'){
                setPlayer2(event.newValue)
            }
        }

        window.addEventListener('storage', handleStorageChange)

        return _ => window.removeEventListener('storage', handleStorageChange)
    }, [])

    return (
        <div>
            {selectedLayout == 'singleplayer' && (
                <div className="singleplayer-layout">
                    <h1 className="player-name">{JSON.parse(player1).name}</h1>
                    <div className="singleplayer-header">
                        #{JSON.parse(player1).number}
                        {JSON.parse(player1).position}
                    </div>
                    <div className="singleplayer-stats-card">
                        {Object.keys(JSON.parse(player1)).map(stat => {
                            return (!['name', 'number', 'position', 'id', 'team'].includes(stat)) && (
                                <div className="singleplayer-stats-list">
                                    <h3>{stat}</h3>
                                    <p>{JSON.parse(player1)[stat]}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default LayoutPage;