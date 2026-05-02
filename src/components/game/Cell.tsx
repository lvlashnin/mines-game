import type { CellProps } from "../../types";
import { cn } from "../../utils/cn";
import { useCell } from "../../hooks/useCell";
import { UI_CELL_STATE } from "../../constants/game";

export const Cell = (props: CellProps) => {
  const { state, onClick } = props;
  const { isDisabled, iconPath } = useCell(props);

  return (
    <div className="relative w-full h-full aspect-square">
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={cn(
          "absolute inset-0 w-full h-full rounded-lg flex items-center justify-center transition-all duration-200",

          state === UI_CELL_STATE.HIDDEN &&
            "bg-game-cell shadow-[0_4px_0_0_rgba(0,0,0,0.2)]",
          state === UI_CELL_STATE.HIDDEN &&
            !isDisabled &&
            "hover:bg-game-cell-hover hover:-translate-y-1 cursor-pointer hover:shadow-[0_6px_0_0_rgba(0,0,0,0.3)]",
          state === UI_CELL_STATE.HIDDEN &&
            isDisabled &&
            "opacity-80 cursor-default",
          state === UI_CELL_STATE.GEM && "bg-game-gem scale-95 opacity-100",
          state === UI_CELL_STATE.MINE && "bg-game-cell/50 scale-95 opacity-50",
          state === UI_CELL_STATE.MINE_HIT &&
            "bg-game-mine scale-95 shadow-[0_0_15px_rgba(239,68,68,0.5)]",
        )}
      >
        <div
          className={cn(
            "transition-all  transform flex items-center justify-center w-1/2 h-1/2",
            state === UI_CELL_STATE.HIDDEN
              ? "scale-0 opacity-0"
              : "scale-100 opacity-100",
          )}
        >
          {iconPath && (
            <img
              src={iconPath}
              alt={state}
              className="w-full h-full object-contain pointer-events-none"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}

          <span className="absolute text-2xl sm:text-4xl pointer-events-none">
            {state === UI_CELL_STATE.GEM && "💎"}
            {(state === UI_CELL_STATE.MINE ||
              state === UI_CELL_STATE.MINE_HIT) &&
              "💣"}
          </span>
        </div>
      </button>
    </div>
  );
};
