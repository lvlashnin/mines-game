export const BET_UI = {
  BUTTON_CLASS:
    "flex-1 bg-game-cell hover:bg-game-cell-hover disabled:opacity-50 rounded-md text-xs font-bold transition-colors",
  LABELS: {
    HALF: "1/2",
    DOUBLE: "x2",
    MAX: "Max",
  },
} as const;

export const PANEL_TEXTS = {
  START_GAME: "START GAME",
  CASH_OUT: "CASH OUT",
  MINES_LABEL: "MINES",
  BALANCE: "Balance",
  STATS: {
    MULTIPLIER: "Current Multiplier",
    PROFIT: "Profit",
    GEMS: "Gems Found",
  },
  QUICK_BET_AMOUNTS: [10, 25, 50, 100, 250, 500, 1000, 2500],
} as const;

export const UI_LABELS = {
  HISTORY: {
    TITLE: "RECENT GAMES",
    STATUS_WIN: "WIN",
    STATUS_BUST: "BUST",
  },
} as const;

export const HISTORY_OUTCOME = {
  WIN: "win",
  BUST: "bust",
} as const;
