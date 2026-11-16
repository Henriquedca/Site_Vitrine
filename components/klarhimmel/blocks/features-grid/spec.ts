import { z } from 'zod';
import { defineSpec, icon, t } from '../_shared/schema';

const schema = z.object({
  eyebrow: t(60),
  title: t(120),
  description: t(300),
  /** Columns at the widest container: '2' | '3' | '4'. Unset = 3. */
  columns: z.enum(['2', '3', '4']).optional(),
  items: z.array(z.object({ icon: icon.optional(), title: t(60), description: t(200) })).min(1).max(9),
});

export const spec = defineSpec({
  type: 'features-grid',
  aliases: ['features/grid'],
  name: 'Features, grid',
  category: 'features',
  role: 'body',
  description: 'Optional section heading and a grid of up to nine features, each with an optional icon, a title and a short description. Two to four columns.',
  schema,
  defaults: {
    columns: '3',
    eyebrow: 'Features',
    title: 'Everything a small team needs, nothing it does not',
    description: 'A focused set of tools that stay out of the way and keep everyone looking at the same page.',
    items: [
      { icon: 'layers', title: 'Shared boards', description: 'See every project at a glance and move work forward without a meeting.' },
      { icon: 'zap', title: 'Fast by default', description: 'Pages open instantly and search answers as you type, even on large workspaces.' },
      { icon: 'shield', title: 'Private by design', description: 'Your data stays in your workspace. Roles and audit logs are built in.' },
      { icon: 'users', title: 'Built for review', description: 'Comment on the work itself, request changes and approve with one click.' },
      { icon: 'chart', title: 'Clear reporting', description: 'Weekly summaries show what shipped, what slipped and what is next.' },
      { icon: 'settings', title: 'Fits your process', description: 'Rename stages, add fields and automate the handoffs you repeat every week.' },
    ],
  },
});
