import { useMemo } from "react";
import type { CellProps } from "../types";
import { UI_CELL_STATE } from "../constants/game";
import { ASSETS } from "../constants/assets";

export const useCell = ({
  state,
  isInteractive,
  isProcessing,
}: Omit<CellProps, "onClick">) => {
  const isDisabled =
    !isInteractive || isProcessing || state !== UI_CELL_STATE.HIDDEN;

  const iconPath = useMemo(() => {
    switch (state) {
      case UI_CELL_STATE.GEM:
        return ASSETS.ICONS.GEM;
      case UI_CELL_STATE.MINE:
      case UI_CELL_STATE.MINE_HIT:
        return ASSETS.ICONS.MINE;
      default:
        return null;
    }
  }, [state]);

  return {
    isDisabled,
    iconPath,
  };
};
