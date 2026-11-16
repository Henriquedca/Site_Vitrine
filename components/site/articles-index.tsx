'use client';

import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import HeroMinimal from '@/components/klarhimmel/blocks/hero-minimal';
import BlogList from '@/components/klarhimmel/blocks/blog-list';
import type { Entry } from '@/lib/collections';
import { entryRow } from './entry-cards';
import { SiteShell } from './site-shell';

export function ArticlesIndex({ articles }: { articles: Entry[] }) {
  return (
    <SiteShell current="/articles">
      <BlockSurface type="hero-minimal">
        <HeroMinimal
          props={{
            eyebrow: 'Articles',
            title: 'Comprendre ses chiffres pour mieux décider',
            description: 'Des analyses de fond sur le pilotage, la rémunération du dirigeant et la fiscalité, écrites pour les chefs d’entreprise.',
            primary: { label: '', href: '' },
          }}
        />
      </BlockSurface>
      {articles.length > 0 ? (
        <BlockSurface type="blog-list">
          <BlogList
            props={{
              eyebrow: '',
              title: '',
              description: '',
              // Le bloc affiche 8 articles au plus : une pagination sera ajoutée au-delà.
              posts: articles.slice(0, 8).map(entryRow),
              more: { label: '', href: '' },
            }}
          />
        </BlockSurface>
      ) : (
        <BlockSurface>
          <p className="mx-auto max-w-kh-prose px-6 pb-kh-section text-kh-lead text-kh-muted">
            Les premiers articles arrivent bientôt.
          </p>
        </BlockSurface>
      )}
    </SiteShell>
  );
}
