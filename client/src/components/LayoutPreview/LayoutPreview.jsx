import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './LayoutPreview.css'

const LayoutPreview = _ => {
    return (
        <div className='layout-preview-container'>
            <Link to='/stats' className="stats-url" target="_blank">http://localhost:5173/stats</Link>
            <iframe className="embedded-preview" width="95%" height="95%" src="http://localhost:5173/stats" description="Layout preview" ></iframe>
            <Link to="/stats" className="stats-link" target="_blank"/>
        </div>
    )
}

export default LayoutPreview