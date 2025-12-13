import React from 'react';
import HUDCard from '../components/HUDCard';

const Round3 = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-danger font-orbitron mb-6">Round 3: Anomaly Core</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {['Sequence', 'Cipher', 'Nash'].map((name, i) => (
             <HUDCard key={i} title={`Anomaly ${String.fromCharCode(65+i)}`} className="border-danger/50">
                 <div className="h-40 flex flex-col items-center justify-center gap-4">
                     <div className="w-16 h-16 rounded-full border-2 border-danger/50 flex items-center justify-center animate-pulse">
                         <span className="text-danger font-orbitron text-2xl">!</span>
                     </div>
                     <span className="text-danger font-spacemono uppercase">{name}</span>
                 </div>
             </HUDCard>
         ))}
      </div>
    </div>
  );
};

export default Round3;
