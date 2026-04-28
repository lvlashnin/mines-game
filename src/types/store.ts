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
}

export type GameStore = GameState & GameActions;
