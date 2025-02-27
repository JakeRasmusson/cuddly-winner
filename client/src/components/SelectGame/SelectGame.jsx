import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGameList } from "../../contexts/gameListContext";
import { useEditingGame } from "../../contexts/editingGameContext";

const SelectGame = () => {
  const navigate = useNavigate();
  const { gameId } = useParams; //This is used, don't touch it.  idk why it's greyed out

  //Allow access to the game list and the currently editing game
  const { gameList } = useGameList();
  const { editingGame, setEditingGame } = useEditingGame();

  //If `editingGame` gets a change, navigate to that page
  useEffect(
    (_) => {
      if (editingGame) {
        navigate(`/edit/${editingGame.id}`);
      }
    },
    [editingGame, navigate],
  );

  //Beautify the game ID to display it as a date
  const parseDate = (dateObj) => {
    const month = dateObj.getUTCMonth();
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const monthString =
      "January February March April May June July August September October November December".split(
        " ",
      );
    return `${day} ${monthString[month]}, ${year}`;
  };

  //Upon selecting a game, find whatever one was clicked and set that to be the current editing one
  const handleSetEditGame = (gameId) => {
    const game = gameList.find((g) => g.id == gameId);
    setEditingGame(game.id);
  };

  return (
    <>
      <div className="flex w-1/2 flex-col p-2">
        <h1 className="border-b-1 text-[30px] font-extralight tracking-[12px] text-yellow-300">
          Select a Game
        </h1>

        {gameList.length ? (
          <div className="flex max-h-[400px] min-h-0 flex-col items-center overflow-auto">
            {gameList.map((element) => (
              <div
                key={element.id}
                className="relative mt-4 flex h-[100px] w-[85%] flex-none cursor-pointer justify-center rounded-md bg-white/5 hover:bg-white/10"
                onClick={(_) => {
                  handleSetEditGame(element.id);
                }}
              >
                <p className="text-md absolute top-1 left-2 font-extralight text-yellow-100">
                  {parseDate(new Date(element.id))}
                </p>
                <p className="text-md absolute top-1 right-2 font-extralight text-yellow-100">
                  {element.sport.toUpperCase()}
                </p>

                <h2 className="absolute bottom-2 text-2xl tracking-wide text-yellow-200">
                  {element.team1.town} VS {element.team2.town}
                </h2>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h3 className="pt-6 text-3xl font-light tracking-widest text-yellow-200 italic">
              No Games Available
            </h3>
            <h3 className="pt-3 text-lg font-extralight tracking-tighter text-yellow-200 italic">
              Create a Game to Get Started
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectGame;
