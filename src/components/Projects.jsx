import {
  motion,
} from "framer-motion";
import {
  FileText,
  Boxes,
  Bot,
  MessageSquare,
  Image,
  Scale,
  Github,
  ExternalLink,
  Skull,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "./ui/SectionHeading.jsx";
import Reveal from "./ui/Reveal.jsx";
import TiltCard from "./ui/TiltCard.jsx";
import { XMark, Coin } from "./ui/MapDecor.jsx";
import { MapPiece, SideScroll, WantedPoster } from "./ui/PirateFrames.jsx";

const FLOW = [
  { icon: FileText, label: "Compliance Docs" },
  { icon: Boxes, label: "FAISS Embeddings" },
  { icon: Boxes, label: "Pinecone Index" },
  { icon: Bot, label: "GPT-4 + LangChain" },
  { icon: MessageSquare, label: "Advisor Insights" },
];

const SECONDARY = [
  {
    icon: Image,
    title: "Diffusion-Based Image Generation Pipeline",
    impact: "-40% training time",
    badge: "from-crimson-400 to-crimson-600 text-white",
    description:
      "Text-to-image synthesis with Stable Diffusion and DreamBooth, fine-tuned on branded product datasets for marketing personalization. Distributed training on AWS EC2 with PyTorch Lightning + DDP, packaged as an internal Streamlit/Gradio studio for design and branding teams.",
    tech: ["Stable Diffusion", "DreamBooth", "PyTorch Lightning", "DDP", "AWS EC2", "Streamlit", "Gradio"],
  },
  {
    icon: Scale,
    title: "LLM-Powered Credit Risk Modeling Framework",
    impact: "Audit-ready fairness",
    badge: "from-gold-300 to-gold-500 text-tar",
    description:
      "Domain-specific transformers with SHAP-based explainability for regulatory-aligned credit scoring in retail banking. LIME and Fairlearn expose hidden bias; Kubeflow + Airflow automate retraining cycles and compliance drift monitoring.",
    tech: ["Transformers", "SHAP", "LIME", "Fairlearn", "Kubeflow", "Airflow"],
  },
];

const FEATURED_TECH = [
  "LangChain",
  "OpenAI GPT-4o",
  "LlamaIndex",
  "Pinecone",
  "FAISS",
  "Multi-turn Memory",
  "Semantic Ranking",
];

export default function Projects() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Dig-site dressing */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-300/12 to-transparent" />
        <XMark className="absolute top-[6%] right-[3%] w-32 rotate-12 text-crimson-500/10 sm:w-44" />
        <Coin className="absolute top-[34%] left-[3%] animate-float" size={34} />
        <Coin className="absolute bottom-[12%] right-[5%] animate-float" size={26} delay={1.4} />
        <Coin className="absolute bottom-[28%] left-[7%] animate-float" size={22} delay={2.2} />
      </div>

      <div className="section-shell relative">
        <SectionHeading
          index="04"
          eyebrow="The Treasure"
          title="X marks the spot:"
          accent="systems that ship."
        />

        {/* Featured: RAG Advisor */}
        <Reveal className="mt-14">
          <TiltCard max={5} className="group">
            <MapPiece>
              <article className="relative">
                <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border-2 border-crimson-500/40 bg-crimson-400/10 px-4 py-1.5 font-hand text-lg font-bold text-crimson-500">
                      <Skull size={15} /> THE FLAGSHIP
                    </span>
                    <h3 className="mt-5 font-display text-4xl tracking-wide text-ink-900 sm:text-5xl">
                      Real-Time RAG
                      <span className="text-gradient"> Advisor Platform</span>
                    </h3>
                    <p className="mt-4 leading-relaxed text-ink-500">
                      A retrieval-augmented generation system that gives
                      financial advisors instant, personalized investment
                      insights grounded in compliance documents and live
                      portfolio data. Multi-turn prompting and memory-aware
                      generation lifted contextual relevance by{" "}
                      <span className="font-bold text-ocean-600">65%</span> in
                      client Q&amp;A.
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {FEATURED_TECH.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border-2 border-ink-900/12 bg-parchment-100 px-3 py-1.5 text-xs font-semibold text-ink-600"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 flex items-center gap-4">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-sm font-bold text-ocean-600 transition-colors hover:text-crimson-500"
                      >
                        Case study on request <ArrowRight size={15} />
                      </a>
                      <a
                        href="#contact"
                        aria-label="Request the RAG advisor source details"
                        className="grid h-11 w-11 place-items-center rounded-lg border-2 border-ink-900/20 text-ink-500 transition-all hover:border-crimson-500 hover:text-crimson-500"
                      >
                        <Github size={17} />
                      </a>
                    </div>
                  </div>

                  {/* Treasure route */}
                  <div className="pipeline-chart" aria-label="RAG pipeline architecture">
                    <p className="relative z-10 mb-6 font-hand text-2xl font-bold text-crimson-500">
                      The Route to the Loot
                    </p>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 420 420"
                      preserveAspectRatio="none"
                      className="pipeline-chart__route"
                    >
                      <path d="M64 46 C 250 40 125 160 310 160 S 188 286 350 350" />
                    </svg>
                    <ol className="pipeline-chart__nodes">
                      {FLOW.map((node, i) => (
                        <motion.li
                          key={node.label}
                          initial={{ opacity: 1, y: 18, rotateX: 12 }}
                          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                          viewport={{ once: false, amount: 0.45 }}
                          transition={{ delay: 0.08 * i, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                          className="pipeline-node"
                        >
                          <span className="pipeline-node__icon">
                            <node.icon size={17} />
                          </span>
                          <span className="pipeline-node__label">
                            {node.label}
                          </span>
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                </div>
              </article>
            </MapPiece>
          </TiltCard>
        </Reveal>

        {/* Secondary loot */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {SECONDARY.map((p, i) => {
            const Frame = i === 0 ? SideScroll : WantedPoster;
            const frameProps = i === 0 ? {} : { heading: "BOUNTY" };
            return (
            <Reveal key={p.title} delay={0.1 * (i + 1)} className="h-full">
              <TiltCard max={8} glareEnabled={false} className="group h-full">
                <Frame className="h-full" {...frameProps}>
                  <article className="flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl border-2 border-tar/60 bg-gradient-to-br shadow-pop-solid-sm transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${p.badge}`}
                      >
                        <p.icon size={22} />
                      </span>
                      <span className="rounded-full border-2 border-ink-900/12 bg-parchment-100 px-3.5 py-1.5 font-hand text-lg font-bold text-ink-600">
                        {p.impact}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-3xl tracking-wide text-ink-900">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">
                      {p.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border-2 border-ink-900/12 bg-parchment-100 px-3 py-1 text-xs font-semibold text-ink-600"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center gap-3">
                      <a
                        href="#contact"
                        aria-label={`Request ${p.title} source details`}
                        className="grid h-11 w-11 place-items-center rounded-lg border-2 border-ink-900/20 text-ink-500 transition-all hover:border-crimson-500 hover:text-crimson-500"
                      >
                        <Github size={16} />
                      </a>
                      <a
                        href="#contact"
                        aria-label={`Request ${p.title} demo details`}
                        className="grid h-11 w-11 place-items-center rounded-lg border-2 border-ink-900/20 text-ink-500 transition-all hover:border-crimson-500 hover:text-crimson-500"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </article>
                </Frame>
              </TiltCard>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
