import React from 'react';
import { motion } from 'framer-motion';

const HoloButton = ({ children, onClick, className = "", active = false, variant = "cyan" }) => {
  const variantStyles = {
    cyan: "bg-cyan-900/10 border border-cyan-500/30 text-cyan-300",
    light: "bg-white/90 border border-white/50 text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-white",
    purple: "bg-purple-100/90 border border-purple-500/50 text-purple-900 font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:bg-purple-50",
    panel: "bg-black/60 border border-cyan-500/40 text-cyan-200 shadow-[0_0_20px_rgba(0,229,255,0.2)]",
    panelPurple: "bg-black/60 border border-purple-500/40 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
  };

  const textHoverStyles = {
    cyan: "group-hover:text-cyan-100 group-hover:drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]",
    light: "group-hover:text-black",
    purple: "group-hover:text-purple-950",
    panel: "group-hover:text-cyan-100 group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]",
    panelPurple: "group-hover:text-purple-100 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden group px-8 py-8 font-orbitron tracking-[0.25em] uppercase ${variant.startsWith('panel') ? 'text-2xl md:text-3xl font-bold' : 'text-sm'} transition-all duration-300 ${variantStyles[variant] || variantStyles.cyan} ${className}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      style={{
        backdropFilter: "blur(4px)",
      }}
    >
        {/* Scanline Hover Effect */}
        <div className={`absolute inset-0 ${variant.startsWith('panel') ? 'bg-[linear-gradient(90deg,transparent_0%,rgba(0,229,255,0.08)_50%,transparent_100%)]' : 'bg-[linear-gradient(90deg,transparent_0%,rgba(0,229,255,0.1)_50%,transparent_100%)]'} translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none`}></div>
        
        {/* Vertical Lines */}
        <div className={`absolute inset-0 ${variant.startsWith('panel') ? 'opacity-10' : 'opacity-0'} bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBg+P///38AAwECA/y+1IEAAAAASUVORK5CYII=')] group-hover:opacity-20 pointer-events-none`}></div>

        {/* Edge Glow */}
        {variant === 'panel' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-px left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"></div>
            <div className="absolute -bottom-px left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
          </div>
        )}
        {variant === 'panelPurple' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-px left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent"></div>
            <div className="absolute -bottom-px left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
          </div>
        )}

        <span className={`relative z-10 flex items-center justify-center gap-2 transition-all ${textHoverStyles[variant] || textHoverStyles.cyan}`}>
            {children}
        </span>
    </motion.button>
  );
};

export default HoloButton;
