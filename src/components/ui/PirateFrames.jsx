/**
 * Pirate-themed containers that replace plain boxes. Each is a "physical"
 * artifact — parchment scrolls, wooden signs, wax-sealed letters — with
 * fixed material colors. The `parchment-scope` / `wood-scope` classes
 * re-pin the ink/accent CSS variables inside, so any content written with
 * normal theme tokens stays readable in both day and storm mode.
 */

/** Carved wooden scroll rod end without bullseye rings. */
function RollEndH({ className = "" }) {
  return (
    <svg viewBox="0 0 62 44" className={className} aria-hidden="true">
      <path d="M5 13 L17 8 L27 14 L27 30 L17 36 L5 31 Z" fill="#6b4423" stroke="#3a2410" strokeWidth="2.5" />
      <rect x="22" y="12" width="10" height="20" rx="3" fill="#5d3a1a" stroke="#3a2410" strokeWidth="2" />
      <path d="M30 8 H58 V36 H30 Z" fill="#d9bd87" stroke="#5a3c16" strokeWidth="2.5" />
      <path d="M35 10 V34 M46 10 V34" stroke="#9d7136" strokeWidth="1.6" opacity="0.55" />
      <path d="M33 14 H56 M33 30 H56" stroke="#f4e6c0" strokeWidth="2" opacity="0.45" />
    </svg>
  );
}

function RollEndV({ className = "" }) {
  return (
    <svg viewBox="0 0 44 62" className={className} aria-hidden="true">
      <path d="M13 5 L8 17 L14 27 H30 L36 17 L31 5 Z" fill="#6b4423" stroke="#3a2410" strokeWidth="2.5" />
      <rect x="12" y="22" width="20" height="10" rx="3" fill="#5d3a1a" stroke="#3a2410" strokeWidth="2" />
      <path d="M8 30 H36 V58 H8 Z" fill="#d9bd87" stroke="#5a3c16" strokeWidth="2.5" />
      <path d="M10 35 H34 M10 46 H34" stroke="#9d7136" strokeWidth="1.6" opacity="0.55" />
      <path d="M14 33 V56 M30 33 V56" stroke="#f4e6c0" strokeWidth="2" opacity="0.45" />
    </svg>
  );
}

/** Full horizontal scroll rod: knob — spiral — cylinder — spiral — knob. */
function ScrollBar() {
  return (
    <div
      aria-hidden="true"
      className="relative z-20 -mx-5 flex items-center drop-shadow-[3px_4px_0_rgba(47,32,20,0.18)]"
    >
      <RollEndH className="relative z-10 h-11 w-[62px] shrink-0" />
      <div className="roller-mid relative z-0 -mx-4 h-[30px] min-w-0 flex-1 rounded-sm" />
      <RollEndH className="relative z-10 h-11 w-[62px] shrink-0 -scale-x-100" />
    </div>
  );
}

/** Full vertical scroll rod for horizontally-opened scrolls. */
function VScrollBar() {
  return (
    <div
      aria-hidden="true"
      className="relative z-20 -my-5 flex shrink-0 flex-col items-center drop-shadow-[3px_4px_0_rgba(47,32,20,0.18)]"
    >
      <RollEndV className="relative z-10 h-[62px] w-11 shrink-0" />
      <div className="roller-mid-v relative z-0 -my-4 w-[30px] min-h-0 flex-1 rounded-sm" />
      <RollEndV className="relative z-10 h-[62px] w-11 shrink-0 -scale-y-100" />
    </div>
  );
}

/** Classic vertical scroll: ragged side edges, paper curling out of two rods. */
export function RolledScroll({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <ScrollBar />
      <div
        className="torn-x scroll-paper parchment-scope relative -my-3 px-7 py-9 sm:px-9"
        style={{
          boxShadow:
            "inset 0 24px 20px -16px rgba(90,60,20,0.45), inset 0 -24px 20px -16px rgba(90,60,20,0.45)",
        }}
      >
        {children}
      </div>
      <ScrollBar />
    </div>
  );
}

/** Horizontal scroll held open between two upright rods, torn top and bottom. */
export function SideScroll({ children, className = "" }) {
  return (
    <div className={`open-scroll relative flex items-stretch ${className}`}>
      <VScrollBar />
      <div
        className="open-scroll-paper torn-y scroll-paper parchment-scope relative -mx-4 min-w-0 flex-1 px-7 py-8 sm:px-8"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-5 left-0 z-[1] w-10 bg-gradient-to-r from-[#7c4a19]/28 to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-5 right-0 z-[1] w-10 bg-gradient-to-l from-[#7c4a19]/28 to-transparent"
        />
        <div className="relative z-10 h-full">{children}</div>
      </div>
      <VScrollBar />
    </div>
  );
}

/** A ragged-edged piece of parchment fragment. */
export function TornParchment({
  children,
  className = "",
  tilt = "rotate-[0.6deg]",
}) {
  return (
    <div
      className={`${tilt} ${className}`}
      style={{ filter: "drop-shadow(5px 6px 0 rgba(47,32,20,0.18))" }}
    >
      <div className="scroll-paper scroll-torn parchment-scope relative h-full px-6 py-7 sm:px-7">
        {children}
      </div>
    </div>
  );
}

/** Pinned-up bounty notice with a dashed inner border. */
export function WantedPoster({ children, className = "", heading = "WANTED" }) {
  return (
    <div className={`relative -rotate-1 ${className}`}>
      <span
        aria-hidden="true"
        className="absolute left-1/2 -top-2.5 z-10 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-[#7a5a20] bg-gradient-to-br from-gold-300 to-gold-500 shadow-pop-solid-sm"
      />
      <div className="scroll-paper parchment-scope h-full rounded-lg border-[3px] border-[#7a5a28]/60 p-1.5 shadow-pop-lg">
        <div className="h-full rounded-md border-2 border-dashed border-[#8a6a30]/50 px-5 py-6 sm:px-7">
          {heading && (
            <p className="mb-2 text-center font-display text-2xl tracking-[0.35em] text-[#8a5a20]">
              {heading}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

/** Leather-bound captain's logbook with stitched spine and ribbon. */
export function Logbook({ children, className = "" }) {
  return (
    <div
      className={`relative flex overflow-hidden rounded-l-md rounded-r-xl shadow-pop-lg ${className}`}
    >
      <div className="w-4 shrink-0 border-y-2 border-l-2 border-[#3a2410] bg-gradient-to-b from-[#7a4a22] via-[#5d3a1a] to-[#4a2c12]" />
      <div className="w-2 shrink-0 bg-[#5d3a1a] [background-image:repeating-linear-gradient(to_bottom,transparent_0_10px,#caa86a_10px_15px)]" />
      <div className="scroll-paper parchment-scope relative flex-1 border-2 border-l-0 border-[#7a5a28]/40 px-6 py-6 sm:px-7">
        <span
          aria-hidden="true"
          className="absolute top-0 right-7 h-12 w-5 bg-[#d43d2a] shadow [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)]"
        />
        {children}
      </div>
    </div>
  );
}

/** Formal parchment letter closed with a blob of wax. */
export function WaxSealCard({ children, className = "", seal = "crimson", icon = "⚓" }) {
  const sealCls =
    seal === "gold" ? "wax-seal-gold" : seal === "ocean" ? "wax-seal-ocean" : "wax-seal-crimson";
  return (
    <div className={`relative ${className}`}>
      <div className="scroll-paper parchment-scope relative h-full rounded-md border-2 border-[#7a5a28]/40 px-6 py-6 shadow-pop-lg sm:px-7">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-1.5 rounded-sm border border-[#8a6a30]/40"
        />
        {children}
      </div>
      <span
        aria-hidden="true"
        className={`wax-seal ${sealCls} absolute -right-3 -bottom-3 z-10 grid h-12 w-12 place-items-center text-lg text-[#fdf3dd]`}
      >
        {icon}
      </span>
    </div>
  );
}

/** A torn fragment of a treasure map: burnt corner, faded route and X. */
export function MapPiece({ children, className = "" }) {
  return (
    <div className={className} style={{ filter: "drop-shadow(7px 8px 0 rgba(47,32,20,0.18))" }}>
      <div className="scroll-paper scroll-torn parchment-scope relative h-full px-7 py-8 sm:px-9">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 100% 0%, rgba(90,50,10,0.32), transparent 22%)",
          }}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 100 60"
          className="pointer-events-none absolute right-[6%] bottom-[5%] w-28 text-[#8a5a20]/20"
        >
          <path
            d="M6 50 C 26 20 50 46 70 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="5 6"
            strokeLinecap="round"
          />
          <path d="M72 14 L84 26 M84 14 L72 26" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>
        {children}
      </div>
    </div>
  );
}

/** Nailed-together wooden plank sign; content text renders in pale cream. */
export function WoodSign({ children, className = "", as: Tag = "div", nails = true }) {
  return (
    <Tag
      className={`wood-plank wood-scope relative rounded-lg border-2 border-[#3a2410] shadow-pop ${className}`}
    >
      {nails && (
        <>
          <span aria-hidden="true" className="nail top-1.5 left-1.5" />
          <span aria-hidden="true" className="nail top-1.5 right-1.5" />
          <span aria-hidden="true" className="nail bottom-1.5 left-1.5" />
          <span aria-hidden="true" className="nail bottom-1.5 right-1.5" />
        </>
      )}
      {children}
    </Tag>
  );
}
