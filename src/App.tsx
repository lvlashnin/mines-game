import { useGameEngine } from "./hooks/useGameEngine";
import { useBalanceQuery, useHistoryQuery } from "./api/queries";
import { useGameStore } from "./store/useGameStore";
import { Board } from "./components/game/Board";
import { ControlPanel } from "./components/game/ControlPanel";
import { useShallow } from "zustand/shallow";
import { GameHistory } from "./components/game/GameHistory";

function App() {
  const { gameState, flags, metrics, actions } = useGameEngine();

  const { data: balanceData, isLoading: isBalanceLoading } = useBalanceQuery();
  const { data: historyData, isLoading: isHistoryLoading } = useHistoryQuery();

  const { betAmount, setBetAmount, minesCount, setMinesCount } = useGameStore(
    useShallow((state) => ({
      betAmount: state.betAmount,
      setBetAmount: state.setBetAmount,
      minesCount: state.minesCount,
      setMinesCount: state.setMinesCount,
    })),
  );

  return (
    <div className="min-h-screen w-full bg-game-bg p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start justify-center">
        <ControlPanel
          flags={flags}
          metrics={metrics}
          gameState={gameState}
          balance={balanceData?.balance || 0}
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          minesCount={minesCount}
          setMinesCount={setMinesCount}
          onStart={actions.handleStartGame}
          onCashOut={actions.handleCashOut}
        />
        <div className="flex-1 w-full flex justify-center items-center">
          <Board
            gameState={gameState}
            isInteractive={flags.isActive}
            isProcessing={flags.isProcessing}
            onCellClick={actions.handleReveal}
          />
        </div>
        <GameHistory history={historyData} isLoading={isHistoryLoading} />
      </div>
    </div>
  );
}

export default App;
