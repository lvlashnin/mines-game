import { UI_CELL_STATE } from "../constants/game";

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
