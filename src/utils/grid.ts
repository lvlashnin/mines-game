import { GAME_CONFIG, GAME_STATUS, UI_CELL_STATE } from "../constants/game";
import type { GameStateResponse, UICellState } from "../types";

/**
 * Generates the 2D grid for UI display based on the current server GameState.
 * Maps revealed cells, mine hits, or reveals full board upon game-over state.
 */
export const generateBoardGrid = (
  gameState?: GameStateResponse | null,
): UICellState[][] => {
  const newGrid: UICellState[][] = Array.from(
    { length: GAME_CONFIG.GRID_ROWS },
    () => Array(GAME_CONFIG.GRID_COLS).fill(UI_CELL_STATE.HIDDEN),
  );

  if (!gameState) return newGrid;

  const isGameOver =
    gameState.status === GAME_STATUS.LOST ||
    gameState.status === GAME_STATUS.WON;

  if (isGameOver && gameState.fullBoard) {
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
};
