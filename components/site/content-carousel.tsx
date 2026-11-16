'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Media } from '@/components/klarhimmel/editing';
import { Badge } from '@/components/klarhimmel/ui/badge';
import { ButtonLink } from '@/components/klarhimmel/ui/button';
import { Container, Section, SectionHeader } from '@/components/klarhimmel/blocks/_shared/kit';
import { FOCUS } from '@/components/klarhimmel/blocks/_shared/d-chrome-kit';
import { cn } from '@/components/klarhimmel/lib/utils';
import type { Entry } from '@/lib/collections';
import { entryCard } from './entry-cards';

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  items: Entry[];
  /** Badge des cartes : la catégorie, ou la collection (Outil / Veille) quand elles se mêlent. */
  badge?: 'categorie' | 'collection';
  /** Lien « Voir plus » : en haut à droite et en carte à la fin de la rangée. */
  more: { label: string; href: string };
};

/**
 * Rangée de cartes qui défile vers la droite (glisser au doigt, molette ou flèches), avec une carte « Voir plus » au bout.
 * Mêmes cartes que le bloc Klarhimmel « blog-cards ».
 */
export function ContentCarousel({ eyebrow, title, description, items, badge = 'categorie', more }: Props) {
  const id = useId();
  const trackId = `${id}-rangee`;
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const scroll = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reduce ? 'auto' : 'smooth' });
  };

  const arrow = cn(
    'inline-flex size-11 items-center justify-center rounded-kh-pill border [border-color:var(--kh-edge)] bg-kh-surface text-kh-ink shadow-kh-1 transition-colors hover:bg-kh-surface-2 disabled:pointer-events-none disabled:opacity-40',
    FOCUS,
  );
  // Largeur d'une carte : on voit toujours le début de la suivante, pour montrer que la rangée défile.
  const cardWidth = 'w-[82%] shrink-0 snap-start @2xl:w-[calc((100%-2rem)/2.25)] @5xl:w-[calc((100%-4rem)/3.3)]';

  return (
    <Section labelledBy={id}>
      <Container>
        <div className="flex flex-col justify-between gap-6 @3xl:flex-row @3xl:items-end">
          <SectionHeader id={id} eyebrow={eyebrow} title={title} description={description} />
          <div className="flex shrink-0 items-center gap-2">
            <ButtonLink href={more.href} variant="secondary" iconEnd={<ArrowRight aria-hidden className="size-4" />}>
              Voir plus
            </ButtonLink>
            {/* Les flèches n'apparaissent que si la rangée déborde de l'écran. */}
            {!(edges.start && edges.end) && (
              <>
                <button type="button" className={arrow} onClick={() => scroll(-1)} disabled={edges.start} aria-controls={trackId} aria-label="Précédent">
                  <ChevronLeft aria-hidden className="size-5" />
                </button>
                <button type="button" className={arrow} onClick={() => scroll(1)} disabled={edges.end} aria-controls={trackId} aria-label="Suivant">
                  <ChevronRight aria-hidden className="size-5" />
                </button>
              </>
            )}
          </div>
        </div>
        <ul
          id={trackId}
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
        >
          {items.map((entry) => {
            const card = entryCard(entry, badge);
            return (
              <li key={entry.href} className={cardWidth}>
                <article className="group relative flex h-full flex-col">
                  <Media path={[]} value={card.media} ratio="16 / 10" className="rounded-kh-lg border border-kh-line" />
                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <Badge tone="accent">{card.category}</Badge>
                    <span className="text-kh-caption text-kh-muted">{card.meta}</span>
                  </div>
                  <h3 className="mt-3 text-kh-heading font-semibold">
                    <a
                      href={card.href}
                      className="rounded-kh-sm after:absolute after:inset-0 after:content-[''] hover:underline hover:[text-decoration-color:var(--kh-edge)] hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kh-focus)"
                    >
                      {card.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-kh-small text-kh-muted">{card.excerpt}</p>
                </article>
              </li>
            );
          })}
          <li className={cardWidth}>
            <a
              href={more.href}
              className={cn(
                'flex aspect-[16/10] w-full flex-col items-center justify-center gap-4 rounded-kh-lg border border-dashed [border-color:var(--kh-edge)] bg-kh-surface text-kh-ink transition-colors hover:bg-kh-surface-2',
                FOCUS,
              )}
            >
              <span className="inline-flex size-14 items-center justify-center rounded-kh-pill bg-kh-accent-fill text-kh-accent-fg">
                <ArrowRight aria-hidden className="size-6" />
              </span>
              <span className="text-kh-body font-medium">{more.label}</span>
            </a>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
