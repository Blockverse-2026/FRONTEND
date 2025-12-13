import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StoryGuide from './StoryGuide';
import NotificationToast from './NotificationToast';
import LoadingScreen from './LoadingScreen';
import { useGame } from '../context/GameContext';

const Layout = () => {
  const { notification, closeNotification } = useGame();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background text-white font-spacemono relative overflow-hidden selection:bg-accent selection:text-background">
      <LoadingScreen onLoadComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <>
          <div className="scanlines"></div>
          <div className="vignette"></div>
          <div className="relative z-10 p-4 md:p-8 min-h-screen flex flex-col">
            <Outlet />
          </div>
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
