# Site vitrine d'Henrique

Site personnel : présentation, parcours, articles, projets et contact.
Next.js 15 (App Router), React 19, prévu pour Vercel. Il est indépendant de l'espace privé (Home-Space).

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Où modifier quoi

| Quoi | Où |
| --- | --- |
| Nom affiché, e-mail, LinkedIn, chemins des visuels | `lib/site.js` |
| Étapes du parcours, projets, phrases du haut de page | `lib/site.js` |
| Textes de la page d'accueil (bio, titres) | `app/page.js` |
| Styles de l'accueil | `app/accueil.module.css` |
| Couleurs, polices, effets d'apparition | `app/globals.css` |
| Articles | `content/articles/*.md` |
| Visuels | `public/images/` |

## Écrire un article

Un fichier Markdown par article dans `content/articles/`. Le nom du fichier devient l'adresse (`/articles/<nom>`).

```markdown
---
titre: "Titre de l'article"
chapeau: "Une ou deux phrases de présentation."
categorie: Fiscalité
date: "2026-11-01"
miseAJour: "2026-11-15"   # facultatif
image: /images/mon-image.jpg
imageAlt: Description de l'image
lecture: 6                # facultatif, calculé sinon
brouillon: true           # retirer (ou mettre false) pour publier
aRetenir:
  - Premier point clé
  - Deuxième point clé
---

Introduction…

<!-- a-retenir -->

## Première partie
…
```

- Les titres `##` alimentent automatiquement le sommaire.
- Le repère `<!-- a-retenir -->` place l'encadré « À retenir » (sinon, il va en tête).
- Les tableaux Markdown sont pris en charge.
- La mention « information générale » est ajoutée à la fin de chaque article.
- **Brouillons** : visibles en développement, masqués en production. Pour les afficher sur un aperçu
  Vercel, définir la variable d'environnement `SHOW_DRAFTS=true`.
- Le chiffre « articles publiés » de l'accueil compte les articles visibles.

## Reste à faire

- [ ] Remplacer les visuels provisoires (`public/images/*.svg`) : portrait pour le haut de page, deux photos pour le collage, une image par article.
- [ ] Renseigner l'e-mail et le lien LinkedIn (`lib/site.js`).
- [ ] Décider du nom affiché et renseigner `SITE.url` après la mise en ligne.
- [ ] Compléter la bio et la ligne du BTS (établissement, année).
- [ ] Rédiger le premier article et retirer `brouillon: true`.
- [ ] Compléter le nom du responsable dans `app/confidentialite/page.js`.
