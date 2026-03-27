"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ExternalLink, BookOpen } from "lucide-react";

// ============================================================================
// Feature Data - ADD NEW FEATURES HERE
// ============================================================================

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
        learnMore: "/features/query-history",
        docsLink: "/docs/query-history",
      },
    ],
  },
  // Template for adding new versions:
  // {
  //   version: "1.5.0",
  //   date: "April 2026",
  //   isLatest: true,  // Make sure to set others to false
  //   features: [
  //     {
  //       id: "feature-id",
  //       icon: "🚀",
  //       title: "Feature Name",
  //       description: "What it does...",
  //       highlights: ["Benefit 1", "Benefit 2"],
  //       docsLink: "/docs/feature"
  //     }
  //   ]
  // }
];

// ============================================================================
// Components
// ============================================================================

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] p-6 transition-all hover:border-[var(--accent)]/50 hover:shadow-lg hover:shadow-[var(--accent)]/5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-2xl">
          {feature.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
            {feature.title}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
            {feature.description}
          </p>
          
          <ul className="space-y-2 mb-4">
            {feature.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--accent)] mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            {feature.learnMore && (
              <Link
                href={feature.learnMore}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
              >
                Learn more
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            )}
            {feature.docsLink && (
              <Link
                href={feature.docsLink}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Documentation
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function VersionSection({ release }: { release: VersionRelease }) {
  const [isExpanded, setIsExpanded] = useState(release.isLatest);

  return (
    <div className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--surface)]">
      {/* Version Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-[var(--surface-raised)]/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[var(--accent)]">
              v{release.version}
            </span>
            {release.isLatest && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                Latest
              </span>
            )}
          </div>
          <span className="text-[var(--text-muted)] text-sm">{release.date}</span>
        </div>
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <span className="text-sm">
            {release.features.length} feature{release.features.length !== 1 ? "s" : ""}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </button>

      {/* Features Grid */}
      {isExpanded && (
        <div className="p-6 pt-0 border-t border-[var(--border)]">
          <div className="pt-6 grid gap-4 md:grid-cols-2">
            {release.features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export default function NewInVersion() {
  const latestRelease = releases.find((r) => r.isLatest);
  const previousReleases = releases.filter((r) => !r.isLatest);

  return (
    <section id="new-in-version" className="py-20 bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
            <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wide">
              What&apos;s New
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
            New in Context Pool
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Stay up to date with the latest features and improvements.
            Every release makes document analysis more powerful.
          </p>
        </div>

        {/* Latest Version */}
        {latestRelease && (
          <div className="max-w-4xl mx-auto mb-6">
            <VersionSection release={latestRelease} />
          </div>
        )}

        {/* Previous Versions */}
        {previousReleases.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-4 px-2">
              Previous Releases
            </h3>
            <div className="space-y-4">
              {previousReleases.map((release) => (
                <VersionSection key={release.version} release={release} />
              ))}
            </div>
          </div>
        )}

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/changelog"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            View complete changelog
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
