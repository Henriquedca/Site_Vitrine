#!/usr/bin/env bash
# Installe un ou plusieurs blocs Klarhimmel, puis réapplique l'ajout local de la police Bricolage Grotesque
# (l'installation réécrit les fichiers communs du thème).
# Usage : npm run add-block -- features-grid blog-cards
set -euo pipefail
cd "$(dirname "$0")/.."
[ $# -gt 0 ] || { echo "Usage : npm run add-block -- <nom-du-bloc> [...]"; exit 1; }
npx --yes shadcn@latest add $(printf '@klarhimmel/%s ' "$@") --yes --overwrite
T=components/klarhimmel/theme
grep -q "'Bricolage Grotesque'" $T/tokens.ts || sed -i "s/'Oswald'\] as const;/'Oswald', 'Bricolage Grotesque'] as const;/" $T/tokens.ts
grep -q "bricolage-grotesque" $T/fonts.css || echo "@import './fonts/bricolage-grotesque.css';" >> $T/fonts.css
grep -q "'Bricolage Grotesque'" $T/tokens.ts && echo "Police Bricolage Grotesque : OK"
