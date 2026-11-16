/**
 * Collections et types des contenus, sans lecture de fichiers : importable par les composants du navigateur.
 * La lecture des fichiers est dans lib/content.ts.
 */
export const COLLECTIONS = {
  articles: { folder: 'articles', base: '/articles', label: 'Article' },
  outils: { folder: 'outils', base: '/creations/outils', label: 'Outil' },
  veille: { folder: 'veille', base: '/creations/veille', label: 'Veille' },
} as const;

export type Collection = keyof typeof COLLECTIONS;

export type Entry = {
  collection: Collection;
  slug: string;
  /** Adresse de la page : « /articles/mon-article ». */
  href: string;
  titre: string;
  chapeau: string;
  categorie: string;
  /** Outils seulement : le format (Excel, Notion…). */
  format: string;
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
