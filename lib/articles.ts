import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { fr } from './typo';

/**
 * Articles : un fichier Markdown par article dans content/articles/.
 * Le nom du fichier devient l'adresse : content/articles/mon-article.md -> /articles/mon-article.
 */
const DIR = path.join(process.cwd(), 'content', 'articles');

export type Article = {
  slug: string;
  titre: string;
  chapeau: string;
  categorie: string;
  /** Date ISO (AAAA-MM-JJ). */
  date: string;
  /** Date lisible : « 4 oct. 2026 ». */
  dateLabel: string;
  /** Temps de lecture estimé, en minutes. */
  lecture: number;
  image: string;
  imageSombre?: string;
  imageAlt: string;
  brouillon: boolean;
  body: string;
};

/** Les brouillons sont visibles en développement, masqués en production sauf si SHOW_DRAFTS=true. */
function showDrafts() {
  return process.env.NODE_ENV !== 'production' || process.env.SHOW_DRAFTS === 'true';
}

const dateFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

function readingTime(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

async function readArticle(file: string): Promise<Article> {
  const raw = await readFile(path.join(DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const date = String(data.date ?? '');
  return {
    slug: file.replace(/\.md$/, ''),
    titre: fr(String(data.titre ?? '')),
    chapeau: fr(String(data.chapeau ?? '')),
    categorie: String(data.categorie ?? ''),
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

/** Tous les articles visibles, du plus récent au plus ancien. */
export async function getArticles(): Promise<Article[]> {
  'use cache';
  const files = (await readdir(DIR)).filter((f) => f.endsWith('.md'));
  const articles = await Promise.all(files.map(readArticle));
  return articles
    .filter((a) => showDrafts() || !a.brouillon)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Un article visible par son adresse, ou null. */
export async function getArticle(slug: string): Promise<Article | null> {
  'use cache';
  const articles = await getArticles();
  return articles.find((a) => a.slug === slug) ?? null;
}
