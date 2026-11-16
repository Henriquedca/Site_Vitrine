// Where a block sits: a page band (the default) or inside an app's panel (InPanel, src/blocks/in-panel.tsx). In lib, not blocks,
// so SidebarLayout (a free component) can set it for its content without depending on the paid block kit (card 18).
import { createContext, useContext } from 'react';

export type BlockPlacement = 'page' | 'panel';
export const BlockPlacementContext = createContext<BlockPlacement>('page');
export const useInPanel = () => useContext(BlockPlacementContext) === 'panel';
