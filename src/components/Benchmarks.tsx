"use client";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Benchmarks() {
  const isMobile = useIsMobile();

  return (
    <section
      id="benchmarks"
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
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 13, color: "#4ade80", fontWeight: 500 }}>
              Reproducible results
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
            Benchmarks
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
            We measured Context Pool against vector RAG baselines on a synthetic
            legal contract dataset. The results confirm what the architecture
            predicts: exhaustive scanning finds answers that similarity
            prefiltering misses.
          </p>
        </div>

        {/* Results Table */}
        <div
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              background: "var(--surface-3)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 20 }}>📊</span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Recall Benchmark Results
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "16px 24px",
                      fontWeight: 600,
                      color: "var(--text-3)",
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Method
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "16px 24px",
                      fontWeight: 600,
                      color: "var(--text-3)",
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Recall
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "16px 24px",
                      fontWeight: 600,
                      color: "var(--text-3)",
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Chunks Examined
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "16px 24px",
                      fontWeight: 600,
                      color: "var(--text-3)",
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Est. Tokens
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td
                    style={{
                      padding: "16px 24px",
                      color: "var(--text)",
                      fontWeight: 600,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#22c55e",
                        }}
                      />
                      Context Pool (exhaustive)
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      textAlign: "center",
                      color: "#22c55e",
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    100%
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      textAlign: "center",
                      color: "var(--text-2)",
                    }}
                  >
                    19 / 19
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      textAlign: "center",
                      color: "var(--text-2)",
                    }}
                  >
                    ~116K
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "16px 24px",
                      color: "var(--text)",
                      fontWeight: 600,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#ef4444",
                        }}
                      />
                      Vector RAG (top-5)
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      textAlign: "center",
                      color: "#ef4444",
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    70%
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      textAlign: "center",
                      color: "var(--text-2)",
                    }}
                  >
                    5 / 19
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      textAlign: "center",
                      color: "var(--text-2)",
                    }}
                  >
                    ~10K
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Findings */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: 20,
            marginBottom: 32,
          }}
        >
          {[
            {
              icon: "✓",
              color: "#22c55e",
              title: "100% Recall",
              description:
                "Context Pool examines every chunk. By design, it cannot miss an answer that exists in the document.",
            },
            {
              icon: "⚠",
              color: "#f59e0b",
              title: "Prefiltering Risk",
              description:
                "Vector RAG missed 3 of 10 answers due to keyword mismatches and similarity scoring thresholds.",
            },
            {
              icon: "⚖",
              color: "var(--primary)",
              title: "The Tradeoff",
              description:
                "Speed vs. certainty. Vector RAG is faster and cheaper. Context Pool is exhaustive.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: 24,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  marginBottom: 12,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 8,
                  color: "var(--text)",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "var(--text-2)",
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            background: "rgba(124,106,247,0.04)",
            border: "1px solid rgba(124,106,247,0.15)",
            borderRadius: 10,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 14, color: "var(--text-2)" }}>
            Run the benchmark yourself on your own documents.
          </div>
          <a
            href="https://github.com/steve958/Context-Pool/blob/main/BENCHMARKS.md"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--text)",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            View Full Report
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
