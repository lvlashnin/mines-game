import { Cell } from "./Cell";
import { useBoard } from "../../hooks/useBoard";
import type { GameStateResponse } from "../../types";
import { GAME_STATUS } from "../../constants";
import { AnimatePresence } from "framer-motion";
import { LoadingOverlay } from "../ui/LoadingOverlay";

interface BoardProps {
  gameState?: GameStateResponse | null;
  isInteractive: boolean;
  isProcessing: boolean;
  onCellClick: (row: number, col: number) => void;
}

export const Board = ({
  gameState,
  isInteractive,
  isProcessing,
  onCellClick,
}: BoardProps) => {
  const { grid } = useBoard(gameState);
  const isStarting =
    isProcessing && (!gameState || gameState.status !== GAME_STATUS.ACTIVE);

  return (
    <div className="relative w-full max-w-135 mx-auto p-3 sm:p-6 rounded-2xl shadow-xl">
      <AnimatePresence>{isStarting && <LoadingOverlay />}</AnimatePresence>
      <div className="md:w-[420px] grid grid-cols-5 grid-rows-5 gap-2 sm:gap-3 w-full">
        {grid.map((row, rowIndex) =>
          row.map((cellState, colIndex) => (
            <Cell
              key={`cell-${rowIndex}-${colIndex}`}
              state={cellState}
              isInteractive={isInteractive}
              isProcessing={isProcessing}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          )),
        )}
      </div>
    </div>
  );
};
