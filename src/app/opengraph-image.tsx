import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-static";
export const alt = "Context Pool — Document Q&A Without Embeddings";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = readFileSync(join(process.cwd(), "public/newlogo-transparent.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080810",
          backgroundImage:
            "radial-gradient(ellipse at 50% 45%, rgba(124,106,247,0.22) 0%, transparent 58%)",
          padding: "60px 80px",
        }}
      >
        {/* Logo */}
        <img
          src={logoSrc}
          style={{ height: 150, marginBottom: 36 }}
        />

        {/* Headline */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 800,
            color: "#f0f0fc",
            textAlign: "center",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginBottom: 20,
            display: "flex",
          }}
        >
          Document Q&A without embeddings
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 26,
            color: "#a0a0c0",
            textAlign: "center",
            lineHeight: 1.5,
            marginBottom: 44,
            display: "flex",
          }}
        >
          Every chunk checked. Every answer cited. Self-hosted & open source.
        </div>

        {/* Domain badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(124,106,247,0.14)",
            border: "1px solid rgba(124,106,247,0.35)",
            borderRadius: 100,
            padding: "10px 24px",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#34d399",
              display: "flex",
            }}
          />
          <span style={{ fontSize: 20, color: "#a78bfa", fontWeight: 500 }}>
            contextpool.dev
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
