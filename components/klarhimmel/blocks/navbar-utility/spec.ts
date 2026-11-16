import { z } from 'zod';
import { defineSpec, link, t, wordmark } from '../_shared/schema';

const schema = z.object({
  brand: t(40),
  /** Their logo in place of the brand name; the name stays for screen readers. Not drawn without a src. */
  wordmark,
  /** Brand link target; default "/". */
  brandHref: t(300).optional(),
  /** One line on the left of the utility bar (opening hours, delivery terms). Empty hides it. */
  note: t(80),
  /** Quiet links on the right of the utility bar: phone, language, sign in. Up to three. */
  utility: z.array(link).max(3),
  links: z.array(link).max(6),
  /** The href of the current page's link, in the main row or the utility bar: that link gets aria-current="page". */
  current: t(300).optional(),
  cta: link,
  /** Where the call to action sits on a phone with a menu: unset moves it into the menu when brand and button run past about 22 characters, false keeps it in the bar (a site that measured its header fits), true always moves it. */
  ctaInMenu: z.boolean().optional(),
});

export const spec = defineSpec({
  type: 'navbar-utility',
  aliases: ['navigation/utility', 'header/utility'],
  name: 'Navbar, utility bar',
  category: 'navbar',
  role: 'nav',
  description: 'Two rows: a slim tinted utility bar (a note on the left, phone, language or sign-in links on the right) above the main row with brand, up to six links and one call to action. The main row collapses to a menu in narrow containers; the utility bar stays.',
  schema,
  defaults: {
    brand: 'Exempelhotellet',
    note: 'Front desk open 07:00 to 22:00',
    utility: [
      { label: '+46 31 000 00 00', href: 'tel:+46310000000' },
      { label: 'Svenska', href: '/sv' },
      { label: 'Manage booking', href: '/booking' },
    ],
    links: [
      { label: 'Rooms', href: '#rooms' },
      { label: 'Breakfast', href: '#breakfast' },
      { label: 'Offers', href: '#offers' },
      { label: 'Getting here', href: '#directions' },
    ],
    cta: { label: 'Book a room', href: '#book' },
  },
});
