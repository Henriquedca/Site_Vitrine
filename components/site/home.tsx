'use client';

import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import FeaturesGrid from '@/components/klarhimmel/blocks/features-grid';
import CtaBand from '@/components/klarhimmel/blocks/cta-band';
import { CONTACT_PAGE } from '@/lib/site';
import { HERO_STATS, SPECIALITES } from '@/lib/profil';
import type { Entry } from '@/lib/collections';
import { ContentCarousel } from './content-carousel';
import { HeroVideo } from './hero-video';
import { SiteShell } from './site-shell';

/** Accueil. `articles` et `creations` : les derniers contenus visibles de chaque (lus sur le serveur, app/page.tsx). */
export function Home({ articles, creations }: { articles: Entry[]; creations: Entry[] }) {
  return (
    <SiteShell current="/">
      <BlockSurface type="hero-split">
        <HeroVideo
          props={{
            eyebrow: '',
            chips: SPECIALITES,
            title: 'Vos chiffres, clairs et utiles pour décider.',
            description:
              'Je partage ici mes analyses, ma veille et mes outils, pour aider les dirigeants à faire de leurs chiffres un outil de décision.',
            primary: { label: 'Me contacter', href: '/contact' },
            secondary: { label: 'Lire les articles', href: '/articles' },
            stats: HERO_STATS,
            video: {
              webm: '/videos/accueil-graphique.webm',
              mp4: '/videos/accueil-graphique.mp4',
              poster: '/videos/accueil-graphique.jpg',
              alt: 'Une carte en papier posée sur une nappe en lin, avec un graphique en hausse : une courbe en flèche au-dessus de barres qui grandissent',
            },
          }}
        />
      </BlockSurface>
      <BlockSurface type="features-grid" tone="muted">
        <FeaturesGrid
          props={{
            eyebrow: '',
            title: 'Mes spécialités',
            description: 'Trois domaines, pour des comptes justes, des impôts maîtrisés et des décisions éclairées.',
            columns: '3',
            items: [
              {
                icon: 'book',
                title: 'Comptabilité : des comptes fiables',
                description: 'La base de tout : une tenue rigoureuse, une révision attentive et un bilan expliqué simplement au dirigeant.',
              },
              {
                icon: 'shield',
                title: 'Fiscalité : des choix sécurisés',
                description: 'Déclarations, régimes d’imposition, rémunération du dirigeant : respecter ses obligations et faire les bons choix.',
              },
              {
                icon: 'chart',
                title: 'Pilotage financier : voir venir',
                description: 'Trésorerie prévisionnelle, tableaux de bord et indicateurs suivis chaque mois, pour décider au bon moment.',
              },
            ],
          }}
        />
      </BlockSurface>
      {articles.length > 0 && (
        <BlockSurface type="articles">
          <ContentCarousel
            eyebrow="Articles"
            title="Derniers articles"
            description="Des analyses de fond pour comprendre ses chiffres et décider."
            items={articles}
            more={{ label: 'Voir tous les articles', href: '/articles' }}
          />
        </BlockSurface>
      )}
      {creations.length > 0 && (
        <BlockSurface type="creations" tone="muted">
          <ContentCarousel
            eyebrow="Créations"
            title="Outils et veille"
            description="Des outils de gestion présentés en détail et des notes courtes sur ce qui change."
            items={creations}
            badge="collection"
            more={{ label: 'Voir toutes les créations', href: '/creations' }}
          />
        </BlockSurface>
      )}
      <BlockSurface type="cta-band">
        <CtaBand
          props={{
            title: 'Envie de développer un projet ou une autre question ?',
            description: 'N’hésitez pas à me contacter.',
            primary: CONTACT_PAGE,
            secondary: { label: 'Voir mon parcours', href: '/a-propos' },
          }}
        />
      </BlockSurface>
    </SiteShell>
  );
}
