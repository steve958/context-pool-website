"use client";
import { useIsMobile } from "../hooks/useIsMobile";

export default function WhyNotVectorRAG() {
  const isMobile = useIsMobile();

  return (
    <section
      id="why-context-pool"
      style={{
        padding: isMobile ? "64px 0" : "96px 0",
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div className="container-sm">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 13, color: "#f87171", fontWeight: 500 }}>
              The problem with prefiltering
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: 16,
              lineHeight: 1.15,
            }}
          >
            Why not vector RAG?
          </h2>
          <p
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              color: "var(--text-2)",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Vector RAG prefilters chunks by similarity score before your LLM
            ever sees them. If the relevant passage scores low, it's silently
            dropped. Context Pool never prefilters — it reads every chunk.
          </p>
        </div>

        {/* Scenario label */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 24,
            fontSize: 13,
            color: "var(--text-3)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Scenario: Legal contract — buried indemnification clause
        </div>

        {/* Side-by-side comparison */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 20 : 24,
            marginBottom: 48,
          }}
        >
          {/* Left: Vector RAG */}
          <ComparisonPanel
            label="Standard Vector RAG"
            labelColor="#ef4444"
            labelBg="rgba(239,68,68,0.08)"
            labelBorder="rgba(239,68,68,0.2)"
            question="Does this contract limit our liability for data breaches?"
            steps={[
              {
                icon: "⚡",
                title: "Similarity prefilter",
                body: "Embedding model scores all 47 chunks. Top-5 retrieved by cosine similarity.",
              },
              {
                icon: "📄",
                title: "Retrieved chunks (top-5)",
                body: null,
                chunks: [
                  { score: "0.91", text: "§3.1 — Services overview and delivery timeline", miss: false },
                  { score: "0.88", text: "§7.2 — Payment terms and invoice schedule", miss: false },
                  { score: "0.85", text: "§12.4 — Governing law and jurisdiction", miss: false },
                  { score: "0.82", text: "§2.1 — Scope of engagement and deliverables", miss: false },
                  { score: "0.79", text: "§9.1 — Confidentiality obligations", miss: false },
                ],
              },
              {
                icon: "⚠️",
                title: "Missed (score: 0.41)",
                body: null,
                missed: "§18.3 — Liability cap: In no event shall either party be liable for indirect, incidental, or consequential damages arising from data loss or security breaches, including but not limited to…",
              },
            ]}
            answer={{
              text: "Based on the retrieved sections, the contract does not appear to contain explicit liability limits for data breaches.",
              verdict: "miss",
              verdictLabel: "Wrong — key clause missed",
            }}
          />

          {/* Right: Context Pool */}
          <ComparisonPanel
            label="Context Pool"
            labelColor="#22c55e"
            labelBg="rgba(34,197,94,0.08)"
            labelBorder="rgba(34,197,94,0.2)"
            question="Does this contract limit our liability for data breaches?"
            steps={[
              {
                icon: "🔍",
                title: "Exhaustive scan",
                body: "Reads all 47 chunks sequentially. No prefiltering. No chunk is skipped.",
              },
              {
                icon: "✅",
                title: "Positive hit found",
                body: null,
                hit: {
                  chunk: "§18.3",
                  text: "§18.3 — Liability cap: In no event shall either party be liable for indirect, incidental, or consequential damages arising from data loss or security breaches, including but not limited to…",
                },
              },
              {
                icon: "🗂️",
                title: "Pooled with 2 other hits",
                body: "§18.3, §19.1 (force majeure carve-out), §21.2 (mutual indemnification) — synthesized together.",
              },
            ]}
            answer={{
              text: "Yes. §18.3 explicitly caps liability for data breach damages. Confirmed by cross-reference in §19.1 and §21.2.",
              quote: "§18.3 — "In no event shall either party be liable for indirect, incidental, or consequential damages arising from data loss or security breaches…"",
              verdict: "hit",
              verdictLabel: "Correct — with verbatim citation",
            }}
          />
        </div>

        {/* Takeaway bar */}
        <div
          style={{
            background: "rgba(124,106,247,0.06)",
            border: "1px solid rgba(124,106,247,0.18)",
            borderRadius: 12,
            padding: isMobile ? "20px 20px" : "24px 32px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 28, flexShrink: 0 }}>💡</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
              The tradeoff is deliberate
            </div>
            <div style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>
              Context Pool is slower than vector RAG because it reads every chunk. In domains where missing a single passage is unacceptable —
              legal, compliance, finance, medical — that slowness is the point. You get exhaustive recall, not probabilistic retrieval.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Step = {
  icon: string;
  title: string;
  body: string | null;
  chunks?: { score: string; text: string; miss: boolean }[];
  missed?: string;
  hit?: { chunk: string; text: string };
};

type AnswerBlock = {
  text: string;
  quote?: string;
  verdict: "hit" | "miss";
  verdictLabel: string;
};

function ComparisonPanel({
  label,
  labelColor,
  labelBg,
  labelBorder,
  question,
  steps,
  answer,
}: {
  label: string;
  labelColor: string;
  labelBg: string;
  labelBorder: string;
  question: string;
  steps: Step[];
  answer: AnswerBlock;
}) {
  return (
    <div
      style={{
        background: "var(--surface-2)",
        border: `1px solid var(--border)`,
        borderRadius: 14,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Panel header */}
      <div
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "var(--surface-3)",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 100,
            background: labelBg,
            border: `1px solid ${labelBorder}`,
            color: labelColor,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>

      {/* Question */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Query
        </div>
        <div style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5, fontStyle: "italic" }}>
          "{question}"
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
        {steps.map((step, i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>{step.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {step.title}
              </span>
            </div>
            {step.body && (
              <div style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.6, paddingLeft: 22 }}>
                {step.body}
              </div>
            )}
            {step.chunks && (
              <div style={{ paddingLeft: 22, display: "flex", flexDirection: "column", gap: 4 }}>
                {step.chunks.map((c, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 10, color: "var(--text-3)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>
                      {c.score}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--text-3)" }}>{c.text}</span>
                  </div>
                ))}
              </div>
            )}
            {step.missed && (
              <div
                style={{
                  marginLeft: 22,
                  padding: "8px 12px",
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.18)",
                  borderRadius: 6,
                  fontSize: 11,
                  color: "#f87171",
                  lineHeight: 1.6,
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ flexShrink: 0 }}>✗</span>
                <span>{step.missed}</span>
              </div>
            )}
            {step.hit && (
              <div
                style={{
                  marginLeft: 22,
                  padding: "8px 12px",
                  background: "rgba(34,197,94,0.06)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: 6,
                  fontSize: 11,
                  color: "#4ade80",
                  lineHeight: 1.6,
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ flexShrink: 0 }}>✓</span>
                <span>{step.hit.text}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Answer block */}
      <div
        style={{
          margin: "0 20px 20px",
          padding: "14px 16px",
          background: answer.verdict === "hit" ? "rgba(34,197,94,0.06)" : "rgba(239,68,68,0.06)",
          border: `1px solid ${answer.verdict === "hit" ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
          borderRadius: 10,
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, color: answer.verdict === "hit" ? "#4ade80" : "#f87171" }}>
          {answer.verdictLabel}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.6, marginBottom: answer.quote ? 10 : 0 }}>
          {answer.text}
        </div>
        {answer.quote && (
          <div
            style={{
              fontSize: 11,
              color: "var(--text-3)",
              fontStyle: "italic",
              borderLeft: "2px solid rgba(34,197,94,0.4)",
              paddingLeft: 10,
              lineHeight: 1.6,
            }}
          >
            {answer.quote}
          </div>
        )}
      </div>
    </div>
  );
}
