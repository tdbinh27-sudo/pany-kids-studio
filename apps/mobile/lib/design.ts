// Design tokens — mirrors apps/web/components/PanyKidsStudio.tsx C constants
// Keep in sync with web colors so both platforms feel identical.

export const C = {
  // Backgrounds
  bgStart: '#FFE5F1',
  bgMid: '#E5F3FF',
  bgEnd: '#FFF9E5',
  paper: '#FFFFFF',
  soft: '#FAF7FF',
  cream: '#FFF9E5',

  // Text
  ink: '#2D1B4E',
  sub: '#6B5B95',
  mute: '#9B8FB8',

  // Accents
  pink: '#FF6B9D',
  sky: '#4DABF7',
  sunny: '#FFD43B',
  mint: '#51CF66',
  purple: '#845EC2',
  coral: '#FF8787',
  gold: '#FFB800',

  // Borders
  border: '#F0E6FF',
};

export const SP = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  pill: 999,
  card: 16,
  modal: 24,
  btn: 14,
};

export const FONT = {
  display: 'System', // Replace with Fredoka after expo-font setup
  body: 'System',   // Replace with Quicksand
  hand: 'System',   // Replace with Caveat
};

export const SHADOW = {
  soft: {
    shadowColor: '#845EC2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  medium: {
    shadowColor: '#845EC2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 4,
  },
};
