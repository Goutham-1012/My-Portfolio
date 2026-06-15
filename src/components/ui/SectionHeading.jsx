import { motion } from "framer-motion";
import { Anchor } from "lucide-react";
import Reveal from "./Reveal.jsx";

const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const word = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Section header styled as a storybook chapter: handwritten eyebrow,
 * word-by-word masked title reveal. `accent` words get the treasure gradient.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent = "",
  description,
  align = "left",
}) {
  const words = [
    ...title.split(" ").map((t) => ({ t, accent: false })),
    ...accent.split(" ").filter(Boolean).map((t) => ({ t, accent: true })),
  ];

  const alignCls =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 ${alignCls}`}>
      <Reveal>
        <p className="flex items-center gap-2.5 font-hand text-2xl font-semibold text-crimson-500">
          <span className="inline-block h-[2px] w-8 rounded bg-ink-900/25" />
          <Anchor size={17} className="text-ocean-500" aria-hidden="true" />
          Chapter {index} · {eyebrow}
        </p>
      </Reveal>
      <h2 className="font-display text-4xl tracking-wide text-ink-900 sm:text-5xl lg:text-6xl">
        <motion.span
          variants={wordContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-60px", amount: 0.35 }}
          className={`flex flex-wrap gap-x-[0.28em] gap-y-1 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          {words.map((w, i) => (
            <span key={i} className="inline-flex overflow-hidden pb-1">
              <motion.span
                variants={word}
                className={`inline-block ${w.accent ? "text-gradient" : ""}`}
              >
                {w.t}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </h2>
      {description && (
        <Reveal delay={0.25}>
          <p className="max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
