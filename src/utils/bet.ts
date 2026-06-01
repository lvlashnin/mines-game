export const clampBetAmount = (
  amount: number,
  balance: number,
  min = 0,
): number => {
  return Math.max(min, Math.min(amount, balance));
};

export const calculatePotentialProfit = (
  betAmount: number,
  multiplier: number,
): number => {
  return Math.max(0, betAmount * multiplier - betAmount);
};

export const calculateWinAmount = (
  betAmount: number,
  multiplier: number,
): number => {
  return betAmount * multiplier;
};
