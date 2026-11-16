import { Home } from '@/components/site/home';
import { getArticles } from '@/lib/articles';

export default async function Page() {
  const articles = (await getArticles()).slice(0, 3);
  return <Home articles={articles} />;
}
