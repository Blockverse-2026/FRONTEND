import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import StoryGuide from './StoryGuide';
import NotificationToast from './NotificationToast';
import LoadingScreen from './LoadingScreen';
import { useGame } from '../context/GameContext';

const Layout = () => {
  const { notification, closeNotification, setIntroPlayed } = useGame();
  const [isLoading, setIsLoading] = useState(true);

  const handleIntroComplete = () => {
    setIntroPlayed(true);
  };

  return (
    <div className="min-h-screen bg-background text-white font-spacemono relative overflow-x-hidden selection:bg-accent selection:text-background">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onLoadComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="scanlines"
          ></motion.div>
          <div className="vignette"></div>
          
          <motion.div 
            className="relative z-10 p-4 md:p-8 min-h-screen flex flex-col max-w-7xl mx-auto w-full"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ 
              duration: 1.5, 
              ease: "easeOut",
              delay: 0.2
            }}
            onAnimationComplete={handleIntroComplete}
          >
            <Outlet />
          </motion.div>

          <StoryGuide />
          <NotificationToast 
            isOpen={notification.isOpen}
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        </>
      )}
    </div>
  );
};

export default Layout;
