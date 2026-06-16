import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { Building2, MapPin, X } from "lucide-react";
import SectionHeading from "./ui/SectionHeading.jsx";
import Reveal from "./ui/Reveal.jsx";
import ExperienceVoyage3D from "./ui/ExperienceVoyage3D.jsx";
import {
  RolledScroll,
  WantedPoster,
  TornParchment,
  Logbook,
} from "./ui/PirateFrames.jsx";

const FRAMES = {
  rolled: RolledScroll,
  wanted: WantedPoster,
  torn: TornParchment,
  log: Logbook,
};

const JOBS = [
  {
    role: "Senior AI Engineer",
    company: "NextEra Energy",
    location: "Juno Beach, FL",
    dates: "Nov 2025 - Present",
    flag: "#2e9e57",
    accentHex: "#1f7a42",
    scroll: "log",
    bullets: [
      "Built multi-agent systems with LangChain, LangGraph and AutoGen for energy grid optimization, reducing manual intervention by **55%** and decision latency by **40%**.",
      "Fine-tuned LLaMA 3 and Mistral with LoRA/QLoRA for forecasting and predictive maintenance, reaching **92%** accuracy and cutting unplanned outages by **30%**.",
      "Delivered RAG over **10M+** regulatory and grid records with LlamaIndex, Pinecone and AWS Bedrock, improving query resolution by **65%** while reducing hallucinations.",
      "Built multimodal fault detection with CLIP and GPT-4o Vision across satellite imagery, telemetry and inspection reports, reaching **87%** precision across **500+** wind turbines.",
      "Ran LLMOps with MLflow, W&B, Triton and SageMaker, including drift detection, A/B testing and governance that kept AI services at **99.95% uptime**.",
      "Processed **50TB+** daily SCADA and sensor data with PyTorch, Kafka and Spark for real-time anomaly detection and faster grid instability alerts.",
    ],
  },
  {
    role: "Generative AI Engineer",
    company: "Fiserv, Inc",
    location: "Overland Park, KS",
    dates: "Oct 2024 - Oct 2025",
    flag: "#1a96cc",
    accentHex: "#0c6e9e",
    scroll: "rolled",
    bullets: [
      "Designed LLM-powered compliance chatbots with BERT, LangChain and Hugging Face, cutting manual processing of regulatory requests by **60%**.",
      "Engineered real-time fraud detection on Spark and Kafka using LLM vector representations, boosting anomaly detection in financial streams by **25%**.",
      "Migrated legacy inference to SageMaker with ONNX and TensorRT, cutting prediction latency by **35%** in client-facing decision systems.",
      "Built GPT-4 + Pinecone advisory tools (**+40%** semantic accuracy) and Neo4j financial knowledge graphs that surface risk insights **50% faster**.",
      "Maintained **99.9% uptime** for AI services with Jenkins, Prometheus and GitHub Actions retraining alerts and health checks.",
    ],
  },
  {
    role: "Machine Learning Engineer",
    company: "Textron Aviation",
    location: "Wichita, KS",
    dates: "Oct 2023 - Sept 2024",
    flag: "#d43d2a",
    accentHex: "#b03224",
    scroll: "wanted",
    bullets: [
      "Processed **100TB+** of structured and unstructured claims data with Spark and Hadoop, lifting fraud detection accuracy by **20%** in policy audits.",
      "Built Kafka + Airflow streaming architecture for real-time claim tracking, halving alert latency (**-50%**) across customer service pipelines.",
      "Shipped PyTorch and TensorFlow models for churn prediction and underwriting calibration, improving decision precision by **18%**.",
      "Provisioned Terraform + Kubernetes inference infrastructure, cutting AWS compute costs by **25%** during peak processing hours.",
    ],
  },
  {
    role: "Data Scientist",
    company: "Lowe's",
    location: "Bangalore, India",
    dates: "Feb 2021 - June 2023",
    flag: "#2e9e57",
    accentHex: "#1f7a42",
    scroll: "torn",
    bullets: [
      "Developed Kafka + Flink fraud detection on streaming payments, cutting false positives by **30%** and improving approval accuracy.",
      "Built customer segmentation with Keras and Hugging Face Transformers, powering **20%** more personalized recommendations across channels.",
      "Accelerated ETL with Apache NiFi and Spark, increasing pipeline throughput by **45%**.",
      "Delivered FAISS + RAG insight engines for semantic search across enterprise knowledge bases - before RAG was cool.",
    ],
  },
  {
    role: "Data Scientist",
    company: "Siemens",
    location: "Bangalore, India",
    dates: "Oct 2019 - Jan 2021",
    flag: "#e09c1f",
    accentHex: "#a8730d",
    scroll: "log",
    bullets: [
      "Containerized legacy analytics and migrated to AWS EKS, achieving **98%** global uptime for clinical dashboards.",
      "Restructured Cassandra and MongoDB pipelines, reducing retrieval time for clinical markers by **40%**.",
      "Implemented Apache Pulsar + Flink adverse-event detection with **sub-second** alerting during patient monitoring.",
      "Integrated Jenkins with Dockerized services, pushing predictive models to production **35%** faster.",
    ],
  },
];

const PORTS = [
  { x: 0.31, y: 0.24 },
  { x: 0.76, y: 0.3 },
  { x: 0.24, y: 0.5 },
  { x: 0.76, y: 0.7 },
  { x: 0.28, y: 0.88 },
];

const PORTS_MOBILE = [
  { x: 0.26, y: 0.26 },
  { x: 0.74, y: 0.28 },
  { x: 0.3, y: 0.48 },
  { x: 0.7, y: 0.68 },
  { x: 0.32, y: 0.82 },
];

function Emph({ text, accentHex }) {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-bold" style={{ color: accentHex }}>
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function Experience() {
  const chartRef = useRef(null);
  const progress = useMotionValue(0);
  const [dims, setDims] = useState({ w: 0, h: 0, md: true });
  const [openJob, setOpenJob] = useState(null);
  const [nearPort, setNearPort] = useState(-1);
  const nearRef = useRef(-1);

  useEffect(() => {
    const update = () => {
      const el = chartRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.8;
      const end = vh * 0.55;
      const p = (start - rect.top) / (rect.height + (start - end));
      progress.set(Math.min(1, Math.max(0, p)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return undefined;

    const measure = () => {
      setDims({
        w: el.offsetWidth,
        h: el.offsetHeight,
        md: window.innerWidth >= 768,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const ports = (dims.md ? PORTS : PORTS_MOBILE).map((p) => ({
    x: p.x * dims.w,
    y: p.y * dims.h,
  }));

  const sprung = useSpring(progress, { stiffness: 90, damping: 24 });

  function updateNearPort(v) {
    const fr = v * (JOBS.length - 1);
    const nearest = Math.round(fr);
    const isNear = Math.abs(fr - nearest) < 0.2 ? nearest : -1;
    if (nearRef.current !== isNear) {
      nearRef.current = isNear;
      setNearPort(isNear);
    }
  }

  useMotionValueEvent(sprung, "change", updateNearPort);
  useEffect(() => {
    updateNearPort(sprung.get());
  }, [sprung]);

  useEffect(() => {
    if (openJob === null) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpenJob(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openJob]);

  const job = openJob !== null ? JOBS[openJob] : null;

  return (
    <section
      id="experience"
      aria-label="Experience"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-300/15 to-transparent" />
      </div>

      <div className="section-shell relative z-20">
        <SectionHeading
          index="03"
          eyebrow="The Voyage"
          title="From clinical waters"
          accent="to renewable energy grids."
          description="Scroll, and the ship sails the route of my career. Drop anchor at any port to unroll that chapter's log."
        />
      </div>

      <Reveal className="relative z-10 -mt-48 md:-mt-56">
        <div
          id="experience-chart"
          ref={chartRef}
          className="voyage-cinematic relative left-1/2 h-[112svh] min-h-[860px] w-screen -translate-x-1/2 scroll-mt-28 overflow-visible sm:min-h-[940px] lg:min-h-[1020px]"
        >
          <ExperienceVoyage3D progress={sprung} />
          <div
            aria-hidden="true"
            className="voyage-cinematic-glass pointer-events-none absolute inset-0 z-10"
          />

          {dims.w > 0 &&
            JOBS.map((j, i) => (
              <button
                key={j.company}
                type="button"
                onClick={() => setOpenJob(i)}
                aria-haspopup="dialog"
                aria-label={`Open the captain's log for ${j.company}`}
                className={`voyage-port-button group absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none ${
                  nearPort === i ? "is-active" : ""
                }`}
                style={{
                  left: ports[i].x,
                  top: ports[i].y,
                  "--pin-color": j.flag,
                }}
              >
                <span className="voyage-port-pin" aria-hidden="true">
                  <span />
                </span>
                <span className="voyage-port-label">
                  <span className="block font-display text-lg leading-tight text-[#2f2014] sm:text-xl">
                    {j.company}
                  </span>
                  <span className="block font-hand text-sm font-semibold text-[#6e553a] sm:text-base">
                    {j.dates}
                  </span>
                </span>
              </button>
            ))}
        </div>
      </Reveal>

      <AnimatePresence>
        {job && (
          <motion.div
            key="log-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${job.company} experience`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] grid place-items-center p-4 sm:p-8"
          >
            <div
              className="absolute inset-0 bg-[#2f2014]/55 backdrop-blur-sm"
              onClick={() => setOpenJob(null)}
            />
            <motion.div
              initial={{ scale: 0.6, rotateX: 40, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.75, rotateX: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              style={{ transformPerspective: 1100 }}
              className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto px-6 py-2"
            >
              {(() => {
                const Frame = FRAMES[job.scroll];
                return (
                  <Frame>
                    <button
                      type="button"
                      onClick={() => setOpenJob(null)}
                      aria-label="Close log"
                      className="absolute top-3 right-3 z-20 grid h-11 w-11 place-items-center rounded-full border-2 border-[#2f2014]/30 text-[#2f2014] transition-colors hover:bg-[#2f2014]/10"
                    >
                      <X size={18} />
                    </button>

                    <div className="flex flex-wrap items-center justify-between gap-3 pr-10">
                      <h3 className="font-display text-3xl tracking-wide text-[#2f2014] sm:text-4xl">
                        {job.role}
                      </h3>
                      <span
                        className="rounded-full border-2 border-[#2f2014]/15 bg-[#2f2014]/5 px-3.5 py-1 font-hand text-lg font-bold"
                        style={{ color: job.accentHex }}
                      >
                        {job.dates}
                      </span>
                    </div>
                    <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6e553a]">
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 size={14} style={{ color: job.accentHex }} />
                        <span className="font-bold text-[#4a3621]">{job.company}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={13} />
                        {job.location}
                      </span>
                    </p>
                    <ul className="mt-5 space-y-3.5">
                      {job.bullets.map((b, i) => (
                        <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-[#5d4630]">
                          <span
                            aria-hidden="true"
                            className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: job.accentHex }}
                          />
                          <span>
                            <Emph text={b} accentHex={job.accentHex} />
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-center font-hand text-xl font-semibold text-[#8a6f50]">
                      ~ end of log entry ~
                    </p>
                  </Frame>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
