import type { GameHistoryItem } from "../../types";
import { cn } from "../../utils/cn";
import { UI_LABELS, HISTORY_OUTCOME } from "../../constants/ui";

interface HistoryCardProps {
  item: GameHistoryItem;
}

export const HistoryCard = ({ item }: HistoryCardProps) => {
  const isWin = item.outcome === HISTORY_OUTCOME.WIN;

  return (
    <div className="bg-game-bg rounded-xl p-4 flex flex-col gap-3 shrink-0">
      <div className="flex justify-between items-center text-sm font-mono">
        <span className="text-gray-400">${item.betAmount.toFixed(2)}</span>
        {isWin ? (
          <span className="text-game-gem font-bold">
            {item.multiplier?.toFixed(2)}×
          </span>
        ) : (
          <span className="text-xl leading-none">💣</span>
        )}
      </div>

      <div className="flex justify-between items-center text-xs font-bold tracking-wide">
        <span className="text-gray-500">
          {isWin ? UI_LABELS.HISTORY.STATUS_WIN : UI_LABELS.HISTORY.STATUS_BUST}
        </span>
        <span
          className={cn(
            "font-mono text-sm",
            isWin ? "text-game-gem" : "text-game-mine",
          )}
        >
          {item.profit > 0
            ? `+$${item.profit.toFixed(2)}`
            : `-$${Math.abs(+item.profit.toFixed(2))}`}
        </span>
      </div>
    </div>
  );
};
