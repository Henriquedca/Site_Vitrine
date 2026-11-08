import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Logo from '@/components/Logo';
import { getAllArticles, getArticle, renderArticle, formatDate } from '@/lib/articles';
import { SITE, MENTION_LEGALE } from '@/lib/site';
import s from '../articles.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.titre,
    description: article.chapeau,
    openGraph: { type: 'article', title: article.titre, description: article.chapeau, publishedTime: article.date ?? undefined },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { html, toc } = renderArticle(article);
  const autres = getAllArticles().filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <SiteHeader actif="articles" />
      <main>
        <nav aria-label="Fil d'Ariane" className={s.ariane}>
          <Link href="/">Accueil</Link>
          <span aria-hidden="true">/</span>
          <Link href="/articles">Articles</Link>
          {article.categorie ? (
            <>
              <span aria-hidden="true">/</span>
              <span>{article.categorie}</span>
            </>
          ) : null}
        </nav>

        <article>
          <header className={s.tete}>
            {article.categorie ? <span className="surtitre">{article.categorie}</span> : null}
            <h1 className={s.titre}>{article.titre}</h1>
            {article.chapeau ? <p className={s.chapeau}>{article.chapeau}</p> : null}
            <div className={s.meta}>
              <span className={s.auteur}>
                <span aria-hidden="true" className={s.avatar}>{SITE.author.charAt(0)}</span>
                {SITE.author}
              </span>
              <span>
                Publié le <time dateTime={article.date ?? undefined}>{formatDate(article.date)}</time>
              </span>
              {article.miseAJour ? (
                <span>
                  Mis à jour le <time dateTime={article.miseAJour}>{formatDate(article.miseAJour)}</time>
                </span>
              ) : null}
              <span>{article.lecture} min de lecture</span>
            </div>
          </header>

          <div className={s.corpsFond}>
            <div className={s.corps}>
              {toc.length ? (
                <aside className={s.sommaire}>
                  <h2>Sommaire</h2>
                  <ol>
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`}>{t.titre}</a>
                      </li>
                    ))}
                  </ol>
                </aside>
              ) : null}
              <div className={s.texte}>
                <div className={s.prose} dangerouslySetInnerHTML={{ __html: html }} />
                <p className={s.mention}>{MENTION_LEGALE}</p>
              </div>
            </div>
          </div>
        </article>

        <section className={s.apres}>
          <div className={s.encartAuteur}>
            <Logo variant="eucalyptus" />
            <div className={s.encartTexte}>
              <strong>{SITE.author}</strong>
              <span>Quatre ans en cabinet d&apos;expertise comptable à Toulouse et candidat au DSCG.</span>
            </div>
            <Link href="/#parcours" className={s.encartLien}>Voir mon parcours</Link>
          </div>

          {autres.length ? (
            <div className={s.aLire}>
              <span className="surtitre">À lire aussi</span>
              <div className={s.aLireGrille}>
                {autres.map((a) => (
                  <Link key={a.slug} href={`/articles/${a.slug}`} className={s.aLireCarte}>
                    {a.categorie ? <span className={s.pastille}>{a.categorie}</span> : null}
                    <h3>{a.titre}</h3>
                    <span className={s.aLireMeta}>
                      {formatDate(a.date)} · {a.lecture} min de lecture
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
