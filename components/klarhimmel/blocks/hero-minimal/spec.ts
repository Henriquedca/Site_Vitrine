import { z } from 'zod';
import { defineSpec, link, media, t } from '../_shared/schema';

const schema = z.object({
  eyebrow: t(60),
  title: t(160),
  description: t(300),
  primary: link,
  /** 'center': the text and actions centred. Default 'start'. */
  align: z.enum(['start', 'center']).optional(),
  /** 'screen': the block fills the viewport below a sticky navbar of height --kh-nav-height (0 if unset) and centres its content vertically. Default 'auto'. */
  height: z.enum(['auto', 'screen']).optional(),
  /** A portfolio hero (a company and what it runs): two to four large linked tiles in the band under the headline, each a
   *  business with its picture or logo, name and one line. Empty: the plain hero. */
  tiles: z.array(z.object({ name: t(60), description: t(140), href: t(300), media: media.optional() })).max(4).optional(),
});

export const spec = defineSpec({
  type: 'hero-minimal',
  aliases: ['hero/minimal'],
  name: 'Hero, minimal',
  category: 'hero',
  role: 'body',
  description: 'Oversized headline, one line of description and a single link, left-aligned or centred, optionally filling the screen. No media.',
  schema,
  defaults: {
    eyebrow: 'Northlight Studio',
    title: 'We design calm software for busy teams',
    description: 'A small studio working with product teams on the parts people use every day.',
    primary: { label: 'See our work', href: '#work' },
  },
});
