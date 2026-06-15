import {
  BrainCircuit,
  Sparkles,
  Workflow,
  Database,
  Cloud,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "./ui/SectionHeading.jsx";
import Reveal from "./ui/Reveal.jsx";
import TiltCard from "./ui/TiltCard.jsx";
import { CrossedSwords, Barrel, Coin } from "./ui/MapDecor.jsx";
import { SideScroll } from "./ui/PirateFrames.jsx";

const CATEGORIES = [
  {
    icon: BrainCircuit,
    title: "LLMs & Deep Learning",
    badge: "from-ocean-400 to-ocean-600 text-white",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "JAX",
      "Hugging Face",
      "GPT-4o",
      "BERT",
      "T5",
      "CLIP",
      "LLaMA",
      "Mistral",
      "Gemini",
      "Diffusion Models",
      "LoRA",
      "QLoRA",
      "PEFT",
      "Multimodal Models",
      "Computer Vision",
      "NLP",
    ],
  },
  {
    icon: Sparkles,
    title: "Generative AI & RAG",
    badge: "from-crimson-400 to-crimson-600 text-white",
    skills: [
      "OpenAI API",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "Anthropic Claude",
      "Cohere",
      "AWS Bedrock",
      "Azure OpenAI",
      "DreamBooth",
      "RAG",
      "Multi-Agent Systems",
      "Agentic AI",
      "Function Calling",
      "FAISS",
      "Pinecone",
      "Weaviate",
    ],
  },
  {
    icon: Workflow,
    title: "MLOps & Lifecycle",
    badge: "from-gold-300 to-gold-500 text-tar",
    skills: [
      "MLflow",
      "Kubeflow",
      "SageMaker",
      "Vertex AI",
      "Azure ML",
      "KServe",
      "DVC",
      "Weights & Biases",
      "Triton",
      "TorchServe",
      "Ray",
      "Jenkins",
      "GitHub Actions",
      "LLMOps",
      "Model Governance",
      "A/B Testing",
      "Drift Monitoring",
    ],
  },
  {
    icon: Database,
    title: "Data Engineering",
    badge: "from-palm-400 to-palm-600 text-white",
    skills: [
      "Apache Kafka",
      "Apache Spark",
      "Airflow",
      "BigQuery",
      "Snowflake",
      "Apache NiFi",
      "Apache Flink",
      "dbt",
      "Delta Lake",
      "Databricks",
      "Redshift",
      "SQL",
      "Timeseries Data",
      "Neo4j",
    ],
  },
  {
    icon: Cloud,
    title: "Serving & Vector Search",
    badge: "from-ocean-300 to-ocean-500 text-white",
    skills: [
      "AWS",
      "GCP",
      "Azure",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Helm",
      "ONNX",
      "TensorRT",
      "FastAPI",
      "gRPC",
      "Milvus",
      "pgvector",
      "Elasticsearch",
      "ChromaDB",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Responsible AI & Observability",
    badge: "from-crimson-400 to-gold-400 text-white",
    skills: [
      "SHAP",
      "LIME",
      "Fairlearn",
      "Differential Privacy",
      "Federated Learning",
      "PII Redaction",
      "RLHF",
      "RLAIF",
      "AI Safety",
      "Bias Detection",
      "Regulatory Compliance",
      "Prometheus",
      "Grafana",
    ],
  },
];

const MARQUEE = [
  "Python",
  "PyTorch",
  "LangChain",
  "LangGraph",
  "LlamaIndex",
  "Hugging Face",
  "GPT-4o",
  "LLaMA",
  "Mistral",
  "Bedrock",
  "Stable Diffusion",
  "Pinecone",
  "FAISS",
  "Milvus",
  "AutoGen",
  "CrewAI",
  "Kafka",
  "Spark",
  "Airflow",
  "SageMaker",
  "Vertex AI",
  "Kubernetes",
  "Terraform",
  "MLflow",
  "Kubeflow",
  "Snowflake",
  "Neo4j",
  "TensorRT",
];

const SCROLL_TILTS = [
  "-rotate-[0.35deg]",
  "rotate-[0.45deg]",
  "-rotate-[0.2deg]",
  "rotate-[0.3deg]",
  "-rotate-[0.45deg]",
  "rotate-[0.2deg]",
];

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="relative overflow-hidden py-24 md:py-32">
      {/* Set dressing */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-300/10 to-transparent" />
        <CrossedSwords className="absolute top-[7%] right-[4%] w-24 rotate-6 text-ink-900/10 sm:w-28" />
        <Barrel className="absolute bottom-[8%] left-[3%] w-16 -rotate-6 text-ink-900/10 sm:w-20" />
        <Coin className="absolute top-[14%] left-[6%] animate-float" size={30} delay={0.6} />
      </div>

      <div className="section-shell relative">
        <SectionHeading
          index="02"
          eyebrow="The Cargo Hold"
          title="A treasure chest"
          accent="of AI tools."
          description="From prototype notebooks to 99.95%-uptime production fleets - every layer of the modern AI and ML stack, stowed and battle-tested."
        />

        <div className="mt-14 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => {
            return (
              <Reveal key={cat.title} delay={0.07 * i} className="h-full">
                <TiltCard max={7} glareEnabled={false} className="group h-full">
                  <SideScroll className={`h-full min-h-[21rem] ${SCROLL_TILTS[i]}`}>
                    <div className="flex h-full flex-col gap-4 py-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-tar/60 bg-gradient-to-br shadow-pop-solid-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 ${cat.badge}`}
                        >
                          <cat.icon size={20} strokeWidth={2.2} />
                        </span>
                        <h3 className="font-display text-[1.65rem] leading-none tracking-wide text-ink-900">
                          {cat.title}
                        </h3>
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {cat.skills.map((s) => (
                          <li
                            key={s}
                            className="rounded-full border-2 border-ink-900/12 bg-parchment-100 px-3 py-1.5 text-xs font-semibold text-ink-600 transition-colors duration-300 hover:border-ocean-500 hover:text-ocean-600"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SideScroll>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Tool marquee */}
        <Reveal delay={0.2}>
          <SideScroll className="mt-16">
            <div className="mask-x min-w-0 space-y-4 overflow-hidden py-1">
              <div className="flex w-max animate-marquee gap-10">
                {[...MARQUEE, ...MARQUEE].map((t, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-10 font-hand text-xl font-semibold text-ink-400"
                  >
                    {t} <span className="text-ocean-500">⚓</span>
                  </span>
                ))}
              </div>
              <div className="flex w-max animate-marquee-reverse gap-10">
                {[...MARQUEE].reverse().concat([...MARQUEE].reverse()).map((t, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-10 font-hand text-xl font-semibold text-ink-300"
                  >
                    {t} <span className="text-crimson-400">☠</span>
                  </span>
                ))}
              </div>
            </div>
          </SideScroll>
        </Reveal>
      </div>
    </section>
  );
}
