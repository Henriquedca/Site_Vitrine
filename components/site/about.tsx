'use client';

import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import HeroMinimal from '@/components/klarhimmel/blocks/hero-minimal';
import StatsRow from '@/components/klarhimmel/blocks/stats-row';
import AboutTimeline from '@/components/klarhimmel/blocks/about-timeline';
import { CONTACT_PAGE } from '@/lib/site';
import { BIO, EXPERIENCE, FORMATION, STATS } from '@/lib/profil';
import { SiteShell } from './site-shell';

export function About() {
  return (
    <SiteShell current="/a-propos">
      <BlockSurface type="hero-minimal">
        <HeroMinimal
          props={{
            eyebrow: 'À propos',
            title: 'Le terrain d’abord, le conseil ensuite',
            description: BIO,
            primary: CONTACT_PAGE,
          }}
        />
      </BlockSurface>
      <BlockSurface type="stats-row" tone="muted">
        <StatsRow props={{ title: 'En quelques chiffres', description: '', items: STATS }} />
      </BlockSurface>
      <BlockSurface type="about-timeline">
        <AboutTimeline
          props={{
            eyebrow: 'Formation',
            title: 'Vers l’expertise comptable',
            lead: 'Une filière complète, du BTS au diplôme d’expertise comptable.',
            items: FORMATION.map((f) => ({ year: f.etape, title: f.titre, description: f.description })),
          }}
        />
      </BlockSurface>
      <BlockSurface type="about-timeline" tone="muted">
        <AboutTimeline
          props={{
            eyebrow: 'Expérience',
            title: 'Trois secteurs vus de l’intérieur',
            lead: 'Avant le cabinet, le commerce et la restauration : des métiers où l’on voit ce que les chiffres veulent dire.',
            items: EXPERIENCE.map((e) => ({ year: e.duree, title: e.titre, description: e.description })),
          }}
        />
      </BlockSurface>
    </SiteShell>
  );
}
