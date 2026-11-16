import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Henrique · Comptabilité, finance et gestion',
  description:
    'Comptabilité, pilotage financier et contrôle de gestion : un accompagnement complet pour les dirigeants, des articles et des outils.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
