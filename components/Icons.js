const base = {
  fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
};

export function ArrowDown(props) {
  return (<svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" {...base} {...props}><path d="M12 5v14" /><path d="M6 13l6 6 6-6" /></svg>);
}
export function ArrowRight(props) {
  return (<svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" {...base} {...props}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>);
}
export function Mail(props) {
  return (<svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" {...base} {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>);
}
export function LinkedIn(props) {
  return (<svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" {...base} {...props}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7" /><path d="M8 7v.01" /><path d="M12 17v-4a2 2 0 0 1 4 0v4" /><path d="M12 10v7" /></svg>);
}

const PROJET_PATHS = {
  calculatrice: (<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8" /><path d="M8 11h2" /><path d="M14 11h2" /><path d="M8 15h2" /><path d="M14 15h2" /></>),
  fiche: (<><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5" /><path d="M9 13h7" /><path d="M9 17h5" /></>),
  graphique: (<><path d="M3 3v18h18" /><path d="M7 16v-3" /><path d="M11 16v-6" /><path d="M15 16v-4" /><path d="M19 16V7" /></>),
};

export function ProjetIcon({ name }) {
  return (<svg width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" {...base} stroke="#3f6b5c">{PROJET_PATHS[name]}</svg>);
}
