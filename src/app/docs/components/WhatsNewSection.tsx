"use client";

import { useState, useEffect } from "react";

interface WhatsNewEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  slug?: string;
  type: "feature" | "improvement" | "fix" | "breaking";
}

const WHATS_NEW_ENTRIES: WhatsNewEntry[] = [
  {
    version: "3.7",
    date: "2025-06",
    title: "Documentation Site Overhaul",
    description:
      "Full interactive docs site with search, API explorer, Mermaid diagrams, and accessibility compliance.",
    slug: "/docs",
    type: "feature",
  },
  {
    version: "3.6",
    date: "2025-05",
    title: "MCP Server 37 Tools + A2A Protocol",
    description:
      "Expanded MCP to 37 tools with scoped auth. Added A2A v0.3 agent-to-agent protocol.",
    slug: "mcp-server",
    type: "feature",
  },
  {
    version: "3.5",
    date: "2025-04",
    title: "RTK + Caveman Stacked Compression",
    description:
      "Stacked compression pipeline: RTK → Caveman. Save 78-95% eligible tokens on tool outputs.",
    slug: "rtk-compression",
    type: "feature",
  },
  {
    version: "3.4",
    date: "2025-03",
    title: "1proxy Free Proxy Marketplace",
    description:
      "Built-in free proxy marketplace with quality scoring, auto-rotation, and circuit breaker.",
    slug: "proxy-guide",
    type: "feature",
  },
  {
    version: "3.3",
    date: "2025-02",
    title: "DeepSeek V3.2 + GLM-5.1 Added",
    description:
      "New cheap providers: DeepSeek V3.2 at $0.27/M and GLM-5.1 at $0.5/1M with 128K output.",
    slug: "free-tiers",
    type: "feature",
  },
  {
    version: "3.2",
    date: "2025-01",
    title: "Responses API Full Support",
    description:
      "Complete /v1/responses endpoint for Codex and OpenAI Responses API compatibility.",
    slug: "api-reference",
    type: "feature",
  },
];

const TYPE_BADGES: Record<string, { label: string; color: string }> = {
  feature: { label: "Feature", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  improvement: { label: "Improvement", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  fix: { label: "Fix", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  breaking: { label: "Breaking", color: "bg-red-500/10 text-red-600 border-red-500/20" },
};

export function WhatsNewSection() {
  const [expanded, setExpanded] = useState(false);

  const displayEntries = expanded ? WHATS_NEW_ENTRIES : WHATS_NEW_ENTRIES.slice(0, 3);

  return (
    <section className="mt-8" aria-labelledby="whats-new-heading">
      <h2
        id="whats-new-heading"
        className="text-xl font-bold text-text-main mb-4 flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-primary">new_releases</span>
        What&apos;s New
      </h2>
      <div className="space-y-3">
        {displayEntries.map((entry) => (
          <div
            key={`${entry.version}-${entry.date}`}
            className="flex items-start gap-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="shrink-0 mt-0.5">
              <span
                className={`inline-block px-2 py-0.5 text-xs font-semibold border rounded ${TYPE_BADGES[entry.type]?.color ?? TYPE_BADGES.feature.color}`}
              >
                {TYPE_BADGES[entry.type]?.label ?? "Feature"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-text-main">{entry.title}</span>
                <span className="text-xs font-mono text-primary">v{entry.version}</span>
              </div>
              <p className="text-sm text-text-muted">{entry.description}</p>
            </div>
            <span className="shrink-0 text-xs text-text-muted">{entry.date}</span>
          </div>
        ))}
      </div>
      {WHATS_NEW_ENTRIES.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm text-primary hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : `Show ${WHATS_NEW_ENTRIES.length - 3} more updates`}
        </button>
      )}
    </section>
  );
}

export function MigrationGuideBanner({
  fromVersion,
  toVersion,
}: {
  fromVersion: string;
  toVersion: string;
}) {
  return (
    <div className="mb-6 border border-yellow-500/30 bg-yellow-500/5 rounded-lg p-4" role="alert">
      <div className="flex items-center gap-2 mb-1">
        <span className="material-symbols-outlined text-yellow-600">upgrade</span>
        <span className="font-semibold text-yellow-600">
          Migration Guide: v{fromVersion} → v{toVersion}
        </span>
      </div>
      <p className="text-sm text-text-muted">
        This page describes features from v{toVersion}. If you&apos;re upgrading from v{fromVersion}
        , check the breaking changes above.
      </p>
    </div>
  );
}
