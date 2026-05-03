import { AnimatePresence } from "framer-motion";
import {
  useActiveGameQuery,
  useBalanceQuery,
  useHistoryQuery,
} from "./api/queries";
import { Board } from "./components/game/Board";
import { ControlPanel } from "./components/game/ControlPanel";
import { GameHistory } from "./components/game/GameHistory";
import { InitialLoader } from "./components/ui/InitialLoader";

function App() {
  const { data: historyData, isLoading: isHistoryLoading } = useHistoryQuery();
  const { isLoading: isBalanceLoading } = useBalanceQuery();
  const { isLoading: isGameLoading } = useActiveGameQuery();
  const isAppLoading = isHistoryLoading || isBalanceLoading || isGameLoading;

  return (
    <>
      <AnimatePresence>
        {isAppLoading && <InitialLoader key="initial-loader" />}
      </AnimatePresence>

      <div className="min-h-screen w-full bg-game-bg p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-8 xl:gap-16 items-center lg:items-start justify-center">
          <div className="w-full lg:flex-1 order-2 lg:order-1">
            <ControlPanel />
          </div>

          <div className="flex-2 w-full flex justify-center items-center order-3 lg:order-2">
            <Board />
          </div>

          <div className="w-full lg:flex-1 order-1 lg:order-3">
            <GameHistory history={historyData} isLoading={isHistoryLoading} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
