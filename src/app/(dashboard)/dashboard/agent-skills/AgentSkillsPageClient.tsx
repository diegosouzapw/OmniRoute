"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { SkillsConceptCard } from "@/shared/components/SkillsConceptCard";
import { CoverageBar } from "./components/CoverageBar";
import { McpA2aLinksBar } from "./components/McpA2aLinksBar";
import { SkillCard } from "./components/SkillCard";
import { SkillPreviewPane } from "./components/SkillPreviewPane";
import type { AgentSkill, SkillCoverage } from "@/lib/agentSkills/types";

type FilterCategory = "all" | "api" | "cli" | "config";

// ── Skeleton helpers ─────────────────────────────────────────────────────────

function SkillCardSkeleton(): JSX.Element {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border p-3 animate-pulse">
      <div className="h-9 w-9 rounded-lg bg-bg-subtle shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-1/3 rounded bg-bg-subtle" />
        <div className="h-2 w-full rounded bg-bg-subtle" />
        <div className="h-2 w-4/5 rounded bg-bg-subtle" />
      </div>
    </div>
  );
}

function CoverageBarSkeleton(): JSX.Element {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="flex gap-2">
        <div className="h-2 w-16 rounded bg-bg-subtle" />
        <div className="flex-1 h-2 rounded bg-bg-subtle" />
      </div>
      <div className="flex gap-2">
        <div className="h-2 w-16 rounded bg-bg-subtle" />
        <div className="flex-1 h-2 rounded bg-bg-subtle" />
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function AgentSkillsPageClient(): JSX.Element {
  const t = useTranslations("agentSkills");

  // State
  const [catalog, setCatalog] = useState<AgentSkill[]>([]);
  const [coverage, setCoverage] = useState<SkillCoverage | null>(null);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [markdownCache, setMarkdownCache] = useState<Map<string, string>>(new Map());
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [generatingSkills, setGeneratingSkills] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  // ── Fetch catalog + coverage on mount ────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    const load = async () => {
      try {
        setLoadingCatalog(true);
        const res = await fetch("/api/agent-skills", { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as { skills: AgentSkill[]; coverage: SkillCoverage };
        setCatalog(json.skills ?? []);
        setCoverage(json.coverage ?? null);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setCatalog([]);
        }
      } finally {
        setLoadingCatalog(false);
      }
    };

    void load();
    return () => {
      controller.abort();
    };
  }, []);

  // ── Fetch raw markdown when a card is selected ────────────────────────────
  const loadPreview = useCallback(
    async (id: string) => {
      if (markdownCache.has(id)) return;
      setLoadingPreview(true);
      try {
        const res = await fetch(`/api/agent-skills/${id}/raw`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = await res.text();
        setMarkdownCache((prev) => new Map(prev).set(id, body));
      } catch {
        setMarkdownCache((prev) => {
          const next = new Map(prev);
          // Set empty string to signal "failed" so we show error state
          next.set(id, "");
          return next;
        });
      } finally {
        setLoadingPreview(false);
      }
    },
    [markdownCache]
  );

  // ── Debounced preview load (200ms) ───────────────────────────────────────
  useEffect(() => {
    if (!selectedId) return;
    const timer = setTimeout(() => {
      void loadPreview(selectedId);
    }, 200);
    return () => clearTimeout(timer);
  }, [selectedId, loadPreview]);

  const handleSelectCard = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleRefreshPreview = useCallback(() => {
    if (!selectedId) return;
    setMarkdownCache((prev) => {
      const next = new Map(prev);
      next.delete(selectedId);
      return next;
    });
    void loadPreview(selectedId);
  }, [selectedId, loadPreview]);

  // ── Generate missing skills ───────────────────────────────────────────────
  const handleGenerate = useCallback(async () => {
    const confirmed = window.confirm(t("regenerateConfirm"));
    if (!confirmed) return;
    setGeneratingSkills(true);
    try {
      const res = await fetch("/api/agent-skills/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dryRun: false, prune: false }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Refresh catalog + coverage after generation
      const res2 = await fetch("/api/agent-skills");
      if (res2.ok) {
        const json = (await res2.json()) as { skills: AgentSkill[]; coverage: SkillCoverage };
        setCatalog(json.skills ?? []);
        setCoverage(json.coverage ?? null);
      }
    } catch {
      // Error handled silently — could extend with toast notification
    } finally {
      setGeneratingSkills(false);
    }
  }, [t]);

  // ── Filtering + search ────────────────────────────────────────────────────
  const filteredSkills = catalog.filter((s) => {
    if (filter !== "all" && s.category !== filter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const selectedMarkdown = selectedId ? (markdownCache.get(selectedId) ?? null) : null;
  const coverageTotal = coverage !== null ? coverage.api.have + coverage.cli.have : null;
  const showGenerateButton = coverageTotal !== null && coverageTotal < 42;

  return (
    <div className="flex flex-col gap-4">
      {/* Concept card — full width */}
      <SkillsConceptCard variant="agent" />

      {/* Header: coverage + MCP/A2A bar + generate button */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-bg p-4">
        {/* Coverage */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              {t("coverageLabel")}
            </span>
            {showGenerateButton && (
              <button
                onClick={() => void handleGenerate()}
                disabled={generatingSkills}
                className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors disabled:opacity-60"
                data-testid="generate-button"
              >
                <span
                  className={`material-symbols-outlined text-[14px] ${generatingSkills ? "animate-spin" : ""}`}
                >
                  {generatingSkills ? "refresh" : "auto_fix_high"}
                </span>
                {generatingSkills ? t("regenerateRunning") : t("generateButton")}
              </button>
            )}
          </div>
          {coverage ? <CoverageBar coverage={coverage} /> : <CoverageBarSkeleton />}
        </div>

        {/* MCP + A2A links */}
        <McpA2aLinksBar />
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-text-muted pointer-events-none">
            search
          </span>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("filters.searchPlaceholder")}
            className="w-full rounded-lg border border-border bg-bg py-2 pl-9 pr-3 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
            data-testid="search-input"
          />
        </div>
        <div className="flex gap-1" role="group" aria-label={t("filters.category")}>
          {(["all", "api", "cli", "config"] as FilterCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              data-testid={`filter-${cat}`}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors border ${
                filter === cat
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-bg text-text-muted border-border hover:bg-bg-subtle hover:text-text-main"
              }`}
            >
              {cat === "all"
                ? t("filterAll")
                : cat === "api"
                  ? t("categoryApi")
                  : cat === "cli"
                    ? t("categoryCli")
                    : t("categoryConfig")}
            </button>
          ))}
        </div>
      </div>

      {/* Two-column grid: left = skill cards, right = preview */}
      <div className="grid grid-cols-12 gap-4" data-testid="skills-grid">
        {/* Left: skill cards list (col-span 7) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-2" data-testid="skills-list">
          {loadingCatalog ? (
            Array.from({ length: 6 }).map((_, i) => <SkillCardSkeleton key={i} />)
          ) : filteredSkills.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center">
              <span className="material-symbols-outlined text-[32px] text-text-muted mb-3">
                search_off
              </span>
              <p className="text-sm text-text-muted">{t("noSkillsFound")}</p>
            </div>
          ) : (
            filteredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                selected={selectedId === skill.id}
                onClick={() => handleSelectCard(skill.id)}
              />
            ))
          )}
        </div>

        {/* Right: preview pane (col-span 5) */}
        <div className="col-span-12 lg:col-span-5" data-testid="preview-column">
          <SkillPreviewPane
            skillId={selectedId}
            markdown={selectedMarkdown}
            loading={loadingPreview}
            onRefresh={selectedId ? handleRefreshPreview : undefined}
          />
        </div>
      </div>
    </div>
  );
}
