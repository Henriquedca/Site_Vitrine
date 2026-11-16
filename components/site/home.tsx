'use client';

import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import FeaturesGrid from '@/components/klarhimmel/blocks/features-grid';
import BlogCards from '@/components/klarhimmel/blocks/blog-cards';
import FeaturesSplit from '@/components/klarhimmel/blocks/features-split';
import CtaBand from '@/components/klarhimmel/blocks/cta-band';
import { BIO, POINTS, PORTRAIT } from '@/lib/profil';
import { CONTACT_PAGE, SITE } from '@/lib/site';
import type { Entry } from '@/lib/collections';
import { entryCard } from './entry-cards';
import { HeroVideo } from './hero-video';
import { SiteShell } from './site-shell';

/** Accueil. `articles` et `creations` : les trois derniers contenus visibles de chaque (lus sur le serveur, app/page.tsx). */
export function Home({ articles, creations }: { articles: Entry[]; creations: Entry[] }) {
  return (
    <SiteShell current="/">
      <BlockSurface type="hero-split">
        <HeroVideo
          props={{
            eyebrow: 'Accompagnement prévu d’ici 2030',
            title: 'Vos chiffres, clairs et utiles pour décider.',
            description:
              'Comptabilité, pilotage financier et contrôle de gestion\u00a0: je prépare un accompagnement complet pour les dirigeants. En attendant, je partage ici mes analyses, ma veille et mes outils.',
            primary: { label: 'Me contacter', href: '/contact' },
            secondary: { label: 'Lire les articles', href: '/articles' },
            video: {
              webm: '/videos/accueil-graphique.webm',
              mp4: '/videos/accueil-graphique.mp4',
              poster: '/videos/accueil-graphique.jpg',
              alt: 'Une carte en papier posée sur une nappe en lin, avec un graphique en hausse\u00a0: une courbe en flèche au-dessus de barres qui grandissent',
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
              posts: articles.map((a) => entryCard(a)),
              more: { label: 'Tous les articles', href: '/articles' },
            }}
          />
        </BlockSurface>
      )}
      {creations.length > 0 && (
        <BlockSurface type="blog-cards" tone="muted">
          <BlogCards
            props={{
              eyebrow: 'Créations',
              title: 'Outils et veille',
              description: 'Des outils de gestion présentés en détail et des notes courtes sur ce qui change.',
              posts: creations.map((c) => entryCard(c, 'collection')),
              more: { label: 'Toutes les créations', href: '/creations' },
            }}
          />
        </BlockSurface>
      )}
      <BlockSurface type="features-split">
        <FeaturesSplit
          props={{
            eyebrow: 'Qui suis-je ?',
            title: 'Le terrain d’abord, le conseil ensuite',
            description: '',
            items: [{ title: SITE.name, description: BIO, points: POINTS, media: PORTRAIT }],
          }}
        />
      </BlockSurface>
      <BlockSurface type="cta-band">
        <CtaBand
          props={{
            title: 'Une question sur vos chiffres ou un projet à partager ?',
            description: 'Écrivez-moi, je réponds personnellement.',
            primary: CONTACT_PAGE,
            secondary: { label: 'Voir mon parcours', href: '/a-propos' },
          }}
        />
      </BlockSurface>
    </SiteShell>
  );
}
