import { useId } from 'react';
import { ArrowRight } from 'lucide-react';
import { Media, Text, withHeadingLevel } from '../../editing';
import { safeHref } from '../../ui/button';
import { FOCUS } from '../_shared/d-chrome-kit';
import { ButtonLink } from '../../ui/button';
import { Container, Eyebrow, Section, useEditing } from '../_shared/kit';
import { cn } from '../../lib/utils';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

const TILE_COLS = { 1: '', 2: '@2xl:grid-cols-2', 3: '@2xl:grid-cols-3', 4: '@2xl:grid-cols-2 @5xl:grid-cols-4' } as const;

function HeroMinimal({ props }: BlockProps<Props>) {
  const id = useId();
  const editing = useEditing();
  const center = props.align === 'center';
  const screen = props.height === 'screen';
  const tiles = (props.tiles ?? []).map((tile, i) => ({ tile, i })).filter(({ tile }) => tile.name || editing);
  return (
    <Section labelledBy={id} className={cn(screen ? 'flex min-h-[calc(100svh-var(--kh-nav-height,0px))] flex-col justify-center py-16' : 'pt-20 pb-16 @3xl:pt-32 @3xl:pb-24')}>
      <Container className={cn(center && 'text-center')}>
        <Eyebrow path={['eyebrow']} value={props.eyebrow} />
        <div id={id} className={cn('max-w-4xl', center && 'mx-auto')}>
          <Text path={['title']} value={props.title} as="h1" className="text-balance text-kh-display font-semibold" />
        </div>
        <Text path={['description']} value={props.description} as="p" multiline className={cn('mt-6 max-w-kh-lead text-kh-lead text-kh-muted', center && 'mx-auto')} />
        {(props.primary.label || editing) && (
          <div className={cn('mt-10 flex flex-wrap items-center gap-3', center && 'justify-center')}>
            <ButtonLink href={props.primary.href} variant="primary" size="lg" iconEnd={<ArrowRight aria-hidden className="size-4" />}>
              <Text path={['primary', 'label']} value={props.primary.label} as="span" placeholder="Label" />
            </ButtonLink>
          </div>
        )}
        {tiles.length > 0 && (
          // The businesses this company runs, large and linked, inside the hero band (klarholding 12:56, tiny.com style). A tile
          // shows its picture only when it has one: no placeholder on a real page.
          <ul className={cn('mt-14 grid gap-4 text-left @3xl:mt-20', TILE_COLS[Math.min(4, tiles.length) as 1 | 2 | 3 | 4])}>
            {tiles.map(({ tile, i }) => (
              <li key={i} className="flex">
                <a
                  href={safeHref(tile.href)}
                  className={cn('group flex flex-1 flex-col overflow-hidden rounded-kh-xl border border-kh-line bg-kh-surface transition-[transform,border-color] hover:-translate-y-1 hover:border-kh-accent motion-reduce:transform-none motion-reduce:transition-none', FOCUS)}
                >
                  {(tile.media?.src || editing) && (
                    <div className="border-b border-kh-line">
                      <Media path={['tiles', i, 'media']} value={tile.media ?? { src: '', alt: '' }} ratio="16 / 10" />
                    </div>
                  )}
                  <span className={cn('flex flex-1 flex-col justify-between gap-8 p-6 @3xl:p-7', !(tile.media?.src || editing) && 'min-h-40')}>
                    <Text path={['tiles', i, 'name']} value={tile.name} as="span" className={cn('font-semibold', tiles.length > 3 ? 'text-kh-heading' : 'text-kh-title')} />
                    <span className="flex items-end justify-between gap-4">
                      <Text path={['tiles', i, 'description']} value={tile.description} as="span" className="text-kh-small text-kh-muted" />
                      <ArrowRight aria-hidden className="size-5 shrink-0 text-kh-muted transition-transform group-hover:translate-x-1 group-hover:text-kh-ink motion-reduce:transform-none" />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}

export default withHeadingLevel(HeroMinimal);
