import React, { useState, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LayoutContext } from '../../App'

import './LayoutSelector.css'

const LayoutSelector = _ => {

    const { setSelectedLayout } = useContext(LayoutContext)

    const handleButtonSelect = layoutId => {
        setSelectedLayout(layoutId)
        console.log(layoutId)
    }

    return (
        <div className="layout-selector-container">
            <button onClick={ _ => handleButtonSelect(1)}>Layout 1</button>
            <button onClick={ _ => handleButtonSelect(2)}>Layout 2</button>
        </div>
    )
}

export default LayoutSelector