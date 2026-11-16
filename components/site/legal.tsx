'use client';

import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import ContentLegal from '@/components/klarhimmel/blocks/content-legal';
import { SITE } from '@/lib/site';
import { SiteShell } from './site-shell';

const UPDATED = 'Mis à jour le 16 novembre 2026';

// À VÉRIFIER avant la mise en ligne définitive : l'adresse de l'hébergeur (page légale de Vercel).
const HOST = 'Vercel Inc.\n440 N Barranca Ave #4133, Covina, CA 91723, États-Unis\nvercel.com';

export function MentionsLegales() {
  return (
    <SiteShell current="/mentions-legales">
      <BlockSurface type="content-legal">
        <ContentLegal
          props={{
            eyebrow: 'Informations légales',
            title: 'Mentions légales',
            updated: UPDATED,
            intro: '',
            contentsLabel: 'Sommaire',
            sections: [
              {
                title: 'Éditeur du site',
                body: `Ce site est édité par ${SITE.name}, à titre personnel.\nContact : ${SITE.email}\nDirecteur de la publication : ${SITE.name}.`,
              },
              { title: 'Hébergement', body: `Le site est hébergé par :\n${HOST}` },
              {
                title: 'Activité',
                body: `${SITE.name} n’est pas encore expert-comptable inscrit à l’Ordre des experts-comptables. Ce site présente un parcours, des articles et des créations ; il ne propose aucune prestation d’expertise comptable. L’accompagnement présenté sur ce site est un projet, prévu après l’obtention du diplôme d’expertise comptable.`,
              },
              {
                title: 'Contenus et responsabilité',
                body: 'Les articles, notes de veille et outils présentés donnent une information générale, à jour à leur date de publication. Ils ne constituent pas un conseil adapté à une situation particulière.',
              },
              {
                title: 'Propriété intellectuelle',
                body: `Les textes, illustrations et outils présentés sur ce site sont la propriété de ${SITE.name}. Toute reproduction, même partielle, demande une autorisation préalable.`,
              },
              { title: 'Données personnelles', body: 'Voir la page Confidentialité.' },
            ],
          }}
        />
      </BlockSurface>
    </SiteShell>
  );
}

export function Confidentialite() {
  return (
    <SiteShell current="/confidentialite">
      <BlockSurface type="content-legal">
        <ContentLegal
          props={{
            eyebrow: 'Informations légales',
            title: 'Confidentialité',
            updated: UPDATED,
            intro: 'Ce site ne vous demande aucune information pour être consulté. Voici ce qui est traité, et pourquoi.',
            contentsLabel: 'Sommaire',
            sections: [
              {
                title: 'Ce que le site ne collecte pas',
                body: 'Pas de formulaire, pas de compte, pas de cookie publicitaire ni de mesure d’audience. Les polices et les images sont servies par le site lui-même : aucun service tiers n’est appelé pendant votre visite.',
              },
              {
                title: 'Préférence d’affichage',
                body: 'Le site peut enregistrer dans votre navigateur votre préférence d’affichage (clair ou sombre). Cette information reste sur votre appareil et n’est pas transmise.',
              },
              {
                title: 'Journaux de l’hébergeur',
                body: 'Comme tout hébergeur, Vercel traite des données techniques (adresse IP, pages demandées, date et heure) pour faire fonctionner et sécuriser le site.',
              },
              {
                title: 'Si vous m’écrivez',
                body: 'Votre adresse e-mail et votre message servent uniquement à vous répondre. Ils ne sont transmis à personne et sont conservés le temps de l’échange.',
              },
              {
                title: 'Vos droits',
                body: `Vous pouvez demander l’accès, la rectification ou l’effacement de vos données en écrivant à ${SITE.email}. Vous pouvez aussi adresser une réclamation à la CNIL (cnil.fr).`,
              },
            ],
          }}
        />
      </BlockSurface>
    </SiteShell>
  );
}
