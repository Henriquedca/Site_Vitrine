'use client';

import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import BlogPost from '@/components/klarhimmel/blocks/blog-post';
import type { Entry } from '@/lib/collections';
import { CONTACT_PAGE, SITE } from '@/lib/site';
import { entryMeta } from './entry-cards';
import { SiteShell } from './site-shell';

/** Mention ajoutée à la fin de chaque contenu, selon sa collection. */
const NOTICES = {
  articles: '**Bon à savoir** : cet article donne une information générale. Il ne remplace pas un conseil adapté à votre situation.',
  veille: '**Bon à savoir** : cette note donne une information générale, à jour à sa date de publication. Elle ne remplace pas un conseil adapté à votre situation.',
  outils: `**Cet outil n’est pas en téléchargement.** Pour en savoir plus ou le voir fonctionner, [écrivez-moi](${CONTACT_PAGE.href}).`,
} as const;

/** Page de lecture commune aux articles, aux outils et à la veille. */
export function EntryView({ entry }: { entry: Entry }) {
  return (
    <SiteShell current={entry.collection === 'articles' ? '/articles' : '/creations'}>
      <BlockSurface type="blog-post">
        <BlogPost
          props={{
            category: entry.categorie,
            title: entry.titre,
            meta: entryMeta(entry),
            author: {
              name: SITE.name,
              role: SITE.subtitle,
              photo: { src: '/images/avatar.svg', srcDark: '/images/avatar-sombre.svg', alt: '' },
            },
            cover: { src: entry.image, srcDark: entry.imageSombre, alt: entry.imageAlt },
            body: `${entry.chapeau}\n\n${entry.body}\n\n${NOTICES[entry.collection]}`,
          }}
        />
      </BlockSurface>
    </SiteShell>
  );
}
