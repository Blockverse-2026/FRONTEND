import React, { createContext, useContext, useState, useEffect } from 'react';
import socket from '../utils/socket';
import teamsData from '../data/teams.json';
import puzzlesData from '../data/puzzles.json';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [team, setTeam] = useState(null);
  const [tokens, setTokens] = useState(0);
  const [points, setPoints] = useState(0);
  const [puzzles, setPuzzles] = useState(puzzlesData.map(p => ({...p, solved: false})));
  const [finaleActive, setFinaleActive] = useState(false);
  const [notification, setNotification] = useState({ isOpen: false, message: '', type: 'info' });

  const showNotification = (message, type = 'info') => {
    setNotification({ isOpen: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isOpen: false }));
    }, 5000);
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const handleAuthResult = (data) => {
      if (data.success) {
        const teamData = teamsData.find(t => t.teamId === data.teamId);
        if (teamData) {
            setTeam(teamData);
            setTokens(teamData.tokens);
            setPoints(teamData.points);
        } else {
             setTeam({ teamId: data.teamId, name: 'Unknown Team' });
        }
      } else {
        showNotification(data.message, 'error');
      }
    };

    const handlePuzzleResult = (data) => {
      showNotification(data.message, data.success ? 'success' : 'error');
      if (data.success) {
        setPuzzles(prev => prev.map(p => p.puzzleId === data.puzzleId ? { ...p, solved: true } : p));
        setPoints(prev => prev + data.rewardPoints);
      }
    };

    const handleTokensUpdated = (data) => {
        setTokens(data.tokens);
    };

    const handleFinaleTrigger = (data) => {
      setFinaleActive(data.active);
    };

    socket.on('authResult', handleAuthResult);
    socket.on('puzzleResult', handlePuzzleResult);
    socket.on('tokensUpdated', handleTokensUpdated);
    socket.on('finaleTrigger', handleFinaleTrigger);

    return () => {
      socket.off('authResult', handleAuthResult);
      socket.off('puzzleResult', handlePuzzleResult);
      socket.off('tokensUpdated', handleTokensUpdated);
      socket.off('finaleTrigger', handleFinaleTrigger);
    };
  }, []);

  const login = (teamId, password) => {
    socket.emit('joinTeam', { teamId, password });
  };

  const submitPuzzle = (puzzleId, answer) => {
    socket.emit('submitPuzzleAnswer', { puzzleId, answer });
  };
  
  const triggerFinale = () => {
      socket.emit('adminCommand', { command: 'finaleTrigger' });
  };

  return (
    <GameContext.Provider value={{ 
      team, 
      tokens, 
      points, 
      puzzles, 
      finaleActive,
      notification,
      showNotification,
      closeNotification, 
      login, 
      submitPuzzle,
      triggerFinale
    }}>
      {children}
    </GameContext.Provider>
  );
};
