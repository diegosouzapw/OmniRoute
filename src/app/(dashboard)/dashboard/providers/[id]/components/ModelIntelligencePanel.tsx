"use client";

/**
 * ModelIntelligencePanel — comparison panel surfaced on the provider
 * detail page. Renders per-model intelligence scores with the winning
 * source shown as a badge next to each bar.
 *
 * Data source: GET /api/provider-intelligence?provider=<id>
 * Resolution chain: user_override > arena_elo > models_dev_tier
 */

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";

export interface ProviderModelIntelligence {
  modelId: string;
  modelName: string;
  score: number;
  eloRaw: number | null;
  confidence: string | null;
  category: string;
  source: string;
  isFree: boolean;
}

interface ProviderIntelligenceResponse {
  provider: string;
  modelCount: number;
  models: ProviderModelIntelligence[];
}

const SOURCE_LABELS: Record<string, string> = {
  user_override: "Override",
  arena_elo: "Arena ELO",
  models_dev_tier: "Tier",
  "*:inherited": "Inherited",
};

const SOURCE_COLORS: Record<string, string> = {
  user_override: "bg-purple-500/15 text-purple-700 dark:text-purple-300",
  arena_elo: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  models_dev_tier: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  "*:inherited": "bg-gray-500/15 text-gray-700 dark:text-gray-300",
};

function SourceBadge({ source }: { source: string }) {
  const label = SOURCE_LABELS[source] ?? source;
  const color = SOURCE_COLORS[source] ?? SOURCE_COLORS["*:inherited"];
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium ${color}`}
      title={`Intelligence source: ${label}`}
    >
      {label}
    </span>
  );
}

function IntelligenceBar({
  entry,
}: {
  entry: ProviderModelIntelligence;
}) {
  const pct = Math.round(entry.score * 100);
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs font-medium text-foreground">
            {entry.modelName}
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            <span className="text-xs font-semibold tabular-nums text-foreground">
              {pct}
            </span>
            <SourceBadge source={entry.source} />
          </span>
        </div>
        <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        {entry.eloRaw != null && (
          <div className="mt-0.5 text-[10px] text-muted-foreground">
            ELO: {entry.eloRaw}
            {entry.confidence ? ` · confidence: ${entry.confidence}` : ""}
          </div>
        )}
      </div>
    </div>
  );
}

async function fetchProviderIntelligence(
  providerId: string
): Promise<ProviderIntelligenceResponse> {
  const res = await fetch(
    `/api/provider-intelligence?provider=${encodeURIComponent(providerId)}`
  );
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as ProviderIntelligenceResponse;
}

export function ModelIntelligencePanel({
  providerId,
}: {
  providerId: string;
}) {
  const t = useTranslations();
  const [data, setData] = useState<ProviderIntelligenceResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setIsError(false);
    setErrorMessage(null);
    fetchProviderIntelligence(providerId)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setIsError(true);
          setErrorMessage(err instanceof Error ? err.message : "unknown error");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [providerId]);

  const sorted = useMemo(() => {
    if (!data?.models) return [];
    return [...data.models].sort((a, b) => b.score - a.score);
  }, [data?.models]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="h-6 animate-pulse rounded bg-muted" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-lg border border-destructive/30 p-4 text-sm text-destructive">
        {t("modelIntelligence.loadError", {
          fallback: "Failed to load intelligence",
        })}{" "}
        {errorMessage ?? ""}
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        {t("modelIntelligence.empty", {
          provider: data.provider,
          fallback: `No intelligence scores available for "${data.provider}". Trigger a sync to populate scores.`,
        })}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-1 pb-2">
        <h3 className="text-sm font-semibold">
          {t("modelIntelligence.title", { fallback: "Model Intelligence" })}
        </h3>
        <span className="text-xs text-muted-foreground">
          {sorted.length}{" "}
          {t("modelIntelligence.models", {
            count: sorted.length,
            fallback: "models",
          })}
        </span>
      </div>
      {sorted.map((entry) => (
        <IntelligenceBar key={entry.modelId} entry={entry} />
      ))}
    </div>
  );
}

export default ModelIntelligencePanel;