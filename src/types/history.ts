import type { GameStatus } from "./game";

export interface HistoryGameItem {
  gameId: string;
  betAmount: number;
  minesCount: number;
  status: GameStatus;
  multiplier: number | null;
  profit: number | null;
  gemsFound: number;
  createdAt: string;
}

export interface HistoryResponse {
  games: HistoryGameItem[];
}
