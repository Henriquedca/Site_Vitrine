import { Text, withHeadingLevel } from '../../editing';
import { safeHref } from '../../ui/button';
import { linkClass } from '../../ui/text-link';
import { Container, Icon, Opt, Section } from '../_shared/kit';
import { Heading, useHeadingId } from '../_shared/c-proof-kit';
import { cn } from '../../lib/utils';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

const COLS = { 2: '@2xl:grid-cols-2', 3: '@2xl:grid-cols-2 @4xl:grid-cols-3', 4: '@2xl:grid-cols-2 @5xl:grid-cols-4' } as const;

function ContactChannels({ props }: BlockProps<Props>) {
  const id = useHeadingId(props.title);
  const n = Math.min(4, Math.max(2, props.channels.length)) as 2 | 3 | 4;
  return (
    <Section labelledBy={id}>
      <Container>
        <Heading id={id} eyebrow={props.eyebrow} title={props.title} description={props.description} />
        <ul className={cn('mt-12 grid gap-5', COLS[n])}>
          {props.channels.map((c, i) => (
            <li key={i} className="flex flex-col rounded-kh-xl border border-kh-line bg-kh-surface p-7">
              <span className="inline-flex size-11 items-center justify-center rounded-kh-lg bg-kh-accent-soft text-kh-accent-ink">
                <Icon name={c.icon} />
              </span>
              <Text path={['channels', i, 'name']} value={c.name} as="h3" className="mt-5 text-kh-heading font-semibold" />
              <Opt path={['channels', i, 'detail']} value={c.detail} className="mt-1 text-kh-small text-kh-muted" placeholder="Who it is for" />
              <p className="mt-6">
                <a href={safeHref(c.href)} className={cn(linkClass(), 'inline-flex min-h-6 items-center break-all text-kh-body font-medium')}>
                  <Text path={['channels', i, 'value']} value={c.value} as="span" />
                </a>
              </p>
              <Opt path={['channels', i, 'response']} value={c.response} className="mt-auto pt-4 text-kh-caption text-kh-muted" placeholder="Response time" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export default withHeadingLevel(ContactChannels);
