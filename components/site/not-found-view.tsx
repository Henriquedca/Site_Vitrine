'use client';

import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import ErrorPage from '@/components/klarhimmel/blocks/error-page';
import { SiteShell } from './site-shell';

export function NotFoundView() {
  return (
    <SiteShell>
      <BlockSurface type="error-page">
        <ErrorPage
          props={{
            code: '404',
            title: 'Cette page n’existe pas',
            description: 'Le lien est peut-être ancien, ou l’adresse contient une faute de frappe.',
            primary: { label: 'Revenir à l’accueil', href: '/' },
            secondary: { label: 'Lire les articles', href: '/articles' },
          }}
        />
      </BlockSurface>
    </SiteShell>
  );
}
