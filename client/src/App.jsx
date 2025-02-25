
import { useState, useEffect, useRef, createContext } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

import NotFound from './components/NotFound/NotFound'
import Home from './components/Home/Home'

import './App.css'



const App = () => {
    return (
        <>
            <Routes>
                { /* Landing page (create game, select game) */ }
                <Route path='/' element={ <Home /> } />


                { /* 404 Page (Dale :D) */ }
                <Route path='*' element={ <NotFound /> } />
            </Routes>
        </>
    )
}

export default App
