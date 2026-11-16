'use client';

import type { ReactNode } from 'react';
import { Theme } from '@/components/klarhimmel/theme/style';
import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import { SITE_STYLE } from '@/lib/theme';
import { CONTACT_PAGE, PAGES, SITE } from '@/lib/site';
import { SiteFooter } from './site-footer';
import { SiteNavbar } from './site-navbar';
import { LinkedInLink } from './linkedin-link';

/** Enveloppe commune à toutes les pages : thème, menu et pied de page. */
export function SiteShell({ current, children }: { current?: string; children: ReactNode }) {
  return (
    <Theme theme="brand" style={SITE_STYLE} mode="system" className="min-h-dvh bg-kh-canvas text-kh-ink">
      <BlockSurface type="navbar-simple">
        <SiteNavbar props={{ brand: SITE.name, links: PAGES, current, cta: CONTACT_PAGE }} extra={<LinkedInLink />} />
      </BlockSurface>
      <main>{children}</main>
      <BlockSurface type="footer">
        <SiteFooter />
      </BlockSurface>
    </Theme>
  );
}
