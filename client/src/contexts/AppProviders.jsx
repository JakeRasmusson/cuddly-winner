import { EditingGameProvider } from "./editingGameContext";
import { GameListProvider } from "./gameListContext";

const AppProviders = ({ children }) => {
  return (
    <GameListProvider>
      <EditingGameProvider>{children}</EditingGameProvider>
    </GameListProvider>
  );
};

export default AppProviders;
