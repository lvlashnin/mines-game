import { create } from "zustand";
import type { GameStore, MinesCount } from "../types";
import { GAME_CONFIG } from "../constants/game";

export const useGameStore = create<GameStore>((set) => ({
  betAmount: GAME_CONFIG.DEFAULT_BET,
  minesCount: GAME_CONFIG.DEFAULT_MINES,
  isMuted: false,

  setBetAmount: (amount: number) => set({ betAmount: amount }),

  setMinesCount: (count: MinesCount) => set({ minesCount: count }),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  resetControls: () =>
    set({
      betAmount: GAME_CONFIG.DEFAULT_BET,
      minesCount: GAME_CONFIG.DEFAULT_MINES,
    }),
}));
