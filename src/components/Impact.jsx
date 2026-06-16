import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading.jsx";
import Reveal from "./ui/Reveal.jsx";
import CountUp from "./ui/CountUp.jsx";
import TiltCard from "./ui/TiltCard.jsx";
import { Coin } from "./ui/MapDecor.jsx";

const METRICS = [
  {
    value: 55,
    suffix: "%",
    label: "Less manual intervention in energy grid optimization workflows",
    org: "NextEra",
    color: "#1f7a42",
  },
  {
    value: 99.95,
    suffix: "%",
    decimals: 2,
    label: "Uptime maintained across production AI services",
    org: "NextEra",
    color: "#a8730d",
  },
  {
    value: 65,
    suffix: "%",
    label: "Faster analyst query resolution across 10M+ grid records",
    org: "NextEra RAG",
    color: "#0c6e9e",
  },
  {
    value: 50,
    suffix: "TB+",
    label: "SCADA and sensor data processed daily for anomaly detection",
    org: "NextEra",
    color: "#d43d2a",
  },
  {
    value: 60,
    suffix: "%",
    label: "Faster regulatory compliance processing with LLM copilots",
    org: "Fiserv",
    color: "#0c6e9e",
  },
  {
    value: 100,
    suffix: "TB+",
    label: "Claims data engineered into fraud signals",
    org: "Textron",
    color: "#a8730d",
  },
];

export default function Impact() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="impact" aria-label="Impact" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-300/12 to-transparent" />
        <Coin className="absolute top-[18%] left-[9%] animate-float" size={34} />
        <Coin className="absolute top-[24%] right-[12%] animate-float" size={26} delay={1.3} />
        <Coin className="absolute bottom-[18%] left-[5%] animate-float" size={24} delay={2.4} />
      </div>

      <div className="section-shell relative">
        <SectionHeading
          index="06"
          eyebrow="The Bounty"
          title="Not just plunder -"
          accent="measurable treasure."
          align="center"
        />

        <div className="treasure-field mt-16">
          <svg
            aria-hidden="true"
            viewBox="0 0 1100 520"
            preserveAspectRatio="none"
            className="treasure-route"
          >
            <path d="M10 390 C 190 170 330 480 500 260 S 820 120 1090 330" />
            <path d="M50 120 C 260 280 450 30 640 150 S 920 340 1060 110" />
          </svg>

          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={0.06 * i} className="h-full">
              <TiltCard max={10} glareEnabled={false} className="h-full">
                <motion.article
                  className="treasure-metric h-full"
                  style={{ "--metric-color": m.color }}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, i % 2 === 0 ? -10 : -6, 0],
                          rotateZ: [0, i % 2 === 0 ? 0.7 : -0.6, 0],
                        }
                  }
                  transition={{
                    duration: 6.5 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.25,
                  }}
                >
                  <span className="treasure-metric__pin" aria-hidden="true" />
                  <p className="treasure-metric__number font-display">
                    <CountUp
                      value={m.value}
                      suffix={m.suffix}
                      decimals={m.decimals || 0}
                      duration={2.2}
                    />
                  </p>
                  <p className="mt-3 text-sm leading-snug text-ink-600">
                    {m.label}
                  </p>
                  <p className="mt-3 font-hand text-lg font-bold text-ink-400">
                    ~ {m.org} ~
                  </p>
                </motion.article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
