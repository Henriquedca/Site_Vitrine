'use client';

import { safeHref } from '@/components/klarhimmel/ui/button';
import { Container } from '@/components/klarhimmel/blocks/_shared/kit';
import { FOCUS } from '@/components/klarhimmel/blocks/_shared/d-chrome-kit';
import { cn } from '@/components/klarhimmel/lib/utils';
import { CONTACT_PAGE, LEGAL_LINKS, PAGES, SITE } from '@/lib/site';
import { LinkedInIcon } from './icons';

const LINKS = [{ label: 'Accueil', href: '/' }, ...PAGES, { label: 'Contact', href: CONTACT_PAGE.href }];

const LINK = cn('inline-flex min-h-11 items-center rounded-kh-sm px-2 transition-colors hover:text-[var(--footer-ink)]', FOCUS);

/**
 * Pied de page du site : une bande compacte et sombre (couleurs dans app/globals.css, classe .site-footer).
 * Ce composant appartient au site : une réinstallation de Klarhimmel ne l'écrase pas.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer py-6">
      <Container className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:gap-6">
          <p className="text-kh-small font-semibold text-[var(--footer-ink)]">{SITE.name}</p>
          <nav aria-label="Pages du site">
            <ul className="-mx-2 flex flex-wrap text-kh-small">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={safeHref(l.href)} className={LINK}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(LINK, '-mx-2 gap-2 text-kh-small font-medium text-[var(--footer-accent)] hover:text-[var(--footer-accent)] hover:underline')}
          >
            <LinkedInIcon className="size-5" />
            LinkedIn
          </a>
        </div>
        <div className="flex flex-col gap-1 border-t border-[var(--footer-line)] pt-3 text-kh-caption @3xl:flex-row @3xl:items-center @3xl:justify-between">
          <p>© 2026 {SITE.name}</p>
          <nav aria-label="Informations légales">
            <ul className="-mx-2 flex flex-wrap">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={safeHref(l.href)} className={LINK}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
