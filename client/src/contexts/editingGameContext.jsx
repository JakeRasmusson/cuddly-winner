import React, { createContext, useContext, useState } from "react";

const EditingGameContext = createContext();

export const EditingGameProvider = ({ children }) => {
  const [editingGame, setEditingGame] = useState("");

  return (
    <EditingGameContext.Provider value={{ editingGame, setEditingGame }}>
      {children}
    </EditingGameContext.Provider>
  );
};

export const useEditingGame = (_) => useContext(EditingGameContext);
