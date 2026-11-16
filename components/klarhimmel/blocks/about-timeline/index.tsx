import { useId } from 'react';
import { Text, withHeadingLevel } from '../../editing';
import { Container, Eyebrow, Section } from '../_shared/kit';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

function AboutTimeline({ props }: BlockProps<Props>) {
  const id = useId();
  return (
    <Section labelledBy={id}>
      <Container width="narrow">
        <Eyebrow path={['eyebrow']} value={props.eyebrow} />
        <div id={id}>
          <Text path={['title']} value={props.title} as="h2" className="text-kh-title font-semibold" />
        </div>
        <Text path={['lead']} value={props.lead} as="p" className="mt-4 max-w-kh-lead text-kh-lead text-kh-muted" />
        <ol className="mt-14 border-t border-kh-line">
          {props.items.map((it, i) => (
            <li key={i} className="grid gap-2 border-b border-kh-line py-8 @xl:grid-cols-[7rem_1fr] @xl:gap-8">
              <Text path={['items', i, 'year']} value={it.year} as="p" className="text-kh-heading font-semibold tabular-nums text-kh-accent-ink" />
              <div>
                <Text path={['items', i, 'title']} value={it.title} as="h3" className="text-kh-heading font-semibold" />
                <Text path={['items', i, 'description']} value={it.description} as="p" className="mt-2 max-w-kh-lead text-kh-body text-kh-muted" />
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export default withHeadingLevel(AboutTimeline);
