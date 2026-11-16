import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EntryView } from '@/components/site/entry-view';
import { getEntries, getEntry } from '@/lib/content';

/** Adresse factice tant qu'aucun article n'est publié : Next.js exige au moins une page générée. */
const PLACEHOLDER = '__aucun-article__';

export async function generateStaticParams() {
  const articles = await getEntries('articles');
  return articles.length ? articles.map((a) => ({ slug: a.slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<'/articles/[slug]'>): Promise<Metadata> {
  const entry = await getEntry('articles', (await params).slug);
  if (!entry) return {};
  return { title: `${entry.titre} · Henrique da Costa Araújo`, description: entry.chapeau };
}

export default async function Page({ params }: PageProps<'/articles/[slug]'>) {
  const entry = await getEntry('articles', (await params).slug);
  if (!entry) notFound();
  return <EntryView entry={entry} />;
}
