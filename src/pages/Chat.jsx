import React from 'react';
import { useParams } from 'react-router-dom';
import HUDCard from '../components/HUDCard';
import NeonInput from '../components/NeonInput';
import NeonButton from '../components/NeonButton';

const Chat = () => {
  const { teamId } = useParams();

  return (
    <div className="h-[70vh] flex flex-col">
      <h1 className="text-2xl text-accent font-orbitron mb-4">Secure Channel: {teamId}</h1>
      <HUDCard className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2">
            <div className="text-white/50 text-center text-xs">--- ENCRYPTED CONNECTION ESTABLISHED ---</div>
            <div className="bg-white/10 p-2 rounded self-start max-w-[80%]">
                <span className="text-accent text-xs block mb-1">SYSTEM</span>
                Welcome to the trade channel.
            </div>
        </div>
        <div className="flex gap-2">
            <NeonInput placeholder="Type message..." />
            <NeonButton>SEND</NeonButton>
        </div>
      </HUDCard>
    </div>
  );
};

export default Chat;
