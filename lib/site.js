// Réglages du site, à compléter en un seul endroit.
// Les champs vides ou entre crochets sont à renseigner (voir README).

export const SITE = {
  // Nom affiché dans le logo, le pied de page et les métadonnées.
  // À décider : « Henrique » seul ou avec le nom de famille.
  name: 'Henrique',
  author: 'Henrique',
  city: 'Toulouse',
  description:
    "Henrique, quatre ans en cabinet d'expertise comptable à Toulouse et candidat au DSCG : parcours, articles et projets.",
  // URL publique, utilisée pour les métadonnées (à mettre à jour après la mise en ligne).
  url: 'https://example.com',

  contact: {
    email: '', // ex. 'prenom.nom@exemple.fr'
    linkedin: '', // ex. 'https://www.linkedin.com/in/…'
  },

  // Visuels provisoires : remplacer les fichiers dans public/images/
  // (garder les mêmes noms, ou changer les chemins ici).
  images: {
    hero: '/images/hero.svg',
    collagePrincipal: { src: '/images/collage-brique.svg', alt: 'Mur de briques toulousaines' },
    collageSecondaire: { src: '/images/collage-registre.svg', alt: 'Registre comptable et stylo' },
  },
};

export const HERO_ROTATION = [
  'candidat au DSCG',
  "l'auteur de ces articles",
];

export const PARCOURS = [
  {
    titre: 'BTS Comptabilité et gestion',
    detail: '[Établissement, année]',
    texte: 'Les bases : comptabilité, fiscalité, gestion. [À compléter : ce que tu en retiens.]',
  },
  {
    titre: "Cabinet d'expertise comptable",
    detail: 'Toulouse · depuis 4 ans',
    texte: "Révision des comptes, fiscalité et échanges avec les dirigeants.",
  },
  {
    titre: 'DSCG',
    detail: 'En cours',
    texte:
      'Le diplôme supérieur de comptabilité et de gestion, préparé en parallèle de mon poste. Outils du quotidien : Pennylane, Excel, Notion, Next.js et JavaScript.',
  },
];

export const PROJETS = [
  {
    icone: 'calculatrice',
    titre: 'Simulateur de rémunération',
    texte: 'Comparer salaire et dividendes, et leur coût réel.',
    statut: 'en-cours',
  },
  {
    icone: 'fiche',
    titre: 'Fiches pratiques',
    texte: 'Des mémos courts sur les questions qui reviennent souvent.',
    statut: 'en-cours',
  },
  {
    icone: 'graphique',
    titre: 'Prévisionnel de trésorerie',
    texte: 'Anticiper les mois à venir à partir des données comptables.',
    statut: 'a-venir',
  },
];

export const MENTION_LEGALE =
  "Cet article donne une information générale, à jour à la date indiquée. Il ne remplace pas un conseil adapté à votre situation, à demander à votre expert-comptable.";
