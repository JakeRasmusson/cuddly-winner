import React, { useState, useContext, useEffect } from 'react'
import { LayoutContext } from '../../App'

import './LayoutPage.css'

const LayoutPage = _ => {

    //const { selectedLayout } = useContext(LayoutContext)

    const [selectedLayout, setSelectedLayout] = useState(localStorage.getItem('selectedLayout') || null)

    useEffect(_ => {
        const handleStorageChange = event => {
            if(event.key == 'selectedLayout'){
                setSelectedLayout(event.newValue)
            }
        }

        window.addEventListener('storage', handleStorageChange)

        return _ => window.removeEventListener('storage', handleStorageChange)
    }, [])

    return (
        <div>
            <h1>Statistics Page</h1>
            <p>Displaying {selectedLayout}</p>
        </div>
    )
}

export default LayoutPage;