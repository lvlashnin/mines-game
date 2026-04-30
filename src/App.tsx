import { useGameEngine } from "./hooks/useGameEngine";
import { useBalanceQuery } from "./api/queries";
import { useGameStore } from "./store/useGameStore";
import { Board } from "./components/Board";

function App() {
  const { gameState, flags, metrics, actions } = useGameEngine();
  const { data: balanceData, isLoading: isBalanceLoading } = useBalanceQuery();

  const setBetAmount = useGameStore((state) => state.setBetAmount);

  return (
    <div className="min-h-screen w-full p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-80 p-6 bg-game-panel rounded-2xl border border-game-border shadow-xl font-mono text-sm shrink-0">
          <h2 className="text-game-gold mb-4 text-lg font-bold">System Info</h2>
          <div className="space-y-2 mb-6">
            <p>
              Balance:{" "}
              <span className="text-white">
                {isBalanceLoading ? "..." : balanceData?.balance}
              </span>
            </p>
            <p>
              Status:{" "}
              <span className="text-white">
                {flags.isIdle ? "IDLE" : gameState?.status}
              </span>
            </p>
            <p>
              Profit:{" "}
              <span className="text-game-gem">
                +{metrics.potentialProfit.toFixed(2)}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              className="bg-blue-600 px-4 py-3 rounded-lg text-white font-bold disabled:opacity-50"
              onClick={() => setBetAmount(100)}
              disabled={!flags.isIdle}
            >
              Set Bet 100
            </button>
            <button
              className="bg-game-button hover:bg-game-button-hover transition-colors px-4 py-3 rounded-lg text-white font-bold disabled:opacity-50"
              onClick={actions.handleStartGame}
              disabled={!flags.isIdle || flags.isProcessing}
            >
              START GAME
            </button>
            <button
              className="bg-game-gold hover:bg-yellow-500 transition-colors text-black px-4 py-3 rounded-lg font-bold disabled:opacity-50"
              onClick={actions.handleCashOut}
              disabled={
                !flags.isActive ||
                flags.isProcessing ||
                gameState?.gemsFound === 0
              }
            >
              CASH OUT
            </button>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center items-center md:w-80">
          <Board
            gameState={gameState}
            isInteractive={flags.isActive}
            isProcessing={flags.isProcessing}
            onCellClick={actions.handleReveal}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
