import { z } from 'zod';
import { defineSpec, link, t } from '../_shared/schema';

const schema = z.object({
  title: t(120),
  description: t(240),
  primary: link,
  secondary: link,
});

export const spec = defineSpec({
  type: 'cta-band',
  aliases: ['cta/banner'],
  name: 'Call to action, band',
  category: 'cta',
  role: 'body',
  description: 'A contrasting panel with a short headline and one or two actions, to close a page.',
  schema,
  defaults: {
    title: 'Ready to bring calm to your week?',
    description: 'Start free in a minute. Invite your team when you are ready.',
    primary: { label: 'Get started', href: '#start' },
    secondary: { label: 'Talk to us', href: '#contact' },
  },
});
