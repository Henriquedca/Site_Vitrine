import { z } from 'zod';
import { defineSpec, media, t } from '../_shared/schema';

const schema = z.object({
  category: t(30),
  title: t(140),
  meta: t(80),
  author: z.object({ name: t(60), role: t(80), photo: media }),
  cover: media,
  body: t(12000).describe('Markdown prose: paragraphs separated by blank lines, ## section headings, ### subheadings, bullet lists, bold, code, links (https or the site\'s own /pages) and a paragraph that is only ![alt](src) as a picture. Raw HTML stays text.'),
});

export const spec = defineSpec({
  type: 'blog-post',
  aliases: ['blog/post'],
  name: 'Blog, post',
  category: 'blog',
  role: 'body',
  description: 'An article: category, title, date and reading time, author, cover image and a reading column of body text.',
  schema,
  defaults: {
    category: 'Guide',
    title: 'A calmer way to run a weekly review',
    meta: 'Mar 12, 2026 · 6 min read',
    author: { name: 'Ida Lindqvist', role: 'Product designer, Northlight', photo: { src: 'https://ui.klarhimmel.com/pictures/avatar-6.svg', srcDark: 'https://ui.klarhimmel.com/pictures/avatar-6-dark.svg', alt: 'Portrait of Ida Lindqvist' } },
    cover: { src: 'https://ui.klarhimmel.com/pictures/photo-desk2.avif', alt: 'A laptop and open notebooks on a wooden desk' },
    body: 'Most weekly reviews fail the same way: they grow. A ten minute check-in becomes an hour of status updates, and nobody remembers what was decided.\n\nWe keep ours to fifteen minutes and one page. Three questions, in this order: what moved, what is stuck, and what do we want to be true by next Friday.\n\nWrite the answers down before the meeting, not during it. The meeting is for deciding, not for reading aloud.\n\nWhen a review ends early, let it. The time you give back is the point.',
  },
});
