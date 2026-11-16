import { Text, withHeadingLevel } from '../../editing';
import { Container, HAIR_CELL, HAIR_GRID, HairFrame, Icon, Section, useEditing } from '../_shared/kit';
import { Heading, useHeadingId } from '../_shared/c-proof-kit';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

const TWO = '@xl:grid-cols-2';
const THREE = '@xl:grid-cols-2 @4xl:grid-cols-3';
const THREE_EVEN = '@3xl:grid-cols-3'; // a multiple of three never passes through two columns, so no row ends short
const FOUR = '@xl:grid-cols-2 @4xl:grid-cols-4';

/** Column classes for the requested count and the number of items: avoid layouts that leave a short last row where a neighbouring count fits. */
function columnsFor(columns: '2' | '3' | '4', n: number): string {
  const c = Math.min(Number(columns), n);
  if (c <= 1) return '';
  if (c === 2) return TWO;
  if (c === 3) return n % 3 === 0 ? THREE_EVEN : THREE;
  return n % 4 === 0 ? FOUR : n % 3 === 0 ? THREE_EVEN : FOUR;
}

function FeaturesGrid({ props }: BlockProps<Props>) {
  const id = useHeadingId(props.title);
  const hasHeading = !!(props.eyebrow || props.title || props.description);
  const single = props.items.length === 1 && !useEditing();
  const item = (it: Props['items'][number], i: number) => (
    <>
      {it.icon && (
        <span className="mb-5 inline-flex size-10 items-center justify-center rounded-kh border border-kh-line bg-kh-surface text-kh-accent-ink">
          <Icon name={it.icon} />
        </span>
      )}
      <Text path={['items', i, 'title']} value={it.title} as="h3" className="text-kh-heading font-semibold" />
      <Text path={['items', i, 'description']} value={it.description} as="p" className="mt-2 text-kh-body text-kh-muted" />
    </>
  );
  return (
    <Section labelledBy={id}>
      <Container>
        <Heading id={id} eyebrow={props.eyebrow} title={props.title} description={props.description} />
        {/* One card in a wide frame reads as unfinished (launcher r8), so on a real page a lone item follows the lede unboxed. */}
        {single ? (
          <div className={hasHeading ? 'mt-10 max-w-kh-narrow' : 'max-w-kh-narrow'}>{item(props.items[0]!, 0)}</div>
        ) : (
          <HairFrame className={hasHeading ? 'mt-14' : undefined}>
            <ul className={`${HAIR_GRID} ${columnsFor(props.columns ?? '3', props.items.length)}`}>
              {props.items.map((it, i) => (
                <li key={i} className={`${HAIR_CELL} bg-kh-canvas p-8`}>{item(it, i)}</li>
              ))}
            </ul>
          </HairFrame>
        )}
      </Container>
    </Section>
  );
}

export default withHeadingLevel(FeaturesGrid);
