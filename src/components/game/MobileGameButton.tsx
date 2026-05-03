import { useGameEngine } from "../../hooks/useGameEngine";
import { useGameStore } from "../../store/useGameStore";
import { GameButton } from "../ui/GameButton";
import { PANEL_TEXTS } from "../../constants/ui";

export const MobileGameButton = () => {
  const { gameState, flags, actions, metrics } = useGameEngine();
  const betAmount = useGameStore((state) => state.betAmount);

  const { isIdle, isActive, isProcessing } = flags;

  return (
    <div className="sticky bottom-4 z-50 w-full lg:hidden order-4 mt-auto">
      {isActive ? (
        <GameButton
          variant="success"
          onClick={actions.handleCashOut}
          disabled={isProcessing || gameState?.gemsFound === 0}
          className="w-full py-4 shadow-2xl shadow-blue-500/20"
        >
          {PANEL_TEXTS.CASH_OUT} — ${metrics.currentWinAmount.toFixed(2)}
        </GameButton>
      ) : (
        <GameButton
          variant="primary"
          onClick={actions.handleStartGame}
          disabled={!isIdle || isProcessing || betAmount <= 0}
          className="w-full py-4 shadow-2xl shadow-green-500/20"
        >
          {PANEL_TEXTS.START_GAME}
        </GameButton>
      )}
    </div>
  );
};
