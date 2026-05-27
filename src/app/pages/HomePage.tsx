import { useState, useRef } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  MessageSquare,
  Cpu,
  Target,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ArrowDown,
} from "lucide-react";

// ──────────────── Background pattern ─────────────────
function HeroBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#005EB8" strokeWidth="0.4" strokeOpacity="0.12" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {/* Decorative circles */}
      <circle cx="10%" cy="20%" r="120" fill="#005EB8" fillOpacity="0.04" />
      <circle cx="90%" cy="70%" r="180" fill="#E63B8C" fillOpacity="0.04" />
      <circle cx="80%" cy="15%" r="80" fill="#F4A6C8" fillOpacity="0.06" />
      <circle cx="20%" cy="80%" r="100" fill="#005EB8" fillOpacity="0.04" />
      {/* Abstract lines */}
      <line x1="0" y1="60%" x2="30%" y2="30%" stroke="#005EB8" strokeWidth="0.5" strokeOpacity="0.1" />
      <line x1="100%" y1="20%" x2="70%" y2="60%" stroke="#E63B8C" strokeWidth="0.5" strokeOpacity="0.08" />
    </svg>
  );
}

// ──────────────── Tech badge ─────────────────
function TechBadge({ name, color }: { name: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      className="px-4 py-2.5 rounded-xl text-sm font-semibold border flex items-center gap-2"
      style={{
        background: `${color}12`,
        borderColor: `${color}30`,
        color: color,
      }}
    >
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      {name}
    </motion.div>
  );
}

// ──────────────── How it works card ─────────────────
function HowCard({
  icon,
  step,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  step: number;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative p-6 rounded-2xl border flex flex-col gap-4"
      style={{
        background: "white",
        borderColor: "#D6E8F7",
        boxShadow: "0 4px 24px rgba(0,94,184,0.06)",
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #EAF4FF 0%, #F8D7E8 100%)" }}
        >
          {icon}
        </div>
        <span
          className="text-4xl font-black opacity-10 leading-none"
          style={{ color: "#005EB8" }}
        >
          {step}
        </span>
      </div>
      <div>
        <h3 className="font-bold mb-1.5" style={{ color: "#102A43", fontSize: "1rem" }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "#52677A" }}>{description}</p>
      </div>
    </motion.div>
  );
}

// ──────────────── Main component ─────────────────
type PredictionResult = { classe: string; confianca: number };
type Status = "idle" | "loading" | "success" | "error";
const API_URL = import.meta.env.VITE_API_URL ?? "/api/classificar";

function truncateDecimals(value: number, decimals: number) {
  const factor = 10 ** decimals;
  return Math.trunc(value * factor) / factor;
}

export function HomePage() {
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const classifierRef = useRef<HTMLDivElement>(null);

  const scrollToClassifier = () => {
    classifierRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setStatus("loading");
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: question }),
      });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const data: PredictionResult = await res.json();
      setResult(data);
      setStatus("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setErrorMsg(
        msg.includes("Failed to fetch") || msg.includes("NetworkError")
          ? "Não foi possível conectar à API. Verifique se os containers do site e da API estão rodando."
          : `Erro ao classificar: ${msg}`
      );
      setStatus("error");
    }
  };

  const confiancaValue = result ? truncateDecimals(result.confianca, 4).toFixed(4) : "0.0000";
  const confiancaPct = result ? result.confianca * 100 : 0;

  const technologies = [
    { name: "Python 3.11", color: "#005EB8" },
    { name: "PyTorch", color: "#E63B8C" },
    { name: "Transformers", color: "#0B2545" },
    { name: "FastAPI", color: "#005EB8" },
    { name: "Uvicorn", color: "#5B7C99" },
    { name: "Pandas", color: "#E63B8C" },
    { name: "Scikit-learn", color: "#0B2545" },
    { name: "NumPy", color: "#5B7C99" },
    { name: "Docker", color: "#005EB8" },
  ];

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-24 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #F3F9FF 0%, #FFFFFF 40%, #FFF0F7 100%)" }}
      >
        <HeroBg />
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border"
            style={{
              background: "rgba(0,94,184,0.08)",
              borderColor: "rgba(0,94,184,0.2)",
              color: "#005EB8",
            }}
          >
            <Zap className="w-3.5 h-3.5" />
            Inteligência Artificial · NLP · BERT em Português
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black leading-tight"
            style={{ fontSize: "clamp(2.2rem, 6vw, 3.8rem)", color: "#0B2545", letterSpacing: "-0.02em" }}
          >
            Classificador de Intenções{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #005EB8, #E63B8C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              IntegraCAR
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl text-lg leading-relaxed"
            style={{ color: "#2F4F68" }}
          >
            Identifique automaticamente a intenção de perguntas usando um modelo BERT treinado em
            português. Rápido, preciso e pronto para integração.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mt-2"
          >
            <button
              onClick={scrollToClassifier}
              className="px-7 py-3.5 rounded-xl text-white font-bold text-base transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
              style={{ background: "linear-gradient(135deg, #005EB8 0%, #E63B8C 100%)", boxShadow: "0 4px 20px rgba(0,94,184,0.3)" }}
            >
              Testar classificador <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              to="/docs"
              className="px-7 py-3.5 rounded-xl font-bold text-base transition-all duration-200 hover:-translate-y-0.5 border flex items-center gap-2"
              style={{ color: "#005EB8", borderColor: "#A9D2F0", background: "white" }}
            >
              Ver documentação
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mt-4"
          >
            {[
              { label: "Modelo", value: "BERT PT" },
              { label: "Backend", value: "FastAPI" },
              { label: "Linguagem", value: "Português" },
              { label: "Container", value: "Docker" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-bold text-lg" style={{ color: "#005EB8" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#6D7F90" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.button
          onClick={scrollToClassifier}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
          style={{ color: "#5B7C99" }}
        >
          <span className="text-xs">Começar</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </section>

      {/* ── Classifier ── */}
      <section id="classifier" ref={classifierRef} className="py-20 px-4" style={{ background: "white" }}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#EAF4FF", color: "#005EB8" }}
            >
              Classificador
            </span>
            <h2
              className="mt-3 font-black"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#0B2545", letterSpacing: "-0.02em" }}
            >
              Teste o modelo ao vivo
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#52677A" }}>
              Envie uma pergunta e veja a intenção identificada pelo modelo BERT.
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border p-8"
            style={{
              background: "white",
              borderColor: "#D6E8F7",
              boxShadow: "0 8px 40px rgba(0,94,184,0.08)",
            }}
          >
            <h3 className="font-bold mb-5" style={{ color: "#102A43", fontSize: "1.1rem" }}>
              Enviar pergunta
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                placeholder="Ex: Como posso abrir um processo corretamente no Simlam?"
                className="w-full resize-none rounded-xl border p-4 text-sm outline-none transition-all duration-200 focus:ring-2"
                style={{
                  borderColor: "#BCD8EE",
                  background: "#FFFFFF",
                  color: "#102A43",
                  lineHeight: "1.7",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#005EB8")}
                onBlur={(e) => (e.target.style.borderColor = "#BCD8EE")}
              />
              <button
                type="submit"
                disabled={status === "loading" || !question.trim()}
                className="py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #005EB8 0%, #E63B8C 100%)" }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Classificando...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4" />
                    Classificar pergunta
                  </>
                )}
              </button>
            </form>

            {/* Result */}
            {status === "success" && result && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 rounded-xl border p-5"
                style={{ background: "#F3F9FF", borderColor: "#F2B5D4" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5" style={{ color: "#005EB8" }} />
                  <span className="font-bold text-sm" style={{ color: "#005EB8" }}>
                    Intenção identificada
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: "#52677A" }}>Classe prevista</p>
                    <span
                      className="px-4 py-1.5 rounded-lg text-sm font-bold"
                      style={{ background: "linear-gradient(135deg, #005EB8, #E63B8C)", color: "white" }}
                    >
                      {result.classe}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1.5">
                      <p className="text-xs font-medium" style={{ color: "#52677A" }}>Confiança</p>
                      <p className="text-xs font-bold" style={{ color: "#005EB8" }}>{confiancaValue}</p>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#F8D7E8" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${confiancaPct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #005EB8, #E63B8C)" }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#3F5F78" }}>
                  O modelo classificou sua pergunta como <strong>{result.classe}</strong> com{" "}
                  <strong>{confiancaValue}</strong> de confiança. Isso indica a intenção principal
                  detectada pelo BERT treinado em português.
                </p>
              </motion.div>
            )}

            {/* Error */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl border p-5 flex items-start gap-3"
                style={{ background: "#FFF5F5", borderColor: "#FECACA" }}
              >
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#DC2626" }} />
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: "#991B1B" }}>
                    Erro ao conectar à API
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#7F1D1D" }}>{errorMsg}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-20 px-4" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#EAF4FF", color: "#005EB8" }}
            >
              Processo
            </span>
            <h2
              className="mt-3 font-black"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#0B2545", letterSpacing: "-0.02em" }}
            >
              Como funciona
            </h2>
            <p className="mt-2 text-sm max-w-xl mx-auto" style={{ color: "#52677A" }}>
              Entenda o pipeline de classificação de intenções do IntegraCAR em três etapas simples.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HowCard
              step={1}
              icon={<MessageSquare className="w-6 h-6" style={{ color: "#005EB8" }} />}
              title="Pergunta do usuário"
              description="O usuário envia uma pergunta relacionada a processos, documentos ou sistemas agroambientais pelo formulário ou via API REST."
              delay={0}
            />
            <HowCard
              step={2}
              icon={<Cpu className="w-6 h-6" style={{ color: "#E63B8C" }} />}
              title="Processamento com BERT"
              description="O texto é tokenizado e analisado por um modelo BERT treinado especificamente para classificação de intenções em português."
              delay={0.1}
            />
            <HowCard
              step={3}
              icon={<Target className="w-6 h-6" style={{ color: "#005EB8" }} />}
              title="Predição da intenção"
              description="O sistema retorna a classe identificada (ex: Manual ou Legislação) e o nível de confiança da previsão em formato JSON."
              delay={0.2}
            />
          </div>

          {/* Connector arrows (desktop) */}
          <div className="hidden md:flex justify-center items-center mt-2 gap-0">
            {[0, 1].map((i) => (
              <div key={i} className="flex-1 flex items-center justify-center opacity-30">
                <div className="w-full max-w-[120px] h-px" style={{ background: "#005EB8" }} />
                <ChevronRight className="w-4 h-4 -ml-2" style={{ color: "#005EB8" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technologies ── */}
      <section id="technologies" className="py-20 px-4" style={{ background: "white" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#EAF4FF", color: "#005EB8" }}
            >
              Stack
            </span>
            <h2
              className="mt-3 font-black"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#0B2545", letterSpacing: "-0.02em" }}
            >
              Tecnologias utilizadas
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#52677A" }}>
              O IntegraCAR é construído com ferramentas modernas de Machine Learning e APIs de alto desempenho.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <TechBadge name={tech.name} color={tech.color} />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl p-8 text-center"
            style={{
              background: "linear-gradient(135deg, #005EB8 0%, #E63B8C 50%, #005EB8 100%)",
              boxShadow: "0 12px 40px rgba(0,94,184,0.25)",
            }}
          >
            <h3 className="text-white font-black text-xl mb-2">Pronto para integrar?</h3>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>
              Explore a documentação completa da API e comece a classificar intenções agora.
            </p>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "white", color: "#005EB8" }}
            >
              Acessar documentação <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
