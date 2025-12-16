import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

const FirewallBlock = ({ id, status, onClick }) => {
  const { introPlayed } = useGame();
  const isSolved = status === 'solved';
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        boxShadow: isSolved 
          ? "0 0 10px rgba(0, 255, 0, 0.2), inset 0 0 20px rgba(0, 255, 0, 0.1)"
          : introPlayed
            ? "0 0 10px rgba(255, 43, 72, 0.2), inset 0 0 20px rgba(255, 43, 72, 0.1)"
            : [
            "0 0 10px rgba(255, 43, 72, 0.2), inset 0 0 20px rgba(255, 43, 72, 0.1)",
            "0 0 20px rgba(255, 43, 72, 0.4), inset 0 0 30px rgba(255, 43, 72, 0.2)",
            "0 0 10px rgba(255, 43, 72, 0.2), inset 0 0 20px rgba(255, 43, 72, 0.1)"
          ]
      }}
      transition={{ 
        boxShadow: introPlayed ? { duration: 0.5 } : {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      whileHover={!isSolved ? { 
        scale: 1.02, 
        boxShadow: "0 0 25px rgba(255, 43, 72, 0.6), inset 0 0 30px rgba(255, 43, 72, 0.3)",
        x: [0, -1, 1, -1, 0],
        transition: { x: { duration: 0.2 } }
      } : {}}
      whileTap={!isSolved ? { scale: 0.98 } : {}}
      onClick={() => !isSolved && onClick(id)}
      className={`
        relative aspect-square flex items-center justify-center overflow-hidden
        border transition-all duration-300
        ${isSolved 
          ? "bg-green-900/10 border-green-500/50 cursor-default" 
          : "bg-red-950/30 border-red-600 cursor-pointer"
        }
      `}
    >
      {/* Scanline Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.03),rgba(255,0,0,0.06))] bg-[size:100%_4px,6px_100%] pointer-events-none opacity-50"></div>
      
      {/* Glitch Overlay on Hover */}
      {!isSolved && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-red-500/5 mix-blend-overlay transition-opacity duration-200 pointer-events-none"></div>
      )}

      {/* Content */}
      <motion.span 
        className={`
          relative z-10 font-orbitron text-2xl font-bold
          ${isSolved ? "text-green-500" : "text-white drop-shadow-[0_0_5px_rgba(255,43,72,0.8)]"}
        `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isSolved ? '✓' : id}
      </motion.span>
      
      {/* Corner Accents */}
      {!isSolved && (
        <>
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-red-500/50"></div>
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-red-500/50"></div>
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-red-500/50"></div>
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-red-500/50"></div>
        </>
      )}
    </motion.div>
  );
};

export default FirewallBlock;
