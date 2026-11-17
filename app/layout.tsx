import type { Metadata } from 'next';
import './globals.css';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  // Onglet : « Accueil - Henrique da Costa Araújo » sur l'accueil, « <Page> - Henrique da Costa Araújo » ailleurs.
  title: { default: `Accueil - ${SITE.name}`, template: `%s - ${SITE.name}` },
  description:
    'Comptabilité, fiscalité et pilotage financier : des analyses, une veille et des outils pour aider les dirigeants à décider avec leurs chiffres.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
