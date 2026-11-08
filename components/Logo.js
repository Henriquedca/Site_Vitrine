// Logo : trois barres montantes.
export default function Logo({ variant = 'clair' }) {
  // « clair » : pastille blanche, barres eucalyptus (sur fond sombre).
  // « eucalyptus » : pastille eucalyptus, barres blanches (sur fond clair).
  const bg = variant === 'clair' ? '#ffffff' : '#3f6b5c';
  const fg = variant === 'clair' ? '#23392f' : '#ffffff';
  return (
    <span
      aria-hidden="true"
      style={{
        width: 36,
        height: 36,
        borderRadius: 9,
        background: bg,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill={fg}>
        <rect x="3" y="14" width="4" height="7" rx="1.2" opacity="0.55" />
        <rect x="10" y="9" width="4" height="12" rx="1.2" opacity="0.8" />
        <rect x="17" y="4" width="4" height="17" rx="1.2" />
      </svg>
    </span>
  );
}
