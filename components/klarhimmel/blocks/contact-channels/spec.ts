import { z } from 'zod';
import { defineSpec, icon, req, t } from '../_shared/schema';

const schema = z.object({
  eyebrow: t(60),
  title: req(120),
  description: t(300),
  channels: z.array(z.object({
    icon,
    name: req(30),
    detail: t(100),
    value: req(60),
    href: t(300),
    response: t(40),
  })).min(2).max(4),
});

export const spec = defineSpec({
  type: 'contact-channels',
  aliases: ['contact/channels'],
  name: 'Contact, channels',
  category: 'contact',
  role: 'body',
  description: 'Two to four ways to reach you as cards: an icon, the channel name, who it is for, the address or number as a link, and how fast you answer. For support pages and anywhere "contact us" is really a choice.',
  schema,
  defaults: {
    eyebrow: 'Talk to us',
    title: 'Pick the way that suits you',
    description: 'A person answers on every channel. Here is how long it usually takes.',
    channels: [
      { icon: 'mail', name: 'Email', detail: 'For anything that is not urgent, and for attachments.', value: 'help@example.com', href: 'mailto:help@example.com', response: 'Within a working day' },
      { icon: 'users', name: 'Chat', detail: 'Quick questions while you are in the product.', value: 'Open the chat', href: '#chat', response: 'Within 10 minutes, weekdays' },
      { icon: 'clock', name: 'Phone', detail: 'For urgent problems with a booking today.', value: '+46 31 000 00 00', href: 'tel:+46310000000', response: 'Every day 08:00 to 20:00' },
    ],
  },
});
