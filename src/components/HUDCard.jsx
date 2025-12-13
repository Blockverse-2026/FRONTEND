import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const HUDCard = ({ title, children, className = "" }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`border border-accent/30 bg-black/40 p-4 relative backdrop-blur-sm ${className}`}
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent"></div>
      
      {title && (
        <h3 className="text-accent font-orbitron text-sm uppercase tracking-wider mb-4 border-b border-accent/20 pb-2 flex justify-between items-center">
          {title}
          <span className="w-2 h-2 bg-accent/50 rounded-full animate-pulse"></span>
        </h3>
      )}
      <div>{children}</div>
    </motion.div>
  );
};

export default HUDCard;
