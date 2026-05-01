import { useGameStore } from "../store/useGameStore";
import { useActiveGameQuery } from "../api/queries";
import {
  useCreateGameMutation,
  useRevealCellMutation,
  useCashOutMutation,
} from "../api/mutations";
import { GAME_STATUS } from "../constants/game";
import type { UseGameEngineReturn } from "../types";

export const useGameEngine = (): UseGameEngineReturn => {
  const betAmount = useGameStore((state) => state.betAmount);
  const minesCount = useGameStore((state) => state.minesCount);

  const { data: activeGame, isLoading: isGameLoading } = useActiveGameQuery();
  const createGame = useCreateGameMutation();
  const revealCell = useRevealCellMutation();
  const cashOut = useCashOutMutation();

  const isIdle =
    (!activeGame || activeGame.status !== GAME_STATUS.ACTIVE) &&
    !createGame.isPending;
  const isActive = activeGame?.status === GAME_STATUS.ACTIVE;
  const isGameOver =
    activeGame?.status === GAME_STATUS.WON ||
    activeGame?.status === GAME_STATUS.LOST;
  const isProcessing =
    createGame.isPending ||
    revealCell.isPending ||
    cashOut.isPending ||
    isGameLoading;

  const potentialProfit = isActive
    ? activeGame.betAmount * activeGame.currentMultiplier - activeGame.betAmount
    : 0;

  const currentWinAmount = isActive
    ? activeGame.betAmount * activeGame.currentMultiplier
    : 0;

  const handleStartGame = () => {
    if (isActive || isProcessing) return;

    createGame.mutate({ betAmount, minesCount });
  };

  const handleReveal = (row: number, col: number) => {
    if (!isActive || isProcessing || !activeGame) return;

    const isAlreadyRevealed = activeGame.revealedCells.some(
      (cell) => cell.row === row && cell.col === col,
    );

    if (isAlreadyRevealed) return;

    revealCell.mutate({ gameId: activeGame.gameId, row, col });
  };

  const handleCashOut = () => {
    if (!isActive || isProcessing || !activeGame || activeGame.gemsFound === 0)
      return;
    cashOut.mutate({ gameId: activeGame.gameId });
  };

  return {
    gameState: activeGame,
    flags: {
      isIdle,
      isActive,
      isGameOver,
      isProcessing,
    },
    metrics: {
      potentialProfit,
      currentWinAmount,
    },
    actions: {
      handleStartGame,
      handleReveal,
      handleCashOut,
    },
  };
};
