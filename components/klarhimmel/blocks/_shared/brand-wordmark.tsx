import { Text } from '../../editing';

/** A selectable SVG wordmark, fitted once to its container and named once. */
export function BrandWordmark({ brand, mark }: {
  brand: string;
  mark?: { paths?: string[]; viewBox?: string; src?: string };
}) {
  const paths = (mark?.paths ?? []).filter(path => path.trim());
  const image = !paths.length && /^(https:\/\/|\/(?!\/))/.test(mark?.src ?? '') ? mark?.src : undefined;
  const hasMark = paths.length > 0 || Boolean(image);
  const offset = hasMark ? 140 : 0;
  const textWidth = Math.max([...brand].length, 1) * 60;
  const box = /^-?[\d.]+(\s+-?[\d.]+){3}$/.test(mark?.viewBox?.trim() ?? '') ? mark!.viewBox!.trim() : '0 0 24 24';
  return <svg viewBox={`0 0 ${offset + textWidth} 120`} width="100%" role="img" aria-label={brand || 'Brand'} className="block h-auto w-full font-semibold text-kh-ink" fill="currentColor">
    {hasMark && <svg x="0" y="14" width="88" height="88" viewBox={box} aria-hidden="true" focusable="false">
      {paths.map((path, i) => <path key={i} d={path} />)}
      {image && <image href={image} width="100%" height="100%" />}
    </svg>}
    <text x={offset} y="90" fontSize="100" textLength={textWidth} lengthAdjust="spacingAndGlyphs" aria-hidden="true">
      <Text path={['brand']} value={brand} as="tspan" />
    </text>
  </svg>;
}
