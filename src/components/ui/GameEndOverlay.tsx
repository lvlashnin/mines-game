import { motion, type Variants } from "framer-motion";
import { GAME_STATUS } from "../../constants";

interface GameEndOverlayProps {
  status: string;
  multiplier?: number;
  winAmount?: number;
  profit?: number;
  betAmount?: number;
  onRestart: () => void;
}

const overlayVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export const GameEndOverlay = ({
  status,
  multiplier,
  winAmount,
  profit,
  betAmount,
  onRestart,
}: GameEndOverlayProps) => {
  const isWin = status === GAME_STATUS.WON;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#050505]/40 rounded-2xl"
      />

      <motion.div
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`relative flex flex-col items-center justify-center p-8 w-[300px] rounded-2xl border bg-[#131722] ${
          isWin
            ? "border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.15)]"
            : "border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.15)]"
        }`}
      >
        {isWin ? (
          <>
            <span className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              💎
            </span>
            <span className="text-white font-bold text-xl mb-4">
              Cashed Out!
            </span>

            {multiplier && (
              <span className="text-green-500 text-4xl font-black mb-2">
                {multiplier}×
              </span>
            )}

            {winAmount !== undefined && (
              <span className="text-white text-xl font-bold mb-1">
                ${winAmount.toFixed(2)}
              </span>
            )}

            {profit !== undefined && (
              <span className="text-green-500 text-sm font-medium mb-6">
                +${profit.toFixed(2)} profit
              </span>
            )}

            <button
              onClick={onRestart}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-2"
            >
              PLAY AGAIN
            </button>
          </>
        ) : (
          <>
            <span className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              💣
            </span>
            <span className="text-white font-bold text-xl mb-4">Busted!</span>

            {betAmount !== undefined && (
              <span className="text-red-500 font-bold text-lg mb-8">
                ${betAmount.toFixed(2)} lost
              </span>
            )}

            <button
              onClick={onRestart}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              TRY AGAIN
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};
