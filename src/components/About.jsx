import { motion } from "framer-motion";
import { ArrowRight, Anchor } from "lucide-react";
import SectionHeading from "./ui/SectionHeading.jsx";
import Reveal from "./ui/Reveal.jsx";
import CountUp from "./ui/CountUp.jsx";
import TiltCard from "./ui/TiltCard.jsx";
import { CompassRose, Starfish, XMark } from "./ui/MapDecor.jsx";
import { RolledScroll, TornParchment } from "./ui/PirateFrames.jsx";

const SCRAP_TILTS = ["-rotate-1", "rotate-1", "rotate-[0.5deg]", "-rotate-[0.7deg]"];

const STATS = [
  { value: 5, suffix: "+", label: "Years shipping AI to production" },
  { value: 4, suffix: "", label: "Industries: fintech, health, aviation, retail" },
  { value: 100, suffix: "TB+", label: "Data engineered for ML at scale" },
  { value: 99.9, suffix: "%", label: "Uptime across deployed AI services", decimals: 1 },
];

const PORTS = [
  { org: "Siemens", domain: "Healthcare", color: "text-gold-600" },
  { org: "Lowe's", domain: "Retail", color: "text-palm-600" },
  { org: "Textron", domain: "Aviation", color: "text-crimson-500" },
  { org: "Fiserv", domain: "Fintech", color: "text-ocean-600" },
];

const CAPTAINS_LOG = [
  ["vessel:", '"The Gradient Descent"'],
  ["captain:", "goutham-reddy-gunnala"],
  ["rank:", "generative-ai-engineer"],
  ["years_at_sea:", "5+"],
  ["ports_of_call:", ""],
  ["  - fintech:", "@Fiserv"],
  ["  - aviation:", "@Textron"],
  ["  - retail:", "@Lowes"],
  ["  - healthcare:", "@Siemens"],
  ["cargo:", ""],
  ["  - genai:", "[LLMs, RAG, diffusion]"],
  ["  - mlops:", "[MLflow, Kubeflow, SageMaker]"],
  ["bounty:", ""],
  ["  uptime:", "99.9%"],
  ["  compliance_speedup:", "60%"],
  ["  latency_cut:", "35%"],
  ["status:", "open-to-new-voyages ⚓"],
];

export default function About() {
  return (
    <section id="about" aria-label="About" className="relative overflow-hidden py-24 md:py-32">
      {/* Set dressing */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-300/10 to-transparent" />
        <CompassRose className="absolute top-8 -right-16 w-72 animate-spin-slow text-gold-600/15" />
        <Starfish className="absolute bottom-[6%] left-[3%] w-8 -rotate-12 text-crimson-500/15" />
        <XMark className="absolute bottom-[4%] left-[42%] w-6 rotate-6 text-crimson-500/12" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="01"
          eyebrow="The Captain's Tale"
          title="Five years at sea, four ports,"
          accent="one obsession: AI that ships."
        />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Story */}
          <div className="space-y-6 text-base leading-relaxed text-ink-500 sm:text-lg">
            <Reveal>
              <p>
                My voyage began in Bangalore, building data platforms for{" "}
                <span className="font-semibold text-ink-700">Siemens</span> —
                consolidating genomic and clinical datasets, and learning the
                lesson that still steers everything I build:{" "}
                <span className="font-semibold text-ink-900">
                  a model is only as seaworthy as the pipeline beneath it.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                At <span className="font-semibold text-ink-700">Lowe's</span> I
                charted millions of retail transactions — streaming fraud
                detection with Kafka and Flink, and some of my earliest
                FAISS-powered retrieval engines, before "RAG" had a name. At{" "}
                <span className="font-semibold text-ink-700">
                  Textron Aviation
                </span>{" "}
                I hauled 100TB+ of claims data and rigged the cloud
                infrastructure to serve models on it.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Today at <span className="font-semibold text-ink-700">Fiserv</span>{" "}
                I command the generative layer of finance: LLM copilots that
                answer compliance questions in seconds instead of days, fraud
                detection that thinks in embeddings, and knowledge graphs that
                let analysts move twice as fast — all explainable enough to
                stand in front of a regulator.
              </p>
            </Reveal>

            {/* Ports of call */}
            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {PORTS.map((p, i) => (
                  <span key={p.org} className="flex items-center gap-2">
                    <span className="paper rounded-full px-4 py-2 text-sm">
                      <Anchor
                        size={12}
                        className="mr-1.5 inline-block text-ocean-500"
                        aria-hidden="true"
                      />
                      <span className={`font-bold ${p.color}`}>{p.org}</span>{" "}
                      <span className="text-ink-400">· {p.domain}</span>
                    </span>
                    {i < PORTS.length - 1 && (
                      <ArrowRight size={14} className="text-ink-400" />
                    )}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Captain's log */}
          <Reveal delay={0.15}>
            <div className="relative -rotate-1">
              <TiltCard max={7} className="rounded-2xl">
              <RolledScroll>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full border border-ink-900/30 bg-crimson-400" />
                  <span className="h-3 w-3 rounded-full border border-ink-900/30 bg-gold-400" />
                  <span className="h-3 w-3 rounded-full border border-ink-900/30 bg-ocean-400" />
                  <span className="ml-3 font-hand text-xl font-semibold text-ink-400">
                    captains_log.yaml
                  </span>
                </div>
                <div className="font-hand text-xl leading-relaxed">
                  {CAPTAINS_LOG.map(([key, val], i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.04 * i, duration: 0.4 }}
                      className="whitespace-pre"
                    >
                      <span className="font-semibold text-crimson-500">{key}</span>{" "}
                      <span className="text-ocean-600">{val}</span>
                    </motion.div>
                  ))}
                </div>
              </RolledScroll>
              </TiltCard>
            </div>
          </Reveal>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.08 * i} className="h-full">
              <TiltCard max={9} glareEnabled={false} className="h-full">
                <TornParchment tilt={SCRAP_TILTS[i]} className="h-full">
                  <p className="font-display text-4xl text-gradient sm:text-5xl">
                    <CountUp
                      value={s.value}
                      suffix={s.suffix}
                      decimals={s.decimals || 0}
                    />
                  </p>
                  <p className="mt-2 text-sm leading-snug text-ink-500">
                    {s.label}
                  </p>
                </TornParchment>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
