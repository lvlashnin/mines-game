import { useMemo } from "react";
import type { GameStateResponse, UICellState } from "../types";
import { GAME_CONFIG, UI_CELL_STATE } from "../constants/game";

export const useBoard = (gameState?: GameStateResponse | null) => {
  const grid = useMemo(() => {
    const newGrid: UICellState[][] = Array.from(
      { length: GAME_CONFIG.GRID_ROWS },
      () => Array(GAME_CONFIG.GRID_COLS).fill(UI_CELL_STATE.HIDDEN),
    );

    if (gameState?.revealedCells) {
      gameState.revealedCells.forEach((cell) => {
        const uiState: UICellState =
          cell.type === "gem" ? UI_CELL_STATE.GEM : UI_CELL_STATE.MINE_HIT;

        newGrid[cell.row][cell.col] = uiState;
      });
    }

    return newGrid;
  }, [gameState]);

  return { grid };
};
