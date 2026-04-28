export type UICellState = "hidden" | "gem" | "mine" | "mine-hit";

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
