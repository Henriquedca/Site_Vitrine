import { useId } from 'react';
import { Text, withHeadingLevel } from '../../editing';
import { ActionLink, Container, Section } from '../_shared/kit';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

function CtaBand({ props }: BlockProps<Props>) {
  const id = useId();
  return (
    <Section labelledBy={id} className="py-16 @3xl:py-24">
      <Container>
        {/* the panel re-maps tokens with its own inverse tone, so buttons and text follow; in dark mode it is raised instead (theme-base) */}
        <div data-kh-tone="inverse" data-kh-dark="raised" className="flex flex-col items-start justify-between gap-8 rounded-kh-xl bg-kh-canvas px-8 py-12 text-kh-ink @3xl:flex-row @3xl:items-center @3xl:px-14 @3xl:py-16">
          <div className="min-w-0 max-w-kh-lead flex-1">
            <div id={id}>
              <Text path={['title']} value={props.title} as="h2" className="text-kh-title font-semibold" />
            </div>
            <Text path={['description']} value={props.description} as="p" className="mt-3 text-kh-lead text-kh-muted" />
          </div>
          <div className="flex max-w-full shrink-0 flex-wrap gap-3">
            <ActionLink path={['primary']} value={props.primary} variant="accent" />
            <ActionLink path={['secondary']} value={props.secondary} variant="ghost" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default withHeadingLevel(CtaBand);
