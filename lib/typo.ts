/**
 * Typographie française : une espace insécable avant « : ; ? ! » et à l'intérieur des guillemets « »,
 * pour que ces signes ne passent jamais seuls en début de ligne.
 */
export function fr(text: string): string {
  return text
    .replace(/ ([:;?!»])/g, '\u00a0$1')
    .replace(/« /g, '«\u00a0');
}
