import { useId } from "react";

/**
 * The flagship — a shaded, dimensional pirate ship that continuously
 * yaws in real CSS 3D perspective (see .ship-3d in index.css), so the
 * hull and sails catch the light as she rolls through the swell.
 */
export default function PirateShip({ className = "" }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const hull = `${uid}-hull`;
  const shade = `${uid}-shade`;
  const deck = `${uid}-deck`;
  const sailA = `${uid}-sailA`;
  const sailB = `${uid}-sailB`;

  return (
    <span className={`block [perspective:900px] ${className}`} aria-hidden="true">
      <svg viewBox="0 0 240 200" className="ship-3d h-full w-full">
        <defs>
          <linearGradient id={hull} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b07a40" />
            <stop offset="0.55" stopColor="#8b5a2b" />
            <stop offset="1" stopColor="#4a2f15" />
          </linearGradient>
          <linearGradient id={shade} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(20,10,0,0.3)" />
            <stop offset="0.25" stopColor="rgba(20,10,0,0)" />
            <stop offset="0.75" stopColor="rgba(20,10,0,0)" />
            <stop offset="1" stopColor="rgba(20,10,0,0.35)" />
          </linearGradient>
          <linearGradient id={deck} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9a866" />
            <stop offset="1" stopColor="#a06b35" />
          </linearGradient>
          <radialGradient id={sailA} cx="0.35" cy="0.35" r="0.9">
            <stop offset="0" stopColor="#fffdf6" />
            <stop offset="0.7" stopColor="#f3e8c8" />
            <stop offset="1" stopColor="#ddcba1" />
          </radialGradient>
          <radialGradient id={sailB} cx="0.4" cy="0.4" r="0.9">
            <stop offset="0" stopColor="#fbf2d8" />
            <stop offset="1" stopColor="#d8c49a" />
          </radialGradient>
        </defs>

        {/* bowsprit + jib sail */}
        <line x1="198" y1="116" x2="234" y2="96" stroke="#4a2f15" strokeWidth="5" strokeLinecap="round" />
        <path d="M200 112 L230 97 L200 60 Z" fill={`url(#${sailB})`} stroke="#cdb98e" strokeWidth="2.5" />

        {/* rear mast + sail */}
        <rect x="62" y="36" width="6" height="80" rx="3" fill="#5d3a1a" />
        <path d="M64 46 C 36 58 36 88 64 100 Z" fill={`url(#${sailB})`} stroke="#cdb98e" strokeWidth="2.5" />
        <path d="M65 8 Q 84 14 65 22 Z" fill="#d43d2a" stroke="#8a2418" strokeWidth="1.5" />

        {/* main mast */}
        <rect x="118" y="12" width="7" height="106" rx="3.5" fill="#5d3a1a" />
        <rect x="108" y="22" width="27" height="6" rx="3" fill="#4a2f15" />

        {/* main sails, billowing both sides of the mast */}
        <path d="M120 26 C 72 44 72 86 120 104 Z" fill={`url(#${sailA})`} stroke="#cdb98e" strokeWidth="3" />
        <path d="M120 32 C 90 48 90 84 118 98" fill="none" stroke="rgba(150,125,80,0.4)" strokeWidth="2.5" />
        <path d="M128 34 C 170 50 170 84 128 100 Z" fill={`url(#${sailB})`} stroke="#cdb98e" strokeWidth="2.5" />

        {/* skull emblem */}
        <g transform="translate(97 62)">
          <circle r="8.5" fill="#2f2014" />
          <circle cx="-3" cy="-2" r="2" fill="#fffaf0" />
          <circle cx="3" cy="-2" r="2" fill="#fffaf0" />
          <rect x="-8.5" y="9.5" width="17" height="2.8" rx="1.4" fill="#2f2014" transform="rotate(22)" />
          <rect x="-8.5" y="9.5" width="17" height="2.8" rx="1.4" fill="#2f2014" transform="rotate(-22)" />
        </g>

        {/* jolly roger */}
        <path d="M125 2 Q 152 8 125 17 Z" fill="#2f2014" />
        <circle cx="134" cy="9" r="2.4" fill="#fffaf0" />

        {/* rigging */}
        <line x1="124" y1="16" x2="206" y2="112" stroke="rgba(74,54,33,0.5)" strokeWidth="1.5" />
        <line x1="124" y1="16" x2="36" y2="116" stroke="rgba(74,54,33,0.5)" strokeWidth="1.5" />

        {/* stern castle */}
        <rect x="20" y="94" width="36" height="24" rx="4" fill={`url(#${deck})`} stroke="#4a2f15" strokeWidth="3" />
        <circle cx="34" cy="106" r="4" fill="#ffd76e" stroke="#4a2f15" strokeWidth="2" />

        {/* hull with curvature shading */}
        <path
          d="M14 118 C 60 110 184 110 228 116 C 216 150 198 166 168 172 C 122 181 84 179 56 168 C 34 159 20 140 14 118 Z"
          fill={`url(#${hull})`}
          stroke="#3a2410"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M14 118 C 60 110 184 110 228 116 C 216 150 198 166 168 172 C 122 181 84 179 56 168 C 34 159 20 140 14 118 Z"
          fill={`url(#${shade})`}
        />
        {/* plank lines */}
        <path d="M26 136 C 84 146 168 146 214 132" fill="none" stroke="rgba(35,20,8,0.35)" strokeWidth="2" />
        <path d="M40 154 C 92 163 158 163 198 150" fill="none" stroke="rgba(35,20,8,0.3)" strokeWidth="2" />

        {/* gunwale */}
        <path
          d="M12 114 C 66 104 182 104 230 112 L 227 122 C 180 113 66 113 16 124 Z"
          fill="#c89254"
          stroke="#3a2410"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* lantern portholes */}
        <circle cx="92" cy="142" r="5.5" fill="#ffd76e" stroke="#3a2410" strokeWidth="2.5" />
        <circle cx="120" cy="143" r="5.5" fill="#ffd76e" stroke="#3a2410" strokeWidth="2.5" />
        <circle cx="148" cy="142" r="5.5" fill="#ffd76e" stroke="#3a2410" strokeWidth="2.5" />
      </svg>
    </span>
  );
}
