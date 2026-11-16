// The Style shape and its names, with no DOM and no React, so a worker (Canvas, MCP) can import presets and types
// without typechecking the browser half of style.ts (kh-canvas, 2026-10-10).
import type { Palette } from './palette';

export const FONT_FAMILIES = ['Geist', 'Geist Mono', 'Inter', 'Space Grotesk', 'DM Sans', 'Instrument Serif', 'Fraunces', 'JetBrains Mono', 'Oswald', 'Bricolage Grotesque'] as const;
export type FontFamily = (typeof FONT_FAMILIES)[number];

/** Structurally the canvas's `Style` (src/shared/schema.ts). */
export interface Style {
  preset?: string;
  /** The mode `colors` is authored for. */
  mode: 'light' | 'dark';
  colors: Palette;
  /** The palette for the opposite of `mode`. Absent: derived by `derivePalette`. */
  altColors?: Palette;
  fonts: { display: FontFamily; sans: FontFamily; mono: FontFamily };
  radius: number;
  size: number;
  /** What the primary button is filled with: the ink (default) or the accent, for a brand whose colour is its buttons (a rebuilt site with its own accent). */
  buttons?: 'ink' | 'accent';
  /** Headings in capitals, for a brand that sets them so (a hotel's signage, ettsmart.se). Default: as written. */
  headingCase?: 'none' | 'uppercase';
}

export type ThemeName = 'brand' | 'wireframe';
export type Mode = 'light' | 'dark';
