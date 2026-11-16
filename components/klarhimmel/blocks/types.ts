// The block contract. A block is a page section: a React component whose content is `props`,
// validated by `schema`. Blocks are pure presentation: no data fetching, no app state.
import type { ComponentType } from 'react';
import type { z } from 'zod';

export type BlockCategory =
  | 'navbar' | 'hero' | 'logos' | 'features' | 'content' | 'stats' | 'testimonials' | 'pricing'
  | 'faq' | 'cta' | 'contact' | 'team' | 'blog' | 'gallery' | 'docs' | 'app' | 'footer'
  | 'directory' | 'steps' | 'case-study' | 'newsletter' | 'banner' | 'error' | 'review' | 'report' | 'snapshot'
  | 'integrations' | 'changelog' | 'careers' | 'comparison' | 'download';

/** Everything about a block except its component. Safe to import without React (worker, MCP, exports). */
export interface BlockSpec<S extends z.ZodType = z.ZodType> {
  /** kebab-case id, unique, stable forever (stored in documents): 'hero-split'. */
  type: string;
  /** Other names the block answers to, in `category/variant` URL form: ['header/simple']. Unique across all types and aliases. */
  aliases?: string[];
  /** Human name: 'Hero, split'. */
  name: string;
  category: BlockCategory;
  /** Where it sits on a page. */
  role: 'nav' | 'body' | 'foot';
  /** One line for pickers and agents. */
  description: string;
  /** Content schema. Text fields are strings with a max length; lists are arrays with a max. */
  schema: S;
  /** Realistic default content, valid against `schema`. */
  defaults: z.infer<S>;
  /**
   * Opt out of repair: invalid props show the block's own invalid notice in both modes (see docs/publish-mode.md). Set it on a block whose text is something a person consents to or that cannot be
   * undone (an approval, a danger zone): substituting the default for an invalid field would show text nobody wrote.
   * `<Block>` then passes invalid input through untouched, and the block's component must validate its own props
   * (`spec.schema.safeParse`) and render an explicit invalid state with its actions disabled. See `_shared/invalid-kit.tsx`.
   */
  strict?: boolean;
  /**
   * The top-level text field that `headingLevel` moves between h1 and h2 (default 'title'). `false`: the block has no section heading
   * (its `title` is a label), so it gets no `headingLevel` prop. The component passes the same slot to `withHeadingLevel`.
   */
  headingSlot?: string | false;
}

export interface BlockProps<P> {
  props: P;
}

export interface BlockDef<S extends z.ZodType = z.ZodType> extends BlockSpec<S> {
  Component: ComponentType<BlockProps<z.infer<S>>>;
}
