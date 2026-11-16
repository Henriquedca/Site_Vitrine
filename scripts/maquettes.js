/**
 * Photographie toutes les pages du site (ordinateur et mobile, clair et sombre) pour la galerie des maquettes.
 * Prérequis : le site tourne sur http://localhost:3000 (npm run build puis npx next start), et Playwright est installé.
 * Usage : node scripts/maquettes.js <dossier-de-sortie>
 */
const { chromium } = require('playwright');
const path = require('node:path');
const fs = require('node:fs');

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const OUT = process.argv[2] || 'maquettes';

const PAGES = [
  ['accueil', '/'],
  ['articles', '/articles'],
  ['article', '/articles/salaire-ou-dividendes'],
  ['creations', '/creations'],
  ['outil', '/creations/outils/plan-de-tresorerie-12-mois'],
  ['a-propos', '/a-propos'],
  ['contact', '/contact'],
  ['mentions-legales', '/mentions-legales'],
  ['page-404', '/page-qui-n-existe-pas'],
];
const DEVICES = [
  ['ordi', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
];
const THEMES = ['clair', 'sombre'];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const [device, viewport] of DEVICES) {
    for (const theme of THEMES) {
      const page = await browser.newPage({ viewport, colorScheme: theme === 'sombre' ? 'dark' : 'light', deviceScaleFactor: 1 });
      for (const [name, url] of PAGES) {
        await page.goto(BASE + url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1200);
        const file = path.join(OUT, `${name}-${device}-${theme}.png`);
        await page.screenshot({ path: file, fullPage: true });
        console.log(file);
      }
      await page.close();
    }
  }
  await browser.close();
})();
