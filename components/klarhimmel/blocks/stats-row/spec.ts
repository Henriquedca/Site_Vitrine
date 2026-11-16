import { z } from 'zod';
import { defineSpec, t } from '../_shared/schema';

const schema = z.object({
  title: t(120),
  description: t(300),
  items: z.array(z.object({ value: t(16), label: t(60) })).min(2).max(4),
});

export const spec = defineSpec({
  type: 'stats-row',
  aliases: ['stats/row'],
  name: 'Stats row',
  category: 'stats',
  role: 'body',
  description: 'A short heading and two to four large figures with labels.',
  schema,
  defaults: {
    title: 'Small numbers that add up',
    description: 'What teams tell us after their first quarter on Northlight.',
    items: [
      { value: '4.2 h', label: 'saved per person every week' },
      { value: '38%', label: 'fewer status meetings' },
      { value: '12,000+', label: 'projects delivered' },
      { value: '99.98%', label: 'uptime over the last year' },
    ],
  },
});
