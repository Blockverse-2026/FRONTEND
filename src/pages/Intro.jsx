import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NeonButton from '../components/NeonButton';

const Intro = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const fullText = "INITIALIZING SYSTEM...\nCONNECTING TO GENOVA NETWORK...\nAUTHENTICATION REQUIRED.\n\nWELCOME, AGENT.";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-2xl mx-auto">
      <div className="font-spacemono text-accent text-xl md:text-2xl whitespace-pre-line min-h-[200px] mb-8 text-left w-full border border-accent/30 p-8 bg-black/50">
        {text}
        <span className="animate-pulse">_</span>
      </div>
      <NeonButton onClick={() => navigate('/dashboard')} className="opacity-0 animate-[fadeIn_1s_ease-in_2s_forwards]">
        PROCEED TO DASHBOARD
      </NeonButton>
    </div>
  );
};

export default Intro;
