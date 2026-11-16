'use client';

import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import HeroSplit from '@/components/klarhimmel/blocks/hero-split';
import { SiteShell } from './site-shell';

export function Home() {
  return (
    <SiteShell>
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
    </SiteShell>
  );
}
