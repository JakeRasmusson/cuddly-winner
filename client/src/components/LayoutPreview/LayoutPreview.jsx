import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './LayoutPreview.css'

const LayoutPreview = ({ stats }) => {
    return (
        <div className='layout-preview-container'>
            <iframe className="embedded-preview" width="100%" height="100%" src="http://localhost:5173/stats" description="Layout preview" ></iframe>
            <Link to="/stats" className="stats-link" target="_blank"/>
        </div>
    )
}

export default LayoutPreview