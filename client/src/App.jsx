import { useState, useEffect, useRef } from "react"
import { Routes, Route, useNavigate, useParams } from "react-router-dom"

//Contexts
import AppProviders from "./contexts/AppProviders"

//Components
import NotFound from "./components/NotFound/NotFound"

//Pages
import Home from "./pages/Home/Home"
import Editor from "./pages/Editor/Editor"
import OverlayPage from './pages/OverlayPage/OverlayPage'

import "./App.css"

const App = _ => {

    //'parameter' of the URL for each game ID
    const { gameId } = useParams() //This is used, don't touch it.  idk why it's greyed out

    return (
        <AppProviders>
            <Routes>
                {/* Displayed stats */}
                <Route path="/stats" element={ <OverlayPage /> }/>

                {/* Landing page (create game, select game) */}
                <Route path="/" element={ <Home /> }/>

                {/* Editing selected game */}
                <Route path="/edit/:gameId" element={ <Editor /> } />

                {/* 404 Page (Dale :D) */}
                <Route path="*" element={ <NotFound /> } />

                {/* 404 Page but on undefined game */}
                <Route path="/edit/undefined" element={ <NotFound /> } />
            </Routes>
        </AppProviders>
    )
}

export default App
