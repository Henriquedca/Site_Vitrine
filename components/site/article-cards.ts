import type { Article } from '@/lib/articles';

/** Ligne d'information d'un article : « Brouillon · 4 oct. 2026 · 7 min de lecture ». */
export function articleMeta(a: Article) {
  return [a.brouillon ? 'Brouillon' : '', a.dateLabel, `${a.lecture} min de lecture`].filter(Boolean).join(' · ');
}

export function articleHref(a: Article) {
  return `/articles/${a.slug}`;
}

/** Un article au format des cartes Klarhimmel (blog-cards). */
export function articleCard(a: Article) {
  return {
    category: a.categorie,
    title: a.titre,
    excerpt: a.chapeau,
    meta: articleMeta(a),
    href: articleHref(a),
    media: { src: a.image, srcDark: a.imageSombre, alt: a.imageAlt },
  };
}
