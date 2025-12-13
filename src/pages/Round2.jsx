import React from 'react';
import HUDCard from '../components/HUDCard';

const Round2 = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-accent font-orbitron mb-6">Round 2: Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <HUDCard title="Black Market">
          <p className="text-white/70 mb-4">Trade tokens for clues or fragments.</p>
          <div className="p-4 border border-accent/20 bg-accent/5 text-center text-white/50">
            MARKETPLACE OFFLINE
          </div>
        </HUDCard>
        <HUDCard title="Tech Quiz">
          <p className="text-white/70 mb-4">Answer technical questions to earn tokens.</p>
          <div className="p-4 border border-accent/20 bg-accent/5 text-center text-white/50">
            QUIZ MODULE LOADING...
          </div>
        </HUDCard>
      </div>
    </div>
  );
};

export default Round2;
