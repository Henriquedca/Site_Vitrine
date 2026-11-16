'use client';

import type { ReactNode } from 'react';
import { Theme } from '@/components/klarhimmel/theme/style';
import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import NavbarUtility from '@/components/klarhimmel/blocks/navbar-utility';
import FooterColumns from '@/components/klarhimmel/blocks/footer-columns';
import { SITE_STYLE } from '@/lib/theme';
import { CONTACT_LINKS, CONTACT_PAGE, LEGAL_LINKS, PAGES, SITE } from '@/lib/site';

/** Enveloppe commune à toutes les pages : thème, menu (avec la barre de contact) et pied de page. */
export function SiteShell({ current, children }: { current?: string; children: ReactNode }) {
  return (
    <Theme theme="brand" style={SITE_STYLE} mode="system" className="min-h-dvh bg-kh-canvas text-kh-ink">
      <BlockSurface type="navbar-utility">
        <NavbarUtility
          props={{
            brand: SITE.name,
            note: SITE.subtitle,
            utility: CONTACT_LINKS,
            links: PAGES,
            current,
            cta: CONTACT_PAGE,
          }}
        />
      </BlockSurface>
      <main>{children}</main>
      <BlockSurface type="footer-columns" tone="muted">
        <FooterColumns
          props={{
            brand: SITE.name,
            tagline: `${SITE.subtitle}. Un accompagnement complet pour les dirigeants, prévu d’ici 2030.`,
            columns: [
              { title: 'Le site', links: [{ label: 'Accueil', href: '/' }, ...PAGES] },
              { title: 'Me joindre', links: [...CONTACT_LINKS, CONTACT_PAGE] },
            ],
            legal: `© 2026 ${SITE.name}`,
            legalLinks: LEGAL_LINKS,
          }}
        />
      </BlockSurface>
    </Theme>
  );
}
