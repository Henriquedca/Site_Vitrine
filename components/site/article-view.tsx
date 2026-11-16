'use client';

import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import BlogPost from '@/components/klarhimmel/blocks/blog-post';
import type { Article } from '@/lib/articles';
import { SITE } from '@/lib/site';
import { articleMeta } from './article-cards';
import { SiteShell } from './site-shell';

/** Mention ajoutée à la fin de chaque article. */
const NOTICE =
  '**Bon à savoir**\u00a0: cet article donne une information générale. Il ne remplace pas un conseil adapté à votre situation.';

export function ArticleView({ article }: { article: Article }) {
  return (
    <SiteShell current="/articles">
      <BlockSurface type="blog-post">
        <BlogPost
          props={{
            category: article.categorie,
            title: article.titre,
            meta: articleMeta(article),
            author: {
              name: SITE.name,
              role: SITE.subtitle,
              photo: { src: '/images/avatar.svg', srcDark: '/images/avatar-sombre.svg', alt: '' },
            },
            cover: { src: article.image, srcDark: article.imageSombre, alt: article.imageAlt },
            body: `${article.chapeau}\n\n${article.body}\n\n${NOTICE}`,
          }}
        />
      </BlockSurface>
    </SiteShell>
  );
}
