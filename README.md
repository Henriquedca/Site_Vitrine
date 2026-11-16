# Site vitrine d'Henrique

Site public : l'accompagnement à venir (comptabilité, pilotage financier, contrôle de gestion), des articles et des créations (outils et veille).

Next.js 16 (App Router), React 19, Tailwind CSS 4 et [Klarhimmel UI](https://ui.klarhimmel.com) pour les blocs de page. Prévu pour Vercel.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Organisation

| Quoi | Où |
| --- | --- |
| Nom, sous-titre, e-mail, LinkedIn, pages du menu | `lib/site.ts` |
| Parcours : bio, formation, expérience, chiffres clés, portrait | `lib/profil.ts` |
| Couleurs, polices, arrondis du site | `lib/theme.ts` |
| Enveloppe commune (thème, menu, pied de page) | `components/site/site-shell.tsx` |
| Menu (copie de navbar-simple avec l'icône LinkedIn) | `components/site/site-navbar.tsx`, `components/site/linkedin-link.tsx` |
| Pied de page (avec le bouton LinkedIn) | `components/site/site-footer.tsx` |
| Largeur du contenu (toute la largeur de l'écran) | `app/globals.css` |
| Contenu de la page d'accueil | `components/site/home.tsx` |
| Blocs Klarhimmel installés (ne pas modifier à la main sauf besoin) | `components/klarhimmel/` |
| Articles (un fichier Markdown par article) | `content/articles/` |
| Outils présentés dans « Créations » | `content/outils/` |
| Notes de veille dans « Créations » | `content/veille/` |
| Page Contact | `components/site/contact.tsx` |
| Mentions légales et Confidentialité | `components/site/legal.tsx` |
| Vidéo de l'accroche (accueil) | `components/site/hero-video.tsx`, fichiers dans `public/videos/` |
| Images | `public/images/` |

## Écrire un article, une note de veille ou présenter un outil

Un fichier Markdown par contenu. Le nom du fichier devient l'adresse :

| Contenu | Dossier | Adresse |
| --- | --- | --- |
| Article | `content/articles/` | `/articles/<nom>` |
| Outil (présenté, pas en téléchargement) | `content/outils/` | `/creations/outils/<nom>` |
| Note de veille (courte) | `content/veille/` | `/creations/veille/<nom>` |

Les trois ont le même format. Un outil a en plus `format: Excel` (ou PDF, Notion…), affiché à côté de la date.

```markdown
---
titre: "Titre de l'article"
chapeau: "Une ou deux phrases de présentation (carte et début de l'article)."
categorie: Fiscalité
date: "2026-11-01"
image: /images/articles/mon-image.svg
imageSombre: /images/articles/mon-image-sombre.svg   # facultatif : version pour le mode sombre
imageAlt: "Description de l'image"
lecture: 6                # facultatif : calculé sinon
brouillon: true           # retirer (ou mettre false) pour publier
---

Introduction…

## Première partie

Texte, listes à puces, **gras**, liens et tableaux :

| Critère | Option A | Option B |
| --- | --- | --- |
| … | … | … |
```

- Les **brouillons** sont visibles en développement (`npm run dev`) et masqués sur le site en ligne. Pour les voir sur une
  version de production (par exemple un aperçu Vercel), définir la variable d'environnement `SHOW_DRAFTS=true`.
- L'accueil montre les trois derniers articles et les trois dernières créations (outils et veille mêlés). Une section sans contenu visible est masquée.
- Une mention est ajoutée automatiquement à la fin : « information générale » pour les articles et la veille, « pas en téléchargement, écrivez-moi » pour les outils.
- Les espaces insécables avant « : ; ? ! » sont ajoutées automatiquement.

## Ajouter un bloc Klarhimmel

```bash
npm run add-block -- <nom-du-bloc>
```

Les noms des blocs sont listés dans `.claude/skills/klarhimmel-design/SKILL.md`.

Pourquoi ce script plutôt que `npx shadcn add` directement : la police des titres, Bricolage Grotesque, a été ajoutée
à la liste des polices de Klarhimmel (`components/klarhimmel/theme/tokens.ts`, `fonts.css` et `fonts/bricolage-grotesque.css`).
Chaque installation réécrit ces fichiers communs ; le script (`scripts/add-block.sh`) installe le bloc puis refait l'ajout.

## Choix de design validés

- **Palette « Lin »** : fond lin clair, texte brun très foncé, accent brique pour les boutons. Mode sombre prévu.
- **Titres** en Bricolage Grotesque, **texte** en Inter.
- **Pages** : Accueil, Articles, Créations (outils et veille), À propos, Contact.
- **Accueil**, dans l'ordre : accroche, accompagnement complet (3 métiers), derniers articles, créations, qui suis-je, appel à me contacter.
- Pas de collecte de données des visiteurs : un simple « Me contacter ».
- Pas de barre au-dessus du menu ; l'e-mail n'apparaît que sur la page Contact et dans les pages légales ; LinkedIn est dans le menu (icône bleue) et dans le pied de page.
- Le contenu occupe toute la largeur de l'écran (les articles gardent une colonne de lecture étroite).
- Les outils sont présentés, jamais proposés en téléchargement.
