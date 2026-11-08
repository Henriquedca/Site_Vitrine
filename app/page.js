import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Words from '@/components/Words';
import Counter from '@/components/Counter';
import ArticleCard from '@/components/ArticleCard';
import { ArrowDown, ArrowRight, Mail, LinkedIn, ProjetIcon } from '@/components/Icons';
import { getAllArticles } from '@/lib/articles';
import { SITE, HERO_ROTATION, PARCOURS, PROJETS } from '@/lib/site';
import s from './accueil.module.css';

export default function Accueil() {
  const articles = getAllArticles();
  const { email, linkedin } = SITE.contact;

  return (
    <>
      {/* 1. Haut de page */}
      <section id="top" className={s.hero} style={{ backgroundImage: `url(${SITE.images.hero})` }}>
        <div aria-hidden="true" className={s.heroVoile} />
        <SiteHeader variant="sombre" />
        <div className={s.heroContenu}>
          <span className={`h-in ${s.heroSurtitre}`}>Toulouse · Comptabilité · Gestion</span>
          <h1 className={s.heroTitre}>
            <Words text="Bonjour, je suis" mode="load" start={0.1} step={0.08} />
            <br />
            <Words text={`${SITE.name}.`} mode="load" start={0.38} className={s.prenom} />
          </h1>
          <div className={`h-in ${s.rotLigne}`} style={{ '--d': '.6s' }}>
            <span>Je suis</span>
            <span className={s.rotBoite}>
              {/* Lecteurs d'écran : la phrase entière, sans animation. */}
              <span className="sr-only">{HERO_ROTATION.join(', ')}</span>
              <span className={s.rotPile} aria-hidden="true">
                {HERO_ROTATION.map((t) => (
                  <span key={t} className={s.rotItem}>{t}</span>
                ))}
              </span>
            </span>
          </div>
          <a href="#bio" aria-label="Découvrir la suite" className={s.suite}>
            <ArrowDown />
          </a>
        </div>
      </section>

      <main>
        {/* 2. En quelques mots */}
        <section id="bio" className={s.bio}>
          <div className={s.collage} data-reveal>
            <span aria-hidden="true" className={s.collageTexte}>{SITE.name} · {SITE.city}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={s.collageA} src={SITE.images.collagePrincipal.src} alt={SITE.images.collagePrincipal.alt} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={s.collageB} src={SITE.images.collageSecondaire.src} alt={SITE.images.collageSecondaire.alt} />
          </div>
          <div className={s.bioTexte}>
            <span className="surtitre" data-reveal>En quelques mots</span>
            <Words as="h2" className="titre-section" text="Quatre ans de cabinet, et l'envie d'aller plus loin." />
            <p data-reveal>
              Je travaille depuis quatre ans en cabinet d&apos;expertise comptable à Toulouse. Après un BTS Comptabilité
              et gestion, je prépare aujourd&apos;hui le DSCG en parallèle de mon poste.
            </p>
            <p data-reveal>
              À côté, j&apos;apprends le développement web et je construis mes propres outils. Ce site rassemble mon
              parcours, mes articles et mes projets.
            </p>
            <span className={s.signature} data-reveal>{SITE.author}</span>
          </div>
        </section>

        {/* 3. En bref */}
        <section aria-label="En bref" className={s.bref}>
          <div className={s.brefInner}>
            <div className={s.brefIntro} data-reveal>
              <span className={s.brefSurtitre}>En bref</span>
              <span className={s.brefSous}>Mon parcours<br />en quelques chiffres</span>
            </div>
            <dl className={s.chiffres}>
              {[
                { val: <Counter value={4} />, txt: "années en cabinet d'expertise comptable" },
                { val: <Counter value={PROJETS.length} />, txt: "projets d'outils en cours ou à venir" },
                { val: 'DSCG', txt: 'en préparation, en parallèle de mon poste' },
                { val: <Counter value={articles.length} />, txt: articles.length > 1 ? 'articles publiés' : 'article publié' },
              ].map((c, i) => (
                <div key={i} className={s.chiffre} data-reveal style={{ '--d': `${i * 0.08}s` }}>
                  <dt className={s.chiffreTxt}>{c.txt}</dt>
                  <dd className={s.chiffreVal}>{c.val}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 4. Parcours */}
        <section id="parcours" className={s.parcours}>
          <span className="surtitre" data-reveal>Parcours</span>
          <Words as="h2" className="titre-section" style={{ marginBottom: 32 }} text="Trois étapes, un même fil." />
          <ol className={s.etapes}>
            {PARCOURS.map((e, i) => (
              <li key={e.titre} className={s.etape} data-reveal>
                <div className={s.etapeTete}>
                  <span className={s.etapeNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={s.etapeTitres}>
                    <b>{e.titre}</b>
                    <span>{e.detail}</span>
                  </div>
                </div>
                <p>{e.texte}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 5. Articles */}
        <section id="articles" className={s.articles}>
          <div className={s.articlesInner}>
            <div className={s.articlesTete}>
              <div className={s.pile}>
                <span className="surtitre" data-reveal>Articles</span>
                <Words as="h2" className="titre-section" text="Ce que j'écris" />
              </div>
              <Link href="/articles" className={s.lienFleche}>
                Tous les articles <ArrowRight />
              </Link>
            </div>
            {articles.length ? (
              <div className={s.cartes}>
                {articles.slice(0, 3).map((a, i) => (
                  <ArticleCard key={a.slug} article={a} delay={i * 0.08} />
                ))}
              </div>
            ) : (
              <p className={s.vide} data-reveal>Le premier article arrive bientôt.</p>
            )}
          </div>
        </section>

        {/* 6. Projets */}
        <section id="projets" className={s.projets}>
          <span className="surtitre" data-reveal>Projets</span>
          <Words as="h2" className="titre-section" text="Les outils que je construis" />
          <p className={s.projetsIntro} data-reveal>
            À côté de mon travail, je développe des outils pour mieux comprendre les chiffres.
          </p>
          <div className={s.grille}>
            {PROJETS.map((p, i) => (
              <div key={p.titre} className={s.cellule} data-reveal="zoom" style={{ '--d': `${i * 0.08}s` }}>
                <ProjetIcon name={p.icone} />
                <h3>{p.titre}</h3>
                <p>{p.texte}</p>
                {p.statut === 'en-cours' ? (
                  <span className={s.statutEnCours}>En cours</span>
                ) : (
                  <span className={s.statutAVenir}>À venir</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 7. Contact */}
        <section id="contact" className={s.contact}>
          <div className={s.contactInner}>
            <span className={s.contactSurtitre} data-reveal>Contact</span>
            <Words as="h2" className={s.contactTitre} text="Une question, un échange ?" />
            <p data-reveal>Sur un article, sur le métier ou sur un projet, écrivez-moi.</p>
            <div className={s.boutons} data-reveal>
              <a href={email ? `mailto:${email}` : '#contact'} className={s.btnPlein}>
                <Mail /> M&apos;écrire
              </a>
              <a
                href={linkedin || '#contact'}
                className={s.btnContour}
                {...(linkedin ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <LinkedIn /> LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
