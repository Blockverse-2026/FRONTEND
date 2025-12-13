import { io } from 'socket.io-client';

const MOCK_MODE = true; 

class MockSocket {
  constructor() {
    this.listeners = {};
    console.log('[MockSocket] Initialized');
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  emit(event, data) {
    console.log(`[MockSocket] Emit: ${event}`, data);
    
    setTimeout(() => {
      this.handleMockEvent(event, data);
    }, 500);
  }

  handleMockEvent(event, data) {
    switch (event) {
      case 'joinTeam':
        if (data.teamId && data.password) {
             this.trigger('authResult', { success: true, teamId: data.teamId, message: 'Welcome to the Grid.' });
             this.trigger('roundState', { round: 1, status: 'active' });
        } else {
             this.trigger('authResult', { success: false, message: 'Invalid Credentials.' });
        }
        break;
      case 'submitPuzzleAnswer':
        const correctAnswers = {
            1: "FIREWALL",
            2: "80",
            3: "16",
            4: "SMTP",
            5: "100",
            6: "SECURE",
            7: "PING",
            8: "TCP/IP",
            9: "8",
            10: "WORM"
        };

        const expected = correctAnswers[data.puzzleId];
        const correct = expected && String(data.answer).toUpperCase() === expected;
        
        this.trigger('puzzleResult', { 
          success: correct, 
          puzzleId: data.puzzleId, 
          rewardPoints: correct ? 10 : 0,
          message: correct ? 'Decryption Successful' : 'Access Denied'
        });
        if (correct) {
            this.trigger('tokensUpdated', { tokens: Math.floor(Math.random() * 100) });
        }
        break;
      case 'adminCommand':
        if (data.command === 'finaleTrigger') {
            this.trigger('finaleTrigger', { active: true });
        }
        break;
      default:
        console.warn(`[MockSocket] No handler for event: ${event}`);
    }
  }

  trigger(event, data) {
    console.log(`[MockSocket] Trigger: ${event}`, data);
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }
}

const socket = MOCK_MODE ? new MockSocket() : io('http://localhost:3000');

export default socket;
