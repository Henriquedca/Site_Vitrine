/**
 * Informations du site, lues par le menu, le pied de page et la page Contact.
 * Modifier ici change partout.
 */
export const SITE = {
  name: 'Henrique da Costa Araújo',
  subtitle: 'Comptabilité · Finance · Gestion',
  email: 'henriquedcapro@outlook.com',
  linkedin: 'https://www.linkedin.com/in/henrique-da-costa-araujo-b9179131b/',
};

/** Pages principales, dans l'ordre du menu. */
export const PAGES = [
  { label: 'Articles', href: '/articles' },
  { label: 'Créations', href: '/creations' },
  { label: 'À propos', href: '/a-propos' },
];

export const CONTACT_PAGE = { label: 'Me contacter', href: '/contact' };

/** Liens de contact directs (barre du haut et pied de page). */
export const CONTACT_LINKS = [
  { label: SITE.email, href: `mailto:${SITE.email}` },
  { label: 'LinkedIn', href: SITE.linkedin },
];

export const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/confidentialite' },
];
