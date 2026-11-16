import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { fr } from './typo';

/**
 * Contenus du site : un fichier Markdown par contenu, rangé par collection (lib/collections.ts).
 * Le nom du fichier devient l'adresse : content/articles/mon-article.md -> /articles/mon-article.
 */
import { COLLECTIONS, type Collection, type Entry } from './collections';

export { COLLECTIONS, type Collection, type Entry };

/** Les brouillons sont visibles en développement, masqués en production sauf si SHOW_DRAFTS=true. */
function showDrafts() {
  return process.env.NODE_ENV !== 'production' || process.env.SHOW_DRAFTS === 'true';
}

const dateFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

function readingTime(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

async function readEntry(collection: Collection, file: string): Promise<Entry> {
  const raw = await readFile(path.join(process.cwd(), 'content', COLLECTIONS[collection].folder, file), 'utf8');
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, '');
  const date = String(data.date ?? '');
  return {
    collection,
    slug,
    href: `${COLLECTIONS[collection].base}/${slug}`,
    titre: fr(String(data.titre ?? '')),
    chapeau: fr(String(data.chapeau ?? '')),
    categorie: String(data.categorie ?? ''),
    format: String(data.format ?? ''),
    date,
    dateLabel: date ? dateFormat.format(new Date(`${date}T00:00:00Z`)) : '',
    lecture: Number(data.lecture) || readingTime(content),
    image: String(data.image ?? ''),
    imageSombre: data.imageSombre ? String(data.imageSombre) : undefined,
    imageAlt: String(data.imageAlt ?? ''),
    brouillon: data.brouillon === true,
    body: fr(content.trim()),
  };
}

/** Les contenus visibles d'une collection, du plus récent au plus ancien. */
export async function getEntries(collection: Collection): Promise<Entry[]> {
  'use cache';
  const dir = path.join(process.cwd(), 'content', COLLECTIONS[collection].folder);
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
  const entries = await Promise.all(files.map((f) => readEntry(collection, f)));
  return entries
    .filter((e) => showDrafts() || !e.brouillon)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Un contenu visible par sa collection et son adresse, ou null. */
export async function getEntry(collection: Collection, slug: string): Promise<Entry | null> {
  'use cache';
  return (await getEntries(collection)).find((e) => e.slug === slug) ?? null;
}

/** Les créations (outils et veille) mêlées, de la plus récente à la plus ancienne. */
export async function getCreations(): Promise<Entry[]> {
  'use cache';
  const [outils, veille] = await Promise.all([getEntries('outils'), getEntries('veille')]);
  return [...outils, ...veille].sort((a, b) => b.date.localeCompare(a.date));
}
