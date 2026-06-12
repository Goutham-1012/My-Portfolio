import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronDown, MapPin, ScrollText, Gem, Bird } from "lucide-react";
import Magnetic from "./ui/Magnetic.jsx";
import PirateShip from "./ui/PirateShip.jsx";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

const rise = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const SIGNS = [
  { label: "RAG Architectures", cls: "left-[6%] top-[26%] -rotate-3", delay: 0 },
  { label: "Diffusion Models", cls: "right-[7%] top-[32%] rotate-2", delay: 1.2 },
  { label: "LLMOps · 99.9% uptime", cls: "left-[9%] bottom-[34%] rotate-3", delay: 0.6 },
  { label: "Vector Search", cls: "right-[10%] bottom-[38%] -rotate-2", delay: 1.8 },
];

const STARS = [
  [12, 8], [22, 18], [35, 6], [48, 12], [58, 22], [66, 9],
  [74, 16], [83, 7], [90, 20], [18, 30], [40, 26], [80, 30],
  [8, 18], [52, 4], [95, 12], [28, 12],
];

/* ---- Cartoon scenery ---- */

/** The sun — click it and the storm rolls in. Click the moon to sail home. */
function SkyOrb({ storm, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={storm}
      aria-label={storm ? "Return to sunny day" : "Summon a stormy night"}
      title={storm ? "Back to sunny day" : "Click for a storm!"}
      className="pointer-events-auto absolute top-[8%] right-[7%] z-20 h-28 w-28 cursor-pointer rounded-full transition-transform duration-300 hover:scale-110 focus-visible:ring-4 focus-visible:ring-gold-400/60 focus-visible:outline-none sm:h-36 sm:w-36"
    >
      {/* Sun */}
      <span
        className={`absolute inset-0 block transition-all duration-700 ${
          storm ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 animate-spin-slow text-gold-400"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="3"
              x2="50"
              y2="15"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              transform={`rotate(${i * 30} 50 50)`}
            />
          ))}
        </svg>
        <span className="absolute inset-[24%] block rounded-full border-4 border-gold-400 bg-gold-300" />
      </span>

      {/* Moon */}
      <span
        className={`absolute inset-0 block transition-all duration-700 ${
          storm ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0"
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0"
          style={{ filter: "drop-shadow(0 0 16px rgba(244,231,176,0.5))" }}
        >
          <defs>
            <mask id="moonCut">
              <rect width="100" height="100" fill="white" />
              <circle cx="67" cy="36" r="32" fill="black" />
            </mask>
          </defs>
          <circle cx="50" cy="50" r="34" fill="#f4e7b0" mask="url(#moonCut)" />
          <circle cx="33" cy="46" r="5" fill="#e0d093" />
          <circle cx="41" cy="64" r="3.5" fill="#e0d093" />
          <circle cx="29" cy="60" r="2.4" fill="#e0d093" />
        </svg>
      </span>

      {/* Handwritten hint */}
      <span
        aria-hidden="true"
        className="absolute -bottom-8 left-1/2 hidden w-max -translate-x-1/2 -rotate-3 font-hand text-lg font-semibold text-ink-600 sm:block"
      >
        {storm ? "← back to day?" : "← click the sun!"}
      </span>
    </button>
  );
}

function Cloud({ storm, className = "", delay = 0, drift = 26 }) {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 120 60"
      animate={{ x: [0, drift, 0] }}
      transition={{ duration: storm ? 9 : 16, delay, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute ${className}`}
    >
      <g
        fill={storm ? "#3d4a70" : "#ffffff"}
        stroke={storm ? "#2b3554" : "#cfe6f2"}
        strokeWidth="3"
        style={{ transition: "fill 1s ease, stroke 1s ease" }}
      >
        <ellipse cx="42" cy="38" rx="28" ry="16" />
        <ellipse cx="70" cy="29" rx="24" ry="17" />
        <ellipse cx="93" cy="40" rx="19" ry="12" />
      </g>
    </motion.svg>
  );
}

function Gull({ className = "", delay = 0 }) {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 28 12"
      animate={{ y: [0, -8, 0], x: [0, 14, 0] }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute ${className}`}
    >
      <path
        d="M1 9 Q 7.5 1 14 9 Q 20.5 1 27 9"
        fill="none"
        stroke="#4a3621"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

function Waves({ storm }) {
  const path =
    "M0,60 C120,92 240,28 360,60 C480,92 600,28 720,60 L720,120 L0,120 Z";
  const fillTransition = { transition: "fill 1.2s ease" };
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-36 sm:h-44"
    >
      {/* back wave */}
      <div className="absolute bottom-4 left-0 flex h-24 w-[200%] animate-wave-slow sm:h-28">
        {[0, 1].map((i) => (
          <svg key={i} viewBox="0 0 720 120" preserveAspectRatio="none" className="h-full w-1/2">
            <path
              d={path}
              fill={storm ? "#3a5684" : "#8fd9f5"}
              opacity="0.75"
              style={fillTransition}
            />
          </svg>
        ))}
      </div>
      {/* the ship rides between the waves */}
      <div className="absolute bottom-9 left-[8%] animate-bob sm:left-[12%]">
        <PirateShip className="h-36 w-44 sm:h-52 sm:w-64" />
      </div>
      {/* front wave */}
      <div className="absolute bottom-0 left-0 flex h-20 w-[200%] animate-wave sm:h-24">
        {[0, 1].map((i) => (
          <svg key={i} viewBox="0 0 720 120" preserveAspectRatio="none" className="h-full w-1/2">
            <path
              d={path}
              fill={storm ? "#24406b" : "#44b9e6"}
              style={fillTransition}
            />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default function Hero({ storm, onToggleStorm }) {
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 600], [0, 140]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Mouse-parallax: scenery layers drift at different depths and the
  // headline tilts gently toward the cursor.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 50, damping: 16 });
  const spy = useSpring(py, { stiffness: 50, damping: 16 });
  const cloudPX = useTransform(spx, (v) => v * 16);
  const cloudPY = useTransform(spy, (v) => v * 10);
  const orbPX = useTransform(spx, (v) => v * 9);
  const orbPY = useTransform(spy, (v) => v * 6);
  const signPX = useTransform(spx, (v) => v * 26);
  const signPY = useTransform(spy, (v) => v * 14);
  const seaPX = useTransform(spx, (v) => v * 6);
  const tiltX = useTransform(spy, (v) => v * -2.4);
  const tiltY = useTransform(spx, (v) => v * 2.4);

  function onPointerMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }
  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section
      id="top"
      aria-label="Introduction"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Sunny sky */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-b from-[#ace3f9] via-[#e3f5fd] to-parchment-100 transition-opacity duration-1000 ${
          storm ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Storm sky */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-b from-[#0b1228] via-[#1c2b4d] to-parchment-100 transition-opacity duration-1000 ${
          storm ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Stars */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-1000 ${
          storm ? "opacity-100" : "opacity-0"
        }`}
      >
        {STARS.map(([l, t], i) => (
          <span
            key={i}
            className="star"
            style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${(i % 7) * 0.4}s` }}
          />
        ))}
      </div>

      {/* Lightning */}
      {storm && (
        <>
          <div aria-hidden="true" className="lightning absolute inset-0 z-[6]" />
          <div
            aria-hidden="true"
            className="lightning absolute inset-0 z-[6]"
            style={{
              animationDelay: "4.6s",
              background:
                "radial-gradient(ellipse 70% 55% at 72% 0%, rgba(255,255,255,0.85), rgba(190,205,255,0.35) 45%, transparent 75%)",
            }}
          />
        </>
      )}

      {/* Sun/moon drifts at its own depth */}
      <motion.div
        style={{ x: orbPX, y: orbPY }}
        className="pointer-events-none absolute inset-0 z-20"
      >
        <SkyOrb storm={storm} onToggle={onToggleStorm} />
      </motion.div>

      {/* Sky layer: clouds, bolt and gulls share a parallax depth */}
      <motion.div
        style={{ x: cloudPX, y: cloudPY }}
        className="pointer-events-none absolute inset-0"
      >
        <Cloud storm={storm} className="top-[12%] left-[8%] w-28 sm:w-36" delay={0} />
        <Cloud storm={storm} className="top-[22%] right-[24%] w-20 opacity-80 sm:w-28" delay={3} drift={-22} />
        <Cloud storm={storm} className="top-[38%] left-[20%] w-16 opacity-60 sm:w-24" delay={6} />

        {/* Bolt cracking out of the big cloud */}
        {storm && (
          <svg
            aria-hidden="true"
            viewBox="0 0 20 36"
            className="bolt absolute top-[21%] left-[12%] w-6 sm:w-8"
          >
            <polygon
              points="12,0 2,16 8,16 4,32 18,12 11,12 17,0"
              fill="#ffd76e"
              stroke="#5d3a1a"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {/* Gulls head for shelter when the storm hits */}
        <div
          aria-hidden="true"
          className={`transition-opacity duration-1000 ${storm ? "opacity-0" : "opacity-100"}`}
        >
          <Gull className="top-[18%] left-[38%] w-7" delay={0} />
          <Gull className="top-[24%] left-[52%] w-5" delay={2.5} />
        </div>
      </motion.div>

      {/* Floating wooden signposts — closest layer, biggest drift */}
      <motion.div
        style={{ x: signPX, y: signPY }}
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {SIGNS.map((s) => (
        <motion.span
          key={s.label}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
          transition={{
            opacity: { delay: 1.6 + s.delay, duration: 0.8 },
            scale: { delay: 1.6 + s.delay, duration: 0.8 },
            y: {
              delay: 1.6 + s.delay,
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className={`wood-plank wood-scope absolute rounded-lg border-2 border-[#3a2410] px-4 py-2 font-hand text-lg font-semibold text-ink-700 shadow-pop ${s.cls}`}
        >
          {s.label}
        </motion.span>
        ))}
      </motion.div>

      <motion.div
        style={{
          y: yContent,
          opacity,
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 1200,
        }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-28 text-center"
      >
        <motion.div variants={rise}>
          <span className="paper inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-sm font-semibold text-ink-700">
            <span className="h-2.5 w-2.5 animate-pulse-dot rounded-full bg-palm-500" />
            Open to new voyages
            <span className="hidden items-center gap-1 text-ink-400 sm:inline-flex">
              <MapPin size={13} /> Kansas City, KS
            </span>
          </span>
        </motion.div>

        <motion.p
          variants={rise}
          className="mt-8 font-hand text-2xl font-semibold text-ocean-600 sm:text-3xl"
        >
          ⚓ Generative AI · LLMs · MLOps ⚓
        </motion.p>

        <motion.h1
          variants={rise}
          className="mt-3 font-display text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.95] tracking-wide text-ink-900"
        >
          Goutham Reddy
          <br />
          <span className="text-aurora">Gunnala</span>
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-7 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg"
        >
          I sail frontier models into production waters — LLM copilots, RAG
          platforms, and real-time ML pipelines that hauled home real treasure
          across <span className="font-semibold text-ink-700">finance</span>,{" "}
          <span className="font-semibold text-ink-700">healthcare</span>,{" "}
          <span className="font-semibold text-ink-700">aviation</span> and{" "}
          <span className="font-semibold text-ink-700">retail</span>.
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-tar bg-gold-400 px-7 py-3.5 font-bold text-tar shadow-pop-solid transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              <Gem size={18} />
              View the Treasure
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="/Goutham_Reddy_Gunnala_Resume.pdf"
              download
              className="paper inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-ink-700 transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              <ScrollText size={18} />
              Download Resume
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-bold text-ink-500 transition-colors duration-300 hover:text-crimson-500"
            >
              <Bird size={18} />
              Send Word
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div style={{ x: seaPX }} className="pointer-events-none absolute inset-0">
        <Waves storm={storm} />
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-foam transition-colors hover:text-gold-300"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown size={28} strokeWidth={3} />
        </motion.span>
      </motion.a>
    </section>
  );
}
