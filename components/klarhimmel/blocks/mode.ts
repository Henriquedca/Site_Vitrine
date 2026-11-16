// The block mode as context, in a module of its own so a block can read it without loading the props resolver (render.tsx).
import { createContext } from 'react';

export type BlockMode = 'publish' | 'preview';
export const BlockModeContext = createContext<BlockMode | undefined>(undefined);
