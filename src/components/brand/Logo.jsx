// Unified FrameDiff brand mark — matches favicon.svg and og.png.
export function LogoMark({ size = 28, className = '' }) {
  return (
    <div
      className={`rounded-lg bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="6" y="9" width="13" height="2.5" rx="1.25" fill="rgba(255,255,255,0.5)" />
        <line x1="6" y1="10.25" x2="19" y2="10.25" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        <path d="M7 16 L18 16 M15 13.5 L18 16 L15 18.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="6" y="20" width="18" height="2.5" rx="1.25" fill="white" />
      </svg>
    </div>
  )
}
