"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { CLI_TOOLS } from "@/shared/constants/cliTools";
import { CardSkeleton } from "@/shared/components";
import { CliToolCard, CliConceptCard, CliComparisonCard } from "@/shared/components/cli";
import { useToolBatchStatuses } from "@/shared/hooks/cli/useToolBatchStatuses";

export interface CliAgentsPageClientProps {
  machineId: string;
}

const DETECTION_ALL = "all";
const DETECTION_INSTALLED = "installed";
const DETECTION_NOT_INSTALLED = "not_installed";

export default function CliAgentsPageClient({ machineId: _machineId }: CliAgentsPageClientProps) {
  const t = useTranslations("cliAgents");
  const { statuses, loading, refetch } = useToolBatchStatuses();

  const [search, setSearch] = useState<string>("");
  const [detectionFilter, setDetectionFilter] = useState<string>(DETECTION_ALL);

  const agentTools = useMemo(
    () => Object.values(CLI_TOOLS).filter((tool) => tool.category === "agent"),
    []
  );

  const hasActiveProviders = useMemo(() => {
    if (!statuses) return true;
    return Object.values(statuses).some((s) => s.detection.installed);
  }, [statuses]);

  const filteredTools = useMemo(() => {
    return agentTools.filter((tool) => {
      // Search filter
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesId = tool.id.toLowerCase().includes(q);
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesVendor = tool.vendor.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesDesc && !matchesVendor) {
          return false;
        }
      }

      // Detection filter
      if (detectionFilter !== DETECTION_ALL) {
        const batchStatus = statuses?.[tool.id] ?? null;
        const installed = batchStatus?.detection.installed ?? false;
        if (detectionFilter === DETECTION_INSTALLED && !installed) return false;
        if (detectionFilter === DETECTION_NOT_INSTALLED && installed) return false;
      }

      return true;
    });
  }, [agentTools, search, detectionFilter, statuses]);

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-text-main">{t("pageTitle")}</h1>
          <p className="text-sm text-text-muted mt-1">{t("pageSubtitle")}</p>
        </div>
        <button
          type="button"
          onClick={() => void refetch()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label={t("refreshDetection")}
        >
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            refresh
          </span>
          {t("refreshDetection")}
        </button>
      </div>

      {/* Concept card */}
      <CliConceptCard currentType="agent" />

      {/* Comparison card */}
      <CliComparisonCard currentType="agent" />

      {/* Search + filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <span
            className="absolute left-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-text-muted pointer-events-none"
            aria-hidden="true"
          >
            search
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-surface border border-black/10 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={t("searchPlaceholder")}
          />
        </div>

        <select
          value={detectionFilter}
          onChange={(e) => setDetectionFilter(e.target.value)}
          className="px-2.5 py-1.5 text-sm bg-surface border border-black/10 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label={t("detectionFilterLabel")}
        >
          <option value={DETECTION_ALL}>{t("detectionAll")}</option>
          <option value={DETECTION_INSTALLED}>{t("detectionInstalled")}</option>
          <option value={DETECTION_NOT_INSTALLED}>{t("detectionNotInstalled")}</option>
        </select>

        <span className="text-xs text-text-muted whitespace-nowrap">
          {t("visibleCount", { count: filteredTools.length })}
        </span>
      </div>

      {/* Tool grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {agentTools.map((tool) => (
            <CardSkeleton key={tool.id} />
          ))}
        </div>
      ) : filteredTools.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 gap-3 text-text-muted"
          data-testid="empty-state"
        >
          <span className="material-symbols-outlined text-[40px]" aria-hidden="true">
            search_off
          </span>
          <p className="text-sm">{t("emptyState")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTools.map((tool) => (
            <CliToolCard
              key={tool.id}
              tool={tool}
              batchStatus={statuses?.[tool.id] ?? null}
              detailHref={`/dashboard/cli-agents/${tool.id}`}
              hasActiveProviders={hasActiveProviders}
            />
          ))}
        </div>
      )}
    </div>
  );
}
