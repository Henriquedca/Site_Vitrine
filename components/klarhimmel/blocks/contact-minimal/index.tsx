import { useId } from 'react';
import { Text, withHeadingLevel } from '../../editing';
import { linkClass } from '../../ui/text-link';
import { Container, Eyebrow, LinkedValue, Opt, Section, useEditing } from '../_shared/kit';
import { cn } from '../../lib/utils';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

const COLS = { 0: '', 1: '', 2: '@2xl:grid-cols-2', 3: '@2xl:grid-cols-3' } as const;

function ContactMinimal({ props }: BlockProps<Props>) {
  const id = useId();
  const editing = useEditing();
  const n = Math.min(3, props.details.length) as 0 | 1 | 2 | 3;
  return (
    <Section labelledBy={id}>
      <Container>
        <Eyebrow path={['eyebrow']} value={props.eyebrow} />
        <div id={id}>
          <Text path={['title']} value={props.title} as="h2" className="text-kh-heading font-medium text-kh-muted" />
        </div>
        {(props.email || editing) && (
          <a href={`mailto:${props.email}`} className={cn(linkClass(), 'mt-4 inline-block text-kh-title font-semibold decoration-2 [overflow-wrap:anywhere] @3xl:text-kh-heading')}>
            <Text path={['email']} value={props.email} as="span" placeholder="Email" />
          </a>
        )}
        <Opt path={['note']} value={props.note} className="mt-5 max-w-kh-lead text-kh-lead text-kh-muted" placeholder="Note" />
        {props.details.length > 0 && (
          <dl className={cn('mt-16 grid gap-x-10 gap-y-8 border-t border-kh-line pt-8', COLS[n])}>
            {props.details.map((d, i) => (
              <div key={i}>
                <dt className="text-kh-small font-medium text-kh-muted">
                  <Text path={['details', i, 'label']} value={d.label} as="span" />
                </dt>
                <dd className="mt-1 text-kh-body">
                  <LinkedValue path={['details', i, 'value']} value={d.value} href={d.href} />
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </Section>
  );
}

export default withHeadingLevel(ContactMinimal);
