import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import HUDCard from '../components/HUDCard';
import NeonButton from '../components/NeonButton';
import FragmentChip from '../components/FragmentChip';

const Dashboard = () => {
  const { team, points, tokens } = useGame();
  const navigate = useNavigate();

  if (!team) return <div className="text-center mt-20">Access Denied. Please Login.</div>;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end border-b border-accent/20 pb-4">
        <div>
          <h1 className="text-3xl text-accent font-orbitron">{team.name} DASHBOARD</h1>
          <p className="text-xs text-white/50 font-spacemono">ID: {team.teamId}</p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <span className="block text-xs text-accent">POINTS</span>
            <span className="text-2xl font-bold">{points}</span>
          </div>
          <div>
            <span className="block text-xs text-accent">TOKENS</span>
            <span className="text-2xl font-bold">{tokens}</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HUDCard title="Data Fragments" className="md:col-span-3">
          <div className="flex flex-wrap gap-4">
            {team.fragments && team.fragments.length > 0 ? (
              team.fragments.map(id => <FragmentChip key={id} id={id} label="Decrypted" />)
            ) : (
              <p className="text-white/30 italic">No fragments recovered yet.</p>
            )}
          </div>
        </HUDCard>

        <HUDCard title="Active Rounds">
          <div className="space-y-4">
            <NeonButton onClick={() => navigate('/round1')} className="w-full text-left">
              Round 1 - Firewall
            </NeonButton>
            <NeonButton onClick={() => navigate('/round2')} className="w-full text-left">
              Round 2 - Marketplace
            </NeonButton>
            <NeonButton onClick={() => navigate('/round3')} className="w-full text-left">
              Round 3 - Anomaly
            </NeonButton>
            <NeonButton onClick={() => navigate(`/chat/${team.teamId}`)} className="w-full text-left border-accent/50 text-accent/80">
              Secure Chat
            </NeonButton>
          </div>
        </HUDCard>

        <HUDCard title="Team Status">
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-white/70">Connection</span>
                    <span className="text-green-500">Stable</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-white/70">Security Level</span>
                    <span className="text-accent">High</span>
                </div>
            </div>
        </HUDCard>
      </div>
    </div>
  );
};

export default Dashboard;
