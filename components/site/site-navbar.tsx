/**
 * Menu du site : copie du bloc Klarhimmel « navbar-simple » (même rendu, même comportement sur mobile), avec un seul ajout,
 * `extra`, affiché à côté du bouton principal (ici l'icône LinkedIn), et un nom un peu plus petit sur téléphone
 * (pour qu'il tienne sur une ligne avec le logo). Ce fichier appartient au site : une réinstallation
 * de Klarhimmel ne l'écrase pas. Pour reprendre une évolution du bloc d'origine, comparer avec
 * components/klarhimmel/blocks/navbar-simple/component.tsx.
 */
import '@/components/klarhimmel/blocks/navbar-simple/mega-menu.css';
import { useEffect, type ReactNode } from 'react';
import { ArrowUpRight, ChevronDown, Globe } from 'lucide-react';
import { Text, Media, withHeadingLevel } from '@/components/klarhimmel/editing';
import { safeHref } from '@/components/klarhimmel/ui/button';
import { ActionLink, BrandMark, brandName, Container, ctaInMenu as ctaMoves, useEditing, Gate, Named, Mark } from '@/components/klarhimmel/blocks/_shared/kit';
import { FOCUS, MenuDetails, SearchTrigger, ThemeToggle, navLinkClass, useMenu } from '@/components/klarhimmel/blocks/_shared/d-chrome-kit';
import { cn } from '@/components/klarhimmel/lib/utils';
// Type only: the component never runs the schema, so a page that renders the header (./component) ships no zod.
import type { spec } from '@/components/klarhimmel/blocks/navbar-simple/spec';
import type { BlockProps } from '@/components/klarhimmel/blocks/types';
import type { z } from 'zod';

type Props = z.infer<typeof spec.schema>;

// Many links plus the extras need more room before they sit inline. Class strings are spelled out so Tailwind sees them.
const WIDE = {
  light: {
    brand: 'mr-auto @3xl:mr-4',
    secondaryInline: 'hidden @3xl:inline-flex',
    secondaryMobile: '@3xl:hidden',
    productPanel: '@3xl:absolute @3xl:end-0 @3xl:top-full @3xl:mt-2 @3xl:w-80 @3xl:border @3xl:shadow-kh-2',
    details: '@3xl:order-1 @3xl:flex @3xl:flex-1 @3xl:details-content:contents @3xl:details-content:content-visible',
    panel: '@3xl:static @3xl:order-1 @3xl:flex @3xl:max-h-none @3xl:flex-1 @3xl:basis-auto @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:gap-3 @3xl:overflow-visible @3xl:border-0 @3xl:bg-transparent @3xl:p-0',
    list: '@3xl:mx-0 @3xl:flex-row @3xl:gap-1',
    link: '@3xl:w-auto @3xl:px-2.5 @3xl:text-kh-small',
    tools: '@3xl:w-auto @3xl:flex-nowrap @3xl:border-0 @3xl:pt-0',
    full: '@3xl:w-auto',
    compact: '',
    button: '@3xl:hidden',
    toggle: '@3xl:ml-0',
    row: '@3xl:flex-nowrap',
    arrow: '',
    cta: '@3xl:order-2',
    /** The actions row twice, one per width, so the DOM order is the visual order: before the menu button when it shows, after the navigation when the links sit inline. */
    actionsNarrow: '@3xl:hidden',
    actionsWide: 'hidden @3xl:flex',
    link2: '@3xl:mx-0',
  },
  products: {
    brand: 'mr-auto @5xl:mr-4',
    secondaryInline: 'hidden @5xl:inline-flex',
    secondaryMobile: '@5xl:hidden',
    productPanel: '@5xl:absolute @5xl:end-0 @5xl:top-full @5xl:mt-2 @5xl:w-80 @5xl:border @5xl:shadow-kh-2',
    details: '@5xl:order-1 @5xl:flex @5xl:flex-1 @5xl:details-content:contents @5xl:details-content:content-visible',
    panel: '@5xl:static @5xl:order-1 @5xl:flex @5xl:max-h-none @5xl:flex-1 @5xl:basis-auto @5xl:flex-row @5xl:items-center @5xl:justify-between @5xl:gap-3 @5xl:overflow-visible @5xl:border-0 @5xl:bg-transparent @5xl:p-0',
    list: '@5xl:mx-0 @5xl:flex-row @5xl:gap-1',
    link: '@5xl:w-auto @5xl:px-2.5 @5xl:text-kh-small',
    tools: '@5xl:w-auto @5xl:flex-nowrap @5xl:border-0 @5xl:pt-0',
    full: '@5xl:w-auto',
    compact: '',
    button: '@5xl:hidden',
    toggle: '@5xl:ml-0',
    row: '@5xl:flex-nowrap',
    arrow: '',
    cta: '@5xl:order-2',
    /** The actions row twice, one per width, so the DOM order is the visual order: before the menu button when it shows, after the navigation when the links sit inline. */
    actionsNarrow: '@5xl:hidden',
    actionsWide: 'hidden @5xl:flex',
    link2: '@5xl:mx-0',
  },
  heavy: {
    brand: 'mr-auto @6xl:mr-3',
    secondaryInline: 'hidden @6xl:inline-flex',
    secondaryMobile: '@6xl:hidden',
    productPanel: '@6xl:absolute @6xl:end-0 @6xl:top-full @6xl:mt-2 @6xl:w-80 @6xl:border @6xl:shadow-kh-2',
    details: '@6xl:order-1 @6xl:flex @6xl:flex-1 @6xl:details-content:contents @6xl:details-content:content-visible',
    panel: '@6xl:static @6xl:order-1 @6xl:flex @6xl:max-h-none @6xl:flex-1 @6xl:basis-auto @6xl:flex-row @6xl:items-center @6xl:justify-between @6xl:gap-3 @6xl:overflow-visible @6xl:border-0 @6xl:bg-transparent @6xl:p-0',
    list: '@6xl:mx-0 @6xl:flex-row @6xl:gap-1',
    link: '@6xl:w-auto @6xl:px-2.5 @6xl:text-kh-small',
    tools: '@6xl:w-auto @6xl:flex-nowrap @6xl:border-0 @6xl:pt-0',
    full: '@6xl:w-auto',
    compact: '@6xl:sr-only',
    button: '@6xl:hidden',
    toggle: '@6xl:ml-0',
    row: '@6xl:flex-nowrap',
    arrow: '@6xl:hidden',
    cta: '@6xl:order-2',
    /** The actions row twice, one per width, so the DOM order is the visual order: before the menu button when it shows, after the navigation when the links sit inline. */
    actionsNarrow: '@6xl:hidden',
    actionsWide: 'hidden @6xl:flex',
    link2: '@6xl:mx-0',
  },
} as const;

function ProductLinks({ products, panelClass, linkClass, current, onPick, path = ['products'] }: {
  products: NonNullable<Props['products']>; panelClass: string; linkClass: string; current?: string; onPick: () => void; path?: (string | number)[];
}) {
  const { shown, setOpen, rootRef, rootProps, detailsRef, summaryRef } = useMenu();
  return <Gate label={products.label}>
    <li ref={el => { rootRef.current = el; }} {...rootProps} className="relative" onKeyDown={e => {
      if (e.key === 'Escape' && (shown || detailsRef.current?.open)) {
        e.preventDefault(); e.stopPropagation();
        if (detailsRef.current) detailsRef.current.open = false;
        setOpen(false); summaryRef.current?.focus();
      }
    }}>
      <details name="kh-nav-dropdowns" ref={detailsRef} open={shown} onToggle={e => setOpen(e.currentTarget.open)} className={cn("group/products", products.layout === "mega" && "kh-mega-menu")}>
        <summary ref={summaryRef} className={cn(navLinkClass, 'w-full cursor-pointer list-none gap-1.5 whitespace-nowrap px-3 text-kh-body [&::-webkit-details-marker]:hidden', linkClass)}>
          <Text path={[...path, 'label']} value={products.label} as="span" />
          <ChevronDown aria-hidden className="size-4 transition-transform group-open/products:rotate-180" />
        </summary>
        <ul className={cn('z-30 w-full max-w-[calc(100cqw-2rem)] rounded-kh-lg border-kh-line bg-kh-canvas p-2', products.layout !== 'mega' && 'space-y-1', panelClass)}>
          {(products.items ?? []).map((p,i) => <Gate key={i} label={p.label}><li>
            <a href={safeHref(p.href)} aria-current={current === p.href ? 'page' : undefined} onClick={() => { setOpen(false); onPick(); }} className={cn('flex min-h-11 flex-col gap-1 rounded-kh px-3 py-3 text-kh-small text-kh-ink hover:bg-kh-surface-2', FOCUS)}>
              {/* decorative: the label and description beside it name the link, so the picture has no alt of its own */}
              {p.media && <Media path={[...path,'items',i,'media']} value={{ ...p.media, alt: '' }} ratio="16 / 10" />}
              <span className="kh-dropdown-text flex min-w-0 flex-col gap-1">
              <span className="flex flex-wrap items-center gap-2 font-medium"><Text path={[...path,'items',i,'label']} value={p.label} as="span" />{p.status && <Text path={[...path,'items',i,'status']} value={p.status} as="span" className="rounded-kh-pill border border-kh-line px-2 py-0.5 text-kh-caption font-normal text-kh-muted" />}</span>
              <Text path={[...path,'items',i,'description']} value={p.description} as="span" className="whitespace-normal text-kh-caption font-normal text-kh-muted" />
              </span>
            </a>
          </li></Gate>)}
        </ul>
      </details>
    </li>
  </Gate>;
}

function NavbarSimple({ props, extra }: BlockProps<Props> & { extra?: ReactNode }) {
  const { shown, setOpen, menuId, summaryRef, detailsRef, rootRef, rootProps } = useMenu();
  const editing = useEditing();
  const { search, secondary, secondaryCta, themeToggle, current, lang } = props;
  const w = (props.links.length + (props.products ? 1 : 0) + (props.dropdowns?.length ?? 0)) > 5 || search || secondary ? WIDE.heavy : props.products || props.dropdowns?.length ? WIDE.products : WIDE.light;
  // A long brand and call to action: the button moves into the menu below @md (UI-48, see ctaInMenu in kit).
  const ctaInMenu = ctaMoves({ ...props, editing });
  const hasTools = !!(ctaInMenu || (secondary && (secondary.label || editing)) || secondaryCta?.label || search || themeToggle || (lang && (lang.label || editing)));
  // Overlay: the header says when it sits at the top (a static page that never runs this sets the attribute itself).
  useEffect(() => {
    const header = rootRef.current;
    if (!props.overlay || !header) return;
    const sync = () => header.toggleAttribute('data-kh-at-top', window.scrollY <= 8);
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, [props.overlay, rootRef]);
  // The mobile sheet (the Menu summary is showing): while it is open, Tab and Shift+Tab cycle inside the header, focus that lands
  // outside comes back to the Menu button, and the page behind does not scroll. Inline (wide) nothing of this applies.
  const isSheet = () => !!summaryRef.current && getComputedStyle(summaryRef.current).display !== 'none';
  useEffect(() => {
    const header = rootRef.current;
    if (!shown || editing || !header) return;
    const root = document.documentElement;
    const lock = () => root.classList.toggle('kh-menu-open', isSheet());
    lock();
    const focusables = () => [...header.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), summary, input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter((el) => {
        if (!el.getClientRects().length || el.closest('[inert]')) return false;
        const shut = el.closest('details:not([open])'); // inside a closed disclosure only its own summary can be reached
        return !shut || (el.tagName === 'SUMMARY' && el.parentElement === shut && !shut.parentElement?.closest('details:not([open])'));
      });
    const tab = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Tab' || !isSheet()) return;
      const all = focusables();
      if (!all.length) return;
      // Every press is moved here, not only at the ends: browsers differ in what Tab reaches (Safari skips links by default),
      // and a native step out of the header would pass through the page first.
      e.preventDefault();
      const i = all.indexOf(document.activeElement as HTMLElement);
      const next = i < 0 ? (e.shiftKey ? all.length - 1 : 0) : (i + (e.shiftKey ? -1 : 1) + all.length) % all.length;
      all[next]!.focus();
    };
    const back = (e: FocusEvent) => { if (isSheet() && e.target instanceof Node && !header.contains(e.target)) summaryRef.current?.focus(); };
    document.addEventListener('keydown', tab);
    document.addEventListener('focusin', back);
    window.addEventListener('resize', lock);
    return () => {
      root.classList.remove('kh-menu-open');
      document.removeEventListener('keydown', tab);
      document.removeEventListener('focusin', back);
      window.removeEventListener('resize', lock);
    };
  }, [shown, editing, rootRef, summaryRef]); // eslint-disable-line react-hooks/exhaustive-deps
  // In the sheet, focus leaving the header is brought back (above), so blur does not close it; inline it closes as before.
  const onBlur = (e: React.FocusEvent) => { if (!isSheet()) rootProps.onBlur(e); };
  const actions = (className: string, narrow = false) => (
    <div className={cn('flex shrink-0 items-center gap-2', className)}>
      {extra}
      {secondaryCta && <ActionLink path={['secondaryCta']} value={secondaryCta} variant="secondary" size="md" className={w.secondaryInline} />}
      <ActionLink path={['cta']} value={props.cta} size="md" className={narrow && ctaInMenu ? '@max-md:hidden' : undefined} />
    </div>
  );
  return (
    <header ref={rootRef} onBlur={onBlur} data-kh-sticky={props.sticky ? '' : undefined} data-kh-overlay={props.overlay ? '' : undefined} className="kh-navbar-simple relative border-b border-kh-line bg-kh-canvas">
      {/* One row at any width (portal c-20261016-1348: a long business name pushed the menu onto its own row at 390): the brand
          shrinks and its name breaks onto at most two lines; the editor still wraps, for its full-width menu row. */}
      <Container className={cn('kh-navbar-container flex min-h-16 items-center gap-2 py-2', editing ? 'flex-wrap' : 'flex-nowrap', w.row)}>
        <Named as="a" href={safeHref(props.brandHref ?? '/')} className={cn('inline-flex min-w-0 items-center gap-(--kh-mark-gap) rounded-kh-sm text-[1.0625rem] @md:text-kh-heading font-semibold tracking-tight text-kh-ink', FOCUS, w.brand)}>
          {!props.wordmark?.src && <Mark mark={props.mark} />}
          {!props.wordmark?.src && <BrandMark path={['logo']} logo={props.logo} />}
          {brandName({ brand: props.brand, wordmark: props.wordmark, className: 'line-clamp-2 min-w-0 leading-tight hyphens-auto [overflow-wrap:anywhere]' })}
        </Named>
        {actions(w.actionsNarrow, true)}
        <MenuDetails shown={shown} onToggle={setOpen} summaryRef={summaryRef} detailsRef={detailsRef} className={w.button} detailsClass={cn(w.details, editing && 'order-last basis-full')}>
        <div
          id={menuId}
          onClick={(e) => { if ((e.target as Element).closest('a[href]')) setOpen(false); }}
          className={cn(
            'flex flex-col gap-4 border-b border-kh-line bg-kh-canvas pb-5 pt-2',
            editing ? 'order-last basis-full' : 'absolute inset-x-0 top-full z-10 max-h-[calc(100dvh-4rem)] overflow-y-auto px-kh-gutter',
            w.panel,
          )}
        >
          <nav aria-label="Main">
            <ul className={cn('-mx-3 flex flex-col gap-0.5', w.list)}>
              {props.dropdowns?.map((dropdown, i) => <ProductLinks key={i} products={dropdown} path={['dropdowns', i]} panelClass={w.productPanel} linkClass={w.link} current={current} onPick={() => setOpen(false)} />)}
              {props.links.map((l, i) => (
                <Gate key={i} label={l.label}>
                <li>
                  <a href={safeHref(l.href)} aria-current={current && l.href === current ? 'page' : undefined} onClick={() => setOpen(false)} className={cn(navLinkClass, 'w-full whitespace-nowrap px-3 text-kh-body', w.link)}>
                    <Text path={['links', i, 'label']} value={l.label} as="span" />
                  </a>
                </li>
                </Gate>
              ))}
              {props.products && <ProductLinks products={props.products} panelClass={w.productPanel} linkClass={w.link} current={current} onPick={() => setOpen(false)} />}
            </ul>
          </nav>
          {hasTools && (
            <div className={cn('flex flex-wrap items-center gap-2 border-t border-kh-line pt-4', w.tools)}>
              {ctaInMenu && <ActionLink path={['cta']} value={props.cta} size="md" className="w-full @md:hidden" />}
              {secondaryCta && <ActionLink path={['secondaryCta']} value={secondaryCta} variant="secondary" size="md" className={cn('w-full', w.secondaryMobile)} />}
              {search && <SearchTrigger path={['search']} label={search.label} hint={search.hint} compactLabel={w.compact} className={cn('w-full', w.full)} />}
              {secondary && (
                <Gate label={secondary.label}>
                <a href={safeHref(secondary.href)} className={cn(navLinkClass, '-mx-3 gap-1 whitespace-nowrap', w.link2)}>
                  <Text path={['secondary', 'label']} value={secondary.label} as="span" />
                  <ArrowUpRight aria-hidden strokeWidth={1.75} className={cn('size-4 text-kh-muted', w.arrow)} />
                </a>
                </Gate>
              )}
              {lang && (
                <Gate label={lang.label}>
                <a href={safeHref(lang.href)} hrefLang={lang.hreflang || undefined} lang={lang.hreflang || undefined} className={cn(navLinkClass, '-mx-3 gap-1.5 whitespace-nowrap', w.link2)}>
                  <Globe aria-hidden strokeWidth={1.75} className="size-4 text-kh-muted" />
                  <Text path={['lang', 'label']} value={lang.label} as="span" />
                </a>
                </Gate>
              )}
              {themeToggle && <ThemeToggle className={cn('ml-auto', w.toggle)} />}
            </div>
          )}
        </div>
        </MenuDetails>
        {actions(cn(w.actionsWide, w.cta))}
      </Container>
    </header>
  );
}

export const SiteNavbar = withHeadingLevel(NavbarSimple);
