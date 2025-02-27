import React, { useState, useRef } from "react";

import { useGameList } from "../../contexts/gameListContext";
import { useEditingGame } from "../../contexts/editingGameContext";

import ImportModal from "../ImportModal/ImportModal";

const CreateGame = () => {

  //Define home, away, and sport for a new game
  const [homeTeam, setHomeTeam] = useState("");
  const [visitingTeam, setVisitingTeam] = useState("");
  const [sport, setSport] = useState("");

  //Show the import modal
  const [showImportModal, setShowImportModal] = useState(false);

  //Use context for accessing the game list and whatever game is currently being edited
  const { addGame } = useGameList();
  const { setEditingGame } = useEditingGame();

  //Upon creation of a new game
  const handleCreateGame = (homeTeam, visitingTeam, sport) => {
    const newGame = {
      id: Date.now(),
      home: homeTeam,
      away: visitingTeam,
      sport: sport,
    };

    setEditingGame(newGame.id); //Automatically switch the current editing game to the newly created one
    addGame(newGame); //Add the new game to the current list of available games
  }

  return (
    <>
      <div className="flex w-1/2 flex-col p-2">
        <h1 className="border-b-1 text-[30px] font-extralight tracking-[12px] text-yellow-300">
          Create a Game
        </h1>
        <div className="grid grid-cols-2 content-center gap-y-5 pt-8">
          <label className="text-lg font-extralight tracking-wider text-yellow-50">
            Home Team
          </label>
          <input
            type="text"
            id="home"
            className="text-md w-50 rounded-md border border-yellow-200 bg-black p-1 text-center outline-none focus:shadow-[0_0_10px_rgb(250,204,21)]"
            placeholder="Home Team"
            required
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
          />

          <label className="text-lg font-extralight tracking-wider text-yellow-50">
            Visiting Team
          </label>
          <input
            type="text"
            id="home"
            className="text-md w-50 rounded-md border border-yellow-200 bg-black p-1 text-center outline-none focus:shadow-[0_0_10px_rgb(250,204,21)]"
            placeholder="Visiting Team"
            required
            value={visitingTeam}
            onChange={(e) => setVisitingTeam(e.target.value)}
          />

          <label className="text-lg font-extralight tracking-wider text-yellow-50">
            Sport
          </label>
          <select
            id="sport"
            className="text-md block w-50 appearance-none border-0 border-b-2 border-yellow-200 bg-transparent text-yellow-200 outline-none"
            style={{ textAlignLast: "center" }}
            onChange={(e) => setSport(e.target.value)}
            value={sport}
          >
            <option value="" disabled hidden>
              Select a Sport
            </option>
            <option value="basketball">Basketball</option>
            <option value="baseball">Baseball</option>
            <option value="softball">Softball</option>
            <option value="football">Football</option>
            <option value="soccer">Soccer</option>
          </select>
        </div>

        <button
          className="mx-auto my-8 w-50 rounded-md border border-yellow-200 bg-black py-2 font-bold tracking-widest text-yellow-50 shadow hover:cursor-pointer hover:bg-neutral-800 hover:shadow-[0_0_10px_rgb(250,204,21)]"
          onClick={(_) => setShowImportModal(true)}
        >
          Import Players
        </button>

        <button
          className="mx-auto w-50 rounded-md border border-yellow-200 bg-black py-2 font-bold tracking-widest text-yellow-50 shadow hover:cursor-pointer hover:bg-neutral-800 hover:shadow-[0_0_10px_rgb(250,204,21)]"
          onClick={(_) => {
            if (homeTeam.trim() && visitingTeam.trim()) {
              handleCreateGame(homeTeam, visitingTeam, sport);
              setHomeTeam("");
              setVisitingTeam("");
              setSport("");
            }
          }}
        >
          Create Game
        </button>

        {showImportModal ? <ImportModal onClose={_ => setShowImportModal(false)} /> : <div>Not Showing</div>}
      </div>
    </>
  );
};

export default CreateGame;
