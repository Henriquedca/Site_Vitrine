'use client';

import { FOCUS } from '@/components/klarhimmel/blocks/_shared/d-chrome-kit';
import { cn } from '@/components/klarhimmel/lib/utils';
import { SITE } from '@/lib/site';
import { LinkedInIcon } from './icons';

/** Icône LinkedIn du menu : un carré de 44 px (taille tactile), logo en bleu LinkedIn, ouvre le profil dans un nouvel onglet. */
export function LinkedInLink() {
  return (
    <a
      href={SITE.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn (nouvel onglet)"
      title="LinkedIn"
      className={cn('inline-flex size-11 shrink-0 items-center justify-center rounded-kh transition-colors hover:bg-kh-surface-2', FOCUS)}
    >
      <LinkedInIcon className="size-6" />
    </a>
  );
}
