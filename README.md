# BlockVerse - Genova Realm

A cyberpunk-themed React application for an interactive puzzle experience.

## Features
- **Neon/Cyberpunk UI**: Tailwind-powered design with glitch effects and neon glows.
- **Mock Socket Integration**: Simulates real-time server communication for teams, puzzles, and admin controls.
- **Role-Based Views**:
  - **Player**: Dashboard, Puzzle Rounds (Firewall, Marketplace, Anomaly), Chat.
  - **Admin**: Game control and global finale trigger.
  - **Display**: Leaderboard (placeholder).

## Tech Stack
- React (Vite)
- Tailwind CSS
- React Router DOM
- Socket.io-client (Mocked)

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Access the App**
    - Open `http://localhost:5173` in your browser.

## How to Play (Mock Mode)

### Player Flow
1.  **Landing Page**: Click "Initialize Connection".
2.  **Login**:
    - Team ID: `CYBER_01`
    - Password: `password123`
3.  **Dashboard**: View stats and fragments.
4.  **Round 1 (Firewall)**:
    - Click a red locked block.
    - Solve the puzzle (Hint: Answers are "FIREWALL", "80", or "16").
    - Watch your points increase.

### Admin Flow
1.  Navigate to `/admin`.
2.  Click **TRIGGER FINALE PROTOCOL** to simulate the end-game takeover event.
3.  All open tabs will show the "SYSTEM OVERRIDE" overlay.

## Project Structure
- `src/components`: Reusable UI components (NeonButton, HUDCard, etc.).
- `src/pages`: Route components for each screen.
- `src/data`: JSON seed files for mock data.
- `src/utils/socket.js`: Mock socket implementation.
- `src/context/GameContext.jsx`: Global state management.
