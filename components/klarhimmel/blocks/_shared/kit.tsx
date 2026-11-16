// Layout and content pieces shared by blocks. React lives here, never in spec files.
import { initials as initialsOf } from '../../ui/avatar';
import { useContext, type ReactNode } from 'react';
import {
  BookOpen, Box, ChartColumn, Check, Cloud, Code, Compass, Gauge, Globe, Heart, Layers, Leaf, Lock, Mail, Palette, Rocket,
  Search, Settings, ShieldCheck, Sparkles, Star, Users, Zap, Clock, type LucideIcon,
} from 'lucide-react';
import { EditingContext, Media, Text, type PropPath } from '../../editing';
import { ButtonLink, nameEmptied, safeHref, type ButtonSize, type ButtonVariant } from '../../ui/button';
import { linkClass } from '../../ui/text-link';
import { cn } from '../../lib/utils';
import { CopyButton } from '../../ui/copy-button';
import type { IconName } from './schema';
import { BlockModeContext } from '../mode';
import { useInPanel } from '../../lib/placement';

const ICONS: Record<IconName, LucideIcon> = {
  zap: Zap, shield: ShieldCheck, layers: Layers, globe: Globe, sparkles: Sparkles, clock: Clock, code: Code, palette: Palette,
  lock: Lock, chart: ChartColumn, users: Users, mail: Mail, heart: Heart, rocket: Rocket, search: Search, settings: Settings,
  check: Check, star: Star, book: BookOpen, box: Box, cloud: Cloud, compass: Compass, leaf: Leaf, gauge: Gauge,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const C = ICONS[name] ?? Box;
  return <C aria-hidden strokeWidth={1.75} className={cn('size-5', className)} />;
}

/** True inside the canvas editor. Blocks use it to show everything (menus, accordions) so all copy is reachable. */
export const useEditing = () => !!useContext(EditingContext);
/** Whether an empty picture slot is drawn: in the editor and the directory (preview), so the slot shows; never on a real page. */
export const usePictureSlots = () => useEditing() || useContext(BlockModeContext) === 'preview';

/** Page-width column with the responsive gutter. */
export function Container({ className, children, width = 'page' }: { className?: string; children: ReactNode; width?: 'page' | 'narrow' | 'prose' }) {
  const max = width === 'page' ? 'max-w-kh-page' : width === 'narrow' ? 'max-w-kh-narrow' : 'max-w-kh-prose';
  // In an app panel the screen sets the width: the block fills its column.
  if (useInPanel()) return <div className={cn('w-full min-w-0', className)}>{children}</div>;
  return <div className={cn('mx-auto w-full px-kh-gutter', max, className)}>{children}</div>;
}

/** A body section: landmark labelled by its heading id, with the vertical rhythm. */
export function Section({ labelledBy, className, children, bare, flushEnd }: { labelledBy?: string; className?: string; children: ReactNode; /** No band of its own: transparent, nothing clipped (theme-core.css). */ bare?: boolean; /** No bottom padding (a picture sits on the band's edge): the next band of the same tone keeps its top padding (theme-core.css). */ flushEnd?: boolean }) {
  if (useInPanel()) return <section aria-labelledby={labelledBy} data-kh-bare="" className={cn('min-w-0', className)}>{children}</section>;
  return (
    <section aria-labelledby={labelledBy} data-kh-bare={bare ? '' : undefined} data-kh-flush-end={flushEnd ? '' : undefined} className={cn('py-kh-section', flushEnd && 'pb-0', className)}>
      {children}
    </section>
  );
}

/** Text that is optional in the schema: rendered when set, or always while editing so it can be filled in. */
export function Opt({ path, value, as = 'p', className, placeholder, multiline, rich }: { path: PropPath; value: string | undefined; as?: React.ElementType; className?: string; placeholder?: string; multiline?: boolean; rich?: boolean }) {
  const editing = useEditing();
  if (!value && !editing) return null;
  return <Text path={path} value={value ?? ''} as={as} className={className} placeholder={placeholder} multiline={multiline} rich={rich} />;
}

export function Eyebrow({ path, value, className }: { path: PropPath; value: string | undefined; className?: string }) {
  return <Opt path={path} value={value} as="p" className={cn('mb-4 text-kh-small font-medium text-kh-accent-ink', className)} placeholder="Eyebrow" />;
}

/** Section header: eyebrow, h2, description. `id` names the heading for aria-labelledby. */
export function SectionHeader({
  base = [], id, eyebrow, title, description, align = 'left', className,
}: { base?: PropPath; id: string; eyebrow?: string; title: string; description?: string; align?: 'left' | 'center'; className?: string }) {
  if (useInPanel()) {
    // Under the screen's h1: heading size, one line under it, and 1 rem to the content (-mb-6 against the blocks' mt-10).
    return (
      <div className={cn('-mb-6', className)}>
        <Eyebrow path={[...base, 'eyebrow']} value={eyebrow} className="mb-1 text-kh-caption" />
        <div id={id}>
          <Text path={[...base, 'title']} value={title} as="h2" className="font-kh-display text-kh-heading font-semibold" />
        </div>
        <Opt path={[...base, 'description']} value={description} className="mt-1 text-kh-small text-kh-muted" placeholder="Description" />
      </div>
    );
  }
  return (
    <div className={cn('max-w-kh-narrow', align === 'center' && 'mx-auto text-center', className)}>
      <Eyebrow path={[...base, 'eyebrow']} value={eyebrow} />
      <div id={id}>
        <Text path={[...base, 'title']} value={title} as="h2" className="text-kh-title font-semibold" />
      </div>
      <Opt path={[...base, 'description']} value={description} className={cn('mt-4 max-w-kh-lead text-kh-lead text-kh-muted', align === 'center' && 'mx-auto')} placeholder="Description" />
    </div>
  );
}

/** Children only when `label` is non-empty, or inside an editor: the block contract for links (an empty label means no link, never a nameless <a>). */
export function Gate({ label, children }: { label: string | undefined; children: ReactNode }) {
  const editing = useEditing();
  return label || editing ? <>{children}</> : null;
}

/** An element that is not drawn when it says nothing: `<Named as="h2">` around an emptied text slot. Drawn always while editing. */
export function Named({ as: As = 'span', children, ...rest }: { as?: React.ElementType; children?: ReactNode } & Record<string, unknown>) {
  const editing = useEditing();
  if (!editing && nameEmptied(children)) return null;
  return <As {...rest}>{children}</As>;
}

/** A button-looking link whose label is an editable slot. Renders nothing for an empty label outside the editor. */
export function ActionLink({
  path, value, variant = 'primary', size = 'lg', className,
}: { path: PropPath; value: { label: string; href: string }; variant?: ButtonVariant; size?: ButtonSize; className?: string }) {
  const editing = useEditing();
  if (!value.label && !editing) return null;
  return (
    <ButtonLink href={value.href} variant={variant} size={size} className={className}>
      <Text path={[...path, 'label']} value={value.label} as="span" placeholder="Label" />
    </ButtonLink>
  );
}

/** A shell command with a copy button. The command is an editable slot. */
export function CommandBlock({ path, value, className }: { path: PropPath; value: string; className?: string }) {
  return (
    <div className={cn('flex min-h-12 items-center gap-3 rounded-kh-lg border border-kh-line-strong bg-kh-surface py-1.5 pl-4 pr-2 shadow-kh-1', className)}>
      <span aria-hidden className="select-none font-kh-mono text-kh-small text-kh-muted">$</span>
      {/* The command can be longer than the box: it scrolls, so the scroller takes focus (keyboard users can read the rest). */}
      <div role="group" aria-label="Command" className="min-w-0 flex-1 whitespace-pre-wrap [overflow-wrap:anywhere]">
        <Text path={path} value={value} as="code" className="font-kh-mono text-kh-small text-kh-ink" />
      </div>
      <CopyButton value={value} label="Copy command" />
    </div>
  );
}

/** Round avatar: the image slot, or initials when there is no image. */
export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = initialsOf(name);
  return (
    <span aria-hidden className={cn('inline-flex size-11 shrink-0 items-center justify-center rounded-kh-pill bg-kh-accent-soft text-kh-small font-semibold text-kh-accent-ink', className)}>
      {initials}
    </span>
  );
}

/**
 * Hairline grid that stays clean when the last row is short: no filler background, cells draw their own right and
 * bottom borders and the frame clips the overflow. `<HairFrame><ul className={HAIR_GRID + ' @xl:grid-cols-2'}><li className={HAIR_CELL}>`.
 */
export const HAIR_GRID = '-mb-px -mr-px grid';
export const HAIR_CELL = 'border-b border-r border-kh-line';
export function HairFrame({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('overflow-hidden rounded-kh-xl border border-kh-line', className)}>{children}</div>;
}

/** Whether a text that names a control or a field is there: false for an emptied one outside the editor, so the control is not drawn. */
export function useNamed(...texts: (string | undefined)[]): boolean {
  const editing = useEditing();
  return editing || texts.every((t) => !!t?.trim());
}

/** A price stays on one line while it is a price; an over-long text (twice the limit, a sentence) wraps instead of widening the page. */
/** A detail's value (a phone, an e-mail, an address): a link when it has an href (tel:, mailto:, https:), plain text when not. */
export function LinkedValue({ path, value, href }: { path: PropPath; value: string; href?: string }) {
  const editing = useEditing();
  const text = <Text path={path} value={value} as="span" />;
  if (!href || !(value || editing)) return text;
  return <a href={safeHref(href)} className={cn(linkClass(), 'inline-flex min-h-6 items-center [overflow-wrap:anywhere]')}>{text}</a>;
}

export const nowrapIfShort = (s: string | undefined) => ((s ?? '').length <= 24 ? 'whitespace-nowrap' : '[overflow-wrap:anywhere]');

/** The brand name in a navbar, or their logo (`wordmark`) in its place: the name then stays for screen readers only. Called as a
 *  function, not rendered as <BrandName>, so Named/nameEmptied still see the Text slot and drop a link whose name was emptied. With no name the logo's
 *  own alt names the link, and the link stays. */
/** Klar Builder App 11-06 (UI-48): beside a phone's menu button a long brand and a long call to action do not both fit, and the
 *  brand broke onto two lines ('Malmö Surdeg' + 'Order for Saturday' at 360 and 390). Measured on three presets at 320 to 430: a
 *  pair over about 22 characters wraps, a shorter one never does. A navbar with a menu moves such a call to action into the menu
 *  below @md (448 px) and the brand keeps the row. A wordmark counts as 14 characters, a mark or logo adds 2.
 *  The block's ctaInMenu prop overrides the count: false keeps the button in the bar, true always moves it. */
export function ctaInMenu({ brand, wordmark, mark, logo, cta, ctaInMenu: set, editing }: { brand?: string; wordmark?: { src?: string }; mark?: unknown; logo?: { src?: string }; cta?: { label?: string }; ctaInMenu?: boolean; editing: boolean }) {
  if (editing || !cta?.label?.trim()) return false;
  // website 11-06: 'Klarhimmel' + mark + 'Talk to Felix' counts 25 yet fits at 320, so a site that measured its own header says so.
  if (set !== undefined) return set;
  const brandChars = (wordmark?.src?.trim() ? 14 : (brand ?? '').trim().length) + (mark || logo?.src ? 2 : 0);
  return brandChars + cta.label.trim().length > 22;
}

export function brandName({ brand, wordmark, className, placeholder }: { brand: string | undefined; wordmark?: { src: string; alt?: string }; className?: string; placeholder?: string }) {
  if (!wordmark?.src?.trim()) return <Text path={['brand']} value={brand ?? ''} as="span" placeholder={placeholder} className={className} />;
  return (
    <>
      <Media path={['wordmark']} value={{ src: wordmark.src, alt: brand?.trim() ? '' : (wordmark.alt ?? '') }} ratio="auto" className="h-8 w-auto max-w-[min(100%,12rem)] shrink-0 rounded-none bg-transparent @3xl:h-10 [&>img]:h-full [&>img]:w-auto [&>img]:object-contain" />
      <Text path={['brand']} value={brand ?? ''} as="span" className="sr-only" />
    </>
  );
}

/** The brand mark before a wordmark (navbar, footer): a square image about 24px, only when it has a src. */
export function BrandMark({ path, logo }: { path: PropPath; logo?: { src: string; alt?: string } }) {
  if (!logo?.src?.trim()) return null;
  return <Media path={path} value={{ src: logo.src, alt: logo.alt ?? '' }} ratio="1 / 1" className="size-[max(var(--kh-mark-size),var(--kh-mark-min))] shrink-0" />;
}

/** The brand mark (schema `mark`): vector paths in currentColor, else an image; --kh-mark-size tall (1.15em of the brand text), hidden from assistive tech. */
export function Mark({ mark }: { mark?: { paths?: string[]; viewBox?: string; src?: string } }) {
  // --kh-mark-size (1.15em of the brand text), never under --kh-mark-min; square marks come out square
  const size = 'h-[max(var(--kh-mark-size),var(--kh-mark-min))] w-auto shrink-0 self-center';
  const paths = (mark?.paths ?? []).filter((d) => d.trim());
  if (paths.length) {
    const box = /^-?[\d.]+(\s+-?[\d.]+){3}$/.test(mark?.viewBox?.trim() ?? '') ? mark!.viewBox!.trim() : '0 0 24 24';
    return (
      <svg aria-hidden focusable="false" viewBox={box} className={cn(size, 'overflow-visible')} fill="currentColor">
        {paths.map((d, i) => <path key={i} d={d} />)}
      </svg>
    );
  }
  const src = mark?.src?.trim();
  if (src && /^(https:\/\/|\/(?!\/))/.test(src)) return <img aria-hidden alt="" src={src} className={size} />;
  return null;
}
