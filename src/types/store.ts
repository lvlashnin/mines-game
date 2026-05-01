import type { MinesCount } from "./api";

export interface GameState {
  betAmount: number;
  minesCount: MinesCount;
  isMuted: boolean;
}

export interface GameActions {
  setBetAmount: (amount: number) => void;
  setMinesCount: (count: MinesCount) => void;
  toggleMute: () => void;
  resetControls: () => void;
  halfBet: () => void;
  doubleBet: (currentBalance: number) => void;
  maxBet: (currentBalance: number) => void;
}

export type GameStore = GameState & GameActions;
