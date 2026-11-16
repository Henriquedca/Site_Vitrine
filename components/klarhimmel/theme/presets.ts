// Theme presets: named token bundles, one switch (Felix 2026-10-10, "make variations easier and faster"). The one list for
// Canvas (setStyle {preset}, get_style, its voice-words mapping), sites and kh-vary. No React: the worker imports it.
// Names are stored in documents: Klarhimmel, Midnight, Editorial, Mono and Studio must never be renamed (kh-canvas).
import type { Style } from './tokens';
import { clone } from '../lib/clone';

export const PRESETS: Record<string, Style> = {
  /** The brand: warm paper, near-black ink, one sky-blue accent, Geist. Same values as BRAND_STYLE. */
  Klarhimmel: {
    preset: 'Klarhimmel',
    mode: 'light',
    colors: { canvas: '#faf9f7', surface: '#ffffff', ink: '#17171a', muted: '#6b6b75', line: '#e8e6e1', accent: '#1c6ee0', accentFg: '#ffffff' },
    altColors: { canvas: '#0b0b0d', surface: '#1a1a1f', ink: '#f2f1ee', muted: '#8f8f9a', line: '#383842', accent: '#5b9bf5', accentFg: '#0b1a2c' },
    fonts: { display: 'Geist', sans: 'Geist', mono: 'Geist Mono' },
    radius: 8,
    size: 16,
  },
  Midnight: {
    preset: 'Midnight',
    mode: 'dark',
    colors: { canvas: '#0b0b14', surface: '#151522', ink: '#ececf4', muted: '#a1a1b8', line: '#2a2a40', accent: '#a78bfa', accentFg: '#0b0b14' },
    altColors: { canvas: '#f7f6fc', surface: '#ffffff', ink: '#15141f', muted: '#5c5a72', line: '#e0ddef', accent: '#6d3fd8', accentFg: '#ffffff' },
    fonts: { display: 'Geist', sans: 'Geist', mono: 'Geist Mono' },
    radius: 10,
    size: 16,
  },
  Editorial: {
    preset: 'Editorial',
    mode: 'light',
    colors: { canvas: '#faf6ee', surface: '#f1ebdd', ink: '#1c1917', muted: '#6b6258', line: '#ddd3bf', accent: '#9a3412', accentFg: '#fff8f0' },
    altColors: { canvas: '#171310', surface: '#231d18', ink: '#f3ece0', muted: '#b3a797', line: '#3b3229', accent: '#f0925f', accentFg: '#1c0f07' },
    fonts: { display: 'Instrument Serif', sans: 'DM Sans', mono: 'JetBrains Mono' },
    radius: 4,
    size: 17,
  },
  Mono: {
    preset: 'Mono',
    mode: 'light',
    colors: { canvas: '#ffffff', surface: '#f2f2f2', ink: '#000000', muted: '#555555', line: '#000000', accent: '#000000', accentFg: '#ffffff' },
    altColors: { canvas: '#000000', surface: '#141414', ink: '#ffffff', muted: '#aaaaaa', line: '#ffffff', accent: '#ffffff', accentFg: '#000000' },
    fonts: { display: 'JetBrains Mono', sans: 'JetBrains Mono', mono: 'JetBrains Mono' },
    radius: 0,
    size: 15,
  },
  Studio: {
    preset: 'Studio',
    mode: 'light',
    colors: { canvas: '#ffffff', surface: '#f1f5f9', ink: '#0f172a', muted: '#566277', line: '#e2e8f0', accent: '#1d4ed8', accentFg: '#ffffff' },
    altColors: { canvas: '#0b1120', surface: '#141c30', ink: '#e6ecf7', muted: '#98a6c0', line: '#26324d', accent: '#7aa2ff', accentFg: '#0b1120' },
    fonts: { display: 'Space Grotesk', sans: 'Space Grotesk', mono: 'JetBrains Mono' },
    radius: 12,
    size: 16,
  },
  /** A trade or clinic that wants calm and trust: deep green on off-white, Inter, soft corners. */
  Forest: {
    preset: 'Forest',
    mode: 'light',
    colors: { canvas: '#f6f7f3', surface: '#ffffff', ink: '#14201a', muted: '#55625a', line: '#dfe4dc', accent: '#1f6b46', accentFg: '#ffffff' },
    altColors: { canvas: '#0d1411', surface: '#16201b', ink: '#e8efea', muted: '#9aa9a0', line: '#2a3830', accent: '#6fcf9b', accentFg: '#0b1a12' },
    fonts: { display: 'Inter', sans: 'Inter', mono: 'JetBrains Mono' },
    radius: 10,
    size: 16,
  },
  /** Hospitality and food: warm sand, a terracotta accent, Fraunces headlines. */
  Sand: {
    preset: 'Sand',
    mode: 'light',
    colors: { canvas: '#fbf7f1', surface: '#ffffff', ink: '#241a12', muted: '#6e6053', line: '#eadfd1', accent: '#a8431c', accentFg: '#ffffff' },
    altColors: { canvas: '#16110c', surface: '#211a13', ink: '#f4ebe0', muted: '#b4a594', line: '#3a2f24', accent: '#f08a5d', accentFg: '#1f0f06' },
    fonts: { display: 'Fraunces', sans: 'DM Sans', mono: 'JetBrains Mono' },
    radius: 6,
    size: 17,
  },
  /** Finance, legal, B2B services: navy ink, a teal accent, tight corners, Inter. */
  Harbor: {
    preset: 'Harbor',
    mode: 'light',
    colors: { canvas: '#f7f9fb', surface: '#ffffff', ink: '#0d1b2a', muted: '#536273', line: '#dde4ec', accent: '#0f6e7a', accentFg: '#ffffff' },
    altColors: { canvas: '#08111b', surface: '#101c29', ink: '#e6eef6', muted: '#93a4b6', line: '#223246', accent: '#5cc6d2', accentFg: '#061218' },
    fonts: { display: 'Inter', sans: 'Inter', mono: 'JetBrains Mono' },
    radius: 4,
    size: 16,
  },
};

export const PRESET_NAMES = Object.keys(PRESETS);

/** A preset by name, case-insensitive; a fresh copy, or undefined. */
export function findPreset(name: string): Style | undefined {
  const key = PRESET_NAMES.find((n) => n.toLowerCase() === name.trim().toLowerCase());
  return key ? clone(PRESETS[key]!) : undefined;
}
