import React, { useState } from 'react';
import NeonButton from './NeonButton';
import NeonInput from './NeonInput';

const PuzzleModal = ({ puzzle, onClose, onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(puzzle.puzzleId, answer);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-black border border-accent p-8 max-w-lg w-full relative neon-border">
        <button onClick={onClose} className="absolute top-4 right-4 text-accent hover:text-white">✕</button>
        
        <h2 className="text-2xl font-orbitron text-accent mb-4">Node Access: {puzzle.puzzleId}</h2>
        <p className="font-spacemono text-white mb-6">{puzzle.question}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <NeonInput 
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)} 
            placeholder="Enter decryption key..."
          />
          <div className="flex justify-end gap-4">
            <NeonButton variant="secondary" onClick={onClose} type="button">Cancel</NeonButton>
            <NeonButton variant="primary" type="submit">Decrypt</NeonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PuzzleModal;
