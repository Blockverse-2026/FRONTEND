import React from 'react';
import { motion } from 'framer-motion';

const scaleOnHover = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.1,
    boxShadow: "0 0 25px rgba(0, 229, 255, 0.6)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
};

const NeonButton = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "px-6 py-2 uppercase tracking-widest font-orbitron border backdrop-blur-sm relative group overflow-hidden";
  
  const variants = {
    primary: "border-accent text-accent hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.5)]",
    danger: "border-danger text-danger hover:bg-danger/10 hover:shadow-[0_0_20px_rgba(255,43,72,0.5)]",
    secondary: "border-white/50 text-white/70 hover:border-white hover:text-white hover:bg-white/5"
  };

  return (
    <motion.button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      variants={scaleOnHover}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Background Fill */}
      <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity"></div>
      
      {/* Scanline Effect */}
      <motion.div 
        className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
        initial={{ left: "-100%" }}
        whileHover={{ 
          left: "200%",
          transition: { duration: 0.5, ease: "easeInOut" }
        }}
      />
    </motion.button>
  );
};

export default NeonButton;
