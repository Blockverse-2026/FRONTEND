import React from 'react';

const FinaleOverlay = ({ active }) => {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-danger/20 animate-pulse"></div>
      <h1 className="text-6xl md:text-9xl font-orbitron text-danger font-bold text-center glitch mb-8" data-text="SYSTEM OVERRIDE">
        SYSTEM OVERRIDE
      </h1>
      <h2 className="text-2xl md:text-4xl font-spacemono text-white text-center uppercase tracking-widest mb-4">
        Rewrite Protocol Complete
      </h2>
      <p className="text-danger text-xl font-spacemono animate-bounce">YOU ARE ZERO</p>
      
      {/* Cracks effect (simulated with CSS/SVG) */}
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[url('https://www.transparenttextures.com/patterns/broken-noise.png')]"></div>
    </div>
  );
};

export default FinaleOverlay;
