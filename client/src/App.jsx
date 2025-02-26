
import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

//Contexts

//Components
import NotFound from './components/NotFound/NotFound'

//Pages
import Home from './pages/Home/Home'
import Editor from './pages/Editor/Editor'

import './App.css'

const App = () => {

    const gameList = []

    return (
        <>
            <Routes>
                { /* Landing page (create game, select game) */ }
                <Route path='/' element={ <Home gameList={gameList} /> } />

                { /* Editing selected game */ }
                <Route path='/edit' element={ <Editor />} />

                { /* 404 Page (Dale :D) */ }
                <Route path='*' element={ <NotFound /> } />
            </Routes>
        </>
    )
}

export default App
