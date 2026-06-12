/**
 * Hand-drawn treasure-map doodles and 3D trinkets used to dress every
 * section. All are decorative: color comes from `text-*` classes via
 * currentColor, so they adapt to storm mode automatically.
 */

export function CompassRose({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
      <polygon
        points="50,6 55,45 94,50 55,55 50,94 45,55 6,50 45,45"
        fill="currentColor"
        opacity="0.75"
      />
      <polygon
        points="50,22 53,47 78,50 53,53 50,78 47,53 22,50 47,47"
        fill="currentColor"
        opacity="0.45"
        transform="rotate(45 50 50)"
      />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </svg>
  );
}

export function SeaSerpent({ className = "" }) {
  return (
    <svg
      viewBox="0 0 130 44"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    >
      <path d="M6 36 Q 18 10 30 36" />
      <path d="M42 36 Q 54 10 66 36" />
      <path d="M78 36 Q 88 12 98 22" />
      <circle cx="104" cy="18" r="7" fill="currentColor" stroke="none" />
      <path d="M111 16 L121 12" strokeWidth="3" />
    </svg>
  );
}

export function XMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
    >
      <line x1="8" y1="8" x2="32" y2="32" />
      <line x1="32" y1="8" x2="8" y2="32" />
    </svg>
  );
}

export function CrossedSwords({ className = "" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      stroke="currentColor"
      strokeLinecap="round"
      fill="none"
    >
      <line x1="14" y1="50" x2="48" y2="16" strokeWidth="4.5" />
      <line x1="15" y1="39" x2="25" y2="49" strokeWidth="3.5" />
      <circle cx="11" cy="53" r="3" fill="currentColor" stroke="none" />
      <line x1="50" y1="50" x2="16" y2="16" strokeWidth="4.5" />
      <line x1="39" y1="49" x2="49" y2="39" strokeWidth="3.5" />
      <circle cx="53" cy="53" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Barrel({ className = "" }) {
  return (
    <svg viewBox="0 0 44 52" className={className} aria-hidden="true" fill="none" stroke="currentColor">
      <rect x="6" y="4" width="32" height="44" rx="12" strokeWidth="3.5" />
      <line x1="6" y1="16" x2="38" y2="16" strokeWidth="2.5" />
      <line x1="6" y1="36" x2="38" y2="36" strokeWidth="2.5" />
      <line x1="22" y1="5" x2="22" y2="47" strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

export function Bottle({ className = "" }) {
  return (
    <svg viewBox="0 0 56 26" className={className} aria-hidden="true" fill="none" stroke="currentColor">
      <rect x="2" y="6" width="34" height="14" rx="7" strokeWidth="3" />
      <path d="M36 9 L46 9 M36 17 L46 17" strokeWidth="3" />
      <rect x="46" y="8" width="7" height="10" rx="2" strokeWidth="2.5" />
      <path d="M10 10 L24 10 M10 16 L24 16" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

export function Starfish({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <polygon
        points="20,2 25,14 38,15 28,23 31,36 20,29 9,36 12,23 2,15 15,14"
        fill="currentColor"
      />
    </svg>
  );
}

export function WaveBand({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0,30 C120,55 240,5 360,30 C480,55 600,5 720,30 C840,55 960,5 1080,30 C1200,55 1320,5 1440,30 L1440,60 L0,60 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** A gold doubloon spinning in real 3D. */
export function Coin({ className = "", delay = 0, size = 36 }) {
  return (
    <span
      className={`inline-block [perspective:600px] ${className}`}
      style={{ filter: "drop-shadow(2px 3px 0 rgba(47,32,20,0.18))" }}
      aria-hidden="true"
    >
      <span
        className="coin"
        style={{
          width: size,
          height: size,
          animationDelay: `${delay}s`,
          fontSize: size * 0.48,
        }}
      >
        ☠
      </span>
    </span>
  );
}
