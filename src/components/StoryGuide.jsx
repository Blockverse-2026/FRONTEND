import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from './NeonButton';

const AVATAR_URL = "https://images.unsplash.com/photo-1514846326710-1f9e3e6f34f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";

const SCRIPTS = {
  '/': [
    "Agent, connection established.",
    "I am ANA, your handler for this mission.",
    "The BlockVerse protocol has been compromised.",
    "Initialize your connection to begin."
  ],
  '/dashboard': [
    "Welcome to the Grid, Agent.",
    "This is your Dashboard. Monitor your Fragments here.",
    "We need to recover Data Fragments to rewrite the protocol.",
    "Proceed to Round 1 when ready."
  ],
  '/round1': [
    "The Firewall Grid is active.",
    "Red nodes are encrypted. Click them to bypass security.",
    "Solve the ciphers to earn Points and Fragments.",
    "Watch out for false positives."
  ],
  '/round2': [
    "The Black Market is currently offline.",
    "We are detecting signal interference.",
    "Stand by for updates."
  ],
  '/admin': [
    "Administrator Access Detected.",
    "WARNING: The Finale Protocol is irreversible.",
    "Use with extreme caution."
  ]
};

const StoryGuide = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentScript, setCurrentScript] = useState([]);
  const [step, setStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const script = SCRIPTS[location.pathname];
    if (script) {
      setCurrentScript(script);
      setStep(0);
      setIsOpen(true);
      setDisplayedText('');
    } else {
      setIsOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen || !currentScript[step]) return;

    let index = 0;
    const text = currentScript[step];
    setDisplayedText('');
    
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [step, isOpen, currentScript]);

  const handleNext = () => {
    if (step < currentScript.length - 1) {
      setStep(step + 1);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-end max-w-sm"
        >
          {/* Character Container */}
          <div className="relative w-32 h-32 mb-[-20px] mr-4 z-10">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
            <div className="w-full h-full rounded-full border-2 border-accent/50 overflow-hidden relative shadow-[0_0_15px_rgba(0,229,255,0.5)] bg-black">
                <img 
                    src={AVATAR_URL} 
                    alt="ANA Handler" 
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30 mix-blend-overlay"></div>
            </div>
            {/* Status Indicator */}
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 rounded-full border border-black animate-ping"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
          </div>

          {/* Dialogue Box */}
          <div className="bg-black/90 border border-accent p-6 rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-[0_0_20px_rgba(0,229,255,0.2)] backdrop-blur-md relative">
            <div className="absolute top-0 right-0 p-2">
                <button onClick={() => setIsOpen(false)} className="text-white/30 hover:text-white text-xs">✕</button>
            </div>
            <h4 className="text-accent text-xs font-orbitron mb-2 tracking-widest">HANDLER: ANA</h4>
            <p className="font-spacemono text-sm text-white min-h-[60px] leading-relaxed">
              {displayedText}
              <span className="animate-pulse text-accent">_</span>
            </p>
            <div className="mt-4 flex justify-end">
              <NeonButton 
                onClick={handleNext} 
                className="text-xs px-4 py-1 !border-accent/50"
              >
                {step < currentScript.length - 1 ? 'NEXT >>' : 'ACKNOWLEDGED'}
              </NeonButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoryGuide;
