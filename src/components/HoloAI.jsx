import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HoloAI = () => {
  const [text, setText] = useState('');
  const fullText = "SYSTEM STATUS: OPTIMAL. GRID CONNECTION: SECURE. AWAITING INPUT...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        
          setTimeout(() => { 
            index = 0; 
            setText('');
          }, 5000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
        className="flex items-start gap-4 p-4 border-l-2 border-cyan-500/50 bg-gradient-to-r from-cyan-900/10 to-transparent"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
        <div className="relative w-16 h-16 shrink-0">
             <div className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-spin-slow opacity-50" style={{ borderStyle: 'dashed' }}></div>
             <div className="absolute inset-2 border border-cyan-400 rounded-full animate-ping opacity-20"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-xs font-bold text-cyan-400 font-orbitron">AI</span>
             </div>
        </div>
        <div className="font-spacemono text-cyan-400/80 text-sm leading-relaxed pt-2">
            {text}<span className="animate-pulse">_</span>
        </div>
    </motion.div>
  );
};

export default HoloAI;