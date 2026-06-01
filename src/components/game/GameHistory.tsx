import type { GameHistoryItem } from "../../types";
import { HistoryCard } from "../ui/HistoryCard";
import { UI_LABELS } from "../../constants/ui";

interface GameHistoryProps {
  history: GameHistoryItem[];
  isLoading?: boolean;
}

export const GameHistory = ({ history, isLoading }: GameHistoryProps) => {
  return (
    <div className="w-full lg:flex-1 p-6 bg-game-panel rounded-2xl shadow-xl flex flex-col lg:h-[600px]">
      <h2 className="text-white text-sm font-bold tracking-wider mb-4 lg:mb-6 uppercase shrink-0">
        {UI_LABELS.HISTORY.TITLE}
      </h2>

      <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-hidden overflow-y-hidden lg:overflow-y-auto pb-4 lg:pb-0 lg:pr-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {isLoading ? (
          <div className="text-gray-500 text-sm text-center mt-2 lg:mt-10">
            Loading history...
          </div>
        ) : history?.length > 0 ? (
          history.map((item) => <HistoryCard key={item.id} item={item} />)
        ) : (
          <div className="text-gray-500 text-sm text-center mt-2 lg:mt-10">
            No games played yet...
          </div>
        )}
      </div>
    </div>
  );
};
