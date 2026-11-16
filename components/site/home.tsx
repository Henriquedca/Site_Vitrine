'use client';

import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import HeroSplit from '@/components/klarhimmel/blocks/hero-split';
import FeaturesGrid from '@/components/klarhimmel/blocks/features-grid';
import { SiteShell } from './site-shell';

export function Home() {
  return (
    <SiteShell current="/">
      <BlockSurface type="hero-split">
        <HeroSplit
          props={{
            eyebrow: 'Accompagnement prévu d’ici 2030',
            title: 'Vos chiffres, clairs et utiles pour décider.',
            description:
              'Comptabilité, pilotage financier et contrôle de gestion : je prépare un accompagnement complet pour les dirigeants. En attendant, je partage ici mes analyses, ma veille et mes outils.',
            primary: { label: 'Me contacter', href: '/contact' },
            secondary: { label: 'Lire les articles', href: '/articles' },
            media: {
              src: '/images/hero-tresorerie.svg',
              srcDark: '/images/hero-tresorerie-sombre.svg',
              alt: 'Exemple d’outil : un suivi de trésorerie sur douze mois, de 18 k€ en janvier à 38 k€ en décembre',
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
                title: 'Comptabilité : des comptes fiables',
                description: 'La base de tout : une tenue rigoureuse, une révision attentive et un bilan expliqué simplement au dirigeant.',
              },
              {
                icon: 'chart',
                title: 'Pilotage financier : voir venir',
                description: 'Prévoir la trésorerie, choisir le bon financement et la bonne rémunération, préparer les décisions importantes.',
              },
              {
                icon: 'gauge',
                title: 'Contrôle de gestion : savoir où l’on gagne',
                description: 'Des tableaux de bord et des indicateurs suivis chaque mois, pour connaître ses coûts, ses marges et agir à temps.',
              },
            ],
          }}
        />
      </BlockSurface>
    </SiteShell>
  );
}
