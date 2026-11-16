import { useId } from 'react';
import { Media, Text, withHeadingLevel } from '../../editing';
import { ActionLink, CommandBlock, Container, Eyebrow, Opt, Section, useEditing } from '../_shared/kit';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

function HeroSplit({ props }: BlockProps<Props>) {
  const id = useId();
  const editing = useEditing();
  return (
    <Section labelledBy={id} className="pt-16 @3xl:pt-24">
      <Container className="grid grid-cols-1 items-center gap-12 @4xl:grid-cols-[1.05fr_1fr] @4xl:gap-16">
        <div>
          <Eyebrow path={['eyebrow']} value={props.eyebrow} />
          <div id={id}>
            <Text path={['title']} value={props.title} as="h1" className="text-kh-title font-semibold" />
          </div>
          <Text path={['description']} value={props.description} as="p" multiline className="mt-6 max-w-kh-lead text-kh-lead text-kh-muted" />
          {(props.command || editing) && <CommandBlock path={['command']} value={props.command ?? ''} className="mt-8 max-w-md" />}
          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink path={['primary']} value={props.primary} />
            <ActionLink path={['secondary']} value={props.secondary} variant="secondary" />
          </div>
          <Opt path={['note']} value={props.note} className="mt-4 text-kh-small text-kh-muted" placeholder="Reassurance line" />
        </div>
        <Media path={['media']} value={props.media} ratio="4 / 3" className="rounded-kh-xl border border-kh-line shadow-kh-3" />
      </Container>
    </Section>
  );
}

export default withHeadingLevel(HeroSplit);
