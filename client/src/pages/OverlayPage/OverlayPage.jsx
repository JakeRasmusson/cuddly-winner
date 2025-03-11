import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useOverlay } from '../../contexts/OverlayContext'

const OverlayPage = _ => {

    const [selectedOverlay, setSelectedOverlay] = useState(localStorage.getItem('selectedOverlay') || null)

    useEffect(_ => {
        const handleStorageChange = e => {
            setSelectedOverlay(e.newValue)
        }

        window.addEventListener('storage', handleStorageChange)
        return _ => window.removeEventListener('storage', handleStorageChange)
    }, [])

    return (
        <>
            <div className='absolute left-0 top-0 w-screen h-screen'>
                {
                    selectedOverlay ? (
                        <h1 className="text-5xl">{selectedOverlay}</h1>
                    ) : (
                        <img src='/easdlogo.png' />
                    )
                }
            </div>
            
        </>
    )
}

export default OverlayPage