'use client';

import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import HeroMinimal from '@/components/klarhimmel/blocks/hero-minimal';
import BlogCards from '@/components/klarhimmel/blocks/blog-cards';
import BlogList from '@/components/klarhimmel/blocks/blog-list';
import type { Entry } from '@/lib/collections';
import { entryCard, entryRow } from './entry-cards';
import { SiteShell } from './site-shell';

export function CreationsIndex({ outils, veille }: { outils: Entry[]; veille: Entry[] }) {
  const empty = outils.length === 0 && veille.length === 0;
  return (
    <SiteShell current="/creations">
      <BlockSurface type="hero-minimal">
        <HeroMinimal
          props={{
            eyebrow: 'Créations',
            title: 'Des outils pour piloter, une veille pour anticiper',
            description: 'Les outils de gestion que je conçois, présentés en détail, et des notes courtes sur ce qui change pour les entreprises.',
            primary: { label: '', href: '' },
          }}
        />
      </BlockSurface>
      {outils.length > 0 && (
        <BlockSurface type="blog-cards" tone="muted">
          <BlogCards
            props={{
              eyebrow: '',
              title: 'Outils',
              description: 'Tableurs et modèles conçus pour suivre et décider. Ils sont présentés ici, pas en téléchargement.',
              // Le bloc affiche 6 outils au plus : une pagination sera ajoutée au-delà.
              posts: outils.slice(0, 6).map((o) => entryCard(o)),
              more: { label: '', href: '' },
            }}
          />
        </BlockSurface>
      )}
      {veille.length > 0 && (
        <BlockSurface type="blog-list">
          <BlogList
            props={{
              eyebrow: '',
              title: 'Veille et nouveautés',
              description: 'Des notes courtes sur les changements à connaître : réglementation, fiscalité, outils.',
              // Le bloc affiche 8 notes au plus : une pagination sera ajoutée au-delà.
              posts: veille.slice(0, 8).map(entryRow),
              more: { label: '', href: '' },
            }}
          />
        </BlockSurface>
      )}
      {empty && (
        <BlockSurface>
          <p className="mx-auto max-w-kh-prose px-6 pb-kh-section text-kh-lead text-kh-muted">
            Les premières créations arrivent bientôt.
          </p>
        </BlockSurface>
      )}
    </SiteShell>
  );
}
