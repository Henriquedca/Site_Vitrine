import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

const Ctx = createContext<HTMLElement | undefined>(undefined);

/** The `.kh-root` element an overlay should portal into, so it keeps the theme's tokens. Undefined until mounted. */
export const useThemeRoot = () => useContext(Ctx);

/**
 * Overlays (dialog, menu, popover, tooltip) portal out of their parent. The tokens live on `.kh-root`, so a portal to
 * <body> would lose every colour. This finds the root next to the component (else the first on the page) and offers it
 * to the overlay as the portal container.
 */
export function ThemeRootScope({ children }: { children: ReactNode }) {
  const [root, setRoot] = useState<HTMLElement>();
  const mark = useCallback((el: HTMLElement | null) => {
    if (el) setRoot(el.closest<HTMLElement>('.kh-root') ?? document.querySelector<HTMLElement>('.kh-root') ?? undefined);
  }, []);
  return (
    <Ctx.Provider value={root}>
      <span hidden ref={mark} />
      {children}
    </Ctx.Provider>
  );
}
