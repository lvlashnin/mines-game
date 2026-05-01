import type { GameStateResponse } from "../../types";
import { cn } from "../../utils/cn";
import { BetInput } from "../ui/BetInput";
import { GameButton } from "../ui/GameButton";
import { GAME_CONFIG } from "../../constants/game";
import { PANEL_TEXTS } from "../../constants/ui"; // Наши новые константы
import { useId } from "react";
import { StatRow } from "../ui/StatRow";

interface ControlPanelProps {
  flags: {
    isIdle: boolean;
    isActive: boolean;
    isProcessing: boolean;
  };
  metrics: {
    potentialProfit: number;
    currentWinAmount: number;
  };
  gameState?: GameStateResponse | null;
  balance: number;
  betAmount: number;
  setBetAmount: (amount: number) => void;
  minesCount: number;
  setMinesCount: (count: number) => void;
  onStart: () => void;
  onCashOut: () => void;
}

export const ControlPanel = ({
  flags,
  metrics,
  gameState,
  balance,
  betAmount,
  setBetAmount,
  minesCount,
  setMinesCount,
  onStart,
  onCashOut,
}: ControlPanelProps) => {
  const { isIdle, isActive, isProcessing } = flags;
  const isDisabled = !isIdle || isProcessing;
  const minesLabelId = useId();

  const totalPayout = betAmount + metrics.potentialProfit;
  const currentMultiplier = gameState?.currentMultiplier?.toFixed(2) || "1.00";
  const gemsRemaining = GAME_CONFIG.GRID_SIZE - minesCount;

  return (
    <div className="w-full md:w-[320px] shrink-0 p-6 bg-game-panel rounded-2xl shadow-xl flex flex-col gap-6">
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

      {isActive ? (
        <GameButton
          variant="success"
          onClick={onCashOut}
          disabled={isProcessing || gameState?.gemsFound === 0}
          className="w-full py-4"
        >
          {PANEL_TEXTS.CASH_OUT} — ${totalPayout.toFixed(2)}
        </GameButton>
      ) : (
        <GameButton
          variant="primary"
          onClick={onStart}
          disabled={isProcessing || betAmount <= 0}
          className="w-full py-4"
        >
          {PANEL_TEXTS.START_GAME}
        </GameButton>
      )}

      {isActive && (
        <div className="flex flex-col gap-3 py-4 border-b border-t border-game-border mt-2 font-mono text-sm">
          <StatRow
            label={PANEL_TEXTS.STATS.MULTIPLIER}
            value={`${currentMultiplier}×`}
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

      <div className="flex justify-between items-center mt-auto pt-4">
        <span className="text-sm text-game-stats-text">
          {PANEL_TEXTS.BALANCE}
        </span>
        <span className="font-mono text-game-gold font-bold flex items-center gap-2">
          <span role="img" aria-label="balance icon">
            💰
          </span>
          ${balance.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
