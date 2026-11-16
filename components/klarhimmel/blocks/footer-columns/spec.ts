import { z } from 'zod';
import { defineSpec, formFields, link, t, req, mark } from '../_shared/schema';

const schema = z.object({
  brand: t(40),
  /** Place the brand beside the columns or as a full-width SVG row beneath them. */
  brandLayout: z.enum(['column', 'wordmark']).optional(),
  /** The brand mark before the wordmark: SVG paths in currentColor (or an image src), cap-height tall, aria-hidden. */
  mark,
  tagline: t(160),
  columns: z.array(z.object({ title: t(40), links: z.array(link).max(8) })).max(4),
  legal: t(120),
  newsletter: z.object({ title: t(60).optional(), placeholder: req(60), submit: req(24), note: t(160), ...formFields }).optional(),
  legalLinks: z.array(link).max(6).optional(),
  /** The other sites and products of the same company, one row above the legal line ("Klarhimmel: Studio, Builder, Agent"), so every site's footer names the family the same way. */
  family: z.object({ label: t(40).default(''), links: z.array(link).max(8).default([]) }).optional(),
});

export const spec = defineSpec({
  type: 'footer-columns',
  aliases: ['footer/link-columns'],
  name: 'Footer, columns',
  category: 'footer',
  role: 'foot',
  description: 'Up to four link columns, with a brand column or a full-width SVG wordmark below, an optional newsletter form, an optional family row of sister sites and a legal line with legal links underneath.',
  schema,
  defaults: {
    brand: 'Northlight',
    tagline: 'Calm project work for small teams.',
    columns: [
      { title: 'Product', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'Changelog', href: '#changelog' }] },
      { title: 'Company', links: [{ label: 'About', href: '#about' }, { label: 'Careers', href: '#careers' }, { label: 'Contact', href: '#contact' }] },
      { title: 'Resources', links: [{ label: 'Docs', href: '#docs' }, { label: 'Guides', href: '#guides' }, { label: 'Status', href: '#status' }] },
    ],
    legal: '© 2026 Northlight. All rights reserved.',
    newsletter: { title: 'Stay in the loop', placeholder: 'you@example.com', submit: 'Subscribe', note: 'One short email a month. Unsubscribe any time.' },
    legalLinks: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
      { label: 'GitHub', href: '#github' },
      { label: 'LinkedIn', href: '#linkedin' },
    ],
  },
});
