import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EntryView } from '@/components/site/entry-view';
import { getEntries, getEntry } from '@/lib/content';

/** Les deux collections de « Créations » : /creations/outils/… et /creations/veille/… */
const TYPES = ['outils', 'veille'] as const;
type CreationType = (typeof TYPES)[number];
const isType = (t: string): t is CreationType => (TYPES as readonly string[]).includes(t);

export async function generateStaticParams() {
  const lists = await Promise.all(TYPES.map((type) => getEntries(type)));
  const params = lists.flat().map((e) => ({ type: e.collection, slug: e.slug }));
  // Adresse factice tant que rien n'est publié : Next.js exige au moins une page générée.
  return params.length ? params : [{ type: 'outils', slug: '__aucune-creation__' }];
}

async function load(params: PageProps<'/creations/[type]/[slug]'>['params']) {
  const { type, slug } = await params;
  return isType(type) ? getEntry(type, slug) : null;
}

export async function generateMetadata({ params }: PageProps<'/creations/[type]/[slug]'>): Promise<Metadata> {
  const entry = await load(params);
  if (!entry) return {};
  return { title: `${entry.titre} · Henrique da Costa Araújo`, description: entry.chapeau };
}

export default async function Page({ params }: PageProps<'/creations/[type]/[slug]'>) {
  const entry = await load(params);
  if (!entry) notFound();
  return <EntryView entry={entry} />;
}
