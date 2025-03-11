import React, { createContext, useContext, useState } from 'react'

const OverlayContext = createContext()

export const OverlayProvider = ({ children }) => {

    const [overlayID, setOverlayID] = useState('')

    return (
        <OverlayContext.Provider value={{ overlayID, setOverlayID }}>
            {children}
        </OverlayContext.Provider>
    )
}

export const useOverlay = _ => useContext(OverlayContext)