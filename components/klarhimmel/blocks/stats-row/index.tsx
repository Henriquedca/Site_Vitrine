import { useId } from 'react';
import { Text, withHeadingLevel } from '../../editing';
import { Container, HAIR_CELL, HAIR_GRID, HairFrame, Section, SectionHeader } from '../_shared/kit';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

function StatsRow({ props }: BlockProps<Props>) {
  const id = useId();
  return (
    <Section labelledBy={id}>
      <Container>
        <SectionHeader id={id} title={props.title} description={props.description} />
        <HairFrame className="mt-14">
        <dl className={`${HAIR_GRID} @xl:grid-cols-2 @4xl:grid-cols-4`}>
          {props.items.map((item, i) => (
            <div key={i} className={`${HAIR_CELL} flex flex-col-reverse justify-end gap-2 bg-kh-canvas p-8`}>
              <dt className="text-kh-small text-kh-muted">
                <Text path={['items', i, 'label']} value={item.label} as="span" />
              </dt>
              <dd className="text-kh-title font-semibold tabular-nums">
                <Text path={['items', i, 'value']} value={item.value} as="span" />
              </dd>
            </div>
          ))}
        </dl>
        </HairFrame>
      </Container>
    </Section>
  );
}

export default withHeadingLevel(StatsRow);
