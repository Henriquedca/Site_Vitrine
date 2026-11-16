import { z } from 'zod';
import { defineSpec, link, t, req } from '../_shared/schema';

const post = z.object({ date: t(30), title: req(100), excerpt: t(200), category: t(30), href: t(300) });

const schema = z.object({
  eyebrow: t(60),
  title: t(120),
  description: t(300),
  posts: z.array(post).min(1).max(8),
  more: link,
});

export const spec = defineSpec({
  type: 'blog-list',
  aliases: ['blog/list'],
  name: 'Blog, list',
  category: 'blog',
  role: 'body',
  description: 'Post rows with date, title, excerpt and category, plus a link to the full archive.',
  schema,
  defaults: {
    eyebrow: 'Journal',
    title: 'Latest writing',
    description: 'Notes on planning, reviews and working well in a small team.',
    posts: [
      { date: 'Mar 12, 2026', title: 'A calmer way to run a weekly review', excerpt: 'Fifteen minutes, one page and no slides. The format we use every Friday.', category: 'Guide', href: '#post-1' },
      { date: 'Feb 27, 2026', title: 'What changed in version 2.0', excerpt: 'Workload planning, faster search and a rebuilt review flow, explained.', category: 'Product', href: '#post-2' },
      { date: 'Feb 9, 2026', title: 'How a five-person team ships weekly', excerpt: 'Small batches, written decisions and a strict limit on work in progress.', category: 'Company', href: '#post-3' },
      { date: 'Jan 21, 2026', title: 'Writing decisions down', excerpt: 'A short template that keeps the reasoning when the people move on.', category: 'Guide', href: '#post-4' },
    ],
    more: { label: 'View all posts', href: '#journal' },
  },
});
