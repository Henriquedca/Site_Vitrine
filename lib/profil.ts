/**
 * Parcours d'Henrique : lu par l'accueil (« Qui suis-je ? ») et par la page À propos.
 * Les textes marqués « PROPOSITION » sont à valider ou à réécrire.
 */

export const PORTRAIT = {
  src: '/images/portrait.svg',
  srcDark: '/images/portrait-sombre.svg',
  alt: 'Emplacement du portrait d’Henrique da Costa Araújo',
};

// PROPOSITION
export const BIO =
  'Je suis en deuxième année de DSCG, après un BTS CG et un DCG, avec trois ans d’expérience en cabinet comptable. Avant cela, la grande distribution et la restauration m’ont appris le terrain : les marges serrées, les stocks et la trésorerie du quotidien.';

/** Points clés affichés sur l'accueil (4 au plus). */
export const POINTS = [
  'BTS CG, DCG, puis DSCG en cours (2e année)',
  '3 ans d’expérience en cabinet comptable',
  'Plus de 3 ans en grande distribution',
  '1 an en restauration',
];

/** Chiffres clés (2 à 4). */
export const STATS = [
  { value: '+7 ans', label: 'd’expérience professionnelle' },
  { value: '3 ans', label: 'en cabinet comptable' },
  { value: '3', label: 'secteurs connus de l’intérieur' },
  { value: 'DSCG', label: 'en deuxième année' },
];

/** Formation, dans l'ordre. `etape` s'affiche en grand à gauche (12 caractères au plus). */
export const FORMATION = [
  { etape: 'BTS CG', titre: 'BTS Comptabilité et gestion', description: '' },
  { etape: 'DCG', titre: 'Diplôme de comptabilité et de gestion', description: '' },
  { etape: 'DSCG', titre: 'Diplôme supérieur de comptabilité et de gestion', description: 'Deuxième année en cours.' },
  {
    etape: 'Ensuite',
    titre: 'Stage d’expertise comptable et DEC',
    description: 'Le stage puis le diplôme d’expertise comptable, pour ouvrir mon accompagnement d’ici 2030.',
  },
];

/** Expérience professionnelle. `duree` s'affiche en grand à gauche (12 caractères au plus). */
export const EXPERIENCE = [
  // PROPOSITION (descriptions)
  { duree: '+3 ans', titre: 'Grande distribution', description: 'Le commerce vu de l’intérieur : les flux, les stocks et les marges.' },
  { duree: '1 an', titre: 'Restauration', description: 'Un métier où chaque coût compte et où la trésorerie se gère au jour le jour.' },
  { duree: '3 ans', titre: 'Cabinet comptable', description: 'La tenue, la révision et l’établissement des comptes, au contact des dirigeants.' },
];
