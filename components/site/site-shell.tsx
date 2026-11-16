'use client';

import type { ReactNode } from 'react';
import { Theme } from '@/components/klarhimmel/theme/style';
import { SITE_STYLE } from '@/lib/theme';

/** Enveloppe commune à toutes les pages : le thème du site (et bientôt le menu et le pied de page). */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <Theme theme="brand" style={SITE_STYLE} mode="system" className="min-h-dvh bg-kh-canvas text-kh-ink">
      <main>{children}</main>
    </Theme>
  );
}
