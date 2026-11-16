// The tone surface and size container every block sits on. Its own file so a single installed block (shadcn registry,
// apps/ui/site/registry.ts) does not pull the whole block index in through block.tsx.
import type { ReactNode } from 'react';
import { BlockPlacementContext } from '../lib/placement';

export type Tone = 'default' | 'muted' | 'inverse' | 'accent';

/** Tone surface and size container. Production pages that import one block directly wrap it in this. */
export function BlockSurface({ tone = 'default', type, id, children }: { tone?: Tone; type?: string; id?: string; children: ReactNode }) {
  return (
    <div id={id} className="kh-block" data-kh-tone={tone} data-kh-block={type}>
      {/* A page band is a page, even inside an app shell (a site preview in SidebarLayout keeps its rhythm). */}
      <BlockPlacementContext.Provider value="page">{children}</BlockPlacementContext.Provider>
    </div>
  );
}
