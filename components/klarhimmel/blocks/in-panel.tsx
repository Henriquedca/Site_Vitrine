// Where a block sits: a page band (the default) or inside an app's panel. In a panel the block keeps its content and states but
// drops the page's rhythm: no band padding, no page column or gutter, and its header at the in-app heading size, so a settings
// screen can stack app blocks under its own h1 without overriding their classes (/ws settings had a local `Bare` doing that).
// SidebarLayout's content is a panel already; InPanel is for app screens drawn without it.
import type { ReactNode } from 'react';
import { BlockPlacementContext } from '../lib/placement';

export { BlockPlacementContext, useInPanel, type BlockPlacement } from '../lib/placement';

/** Render the blocks inside it as parts of an app screen: `<InPanel><AppBillingPlan props={…} /></InPanel>`. */
export function InPanel({ children }: { children: ReactNode }) {
  return <BlockPlacementContext.Provider value="panel">{children}</BlockPlacementContext.Provider>;
}
