import { Text, withHeadingLevel } from '../../editing';
import { safeHref } from '../../ui/button';
import { ActionLink, brandName, Container, ctaInMenu, Gate, Opt, useEditing } from '../_shared/kit';
import { FOCUS, MenuDetails, navLinkClass, useMenu } from '../_shared/d-chrome-kit';
import { cn } from '../../lib/utils';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

// UI-49: the links go inline at @3xl (768 px) only when the row's words fit there (the defaults use 58 characters); longer or more
// links stay in the menu until @6xl, as navbar-simple's WIDE does. Class strings are spelled out so Tailwind sees them.
const W = {
  light: { link: '@3xl:w-auto @3xl:px-2.5 @3xl:text-kh-small', row: '@3xl:flex-nowrap', brand: '@3xl:mr-6 @3xl:shrink-0', button: '@3xl:hidden', details: '@3xl:flex @3xl:flex-1 @3xl:shrink @3xl:details-content:contents @3xl:details-content:content-visible', nav: '@3xl:static @3xl:flex @3xl:max-h-none @3xl:flex-1 @3xl:overflow-visible @3xl:border-0 @3xl:bg-transparent @3xl:p-0', list: '@3xl:mx-0 @3xl:flex-row @3xl:gap-1' },
  heavy: { link: '@6xl:w-auto @6xl:px-2.5 @6xl:text-kh-small', row: '@6xl:flex-nowrap', brand: '@6xl:mr-6 @6xl:shrink-0', button: '@6xl:hidden', details: '@6xl:flex @6xl:flex-1 @6xl:shrink @6xl:details-content:contents @6xl:details-content:content-visible', nav: '@6xl:static @6xl:flex @6xl:max-h-none @6xl:flex-1 @6xl:overflow-visible @6xl:border-0 @6xl:bg-transparent @6xl:p-0', list: '@6xl:mx-0 @6xl:flex-row @6xl:gap-1' },
} as const;

function NavbarUtility({ props }: BlockProps<Props>) {
  const { shown, setOpen, menuId, summaryRef, detailsRef, rootRef, rootProps } = useMenu();
  const editing = useEditing();
  const hasLinks = editing || props.links.some((l) => l.label);
  const words = (props.brand ?? '').length + (props.cta?.label ?? '').length + props.links.reduce((n, l) => n + l.label.length, 0);
  const w = props.links.length > 5 || words > 70 ? W.heavy : W.light;
  const linkClass = cn(navLinkClass, 'w-full whitespace-nowrap px-3 text-kh-body', w.link);
  // A long brand and call to action on a phone: the button moves into the menu below @md, only when there is a menu (UI-48).
  const moveCta = hasLinks && ctaInMenu({ ...props, editing });
  const utility = props.utility.map((l, i) => ({ l, i })).filter(({ l }) => l.label || editing);
  return (
    <header ref={rootRef} {...rootProps} className="relative border-b border-kh-line bg-kh-canvas">
      {(props.note || utility.length > 0 || editing) && (
        <div className="border-b border-kh-line bg-kh-surface-2 text-kh-muted">
          <Container className="flex min-h-9 flex-wrap items-center justify-between gap-x-6 gap-y-0 py-1">
            <Opt path={['note']} value={props.note} as="p" className="text-kh-caption" placeholder="Note" />
            {utility.length > 0 && (
              <ul className="-mx-2 ml-auto flex flex-wrap">
                {utility.map(({ l, i }) => (
                  <li key={i}>
                    <a href={safeHref(l.href)} aria-current={props.current && l.href === props.current ? 'page' : undefined} className={cn('inline-flex min-h-8 items-center rounded-kh-sm px-2 text-kh-caption transition-colors hover:text-kh-ink underline-offset-4 aria-[current=page]:font-semibold aria-[current=page]:text-kh-ink aria-[current=page]:underline', FOCUS)}>
                      <Text path={['utility', i, 'label']} value={l.label} as="span" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </div>
      )}
      {/* One row at any width, as navbar-simple (2026-10-19: 'Ironbridge Plumbing' pushed the call to action onto its own row at 390):
          the brand shrinks and breaks onto at most two lines; the menu toggle and the call to action never shrink. The editor still wraps. */}
      <Container className={cn('flex min-h-16 items-center gap-2 py-2', editing ? cn('flex-wrap', w.row) : 'flex-nowrap')}>
        <Gate label={props.brand || (props.wordmark?.src ? props.wordmark.alt : '')}>
          <a href={safeHref(props.brandHref ?? '/')} className={cn('min-w-0 rounded-kh-sm text-kh-heading font-semibold tracking-tight text-kh-ink', w.brand, FOCUS)}>
            {brandName({ brand: props.brand, wordmark: props.wordmark, placeholder: 'Brand', className: 'line-clamp-2 leading-tight hyphens-auto [overflow-wrap:anywhere]' })}
          </a>
        </Gate>
        <span className="mr-auto" aria-hidden />
        {hasLinks && (
        <MenuDetails shown={shown} onToggle={setOpen} summaryRef={summaryRef} detailsRef={detailsRef} className={w.button} detailsClass={cn('shrink-0', w.details, editing && 'order-last basis-full')}>
          <nav
            id={menuId}
            aria-label="Main"
            className={cn(
              'border-b border-kh-line bg-kh-canvas pb-4 pt-2',
              editing ? 'order-last basis-full' : 'absolute inset-x-0 top-full z-10 max-h-[calc(100dvh-4rem)] overflow-y-auto px-kh-gutter',
              w.nav,
            )}
          >
            <ul className={cn('-mx-3 flex flex-col gap-0.5', w.list)}>
              {props.links.map((l, i) => (
                <Gate key={i} label={l.label}>
                  <li>
                    <a href={safeHref(l.href)} aria-current={props.current && l.href === props.current ? 'page' : undefined} onClick={() => setOpen(false)} className={linkClass}>
                      <Text path={['links', i, 'label']} value={l.label} as="span" />
                    </a>
                  </li>
                </Gate>
              ))}
            </ul>
            {moveCta && <ActionLink path={['cta']} value={props.cta} size="md" className="mt-4 w-full @md:hidden" />}
          </nav>
        </MenuDetails>
        )}
        <ActionLink path={['cta']} value={props.cta} size="md" className={cn('shrink-0', moveCta && '@max-md:hidden')} />
      </Container>
    </header>
  );
}

export default withHeadingLevel(NavbarUtility);
