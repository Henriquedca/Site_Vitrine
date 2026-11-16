import { useContext, useId } from 'react';
import { HeadingLevelContext, Media, Text, withHeadingLevel } from '../../editing';
import { Badge } from '../../ui/badge';
import { safeHref } from '../../ui/button';
import { ActionLink, Container, Section, SectionHeader } from '../_shared/kit';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

function BlogCards({ props }: BlockProps<Props>) {
  const id = useId();
  const showHeader = props.showHeader !== false;
  const CardHeading = useContext(HeadingLevelContext)?.level === '1' ? 'h2' : 'h3';
  return (
    <Section labelledBy={showHeader ? id : undefined}>
      <Container>
        {showHeader && <div className="flex flex-col justify-between gap-6 @3xl:flex-row @3xl:items-end">
          <SectionHeader id={id} eyebrow={props.eyebrow} title={props.title} description={props.description} />
          <ActionLink path={['more']} value={props.more} variant="secondary" size="md" className="self-start @3xl:self-auto" />
        </div>}
        <ul className={`${showHeader ? 'mt-14 ' : ''}grid gap-8 @2xl:grid-cols-2 @5xl:grid-cols-3`}>
          {props.posts.map((p, i) => (
            <li key={i}>
              <article className="group relative flex h-full flex-col">
                <Media path={['posts', i, 'media']} value={p.media} ratio="16 / 10" className="rounded-kh-lg border border-kh-line" />
                <div className="mt-5 flex items-center gap-3">
                  <Badge tone="accent">
                    <Text path={['posts', i, 'category']} value={p.category} as="span" />
                  </Badge>
                  <Text path={['posts', i, 'meta']} value={p.meta} as="span" className="text-kh-caption text-kh-muted" />
                </div>
                <CardHeading className="mt-3 text-kh-heading font-semibold">
                  <a href={safeHref(p.href)} className="rounded-kh-sm after:absolute after:inset-0 after:content-[''] hover:underline hover:[text-decoration-color:var(--kh-edge)] hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kh-focus)">
                    <Text path={['posts', i, 'title']} value={p.title} as="span" />
                  </a>
                </CardHeading>
                <Text path={['posts', i, 'excerpt']} value={p.excerpt} as="p" className="mt-2 text-kh-small text-kh-muted" />
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export default withHeadingLevel(BlogCards);
