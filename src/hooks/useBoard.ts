import { useEffect, useMemo } from "react";
import type { UICellState } from "../types";
import { GAME_CONFIG, GAME_STATUS, UI_CELL_STATE } from "../constants/game";
import { useGameEngine } from "./useGameEngine";
import { useGameSounds } from "./useGameSounds";

export const useBoard = () => {
  const { gameState, flags, actions, metrics } = useGameEngine();
  const { playWin, playLose, playClick } = useGameSounds();

  const { isProcessing, isGameOver } = flags;

  useEffect(() => {
    if (isGameOver && gameState) {
      if (gameState.status === GAME_STATUS.WON) {
        playWin();
      } else if (gameState.status === GAME_STATUS.LOST) {
        playLose();
      }
    }
  }, [isGameOver, gameState?.status, playWin, playLose]);

  const isStarting =
    isProcessing && (!gameState || gameState.status !== GAME_STATUS.ACTIVE);

  const grid = useMemo(() => {
    const newGrid: UICellState[][] = Array.from(
      { length: GAME_CONFIG.GRID_ROWS },
      () => Array(GAME_CONFIG.GRID_COLS).fill(UI_CELL_STATE.HIDDEN),
    );

    if (!gameState) return newGrid;

    if (
      (gameState.status === GAME_STATUS.LOST ||
        gameState.status === GAME_STATUS.WON) &&
      gameState.fullBoard
    ) {
      for (let r = 0; r < GAME_CONFIG.GRID_ROWS; r++) {
        for (let c = 0; c < GAME_CONFIG.GRID_COLS; c++) {
          const serverCell = gameState.fullBoard[r][c];

          if (serverCell === UI_CELL_STATE.MINE) {
            const isFatalHit =
              gameState.status === GAME_STATUS.LOST &&
              gameState.revealedCell?.row === r &&
              gameState.revealedCell?.col === c;

            newGrid[r][c] = isFatalHit
              ? UI_CELL_STATE.MINE_HIT
              : UI_CELL_STATE.MINE;
          } else if (serverCell === UI_CELL_STATE.GEM) {
            newGrid[r][c] = UI_CELL_STATE.GEM;
          }
        }
      }
    } else if (gameState.revealedCells) {
      gameState.revealedCells.forEach((cell) => {
        if (cell.type === UI_CELL_STATE.GEM) {
          newGrid[cell.row][cell.col] = UI_CELL_STATE.GEM;
        } else if (cell.type === UI_CELL_STATE.MINE) {
          newGrid[cell.row][cell.col] = UI_CELL_STATE.MINE_HIT;
        }
      });
    }

    return newGrid;
  }, [gameState]);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    playClick();
    actions.handleReveal(rowIndex, colIndex);
  };

  return {
    gameState,
    flags: {
      ...flags,
      isStarting,
    },
    actions: {
      ...actions,
      handleCellClick,
    },
    metrics,
    grid,
  };
};
