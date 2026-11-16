'use client';

import { ButtonLink, safeHref } from '@/components/klarhimmel/ui/button';
import { Container } from '@/components/klarhimmel/blocks/_shared/kit';
import { FOCUS } from '@/components/klarhimmel/blocks/_shared/d-chrome-kit';
import { cn } from '@/components/klarhimmel/lib/utils';
import { CONTACT_PAGE, LEGAL_LINKS, PAGES, SITE } from '@/lib/site';
import { LinkedInIcon } from './icons';

const COLUMNS = [
  { title: 'Le site', links: [{ label: 'Accueil', href: '/' }, ...PAGES] },
  { title: 'Contact', links: [CONTACT_PAGE] },
];

const LINK = cn('inline-flex min-h-11 items-center rounded-kh-sm text-kh-small text-kh-muted transition-colors hover:text-kh-ink', FOCUS);

/**
 * Pied de page du site : même style que le bloc Klarhimmel « footer-columns », avec un bouton LinkedIn et son logo
 * (le bloc n'affiche pas d'icônes). Ce composant appartient au site : une réinstallation de Klarhimmel ne l'écrase pas.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-kh-line bg-kh-canvas py-16">
      <Container>
        <div className="grid gap-8 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)]">
          <div>
            <p className="text-kh-heading font-semibold tracking-tight">{SITE.name}</p>
            <p className="mt-3 max-w-xs text-kh-small text-kh-muted">
              {SITE.subtitle}. Un accompagnement complet pour les dirigeants, prévu d’ici 2030.
            </p>
            <ButtonLink
              href={SITE.linkedin}
              variant="secondary"
              className="mt-6"
              icon={<LinkedInIcon />}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </ButtonLink>
          </div>
          <div className="grid w-full max-w-[40rem] grid-cols-2 gap-x-4 gap-y-8">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-kh-small font-medium text-kh-ink">{col.title}</h2>
                <ul className="mt-3 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <a href={safeHref(l.href)} className={LINK}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-kh-line pt-4 @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:gap-6">
          <p className="text-kh-caption text-kh-muted">© 2026 {SITE.name}</p>
          <nav aria-label="Informations légales">
            <ul className="-mx-2 flex flex-wrap @3xl:mx-0 @3xl:-mr-2">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={safeHref(l.href)} className={cn(LINK, 'px-2 text-kh-caption')}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
