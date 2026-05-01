import { Cell } from "./Cell";
import { useBoard } from "../../hooks/useBoard";
import type { GameStateResponse } from "../../types";

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

  return (
    <div className="w-full max-w-125 mx-auto p-3 sm:p-6 rounded-2xl shadow-xl">
      <div className="md:w-[320px] grid grid-cols-5 grid-rows-5 gap-2 sm:gap-3 w-full">
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
