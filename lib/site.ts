/**
 * Informations du site, lues par le menu, le pied de page, la page Contact et les pages légales.
 * L'e-mail n'apparaît que sur la page Contact et dans les pages légales.
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

export const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/confidentialite' },
];
