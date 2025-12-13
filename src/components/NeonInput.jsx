import React from 'react';

const NeonInput = ({ type = "text", placeholder, value, onChange, className = "" }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-black/50 border border-accent/50 text-accent p-3 w-full font-spacemono focus:outline-none focus:border-accent focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] placeholder-accent/30 transition-all ${className}`}
    />
  );
};

export default NeonInput;
