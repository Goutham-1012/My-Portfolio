import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, ArrowUpRight, ArrowUp } from "lucide-react";
import SectionHeading from "./ui/SectionHeading.jsx";
import Reveal from "./ui/Reveal.jsx";
import Magnetic from "./ui/Magnetic.jsx";
import TiltCard from "./ui/TiltCard.jsx";
import { WaveBand, Bottle, Starfish } from "./ui/MapDecor.jsx";
import { WoodSign } from "./ui/PirateFrames.jsx";

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "gunnalagouthamreddy0@gmail.com",
    href: "mailto:gunnalagouthamreddy0@gmail.com",
    iconColor: "text-crimson-500",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "913-267-3582",
    href: "tel:+19132673582",
    iconColor: "text-palm-600",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "gouthamgunnala",
    href: "https://www.linkedin.com/in/gouthamgunnala/",
    iconColor: "text-ocean-600",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Goutham-1012",
    href: "https://github.com/Goutham-1012",
    iconColor: "text-gold-600",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative overflow-hidden pt-24 pb-12 md:pt-32"
    >
      {/* Sunny shallows */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 40, 0], y: [0, -24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-ocean-300/40 blur-[110px]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -40, 0], y: [0, 24, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-1/4 bottom-20 h-72 w-72 rounded-full bg-gold-300/40 blur-[110px]"
      />

      {/* The shore: layered surf rolling in at the bottom of the voyage */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0">
        <WaveBand className="h-12 w-full text-ocean-300/30" />
        <WaveBand className="absolute bottom-0 left-0 h-8 w-full text-ocean-400/25" />
      </div>
      <Bottle
        aria-hidden="true"
        className="pointer-events-none absolute top-[18%] left-[6%] hidden w-16 -rotate-12 animate-float text-ink-900/15 md:block"
      />
      <Starfish
        aria-hidden="true"
        className="pointer-events-none absolute right-[7%] bottom-[14%] w-9 rotate-12 text-crimson-500/20"
      />

      <div className="section-shell relative">
        <SectionHeading
          index="07"
          eyebrow="Message in a Bottle"
          title="Ready to set"
          accent="sail together?"
          align="center"
          description="Hiring for agentic AI, multimodal AI, LLM platforms, or production ML? My inbox is the fastest ship in the fleet."
        />

        <Reveal delay={0.15} className="mt-12">
          <Magnetic className="flex justify-center">
            <a
              href="mailto:gunnalagouthamreddy0@gmail.com"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-tar bg-gold-400 px-9 py-4 font-display text-2xl tracking-wide text-tar shadow-pop-solid transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              Ahoy, let's talk
              <ArrowUpRight
                size={22}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.label} delay={0.07 * i}>
              <TiltCard max={9} className="rounded-lg">
              <WoodSign className="h-full">
              <a
                href={c.href}
                className="group flex items-center gap-4 p-5 transition-all duration-300"
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-[#fdf3dd]/25 bg-[#fffaf0]/10 ${c.iconColor} transition-transform duration-500 group-hover:scale-110`}
                >
                  <c.icon size={19} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-ink-900">
                    {c.label}
                  </span>
                  <span className="block truncate text-xs text-ink-500">
                    {c.value}
                  </span>
                </span>
              </a>
              </WoodSign>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 flex flex-col items-center gap-4 border-t-2 border-dashed border-ink-900/15 pt-8 pb-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-ink-400">
            © 2026 Goutham Reddy Gunnala · Built with React, Tailwind &amp;
            Framer Motion.
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-500 transition-colors hover:text-crimson-500"
          >
            Back to the crow's nest
            <ArrowUp
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </a>
        </footer>
      </div>
    </section>
  );
}
