import { useId } from "react";
import { useGameStore } from "../../store/useGameStore";
import { useShallow } from "zustand/shallow";
import { BET_UI } from "../../constants";
import { GameButton } from "./GameButton";

interface BetInputProps {
  amount: number;
  balance: number;
  isDisabled: boolean;
  onChange: (amount: number | string) => void;
}

export const BetInput = ({
  amount,
  balance,
  isDisabled,
  onChange,
}: BetInputProps) => {
  const inputId = useId();

  const { halfBet, doubleBet, maxBet } = useGameStore(
    useShallow((state) => ({
      halfBet: state.halfBet,
      doubleBet: state.doubleBet,
      maxBet: state.maxBet,
    })),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") return onChange("");

    const num = Number(val);
    if (!isNaN(num) && num >= 0) {
      onChange(num > balance ? balance : num);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={inputId}
        className="text-xs font-bold text-gray-400 tracking-wider cursor-pointer"
      >
        BET AMOUNT
      </label>
      <div className="bg-game-input rounded-lg p-3 flex justify-between items-center border border-game-border focus-within:border-game-button transition-colors">
        <input
          id={inputId}
          type="number"
          value={amount}
          onChange={handleInputChange}
          disabled={isDisabled}
          min="0"
          max={balance}
          className="bg-transparent text-white font-mono text-lg outline-none w-full disabled:opacity-50"
        />
        <span className="text-gray-500 font-mono">$</span>
      </div>
      <div className="flex gap-2 h-10">
        <GameButton
          onClick={() => halfBet()}
          disabled={isDisabled || amount === 0}
          className="flex-1 border border-transparent hover:border-blue-500 hover:border"
        >
          {BET_UI.LABELS.HALF}
        </GameButton>

        <GameButton
          onClick={() => doubleBet(balance)}
          disabled={isDisabled || amount >= balance}
          className="flex-1 border border-transparent hover:border-blue-500 hover:border"
        >
          {BET_UI.LABELS.DOUBLE}
        </GameButton>

        <GameButton
          onClick={() => maxBet(balance)}
          disabled={isDisabled || balance === 0}
          className="flex-1 border border-transparent hover:border-blue-500 hover:border"
        >
          {BET_UI.LABELS.MAX}
        </GameButton>
      </div>
    </div>
  );
};
