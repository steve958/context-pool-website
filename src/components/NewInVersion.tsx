"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionLabel, SectionTitle, SectionSub } from "./HowItWorks";
import { useIsMobile } from "../hooks/useIsMobile";

// ── Data ─────────────────────────────────────────────────────────────────────

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  highlights: string[];
  learnMore?: string;
  docsLink?: string;
}

interface VersionRelease {
  version: string;
  date: string;
  isLatest: boolean;
  features: Feature[];
}

const releases: VersionRelease[] = [
  {
    version: "1.3.0",
    date: "March 2026",
    isLatest: true,
    features: [
      {
        id: "query-history",
        icon: "💾",
        title: "Query History & Persistence",
        description:
          "Every query you run is now automatically saved to disk. Review past questions, compare results over time, and re-run with a single click.",
        highlights: [
          "Automatic persistence with gzip compression (~80% savings)",
          "Browse complete query history per workspace",
          "Re-run any historical query against current documents",
          "Full detail view with citations and token usage",
        ],
      },
    ],
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function FeatureCard({ feature, isMobile }: { feature: Feature; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg)",
        border: `1px solid ${hovered ? "rgba(124,106,247,0.4)" : "var(--border)"}`,
        borderRadius: 12,
        padding: isMobile ? "24px 20px" : "28px 28px",
        transition: "border-color 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,106,247,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div
          style={{
            fontSize: 24,
            flexShrink: 0,
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(124,106,247,0.10)",
            borderRadius: 10,
          }}
        >
          {feature.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: 8,
              letterSpacing: "-0.02em",
            }}
          >
            {feature.title}
          </h3>
          <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 16 }}>
            {feature.description}
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {feature.highlights.map((h, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "var(--text-2)" }}>
                <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 1 }}>•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {(feature.learnMore || feature.docsLink) && (
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {feature.learnMore && (
                <Link
                  href={feature.learnMore}
                  style={{ fontSize: 13.5, fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}
                >
                  Learn more ↗
                </Link>
              )}
              {feature.docsLink && (
                <Link
                  href={feature.docsLink}
                  style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-2)", textDecoration: "none" }}
                >
                  Documentation
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function NewInVersion() {
  const isMobile = useIsMobile();
  const latest = releases.find((r) => r.isLatest);
  const previous = releases.filter((r) => !r.isLatest);

  return (
    <section id="new-in-version" style={{ padding: isMobile ? "64px 0" : "100px 0", background: "var(--surface)" }}>
      <div className="container">
        <SectionLabel>What&apos;s New</SectionLabel>

        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <SectionTitle>New in Context Pool</SectionTitle>
          {latest && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 20,
                background: "rgba(124,106,247,0.12)",
                color: "var(--accent)",
                border: "1px solid rgba(124,106,247,0.25)",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                marginBottom: 16,
              }}
            >
              v{latest.version} · {latest.date}
            </span>
          )}
        </div>

        <SectionSub>
          Stay up to date with the latest features and improvements. Every release makes document analysis more powerful.
        </SectionSub>

        {/* Latest release feature cards */}
        {latest && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: latest.features.length === 1 ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
              marginTop: 48,
              maxWidth: latest.features.length === 1 ? 640 : "100%",
            }}
          >
            {latest.features.map((f) => (
              <FeatureCard key={f.id} feature={f} isMobile={isMobile} />
            ))}
          </div>
        )}

        {/* Previous releases */}
        {previous.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--text-3)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Previous Releases
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {previous.map((r) => (
                <PreviousRelease key={r.version} release={r} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function PreviousRelease({ release }: { release: VersionRelease }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: "var(--bg)",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontWeight: 700, color: "var(--text)", fontSize: 15 }}>v{release.version}</span>
          <span style={{ fontSize: 13, color: "var(--text-3)" }}>{release.date}</span>
          <span style={{ fontSize: 12, color: "var(--text-3)" }}>
            {release.features.length} feature{release.features.length !== 1 ? "s" : ""}
          </span>
        </div>
        <span style={{ fontSize: 11, color: "var(--text-3)" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 16 }}>
            {release.features.map((f) => (
              <FeatureCard key={f.id} feature={f} isMobile={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
