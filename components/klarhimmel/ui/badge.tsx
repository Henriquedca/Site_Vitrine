import { Children, type ReactNode } from 'react';
import { cn } from '../lib/utils';

export type BadgeTone = 'neutral' | 'accent' | 'outline' | 'warning' | 'danger';

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-(--kh-bubble) text-kh-ink-2', // the chat kit's fill: surface-2 is the panel itself in dark, so the pill vanished (Klar Portal 10-22 22:4x)
  accent: 'bg-kh-accent-soft text-kh-accent-ink',
  outline: 'border border-kh-line-strong text-kh-ink-2',
  // a high priority, a date close by: the text token carries the contrast, the tint only marks it
  warning: 'bg-[color-mix(in_oklab,var(--kh-warning)_12%,var(--kh-surface))] text-kh-warning',
  // urgent, overdue, failed
  danger: 'bg-[color-mix(in_oklab,var(--kh-danger)_10%,var(--kh-surface))] text-kh-danger',
};

/** Each run of text in its own span that may shrink, so an over-long word wraps at the row's width; an icon keeps its size. */
function runs(children: ReactNode): ReactNode[] {
  const out: ReactNode[] = [];
  let text: (string | number)[] = [];
  const flush = () => {
    if (text.length) out.push(<span key={`t${out.length}`} className="min-w-0">{text.join('')}</span>);
    text = [];
  };
  for (const c of Children.toArray(children)) {
    if (typeof c === 'string' || typeof c === 'number') text.push(c);
    else { flush(); out.push(c); }
  }
  flush();
  return out;
}

/** Small label. Tinted background, no coloured edges.
 *  break-word, not anywhere: anywhere lets a table size its column to one letter ('leanin / g', Felix 11-04 14:3x). */
export function Badge({ tone = 'neutral', children, className }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex max-w-full shrink-0 items-center gap-1.5 whitespace-normal [overflow-wrap:break-word] rounded-kh-pill px-2.5 py-0.5 text-kh-caption font-medium', tones[tone], className)}>
      {runs(children)}
    </span>
  );
}
