import React, { useState, useContext } from 'react'
import { LayoutContext } from '../../App'

import './LayoutPage.css'

const LayoutPage = _ => {

    const { selectedLayout } = useContext(LayoutContext)

    return (
        <div>
            <h1>Statistics Page</h1>
            {selectedLayout === 'layout1' && <p>Displaying Layout 1</p>}
            {selectedLayout === 'layout2' && <p>Displaying Layout 2</p>}
            {selectedLayout === 'layout3' && <p>Displaying Layout 3</p>}
            {!selectedLayout && <p>Select a layout</p>}
        </div>
    )
}

export default LayoutPage;