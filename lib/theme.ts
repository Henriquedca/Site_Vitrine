import type { Style } from '@/components/klarhimmel/theme/style';

/**
 * Thème du site (palette B « Lin » : lin clair, encre brun foncé, accent brique).
 * Les couleurs claires sont dans `colors`, les couleurs du mode sombre dans `altColors`.
 */
export const SITE_STYLE: Style = {
  preset: 'Lin',
  mode: 'light',
  colors: {
    canvas: '#F7F2EB',
    surface: '#FFFDF9',
    ink: '#241C17',
    muted: '#685C53',
    line: '#E2D7C8',
    accent: '#A8452B',
    accentFg: '#FFFFFF',
  },
  altColors: {
    canvas: '#1A1513',
    surface: '#241C17',
    ink: '#F2E9DD',
    muted: '#BCAD9D',
    line: '#3B3029',
    accent: '#E0866B',
    accentFg: '#1A1513',
  },
  fonts: { display: 'Bricolage Grotesque', sans: 'Inter', mono: 'JetBrains Mono' },
  buttons: 'accent',
  radius: 12,
  size: 16,
};
