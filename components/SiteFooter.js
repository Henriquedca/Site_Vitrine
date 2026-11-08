import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer style={{ background: 'var(--pied)', color: '#9fb0a6' }}>
      <div
        className="container"
        style={{
          padding: '28px 24px', display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: 16, fontSize: 14,
        }}
      >
        <span style={{ fontFamily: 'var(--font-titre)', fontWeight: 700, color: '#fff' }}>{SITE.name}</span>
        <span>
          {SITE.city} · © {new Date().getFullYear()} ·{' '}
          <Link href="/confidentialite" style={{ color: '#c4cfc8' }}>Confidentialité</Link>
        </span>
      </div>
    </footer>
  );
}
