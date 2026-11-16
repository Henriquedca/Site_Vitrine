import type { Metadata } from 'next';
import { ArticlesIndex } from '@/components/site/articles-index';
import { getEntries } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Articles · Henrique da Costa Araújo',
  description: 'Des analyses de fond pour comprendre ses chiffres et décider : pilotage, rémunération, fiscalité.',
};

export default async function Page() {
  return <ArticlesIndex articles={await getEntries('articles')} />;
}
