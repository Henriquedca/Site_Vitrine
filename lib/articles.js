import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';

const DIR = path.join(process.cwd(), 'content', 'articles');

// Les articles marqués « brouillon: true » ne sont visibles qu'en développement,
// ou en production si la variable SHOW_DRAFTS=true est définie.
const SHOW_DRAFTS = process.env.NODE_ENV !== 'production' || process.env.SHOW_DRAFTS === 'true';

const toDateString = (v) => {
  if (!v) return null;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
};

export function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z#0-9]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function readFile(file) {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, '');
  return {
    slug,
    titre: data.titre ?? slug,
    chapeau: data.chapeau ?? '',
    categorie: data.categorie ?? '',
    date: toDateString(data.date),
    miseAJour: toDateString(data.miseAJour),
    lecture: data.lecture ?? readingTime(content),
    image: data.image ?? null,
    imageAlt: data.imageAlt ?? '',
    aRetenir: Array.isArray(data.aRetenir) ? data.aRetenir : [],
    brouillon: Boolean(data.brouillon),
    content,
  };
}

export function getAllArticles() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map(readFile)
    .filter((a) => SHOW_DRAFTS || !a.brouillon)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
}

export function getArticle(slug) {
  return getAllArticles().find((a) => a.slug === slug) ?? null;
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Transforme le Markdown en HTML et construit le sommaire à partir des titres de niveau 2.
// Le repère <!-- a-retenir --> place l'encadré « À retenir » ; sans repère, il va en tête.
export function renderArticle(article) {
  const toc = [];
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        const id = slugify(html);
        if (depth === 2) toc.push({ id, titre: html.replace(/<[^>]+>/g, '') });
        return `<h${depth} id="${id}">${html}</h${depth}>\n`;
      },
    },
  });

  let html = marked.parse(article.content);
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');

  const encadre = article.aRetenir.length
    ? `<aside class="a-retenir"><strong>À retenir</strong><ul>${article.aRetenir
        .map((p) => `<li>${escapeHtml(String(p))}</li>`)
        .join('')}</ul></aside>`
    : '';
  const marker = /<!--\s*a-retenir\s*-->/;
  html = marker.test(html) ? html.replace(marker, encadre) : encadre + html;

  return { html, toc };
}

export function formatDate(iso) {
  if (!iso) return '[Date]';
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
