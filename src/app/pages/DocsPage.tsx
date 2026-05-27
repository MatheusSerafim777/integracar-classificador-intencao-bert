import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  BookOpen,
  Terminal,
  Box,
  ChevronRight,
  Copy,
  Check,
  ArrowUpRight,
  Cpu,
  BarChart3,
  Layers,
  Activity,
  Crosshair,
} from "lucide-react";

// ──────────────── Code block ─────────────────
function CodeBlock({ code, language = "json" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{ background: "#081B33", border: "1px solid #183B5C" }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: "#183B5C", background: "#061324" }}
      >
        <span className="text-xs font-mono font-medium" style={{ color: "#5B7C99" }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-all duration-200"
          style={{ color: copied ? "#005EB8" : "#5B7C99", background: "rgba(255,255,255,0.05)" }}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto" style={{ color: "#FFFFFF", fontFamily: "monospace", lineHeight: 1.7 }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ──────────────── Section heading ─────────────────
function SectionHeading({ icon, title, description }: { icon: React.ReactNode; title: string; description?: string }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div
        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
        style={{ background: "#EAF4FF" }}
      >
        {icon}
      </div>
      <div>
        <h2 className="font-bold" style={{ color: "#0B2545", fontSize: "1.2rem" }}>{title}</h2>
        {description && (
          <p className="text-sm mt-0.5" style={{ color: "#52677A" }}>{description}</p>
        )}
      </div>
    </div>
  );
}

// ──────────────── Metric card ─────────────────
function MetricCard({
  title,
  description,
  icon,
  delay,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="p-5 rounded-xl border"
      style={{ background: "white", borderColor: "#D6E8F7", boxShadow: "0 2px 10px rgba(15,35,69,0.08)" }}
    >
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: "#EAF4FF" }}>
        {icon}
      </div>
      <h4 className="font-bold text-sm mb-1" style={{ color: "#102A43" }}>{title}</h4>
      <p className="text-xs leading-relaxed" style={{ color: "#52677A" }}>{description}</p>
    </motion.div>
  );
}

// ──────────────── Nav sidebar items ─────────────────
const navItems = [
  { id: "endpoint", label: "Endpoint de predição" },
  { id: "local", label: "Rodando localmente" },
  { id: "docker", label: "Rodando com Docker" },
  { id: "model", label: "Sobre o modelo" },
  { id: "metrics", label: "Métricas" },
];

// ──────────────── Main component ─────────────────
export function DocsPage() {
  const [activeSection, setActiveSection] = useState("endpoint");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF" }}>
      {/* Docs header */}
      <div
        className="border-b py-12 px-4"
        style={{
          background: "#FFFFFF",
          borderColor: "#D6E8F7",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: "#5B7C99" }}>
            <Link to="/" className="hover:underline">Início</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: "#005EB8" }}>Documentação</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1
                className="font-black mb-2"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#0B2545", letterSpacing: "-0.02em" }}
              >
                Documentação da API
              </h1>
              <p className="text-sm max-w-xl" style={{ color: "#2F4F68" }}>
                A API IntegraCAR permite classificar a intenção de perguntas em português utilizando um
                modelo BERT. Integre facilmente via requisições HTTP.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{ background: "#FFFFFF", color: "#005EB8", border: "1px solid #D6E8F7" }}
              >
                v1.0
              </span>
              <a
                href="/api/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all hover:bg-white"
                style={{ color: "#005EB8", borderColor: "#D6E8F7" }}
              >
                Swagger UI <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 flex gap-8">
        {/* Sidebar nav */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7E9DB8" }}>
              Nesta página
            </p>
            <nav className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-3 py-2 rounded-lg text-sm transition-all duration-150"
                  style={{
                    color: activeSection === item.id ? "#005EB8" : "#52677A",
                    background: activeSection === item.id ? "#EAF4FF" : "transparent",
                    fontWeight: activeSection === item.id ? 600 : 400,
                    borderLeft: activeSection === item.id ? "2px solid #005EB8" : "2px solid transparent",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-12">

          {/* ── Endpoint ── */}
          <motion.section
            id="endpoint"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border p-8"
            style={{ background: "white", borderColor: "#D6E8F7", boxShadow: "0 2px 12px rgba(15,35,69,0.08)" }}
          >
            <SectionHeading
              icon={<BookOpen className="w-5 h-5" style={{ color: "#005EB8" }} />}
              title="Endpoint de predição"
              description="Classifique intenções enviando uma pergunta em texto para o endpoint abaixo."
            />

            {/* Method + route */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl mb-6"
              style={{ background: "#FFFFFF", border: "1px solid #D6E8F7" }}
            >
              <span
                className="px-3 py-1.5 rounded-lg text-xs font-black tracking-wider"
                style={{ background: "#005EB8", color: "white" }}
              >
                POST
              </span>
              <code className="text-sm font-mono" style={{ color: "#102A43" }}>
                <span style={{ color: "#005EB8", fontWeight: 700 }}>/api/classificar</span>
              </code>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7E9DB8" }}>
                  Request Body
                </p>
                <CodeBlock
                  language="json — request"
                  code={`{
  "texto": "Como posso abrir um processo
            corretamente no Simlam?"
}`}
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7E9DB8" }}>
                  Response
                </p>
                <CodeBlock
                  language="json — response 200"
                  code={`{
  "classe": "Manual",
  "confianca": 0.9534
}`}
                />
              </div>
            </div>

            {/* Fields */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7E9DB8" }}>
                Campos da resposta
              </p>
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#D6E8F7" }}>
                {[
                  { field: "classe", type: "string", desc: "Intenção identificada pelo modelo (ex: \"Manual\", \"Legislação\")" },
                  { field: "confianca", type: "float [0–1]", desc: "Probabilidade de confiança da previsão, de 0 a 1 (ex: 0.9534 = 95,34%)" },
                ].map((row, i) => (
                  <div
                    key={row.field}
                    className="flex flex-col sm:flex-row gap-1 sm:gap-4 px-5 py-3 text-sm"
                    style={{
                      background: i % 2 === 0 ? "white" : "#FFFFFF",
                      borderTop: i > 0 ? "1px solid #D6E8F7" : "none",
                    }}
                  >
                    <code className="font-mono font-bold w-28 flex-shrink-0" style={{ color: "#005EB8" }}>{row.field}</code>
                    <span className="w-28 flex-shrink-0 text-xs px-2 py-0.5 rounded self-start" style={{ background: "#EAF4FF", color: "#005EB8" }}>{row.type}</span>
                    <span style={{ color: "#52677A" }}>{row.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── Running locally ── */}
          <motion.section
            id="local"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border p-8"
            style={{ background: "white", borderColor: "#D6E8F7", boxShadow: "0 2px 12px rgba(15,35,69,0.08)" }}
          >
            <SectionHeading
              icon={<Terminal className="w-5 h-5" style={{ color: "#005EB8" }} />}
              title="Rodando a API localmente"
              description="Configure o ambiente Python e inicie o servidor FastAPI com os comandos abaixo."
            />

            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs font-bold mb-2" style={{ color: "#7E9DB8" }}>
                  1. Instale as dependências
                </p>
                <CodeBlock language="bash" code={`pip install -r requirements.txt`} />
              </div>
              <div>
                <p className="text-xs font-bold mb-2" style={{ color: "#7E9DB8" }}>
                  2. Inicie o servidor Uvicorn
                </p>
                <CodeBlock
                  language="bash"
                  code={`uvicorn api:app --host 0.0.0.0 --port 8000`}
                />
              </div>
              <div
                className="flex items-start gap-3 p-4 rounded-xl text-sm"
                style={{ background: "#FFFFFF", border: "1px solid #D6E8F7" }}
              >
                <span className="text-lg flex-shrink-0">💡</span>
                <div style={{ color: "#2F4F68" }}>
                  A API estará disponível diretamente em{" "}
                  <code className="font-mono font-bold" style={{ color: "#005EB8" }}>http://localhost:8000</code>{" "}
                  ou pelo proxy do site em{" "}
                  <code className="font-mono font-bold" style={{ color: "#005EB8" }}>/api</code>.
                  Acesse{" "}
                  <code className="font-mono" style={{ color: "#005EB8" }}>/docs</code>{" "}
                  para a interface Swagger automática do FastAPI.
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── Docker ── */}
          <motion.section
            id="docker"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border p-8"
            style={{ background: "white", borderColor: "#D6E8F7", boxShadow: "0 2px 12px rgba(15,35,69,0.08)" }}
          >
            <SectionHeading
              icon={<Box className="w-5 h-5" style={{ color: "#005EB8" }} />}
              title="Rodando com Docker"
              description="Use a imagem oficial do Docker Hub para subir a API sem configurar o ambiente Python."
            />

            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs font-bold mb-2" style={{ color: "#7E9DB8" }}>
                  1. Suba o site integrado
                </p>
                <CodeBlock
                  language="bash"
                  code={`docker-compose up --build`}
                />
              </div>
              <div>
                <p className="text-xs font-bold mb-2" style={{ color: "#7E9DB8" }}>
                  2. Baixe apenas a imagem da API
                </p>
                <CodeBlock
                  language="bash"
                  code={`docker pull integracar/redeneuralbert:8.0`}
                />
              </div>
              <div>
                <p className="text-xs font-bold mb-2" style={{ color: "#7E9DB8" }}>
                  3. Execute apenas a API
                </p>
                <CodeBlock
                  language="bash"
                  code={`docker run -p 8000:8000 integracar/redeneuralbert:8.0`}
                />
              </div>
              <div
                className="flex items-start gap-3 p-4 rounded-xl text-sm"
                style={{ background: "#FFFFFF", border: "1px solid #D6E8F7" }}
              >
                <span className="text-lg flex-shrink-0">🐳</span>
                <div style={{ color: "#2F4F68" }}>
                  O container expõe a porta <code className="font-mono font-bold" style={{ color: "#005EB8" }}>8000</code>.
                  A imagem já inclui o modelo BERT treinado e todas as dependências.
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── About model ── */}
          <motion.section
            id="model"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border p-8"
            style={{ background: "white", borderColor: "#D6E8F7", boxShadow: "0 2px 12px rgba(15,35,69,0.08)" }}
          >
            <SectionHeading
              icon={<Cpu className="w-5 h-5" style={{ color: "#005EB8" }} />}
              title="Sobre o modelo"
              description="Detalhes técnicos da arquitetura e do treinamento do classificador."
            />

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Arquitetura",
                  value: "BERT (Bidirectional Encoder Representations from Transformers)",
                  color: "#005EB8",
                },
                {
                  label: "Língua base",
                  value: "Português (pt-BR) — modelo pré-treinado em corpus brasileiro",
                  color: "#005EB8",
                },
                {
                  label: "Tarefa",
                  value: "Classificação de sequência (sequence classification)",
                  color: "#005EB8",
                },
                {
                  label: "Framework",
                  value: "PyTorch + HuggingFace Transformers",
                  color: "#005EB8",
                },
                {
                  label: "Classes",
                  value: "Manual, Legislação (e outras categorias conforme o dataset)",
                  color: "#005EB8",
                },
                {
                  label: "Serving",
                  value: "FastAPI + Uvicorn para inferência assíncrona de alta performance",
                  color: "#005EB8",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl border"
                  style={{ background: "#FFFFFF", borderColor: "#D6E8F7" }}
                >
                  <p className="text-xs font-bold mb-1" style={{ color: "#7E9DB8" }}>{item.label}</p>
                  <p className="text-sm" style={{ color: "#102A43" }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* BERT visual */}
            <div
              className="mt-6 p-5 rounded-xl"
              style={{ background: "#081B33", border: "1px solid #183B5C" }}
            >
              <p className="text-xs font-bold mb-4 uppercase tracking-widest" style={{ color: "#FFFFFF" }}>
                Pipeline de inferência
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                {["Texto de entrada", "→", "Tokenizer BERT", "→", "Encoder BERT", "→", "Classificador Linear", "→", "Softmax", "→", "Classe + Confiança"].map(
                  (step, i) => (
                    <span
                      key={i}
                      className={step === "→" ? "" : "px-3 py-1.5 rounded-lg"}
                      style={
                        step === "→"
                          ? { color: "#FFFFFF" }
                          : { background: "rgba(255,255,255,0.12)", color: "#FFFFFF" }
                      }
                    >
                      {step}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.section>

          {/* ── Metrics ── */}
          <motion.section
            id="metrics"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border p-8"
            style={{ background: "white", borderColor: "#D6E8F7", boxShadow: "0 2px 12px rgba(15,35,69,0.08)" }}
          >
            <SectionHeading
              icon={<BarChart3 className="w-5 h-5" style={{ color: "#005EB8" }} />}
              title="Métricas de avaliação"
              description="Métricas utilizadas para medir a qualidade do modelo de classificação."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard
                title="Matriz de Confusão"
                description="Tabela que compara as classes previstas pelo modelo com as classes reais, revelando erros de classificação entre categorias."
                icon={<Layers className="w-4.5 h-4.5" style={{ color: "#005EB8" }} />}
                delay={0}
              />
              <MetricCard
                title="Precision"
                description="Proporção de predições positivas corretas em relação ao total de predições positivas. Mede a taxa de falsos positivos."
                icon={<Crosshair className="w-4.5 h-4.5" style={{ color: "#005EB8" }} />}
                delay={0.05}
              />
              <MetricCard
                title="Recall"
                description="Proporção de positivos reais identificados corretamente pelo modelo. Mede a capacidade de encontrar todos os casos relevantes."
                icon={<Activity className="w-4.5 h-4.5" style={{ color: "#005EB8" }} />}
                delay={0.1}
              />
              <MetricCard
                title="F1-Score"
                description="Média harmônica entre Precision e Recall. Balanceia os dois valores em uma única métrica de desempenho geral do modelo."
                icon={<BarChart3 className="w-4.5 h-4.5" style={{ color: "#005EB8" }} />}
                delay={0.15}
              />
              <MetricCard
                title="Support"
                description="Número de ocorrências reais de cada classe no conjunto de teste. Indica o equilíbrio (ou desbalanceamento) entre as classes."
                icon={<Cpu className="w-4.5 h-4.5" style={{ color: "#005EB8" }} />}
                delay={0.2}
              />
            </div>

            {/* Example metrics table */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7E9DB8" }}>
                Exemplo de relatório de classificação
              </p>
              <CodeBlock
                language="text — classification_report"
                code={`              precision    recall  f1-score   support

      Manual       0.96      0.94      0.95       142
  Legislação       0.93      0.95      0.94       138

    accuracy                           0.94       280
   macro avg       0.94      0.94      0.94       280
weighted avg       0.94      0.94      0.94       280`}
              />
            </div>
          </motion.section>

          {/* Back to classifier */}
          <div className="flex justify-center pb-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 border"
              style={{ color: "#005EB8", borderColor: "#005EB8", background: "white" }}
            >
              ← Voltar ao classificador
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
