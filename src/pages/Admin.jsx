import React from 'react';
import { useGame } from '../context/GameContext';
import NeonButton from '../components/NeonButton';
import HUDCard from '../components/HUDCard';

const Admin = () => {
  const { triggerFinale } = useGame();

  return (
    <div className="p-8">
      <h1 className="text-4xl text-danger font-orbitron mb-8">ADMIN CONSOLE</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <HUDCard title="Game Controls">
           <div className="space-y-4">
             <NeonButton variant="secondary" className="w-full">Start Round 1</NeonButton>
             <NeonButton variant="secondary" className="w-full">Start Round 2</NeonButton>
             <NeonButton variant="secondary" className="w-full">Start Round 3</NeonButton>
           </div>
        </HUDCard>

        <HUDCard title="Danger Zone">
            <p className="text-danger mb-4 text-sm">
                Warning: This action is irreversible. It will override all client screens.
            </p>
            <NeonButton variant="danger" onClick={triggerFinale} className="w-full">
                TRIGGER FINALE PROTOCOL
            </NeonButton>
        </HUDCard>
      </div>
    </div>
  );
};

export default Admin;
