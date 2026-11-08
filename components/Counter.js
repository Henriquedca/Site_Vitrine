'use client';

import { useEffect, useRef, useState } from 'react';

// Fait défiler un nombre de 0 à sa valeur quand il devient visible.
// Sans JavaScript ou avec « réduire les animations », la valeur finale s'affiche directement.
export default function Counter({ value, duration = 1400 }) {
  const ref = useRef(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    setN(0);
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / duration);
          setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return <span ref={ref}>{n}</span>;
}
