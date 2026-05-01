import { GAME_STATUS } from "../constants/game";

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
export type CellType = "gem" | "mine";
export type MinesCount = 1 | 3 | 5 | 10 | 24;

export interface ApiError {
  error: string;
}

export interface RevealedCell {
  row: number;
  col: number;
  type: CellType;
}

export type FullBoard = CellType[][];

export interface BalanceResponse {
  balance: number;
}

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

export interface GameStateResponse {
  gameId: string;
  minesCount: number;
  betAmount: number;
  currentMultiplier: number;
  status: GameStatus;
  revealedCells: RevealedCell[];
  gemsFound: number;
  nextMultiplier: number | null;
}

export interface CreateGameRequest {
  betAmount: number;
  minesCount: MinesCount;
}

export interface CreateGameResponse extends GameStateResponse {
  balance: number;
}

export interface RevealRequest {
  row: number;
  col: number;
}

export interface RevealGemResponse {
  result: "gem";
  currentMultiplier: number;
  revealedCells: RevealedCell[];
  status: "active";
  gemsFound: number;
  nextMultiplier: number | null;
}

export interface RevealMineResponse {
  result: "mine";
  status: "lost";
  revealedCell: RevealedCell;
  fullBoard: FullBoard;
  balance: number;
}

export type RevealResponse = RevealGemResponse | RevealMineResponse;

export interface CashoutResponse {
  status: "won";
  cashedOutMultiplier: number;
  winAmount: number;
  profit: number;
  fullBoard: FullBoard;
  balance: number;
}

export interface UseGameEngineReturn {
  gameState: GameStateResponse | null | undefined;
  flags: {
    isIdle: boolean;
    isActive: boolean;
    isGameOver: boolean;
    isProcessing: boolean;
  };
  metrics: {
    potentialProfit: number;
    currentWinAmount: number;
  };
  actions: {
    handleStartGame: () => void;
    handleReveal: (row: number, col: number) => void;
    handleCashOut: () => void;
  };
}
