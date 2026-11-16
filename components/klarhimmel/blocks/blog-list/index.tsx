import { useId } from 'react';
import { Text, withHeadingLevel } from '../../editing';
import { Badge } from '../../ui/badge';
import { safeHref } from '../../ui/button';
import { ActionLink, Container, Section, SectionHeader } from '../_shared/kit';
import { FOCUS } from '../_shared/d-chrome-kit';
import { cn } from '../../lib/utils';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

function BlogList({ props }: BlockProps<Props>) {
  const id = useId();
  return (
    <Section labelledBy={id}>
      <Container width="narrow" className="@4xl:max-w-kh-page">
        <div className="flex flex-col justify-between gap-6 @3xl:flex-row @3xl:items-end">
          <SectionHeader id={id} eyebrow={props.eyebrow} title={props.title} description={props.description} />
          <ActionLink path={['more']} value={props.more} variant="secondary" size="md" className="self-start @3xl:self-auto" />
        </div>
        <ul className="mt-12 border-t border-kh-line">
          {props.posts.map((p, i) => (
            <li key={i}>
              <article className="group relative grid gap-2 border-b border-kh-line py-7 @3xl:grid-cols-[9rem_1fr_auto] @3xl:items-baseline @3xl:gap-8">
                <Text path={['posts', i, 'date']} value={p.date} as="p" className="text-kh-small text-kh-muted" />
                <div className="min-w-0">
                  <h3 className="text-kh-heading font-semibold">
                    <a href={safeHref(p.href)} className={cn("rounded-kh-sm after:absolute after:inset-0 after:content-[''] group-hover:underline group-hover:[text-decoration-color:var(--kh-edge)] group-hover:underline-offset-4", FOCUS)}>
                      <Text path={['posts', i, 'title']} value={p.title} as="span" />
                    </a>
                  </h3>
                  <Text path={['posts', i, 'excerpt']} value={p.excerpt} as="p" className="mt-2 max-w-kh-lead text-kh-small text-kh-muted" />
                </div>
                <div>
                  <Badge tone="accent">
                    <Text path={['posts', i, 'category']} value={p.category} as="span" />
                  </Badge>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export default withHeadingLevel(BlogList);
