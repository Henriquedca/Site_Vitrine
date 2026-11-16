// Inline markup for report text: **bold**, `code` and [label](https://link). Nothing else is interpreted, and a link
// whose address is not safe (javascript:, data:, a file path) is drawn as its label, never as an anchor. Site content (a blog
// post, a page's prose) passes { site: true }: a root-relative link to the site's own page (/studio/) is an anchor there too.
import { createElement, type ReactNode } from 'react';

const TOKEN = /`([^`\n]+)`|\*\*([^*\n]+(?:\*(?!\*)[^*\n]*)*)\*\*|(!?)\[([^\]\n]*)\]\(([^)\s]+)\)/g;
const SAFE = /^(https?:\/\/|mailto:|tel:|#)/i;
// A page of the same site: one leading slash, never // (another host) and never a machine path.
const SITE = /^\/(?!\/)(?!(?:Users|private|tmp|var|home|etc|opt)\/)/;
export const siteSafe = (href: string) => SAFE.test(href) || SITE.test(href);
// A file beside a report (files/brief.pdf): relative, with an extension, never .. and never a scheme. Sessions stores and serves these with
// the page (Felix 10-21: document links clickable).
const BESIDE = /^(?![a-z][\w+.-]*:)(?!\.\.?\/)[\w-][\w.-]*(?:\/[\w-][\w.-]*)*\.[a-z0-9]{1,5}$/i;
const reportSafe = (href: string) => SAFE.test(href) || BESIDE.test(href);

/** Splits a string into text, <strong>, <code> and <a> nodes. */
export function inline(value: string, { site = false }: { site?: boolean } = {}): ReactNode[] {
  const out: ReactNode[] = [];
  let at = 0;
  let key = 0;
  for (const m of value.matchAll(TOKEN)) {
    if (m.index! > at) out.push(value.slice(at, m.index));
    if (m[1] !== undefined) out.push(createElement('code', { key: key++, className: 'rounded-kh-sm bg-kh-surface-2 px-1 py-0.5 font-kh-mono text-[0.9em] [overflow-wrap:anywhere]' }, m[1]));
    else if (m[2] !== undefined) out.push(createElement('strong', { key: key++, className: 'font-semibold' }, inline(m[2], { site })));
    // A picture inside a sentence is its alt text; a paragraph that is only a picture is a figure (prose.tsx).
    else if (m[3] === '!') out.push(m[4]);
    else if (site ? siteSafe(m[5]!) : reportSafe(m[5]!)) out.push(createElement('a', { key: key++, href: m[5], rel: 'noopener noreferrer', className: 'text-kh-ink underline [text-decoration-color:var(--kh-edge)] underline-offset-4 hover:text-kh-accent-ink hover:decoration-current [overflow-wrap:anywhere]' }, m[4]));
    else out.push(m[4]);
    at = m.index! + m[0].length;
  }
  if (at < value.length) out.push(value.slice(at));
  return out;
}

/** True when the string has any inline markup (so plain strings keep the plain path). */
export const hasInline = (value: string) => /`[^`\n]+`|\*\*[^*\n]+\*\*|\[[^\]\n]*\]\([^)\s]+\)/.test(value);
