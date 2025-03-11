import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useOverlay } from '../../contexts/OverlayContext'

const OverlayPreview = _ => {

    const { overlayID, setOverlayID } = useOverlay()

    useEffect(_ => {
        localStorage.setItem('selectedOverlay', overlayID)
    }, [overlayID])

    const desiredWidth = 400
    const assumedAspectRatio = 16 / 9
    const assumedHeight = desiredWidth / assumedAspectRatio

    const widthScale = desiredWidth / window.screen.width
    const heightScale = assumedHeight / window.screen.height
    const scale = Math.min(widthScale, heightScale)

    return (
        <>
            <div className="relative h-[300px] w-1/2 rounded-3xl border-2 border-white flex flex-col items-center">
                <Link to='/stats' className="" target="_blank">{`http://localhost:5173/stats`}</Link>
                <iframe className={`absolute bottom-[50%] translate-y-[50%] w-screen h-screen origin-center`} style={{
                    transform: `scale(${scale})`
                }} src={`http://localhost:5173/stats`} description="Layout preview" ></iframe>
                <Link to="/stats" className="" target="_blank"/>
            </div>
        </>
    )
}

export default OverlayPreview
