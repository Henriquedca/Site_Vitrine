// The visitor's light or dark choice, kept across pages and visits in one key (the one /ws already used). Theme mode="system" and
// the navbar's ThemeToggle read and write it, so a pick on one page holds on the next.
import { useSyncExternalStore } from 'react';
import type { Mode } from './tokens';

export type Appearance = 'system' | Mode;
export const APPEARANCE_KEY = 'kh-appearance';
// The palette variables a Theme sets for the rendered mode; a hand switch drops them so the stylesheet's other mode applies.
export const MODE_VARS = /^--kh-(p-|shadow)/;

const listeners = new Set<() => void>();

export function readAppearance(): Appearance {
  try {
    const v = localStorage.getItem(APPEARANCE_KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
}

export function setAppearance(a: Appearance) {
  try {
    if (a === 'system') localStorage.removeItem(APPEARANCE_KEY);
    else localStorage.setItem(APPEARANCE_KEY, a);
  } catch { /* private mode: the choice lasts for this page only */ }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  addEventListener('storage', l);
  return () => { listeners.delete(l); removeEventListener('storage', l); };
}

/** The stored choice, live (another tab's change too). 'system' on the server. */
export function useAppearance(): Appearance {
  return useSyncExternalStore(subscribe, readAppearance, () => 'system' as Appearance);
}

/** For a page whose Theme does not hydrate (static HTML with an island header): apply the stored choice to every theme root.
 *  Run it as early as the page allows (a module script right after the body opens), so the page does not flash. */
export function applyStoredAppearance(root: ParentNode = document) {
  const a = readAppearance();
  if (a === 'system') return;
  root.querySelectorAll<HTMLElement>('[data-kh-theme]').forEach((el) => {
    el.dataset.khMode = a;
    for (const k of Array.from(el.style)) if (MODE_VARS.test(k)) el.style.removeProperty(k);
  });
}
