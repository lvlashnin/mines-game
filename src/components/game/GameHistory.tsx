import type { GameHistoryItem } from "../../types";
import { HistoryCard } from "../ui/HistoryCard";
import { UI_LABELS } from "../../constants/ui";

interface GameHistoryProps {
  history: GameHistoryItem[];
  isLoading?: boolean;
}

export const GameHistory = ({ history, isLoading }: GameHistoryProps) => {
  return (
    <div className="w-full md:w-[320px] h-150 shrink-0 p-6 bg-game-panel rounded-2xl shadow-xl flex flex-col">
      <h2 className="text-white text-sm font-bold tracking-wider mb-6 uppercase">
        {UI_LABELS.HISTORY.TITLE}
      </h2>

      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
        {history?.length > 0 ? (
          history.map((item) => <HistoryCard key={item.id} item={item} />)
        ) : (
          <div className="text-gray-500 text-sm text-center mt-10">
            No games played yet...
          </div>
        )}
      </div>
    </div>
  );
};
