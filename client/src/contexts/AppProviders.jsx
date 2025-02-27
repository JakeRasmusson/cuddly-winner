import { EditingGameProvider } from "./editingGameContext";
import { GameListProvider } from "./gameListContext";
import { HomePlayersProvider } from "./homePlayersContext";
import { AwayPlayersProvider } from "./awayPlayersContext";

const AppProviders = ({ children }) => {
  return (
    <GameListProvider>
      <EditingGameProvider>
        <HomePlayersProvider>
          <AwayPlayersProvider>
            {children}
          </AwayPlayersProvider>
        </HomePlayersProvider>
      </EditingGameProvider>
    </GameListProvider>
  );
};

export default AppProviders;
