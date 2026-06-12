import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { Building2, MapPin, X } from "lucide-react";
import SectionHeading from "./ui/SectionHeading.jsx";
import Reveal from "./ui/Reveal.jsx";
import PirateShip from "./ui/PirateShip.jsx";
import { SeaSerpent, CompassRose, Starfish, XMark } from "./ui/MapDecor.jsx";
import {
  RolledScroll,
  WantedPoster,
  TornParchment,
  Logbook,
  WoodSign,
} from "./ui/PirateFrames.jsx";

const FRAMES = {
  rolled: RolledScroll,
  wanted: WantedPoster,
  torn: TornParchment,
  log: Logbook,
};

const JOBS = [
  {
    role: "Generative AI Engineer",
    company: "Fiserv, Inc",
    location: "Overland Park, KS",
    dates: "Oct 2024 — Present",
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
    dates: "Oct 2023 — Sept 2024",
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
    dates: "Feb 2021 — June 2023",
    flag: "#2e9e57",
    accentHex: "#1f7a42",
    scroll: "torn",
    bullets: [
      "Developed Kafka + Flink fraud detection on streaming payments, cutting false positives by **30%** and improving approval accuracy.",
      "Built customer segmentation with Keras and Hugging Face Transformers, powering **20%** more personalized recommendations across channels.",
      "Accelerated ETL with Apache NiFi and Spark, increasing pipeline throughput by **45%**.",
      "Delivered FAISS + RAG insight engines for semantic search across enterprise knowledge bases — before RAG was cool.",
    ],
  },
  {
    role: "Data Scientist",
    company: "Siemens",
    location: "Bangalore, India",
    dates: "Oct 2019 — Jan 2021",
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

/* Island anchorages on the chart, as fractions of its width/height */
const PORTS = [
  { x: 0.24, y: 0.1 },
  { x: 0.76, y: 0.36 },
  { x: 0.24, y: 0.62 },
  { x: 0.74, y: 0.88 },
];
const PORTS_MOBILE = [
  { x: 0.3, y: 0.09 },
  { x: 0.72, y: 0.36 },
  { x: 0.28, y: 0.62 },
  { x: 0.7, y: 0.88 },
];

/** Renders **highlighted** segments in the job's accent color. */
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

function Island({ flag, className = "" }) {
  return (
    <svg viewBox="0 0 64 44" className={className} aria-hidden="true">
      <ellipse cx="32" cy="36" rx="26" ry="7.5" fill="#eed9a4" stroke="#c9a36a" strokeWidth="2.5" />
      <path d="M30 34 C 29 26 31 20 36 14" fill="none" stroke="#8b5a2b" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M36 14 C 30 8 24 8 20 12 C 26 12 30 13 36 14 Z" fill="#2e9e57" />
      <path d="M36 14 C 42 7 48 7 52 11 C 46 11 41 13 36 14 Z" fill="#4caf6d" />
      <path d="M36 14 C 36 6 40 3 45 2 C 41 6 39 9 36 14 Z" fill="#2e9e57" />
      <circle cx="35" cy="16" r="2" fill="#5d3a1a" />
      <line x1="14" y1="34" x2="14" y2="19" stroke="#5d3a1a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 19 L27 23.5 L14 28 Z" fill={flag} stroke="#5d3a1a" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function Experience() {
  const chartRef = useRef(null);
  const pathRef = useRef(null);
  const progress = useMotionValue(0);
  const [dims, setDims] = useState({ w: 0, h: 0, md: true });
  const [openJob, setOpenJob] = useState(null);
  const [nearPort, setNearPort] = useState(-1);
  const nearRef = useRef(-1);

  // Voyage progress: starts as the chart sails into view, completes near its end.
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

  // Measure the chart so the route can be plotted in real pixels.
  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const measure = () =>
      setDims({ w: el.offsetWidth, h: el.offsetHeight, md: window.innerWidth >= 768 });
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

  // Serpentine route threading every island
  let routePath = "";
  if (dims.w > 0) {
    routePath = `M ${ports[0].x} ${ports[0].y}`;
    for (let i = 1; i < ports.length; i++) {
      const a = ports[i - 1];
      const b = ports[i];
      const midY = (a.y + b.y) / 2;
      routePath += ` C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
    }
  }

  const sprung = useSpring(progress, { stiffness: 90, damping: 24 });
  const routeHeight = useTransform(sprung, (v) => `${v * 100}%`);
  const boatX = useMotionValue(0);
  const boatY = useMotionValue(0);
  const boatRotate = useMotionValue(0);

  function sailTo(v) {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    if (!len) return;
    const at = len * Math.min(v, 0.999);
    const pt = path.getPointAtLength(at);
    const ahead = path.getPointAtLength(Math.min(len, at + 2));
    boatX.set(pt.x);
    boatY.set(pt.y);
    const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
    boatRotate.set(Math.max(-12, Math.min(12, (angle - 90) * 0.4)));
    // Light up the island the boat is anchoring at
    const fr = v * (JOBS.length - 1);
    const nearest = Math.round(fr);
    const isNear = Math.abs(fr - nearest) < 0.2 ? nearest : -1;
    if (nearRef.current !== isNear) {
      nearRef.current = isNear;
      setNearPort(isNear);
    }
  }

  useMotionValueEvent(sprung, "change", sailTo);
  useEffect(() => {
    sailTo(sprung.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dims]);

  // Modal: lock scroll + close on Escape
  useEffect(() => {
    if (openJob === null) return;
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

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="03"
          eyebrow="The Voyage"
          title="From clinical waters"
          accent="to the gold routes of finance."
          description="Scroll, and the ship sails the route of my career. Drop anchor at any island to unroll that chapter's log."
        />

        {/* The sea chart */}
        <Reveal className="mt-12">
          <div
            ref={chartRef}
            className="paper relative h-[960px] overflow-hidden rounded-[2rem] shadow-pop-lg sm:h-[1060px]"
          >
            {/* chart water + plotting grid */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-ocean-300/25 via-ocean-300/10 to-ocean-300/25"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(var(--route-track) 1px, transparent 1px), linear-gradient(90deg, var(--route-track) 1px, transparent 1px)",
                backgroundSize: "90px 90px",
                opacity: 0.5,
              }}
            />
            {/* chart dressing */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <CompassRose className="absolute top-5 right-5 w-20 text-ink-900/20 sm:w-24" />
              <SeaSerpent className="absolute top-[44%] right-[8%] w-24 animate-float text-ocean-600/30 sm:w-32" />
              <p className="absolute top-[51%] right-[6%] -rotate-3 font-hand text-base font-semibold text-ocean-600/50 sm:text-lg">
                here be sea monsters
              </p>
              <Starfish className="absolute bottom-[6%] left-[8%] w-8 rotate-12 text-gold-600/30" />
              <p className="absolute top-[20%] left-[6%] rotate-2 font-hand text-base font-semibold text-ink-400/60 sm:text-lg">
                ≈ the open data seas ≈
              </p>
              <XMark className="absolute right-[14%] bottom-[4%] w-8 text-crimson-500/30" />
            </div>

            {/* faded full route */}
            {dims.w > 0 && (
              <svg
                aria-hidden="true"
                width={dims.w}
                height={dims.h}
                className="pointer-events-none absolute top-0 left-0"
              >
                <path
                  d={routePath}
                  fill="none"
                  stroke="var(--route-track)"
                  strokeWidth="3"
                  strokeDasharray="9 9"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {/* charted-so-far route, revealed as the ship advances */}
            {dims.w > 0 && (
              <motion.div
                aria-hidden="true"
                style={{ height: routeHeight }}
                className="pointer-events-none absolute top-0 left-0 w-full overflow-hidden"
              >
                <svg width={dims.w} height={dims.h}>
                  <path
                    ref={pathRef}
                    d={routePath}
                    fill="none"
                    stroke="var(--color-crimson-500)"
                    strokeWidth="3.5"
                    strokeDasharray="9 9"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            )}

            {/* island ports of call */}
            {dims.w > 0 &&
              JOBS.map((j, i) => (
                <button
                  key={j.company}
                  type="button"
                  onClick={() => setOpenJob(i)}
                  aria-haspopup="dialog"
                  aria-label={`Open the captain's log for ${j.company}`}
                  className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
                  style={{ left: ports[i].x, top: ports[i].y }}
                >
                  <span
                    className={`block transition-transform duration-500 ${
                      nearPort === i ? "scale-125" : "group-hover:scale-110"
                    }`}
                  >
                    <Island flag={j.flag} className="mx-auto h-12 w-[4.5rem] sm:h-14 sm:w-20" />
                  </span>
                  <WoodSign
                    as="span"
                    className={`mt-1 block px-4 py-2 text-center transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-pop-lg group-focus-visible:ring-4 group-focus-visible:ring-gold-400/60 ${
                      nearPort === i ? "border-gold-400 shadow-pop-lg" : ""
                    }`}
                  >
                    <span className="block font-display text-lg leading-tight text-ink-900 sm:text-xl">
                      {j.company}
                    </span>
                    <span className="block font-hand text-sm font-semibold text-ink-500 sm:text-base">
                      {j.dates}
                    </span>
                    <span className="mt-0.5 block font-hand text-sm font-bold text-gold-600">
                      ⚓ open the log
                    </span>
                  </WoodSign>
                </button>
              ))}

            {/* the captain's ship, under full sail */}
            {dims.w > 0 && (
              <motion.div
                aria-hidden="true"
                style={{ x: boatX, y: boatY, rotate: boatRotate }}
                className="pointer-events-none absolute top-0 left-0 z-20"
              >
                <div className="-translate-x-1/2 -translate-y-[68%]">
                  <PirateShip className="h-16 w-20 sm:h-20 sm:w-24" />
                </div>
              </motion.div>
            )}
          </div>
        </Reveal>
      </div>

      {/* The captain's log: a different scroll for every port */}
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
                  className="absolute top-3 right-3 z-20 grid h-9 w-9 place-items-center rounded-full border-2 border-[#2f2014]/30 text-[#2f2014] transition-colors hover:bg-[#2f2014]/10"
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
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-[#5d4630]">
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
