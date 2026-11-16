import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd className={cn('inline-flex h-5 min-w-5 items-center justify-center rounded-kh-sm border border-kh-line-strong bg-kh-surface-2 px-1 font-kh-mono text-xs leading-none text-kh-muted', className)}>
      {children}
    </kbd>
  );
}
