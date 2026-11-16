import { z } from 'zod';
import { defineSpec, link, media, t } from '../_shared/schema';

const schema = z.object({
  eyebrow: t(60),
  title: t(120),
  description: t(300),
  primary: link,
  secondary: link,
  media,
  command: t(120).optional(),
  note: t(80).optional(),
});

export const spec = defineSpec({
  type: 'hero-split',
  aliases: ['hero/split'],
  name: 'Hero, split',
  category: 'hero',
  role: 'body',
  description: 'Headline, short description and two actions on the left; an image on the right. Stacks in narrow containers.',
  schema,
  defaults: {
    eyebrow: 'Now in public beta',
    title: 'Plan, ship and review your work in one calm place',
    description: 'Northlight brings briefs, tasks and approvals together, so small teams spend their week building instead of chasing updates.',
    primary: { label: 'Start for free', href: '#start' },
    secondary: { label: 'See how it works', href: '#how' },
    media: { src: 'https://ui.klarhimmel.com/pictures/scr-table.avif', srcDark: 'https://ui.klarhimmel.com/pictures/scr-table-dark.avif', alt: 'A sortable table of arrivals with guest, nights and arrival date' },
    command: 'npm create northlight@latest',
    note: 'Free for teams of up to five.',
  },
});
