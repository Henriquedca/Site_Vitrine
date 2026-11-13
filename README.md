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

## Principes de design (à respecter pour toute modification)

1. **Hiérarchie visuelle** : l'élément le plus important de chaque section est le plus grand et le plus gras ; le reste est plus discret.
2. **Un seul appel à l'action principal par zone**, bien contrasté (bouton plein argile `#e8a88f`, texte encre `#18241f`). **Pas de bouton « fantôme »** (contour sans fond).
3. **Règle 60-30-10** : 60 % de neutres (blanc, fond `#f5f7f4`, sauge `#edf0eb`), 30 % de vert (`#23392f`, `#3f6b5c`, `#18241f`), 10 % d'argile pour les actions et les accents.
4. **Contraste** : au moins 4,5:1 pour le texte courant. L'argile `#b5654a` ne passe pas pour un petit texte sur fond clair : utiliser `#9c4f36` (≥ 5:1), ou réserver `#b5654a` aux grands textes et aux décors.
5. **Typographie** : un seul H1 par page, des H2 pour découper la page, du texte courant en Inter 400 (pas de graisse légère ni de police décorative pour les paragraphes).
6. **Clarté** : dès le haut de page, on sait qui est Henrique, ce qu'il fait et quoi faire ensuite (le contacter, lire, voir les projets).
7. **Lisibilité en diagonale** : titres courts, paragraphes courts, cartes et listes plutôt que longs blocs.
8. **Penser au visiteur**, pas aux goûts personnels. Publics visés : les **dirigeants d'entreprise** (comprendre leurs chiffres) et les **experts-comptables et DAF** (voir ce que vaut Henrique). Le site sert de vitrine de compétences : chaque section doit apporter une preuve (repères chiffrés, savoir-faire, parcours, articles, projets).
