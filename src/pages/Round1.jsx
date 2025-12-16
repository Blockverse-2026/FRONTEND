import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import FirewallBlock from '../components/FirewallBlock';
import PuzzleModal from '../components/PuzzleModal';
import HoloPanel from '../components/HoloPanel';

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
      <header className="border-b border-cyan-500/20 pb-4">
          <h1 className="text-3xl text-cyan-400 font-orbitron tracking-widest drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]">
            Round 1: Firewall Grid
          </h1>
          <p className="text-xs text-cyan-600/70 font-spacemono mt-1 tracking-[0.2em]">
            SYSTEM_INTEGRITY: COMPROMISED
          </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Grid Area */}
        <div className="lg:col-span-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-black/40 border border-cyan-500/10 rounded-sm relative overflow-hidden" data-guide-id="round1-grid">
            {/* Grid Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
            
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

        {/* Mission Log Panel */}
        <div className="lg:col-span-4">
            <HoloPanel title="MISSION LOG" className="h-full" data-guide-id="mission-log">
                <div className="font-spacemono text-sm space-y-6">
                    <p className="text-cyan-100/80 leading-relaxed border-l-2 border-cyan-500/30 pl-3">
                        Breach the firewall by solving the node puzzles. Each successful decryption awards points and data fragments.
                    </p>
                    
                    <div className="bg-cyan-950/20 p-4 rounded border border-cyan-500/20">
                        <h4 className="text-cyan-400 font-bold mb-3 text-xs tracking-wider uppercase">Objectives</h4>
                        <ul className="space-y-3 text-xs text-cyan-300/70">
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-500 mt-0.5">►</span>
                                <span>Identify the encryption pattern in active nodes.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-500 mt-0.5">►</span>
                                <span>Input the correct key sequence.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-500 mt-0.5">►</span>
                                <span>Retrieve the data fragment to bypass security.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="text-[10px] text-cyan-600/50 pt-4 border-t border-cyan-500/10">
                        STATUS: AWAITING_INPUT<br/>
                        ENCRYPTION: AES-256-GCM<br/>
                        NODES_ACTIVE: {puzzles.length}
                    </div>
                </div>
            </HoloPanel>
        </div>
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
