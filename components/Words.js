// Découpe un texte en mots, chacun dans un masque, pour l'effet « mot qui monte ».
// mode « scroll » : révélé quand le titre entre à l'écran (via RevealObserver).
// mode « load » : animé au chargement de la page (haut de page).
export default function Words({ text, as: Tag = 'span', mode = 'scroll', start = 0, step = 0.07, className, style, wordStyle }) {
  const words = text.split(' ');
  const props = mode === 'scroll' ? { 'data-reveal': 'words' } : {};
  return (
    <Tag className={['words', mode === 'load' ? 'words-load' : '', className].filter(Boolean).join(' ')} style={style} {...props}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="w">
            <span style={{ '--d': `${start + i * step}s`, ...wordStyle }}>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}
