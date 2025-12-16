import React from 'react';
import { motion } from 'framer-motion';

const HoloButton = ({ children, onClick, className = "", active = false, variant = "cyan" }) => {
  const variantStyles = {
    cyan: "bg-cyan-900/10 border border-cyan-500/30 text-cyan-300",
    light: "bg-white/90 border border-white/50 text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-white",
    purple: "bg-purple-100/90 border border-purple-500/50 text-purple-900 font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:bg-purple-50"
  };

  const textHoverStyles = {
    cyan: "group-hover:text-cyan-100 group-hover:drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]",
    light: "group-hover:text-black",
    purple: "group-hover:text-purple-950"
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden group px-6 py-3 font-orbitron tracking-widest uppercase text-sm transition-all duration-300 ${variantStyles[variant] || variantStyles.cyan} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={active ? { 
        boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)",
        borderColor: "rgba(0, 229, 255, 0.8)",
        scale: 1.05
      } : {}}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      style={{
        backdropFilter: "blur(4px)",
      }}
    >
        {/* Scanline Hover Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,229,255,0.1)_50%,transparent_100%)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
        
        {/* Vertical Lines */}
        <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBg+P///38AAwECA/y+1IEAAAAASUVORK5CYII=')] opacity-0 group-hover:opacity-20 pointer-events-none"></div>

        <span className={`relative z-10 flex items-center justify-center gap-2 transition-all ${textHoverStyles[variant] || textHoverStyles.cyan}`}>
            {children}
        </span>
    </motion.button>
  );
};

export default HoloButton;