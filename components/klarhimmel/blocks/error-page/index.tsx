import { useId } from 'react';
import { Text, withHeadingLevel } from '../../editing';
import { ActionLink, Container, Section } from '../_shared/kit';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

function ErrorPage({ props }: BlockProps<Props>) {
  const id = useId();
  return (
    <Section labelledBy={id} className="py-24 @3xl:py-36">
      <Container width="narrow" className="text-center">
        <Text path={['code']} value={props.code} as="p" className="text-kh-small font-medium tracking-widest text-kh-accent-ink" />
        <div id={id}>
          <Text path={['title']} value={props.title} as="h1" className="mt-4 text-kh-display font-semibold" />
        </div>
        <Text path={['description']} value={props.description} as="p" className="mx-auto mt-6 max-w-kh-lead text-kh-lead text-kh-muted" />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ActionLink path={['primary']} value={props.primary} />
          <ActionLink path={['secondary']} value={props.secondary} variant="secondary" />
        </div>
      </Container>
    </Section>
  );
}

export default withHeadingLevel(ErrorPage);
