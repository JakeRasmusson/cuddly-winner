import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const OverlayPreview = _ => {

    const desiredWidth = 400
    const assumedAspectRatio = 16 / 9
    const assumedHeight = desiredWidth / assumedAspectRatio

    const widthScale = desiredWidth / 1920
    const heightScale = assumedHeight / 1080
    const scale = Math.min(widthScale, heightScale)

    return (
        <>
            <div className="h-[300px] w-1/2 rounded-3xl border-2 border-white flex flex-col items-center">
                <Link to='/stats' className="" target="_blank">http://localhost:5173/stats</Link>
                <iframe className={`border-1 w-[1920px] h-[1080px] origin-center`}
                style={{
                    transform: `scale(${scale})`
                }} src="http://localhost:5173/stats" description="Layout preview" ></iframe>
                <Link to="/stats" className="" target="_blank"/>
            </div>
        </>
    )
}

export default OverlayPreview
