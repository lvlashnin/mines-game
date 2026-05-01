import { UI_CELL_STATE } from "../constants/game";
import { HISTORY_OUTCOME } from "../constants/ui";

export type UICellState = (typeof UI_CELL_STATE)[keyof typeof UI_CELL_STATE];

export interface CellProps {
  state: UICellState;
  isInteractive: boolean;
  isProcessing: boolean;
  onClick: () => void;
}

export interface ControlPanelProps {
  isDisabled: boolean;
  isProcessing: boolean;
  potentialProfit: number;
  onStart: () => void;
  onCashOut: () => void;
}

export type HistoryOutcome =
  (typeof HISTORY_OUTCOME)[keyof typeof HISTORY_OUTCOME];

export interface GameHistoryItem {
  id: string;
  betAmount: number;
  outcome: HistoryOutcome;
  profit: number;
  multiplier?: number;
}
