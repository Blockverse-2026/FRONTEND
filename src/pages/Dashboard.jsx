import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import HoloPanel from '../components/HoloPanel';
import HoloButton from '../components/HoloButton';
import HoloAI from '../components/HoloAI';
import FragmentChip from '../components/FragmentChip';

const Dashboard = () => {
  const { team, points, tokens } = useGame();
  const navigate = useNavigate();

  if (!team) return <div className="text-center mt-20 font-orbitron text-cyan-500 animate-pulse">Access Denied. Please Login.</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex justify-between items-end border-b border-cyan-500/20 pb-4 relative">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        <div>
          <h1 className="text-3xl text-cyan-400 font-orbitron tracking-widest drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
            {team.name} <span className="text-white/50 text-lg">DASHBOARD</span>
          </h1>
          <p className="text-xs text-cyan-600/80 font-spacemono mt-1 tracking-widest">ID: {team.teamId}</p>
        </div>
        <div className="flex gap-8 text-right">
          <div className="bg-cyan-900/10 px-4 py-2 border border-cyan-500/20 rounded-sm backdrop-blur-sm">
            <span className="block text-[10px] text-cyan-400 tracking-[0.2em] mb-1">POINTS</span>
            <span className="text-2xl font-bold text-white font-orbitron">{points}</span>
          </div>
          <div className="bg-cyan-900/10 px-4 py-2 border border-cyan-500/20 rounded-sm backdrop-blur-sm">
            <span className="block text-[10px] text-cyan-400 tracking-[0.2em] mb-1">TOKENS</span>
            <span className="text-2xl font-bold text-white font-orbitron">{tokens}</span>
          </div>
        </div>
      </header>

      {/* AI Assistant Panel */}
      <div className="w-full">
        <HoloAI />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fragments Section */}
        <HoloPanel title="Data Fragments" className="md:col-span-2 min-h-[150px]">
          <div className="flex flex-wrap gap-4">
            {team.fragments && team.fragments.length > 0 ? (
              team.fragments.map(id => <FragmentChip key={id} id={id} label="Decrypted" />)
            ) : (
              <p className="text-cyan-500/30 italic font-spacemono text-sm">No fragments recovered yet.</p>
            )}
          </div>
        </HoloPanel>

        {/* Active Rounds */}
        <HoloPanel title="Active Missions" className="" data-guide-id="active-missions">
          <div className="space-y-4">
            <HoloButton 
              onClick={() => navigate('/round1')} 
              variant="light"
              className="w-full text-left !text-lg"
            >
              Round 1 - Firewall
            </HoloButton>
            <HoloButton 
              onClick={() => navigate('/round2')} 
              variant="light"
              className="w-full text-left !text-lg"
            >
              Round 2 - Marketplace
            </HoloButton>
            <HoloButton 
              onClick={() => navigate('/round3')} 
              variant="light"
              className="w-full text-left !text-lg"
            >
              Round 3 - Anomaly
            </HoloButton>
            <HoloButton 
              onClick={() => navigate(`/chat/${team.teamId}`)} 
              variant="purple"
              className="w-full text-left !text-lg"
            >
              Secure Chat
            </HoloButton>
          </div>
        </HoloPanel>

        {/* Team Status */}
        <HoloPanel title="System Status">
            <div className="space-y-4 font-spacemono text-sm">
                <div className="flex justify-between items-center p-3 bg-black/40 border border-cyan-500/10 rounded-sm">
                    <span className="text-cyan-600">Connection</span>
                    <span className="text-green-400 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Stable
                    </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/40 border border-cyan-500/10 rounded-sm">
                    <span className="text-cyan-600">Security Level</span>
                    <span className="text-cyan-400 font-bold">HIGH</span>
                </div>
                 <div className="flex justify-between items-center p-3 bg-black/40 border border-cyan-500/10 rounded-sm">
                    <span className="text-cyan-600">Grid Latency</span>
                    <span className="text-cyan-400">12ms</span>
                </div>
            </div>
        </HoloPanel>
      </div>
    </div>
  );
};

export default Dashboard;
