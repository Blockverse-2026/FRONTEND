import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadComplete, 500);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      pointerEvents={progress >= 100 ? "none" : "auto"}
    >
      <div className="w-64 relative">
        <div className="text-accent font-orbitron text-center mb-4 text-xl tracking-widest">
          INITIALIZING...
        </div>
        
        {/* Progress Bar Container */}
        <div className="h-2 bg-gray-800 border border-gray-700 relative overflow-hidden">
          <motion.div 
            className="h-full bg-accent shadow-[0_0_10px_var(--accent)]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-2 font-spacemono text-xs text-accent/70">
          <span>SYSTEM_CHECK</span>
          <span>{Math.floor(Math.min(progress, 100))}%</span>
        </div>
      </div>

      {/* Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
    </motion.div>
  );
};

export default LoadingScreen;
