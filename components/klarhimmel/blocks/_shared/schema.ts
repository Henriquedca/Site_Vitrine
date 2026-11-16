// Schema helpers shared by every block spec. No React in this file: specs are imported by the worker and MCP.
import { z } from 'zod';
import { ICON_NAMES } from './icon-names';

import type { BlockSpec } from '../types';

// No eval: zod's JIT probes `new Function`, which a CSP without 'unsafe-eval' blocks (kh-website's snapshot page). Jitless parsing is
// fast enough for block props, so every page that loads a block schema works under a strict CSP.
z.config({ jitless: true });

/** A text field with a max length (the canvas props panel and the worker read these limits). */
export const t = (max: number) => z.string().max(max);
/**
 * A text field that names a control, a landmark or a list item (button label, field label, heading inside a link): it may not be empty. In a
 * published page an emptied one never brings sample text back: its list item, or its control, is not drawn (docs/publish-mode.md).
 */
export const req = (max: number) => z.string().min(1).max(max);
export const link = z.object({ label: t(40), href: t(300) });
/** An image: `src` (https or a site path), the same picture for dark mode in `srcDark` (optional), and its alt text. */
export const media = z.object({ src: t(500), srcDark: t(500).optional(), alt: t(200) });
/** A small brand mark drawn before the wordmark (about 24px). Decorative next to the brand name, so alt defaults to empty. */
export const logo = z.object({ src: t(300), alt: t(60).optional() }).optional();
/** Their logo in place of the brand name (navbars): any width, about 32-40px tall. The brand name stays for screen readers. */
export const wordmark = z.object({ src: t(300), alt: t(60).optional() }).optional();
/**
 * The brand mark before the wordmark, as vector paths so it inherits currentColor (dark mode) and stays crisp: `paths` are SVG path
 * `d` strings in `viewBox` space (rendered as an attribute value, so markup in them is inert text), filled with currentColor; `src` is an image
 * fallback. Drawn at the brand text's cap height, aria-hidden (the link is named by the brand text).
 */
export const mark = z.object({
  paths: z.array(t(4000)).max(8).optional(),
  viewBox: t(40).optional(),
  src: t(300).optional(),
}).optional();

export { ICON_NAMES };
export const icon = z.enum(ICON_NAMES);
export type IconName = (typeof ICON_NAMES)[number];

/**
 * Type-checks that `defaults` is valid for `schema`, and gives every block that has a `title` (or its `headingSlot`) the optional `headingLevel`
 * ('1' or '2', default unchanged): the level of that title, so a page whose only heading block is a contact form or an FAQ can
 * give it the page's h1. Added here so no block repeats it; a schema that cannot be extended is left as it is.
 */
export const defineSpec = <S extends z.ZodType>(spec: BlockSpec<S>): BlockSpec<S> => {
  const s = spec.schema as unknown as { shape?: Record<string, unknown>; extend?: (x: object) => z.ZodType };
  const slot = spec.headingSlot ?? 'title';
  if (slot === false || !s.shape || !(slot in s.shape) || 'headingLevel' in s.shape || typeof s.extend !== 'function') return spec;
  try {
    return { ...spec, schema: s.extend({ headingLevel: z.enum(['1', '2']).optional() }) as unknown as S };
  } catch {
    return spec; // refinements on the object: leave it alone
  }
};

/**
 * Optional fields every form block shares (spread into its schema). Without `method` a form only names where it goes after the
 * host's submit handler (`action`, a flow edge in Canvas) and the block cancels the submit. With `method` (and `action`) the
 * form is a plain HTML form that submits natively, no JavaScript needed. `hidden` is name -> value, rendered as hidden inputs.
 * `captcha` renders an empty container for a bot-check widget (Turnstile); the host loads the widget, the block loads nothing.
 */
/**
 * What a host that redirects back after a native submit (`?sent=1`) can ask the form to draw: `status` idle (default), sent or
 * error, and the words for the last two (English defaults when omitted). The block only draws it; it never knows whether a
 * request worked.
 */
/** What a field says under itself when the browser's own validation fails: missing, not an email with a dot after the @, not an https address, not a domain. Optional on a block: English defaults. */
export const formErrors = z.object({ required: t(100), email: t(100), url: t(100), domain: t(100) }).partial().optional(); // each text is optional: a missing one uses the English default

export const formStatus = {
  status: z.enum(['idle', 'sent', 'error']).optional(),
  messages: z.object({ sent: t(160), error: t(160) }).optional(),
};

export const formFields = {
  action: t(300).optional(),
  method: z.enum(['post', 'get']).optional(),
  hidden: z.record(t(60), t(300)).optional(),
  captcha: z.boolean().optional(),
  captchaSitekey: t(100).optional(),
};
