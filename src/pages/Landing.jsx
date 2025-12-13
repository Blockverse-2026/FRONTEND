import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NeonButton from '../components/NeonButton';
import { staggerContainer, fadeInUp, textReveal, glitchVariant } from '../utils/animations';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] text-center relative"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={textReveal} className="overflow-hidden mb-8 relative">
        <motion.h1 
            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600 relative z-10"
            variants={glitchVariant}
        >
          BLOCKVERSE
        </motion.h1>
        <div className="absolute inset-0 text-accent/20 blur-[2px] animate-pulse" aria-hidden="true">BLOCKVERSE</div>
      </motion.div>
      
      <motion.h2 
        variants={fadeInUp}
        className="text-xl md:text-2xl text-accent/80 mb-12 tracking-widest uppercase font-orbitron"
      >
        Enter Genova Realm
      </motion.h2>

      <motion.div 
        variants={fadeInUp}
        className="max-w-2xl text-white/70 mb-12 leading-relaxed font-spacemono"
      >
        <p>A Cyber-Mystery Blockchain Experience.</p>
        <p>Decrypt the firewall. Trade the tokens. Rewrite the protocol.</p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <NeonButton onClick={() => navigate('/login')} className="text-xl px-12 py-4">
          Initialize Connection &gt;&gt;
        </NeonButton>
      </motion.div>
      
      {/* Decorative Grid Floor */}
      <motion.div 
        initial={{ opacity: 0, rotateX: 90 }}
        animate={{ opacity: 0.2, rotateX: 60 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute bottom-[-20%] w-full h-[50vh] bg-[linear-gradient(0deg,transparent_24%,rgba(0,229,255,0.3)_25%,rgba(0,229,255,0.3)_26%,transparent_27%,transparent_74%,rgba(0,229,255,0.3)_75%,rgba(0,229,255,0.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(0,229,255,0.3)_25%,rgba(0,229,255,0.3)_26%,transparent_27%,transparent_74%,rgba(0,229,255,0.3)_75%,rgba(0,229,255,0.3)_76%,transparent_77%,transparent)] bg-[length:50px_50px] perspective-1000 transform origin-bottom pointer-events-none"
      />
    </motion.div>
  );
};

export default Landing;
