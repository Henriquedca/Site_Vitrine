import { Text, withHeadingLevel } from '../../editing';
import { safeHref } from '../../ui/button';
import { Container, Opt, Gate, Mark } from '../_shared/kit';
import { EmailForm, FOCUS } from '../_shared/d-chrome-kit';
import { cn } from '../../lib/utils';
import { spec } from './spec';
import { BrandWordmark } from '../_shared/brand-wordmark';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

const COLS = ['grid-cols-2', 'grid-cols-2', 'grid-cols-2', 'grid-cols-2 @xl:grid-cols-3', 'grid-cols-2 @xl:grid-cols-4'];

function FooterColumns({ props }: BlockProps<Props>) {
  const { newsletter, legalLinks = [], family } = props;
  const hasFamily = !!family && family.links.length > 0;
  const wordmark = props.brandLayout === 'wordmark';
  const newsletterContent = newsletter && <div className="mt-8 max-w-sm">
    <Opt path={['newsletter', 'title']} value={newsletter.title} as="h2" className="text-kh-small font-medium text-kh-ink" placeholder="Newsletter title" />
    <EmailForm path={['newsletter']} placeholder={newsletter.placeholder} submit={newsletter.submit} form={newsletter} className="mt-3" />
    <Text path={['newsletter', 'note']} value={newsletter.note} as="p" className="mt-3 text-kh-caption text-kh-muted" />
  </div>;
  return (
    <footer className="border-t border-kh-line bg-kh-canvas py-16">
      <Container>
        <div className={cn('grid gap-8', !wordmark && '@3xl:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)]')}>
          {!wordmark && <div>
            <p className="flex items-center gap-(--kh-mark-gap) text-kh-heading font-semibold tracking-tight"><Mark mark={props.mark} /><Text path={['brand']} value={props.brand} as="span" /></p>
            <Text path={['tagline']} value={props.tagline} as="p" className="mt-3 max-w-xs text-kh-small text-kh-muted" />
            {newsletterContent}
          </div>}
          <div className={cn('grid w-full gap-x-4 gap-y-8', !wordmark && 'max-w-[40rem]', COLS[Math.min(props.columns.length, 4)])}>
            {props.columns.map((col, i) => (
              <nav key={i} aria-label={col.title}>
                <Text path={['columns', i, 'title']} value={col.title} as="h2" className="text-kh-small font-medium text-kh-ink" />
                <ul className="mt-3 space-y-1">
                  {col.links.map((l, j) => (
                    <Gate key={j} label={l.label}>
                    <li>
                      <a href={safeHref(l.href)} className={cn('inline-flex min-h-11 items-center rounded-kh-sm text-kh-small text-kh-muted transition-colors hover:text-kh-ink', FOCUS)}>
                        <Text path={['columns', i, 'links', j, 'label']} value={l.label} as="span" />
                      </a>
                    </li>
                    </Gate>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        {wordmark && <>
          {newsletterContent}
          <div className="kh-footer-wordmark mt-20 pb-3"><BrandWordmark brand={props.brand} mark={props.mark} /></div>
        </>}
        {hasFamily && (
          <nav aria-label={family.label || 'Family'} className={cn('flex flex-wrap items-center gap-x-1 pb-2', wordmark ? 'mt-6' : 'mt-14')}>
            <Text path={['family', 'label']} value={family.label} as="span" className="me-2 text-kh-caption font-medium text-kh-ink" />
            <ul className="-mx-2 flex flex-wrap">
              {family.links.map((l, i) => (
                <Gate key={i} label={l.label}>
                <li>
                  <a href={safeHref(l.href)} className={cn('inline-flex min-h-11 items-center rounded-kh-sm px-2 text-kh-caption text-kh-muted transition-colors hover:text-kh-ink', FOCUS)}>
                    <Text path={['family', 'links', i, 'label']} value={l.label} as="span" />
                  </a>
                </li>
                </Gate>
              ))}
            </ul>
          </nav>
        )}
        <div className={cn('flex flex-col gap-2 border-t border-kh-line pt-4 @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:gap-6', !wordmark && !hasFamily && 'mt-14')}>
          <Text path={['legal']} value={props.legal} as="p" className="text-kh-caption text-kh-muted" />
          {legalLinks.length > 0 && (
            <nav aria-label="Legal">
              <ul className="-mx-2 flex flex-wrap @3xl:mx-0 @3xl:-mr-2">
                {legalLinks.map((l, i) => (
                  <Gate key={i} label={l.label}>
                  <li>
                    <a href={safeHref(l.href)} className={cn('inline-flex min-h-11 items-center rounded-kh-sm px-2 text-kh-caption text-kh-muted transition-colors hover:text-kh-ink', FOCUS)}>
                      <Text path={['legalLinks', i, 'label']} value={l.label} as="span" />
                    </a>
                  </li>
                  </Gate>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </Container>
    </footer>
  );
}

export default withHeadingLevel(FooterColumns);
