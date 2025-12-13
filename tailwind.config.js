import fs from 'fs';
import path from 'path';

const tokens = JSON.parse(fs.readFileSync(path.resolve('./design-tokens.json'), 'utf-8'));

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: tokens.colors.bg,
        accent: tokens.colors.accent,
        danger: tokens.colors.danger,
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        spacemono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}