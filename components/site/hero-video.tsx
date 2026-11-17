'use client';

import { useEffect, useId, useRef } from 'react';
import { Text } from '@/components/klarhimmel/editing';
import { ActionLink, Container, Eyebrow, Section } from '@/components/klarhimmel/blocks/_shared/kit';
import { Badge } from '@/components/klarhimmel/ui/badge';

type Link = { label: string; href: string };

export type HeroVideoProps = {
  eyebrow: string;
  /** Pastilles au-dessus du titre (les spécialités). Vide : rien n'est affiché. */
  chips?: string[];
  title: string;
  description: string;
  primary: Link;
  secondary: Link;
  /** Chiffres clés sous les boutons (3 de préférence). Vide : rien n'est affiché. */
  stats?: { value: string; label: string }[];
  video: {
    /** La même vidéo, sans son, en deux formats : WebM (plus léger) et MP4 (pour les navigateurs qui ne lisent pas le WebM). */
    webm: string;
    mp4: string;
    /** Image fixe : affichée au chargement et à la place de la vidéo si le visiteur a réduit les animations. */
    poster: string;
    /** Description de ce que montre la vidéo, pour les lecteurs d'écran. */
    alt: string;
  };
};

/**
 * Accroche de l'accueil : même mise en page que le bloc Klarhimmel « hero-split », avec une vidéo en boucle
 * à la place de l'image. Ce composant appartient au site (une réinstallation de Klarhimmel ne l'écrase pas).
 */
export function HeroVideo({ props }: { props: HeroVideoProps }) {
  const id = useId();
  return (
    <Section labelledBy={id} className="pt-16 @3xl:pt-24">
      <Container className="grid grid-cols-1 items-center gap-12 @4xl:grid-cols-[1.05fr_1fr] @4xl:gap-16">
        <div>
          <Eyebrow path={['eyebrow']} value={props.eyebrow} />
          {props.chips && props.chips.length > 0 && (
            <ul className="mb-7 flex flex-wrap gap-2.5" aria-label="Spécialités">
              {props.chips.map((chip) => (
                <li key={chip}>
                  <Badge tone="accent" className="px-3.5 py-1.5 text-kh-small @5xl:px-4 @5xl:py-2 @5xl:text-kh-body">
                    <span aria-hidden className="size-2 rounded-full bg-current" />
                    {chip}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
          <div id={id}>
            <Text path={['title']} value={props.title} as="h1" className="text-[clamp(2.25rem,1.2rem+3.2cqi,4.75rem)] font-semibold leading-[1.04] tracking-[-0.025em]" />
          </div>
          <Text path={['description']} value={props.description} as="p" multiline className="mt-7 max-w-[40rem] text-[clamp(1.125rem,0.95rem+0.45cqi,1.375rem)] leading-relaxed text-kh-muted" />
          <div className="mt-9 flex flex-wrap gap-3">
            <ActionLink path={['primary']} value={props.primary} className="@5xl:min-h-14 @5xl:px-8 @5xl:text-kh-lead" />
            <ActionLink path={['secondary']} value={props.secondary} variant="secondary" className="@5xl:min-h-14 @5xl:px-8 @5xl:text-kh-lead" />
          </div>
          {props.stats && props.stats.length > 0 && (
            <dl className="mt-10 grid grid-cols-3 border-t border-kh-line pt-6 @3xl:mt-14 @3xl:pt-8">
              {props.stats.map((stat, i) => (
                <div key={stat.label} className={i > 0 ? 'border-l border-kh-line pl-4 @md:pl-6' : 'pr-4 @md:pr-6'}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="m-0">
                    <span className="block font-kh-display text-[clamp(1.5rem,0.9rem+1.6cqi,2.75rem)] font-semibold leading-tight text-kh-ink">{stat.value}</span>
                    <span aria-hidden className="mt-1 block text-kh-caption text-kh-muted @md:text-kh-small @5xl:text-kh-body">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <LoopVideo {...props.video} />
      </Container>
    </Section>
  );
}

/** Vidéo décorative en boucle, muette, dans le même cadre que les images Klarhimmel (format 4:3). */
function LoopVideo({ webm, mp4, poster, alt }: HeroVideoProps['video']) {
  const ref = useRef<HTMLVideoElement>(null);

  // Lecture automatique, sauf si le visiteur a demandé moins d'animations : l'image fixe reste alors affichée.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      if (query.matches) video.pause();
      else video.play().catch(() => {});
    };
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  return (
    <div
      className="kh-media rounded-kh-xl border border-kh-line shadow-kh-3"
      data-kh-ratio="4/3"
      data-kh-media="image"
      role="img"
      aria-label={alt}
    >
      <video
        ref={ref}
        className="absolute inset-0 size-full object-cover"
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
}
