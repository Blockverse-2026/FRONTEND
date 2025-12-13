import React from 'react';

const FragmentChip = ({ id, label }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/50 rounded-full bg-accent/10 text-accent text-xs font-spacemono">
      <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
      FRAGMENT_{id}: {label}
    </div>
  );
};

export default FragmentChip;
