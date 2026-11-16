# Consignes du projet

@AGENTS.md

- Échanger en français, étape par étape, en posant des questions dès qu'un choix revient à Henrique.
- Interface : Klarhimmel UI (voir `.claude/skills/klarhimmel-design/SKILL.md`). Installer un bloc avec `npm run add-block -- <nom>`, jamais `npx shadcn add` directement (voir README).
- `main` est la version publiée (Vercel). Le travail se fait sur une branche, puis `main` est mise à jour.

## Maquettes : après chaque modification visible du site

Mettre à jour la galerie des maquettes : https://claude.ai/artifact/Xsf5Q6Rq3dZ6t1ENcEU3pf

1. `SHOW_DRAFTS=true npm run build` puis `SHOW_DRAFTS=true npx next start -p 3000`.
2. `node scripts/maquettes.js <dossier>` : photographie chaque page (ordinateur et mobile, clair et sombre).
3. Convertir les PNG en WebP (`<page>-<ordi|mobile>-<clair|sombre>.webp`), mettre à jour « Dernière mise à jour »
   dans la page de la galerie et la republier à la même adresse, avec les images dans `shots/`.
   Ajouter les nouvelles pages à la liste `PAGES` du script et de la galerie.
