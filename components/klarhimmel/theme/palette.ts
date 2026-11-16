// Palette maths: sRGB hex <-> OKLCH, WCAG contrast, and the deterministic light<->dark derivation used when a Style
// has no explicit `altColors`. Pure; no DOM, no React.

export interface Palette {
  canvas: string; surface: string; ink: string; muted: string; line: string; accent: string; accentFg: string;
  /** What accent-fg sits on (buttons, the accent band) when it is not the accent: a light brand colour (a yellow) that fills as
   *  itself while `accent` is the darker shade text and small marks need on the canvas. Unset: fills use the accent. */
  accentFill?: string;
  /** A second brand colour for a second action, a fill with its own foreground (ettsmart.se's hero: 'Our Locations' in their blue beside
   *  'Book Now' in their burgundy). Used only as a pair, and only where `accent2Fg` on it reads at 4.5:1; never for text or surfaces. */
  accent2?: string;
  accent2Fg?: string;
}
export type PaletteMode = 'light' | 'dark';

type Lch = { l: number; c: number; h: number };

const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const fromLinear = (v: number) => (v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055);

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return [0, 0, 0];
  const n = parseInt(m[1]!, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** WCAG relative luminance of a #rrggbb colour. */
export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => toLinear(v / 255)) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio (1 to 21) of two #rrggbb colours. */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

function hexToOklch(hex: string): Lch {
  const [r, g, b] = hexToRgb(hex).map((v) => toLinear(v / 255)) as [number, number, number];
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { l: L, c: Math.hypot(A, B), h: Math.atan2(B, A) };
}

/** Linear sRGB of an OKLCH colour, unclamped (components outside 0..1 are out of gamut). */
function oklchToLinear({ l, c, h }: Lch): [number, number, number] {
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const inGamut = (rgb: number[]) => rgb.every((v) => v >= -0.0005 && v <= 1.0005);
const hex2 = (v: number) => Math.round(clamp01(fromLinear(clamp01(v))) * 255).toString(16).padStart(2, '0');

/** OKLCH to #rrggbb. Out-of-gamut chroma is reduced (hue and lightness kept). */
function oklchToHex(lch: Lch): string {
  const l = Math.min(1, Math.max(0, lch.l));
  let c = Math.max(0, lch.c);
  let rgb = oklchToLinear({ l, c, h: lch.h });
  if (!inGamut(rgb)) {
    let lo = 0;
    let hi = c;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToLinear({ l, c: mid, h: lch.h }))) lo = mid;
      else hi = mid;
    }
    c = lo;
    rgb = oklchToLinear({ l, c, h: lch.h });
  }
  return `#${rgb.map(hex2).join('')}`;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Steps the lightness of `hex` away from `bg` (lighter on a dark bg, darker on a light one) until contrast >= min. */
function ensureContrast(hex: string, bgs: string[], min: number): string {
  const lch = hexToOklch(hex);
  const dir = luminance(bgs[0]!) < 0.4 ? 1 : -1;
  let out = hex;
  for (let i = 0; i < 120 && bgs.some((bg) => contrast(out, bg) < min); i++) {
    lch.l = clamp(lch.l + dir * 0.01, 0, 1);
    out = oklchToHex(lch);
  }
  return out;
}

/** The accent with its hue and chroma kept, its lightness moved until it reads on `canvas` (text-sized links: 4.5). */
function fitAccent(accent: string, canvas: string, to: PaletteMode): string {
  const lch = hexToOklch(accent);
  // start in the band the target mode favours, then walk away from the canvas until contrast holds
  lch.l = to === 'dark' ? Math.max(lch.l, 0.68) : Math.min(lch.l, 0.55);
  let out = oklchToHex(lch);
  const dir = to === 'dark' ? 1 : -1;
  for (let i = 0; i < 80 && contrast(out, canvas) < 4.5; i++) {
    lch.l = clamp(lch.l + dir * 0.01, 0, 1);
    out = oklchToHex(lch);
  }
  return out;
}

/** Near-black or near-white text for an accent fill, tinted with the canvas hue; whichever contrasts more. */
function accentFgFor(accent: string, canvas: string, original: string): string {
  const { h, c } = hexToOklch(canvas);
  const dark = oklchToHex({ l: 0.18, c: Math.min(c, 0.03), h });
  const light = oklchToHex({ l: 0.99, c: Math.min(c, 0.01), h });
  const prefer = luminance(original) > 0.5 ? light : dark; // keep the original's direction when it passes
  const other = prefer === light ? dark : light;
  return contrast(prefer, accent) >= 4.5 || contrast(prefer, accent) >= contrast(other, accent) ? prefer : other;
}

/**
 * The palette of the opposite mode, derived deterministically. Lightness is inverted in OKLCH for canvas, surface, ink,
 * muted and line (hue and chroma kept, so a warm paper becomes a warm charcoal); the accent keeps its hue and has its
 * lightness walked until it reads on the new canvas. Guarantees (checked by tests): ink/canvas, muted/canvas,
 * muted/surface, accent/canvas and accentFg/accent at 4.5:1 or more.
 */
export function derivePalette(colors: Palette, from: PaletteMode, to: PaletteMode): Palette {
  if (from === to) return { ...colors };
  const cv = hexToOklch(colors.canvas);
  const sf = hexToOklch(colors.surface);
  const ink = hexToOklch(colors.ink);
  const mu = hexToOklch(colors.muted);
  const ln = hexToOklch(colors.line);
  let canvas: Lch;
  let surface: Lch;
  let line: Lch;
  if (to === 'dark') {
    canvas = { ...cv, l: 0.13 + (1 - cv.l) * 0.5 };
    surface = { ...sf, l: canvas.l + 0.04 + Math.abs(sf.l - cv.l) };
    line = { ...ln, l: canvas.l + clamp(Math.abs(ln.l - cv.l) * 1.6, 0.1, 0.26) };
  } else {
    canvas = { ...cv, l: 1 - cv.l * 0.15 };
    surface = sf.l >= cv.l ? { ...sf, l: 1, c: sf.c * 0.3 } : { ...sf, l: canvas.l - clamp(cv.l - sf.l, 0.02, 0.06) };
    line = { ...ln, l: canvas.l - clamp(Math.abs(ln.l - cv.l) * 0.5, 0.05, 0.13) };
  }
  const canvasHex = oklchToHex(canvas);
  const surfaceHex = oklchToHex(surface);
  const inkHex = ensureContrast(oklchToHex({ ...ink, l: clamp(1.1 - ink.l, 0.1, 0.98) }), [canvasHex, surfaceHex], 7);
  const mutedHex = ensureContrast(oklchToHex({ ...mu, l: clamp(1.2 - mu.l, 0.3, 0.8) }), [canvasHex, surfaceHex], 4.5);
  let accent = fitAccent(colors.accent, canvasHex, to);
  let accentFg = accentFgFor(accent, canvasHex, colors.accentFg);
  // a mid-lightness accent may fail with both foregrounds: walk it away from the canvas-side until one passes
  const lch = hexToOklch(accent);
  for (let i = 0; i < 80 && contrast(accentFg, accent) < 4.5; i++) {
    lch.l = clamp(lch.l + (to === 'dark' ? 0.01 : -0.01), 0, 1);
    accent = oklchToHex(lch);
    accentFg = accentFgFor(accent, canvasHex, colors.accentFg);
  }
  return {
    canvas: canvasHex,
    surface: surfaceHex,
    ink: inkHex,
    muted: mutedHex,
    line: oklchToHex(line),
    accent,
    accentFg,
    // a fill with its own foreground reads the same on either canvas, so it carries over as the pair it was given
    ...(colors.accentFill && contrast(colors.accentFill, colors.accentFg) >= 4.5 ? { accentFill: colors.accentFill, accentFg: colors.accentFg } : {}),
    // the second action's fill carries over the same way
    ...(colors.accent2 && colors.accent2Fg && contrast(colors.accent2, colors.accent2Fg) >= 4.5 ? { accent2: colors.accent2, accent2Fg: colors.accent2Fg } : {}),
  };
}

/**
 * How much accent `--kh-accent-ink` keeps (the rest is ink) so accent text and icons read at 4.5:1 on the page and on the muted
 * band (theme-base.css: --kh-tone-muted, 4% ink in light mode, 7% in dark). 78 for most palettes; a pale accent (a bright yellow)
 * gets less, down to 0 (plain ink). A step of 2 keeps the result stable.
 */
export function accentInkMix(c: Palette, mode: 'light' | 'dark'): number {
  const bands = [c.canvas, mixHex(c.ink, mode === 'light' ? 4 : 7, c.canvas)];
  for (let pct = 78; pct > 0; pct -= 2) {
    const ink = mixHex(c.accent, pct, c.ink);
    if (bands.every((bg) => contrast(ink, bg) >= 4.5)) return pct;
  }
  return 0;
}

// sRGB hex <-> OKLab
const linOk = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const gamOk = (v: number) => (v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055);
const toOkLab = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => linOk(v / 255)) as [number, number, number];
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
};
const fromOkLab = ([L, a, b]: [number, number, number]) => {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const rgb = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
  return '#' + rgb.map((v) => Math.round(Math.min(1, Math.max(0, gamOk(v))) * 255).toString(16).padStart(2, '0')).join('');
};
/** Mix two #rrggbb colours the way CSS color-mix(in oklab, a pct%, b) does (for the shades theme-base.css derives at runtime). */
export const mixHex = (a: string, pctA: number, b: string) => {
  const [x, y] = [toOkLab(a), toOkLab(b)];
  return fromOkLab(x.map((v, i) => (v * pctA) / 100 + y[i]! * (1 - pctA / 100)) as [number, number, number]);
};
