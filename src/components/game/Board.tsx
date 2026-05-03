import { Cell } from "../ui/Cell";
import { useBoard } from "../../hooks/useBoard";
import { useGameEngine } from "../../hooks/useGameEngine";
import { GAME_STATUS } from "../../constants/game";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingOverlay } from "../ui/LoadingOverlay";
import { GameEndOverlay } from "../ui/GameEndOverlay";

export const Board = () => {
  const { gameState, flags, actions, metrics } = useGameEngine();
  const { grid } = useBoard(gameState);

  const { isActive, isProcessing, isGameOver } = flags;

  const { potentialProfit, currentWinAmount, currentMultiplier } = metrics;

  const isStarting =
    isProcessing && (!gameState || gameState.status !== GAME_STATUS.ACTIVE);

  console.log("isStarting flag:", isStarting);

  return (
    <div className="relative w-full max-w-135 mx-auto p-3 sm:p-6 rounded-2xl shadow-xl">
      <AnimatePresence>
        {isStarting && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50"
          >
            <LoadingOverlay />
          </motion.div>
        )}

        {isGameOver && gameState && (
          <GameEndOverlay
            key="game-end"
            status={gameState.status as "won" | "lost"}
            multiplier={
              gameState.status === GAME_STATUS.WON
                ? currentMultiplier
                : undefined
            }
            winAmount={
              gameState.status === GAME_STATUS.WON
                ? currentWinAmount
                : undefined
            }
            profit={
              gameState.status === GAME_STATUS.WON ? potentialProfit : undefined
            }
            betAmount={gameState.betAmount}
            onRestart={actions.handleReset}
          />
        )}
      </AnimatePresence>

      <div className="md:w-[420px] grid grid-cols-5 grid-rows-5 gap-2 sm:gap-3 w-full">
        {grid.map((row, rowIndex) =>
          row.map((cellState, colIndex) => (
            <Cell
              key={`cell-${rowIndex}-${colIndex}`}
              state={cellState}
              isInteractive={isActive}
              isProcessing={isProcessing}
              onClick={() => actions.handleReveal(rowIndex, colIndex)}
            />
          )),
        )}
      </div>
    </div>
  );
};
