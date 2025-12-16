import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CyberWindow = ({ children, title = "SYSTEM ACCESS" }) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef(null);


  useEffect(() => {
    const triggerGlitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);

      const nextGlitchTime = Math.random() * (12000 - 8000) + 8000;
      return setTimeout(triggerGlitch, nextGlitchTime);
    };

    const timer = triggerGlitch();
    return () => clearTimeout(timer);
  }, []);

  const scanLineVariants = {
    animate: {
      top: ['0%', '100%'],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full max-w-[500px] aspect-square flex flex-col justify-center items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main Window Container */}
      <div 
        ref={containerRef}
        className={`
          relative w-full h-full bg-black border-2 border-accent 
          overflow-hidden flex flex-col
          transition-all duration-300
          ${glitchActive ? 'translate-x-1 translate-y-[-1px]' : ''}
        `}
        style={{
          boxShadow: `0 0 15px rgba(0, 229, 255, 0.3), 
                      inset 0 0 20px rgba(0, 229, 255, 0.1)`
        }}
      >
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

        {/* Multi-colored Neon Glow Accents */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent via-purple-500 to-accent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-accent to-purple-500 animate-pulse"></div>
        <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-accent via-cyan-500 to-purple-500 animate-pulse"></div>
        <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-purple-500 via-cyan-500 to-accent animate-pulse"></div>

        {/* Header */}
        <div className="relative z-10 w-full p-4 border-b border-accent/30 bg-accent/5 flex items-center justify-center">
          <h2 className="text-xl font-orbitron tracking-widest text-accent drop-shadow-[0_0_5px_rgba(0,229,255,0.8)] text-center w-full">
            {title}
          </h2>
          <div className="absolute right-4 flex gap-2">
            <div className="w-3 h-3 bg-accent/50 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-accent rounded-full"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 flex-1 p-8 flex flex-col justify-center">
          {children}
        </div>

        {/* Scanning Line */}
        <motion.div 
          className="absolute left-0 w-full h-[2px] bg-accent/50 shadow-[0_0_15px_rgba(0,229,255,0.8)] z-20 pointer-events-none"
          variants={scanLineVariants}
          animate="animate"
        />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent"></div>

        {/* Glitch Overlay (CSS Clip Path) */}
        {glitchActive && (
          <div 
            className="absolute inset-0 bg-accent/10 pointer-events-none z-30 mix-blend-overlay"
            style={{
              clipPath: `polygon(
                0% ${Math.random() * 100}%, 
                100% ${Math.random() * 100}%, 
                100% ${Math.random() * 100}%, 
                0% ${Math.random() * 100}%
              )`
            }}
          />
        )}
      </div>

      {/* Outer Glow / Light Bleed */}
      <div className="absolute -inset-4 bg-accent/5 blur-xl -z-10 rounded-full animate-pulse duration-[3000ms]"></div>
    </motion.div>
  );
};

export default CyberWindow;
