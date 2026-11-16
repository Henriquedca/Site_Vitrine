// Shared brand identity for Klarhimmel applications; app shells own their navigation.
export const klarhimmelStyle = {
  preset: 'Klarhimmel',
  mode: 'light',
  colors: {
    canvas: '#faf9f7',
    surface: '#ffffff',
    ink: '#17171a',
    muted: '#6b6b75',
    line: '#e8e6e1',
    accent: '#1c6ee0',
    accentFg: '#ffffff',
  },
  altColors: {
    canvas: '#0b0b0d',
    surface: '#1a1a1f',
    ink: '#f2f1ee',
    muted: '#8f8f9a',
    line: '#383842',
    accent: '#5b9bf5',
    accentFg: '#0b1a2c',
  },
  fonts: { display: 'Geist', sans: 'Geist', mono: 'Geist Mono' },
  radius: 8,
  size: 16,
} as const;

export const klarhimmelMark = {
  paths: ['M2.325 19A14 14 0 1 1 29.675 19Z', 'M3.083 21.4A14 14 0 0 0 28.917 21.4Z'],
  viewBox: '0 0 32 32',
};

