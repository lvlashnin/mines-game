import { MinesCount } from "../types";

export const GAME_CONFIG = {
  GRID_ROWS: 5,
  GRID_COLS: 5,
  TOTAL_CELLS: 25,
  DEFAULT_BET: 100,
  MIN_BET: 1,
  MAX_BET: 10000,
  AVAILABLE_MINES: [1, 3, 5, 10, 24] as readonly MinesCount[],
  DEFAULT_MINES: 5 as MinesCount,
} as const;

export const UI_CONFIG = {
  STAGGER_REVEAL_MS: 50,
  TOAST_DURATION_MS: 3000,
  API_TIMEOUT_MS: 10000,
} as const;

export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://mines-be.vercel.app",
  GAMES: "/api/games",
  ACTIVE_GAME: "/api/games/active",
  BALANCE: "/api/balance",
  HISTORY: "/api/history",
} as const;

export const QUERY_KEYS = {
  balance: ["balance"],
  history: ["history"],
  activeGame: ["activeGame"],
} as const;

export const PLAYER_ID = "serhiiId" as const;

export const GAME_STATUS = {
  ACTIVE: "active",
  WON: "won",
  LOST: "lost",
} as const;
