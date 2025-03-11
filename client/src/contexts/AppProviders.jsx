import { EditingGameProvider } from "./editingGameContext"
import { GameListProvider } from "./gameListContext"
import { HomePlayersProvider } from "./homePlayersContext"
import { AwayPlayersProvider } from "./awayPlayersContext"
import { OverlayProvider } from "./OverlayContext"

const AppProviders = ({ children }) => {
    return (
        <GameListProvider>
            <EditingGameProvider>
                <HomePlayersProvider>
                    <AwayPlayersProvider>
                        <OverlayProvider>
                            {children}
                        </OverlayProvider>
                    </AwayPlayersProvider>
                </HomePlayersProvider>
            </EditingGameProvider>
        </GameListProvider>
    )
}

export default AppProviders;
