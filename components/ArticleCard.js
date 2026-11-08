import Link from 'next/link';
import { formatDate } from '@/lib/articles';
import styles from './ArticleCard.module.css';

// L'apparition au défilement est portée par le conteneur, le survol par la carte,
// pour que les deux transitions ne se gênent pas.
export default function ArticleCard({ article, delay = 0 }) {
  return (
    <div data-reveal style={{ '--d': `${delay}s` }} className={styles.wrap}>
      <Link href={`/articles/${article.slug}`} className={styles.card}>
        <div className={styles.media}>
          {article.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.img} src={article.image} alt={article.imageAlt} />
          ) : (
            <div className={`${styles.img} ${styles.placeholder}`} aria-hidden="true" />
          )}
        </div>
        <div className={styles.body}>
          <span className={styles.meta}>
            {formatDate(article.date)}
            {article.categorie ? ` · ${article.categorie}` : ''}
          </span>
          <h3 className={styles.title}>{article.titre}</h3>
        </div>
      </Link>
    </div>
  );
}
