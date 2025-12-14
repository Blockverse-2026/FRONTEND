import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import NeonInput from '../components/NeonInput';
import NeonButton from '../components/NeonButton';
import CyberWindow from '../components/CyberWindow';

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
    <div className="flex items-center justify-center min-h-[90vh] p-4">
      <CyberWindow title="ACCESS PROTOCOL">
        <form onSubmit={handleLogin} className="space-y-8 w-full max-w-[80%] mx-auto">
          <div className="group">
            <label className="block text-accent text-sm mb-2 font-orbitron tracking-wider group-hover:text-white transition-colors duration-300">
              IDENTITY_KEY
            </label>
            <NeonInput 
              value={teamId} 
              onChange={(e) => setTeamId(e.target.value)} 
              placeholder="CYBER_XX"
              className="w-full bg-black/50 border-accent/50 focus:border-accent focus:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-all duration-300"
            />
          </div>
          
          <div className="group">
            <label className="block text-accent text-sm mb-2 font-orbitron tracking-wider group-hover:text-white transition-colors duration-300">
              SECURITY_HASH
            </label>
            <NeonInput 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="********"
              className="w-full bg-black/50 border-accent/50 focus:border-accent focus:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-all duration-300"
            />
          </div>

          <div className="pt-4">
            <NeonButton type="submit" className="w-full text-lg py-4 hover:scale-[1.02] transition-transform duration-300">
              INITIALIZE_LINK
            </NeonButton>
          </div>
        </form>
      </CyberWindow>
    </div>
  );
};

export default Login;
