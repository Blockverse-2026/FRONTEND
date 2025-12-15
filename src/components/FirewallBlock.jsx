import { motion } from "framer-motion";

const FirewallBlock = ({ id, status, onClick }) => {
  const styles = {
    locked:
      "bg-red-900/20 border-red-500/50 hover:bg-red-900/40 cursor-pointer",
    unlocked:
      "bg-blue-500/20 border-blue-500 hover:bg-blue-500/40 cursor-pointer animate-pulse",
    solved:
      "bg-green-500/20 border-green-500 opacity-50 cursor-default",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={
        status !== "solved" ? { scale: 1.05 } : undefined
      }
      whileTap={
        status !== "solved" ? { scale: 0.95 } : undefined
      }
      onClick={() => onClick(id)}

      className={`aspect-square border-2 flex items-center justify-center transition-colors duration-300 ${
        styles[status] || styles.locked
      }`}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-xl"
      >
        {status === "solved" ? "✓" : id}
      </motion.span>
    </motion.div>
  );
};

export default FirewallBlock;
