import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  animate: {
    transition: { staggerChildren: 0.15 },
  },
};

const dotVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const InitialLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f1118]" // Замени цвет на свой основной фон, если он другой
    >
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex gap-2.5 mb-6"
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

      <span className="text-white font-bold tracking-widest text-lg mb-2">
        MINES
      </span>
      <span className="text-gray-500 text-sm font-medium">Loading game...</span>
    </motion.div>
  );
};
