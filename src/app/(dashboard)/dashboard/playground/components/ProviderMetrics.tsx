"use client";

// src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx

import type { StreamMetrics } from "@/shared/schemas/playground";
import { useTranslations } from "next-intl";

interface ProviderMetricsProps {
  metrics: StreamMetrics;
}

function formatMs(ms: number | null): string {
  if (ms == null) return "—";
  if (ms < 1000) return `${ms.toFixed(0)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function formatTps(tps: number | null): string {
  if (tps == null) return "—";
  return `${tps.toFixed(1)} t/s`;
}

function formatCost(usd: number | null): string {
  if (usd == null) return "—";
  if (usd < 0.001) return `$${(usd * 1000).toFixed(3)}m`;
  return `$${usd.toFixed(4)}`;
}

/**
 * ProviderMetrics — displays TTFT, TPS, token counts, and estimated cost.
 *
 * All metrics are client-perceived (D12): measured from the first SSE chunk
 * to the last. Labeled "(estimated)" as required by D13.
 */
export default function ProviderMetrics({ metrics }: ProviderMetricsProps) {
  const t = useTranslations("playground");
  const { ttftMs, tps, tokensIn, tokensOut, costUsd } = metrics;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-text-muted font-mono">
      {/* TTFT */}
      <span title={t("ttftTitle")}>TTFT {formatMs(ttftMs)}</span>

      {/* TPS */}
      <span title={t("tpsTitle")}>· {formatTps(tps)}</span>

      {/* Token counts */}
      <span title={t("tokenCountsTitle")}>
        · {tokensIn}↑ {tokensOut}↓
      </span>

      {/* Cost */}
      <span title={t("estimatedCostTitle")}>
        · {formatCost(costUsd)} <span className="opacity-60">{t("costEstimated")}</span>
      </span>
    </div>
  );
}
