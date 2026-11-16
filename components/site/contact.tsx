'use client';

import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import ContactChannels from '@/components/klarhimmel/blocks/contact-channels';
import { SITE } from '@/lib/site';
import { SiteShell } from './site-shell';

export function Contact() {
  return (
    <SiteShell current="/contact">
      <BlockSurface type="contact-channels">
        <ContactChannels
          props={{
            headingLevel: 1,
            eyebrow: 'Contact',
            title: 'Écrivez-moi',
            description:
              'Une question sur vos chiffres, un retour sur un article ou un projet à partager : je réponds personnellement.',
            channels: [
              {
                icon: 'mail',
                name: 'E-mail',
                detail: 'Le plus simple pour une question ou un échange.',
                value: SITE.email,
                href: `mailto:${SITE.email}`,
                response: '',
              },
              {
                icon: 'users',
                name: 'LinkedIn',
                detail: 'Pour suivre mon parcours et échanger.',
                value: SITE.name,
                href: SITE.linkedin,
                response: '',
              },
            ],
          }}
        />
      </BlockSurface>
    </SiteShell>
  );
}
