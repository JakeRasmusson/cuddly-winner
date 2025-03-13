import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useOverlay } from '../../contexts/OverlayContext'

const OverlayPreview = _ => {

    const { overlayID, setOverlayID } = useOverlay()

    useEffect(_ => {
        localStorage.setItem('selectedOverlay', overlayID)
    }, [overlayID])

    const desiredWidth = 430
    const assumedAspectRatio = 16 / 9
    const assumedHeight = desiredWidth / assumedAspectRatio

    const widthScale = desiredWidth / window.screen.width
    const heightScale = assumedHeight / window.screen.height
    const scale = Math.min(widthScale, heightScale)

    return (
        <>
            <div className="relative h-[300px] w-1/2 rounded-3xl flex flex-col items-center">
                <h1 className="mb-4 self-center border-b-1 w-[90%] text-2xl font-extralight tracking-[8px] text-yellow-300">
                    Overlay Preview
                </h1>
                <iframe 
                    className={`absolute bottom-[50%] translate-y-[50%] w-screen h-screen origin-center shadow-[0_0_30px_rgb(250,204,21)]`}
                    style={{
                        transform: `scale(${scale})`
                    }}
                    src={`http://localhost:5173/stats`}
                    description="Layout preview" >
                </iframe>
                <Link 
                    to="/stats" 
                    className="text-white/0 hover:text-yellow-300 tracking-widest font-light hover:bg-white/10 absolute bottom-[50%] translate-y-[50%] w-screen h-screen origin-center text-[80px] flex items-end justify-center transition-all duration-300"
                    style={{ transform: `scale(${scale})` }} 
                    target="_blank"
                >
                        http://localhost:5173/stats
                </Link>

                
            </div>
        </>
    )
}

export default OverlayPreview
