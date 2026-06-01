import { cn } from "../../utils/cn";

interface StatRowProps {
  label: string;
  value: React.ReactNode;
  valueClass?: string;
}

export const StatRow = ({
  label,
  value,
  valueClass = "text-white",
}: StatRowProps) => (
  <div className="flex justify-between items-center">
    <span className="text-game-stats-text">{label}</span>
    <span className={cn("font-bold", valueClass)}>{value}</span>
  </div>
);
