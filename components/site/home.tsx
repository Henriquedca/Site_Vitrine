'use client';

import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import HeroSplit from '@/components/klarhimmel/blocks/hero-split';
import FeaturesGrid from '@/components/klarhimmel/blocks/features-grid';
import BlogCards from '@/components/klarhimmel/blocks/blog-cards';
import type { Article } from '@/lib/articles';
import { articleCard } from './article-cards';
import { SiteShell } from './site-shell';

/** Accueil. `articles` : les trois derniers articles visibles (lus sur le serveur, app/page.tsx). */
export function Home({ articles }: { articles: Article[] }) {
  return (
    <SiteShell current="/">
      <BlockSurface type="hero-split">
        <HeroSplit
          props={{
            eyebrow: 'Accompagnement prévu d’ici 2030',
            title: 'Vos chiffres, clairs et utiles pour décider.',
            description:
              'Comptabilité, pilotage financier et contrôle de gestion\u00a0: je prépare un accompagnement complet pour les dirigeants. En attendant, je partage ici mes analyses, ma veille et mes outils.',
            primary: { label: 'Me contacter', href: '/contact' },
            secondary: { label: 'Lire les articles', href: '/articles' },
            media: {
              src: '/images/hero-tresorerie.svg',
              srcDark: '/images/hero-tresorerie-sombre.svg',
              alt: 'Exemple d’outil\u00a0: un suivi de trésorerie sur douze mois, de 18 k€ en janvier à 38 k€ en décembre',
            },
          }}
        />
      </BlockSurface>
      <BlockSurface type="features-grid" tone="muted">
        <FeaturesGrid
          props={{
            eyebrow: 'Ce que je proposerai',
            title: 'Un accompagnement complet',
            description: 'Trois métiers réunis, pour que la comptabilité serve aussi à piloter l’entreprise.',
            columns: '3',
            items: [
              {
                icon: 'book',
                title: 'Comptabilité\u00a0: des comptes fiables',
                description: 'La base de tout\u00a0: une tenue rigoureuse, une révision attentive et un bilan expliqué simplement au dirigeant.',
              },
              {
                icon: 'chart',
                title: 'Pilotage financier\u00a0: voir venir',
                description: 'Prévoir la trésorerie, choisir le bon financement et la bonne rémunération, préparer les décisions importantes.',
              },
              {
                icon: 'gauge',
                title: 'Contrôle de gestion\u00a0: savoir où l’on gagne',
                description: 'Des tableaux de bord et des indicateurs suivis chaque mois, pour connaître ses coûts, ses marges et agir à temps.',
              },
            ],
          }}
        />
      </BlockSurface>
      {articles.length > 0 && (
        <BlockSurface type="blog-cards">
          <BlogCards
            props={{
              eyebrow: 'Articles',
              title: 'Derniers articles',
              description: 'Des analyses de fond pour comprendre ses chiffres et décider.',
              posts: articles.map(articleCard),
              more: { label: 'Tous les articles', href: '/articles' },
            }}
          />
        </BlockSurface>
      )}
    </SiteShell>
  );
}
