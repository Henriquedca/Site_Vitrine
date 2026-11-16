import { createElement, type ReactNode } from 'react';
import { inline, siteSafe } from './inline';

/** Small safe Markdown renderer for site content: paragraphs, h2/h3, lists, GFM tables, links to the site's own pages, and a paragraph
 *  that is only ![alt](src) as a picture in the reading column. Raw HTML remains text. */

// A GFM table (website 11-05 18:0x, WEB-28's price table; UI-35): a header row, the --- rule, then rows. Same reading as doc-page.markdown.ts.
const cells = (line: string) => line.trim().replace(/^\|/, '').replace(/(?<!\\)\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|'));
const isRow = (line: string) => /^\s*\|.*\|\s*$/.test(line);
const isRule = (line: string) => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(line);
function table(lines: string[], key: number): ReactNode {
  const head = cells(lines[0]!);
  const rows = lines.slice(2).filter(isRow).map((l) => { const r = cells(l); return head.map((_, i) => r[i] ?? ''); });
  // the box scrolls sideways on a phone, never the page; a keyboard reaches it (tabIndex) and a reader hears what it is
  return createElement('div', { key, role: 'region', 'aria-label': 'Table', tabIndex: 0, className: 'mb-6 max-w-full overflow-x-auto rounded-kh-lg border border-kh-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kh-focus)' },
    createElement('table', { className: 'w-full min-w-[32rem] border-collapse text-left text-kh-small' },
      createElement('thead', null, createElement('tr', { className: 'bg-kh-surface-2' }, head.map((h, i) => createElement('th', { key: i, scope: 'col', className: 'border-b border-kh-line px-3 py-2 font-semibold text-kh-ink' }, inline(h, { site: true }))))),
      createElement('tbody', null, rows.map((r, j) => createElement('tr', { key: j, className: 'border-b border-kh-line last:border-0' }, r.map((c, i) => createElement('td', { key: i, className: 'px-3 py-2 align-top text-kh-ink-2' }, inline(c, { site: true }))))))));
}
export function prose(value: string): ReactNode[] {
  return value.split(/\n\s*\n/).filter(p => p.trim()).map((block, key) => {
    const heading = block.match(/^(#{2,3})\s+([^\n]+)$/);
    // One scale for long reads (klarholding's manifesto, Felix 10-23 23:2x): ## a section title with room above, ### a smaller head close to
    // its text, a picture opens its section. Blocks carry only a bottom margin, so a heading sits on the text it names.
    if (heading) return heading[1]!.length === 2
      ? createElement('h2', { key, className: 'mt-14 mb-4 text-[clamp(calc(var(--kh-size)*1.625),1.2rem+1.2cqi,calc(var(--kh-size)*2.125))] font-semibold leading-[1.15] tracking-[-0.02em] text-balance text-kh-ink first:mt-0 @3xl:mt-20 [figure+&]:mt-10' }, inline(heading[2]!, { site: true }))
      : createElement('h3', { key, className: 'mt-9 mb-1.5 text-kh-lead font-semibold leading-snug text-kh-ink first:mt-0' }, inline(heading[2]!, { site: true }));
    const picture = block.trim().match(/^!\[([^\]\n]*)\]\(([^)\s]+)\)$/);
    if (picture && siteSafe(picture[2]!) && !/^(mailto:|tel:|#)/i.test(picture[2]!)) {
      return createElement('figure', { key, className: 'mt-16 mb-8 first:mt-0 @3xl:mt-24' }, createElement('img', { src: picture[2], alt: picture[1], loading: 'lazy', decoding: 'async', className: 'aspect-3/2 w-full rounded-kh-lg bg-kh-surface-2 object-cover' }));
    }
    const lines = block.split('\n');
    if (lines.length >= 2 && isRow(lines[0]!) && isRule(lines[1]!)) return table(lines, key);
    if (lines.every(line => /^[-*]\s+/.test(line))) return createElement('ul', { key, className: 'mb-5 list-disc space-y-2 ps-6' }, lines.map((line, i) => createElement('li', { key: i }, inline(line.replace(/^[-*]\s+/, ''), { site: true }))));
    return createElement('p', { key, className: 'mb-5 whitespace-pre-line' }, inline(block, { site: true }));
  });
}
