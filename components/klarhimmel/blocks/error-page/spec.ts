import { z } from 'zod';
import { defineSpec, link, t } from '../_shared/schema';

const schema = z.object({
  code: t(12),
  title: t(100),
  description: t(240),
  primary: link,
  secondary: link,
});

export const spec = defineSpec({
  type: 'error-page',
  aliases: ['error/page'],
  name: 'Error page',
  category: 'error',
  role: 'body',
  description: 'A 404, 500 or maintenance page: status code, headline, explanation and two ways out.',
  schema,
  defaults: {
    code: '404',
    title: 'This page has wandered off',
    description: 'The link may be old, or the page may have moved. Head back home or tell us what you were looking for.',
    primary: { label: 'Back to home', href: '/' },
    secondary: { label: 'Contact support', href: '#contact' },
  },
});
