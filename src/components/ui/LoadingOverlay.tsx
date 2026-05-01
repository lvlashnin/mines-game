import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const dotVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const LoadingOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505]/60 backdrop-blur-[2px] rounded-2xl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-game-panel border border-game-border rounded-xl px-10 py-8 flex flex-col items-center justify-center gap-5 shadow-2xl"
      >
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="flex gap-2.5"
        >
          <motion.span
            variants={dotVariants}
            className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
          />
          <motion.span
            variants={dotVariants}
            className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
          />
          <motion.span
            variants={dotVariants}
            className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"
          />
        </motion.div>

        <span className="text-white font-bold tracking-widest text-sm">
          STARTING GAME...
        </span>
      </motion.div>
    </motion.div>
  );
};
