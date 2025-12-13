import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import NeonInput from '../components/NeonInput';
import NeonButton from '../components/NeonButton';
import HUDCard from '../components/HUDCard';

const Login = () => {
  const [teamId, setTeamId] = useState('');
  const [password, setPassword] = useState('');
  const { login, team } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (team) {
      navigate('/dashboard');
    }
  }, [team, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    login(teamId, password);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <HUDCard title="Team Access" className="w-full max-w-md">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-accent text-sm mb-2">Team ID</label>
            <NeonInput 
              value={teamId} 
              onChange={(e) => setTeamId(e.target.value)} 
              placeholder="CYBER_XX"
            />
          </div>
          <div>
            <label className="block text-accent text-sm mb-2">Password</label>
            <NeonInput 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="********"
            />
          </div>
          <NeonButton type="submit" className="w-full">
            Login to Genova Realm
          </NeonButton>
        </form>
      </HUDCard>
    </div>
  );
};

export default Login;
