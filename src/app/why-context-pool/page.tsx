import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Context Pool? — Exhaustive Document Q&A Without Embeddings",
  description:
    "Understand why Context Pool uses exhaustive chunk scanning instead of vector similarity search. See the comparison: legal contract analysis case study.",
};

export default function WhyContextPoolPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero Section */}
        <section
          style={{
            padding: "80px 0 64px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="container-sm" style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(124,106,247,0.08)",
                border: "1px solid rgba(124,106,247,0.2)",
                borderRadius: 100,
                padding: "6px 16px",
                marginBottom: 24,
              }}
            >
              <span style={{ fontSize: 13, color: "var(--primary)", fontWeight: 500 }}>
                The Problem with Vector RAG
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              Why Context Pool?
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "var(--text-2)",
                maxWidth: 640,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Vector RAG prefilters chunks by similarity, silently dropping low-scoring 
              passages. Context Pool reads every chunk. The difference matters when 
              missing one clause is expensive.
            </p>
          </div>
        </section>

        {/* Core Concept */}
        <section style={{ padding: "64px 0" }}>
          <div className="container-sm">
            <h2
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 700,
                marginBottom: 32,
                letterSpacing: "-0.02em",
              }}
            >
              The Prefiltering Problem
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
                marginBottom: 48,
              }}
            >
              {/* Vector RAG Card */}
              <div
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#ef4444",
                    marginBottom: 12,
                  }}
                >
                  Vector RAG Flow
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-2)" }}>
                  <div style={{ marginBottom: 8 }}>1. Convert query to embedding</div>
                  <div style={{ marginBottom: 8 }}>2. Score all chunks by similarity</div>
                  <div style={{ marginBottom: 8 }}>3. Keep top-K chunks only</div>
                  <div style={{ marginBottom: 8 }}>
                    4. <strong style={{ color: "#ef4444" }}>Drop low-scoring chunks</strong>
                  </div>
                  <div>5. Send filtered set to LLM</div>
                </div>
                <div
                  style={{
                    marginTop: 16,
                    padding: 12,
                    background: "rgba(239,68,68,0.06)",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#f87171",
                  }}
                >
                  <strong>The risk:</strong> Critical passages that use different 
                  terminology score low and are silently excluded.
                </div>
              </div>

              {/* Context Pool Card */}
              <div
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#22c55e",
                    marginBottom: 12,
                  }}
                >
                  Context Pool Flow
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-2)" }}>
                  <div style={{ marginBottom: 8 }}>1. Parse documents to chunks</div>
                  <div style={{ marginBottom: 8 }}>2. Read chunk 1 → ask LLM</div>
                  <div style={{ marginBottom: 8 }}>3. Read chunk 2 → ask LLM</div>
                  <div style={{ marginBottom: 8 }}>4. ... read every chunk</div>
                  <div style={{ marginBottom: 8 }}>
                    5. <strong style={{ color: "#22c55e" }}>Pool all positive hits</strong>
                  </div>
                  <div>6. Synthesize final answer with citations</div>
                </div>
                <div
                  style={{
                    marginTop: 16,
                    padding: 12,
                    background: "rgba(34,197,94,0.06)",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#4ade80",
                  }}
                >
                  <strong>The guarantee:</strong> If the answer exists in the document, 
                  it will be found. No silent omissions.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section
          style={{
            padding: "64px 0",
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="container-sm">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(124,106,247,0.08)",
                border: "1px solid rgba(124,106,247,0.2)",
                borderRadius: 100,
                padding: "5px 14px",
                marginBottom: 20,
              }}
            >
              <span style={{ fontSize: 13, color: "var(--primary)", fontWeight: 500 }}>
                Real-World Case Study
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 700,
                marginBottom: 16,
                letterSpacing: "-0.02em",
              }}
            >
              Legal Contract Analysis: Buried Indemnification Clause
            </h2>

            <p
              style={{
                fontSize: 16,
                color: "var(--text-2)",
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              A 47-page Master Services Agreement needs review. The question: 
              <em>&quot;Does this contract limit our liability for data breaches?&quot;</em>
            </p>

            {/* Comparison Table */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 20,
                marginBottom: 40,
              }}
            >
              {/* Vector RAG Result */}
              <div
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    background: "rgba(239,68,68,0.08)",
                    borderBottom: "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#ef4444",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Vector RAG Result
                  </span>
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-3)",
                        marginBottom: 6,
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      Retrieved (Top 5 of 47)
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>
                      <div>§3.1 — Services overview (score: 0.91)</div>
                      <div>§7.2 — Payment terms (score: 0.88)</div>
                      <div>§12.4 — Governing law (score: 0.85)</div>
                      <div>§2.1 — Scope of engagement (score: 0.82)</div>
                      <div>§9.1 — Confidentiality (score: 0.79)</div>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: 12,
                      background: "rgba(239,68,68,0.06)",
                      borderRadius: 8,
                      borderLeft: "3px solid #ef4444",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#ef4444",
                        marginBottom: 4,
                      }}
                    >
                      Answer: Wrong
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-2)" }}>
                      &quot;Based on the retrieved sections, the contract does not appear 
                      to contain explicit liability limits for data breaches.&quot;
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      padding: 10,
                      background: "rgba(239,68,68,0.04)",
                      borderRadius: 6,
                      fontSize: 12,
                      color: "#f87171",
                    }}
                  >
                    <strong>Missed:</strong> §18.3 scored 0.41 — below threshold. 
                    Key clause never seen by LLM.
                  </div>
                </div>
              </div>

              {/* Context Pool Result */}
              <div
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    background: "rgba(34,197,94,0.08)",
                    borderBottom: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#22c55e",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Context Pool Result
                  </span>
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-3)",
                        marginBottom: 6,
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      Scan Results (47/47 chunks)
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>
                      <div style={{ color: "#4ade80" }}>✓ §18.3 — Liability cap</div>
                      <div style={{ color: "#4ade80" }}>✓ §19.1 — Force majeure</div>
                      <div style={{ color: "#4ade80" }}>✓ §21.2 — Indemnification</div>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: 12,
                      background: "rgba(34,197,94,0.06)",
                      borderRadius: 8,
                      borderLeft: "3px solid #22c55e",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#22c55e",
                        marginBottom: 4,
                      }}
                    >
                      Answer: Correct with Citation
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-2)" }}>
                      &quot;Yes. §18.3 explicitly caps liability for data breach damages.&quot;
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      padding: 10,
                      background: "rgba(34,197,94,0.04)",
                      borderRadius: 6,
                      fontSize: 12,
                      color: "#4ade80",
                      fontStyle: "italic",
                    }}
                  >
                    &quot;In no event shall either party be liable for indirect, 
                    incidental, or consequential damages arising from data loss...&quot;
                  </div>
                </div>
              </div>
            </div>

            {/* Why Section 18.3 Was Missed */}
            <div
              style={{
                background: "rgba(124,106,247,0.04)",
                border: "1px solid rgba(124,106,247,0.15)",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 16,
                  color: "var(--text)",
                }}
              >
                Why Vector RAG Missed the Critical Clause
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 20,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-3)",
                      marginBottom: 8,
                      textTransform: "uppercase",
                    }}
                  >
                    Query Keywords
                  </div>
                  <div style={{ fontSize: 14, color: "var(--text)" }}>
                    &quot;limit&quot;, &quot;liability&quot;, &quot;data breaches&quot;
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-3)",
                      marginBottom: 8,
                      textTransform: "uppercase",
                    }}
                  >
                    Actual Text in §18.3
                  </div>
                  <div style={{ fontSize: 14, color: "var(--text)" }}>
                    &quot;In no event shall... be liable for indirect... damages 
                    arising from... security breaches&quot;
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-3)",
                      marginBottom: 8,
                      textTransform: "uppercase",
                    }}
                  >
                    The Gap
                  </div>
                  <div style={{ fontSize: 14, color: "var(--text)" }}>
                    Embedding model failed to equate &quot;security breaches&quot; 
                    with &quot;data breaches&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When This Matters */}
        <section style={{ padding: "64px 0" }}>
          <div className="container-sm">
            <h2
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 700,
                marginBottom: 32,
                letterSpacing: "-0.02em",
              }}
            >
              When Missing One Passage Is Expensive
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 20,
              }}
            >
              {[
                {
                  domain: "Legal",
                  query: "What&apos;s the termination notice period?",
                  issue:
                    "Answer in §14.3(c), not §8 (Termination). Cross-references hide key terms.",
                },
                {
                  domain: "Compliance",
                  query: "Is user consent required for analytics?",
                  issue:
                    'Mentioned in §9.4 (Audit Rights), not §5 (Privacy Policy).',
                },
                {
                  domain: "Finance",
                  query: "What&apos;s our exposure if the vendor fails?",
                  issue:
                    "Liability cap in §23, penalty schedule in §7.2. Scattered across document.",
                },
                {
                  domain: "Medical",
                  query: "What are the contraindications?",
                  issue:
                    'Warning embedded in dosage table, not in Warnings section.',
                },
                {
                  domain: "Technical",
                  query: "What&apos;s the maximum load capacity?",
                  issue:
                    "Spec in appendix table, not in Specifications section.",
                },
                {
                  domain: "Due Diligence",
                  query: "Are there any change-of-control provisions?",
                  issue:
                    'Clause in §16.7, worded as "assignment restrictions."',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--primary)",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.domain}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: 8,
                    }}
                  >
                    {item.query}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>
                    {item.issue}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Tradeoff */}
        <section
          style={{
            padding: "64px 0",
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="container-sm">
            <h2
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 700,
                marginBottom: 24,
                letterSpacing: "-0.02em",
              }}
            >
              The Deliberate Tradeoff
            </h2>

            <div
              style={{
                overflowX: "auto",
                marginBottom: 32,
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border)" }}>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontWeight: 600,
                        color: "var(--text-3)",
                      }}
                    >
                      Factor
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontWeight: 600,
                        color: "#ef4444",
                      }}
                    >
                      Vector RAG
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        fontWeight: 600,
                        color: "#22c55e",
                      }}
                    >
                      Context Pool
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { factor: "Speed", rag: "~1 second", pool: "~10 seconds" },
                    { factor: "Token cost", rag: "Low (~2K)", pool: "Higher (~15K)" },
                    { factor: "Chunks examined", rag: "Top-K only", pool: "100%" },
                    { factor: "Recall guarantee", rag: "None", pool: "100%" },
                    { factor: "Failure mode", rag: "Silent omission", pool: "None" },
                    { factor: "Best for", rag: "Exploration, low-stakes", pool: "Critical analysis" },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td
                        style={{
                          padding: "12px 16px",
                          color: "var(--text-2)",
                        }}
                      >
                        {row.factor}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          color: "var(--text)",
                        }}
                      >
                        {row.rag}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          color: "var(--text)",
                        }}
                      >
                        {row.pool}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              style={{
                background: "rgba(124,106,247,0.06)",
                border: "1px solid rgba(124,106,247,0.18)",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <span style={{ fontSize: 24 }}>💡</span>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      marginBottom: 8,
                      color: "var(--text)",
                    }}
                  >
                    The Core Philosophy
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      color: "var(--text-2)",
                      lineHeight: 1.7,
                    }}
                  >
                    Context Pool is slower because it reads every chunk. In domains 
                    where missing a single passage is unacceptable — legal, compliance, 
                    finance, medical — that slowness is the point. You get exhaustive 
                    recall, not probabilistic retrieval.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When to Use Each */}
        <section style={{ padding: "64px 0" }}>
          <div className="container-sm">
            <h2
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 700,
                marginBottom: 32,
                letterSpacing: "-0.02em",
              }}
            >
              When to Use Each Approach
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              <div
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#ef4444",
                    marginBottom: 16,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Use Vector RAG For
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    fontSize: 14,
                    color: "var(--text-2)",
                    lineHeight: 2,
                  }}
                >
                  <li>• Finding related documents in a large corpus</li>
                  <li>• Initial exploration and discovery</li>
                  <li>• Low-stakes research questions</li>
                  <li>• When speed matters more than completeness</li>
                  <li>• Open-ended browsing ("what&apos;s in here?")</li>
                </ul>
              </div>

              <div
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#22c55e",
                    marginBottom: 16,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Use Context Pool For
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    fontSize: 14,
                    color: "var(--text-2)",
                    lineHeight: 2,
                  }}
                >
                  <li>• Contract review and due diligence</li>
                  <li>• Compliance audits and regulatory review</li>
                  <li>• Legal analysis where misses are costly</li>
                  <li>• When you need verifiable citations</li>
                  <li>• Any question where the answer must be found</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: "80px 0",
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="container-sm" style={{ textAlign: "center" }}>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              Try the Comparison Yourself
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "var(--text-2)",
                maxWidth: 560,
                margin: "0 auto 32px",
                lineHeight: 1.7,
              }}
            >
              Run Context Pool locally and test it against your own documents. 
              See the difference exhaustive scanning makes.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/#quickstart"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  background: "var(--primary)",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 10,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                Get Started
                <span>→</span>
              </Link>
              <Link
                href="https://github.com/steve958/Context-Pool/tree/main/examples"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  background: "transparent",
                  color: "var(--text)",
                  fontWeight: 600,
                  borderRadius: 10,
                  fontSize: 15,
                  textDecoration: "none",
                  border: "1px solid var(--border)",
                }}
              >
                View Case Study
                <span>↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
