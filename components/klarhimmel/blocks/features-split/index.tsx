import { useId } from 'react';
import { Check } from 'lucide-react';
import { Media, Text, withHeadingLevel } from '../../editing';
import { Container, Section, SectionHeader } from '../_shared/kit';
import { cn } from '../../lib/utils';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

function FeaturesSplit({ props }: BlockProps<Props>) {
  const id = useId();
  return (
    <Section labelledBy={id}>
      <Container>
        <SectionHeader id={id} eyebrow={props.eyebrow} title={props.title} description={props.description} />
        <div className="mt-16 space-y-20 @4xl:space-y-28">
          {props.items.map((item, i) => (
            <div key={i} className="grid items-center gap-10 @4xl:grid-cols-2 @4xl:gap-20">
              <div className={cn(i % 2 === 1 && '@4xl:order-2')}>
                <Text path={['items', i, 'title']} value={item.title} as="h3" className="text-kh-title font-semibold [font-size:calc(var(--kh-size)*1.75)]" />
                <Text path={['items', i, 'description']} value={item.description} as="p" multiline className="mt-4 text-kh-lead text-kh-muted" />
                <ul className="mt-6 space-y-3">
                  {item.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-3 text-kh-body">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-kh-pill bg-kh-accent-soft text-kh-accent-ink">
                        <Check aria-hidden className="size-3" strokeWidth={2.5} />
                      </span>
                      <Text path={['items', i, 'points', j]} value={p} as="span" />
                    </li>
                  ))}
                </ul>
              </div>
              <Media path={['items', i, 'media']} value={item.media} ratio="5 / 4" className="rounded-kh-xl border border-kh-line shadow-kh-2" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default withHeadingLevel(FeaturesSplit);
