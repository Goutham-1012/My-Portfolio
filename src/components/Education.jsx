import { GraduationCap, Award, BadgeCheck, MapPin } from "lucide-react";
import SectionHeading from "./ui/SectionHeading.jsx";
import Reveal from "./ui/Reveal.jsx";
import TiltCard from "./ui/TiltCard.jsx";
import { Bottle, Starfish } from "./ui/MapDecor.jsx";
import { Logbook, WaxSealCard } from "./ui/PirateFrames.jsx";

const CERTS = [
  {
    icon: Award,
    title: "AWS Certified Data Engineer",
    subtitle: "Associate · Amazon Web Services",
    badge: "from-gold-300 to-gold-500 text-tar",
    text: "text-gold-600",
    seal: "gold",
    sealIcon: "★",
  },
  {
    icon: BadgeCheck,
    title: "Azure AI Engineer",
    subtitle: "Associate · Microsoft Certified",
    badge: "from-ocean-400 to-ocean-600 text-white",
    text: "text-ocean-600",
    seal: "ocean",
    sealIcon: "⚓",
  },
];

export default function Education() {
  return (
    <section
      id="education"
      aria-label="Education and certifications"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Set dressing */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-300/8 to-transparent" />
        <Bottle className="absolute top-[12%] right-[5%] w-14 -rotate-12 animate-float text-ink-900/15 sm:w-16" />
        <Starfish className="absolute bottom-[10%] left-[4%] w-9 rotate-12 text-gold-600/25" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="05"
          eyebrow="Letters of Marque"
          title="Schooled ashore,"
          accent="certified at sea."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Degree */}
          <Reveal className="h-full">
            <TiltCard max={8} className="group h-full">
              <Logbook className="h-full">
                <div className="relative flex h-full flex-col">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border-2 border-tar/60 bg-gradient-to-br from-ocean-400 to-ocean-600 text-white shadow-pop-solid-sm transition-transform duration-500 group-hover:scale-110">
                    <GraduationCap size={26} />
                  </span>
                  <h3 className="mt-6 font-display text-3xl tracking-wide text-ink-900">
                    M.S. in Computer Science
                  </h3>
                  <p className="mt-2 font-semibold text-ink-600">
                    University of Central Missouri
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-400">
                    <MapPin size={13} /> Lee's Summit, KS
                  </p>
                  <div className="mt-auto pt-6">
                    <span className="rounded-full border-2 border-ink-900/12 bg-parchment-100 px-4 py-1.5 font-hand text-lg font-bold text-ocean-600">
                      Aug 2023 — May 2025
                    </span>
                  </div>
                </div>
              </Logbook>
            </TiltCard>
          </Reveal>

          {/* Certifications */}
          <div className="grid gap-6">
            {CERTS.map((c, i) => (
              <Reveal key={c.title} delay={0.1 * (i + 1)}>
                <TiltCard max={8}>
                <WaxSealCard seal={c.seal} icon={c.sealIcon} className="group">
                <div className="flex items-center gap-5">
                  <span
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-2 border-tar/60 bg-gradient-to-br shadow-pop-solid-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 ${c.badge}`}
                  >
                    <c.icon size={24} />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl tracking-wide text-ink-900 sm:text-3xl">
                      {c.title}
                    </h3>
                    <p className={`mt-1 text-sm font-bold ${c.text}`}>
                      {c.subtitle}
                    </p>
                  </div>
                </div>
                </WaxSealCard>
                </TiltCard>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <p className="px-2 font-hand text-xl font-semibold text-ink-400">
                ~ always chartin' new waters — currently exploring agentic AI
                architectures &amp; multi-modal foundation models ~
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
