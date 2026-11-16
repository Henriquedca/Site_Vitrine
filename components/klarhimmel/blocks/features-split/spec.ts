import { z } from 'zod';
import { defineSpec, media, t } from '../_shared/schema';

const schema = z.object({
  eyebrow: t(60),
  title: t(120),
  description: t(300),
  items: z
    .array(z.object({ title: t(80), description: t(300), points: z.array(t(80)).max(4), media }))
    .min(1)
    .max(4),
});

export const spec = defineSpec({
  type: 'features-split',
  aliases: ['features/alternating'],
  name: 'Features, alternating',
  category: 'features',
  role: 'body',
  description: 'Feature rows with copy beside an image, alternating sides. Each row has a title, description and up to four points.',
  schema,
  defaults: {
    eyebrow: 'How it works',
    title: 'From first idea to finished work',
    description: 'Three steps that replace a pile of tools with one clear flow.',
    items: [
      {
        title: 'Capture everything in one inbox',
        description: 'Requests arrive from email, forms and chat, and land in a single list that is easy to sort and assign.',
        points: ['Forward an email to add a task', 'Turn messages into tasks', 'Assign owners and due dates'],
        media: { src: 'https://ui.klarhimmel.com/pictures/scr-table.avif', srcDark: 'https://ui.klarhimmel.com/pictures/scr-table-dark.avif', alt: 'A sortable table of arrivals with guest, nights and arrival date' },
      },
      {
        title: 'Plan the week together',
        description: 'Drag work onto a shared calendar and see at once who has room and who is stretched thin.',
        points: ['Workload view per person', 'Drag to reschedule', 'Automatic conflict warnings'],
        media: { src: 'https://ui.klarhimmel.com/pictures/scr-calendar.avif', srcDark: 'https://ui.klarhimmel.com/pictures/scr-calendar-dark.avif', alt: 'A month calendar with one day selected' },
      },
      {
        title: 'Review and ship with confidence',
        description: 'Reviewers comment on the work itself and approve in one click. Nothing goes out unseen.',
        points: ['Inline comments', 'Version history', 'One-click approval'],
        media: { src: 'https://ui.klarhimmel.com/pictures/scr-report.avif', srcDark: 'https://ui.klarhimmel.com/pictures/scr-report-dark.avif', alt: 'A search readiness report with an overall score and its findings' },
      },
    ],
  },
});
