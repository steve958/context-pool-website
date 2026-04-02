"use client";
import { useIsMobile } from "../hooks/useIsMobile";

export default function ArchitectureDiagram() {
  const isMobile = useIsMobile();

  const stages = [
    {
      icon: "📄",
      title: "Documents",
      items: ["PDF", "DOCX", "EML", "HTML", "Images"],
      color: "#60a5fa",
    },
    {
      icon: "⚙️",
      title: "Parse",
      items: ["Text extraction", "OCR", "Normalization"],
      color: "#a78bfa",
    },
    {
      icon: "🧩",
      title: "Chunk",
      items: ["Heading-aware split", "Token windows"],
      color: "#f472b6",
    },
    {
      icon: "🔍",
      title: "Scan",
      items: ["LLM per chunk", "Hit detection", "Pool building"],
      color: "#22c55e",
    },
    {
      icon: "📝",
      title: "Synthesize",
      items: ["Evidence pooling", "Cited answer"],
      color: "#14b8a6",
    },
  ];

  return (
    <div
      style={{
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: isMobile ? "24px 16px" : "32px",
        overflow: "hidden",
      }}
    >
      {/* Desktop: Horizontal Flow */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          {stages.map((stage, i) => (
            <div key={i} style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
              {/* Stage Card */}
              <div
                style={{
                  flex: 1,
                  minWidth: 140,
                  maxWidth: 180,
                  background: "var(--surface)",
                  border: `1px solid ${stage.color}40`,
                  borderRadius: 12,
                  padding: "20px 16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    marginBottom: 12,
                  }}
                >
                  {stage.icon}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: stage.color,
                    marginBottom: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {stage.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  {stage.items.map((item, j) => (
                    <div
                      key={j}
                      style={{
                        fontSize: 12,
                        color: "var(--text-2)",
                        lineHeight: 1.4,
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              {i < stages.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "var(--text-3)",
                    fontSize: 20,
                  }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Mobile: Vertical Flow */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {stages.map((stage, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Stage Card */}
              <div
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${stage.color}40`,
                  borderRadius: 12,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div style={{ fontSize: 24 }}>{stage.icon}</div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: stage.color,
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {stage.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px 12px",
                    }}
                  >
                    {stage.items.map((item, j) => (
                      <span
                        key={j}
                        style={{
                          fontSize: 12,
                          color: "var(--text-2)",
                        }}
                      >
                        {item}
                        {j < stage.items.length - 1 && (
                          <span style={{ marginLeft: 12, color: "var(--border)" }}>•</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              {i < stages.length - 1 && (
                <div
                  style={{
                    textAlign: "center",
                    color: "var(--text-3)",
                    fontSize: 16,
                    padding: "4px 0",
                  }}
                >
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Data Flow Annotation */}
      <div
        style={{
          marginTop: 24,
          padding: "16px 20px",
          background: "rgba(124,106,247,0.04)",
          borderRadius: 10,
          border: "1px solid rgba(124,106,247,0.12)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 16 }}>💡</span>
        <span style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--text)" }}>The key difference:</strong>{" "}
          Every chunk is checked individually. No semantic prefiltering. The LLM sees
          every segment of the document before synthesizing the final answer.
        </span>
      </div>
    </div>
  );
}
