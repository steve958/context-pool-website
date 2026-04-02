"use client";
export default function Footer() {
  const links = [
    { label: "Why Context Pool", href: "#why-context-pool" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Providers", href: "#providers" },
    { label: "Quick start", href: "#quickstart" },
    { label: "API", href: "#api" },
    { label: "Use cases", href: "#usecases" },
    { label: "FAQ", href: "#faq" },
    { label: "Benchmarks", href: "#benchmarks" },
    { label: "Roadmap", href: "https://github.com/steve958/Context-Pool/blob/main/ROADMAP.md" },
    { label: "Releases", href: "https://github.com/steve958/Context-Pool/releases" },
    { label: "GitHub", href: "https://github.com/steve958/Context-Pool" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
        padding: "48px 0 40px",
      }}
    >
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          {/* Logo */}
          <div style={{ textAlign: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/newlogo-transparent.png" alt="Context Pool" loading="lazy" style={{ height: 40, width: "auto", display: "inline-block", marginBottom: 10 }} />
            <div style={{ fontSize: 13, color: "var(--text-3)" }}>
              Self-hosted document Q&A without embeddings · Open source
            </div>
          </div>

          {/* Links */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", justifyContent: "center" }}>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  fontSize: 13,
                  color: "var(--text-3)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-2)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-3)")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* License */}
          <div style={{ fontSize: 12, color: "var(--text-3)" }}>
            Released under the MIT License · {new Date().getFullYear()} Context Pool contributors
          </div>
        </div>
      </div>
    </footer>
  );
}
