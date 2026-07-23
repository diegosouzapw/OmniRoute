"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type ConceptKey = "search" | "scrape" | "compare" | "rerank" | "auto";

interface ConceptItem {
  icon: string;
  key: ConceptKey;
  titleKey:
    | "searchConceptTitle"
    | "scrapeConceptTitle"
    | "compareConceptTitle"
    | "rerankConceptTitle"
    | "autoConceptTitle";
  descKey:
    | "searchConceptDesc"
    | "scrapeConceptDesc"
    | "compareConceptDesc"
    | "rerankConceptDesc"
    | "autoConceptDesc";
}

const CONCEPTS: ConceptItem[] = [
  { icon: "🔍", key: "search", titleKey: "searchConceptTitle", descKey: "searchConceptDesc" },
  { icon: "📄", key: "scrape", titleKey: "scrapeConceptTitle", descKey: "scrapeConceptDesc" },
  { icon: "⚖", key: "compare", titleKey: "compareConceptTitle", descKey: "compareConceptDesc" },
  { icon: "↕", key: "rerank", titleKey: "rerankConceptTitle", descKey: "rerankConceptDesc" },
  { icon: "⚡", key: "auto", titleKey: "autoConceptTitle", descKey: "autoConceptDesc" },
];

interface SearchConceptCardProps {
  /** If true, the card starts collapsed. Default: false (expanded). */
  defaultCollapsed?: boolean;
}

export default function SearchConceptCard({ defaultCollapsed = false }: SearchConceptCardProps) {
  const t = useTranslations("search");
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div
      className="bg-surface border border-border rounded-lg overflow-hidden"
      data-testid="search-concept-card"
    >
      {/* Header */}
      <button
        className="flex justify-between items-center w-full px-4 py-2.5 bg-bg-alt border-b border-border hover:bg-bg-alt/80 transition-colors"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
        aria-controls="concept-card-content"
      >
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-2">
          <span>ⓘ</span>
          <span>{t("modalitiesGuide")}</span>
        </span>
        <span className="text-text-muted text-xs" aria-hidden="true">
          {collapsed ? "▶" : "▼"}
        </span>
      </button>

      {/* Body */}
      {!collapsed && (
        <div
          id="concept-card-content"
          className="p-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          data-testid="concept-card-content"
        >
          {CONCEPTS.map((c) => (
            <div
              key={c.key}
              className="flex gap-3 p-3 bg-bg-alt rounded-lg border border-border"
              data-testid={`concept-item-${c.key}`}
            >
              <span className="text-lg shrink-0" aria-hidden="true">
                {c.icon}
              </span>
              <div>
                <div className="text-xs font-semibold text-text-main mb-0.5">{t(c.titleKey)}</div>
                <div className="text-[11px] text-text-muted leading-relaxed">{t(c.descKey)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
