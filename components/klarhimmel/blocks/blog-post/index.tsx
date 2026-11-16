import { useId } from 'react';
import { Media, Text, withHeadingLevel } from '../../editing';
import { Badge } from '../../ui/badge';
import { Container, Section } from '../_shared/kit';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

function BlogPost({ props }: BlockProps<Props>) {
  const id = useId();
  return (
    <Section labelledBy={id} className="pb-kh-section pt-12 @3xl:pt-16">
      <Container width="narrow">
        <article>
          <header className="mx-auto max-w-kh-prose">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="accent">
                <Text path={['category']} value={props.category} as="span" />
              </Badge>
              <Text path={['meta']} value={props.meta} as="span" className="text-kh-small text-kh-muted" />
            </div>
            <div id={id}>
              <Text path={['title']} value={props.title} as="h1" className="mt-5 text-kh-title font-semibold leading-tight text-balance" />
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="size-11 shrink-0 overflow-hidden rounded-kh-pill">
                <Media path={['author', 'photo']} value={props.author.photo} ratio="1 / 1" />
              </div>
              <div>
                <Text path={['author', 'name']} value={props.author.name} as="p" className="text-kh-small font-medium" />
                <Text path={['author', 'role']} value={props.author.role} as="p" className="text-kh-caption text-kh-muted" />
              </div>
            </div>
          </header>
          <div className="mt-12 overflow-hidden rounded-kh-xl border border-kh-line">
            <Media path={['cover']} value={props.cover} ratio="16 / 9" />
          </div>
          <Text path={['body']} value={props.body} as="div" multiline markdown className="mx-auto mt-12 max-w-kh-prose text-[calc(var(--kh-size)*1.125)] leading-[1.7] text-kh-ink-2" />
        </article>
      </Container>
    </Section>
  );
}

export default withHeadingLevel(BlogPost);
