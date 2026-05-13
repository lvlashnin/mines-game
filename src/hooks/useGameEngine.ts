import { useGameStore } from "../store/useGameStore";
import { useActiveGameQuery } from "../api/queries";
import {
  useCreateGameMutation,
  useRevealCellMutation,
  useCashOutMutation,
  useResetGame,
} from "../api/mutations";
import { GAME_STATUS } from "../constants/game";
import type { UseGameEngineReturn } from "../types";
import { useIsMutating } from "@tanstack/react-query";
import { useGameSounds } from "./useGameSounds";
import { calculatePotentialProfit, calculateWinAmount } from "../utils/bet";

export const useGameEngine = (): UseGameEngineReturn => {
  const { playWin, playLose } = useGameSounds();
  const betAmount = useGameStore((state) => state.betAmount);
  const minesCount = useGameStore((state) => state.minesCount);

  const { data: activeGame, isLoading: isGameLoading } = useActiveGameQuery();
  const createGame = useCreateGameMutation();
  const revealCell = useRevealCellMutation();
  const cashOut = useCashOutMutation();
  const resetGame = useResetGame();

  const isCreating = useIsMutating({ mutationKey: ["createGame"] }) > 0;
  const isRevealing = useIsMutating({ mutationKey: ["revealCell"] }) > 0;
  const isCashingOut = useIsMutating({ mutationKey: ["cashOut"] }) > 0;

  const currentMultiplier = activeGame?.currentMultiplier ?? 0;

  const isIdle = !activeGame && !isCreating;

  const isActive = activeGame?.status === GAME_STATUS.ACTIVE;

  const isGameOver =
    activeGame?.status === GAME_STATUS.WON ||
    activeGame?.status === GAME_STATUS.LOST;

  const isProcessing = isCreating || isRevealing || isCashingOut;

  const isWinOrActive = isActive || activeGame?.status === GAME_STATUS.WON;

  const potentialProfit =
    isWinOrActive && activeGame
      ? calculatePotentialProfit(activeGame.betAmount, activeGame.currentMultiplier)
      : 0;

  const currentWinAmount =
    isWinOrActive && activeGame
      ? calculateWinAmount(activeGame.betAmount, activeGame.currentMultiplier)
      : 0;

  const handleStartGame = () => {
    if (!isIdle) return;
    if (isActive || isProcessing) return;

    createGame.mutate({ betAmount, minesCount });
  };

  const handleReveal = (row: number, col: number) => {
    if (!isActive || isProcessing || !activeGame) return;

    const isAlreadyRevealed = activeGame.revealedCells.some(
      (cell) => cell.row === row && cell.col === col,
    );

    if (isAlreadyRevealed) return;

    revealCell.mutate(
      { gameId: activeGame.gameId, row, col },
      {
        onSuccess: (data) => {
          if (data.status === GAME_STATUS.LOST) {
            playLose();
          } else if (data.status === GAME_STATUS.WON) {
            playWin();
          }
        },
      },
    );
  };

  const handleCashOut = () => {
    if (!isActive || isProcessing || !activeGame || activeGame.gemsFound === 0)
      return;
    cashOut.mutate(
      { gameId: activeGame.gameId },
      {
        onSuccess: () => {
          playWin();
        },
      },
    );
  };

  return {
    gameState: activeGame,
    flags: {
      isIdle,
      isActive,
      isGameOver,
      isProcessing,
      isInitialLoading: isGameLoading,
    },
    metrics: {
      potentialProfit,
      currentWinAmount,
      currentMultiplier,
    },
    actions: {
      handleStartGame,
      handleReveal,
      handleCashOut,
      handleReset: resetGame,
    },
  };
};
