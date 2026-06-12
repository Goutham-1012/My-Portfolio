import SectionHeading from "./ui/SectionHeading.jsx";
import Reveal from "./ui/Reveal.jsx";
import CountUp from "./ui/CountUp.jsx";
import { Coin } from "./ui/MapDecor.jsx";

const METRICS = [
  {
    value: 60,
    suffix: "%",
    label: "Faster regulatory compliance processing with LLM copilots",
    org: "Fiserv",
  },
  {
    value: 99.9,
    suffix: "%",
    decimals: 1,
    label: "Uptime maintained across production AI services",
    org: "Fiserv",
  },
  {
    value: 65,
    suffix: "%",
    label: "Gain in contextual relevance for RAG advisor queries",
    org: "RAG Platform",
  },
  {
    value: 100,
    suffix: "TB+",
    label: "Claims data engineered into fraud signals",
    org: "Textron",
  },
  {
    value: 40,
    suffix: "%",
    label: "Faster deployment & distributed training cycles",
    org: "MLOps",
  },
  {
    value: 35,
    suffix: "%",
    label: "Lower inference latency via ONNX + TensorRT",
    org: "Serving",
  },
];

export default function Impact() {
  return (
    <section id="impact" aria-label="Impact" className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <Reveal>
          {/* Wanted-poster treasure board: real parchment, nailed to the page */}
          <div className="scroll-paper parchment-scope relative rounded-[2rem] border-[3px] border-[#6a4a1e]/50 p-3 shadow-pop-lg">
            <span aria-hidden="true" className="nail top-3 left-3 z-10 scale-150" />
            <span aria-hidden="true" className="nail top-3 right-3 z-10 scale-150" />
            <span aria-hidden="true" className="nail bottom-3 left-3 z-10 scale-150" />
            <span aria-hidden="true" className="nail right-3 bottom-3 z-10 scale-150" />
            <div className="relative overflow-hidden rounded-[1.6rem] border-2 border-dashed border-gold-500/60 px-8 py-14 sm:px-12 sm:py-16">
              {/* spinning corner doubloons */}
              <Coin className="absolute top-5 left-5" size={32} />
              <Coin className="absolute top-5 right-5" size={32} delay={0.9} />
              <Coin className="absolute bottom-5 left-5" size={32} delay={1.8} />
              <Coin className="absolute right-5 bottom-5" size={32} delay={2.7} />
              {/* skull watermark */}
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[11rem] text-ink-900/5 select-none sm:text-[15rem]"
              >
                ☠
              </span>
              <div
                aria-hidden="true"
                className="absolute top-0 left-1/4 h-56 w-56 rounded-full bg-gold-300/30 blur-[90px]"
              />
              <div
                aria-hidden="true"
                className="absolute right-1/4 bottom-0 h-56 w-56 rounded-full bg-ocean-300/30 blur-[90px]"
              />

              <div className="relative">
                <SectionHeading
                  index="06"
                  eyebrow="The Bounty"
                  title="Not just plunder —"
                  accent="measurable treasure."
                  align="center"
                />

                <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {METRICS.map((m, i) => (
                    <Reveal key={m.label} delay={0.08 * i}>
                      <div className="group text-center">
                        <p className="font-display text-6xl text-gradient transition-transform duration-500 group-hover:scale-110 sm:text-7xl">
                          <CountUp
                            value={m.value}
                            suffix={m.suffix}
                            decimals={m.decimals || 0}
                            duration={2.2}
                          />
                        </p>
                        <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-snug text-ink-500">
                          {m.label}
                        </p>
                        <p className="mt-2 font-hand text-lg font-bold text-ink-400">
                          ~ {m.org} ~
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
