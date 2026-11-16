import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { cn } from '../lib/utils';
import { safeHref } from './button';

/** Link treatment: ink, underlined, visible focus. */
export const linkClass = (className?: string) =>
  cn(
    'rounded-kh-sm text-kh-ink underline [text-decoration-color:var(--kh-edge)] underline-offset-4 transition-colors duration-(--kh-dur) hover:text-kh-accent-ink hover:decoration-current',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kh-focus)',
    className,
  );

export const TextLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(function TextLink({ className, href, ...rest }, ref) {
  return <a ref={ref} href={safeHref(href)} className={linkClass(className)} {...rest} />;
});
