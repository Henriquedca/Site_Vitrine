import { COLLECTIONS, type Entry } from '@/lib/collections';

/**
 * Ligne d'information d'un contenu.
 * Article ou veille : « Brouillon · 4 oct. 2026 · 7 min de lecture ». Outil : « Brouillon · Excel · 4 oct. 2026 ».
 */
export function entryMeta(e: Entry) {
  const end = e.collection === 'outils' ? [e.format, e.dateLabel] : [e.dateLabel, `${e.lecture} min de lecture`];
  return [e.brouillon ? 'Brouillon' : '', ...end].filter(Boolean).join(' · ');
}

/**
 * Un contenu au format des cartes Klarhimmel (blog-cards).
 * `badge` : « categorie » (par défaut) ou « collection » (Outil / Veille, quand les deux se mêlent).
 */
export function entryCard(e: Entry, badge: 'categorie' | 'collection' = 'categorie') {
  return {
    category: badge === 'collection' ? COLLECTIONS[e.collection].label : e.categorie,
    title: e.titre,
    excerpt: e.chapeau,
    meta: entryMeta(e),
    href: e.href,
    media: { src: e.image, srcDark: e.imageSombre, alt: e.imageAlt },
  };
}

/** Un contenu au format des lignes Klarhimmel (blog-list). */
export function entryRow(e: Entry) {
  return {
    date: e.brouillon ? `${e.dateLabel} · Brouillon` : e.dateLabel,
    title: e.titre,
    excerpt: e.chapeau,
    category: e.categorie,
    href: e.href,
  };
}
