import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

//Contexts
import AppProviders from "./contexts/AppProviders";

//Components
import NotFound from "./components/NotFound/NotFound";

//Pages
import Home from "./pages/Home/Home";
import Editor from "./pages/Editor/Editor";

import "./App.css";

const App = () => {
  return (
    <>
      <AppProviders>
        <Routes>
          {/* Landing page (create game, select game) */}
          <Route path="/" element={<Home />} />

          {/* Editing selected game */}
          <Route path="/edit/:gameId" element={<Editor />} />

          {/* 404 Page (Dale :D) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProviders>
    </>
  );
};

export default App;
