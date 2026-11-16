import { z } from 'zod';
import { defineSpec, t } from '../_shared/schema';

const schema = z.object({
  eyebrow: t(60),
  title: t(120),
  lead: t(300),
  items: z.array(z.object({ year: t(12), title: t(80), description: t(300) })).min(1).max(8),
});

export const spec = defineSpec({
  type: 'about-timeline',
  aliases: ['content/timeline'],
  name: 'About, timeline',
  category: 'content',
  role: 'body',
  description: 'Company milestones by year: a heading and lead, then a vertical list of years with a title and a few lines.',
  schema,
  defaults: {
    eyebrow: 'Our story',
    title: 'A few years of small, steady steps',
    lead: 'Northlight grew slowly, one useful change at a time.',
    items: [
      { year: '2022', title: 'A shared list', description: 'Two designers build a quiet task list for their own studio.' },
      { year: '2023', title: 'First customers', description: 'Ten studios and agencies adopt it and ask for weekly reviews.' },
      { year: '2025', title: 'Workload planning', description: 'Capacity view lands, and the team grows to five.' },
      { year: '2026', title: 'Version 2.0', description: 'A rebuilt review flow, faster search and a calmer interface.' },
    ],
  },
});
