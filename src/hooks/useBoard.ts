import { useMemo } from "react";
import { GAME_STATUS } from "../constants/game";
import { useGameEngine } from "./useGameEngine";
import { useGameSounds } from "./useGameSounds";
import { generateBoardGrid } from "../utils/grid";

export const useBoard = () => {
  const { gameState, flags, actions, metrics } = useGameEngine();
  const { playClick } = useGameSounds();

  const { isProcessing } = flags;

  const isStarting =
    isProcessing && (!gameState || gameState.status !== GAME_STATUS.ACTIVE);

  const grid = useMemo(() => generateBoardGrid(gameState), [gameState]);

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
