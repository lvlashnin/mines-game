/**
 * Formats a numeric value into currency representation (e.g., $100.00).
 * Optionally adds '+' or '-' signs if specified.
 */
export const formatCurrency = (
  value: number,
  options?: { showSign?: boolean },
): string => {
  const absVal = Math.abs(value).toFixed(2);
  const sign = options?.showSign
    ? value > 0
      ? "+"
      : value < 0
      ? "-"
      : ""
    : "";
  return `${sign}$${absVal}`;
};

/**
 * Formats a numeric multiplier into a multiplier string (e.g., 1.23x).
 */
export const formatMultiplier = (value: number): string => {
  return `${value.toFixed(2)}×`;
};
