import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../lib/utils';

const noSubscribe = () => () => {};

/** Icon button that copies `value` to the clipboard and confirms for a moment. Not rendered in HTML read without JavaScript.
 *  `label` names the button and `copiedLabel` is the confirmation shown and announced, so a Swedish screen passes both. */
export function CopyButton({ value, label = 'Copy', copiedLabel = 'Copied', className }: { value: string; label?: string; copiedLabel?: string; className?: string }) {
  // Copying needs JavaScript: in server-rendered HTML read without scripts there is no button to do nothing.
  const interactive = useSyncExternalStore(noSubscribe, () => true, () => false);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  if (!interactive) return null;
  return (
    <>
      {/* The live region exists before its text changes, so screen readers announce the confirmation; sighted users see the pill on the button. */}
      <span role="status" className="sr-only">{done ? copiedLabel : ''}</span>
      <button
        type="button"
        aria-label={label}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setDone(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setDone(false), 1600);
          } catch {
            /* clipboard unavailable: leave the button as is */
          }
        }}
        className={cn(
          'relative inline-flex size-9 shrink-0 items-center justify-center rounded-kh text-kh-muted transition-colors duration-(--kh-dur) hover:bg-kh-surface-3 hover:text-kh-ink',
          'after:absolute after:-inset-1 after:content-[""] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--kh-focus)',
          className,
        )}
      >
        {done ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
        {done ? (
          <span aria-hidden className="pointer-events-none absolute bottom-full right-0 z-10 mb-1 whitespace-nowrap rounded-kh bg-kh-ink px-2 py-1 text-kh-caption text-kh-canvas">{copiedLabel}</span>
        ) : null}
      </button>
    </>
  );
}
