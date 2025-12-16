import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

const HoloPanel = ({ children, className = "", title }) => {
  const { introPlayed } = useGame();

  return (
    <motion.div
      className={`relative p-6 bg-[#0A0A0A]/80 border border-cyan-500/30 rounded-sm backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        boxShadow: "0 0 10px rgba(0, 229, 255, 0.1)"
      }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
      style={{
        boxShadow: "0 0 10px rgba(0, 229, 255, 0.2), inset 0 0 20px rgba(0, 229, 255, 0.05)"
      }}
    >
      <div className={`absolute inset-0 border border-cyan-400/50 rounded-sm opacity-50 ${!introPlayed ? 'animate-pulse' : ''}`}></div>
      

      <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
      <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
      <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
      <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

      {title && (
        <div className="mb-4 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
            <div className="w-1 h-4 bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)]"></div>
            <h3 className="text-cyan-400 font-orbitron tracking-[0.2em] text-sm uppercase font-bold drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]">
                {title}
            </h3>
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default HoloPanel;