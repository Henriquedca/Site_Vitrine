import { useState } from 'react';
import { cn } from '../lib/utils';

const palette = [
  'bg-kh-accent-soft text-kh-accent-ink',
  'bg-kh-surface-3 text-kh-ink-2',
  'bg-kh-ink text-kh-on-ink',
  'bg-kh-surface-2 text-kh-ink ring-1 ring-inset ring-kh-line-strong',
];
const sizes = { xs: 'size-6 text-[0.625rem]', sm: 'size-8 text-kh-caption', md: 'size-10 text-kh-small', lg: 'size-14 text-kh-heading' };

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
/** Up to two initials from the words of a name, letters and digits only: a note in brackets ('Ann (front desk)') or a stray
 *  symbol never becomes an initial (prototype 13:27: 'A(' on the team list). */
export const initials = (name: string) =>
  name.replace(/\([^)]*\)?/g, ' ').split(/\s+/).map((w) => w.match(/[\p{L}\p{N}]/u)?.[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

export interface AvatarProps {
  /** Whose face this is. Becomes the accessible name and the initials. */
  name: string;
  size?: keyof typeof sizes;
  square?: boolean;
  /** A photo. Falls back to initials if it is missing or fails to load. */
  src?: string;
  srcSet?: string;
  /** Hide it from assistive tech when the name is written next to it. */
  decorative?: boolean;
  className?: string;
}

/** A person or team: a photo, or their initials on a colour picked from the name (the same name always gets the same colour). */
export function Avatar({ name, size = 'md', square, src, srcSet, decorative, className }: AvatarProps) {
  const [failed, setFailed] = useState<string>();
  const shape = square ? 'rounded-kh' : 'rounded-kh-pill';
  const a11y = decorative ? { 'aria-hidden': true as const } : { role: 'img' as const, 'aria-label': name };
  if (src && failed !== src) {
    return (
      <span {...a11y} className={cn('relative inline-flex shrink-0 select-none overflow-hidden bg-kh-surface-3 ring-1 ring-inset ring-kh-line', shape, sizes[size], className)}>
        <img src={src} srcSet={srcSet} alt="" draggable={false} onError={() => setFailed(src)} className="size-full object-cover" />
      </span>
    );
  }
  return (
    <span {...a11y} className={cn('inline-flex shrink-0 select-none items-center justify-center font-semibold', shape, palette[hash(name) % palette.length], sizes[size], className)}>
      {initials(name)}
    </span>
  );
}
