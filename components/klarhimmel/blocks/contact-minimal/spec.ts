import { z } from 'zod';
import { defineSpec, t } from '../_shared/schema';

const schema = z.object({
  eyebrow: t(60),
  title: t(100),
  email: t(80),
  note: t(160),
  details: z.array(z.object({ label: t(30), value: t(120), href: t(300) })).max(3),
});

export const spec = defineSpec({
  type: 'contact-minimal',
  aliases: ['contact/minimal'],
  name: 'Contact, minimal',
  category: 'contact',
  role: 'body',
  description: 'Typographic contact: one oversized email link as the call to action, then up to three quiet details (phone, visit, hours) in columns. No form, no map.',
  schema,
  defaults: {
    eyebrow: 'Contact',
    title: 'Say hello',
    email: 'hello@example.com',
    note: 'We read everything and answer within a working day.',
    details: [
      { label: 'Phone', value: '+46 31 000 00 00', href: 'tel:+46310000000' },
      { label: 'Visit', value: 'Exempelgatan 12, Göteborg', href: 'https://example.com/map' },
      { label: 'Hours', value: 'Weekdays 09:00 to 17:00', href: '' },
    ],
  },
});
