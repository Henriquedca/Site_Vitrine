// Editing slots. Blocks render every piece of editable content through these, so the same block
// code is static in production and inline-editable in the canvas (which provides EditingContext).
import { createContext, createElement, useContext, type ComponentType, type ElementType, type ReactNode } from 'react';
import { hasInline, inline } from './lib/inline';
import { prose } from './lib/prose';

/** Path of a prop inside the block's props: ['items', 2, 'title']. */
export type PropPath = (string | number)[];

export interface TextSlot {
  path: PropPath;
  value: string;
  as: ElementType;
  className?: string;
  /** Allows line breaks (stored as \n). */
  multiline?: boolean;
  placeholder?: string;
}

export interface MediaValue {
  /** https:// or site-relative URL. Empty = placeholder. */
  src?: string;
  /** The same picture for dark mode (https:// or site-relative). Both are drawn; the theme's mode attribute shows one and hides the other. */
  srcDark?: string;
  alt: string;
}

export interface EditingApi {
  /** Render an editable text slot. */
  text(slot: TextSlot): ReactNode;
}

/** Provided by the canvas; absent in production. */
export const EditingContext = createContext<EditingApi | null>(null);

/**
 * The level of the block's own title when the page needs it to be the page's h1 (or not to be): a block whose title is an h2
 * can carry the page's h1 with `headingLevel: '1'`, and a hero whose title is an h1 can give it up with '2'. Only the
 * top-level `title` slot follows it; headings inside the block (card titles, steps) never change. Blocks get it from their
 * own `headingLevel` prop: every block module's default export is wrapped in `withHeadingLevel`, so it works through the BLOCKS
 * list, `<Block>` and a direct `import X from '@klarhimmel/ui/blocks/x'` alike. A parent `<HeadingLevel>` applies when the prop is absent.
 */
export const HeadingLevelContext = createContext<{ level: '1' | '2'; slot: string } | undefined>(undefined);
/** `slot` is the top-level text field that follows the level ('title' unless the spec names another `headingSlot`). */
export function HeadingLevel({ level, slot = 'title', children }: { level: '1' | '2' | undefined; slot?: string; children?: ReactNode }) {
  return createElement(HeadingLevelContext.Provider, { value: level ? { level, slot } : undefined }, children);
}
/** Wraps a block component so its own `headingLevel` prop sets the level of its title. */
export function withHeadingLevel<P extends { props: unknown }>(C: ComponentType<P>, slot: string = 'title'): ComponentType<P & { props: P['props'] & { headingLevel?: '1' | '2' | 1 | 2 } }> {
  const W = (p: P & { props: P['props'] & { headingLevel?: '1' | '2' | 1 | 2 } }) => {
    const level = normalizeHeadingLevel((p.props as { headingLevel?: unknown } | undefined)?.headingLevel);
    return level ? createElement(HeadingLevel, { level, slot }, createElement(C, p)) : createElement(C, p);
  };
  W.displayName = C.displayName || C.name;
  return W;
}
/** `headingLevel` as it may arrive (a number from a page file, a string from the panel) to '1' | '2', else undefined. */
export const normalizeHeadingLevel = (v: unknown): '1' | '2' | undefined => (v === 1 || v === '1' ? '1' : v === 2 || v === '2' ? '2' : undefined);

const LONG_RUN = /\S{24,}/;

/** `rich`: **bold**, `code` and [links](https://…) in the value are drawn as such outside the editor (the editor shows the raw text).
 *  rich="site": site content, where a link to the site's own page (/studio/) is an anchor too (reports keep paths as text). */
export function Text({ path, value, as: asGiven = 'span', className, multiline, placeholder, rich, markdown }: Omit<TextSlot, 'as'> & { as?: ElementType; rich?: boolean | 'site'; markdown?: boolean }) {
  const api = useContext(EditingContext);
  const heading = useContext(HeadingLevelContext);
  const isTitle = !!heading && path.length === 1 && path[0] === heading.slot;
  const as: ElementType = heading && isTitle && (asGiven === 'h1' || asGiven === 'h2') ? `h${heading.level}` : asGiven;
  if (api) return api.text({ path, value, as, className, multiline, placeholder });
  // Emptied text is dropped rather than rendered empty (an empty heading is announced and breaks the outline; an empty span names nothing).
  if (!value.trim()) return null;
  // One unbroken run (a URL, a long word) wraps instead of pushing its box wider than the page.
  const cls = LONG_RUN.test(value) ? [className, '[overflow-wrap:anywhere]'].filter(Boolean).join(' ') : className;
  return createElement(as, { className: cls }, markdown ? prose(value) : rich && hasInline(value) ? inline(value, { site: rich === 'site' }) : value);
}

const SAFE_SRC = /^(https:\/\/|\/(?!\/))/;
/** A picture embedded in the page itself (kh-report): a base64 image data address of a raster or svg type. Only where a block asks for it. */
const DATA_IMAGE = /^data:image\/(png|jpeg|gif|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;

/** Whether Media will show this address: https, or a path on the same site. Anything else renders the placeholder. */
export const isSafeSrc = (src: string): boolean => SAFE_SRC.test(src);

/** Modern-format twins of one picture, from a host that has them (`setMediaTwins`): `<source>` entries in order of preference, and the picture's pixel size. */
export interface MediaTwins { sources: { type: string; srcSet: string }[]; width: number; height: number }
let twinsOf: ((src: string) => MediaTwins | undefined) | undefined;
/** The directory site tells Media which pictures have AVIF/WebP twins. The same function runs on the server and in the browser, so the markup is the same. */
export const setMediaTwins = (fn: ((src: string) => MediaTwins | undefined) | undefined) => { twinsOf = fn; };

/**
 * An image, or a themed placeholder when there is no (safe) src. The wireframe theme always shows the placeholder.
 * With `srcDark` both images are in the page and CSS picks one by the theme's `data-kh-mode` (not by the OS setting, which the mode may override):
 * a hidden `<img>` is display:none, so it is out of the accessibility tree and, being lazy, is not fetched until it is shown.
 * `allowData` lets a src be an embedded base64 image (a one-file report); everything else keeps to https and site paths.
 * `priority`: the picture is likely the largest thing on the first screen (the first cards of a grid, a page's hero picture): it loads at once and ahead of
 * the rest instead of lazily. The dark twin stays lazy.
 */
export function Media({ value, ratio = '16 / 10', className, allowData, priority }: { path: PropPath; value: MediaValue; ratio?: string; className?: string; allowData?: boolean; priority?: boolean }) {
  const ok = (v: string | undefined) => (v && (SAFE_SRC.test(v) || (allowData && DATA_IMAGE.test(v))) ? v : undefined);
  const src = ok(value.src);
  const dark = src ? ok(value.srcDark) : undefined;
  // One picture: a <picture> with its twins when the host has them (width/height are the picture's own; the CSS still sizes the box), else a plain <img>.
  const pic = (url: string, loading: 'eager' | 'lazy', mark: Record<string, string | undefined>, fetchPriority?: 'high') => {
    const tw = twinsOf?.(url);
    const img = <img src={url} alt={value.alt} loading={loading} fetchPriority={fetchPriority} decoding="async" width={tw?.width} height={tw?.height} {...mark} />;
    return tw ? <picture {...mark}>{tw.sources.map((x) => <source key={x.type} type={x.type} srcSet={x.srcSet} />)}{img}</picture> : img;
  };
  const first = src && priority ? twinsOf?.(src) : undefined;
  return (
    <div className={['kh-media', className].filter(Boolean).join(' ')} data-kh-ratio={ratio.replace(/\s/g, '')} data-kh-media={src ? 'image' : 'placeholder'} data-kh-media-dark={dark ? '' : undefined}>
      {src ? (
        <>
          {/* React does not preload an <img> inside a <picture>: the priority picture's first twin is preloaded here (a browser skips a type it cannot decode). */}
          {first && <link rel="preload" as="image" href={first.sources[0]!.srcSet} type={first.sources[0]!.type} fetchPriority="high" />}
          {pic(src, priority ? 'eager' : 'lazy', { 'data-kh-light': dark ? '' : undefined }, priority ? 'high' : undefined)}
          {dark && pic(dark, 'lazy', { 'data-kh-dark': '' })}
        </>
      ) : <span className="sr-only">{value.alt}</span>}
    </div>
  );
}
