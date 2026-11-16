import { z } from 'zod';
import { defineSpec, link, media, t, req } from '../_shared/schema';

const post = z.object({ category: t(30), title: req(100), excerpt: t(200), meta: t(60), href: t(300), media });

const schema = z.object({
  /** Omit the section heading when the surrounding page already provides it. */
  showHeader: z.boolean().optional(),
  eyebrow: t(60),
  title: t(120),
  description: t(300),
  posts: z.array(post).min(1).max(6),
  more: link,
});

export const spec = defineSpec({
  type: 'blog-cards',
  aliases: ['blog/cards'],
  name: 'Blog, cards',
  category: 'blog',
  role: 'body',
  description: 'A grid of article cards with image, category, title, excerpt and date, plus a link to all posts.',
  schema,
  defaults: {
    eyebrow: 'Journal',
    title: 'Notes on working well',
    description: 'Short, practical writing from the people building Northlight.',
    posts: [
      { category: 'Guide', title: 'A calmer way to run a weekly review', excerpt: 'Fifteen minutes, one page and no slides. The format we use every Friday.', meta: 'Mar 12, 2026 · 6 min read', href: '#post-1', media: { src: 'https://ui.klarhimmel.com/pictures/photo-desk1.avif', alt: 'An open notebook with a pen and pencils on a desk' } },
      { category: 'Product', title: 'What changed in version 2.0', excerpt: 'Workload planning, faster search and a rebuilt review flow, explained.', meta: 'Feb 27, 2026 · 4 min read', href: '#post-2', media: { src: 'https://ui.klarhimmel.com/pictures/scr-calendar.avif', srcDark: 'https://ui.klarhimmel.com/pictures/scr-calendar-dark.avif', alt: 'A month calendar with one day selected' } },
      { category: 'Company', title: 'How a five-person team ships weekly', excerpt: 'Small batches, written decisions and a strict limit on work in progress.', meta: 'Feb 9, 2026 · 8 min read', href: '#post-3', media: { src: 'https://ui.klarhimmel.com/pictures/photo-office2.avif', alt: 'A meeting room with a long table and a window wall' } },
    ],
    more: { label: 'View all posts', href: '#journal' },
  },
});
