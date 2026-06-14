"use client";

import { useTranslations } from "next-intl";
import type { PoolAllocation } from "@/lib/quota/dimensions";
import type { PoolUsageSnapshot } from "@/lib/quota/types";

export interface StackedAllocationBarProps {
  allocations: PoolAllocation[];
  usage: PoolUsageSnapshot | null;
  keyLabels: Record<string, string>;
  /** When usage has multiple dimensions, which one to display in this bar.
   *  Default: the first dimension. */
  dimensionIndex?: number;
}

const PALETTE = [
  "#a78bfa",
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#f87171",
  "#22d3ee",
  "#f472b6",
  "#94a3b8",
];

export default function StackedAllocationBar({
  allocations,
  usage,
  keyLabels,
  dimensionIndex = 0,
}: StackedAllocationBarProps): JSX.Element | null {
  const t = useTranslations("quotaShare");

  if (allocations.length === 0) {
    return null;
  }

  // Build a map of apiKeyId → { consumed, fairShare } from the relevant dimension
  const perKeyMap: Record<string, { consumed: number; fairShare: number }> = {};
  if (usage) {
    const dim = usage.dimensions?.[dimensionIndex];
    if (dim) {
      for (const entry of dim.perKey ?? []) {
        perKeyMap[entry.apiKeyId] = { consumed: entry.consumed, fairShare: entry.fairShare };
      }
    }
  }

  return (
    <div className="mb-3">
      <h4 className="text-[10px] uppercase tracking-wide font-bold text-text-muted mb-1.5">
        {t("stackedBarTitle")}
      </h4>

      {/* Stacked bar */}
      <div className="flex h-3 rounded overflow-hidden w-full mb-2">
        {allocations.map((alloc, i) => {
          const color = PALETTE[i % PALETTE.length];
          const keyUsage = perKeyMap[alloc.apiKeyId];
          let consumedPercent: number | null = null;
          if (keyUsage && keyUsage.fairShare > 0) {
            consumedPercent = Math.round((keyUsage.consumed / keyUsage.fairShare) * 100);
          }
          const label = keyLabels[alloc.apiKeyId] ?? alloc.apiKeyId;
          const tooltipText =
            consumedPercent !== null
              ? `${label}: ${alloc.weight}% (${t("usedSuffix", { percent: consumedPercent })})`
              : `${label}: ${alloc.weight}%`;
          return (
            <div
              key={alloc.apiKeyId}
              style={{ width: `${alloc.weight}%`, backgroundColor: color }}
              title={tooltipText}
              aria-label={tooltipText}
            />
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {allocations.map((alloc, i) => {
          const color = PALETTE[i % PALETTE.length];
          const keyUsage = perKeyMap[alloc.apiKeyId];
          let consumedPercent: number | null = null;
          if (keyUsage && keyUsage.fairShare > 0) {
            consumedPercent = Math.round((keyUsage.consumed / keyUsage.fairShare) * 100);
          }
          const label = keyLabels[alloc.apiKeyId] ?? alloc.apiKeyId;
          return (
            <span
              key={alloc.apiKeyId}
              className="flex items-center gap-1 text-[10px] text-text-muted"
            >
              <span
                className="inline-block w-2 h-2 rounded-sm shrink-0"
                style={{ backgroundColor: color }}
              />
              <span>
                {label} {alloc.weight}%
                {consumedPercent !== null && (
                  <span className="text-text-muted/70">
                    {" "}
                    ({t("usedSuffix", { percent: consumedPercent })})
                  </span>
                )}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
