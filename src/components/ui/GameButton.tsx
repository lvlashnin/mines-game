import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type GameButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "success" | "default";
  children: ReactNode;
};

export const GameButton = ({
  variant = "default",
  className,
  children,
  ...props
}: GameButtonProps) => {
  const variantClasses = {
    default: "bg-game-cell hover:bg-game-cell-hover text-gray-400",
    primary:
      "bg-game-button hover:bg-game-button-hover text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    success:
      "bg-blue-500 hover:bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]",
  };

  return (
    <button
      {...props}
      className={cn(
        "font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </button>
  );
};
