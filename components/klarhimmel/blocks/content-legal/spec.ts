import { z } from 'zod';
import { defineSpec, t, req } from '../_shared/schema';

const schema = z.object({
  eyebrow: t(60),
  title: t(100),
  updated: t(60),
  intro: t(500),
  contentsLabel: t(40),
  sections: z.array(z.object({ title: req(80), body: t(1200) })).min(2).max(8),
});

export const spec = defineSpec({
  type: 'content-legal',
  aliases: ['content/legal'],
  name: 'Content, policy document',
  category: 'content',
  role: 'body',
  description: 'A policy or terms page: title and last-updated line, a sticky contents list that jumps to numbered sections (plain anchors, no script), and the sections themselves.',
  schema,
  defaults: {
    eyebrow: 'Legal',
    title: 'Privacy policy',
    updated: 'Last updated 1 October 2026',
    intro: 'This explains what Exempelhotellet collects when you book a stay, why, and how long we keep it. It is written to be read.',
    contentsLabel: 'On this page',
    sections: [
      { title: 'What we collect', body: 'Your name, email address and phone number, the dates of your stay, and the payment reference from our payment provider. We never see or store full card numbers.' },
      { title: 'Why we collect it', body: 'To confirm your booking, to contact you if something changes, and to meet accounting and tax rules that require us to keep invoices.' },
      { title: 'How long we keep it', body: 'Booking details for two years after your stay, invoices for seven years as the law requires. After that they are deleted automatically.' },
      { title: 'Who else sees it', body: 'Our payment provider and our email service, both inside the EU and both bound by a data processing agreement. We never sell data.' },
      { title: 'Your rights', body: 'You can ask to see, correct or delete what we hold about you at any time. Write to privacy@example.com and we answer within 30 days.' },
    ],
  },
});
