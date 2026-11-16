import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleView } from '@/components/site/article-view';
import { getArticle, getArticles } from '@/lib/articles';

/** Adresse factice tant qu'aucun article n'est publié : Next.js exige au moins une page générée. */
const PLACEHOLDER = '__aucun-article__';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.length ? articles.map((a) => ({ slug: a.slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<'/articles/[slug]'>): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  if (!article) return {};
  return { title: `${article.titre} · Henrique da Costa Araújo`, description: article.chapeau };
}

export default async function Page({ params }: PageProps<'/articles/[slug]'>) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
