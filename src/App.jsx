import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider, useGame } from './context/GameContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Intro from './pages/Intro';
import Dashboard from './pages/Dashboard';
import Round1 from './pages/Round1';
import Round2 from './pages/Round2';
import Round3 from './pages/Round3';
import Chat from './pages/Chat';
import Admin from './pages/Admin';
import FinaleOverlay from './components/FinaleOverlay';

// Wrapper to inject global finale overlay
const AppContent = () => {
  const { finaleActive } = useGame();
  
  return (
    <>
      <FinaleOverlay active={finaleActive} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="intro" element={<Intro />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="round1" element={<Round1 />} />
          <Route path="round2" element={<Round2 />} />
          <Route path="round3" element={<Round3 />} />
          <Route path="chat/:teamId" element={<Chat />} />
          <Route path="admin" element={<Admin />} />
          {/* Display Routes Placeholder */}
          <Route path="display/leaderboard" element={<div className="text-center text-4xl mt-20 font-orbitron text-accent">LEADERBOARD</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
