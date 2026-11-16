import { z } from 'zod';
import { defineSpec, link, logo, media, t, req, mark, wordmark } from '../_shared/schema';

const schema = z.object({
  brand: req(40),
  /** Their logo in place of the brand name; the name stays for screen readers. Not drawn without a src. */
  wordmark,
  /** The brand mark before the wordmark: SVG paths in currentColor (or an image src), cap-height tall, aria-hidden. */
  mark,
  /** A brand mark before the wordmark (e.g. /favicon.svg). Not drawn without a src. */
  logo,
  /** Brand link target; default "/". */
  brandHref: t(300).optional(),
  links: z.array(link).max(8),
  /** An optional navigation disclosure, kept native so product links work without JavaScript. */
  products: z.object({
    label: t(24).default(''),
    layout: z.enum(['list', 'mega']).optional(),
    items: z.array(link.extend({ description: t(100), status: t(24).optional(), media: media.optional() })).max(8).default([]),
  }).optional(),
  dropdowns: z.array(z.object({
    label: t(24).default(''),
    layout: z.enum(['list', 'mega']).optional(),
    items: z.array(link.extend({ description: t(100), status: t(24).optional(), media: media.optional() })).max(8).default([]),
  })).max(4).optional(),
  /** The href of the current page's link: that link gets aria-current="page". */
  current: t(300).optional(),
  cta: link,
  /** Where the call to action sits on a phone with a menu: unset moves it into the menu when brand and button run past about 22 characters, false keeps it in the bar (a site that measured its header fits), true always moves it. */
  ctaInMenu: z.boolean().optional(),
  /** A second button beside the primary action; moves into the mobile menu in narrow containers. */
  secondaryCta: link.extend({ label: t(40).default(''), href: t(300).default('') }).optional(),
  search: z.object({ label: t(24).default(''), hint: t(12) }).optional(),
  secondary: link.optional(),
  /** The same page in another language, beside the theme toggle with a globe: label as the visitor reads it ("SV", "Svenska"), href, and that page's language code (hreflang, e.g. "sv"). */
  lang: z.object({ label: t(24).default(''), href: t(300).default(''), hreflang: t(16).default('') }).optional(),
  themeToggle: z.boolean().optional(),
  /** Sticks to the top of the viewport, on the solid canvas with a hairline. */
  sticky: z.boolean().optional(),
  /** Over a hero: transparent and without the hairline while the header has data-kh-at-top (set at scroll 0, by the block when it runs, or by a static page's own script). Without it, solid. The open menu is always solid. Use with sticky. */
  overlay: z.boolean().optional(),
});

export const spec = defineSpec({
  type: 'navbar-simple',
  aliases: ['navigation/simple', 'header/simple'],
  name: 'Navbar, simple',
  category: 'navbar',
  role: 'nav',
  description: 'Brand on the left, up to eight links, an optional search trigger, secondary link, language link and theme toggle, and one call to action. An optional Products disclosure holds short descriptions and status labels. Collapses to a menu in narrow containers.',
  schema,
  defaults: {
    brand: 'Northlight',
    links: [
      { label: 'Product', href: '#product' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Docs', href: '#docs' },
      { label: 'About', href: '#about' },
    ],
    cta: { label: 'Get started', href: '#start' },
    search: { label: 'Search', hint: '⌘K' },
    secondary: { label: 'GitHub', href: '#github' },
    themeToggle: true,
  },
});
