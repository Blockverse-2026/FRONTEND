import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import FirewallBlock from '../components/FirewallBlock';
import PuzzleModal from '../components/PuzzleModal';
import HUDCard from '../components/HUDCard';

const Round1 = () => {
  const { puzzles, submitPuzzle } = useGame();
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);

  const handleBlockClick = (puzzleId) => {
    const puzzle = puzzles.find(p => p.puzzleId === puzzleId);
    if (puzzle) {
      setSelectedPuzzle(puzzle);
    }
  };

  const handlePuzzleSubmit = (puzzleId, answer) => {
    submitPuzzle(puzzleId, answer);
    setSelectedPuzzle(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-accent font-orbitron mb-6">Round 1: Firewall Grid</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {puzzles.map((puzzle) => (
                <FirewallBlock 
                    key={puzzle.puzzleId} 
                    id={puzzle.puzzleId} 
                    status={puzzle.solved ? 'solved' : 'locked'} 
                    onClick={handleBlockClick}
                />
            ))}
           </div>
        </div>

        <HUDCard title="Mission Log">
            <p className="mb-4 text-sm text-white/80">
                Breach the firewall by solving the node puzzles. Each successful decryption awards points and data fragments.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-accent/70">
                <li>Identify the encryption pattern.</li>
                <li>Input the correct key.</li>
                <li>Retrieve the data fragment.</li>
            </ul>
        </HUDCard>
      </div>

      {selectedPuzzle && (
        <PuzzleModal 
            puzzle={selectedPuzzle} 
            onClose={() => setSelectedPuzzle(null)} 
            onSubmit={handlePuzzleSubmit} 
        />
      )}
    </div>
  );
};

export default Round1;
