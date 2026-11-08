import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Words from '@/components/Words';
import ArticleCard from '@/components/ArticleCard';
import { getAllArticles } from '@/lib/articles';
import s from './articles.module.css';

export const metadata = {
  title: 'Articles',
  description: 'Articles de comptabilité, de fiscalité et de gestion, écrits depuis le terrain du cabinet.',
};

export default function Articles() {
  const articles = getAllArticles();
  return (
    <>
      <SiteHeader actif="articles" />
      <main>
        <section className={s.listeTete}>
          <span className="surtitre" data-reveal>Articles</span>
          <Words as="h1" className="titre-section" text="Ce que j'écris" />
          <p className={s.listeIntro} data-reveal>
            Des questions qui reviennent souvent en cabinet, expliquées simplement. Chaque article donne une information
            générale et ne remplace pas un conseil adapté à votre situation.
          </p>
        </section>
        <section className={s.listeCorps}>
          <div className={s.listeInner}>
            {articles.length ? (
              <div className={s.cartes}>
                {articles.map((a, i) => (
                  <ArticleCard key={a.slug} article={a} delay={(i % 3) * 0.08} />
                ))}
              </div>
            ) : (
              <p className={s.vide}>Le premier article arrive bientôt.</p>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
