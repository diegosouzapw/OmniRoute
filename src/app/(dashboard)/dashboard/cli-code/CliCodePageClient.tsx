"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button, CardSkeleton, Input } from "@/shared/components";
import { CLI_TOOLS } from "@/shared/constants/cliTools";
import { EXPECTED_CODE_COUNT } from "@/shared/schemas/cliCatalog";
import { CliToolCard, CliConceptCard, CliComparisonCard } from "@/shared/components/cli";
import { useToolBatchStatuses } from "@/shared/hooks/cli/useToolBatchStatuses";
import type { CliCatalogEntry } from "@/shared/schemas/cliCatalog";

// ── Static catalogue slice ────────────────────────────────────────────────────

const CODE_TOOLS: [string, CliCatalogEntry][] = Object.entries(CLI_TOOLS).filter(
  ([, tool]) => tool.category === "code" && tool.baseUrlSupport !== "none"
) as [string, CliCatalogEntry][];

// Cardinality guard (D15) — non-blocking, log only
if (CODE_TOOLS.length !== EXPECTED_CODE_COUNT) {
  console.warn(
    `[CliCodePage] Expected ${EXPECTED_CODE_COUNT} code tools, found ${CODE_TOOLS.length}. ` +
      "Check F1 catalog edits."
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

type DetectionFilter = "all" | "installed" | "not_installed";
type BaseUrlFilter = "all" | "full" | "partial";

interface ProviderConnection {
  isActive?: boolean;
  [key: string]: unknown;
}

interface ProvidersResponse {
  connections?: ProviderConnection[];
}

// ── Component ─────────────────────────────────────────────────────────────────

interface CliCodePageClientProps {
  machineId: string;
}

export default function CliCodePageClient({ machineId: _machineId }: CliCodePageClientProps) {
  const t = useTranslations("cliCode");
  const tCommon = useTranslations("cliCommon");

  // ── Batch statuses ──────────────────────────────────────────────────────────
  const { statuses, loading, refetch } = useToolBatchStatuses();

  // ── Providers ───────────────────────────────────────────────────────────────
  const [hasActiveProviders, setHasActiveProviders] = useState<boolean>(false);
  const [providersLoading, setProvidersLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/providers")
      .then<ProvidersResponse>((res) => (res.ok ? res.json() : Promise.resolve({ connections: [] })))
      .then((data) => {
        if (cancelled) return;
        const active = (data.connections ?? []).filter((c) => c.isActive !== false);
        setHasActiveProviders(active.length > 0);
      })
      .catch(() => {
        if (!cancelled) setHasActiveProviders(false);
      })
      .finally(() => {
        if (!cancelled) setProvidersLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Filters ─────────────────────────────────────────────────────────────────
  const [search, setSearch] = useState<string>("");
  const [detectionFilter, setDetectionFilter] = useState<DetectionFilter>("all");
  const [baseUrlFilter, setBaseUrlFilter] = useState<BaseUrlFilter>("all");

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleDetectionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setDetectionFilter(e.target.value as DetectionFilter);
  }, []);

  const handleBaseUrlChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseUrlFilter(e.target.value as BaseUrlFilter);
  }, []);

  // ── Filtered tools ──────────────────────────────────────────────────────────
  const filteredTools = useMemo<[string, CliCatalogEntry][]>(() => {
    const q = search.trim().toLowerCase();

    return CODE_TOOLS.filter(([id, tool]) => {
      // Search filter
      if (q) {
        const haystack =
          `${tool.name} ${tool.vendor} ${tool.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      // Detection filter
      if (detectionFilter !== "all") {
        const installed = statuses?.[id]?.detection.installed ?? false;
        if (detectionFilter === "installed" && !installed) return false;
        if (detectionFilter === "not_installed" && installed) return false;
      }

      // Base URL filter
      if (baseUrlFilter !== "all") {
        if (tool.baseUrlSupport !== baseUrlFilter) return false;
      }

      return true;
    });
  }, [search, detectionFilter, baseUrlFilter, statuses]);

  // ── Render ───────────────────────────────────────────────────────────────────
  const isLoadingOverall = loading || providersLoading;

  return (
    <div className="flex flex-col gap-6">
      {/* Concept card */}
      <CliConceptCard currentType="code" />

      {/* Comparison card */}
      <CliComparisonCard currentType="code" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
        {/* Title + subtitle */}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold text-text-main leading-tight">{t("pageTitle")}</h1>
          <p className="text-sm text-text-muted mt-0.5">{t("pageSubtitle")}</p>
        </div>

        {/* Refresh button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={refetch}
          icon="refresh"
          aria-label={tCommon("card.refreshDetection")}
        >
          {tCommon("card.refreshDetection")}
        </Button>
      </div>

      {/* Filter row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex-1 min-w-0">
          <Input
            placeholder={t("searchPlaceholder")}
            value={search}
            onChange={handleSearchChange}
            icon="search"
          />
        </div>

        {/* Detection filter */}
        <div className="flex flex-col gap-1 min-w-[150px]">
          <label className="text-[11px] text-text-muted uppercase tracking-wide">
            {t("filterDetectionLabel")}
          </label>
          <select
            value={detectionFilter}
            onChange={handleDetectionChange}
            className="h-8 px-2 text-sm rounded-lg border border-black/10 dark:border-white/10 bg-surface text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">{t("detectionAll")}</option>
            <option value="installed">{t("detectionInstalled")}</option>
            <option value="not_installed">{t("detectionNotFound")}</option>
          </select>
        </div>

        {/* Base URL filter */}
        <div className="flex flex-col gap-1 min-w-[150px]">
          <label className="text-[11px] text-text-muted uppercase tracking-wide">
            {t("filterBaseUrlLabel")}
          </label>
          <select
            value={baseUrlFilter}
            onChange={handleBaseUrlChange}
            className="h-8 px-2 text-sm rounded-lg border border-black/10 dark:border-white/10 bg-surface text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">{t("baseUrlAll")}</option>
            <option value="full">{t("baseUrlFull")}</option>
            <option value="partial">{t("baseUrlPartial")}</option>
          </select>
        </div>
      </div>

      {/* Empty state — no active providers */}
      {!providersLoading && !hasActiveProviders && (
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4 flex items-start gap-3">
          <span className="material-symbols-outlined text-amber-500 flex-shrink-0">warning</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
              {tCommon("detail.noActiveProviders")}
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              {tCommon("detail.noActiveProvidersDesc")}
            </p>
            <Link
              href="/dashboard/providers"
              className="inline-flex items-center gap-1 mt-2 text-xs text-primary font-medium hover:underline"
            >
              {tCommon("detail.openProviders")}
            </Link>
          </div>
        </div>
      )}

      {/* Grid */}
      {isLoadingOverall ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTools.map(([id, tool]) => (
            <CliToolCard
              key={id}
              tool={tool}
              batchStatus={statuses?.[id] ?? null}
              detailHref={`/dashboard/cli-code/${id}`}
              hasActiveProviders={hasActiveProviders}
            />
          ))}
        </div>
      )}
    </div>
  );
}
