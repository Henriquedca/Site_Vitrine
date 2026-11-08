import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SITE } from '@/lib/site';
import s from '../articles/articles.module.css';

export const metadata = { title: 'Confidentialité' };

export default function Confidentialite() {
  return (
    <>
      <SiteHeader />
      <main>
        <header className={s.tete} style={{ paddingTop: 72 }}>
          <span className="surtitre">Mentions</span>
          <h1 className={s.titre}>Confidentialité</h1>
        </header>
        <div className={s.corpsFond}>
          <div className={s.corps}>
            <div className={s.texte}>
              <div className={s.prose}>
                <p>
                  Ce site est un site personnel de présentation. Il ne vend rien, ne propose pas de compte utilisateur et
                  ne contient pas de formulaire.
                </p>
                <h2>Données collectées</h2>
                <p>
                  Aucun cookie publicitaire ni outil de mesure d&apos;audience n&apos;est utilisé. Les polices sont
                  servies par le site lui-même : aucune requête n&apos;est envoyée à un service tiers lors de votre
                  visite.
                </p>
                <p>
                  Si vous m&apos;écrivez par e-mail, votre message et votre adresse ne servent qu&apos;à vous répondre.
                  Ils ne sont ni partagés ni utilisés à d&apos;autres fins.
                </p>
                <h2>Hébergement</h2>
                <p>
                  Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Comme tout
                  hébergeur, Vercel peut conserver des journaux techniques (adresse IP, date de la requête) pour assurer
                  la sécurité du service.
                </p>
                <h2>Responsable et contact</h2>
                <p>
                  Responsable du site : {SITE.author} [nom complet], {SITE.city}.{' '}
                  {SITE.contact.email ? (
                    <>
                      Pour toute question : <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>.
                    </>
                  ) : (
                    '[Adresse e-mail de contact à renseigner.]'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
