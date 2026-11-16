// Theme root and the Style -> CSS variable mapping. Shades (hover, soft, strong) and the type scale are derived
// in theme.css with color-mix/calc from the seven palette colours, so a tone re-map re-derives them for free.
import { createContext, createElement, useCallback, useContext, useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react';
import { accentInkMix, contrast, derivePalette, type Palette } from './palette';

export { accentInkMix, derivePalette, contrast } from './palette';
export type { Palette } from './palette';

export { FONT_FAMILIES } from './tokens';
export { APPEARANCE_KEY, applyStoredAppearance, readAppearance, setAppearance, useAppearance, type Appearance } from './appearance';
import { setAppearance, useAppearance } from './appearance';
export type { FontFamily, Style, ThemeName, Mode } from './tokens';
import type { FontFamily, Style, Mode, ThemeName } from './tokens';

/** The Klarhimmel brand (portal tokens.css, light and dark). Same values as the canvas's DEFAULT_STYLE. */
export const BRAND_STYLE: Style = {
  preset: 'Klarhimmel',
  mode: 'light',
  colors: { canvas: '#faf9f7', surface: '#ffffff', ink: '#17171a', muted: '#6b6b75', line: '#e8e6e1', accent: '#1c6ee0', accentFg: '#ffffff' },
  altColors: { canvas: '#0b0b0d', surface: '#1a1a1f', ink: '#f2f1ee', muted: '#8f8f9a', line: '#383842', accent: '#5b9bf5', accentFg: '#0b1a2c' },
  fonts: { display: 'Geist', sans: 'Geist', mono: 'Geist Mono' },
  radius: 8,
  size: 16,
};

const SERIF = new Set<FontFamily>(['Instrument Serif', 'Fraunces']);
const MONO = new Set<FontFamily>(['Geist Mono', 'JetBrains Mono']);
/** Narrow display faces (a trade's sign-style headings): set at their own spacing, never tightened. */
const CONDENSED = new Set<FontFamily>(['Oswald']);
const FALLBACK_SANS = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
const FALLBACK_SERIF = "ui-serif, Georgia, 'Times New Roman', serif";
const FALLBACK_MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** CSS font-family value for a FontFamily: the fontsource family name, its metric-matched local fallback (font-fallbacks.css), then a generic one. */
export function fontStack(font: FontFamily): string {
  const name = font === 'Instrument Serif' ? font : `${font} Variable`;
  const fallback = SERIF.has(font) ? FALLBACK_SERIF : MONO.has(font) ? FALLBACK_MONO : FALLBACK_SANS;
  return `'${name}', '${name} Fallback', ${fallback}`;
}

/** The palette a Style renders in `mode`: `colors` for its own mode, else `altColors`, else a derived one. */
export function paletteFor(style: Style, mode: Mode): Palette {
  if (mode === style.mode) return style.colors;
  return style.altColors ?? derivePalette(style.colors, style.mode, mode);
}

/** CSS custom properties for a Style rendered in `mode` (default: the style's own). Palette + shadows follow the mode; fonts, radius and size do not. */
export function styleToCssVars(style: Style, mode: Mode = style.mode): Record<string, string> {
  const c = paletteFor(style, mode);
  const mix = accentInkMix(c, mode);
  return {
    '--kh-p-canvas': c.canvas,
    '--kh-p-surface': c.surface,
    '--kh-p-ink': c.ink,
    '--kh-p-muted': c.muted,
    '--kh-p-line': c.line,
    '--kh-p-accent': c.accent,
    '--kh-p-accent-fg': c.accentFg,
    // only when set, so a palette without one hashes and renders as before (theme-base.css falls back to the accent)
    ...(c.accentFill ? { '--kh-p-accent-fill': c.accentFill } : {}),
    // a second action's fill, only as a pair that reads (>= 4.5:1); otherwise that button keeps its outline (theme-base.css .kh-accent2)
    ...(c.accent2 && c.accent2Fg && contrast(c.accent2, c.accent2Fg) >= 4.5 ? { '--kh-p-accent2': c.accent2, '--kh-p-accent2-fg': c.accent2Fg } : {}),
    '--kh-font-display': fontStack(style.fonts.display),
    '--kh-font-sans': fontStack(style.fonts.sans),
    '--kh-font-mono': fontStack(style.fonts.mono),
    '--kh-radius': `${style.radius}px`,
    '--kh-size': `${style.size}px`,
    // dark surfaces need heavier shadows to read at all
    '--kh-shadow-rgb': mode === 'dark' ? '0 0 0' : '23 23 26',
    '--kh-shadow-a': mode === 'dark' ? '3' : '1',
    // heading tracking scale (theme-base.css): a condensed display face keeps its own spacing; omitted at 1, so other styles are unchanged
    ...(CONDENSED.has(style.fonts.display) ? { '--kh-track': '0' } : {}),
    // headings in capitals keep their own spacing plus a little air (theme-base.css); omitted when as written
    ...(style.headingCase === 'uppercase' ? { '--kh-heading-case': 'uppercase', '--kh-track': '0', '--kh-case-track': '0.04em' } : {}),
    // a pale accent keeps less of itself in accent text so it stays readable; omitted at the CSS default (78%), so most styles are unchanged
    ...(mix < 78 ? { '--kh-accent-ink-mix': `${mix}%` } : {}),
    // primary buttons in the accent fill (theme-base.css --kh-primary), only where accent-fg on it reads (>= 4.5:1) in this mode;
    // otherwise, and by default, the ink button stays
    ...(style.buttons === 'accent' && contrast(c.accentFill ?? c.accent, c.accentFg) >= 4.5 ? { '--kh-primary-ink': '0%' } : {}),
  };
}

/** Stable short hash of everything `styleToCssVars` would emit for a style, both modes: the class a Theme carries. */
export function styleClass(style: Style): string {
  const text = JSON.stringify([styleToCssVars(style, 'light'), styleToCssVars(style, 'dark')]);
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 0x01000193);
  return `kh-s-${(h >>> 0).toString(36)}`;
}

/**
 * The stylesheet for a Style, to be written to a CSS file at build time: `styleToCss(style)` -> `.css`. A <Theme style> carries
 * `styleClass(style)` instead of an inline style attribute, so server-rendered HTML passes a strict CSP (`style-src 'self'`) and
 * the palette is there on first paint and without JavaScript. Both modes are emitted; `data-kh-mode` picks one.
 */
export function styleToCss(style: Style): string {
  const cls = styleClass(style);
  const rule = (mode: Mode) =>
    `.kh-root.${cls}[data-kh-theme='brand'][data-kh-mode='${mode}'] {\n${Object.entries(styleToCssVars(style, mode)).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}\n`;
  return rule('light') + rule('dark');
}

const DARK_QUERY = '(prefers-color-scheme: dark)';
const hasMedia = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function';
/** The OS colour scheme right now. 'light' where there is no window (SSR). */
export function systemMode(): Mode {
  return hasMedia() && window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}
function subscribeSystem(cb: () => void) {
  if (!hasMedia()) return () => {};
  const mq = window.matchMedia(DARK_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

/** The resolved mode of the nearest <Theme>; null outside one. */
const ModeContext = createContext<Mode | null>(null);

/** The OS colour scheme, live (re-renders on change). 'light' on the server. */
export function useSystemMode(): Mode {
  return useSyncExternalStore(subscribeSystem, systemMode, () => 'light' as Mode);
}

export interface ThemeProps {
  theme?: ThemeName;
  /** Per-project overrides of the brand tokens. Ignored by the wireframe theme. */
  style?: Style | null;
  /**
   * 'system' (default): follow `prefers-color-scheme`; the navbar toggle (`kh:theme-toggle`) switches by hand and a later
   * change of the OS setting wins again. 'light' / 'dark' pin the mode and ignore toggles. A 'system' Theme nested in
   * another Theme just follows the outer one (one page, one mode): the toggle event bubbles to the outer Theme.
   */
  mode?: Mode | 'system';
  className?: string;
  children?: ReactNode;
}

/** Theme root: `.kh-root`, the theme and mode attributes, and the style's CSS variables for the rendered mode. */
export function Theme({ theme = 'brand', style, mode = 'system', className, children }: ThemeProps) {
  const ref = useRef<HTMLDivElement>(null);
  // useSyncExternalStore: the first client render already has the OS value (no flash); the server snapshot is 'light'.
  const system = useSystemMode();
  const outer = useContext(ModeContext);
  const inherits = mode === 'system' && outer !== null;
  // The visitor's pick, stored across pages (appearance.ts); only an outermost 'system' Theme reads and writes it.
  const stored = useAppearance();
  const manual = stored === 'system' ? null : stored;
  const pinned = mode !== 'system';

  // A change of the OS setting overrides the manual selection.
  useEffect(() => (pinned || inherits ? undefined : subscribeSystem(() => setAppearance('system'))), [pinned, inherits]);

  // React owns data-kh-mode: handle the toggle event here and cancel it so nothing flips the attribute behind our back.
  const onToggle = useCallback((e: Event) => {
    if (e.defaultPrevented || inherits) return; // a nested Theme closer to the button already took it, or the outer one will
    e.preventDefault();
    const next = (e as CustomEvent<{ mode?: Mode }>).detail?.mode;
    if (!pinned && (next === 'light' || next === 'dark')) setAppearance(next);
  }, [pinned, inherits]);
  useEffect(() => {
    const el = ref.current;
    el?.addEventListener('kh:theme-toggle', onToggle);
    return () => el?.removeEventListener('kh:theme-toggle', onToggle);
  }, [onToggle]);

  const resolvedMode: Mode = pinned ? mode : inherits ? outer : manual ?? system;
  const override = theme === 'brand' && style ? style : undefined;
  const vars = override ? styleToCssVars(override, resolvedMode) : undefined;
  // Without the host's stylesheet (styleToCss) or when the style changes live (an editor), the variables are also set through
  // the CSSOM after mount: element.style.setProperty is not an inline style attribute in the markup, so a strict CSP allows it.
  useEffect(() => {
    const el = ref.current;
    if (!el || !vars) return;
    for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
    return () => { for (const k of Object.keys(vars)) el.style.removeProperty(k); };
  }, [vars && JSON.stringify(vars)]);
  return createElement(
    ModeContext.Provider,
    { value: resolvedMode },
    createElement(
    'div',
    { ref, className: ['kh-root', override && styleClass(override), className].filter(Boolean).join(' '), 'data-kh-theme': theme, 'data-kh-mode': resolvedMode, ...(pinned ? { 'data-kh-mode-pinned': '' } : {}) },
    children,
    ),
  );
}
