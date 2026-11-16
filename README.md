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
| Couleurs, polices, arrondis du site | `lib/theme.ts` |
| Enveloppe commune (thème, menu, pied de page) | `components/site/site-shell.tsx` |
| Contenu de la page d'accueil | `components/site/home.tsx` |
| Blocs Klarhimmel installés (ne pas modifier à la main sauf besoin) | `components/klarhimmel/` |
| Images | `public/images/` |

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
