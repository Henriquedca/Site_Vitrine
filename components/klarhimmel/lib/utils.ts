import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const colors = ['canvas', 'surface', 'surface-2', 'surface-3', 'ink', 'ink-2', 'muted', 'line', 'line-strong', 'accent', 'accent-hover', 'accent-soft', 'accent-ink', 'accent-fg', 'on-ink', 'danger'].map((c) => `kh-${c}`);

/** clsx + tailwind-merge, taught the kh- token names so a later class on a primitive really wins. */
const merge = extendTailwindMerge({
  extend: {
    theme: {
      color: colors,
      text: ['kh-caption', 'kh-small', 'kh-body', 'kh-lead', 'kh-heading', 'kh-title', 'kh-display'],
      radius: ['kh-sm', 'kh', 'kh-lg', 'kh-xl', 'kh-pill'],
      shadow: ['kh-1', 'kh-2', 'kh-3'],
      font: ['kh-display', 'kh-sans', 'kh-mono'],
      spacing: ['kh-section', 'kh-gutter'],
      container: ['kh-page', 'kh-narrow', 'kh-prose', 'kh-lead'],
    },
  },
});

export const cn = (...v: ClassValue[]) => merge(clsx(v));

/**
 * Roving focus for a set of buttons: moves focus from `current` to the previous or next enabled match of `selector`
 * inside `container` for the arrow keys on the given axes (wrapping), and to the first or last for Home and End.
 * Returns true when the key was handled, so the caller can preventDefault.
 */
export function moveFocus(container: HTMLElement, current: Element, key: string, axis: 'horizontal' | 'vertical' | 'both', selector: string): boolean {
  const prevKeys = axis === 'horizontal' ? ['ArrowLeft'] : axis === 'vertical' ? ['ArrowUp'] : ['ArrowLeft', 'ArrowUp'];
  const nextKeys = axis === 'horizontal' ? ['ArrowRight'] : axis === 'vertical' ? ['ArrowDown'] : ['ArrowRight', 'ArrowDown'];
  const all = [...container.querySelectorAll<HTMLElement>(selector)].filter((el) => !(el as HTMLButtonElement).disabled && el.getAttribute('aria-disabled') !== 'true');
  const i = all.indexOf(current as HTMLElement);
  if (i < 0 || all.length === 0) return false;
  let target: HTMLElement | undefined;
  if (prevKeys.includes(key)) target = all[(i - 1 + all.length) % all.length];
  else if (nextKeys.includes(key)) target = all[(i + 1) % all.length];
  else if (key === 'Home') target = all[0];
  else if (key === 'End') target = all[all.length - 1];
  if (!target) return false;
  target.focus();
  return true;
}
