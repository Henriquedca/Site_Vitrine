import { Text, withHeadingLevel } from '../../editing';
import { safeHref } from '../../ui/button';
import { Container, Opt, useEditing } from '../_shared/kit';
import { FOCUS } from '../_shared/d-chrome-kit';
import { cn } from '../../lib/utils';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

function LinkRow({ base, items, label, className }: { base: 'links' | 'social'; items: Props['links']; label: string; className?: string }) {
  const editing = useEditing();
  // A link without a label would be an empty tab stop: drop it (the editor still shows it so it can be filled in).
  const shown = items.map((l, i) => ({ l, i })).filter(({ l }) => l.label || editing);
  if (!shown.length) return null;
  return (
    <nav aria-label={label}>
      <ul className="-mx-3 flex flex-wrap justify-center">
        {shown.map(({ l, i }) => (
          <li key={i}>
            <a href={safeHref(l.href)} className={cn('inline-flex min-h-11 items-center rounded-kh px-3 transition-colors hover:text-kh-ink', FOCUS, className)}>
              <Text path={[base, i, 'label']} value={l.label} as="span" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterCentered({ props }: BlockProps<Props>) {
  const editing = useEditing();
  return (
    <footer className="border-t border-kh-line bg-kh-canvas py-14 text-center">
      <Container className="flex flex-col items-center">
        <Text path={['brand']} value={props.brand} as="p" className="text-kh-heading font-semibold tracking-tight" />
        <Opt path={['tagline']} value={props.tagline} className="mt-2 max-w-kh-lead text-kh-small text-kh-muted" placeholder="Tagline" />
        <div className="mt-8 flex flex-col items-center gap-2 empty:mt-0">
          <LinkRow base="links" items={props.links} label="Footer" className="text-kh-small text-kh-ink" />
          <LinkRow base="social" items={props.social} label="Social" className="text-kh-small text-kh-muted" />
        </div>
        {(props.legal || editing) && (
          <Text path={['legal']} value={props.legal} as="p" className="mt-10 border-t border-kh-line pt-6 text-kh-caption text-kh-muted" />
        )}
      </Container>
    </footer>
  );
}

export default withHeadingLevel(FooterCentered);
