// Helpers for the chrome and conversion blocks (navbars, footers, banners, forms). React lives here, never in spec files.
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from 'react';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { Text, type PropPath } from '../../editing';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Kbd } from '../../ui/kbd';
import { cn } from '../../lib/utils';
import { MODE_VARS, readAppearance, setAppearance } from '../../theme/appearance';
import { FormExtras, useFormProps, type FormSettings } from './form-kit';
import { useEditing, useNamed } from './kit';

export const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kh-focus)';

/** Classes for a text link in a navbar or footer row. */
export const navLinkClass = cn(
  'inline-flex min-h-11 items-center rounded-kh px-3 text-kh-small font-medium text-kh-ink-2 transition-colors hover:bg-kh-surface-2 hover:text-kh-ink',
  // The current page is marked by more than colour: bolder, ink, and an underline in the accent.
  'aria-[current=page]:font-semibold aria-[current=page]:text-kh-ink aria-[current=page]:underline aria-[current=page]:decoration-kh-accent aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8',
  FOCUS,
);

const noSubscribe = () => () => {};
/**
 * False in server-rendered HTML and while hydrating, true once React runs in the browser (and always inside an editor).
 * Controls that do nothing without JavaScript (search trigger, theme toggle) render only when this is true, so a page
 * served without scripts has no dead buttons.
 */
export function useInteractive(): boolean {
  const editing = useEditing();
  return useSyncExternalStore(noSubscribe, () => true, () => false) || editing;
}

/**
 * Disclosure state for a collapsing menu. Escape closes it and returns focus to the button, a click or focus
 * leaving the header closes it, and the editor always sees it open so every label stays reachable.
 */
export function useMenu() {
  const [open, setOpen] = useState(false);
  const editing = useEditing();
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // A <details> menu may have been opened natively before this hydrated: adopt its state.
  useEffect(() => {
    if (detailsRef.current?.open) setOpen(true);
  }, []);

  // Escape and outside clicks are listened for always, and look at the real <details> as well as React's `open`: a menu opened
  // natively (before hydration, or while the state and the element disagree) still closes, and focus returns to its summary.
  useEffect(() => {
    const isOpen = () => open || !!detailsRef.current?.open;
    const close = () => {
      if (detailsRef.current) detailsRef.current.open = false;
      setOpen(false);
    };
    const away = (e: PointerEvent) => {
      if (isOpen() && rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    // One Escape closes one menu, the innermost first: a disclosure open inside this one (a dropdown in the mobile sheet) goes
    // before this one, and a press another menu has already used (defaultPrevented) is left alone.
    const esc = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape' || !isOpen() || e.defaultPrevented || detailsRef.current?.querySelector('details[open]')) return;
      e.preventDefault();
      close();
      if (!document.activeElement || document.activeElement === document.body || rootRef.current?.contains(document.activeElement)) (buttonRef.current ?? summaryRef.current)?.focus();
    };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', away);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  const onBlur = useCallback((e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (open && next && rootRef.current && !rootRef.current.contains(next)) setOpen(false);
  }, [open]);

  return { shown: open || editing, open, setOpen, menuId, buttonRef, summaryRef, detailsRef, rootRef, rootProps: { onBlur } };
}

/** The disclosure button of a collapsing menu. Hide it from the width where the menu is inline with `className`. */
export function MenuButton({ shown, menuId, onToggle, buttonRef, className }: {
  shown: boolean; menuId: string; onToggle: () => void; buttonRef: RefObject<HTMLButtonElement | null>; className?: string;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-expanded={shown}
      aria-controls={menuId}
      aria-label={shown ? 'Close menu' : 'Open menu'}
      onClick={onToggle}
      className={cn('inline-flex size-11 shrink-0 items-center justify-center rounded-kh text-kh-ink transition-colors hover:bg-kh-surface-2', FOCUS, className)}
    >
      {shown ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
    </button>
  );
}

/**
 * The menu as a native <details>: the summary opens and closes it with no JavaScript, and with JavaScript the open state
 * is mirrored into React (Escape, outside click, focus leaving and link clicks close it). `className` goes on the summary
 * (hide it from the width where the menu is inline); `detailsClass` on the <details> (wide layout: keep the content visible).
 * Children are the menu panel. The summary swaps its icon with CSS so it needs no state either.
 */
export function MenuDetails({ shown, onToggle, summaryRef, detailsRef, className, detailsClass, children }: {
  shown: boolean; onToggle: (open: boolean) => void; summaryRef: RefObject<HTMLElement | null>; detailsRef: RefObject<HTMLDetailsElement | null>;
  className?: string; detailsClass?: string; children: ReactNode;
}) {
  return (
    <details
      ref={detailsRef}
      open={shown}
      onToggle={(e) => onToggle(e.currentTarget.open)}
      // A tap on the open panel's empty space (not a link, button or field) closes it, as a tap outside does: on a phone the panel
      // fills the screen, so there is no "outside" left to tap.
      // The path is read as dispatched: a control that swaps its own content on click (ThemeToggle's icon) has detached e.target by now.
      onClick={(e) => {
        const hit = e.nativeEvent.composedPath().some((n) => n instanceof Element && n.matches('summary, a[href], button, input, select, textarea, label, [role], [tabindex]'));
        if (!detailsRef.current?.open || hit) return;
        detailsRef.current.open = false;
        onToggle(false);
      }}
      className={cn('group/menu', detailsClass)}
    >
      <summary
        ref={summaryRef}
        // WebKit exposes a bare <summary> as an unnamed group, so VoiceOver on iPhone never hears "Menu": say it is a button and whether it is open.
        role="button"
        aria-expanded={shown}
        aria-label="Menu"
        className={cn('inline-flex size-11 shrink-0 cursor-pointer list-none items-center justify-center rounded-kh text-kh-ink transition-colors hover:bg-kh-surface-2 [&::-webkit-details-marker]:hidden', FOCUS, className)}
      >
        <Menu aria-hidden className="size-5 group-open/menu:hidden" />
        <X aria-hidden className="hidden size-5 group-open/menu:block" />
      </summary>
      {children}
    </details>
  );
}

/**
 * Search trigger ("Search ⌘K"). It opens nothing itself: it dispatches a bubbling `kh:search` event the host listens for.
 * `compact` keeps the label for screen readers and shows only the icon and hint, until the container is wide enough.
 */
export function SearchTrigger({ path, label, hint, className, compactLabel }: {
  path: PropPath; label: string; hint: string; className?: string; compactLabel?: string;
}) {
  const editing = useEditing();
  const interactive = useInteractive();
  if (!interactive) return null;
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-keyshortcuts="Meta+K Control+K"
      onClick={(e) => e.currentTarget.dispatchEvent(new CustomEvent('kh:search', { bubbles: true }))}
      className={cn(
        'inline-flex min-h-11 items-center gap-2.5 rounded-kh border border-kh-line-strong bg-kh-surface px-3 text-kh-small text-kh-muted transition-colors hover:border-kh-muted hover:text-kh-ink',
        FOCUS,
        className,
      )}
    >
      <Search aria-hidden strokeWidth={1.75} className="size-4 shrink-0" />
      <Text path={[...path, 'label']} value={label} as="span" className={cn(!editing && compactLabel)} />
      {(hint || editing) && <Kbd className="ml-auto"><Text path={[...path, 'hint']} value={hint} as="span" placeholder="Hint" /></Kbd>}
    </button>
  );
}


/**
 * Light/dark toggle. Hydrated apps: click dispatches `kh:theme-toggle` and <Theme> owns `data-kh-mode`. Static sites wire
 * `[data-kh-theme-toggle]` in `/js/theme.js` (persists `kh-theme` in localStorage, follows the OS when unset).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const interactive = useInteractive();
  const ref = useRef<HTMLButtonElement>(null);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>('[data-kh-mode]');
    if (!root) return;
    const read = () => setDark(root.dataset.khMode === 'dark');
    // A static page (no hydrated Theme) opens in the system mode: bring back the visitor's stored pick. A hydrated Theme already
    // resolved it, so this changes nothing there.
    const stored = readAppearance();
    const theme = root.closest<HTMLElement>('[data-kh-theme]') ?? root;
    if (stored !== 'system' && theme.dataset.khMode !== stored && !theme.hasAttribute('data-kh-mode-pinned')) {
      theme.dataset.khMode = stored;
      for (const k of Array.from(theme.style)) if (MODE_VARS.test(k)) theme.style.removeProperty(k);
    }
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ['data-kh-mode'] });
    return () => mo.disconnect();
  }, [interactive]); // hydrated, the first render is the static button (no ref): observe once the live one is there
  const toggle = () => {
    const btn = ref.current;
    if (!btn) return;
    const mode = dark ? 'light' : 'dark';
    const proceed = btn.dispatchEvent(new CustomEvent('kh:theme-toggle', { bubbles: true, cancelable: true, detail: { mode } }));
    const root = btn.closest<HTMLElement>('[data-kh-theme]');
    if (proceed && root) {
      // No hydrated Theme took the event (a static page with an island header): switch here and keep the pick for the next page.
      setAppearance(mode);
      root.dataset.khMode = mode;
      for (const k of Array.from(root.style)) if (MODE_VARS.test(k)) root.style.removeProperty(k);
    }
  };
  if (!interactive) {
    return (
      <button
        type="button"
        data-kh-theme-toggle
        aria-pressed="false"
        aria-label="Dark mode"
        className={cn('inline-flex size-11 shrink-0 items-center justify-center rounded-kh text-kh-ink-2 transition-colors hover:bg-kh-surface-2 hover:text-kh-ink', FOCUS, className)}
      >
        <Moon aria-hidden strokeWidth={1.75} className="kh-theme-icon-light size-5" />
        <Sun aria-hidden strokeWidth={1.75} className="kh-theme-icon-dark size-5" />
      </button>
    );
  }
  return (
    <button
      ref={ref}
      type="button"
      data-kh-theme-toggle
      aria-pressed={dark}
      aria-label="Dark mode"
      onClick={toggle}
      className={cn('inline-flex size-11 shrink-0 items-center justify-center rounded-kh text-kh-ink-2 transition-colors hover:bg-kh-surface-2 hover:text-kh-ink', FOCUS, className)}
    >
      {dark ? <Sun aria-hidden strokeWidth={1.75} className="size-5" /> : <Moon aria-hidden strokeWidth={1.75} className="size-5" />}
    </button>
  );
}

/**
 * One-line email capture: a labelled input and a submit button. Never submits anywhere; the host wires `onSubmit` by
 * listening for the form event. `action` (the block's optional prop) becomes the form's action attribute for the host to read.
 */
export function EmailForm({ path, placeholder, submit, form = {}, className, size = 'md' }: {
  path: PropPath; placeholder: string; submit: string; form?: FormSettings; className?: string; size?: 'md' | 'lg';
}) {
  const editing = useEditing();
  const formProps = useFormProps(form);
  const id = useId();
  const named = useNamed(placeholder); // the placeholder is the field's name: without it the field is not drawn
  if (!named) return null;
  return (
    <form {...formProps} className={cn('@container', className)}>
      <label htmlFor={id} className={editing ? 'mb-1.5 block text-kh-caption text-kh-muted' : 'sr-only'}>
        <Text path={[...path, 'placeholder']} value={placeholder} as="span" />
      </label>
      <div className="flex flex-col gap-2 @sm:flex-row">
        <Input id={id} name="email" type="email" autoComplete="email" required placeholder={placeholder} className="min-w-0 @sm:flex-1" />
        <Button type="submit" size={size} className="@sm:shrink-0">
          <Text path={[...path, 'submit']} value={submit} as="span" />
        </Button>
      </div>
      <FormExtras {...form} />
    </form>
  );
}
