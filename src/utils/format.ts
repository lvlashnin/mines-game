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

export const formatMultiplier = (value: number): string => {
  return `${value.toFixed(2)}×`;
};
