import type { Metadata } from 'next';
import { CreationsIndex } from '@/components/site/creations-index';
import { getEntries } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Créations',
  description: 'Des outils de gestion présentés en détail et une veille courte sur ce qui change pour les entreprises.',
};

export default async function Page() {
  const [outils, veille] = await Promise.all([getEntries('outils'), getEntries('veille')]);
  return <CreationsIndex outils={outils} veille={veille} />;
}
