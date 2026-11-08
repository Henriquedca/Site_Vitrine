import Link from 'next/link';
import Logo from './Logo';
import { SITE } from '@/lib/site';
import styles from './SiteHeader.module.css';

const LIENS = [
  { href: '/#parcours', label: 'Parcours', key: 'parcours' },
  { href: '/articles', label: 'Articles', key: 'articles' },
  { href: '/#projets', label: 'Projets', key: 'projets' },
  { href: '/#contact', label: 'Contact', key: 'contact' },
];

// variant « sombre » : posé sur l'image du haut de page (texte blanc).
// variant « clair » : pages intérieures (fond de page, texte encre).
export default function SiteHeader({ variant = 'clair', actif }) {
  const sombre = variant === 'sombre';
  return (
    <header className={`${styles.header} ${sombre ? styles.sombre : styles.clair}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <Logo variant={sombre ? 'clair' : 'eucalyptus'} />
          <span>{SITE.name}</span>
        </Link>
        <nav aria-label="Navigation principale" className={styles.nav}>
          {LIENS.map((l) => (
            <Link
              key={l.key}
              href={sombre && l.key !== 'articles' ? l.href.replace('/', '') : l.href}
              className={styles.link}
              aria-current={actif === l.key ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
