import { z } from 'zod';
import { defineSpec, link, t } from '../_shared/schema';

const schema = z.object({
  brand: t(40),
  tagline: t(160),
  links: z.array(link).min(1).max(6),
  social: z.array(link).max(4),
  legal: t(160),
});

export const spec = defineSpec({
  type: 'footer-centered',
  aliases: ['footer/centered'],
  name: 'Footer, centered',
  category: 'footer',
  role: 'foot',
  description: 'A centred footer: brand and one-line tagline, a row of page links, a row of social links, then the legal line. For sites with five or six pages and no need for link columns.',
  schema,
  defaults: {
    brand: 'Northlight',
    tagline: 'Booking pages for small hotels.',
    links: [
      { label: 'Product', href: '/product' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Customers', href: '/customers' },
      { label: 'Help', href: '/help' },
      { label: 'Contact', href: '/contact' },
    ],
    social: [
      { label: 'LinkedIn', href: 'https://example.com/linkedin' },
      { label: 'Instagram', href: 'https://example.com/instagram' },
      { label: 'YouTube', href: 'https://example.com/youtube' },
    ],
    legal: '© 2026 Northlight AB. All rights reserved.',
  },
});
