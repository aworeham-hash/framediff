// FrameDiff brand mark — shield + diff. Matches favicon.svg and og.png.
export function LogoMark({ size = 28, className = '' }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 56 58"
      className={`flex-shrink-0 ${className}`} aria-hidden="true"
    >
      <defs>
        <linearGradient id="fd-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <path d="M28 2 L50 10 V28 C50 42 40 51 28 56 C16 51 6 42 6 28 V10 Z" fill="url(#fd-shield)" />
      <rect x="17" y="17" width="17" height="4" rx="2" fill="#ffffff" opacity="0.45" />
      <line x1="15" y1="19" x2="36" y2="19" stroke="#bfdbfe" strokeWidth="1.6" />
      <path d="M17 29 H33 M28 24.5 L33 29 L28 33.5" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="17" y="38" width="22" height="4" rx="2" fill="#ffffff" />
    </svg>
  )
}

export function LogoWordmark({ size = 30, dark = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className={`font-bold tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: size * 0.62 }}>
        FrameDiff
      </span>
    </span>
  )
}
