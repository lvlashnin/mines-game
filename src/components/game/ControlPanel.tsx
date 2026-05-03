import { useId } from "react";
import { useGameEngine } from "../../hooks/useGameEngine";
import { useGameStore } from "../../store/useGameStore";
import { useBalanceQuery } from "../../api/queries";
import { cn } from "../../utils/cn";
import { BetInput } from "../ui/BetInput";
import { GameButton } from "../ui/GameButton";
import { GAME_CONFIG } from "../../constants/game";
import { PANEL_TEXTS } from "../../constants/ui";
import { StatRow } from "../ui/StatRow";

export const ControlPanel = () => {
  const { gameState, flags, metrics, actions } = useGameEngine();

  const betAmount = useGameStore((state) => state.betAmount);
  const setBetAmount = useGameStore((state) => state.setBetAmount);
  const minesCount = useGameStore((state) => state.minesCount);
  const setMinesCount = useGameStore((state) => state.setMinesCount);

  const { data: balanceData } = useBalanceQuery();
  const balance = balanceData?.balance || 0;

  const { isIdle, isActive, isProcessing } = flags;
  const minesLabelId = useId();

  const isDisabled = !isIdle || isProcessing;

  const gemsRemaining = GAME_CONFIG.GRID_SIZE - minesCount;

  return (
    <div className="w-full lg:flex-1 p-6 bg-game-panel rounded-2xl shadow-xl flex flex-col gap-6 relative">
      <div className="flex justify-between items-center pb-4 border-b border-game-border">
        <span className="text-sm text-game-stats-text font-bold">
          {PANEL_TEXTS.BALANCE}
        </span>
        <span className="font-mono text-game-gold text-lg font-bold flex items-center gap-2">
          <span role="img" aria-label="balance icon">
            💰
          </span>
          ${balance.toFixed(2)}
        </span>
      </div>

      <BetInput
        amount={betAmount}
        balance={balance}
        isDisabled={isDisabled}
        onChange={setBetAmount}
      />

      <div
        className="flex flex-col gap-2"
        role="group"
        aria-labelledby={minesLabelId}
      >
        <span
          id={minesLabelId}
          className="text-xs font-bold text-gray-400 tracking-wider"
        >
          {PANEL_TEXTS.MINES_LABEL}
        </span>
        <div className="flex justify-between gap-2">
          {GAME_CONFIG.AVAILABLE_MINES.map((num) => (
            <button
              key={num}
              disabled={isDisabled}
              onClick={() => setMinesCount(num)}
              className={cn(
                "flex-1 aspect-square rounded-lg font-bold text-sm transition-all",
                minesCount === num
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-game-cell hover:bg-game-cell-hover text-gray-400",
                isDisabled && "opacity-50 cursor-default",
              )}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {isActive && (
        <div className="flex flex-col gap-3 py-4 border-t border-b border-game-border mt-2 font-mono text-sm">
          <StatRow
            label={PANEL_TEXTS.STATS.MULTIPLIER}
            value={`${metrics.currentMultiplier.toFixed(2)}×`}
            valueClass="text-game-button"
          />
          <StatRow
            label={PANEL_TEXTS.STATS.PROFIT}
            value={`+$${metrics.potentialProfit.toFixed(2)}`}
            valueClass="text-game-button"
          />
          <StatRow
            label={PANEL_TEXTS.STATS.GEMS}
            value={`${gameState?.gemsFound || 0} / ${gemsRemaining}`}
          />
        </div>
      )}

      <div className="hidden lg:block sticky bottom-0 z-20 mt-auto pt-4 pb-2 bg-game-panel rounded-b-2xl">
        {isActive ? (
          <GameButton
            variant="success"
            onClick={actions.handleCashOut}
            disabled={isProcessing || gameState?.gemsFound === 0}
            className="w-full py-4 shadow-lg"
          >
            {PANEL_TEXTS.CASH_OUT} — ${metrics.currentWinAmount.toFixed(2)}
          </GameButton>
        ) : (
          <GameButton
            variant="primary"
            onClick={actions.handleStartGame}
            disabled={!isIdle || isProcessing || betAmount <= 0}
            className="w-full py-4 shadow-lg"
          >
            {PANEL_TEXTS.START_GAME}
          </GameButton>
        )}
      </div>


    </div>
  );
};
