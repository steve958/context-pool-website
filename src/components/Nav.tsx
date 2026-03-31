"use client";
import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  const links = [
    { label: "Why Context Pool", href: "#why-context-pool" },
    { label: "How it works", href: "#how-it-works" },
    {
      label: "New",
      href: "#new-in-version",
      badge: "v1.3.0"  // Update this with each release
    },
    { label: "Features", href: "#features" },
    { label: "Quick start", href: "#quickstart" },
    { label: "API", href: "#api" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleLink = () => setMenuOpen(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.3s, border-color 0.3s",
          background: scrolled || menuOpen ? "rgba(8,8,16,0.96)" : "transparent",
          borderBottom: scrolled || menuOpen ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", height: 64, gap: 16 }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/notextlogo-transparent.png" alt="Context Pool" style={{ display: "block", height: 36, width: "auto" }} />
          </a>

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display: "flex", gap: 4, marginLeft: "auto", alignItems: "center" }}>
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    color: "var(--text-2)",
                    textDecoration: "none",
                    fontSize: 14,
                    padding: "6px 12px",
                    borderRadius: 6,
                    transition: "color 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
                >
                  {l.label}
                  {l.badge && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "2px 6px",
                        borderRadius: 4,
                        background: "var(--accent)",
                        color: "white",
                      }}
                    >
                      {l.badge}
                    </span>
                  )}
                </a>
              ))}
              <a
                href="https://github.com/steve958/Context-Pool"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginLeft: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  background: "var(--surface-3)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "7px 14px",
                  color: "var(--text)",
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <GitHubIcon />
                GitHub
              </a>
            </div>
          )}

          {/* Hamburger (mobile only) */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                color: "var(--text)",
                display: "flex",
                flexDirection: "column",
                gap: 5,
                alignItems: "flex-end",
              }}
            >
              <span style={{
                display: "block", width: 22, height: 2, background: "currentColor", borderRadius: 2,
                transition: "transform 0.2s, opacity 0.2s",
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }} />
              <span style={{
                display: "block", width: 16, height: 2, background: "currentColor", borderRadius: 2,
                opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s",
              }} />
              <span style={{
                display: "block", width: 22, height: 2, background: "currentColor", borderRadius: 2,
                transition: "transform 0.2s, opacity 0.2s",
                transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }} />
            </button>
          )}
        </div>

        {/* Mobile dropdown */}
        {isMobile && menuOpen && (
          <div
            style={{
              borderTop: "1px solid var(--border)",
              padding: "16px 0 24px",
            }}
          >
            <div className="container" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={handleLink}
                  style={{
                    color: "var(--text-2)",
                    textDecoration: "none",
                    fontSize: 16,
                    padding: "12px 4px",
                    borderBottom: "1px solid var(--border)",
                    transition: "color 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {l.label}
                  {l.badge && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 4,
                        background: "var(--accent)",
                        color: "white",
                      }}
                    >
                      {l.badge}
                    </span>
                  )}
                </a>
              ))}
              <a
                href="https://github.com/steve958/Context-Pool"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLink}
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "var(--surface-3)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "12px 20px",
                  color: "var(--text)",
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                <GitHubIcon />
                View on GitHub
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
