import { Children, forwardRef, isValidElement, useContext, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { EditingContext, Media, Text } from '../editing';
import { Slot } from 'radix-ui';
import { cn } from '../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'soft' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-kh-primary text-kh-on-primary shadow-kh-1 hover:bg-[color-mix(in_oklab,var(--kh-primary)_86%,var(--kh-canvas))] active:bg-[color-mix(in_oklab,var(--kh-primary)_76%,var(--kh-canvas))]',
  secondary: 'bg-kh-surface text-kh-ink border [border-color:var(--kh-edge)] shadow-kh-1 hover:bg-kh-surface-2 active:bg-kh-surface-3',
  ghost: 'border [border-color:var(--kh-ghost-edge)] text-kh-ink-2 hover:bg-kh-surface-2 hover:text-kh-ink active:bg-kh-surface-3',
  soft: 'border [border-color:var(--kh-ghost-edge)] bg-kh-surface-2 text-kh-ink hover:bg-kh-surface-3',
  accent: 'bg-kh-accent-fill text-kh-accent-fg shadow-kh-1 hover:bg-kh-accent-hover',
  // an action that ends or removes something (Cancel subscription): quiet until hovered, never the page's main button
  danger: 'border border-[color-mix(in_oklab,var(--kh-danger)_45%,var(--kh-line))] text-kh-danger hover:bg-[color-mix(in_oklab,var(--kh-danger)_8%,var(--kh-surface))] active:bg-[color-mix(in_oklab,var(--kh-danger)_14%,var(--kh-surface))]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3 gap-1.5 text-kh-small after:absolute after:-inset-y-1 after:inset-x-0 after:content-[""]',
  md: 'min-h-11 px-4 gap-2 text-kh-small',
  lg: 'min-h-12 px-6 gap-2 text-kh-body',
};

/** Class string for anything that should look like a button (an <a>, a router Link). */
export const buttonClass = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', full = false) =>
  cn(
    'relative inline-flex max-w-full shrink-0 select-none items-center justify-center whitespace-normal rounded-kh text-center font-medium no-underline [overflow-wrap:anywhere]', // a label longer than its row wraps instead of widening the page
    'transition-[background-color,border-color,color] duration-(--kh-dur) ease-out',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kh-focus)',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    full && 'w-full',
  );

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconEnd?: ReactNode;
  full?: boolean;
  /** Render the single child (an <a>, a router Link) with button styling instead of a <button>. */
  asChild?: boolean;
}

/**
 * True when what a control says comes from editable text slots and every one of them is empty (an emptied label), with no aria-label to
 * name it. Such a control is not drawn outside the editor: a nameless button or link is worse than none. Controls with static text, or
 * an icon and a fixed aria-label, are never touched.
 */
export function nameEmptied(children: ReactNode, ariaLabel?: string): boolean {
  if (ariaLabel?.trim()) return false;
  let slots = 0;
  let named = false;
  const walk = (n: ReactNode) => {
    Children.forEach(n, (c) => {
      if (typeof c === 'string' || typeof c === 'number') { if (String(c).trim()) named = true; return; }
      if (!isValidElement(c)) return;
      const p = c.props as { value?: unknown; children?: ReactNode; 'aria-label'?: string; 'aria-hidden'?: unknown };
      if (c.type === Text) { slots++; if (typeof p.value === 'string' && p.value.trim()) named = true; return; }
      if (c.type === Media) { const alt = (p.value as { alt?: string } | undefined)?.alt; if (alt?.trim()) named = true; return; } // an image with alt text names its link
      if (p['aria-label']?.trim()) { named = true; return; }
      if (p['aria-hidden']) return;
      walk(p.children);
    });
  };
  walk(children);
  return slots > 0 && !named;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', icon, iconEnd, full, asChild, className, children, type = 'button', ...rest },
  ref,
) {
  const cls = cn(buttonClass(variant, size, full), className);
  const editing = !!useContext(EditingContext);
  if (!editing && !asChild && nameEmptied(children, rest['aria-label'])) return null;
  if (asChild) {
    // Slot merges the classes onto the child; icons around a child's own content are not supported, put them inside the child.
    return <Slot.Root ref={ref} className={cls} {...rest}>{children}</Slot.Root>;
  }
  return (
    <button ref={ref} type={type} className={cls} {...rest}>
      {icon}
      {children}
      {iconEnd}
    </button>
  );
});

/** Only http(s), mailto, tel, site-relative and fragment links survive; anything else (javascript:, data:) becomes '#'. */
export function safeHref(href: string | undefined): string {
  const h = (href ?? '').trim();
  if (/^(https?:\/\/|mailto:|tel:|\/(?!\/)|#|\?)/i.test(h)) return h;
  return h === '' ? '#' : '#';
}

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconEnd?: ReactNode;
  full?: boolean;
}

/** A link that looks like a button. Navigates; use Button for actions. */
export function ButtonLink({ variant = 'primary', size = 'md', icon, iconEnd, full, className, children, href, ...rest }: ButtonLinkProps) {
  const editing = !!useContext(EditingContext);
  if (!editing && nameEmptied(children, rest['aria-label'])) return null;
  return (
    <a href={safeHref(href)} className={cn(buttonClass(variant, size, full), className)} {...rest}>
      {icon}
      {children}
      {iconEnd}
    </a>
  );
}
