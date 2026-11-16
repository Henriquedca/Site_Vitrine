import { Home } from '@/components/site/home';
import { getCreations, getEntries } from '@/lib/content';

export default async function Page() {
  const [articles, creations] = await Promise.all([getEntries('articles'), getCreations()]);
  return <Home articles={articles.slice(0, 3)} creations={creations.slice(0, 3)} />;
}
