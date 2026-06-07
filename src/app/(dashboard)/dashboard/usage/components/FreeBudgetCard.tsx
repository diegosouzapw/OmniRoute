"use client";

import { useState, useEffect } from "react";
import React from "react";

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

export interface FreeBudgetPerModel {
  provider: string;
  modelId: string;
  displayName: string;
  monthlyTokens: number;
  creditTokens: number;
  freeType: string;
  poolKey: string;
  tos: string;
}

export interface FreeBudgetData {
  steadyRecurringTokens: number;
  steadyWithRecurringCreditsTokens: number;
  firstMonthRealisticTokens: number;
  usedThisMonth: number;
  remaining: number;
  modelCount: number;
  poolCount: number;
  perModel: FreeBudgetPerModel[];
  headline?: string;
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(2).replace(/\.?0+$/, "") + "B";
  return Math.round(n / 1e6) + "M";
}

// Distinct hues for stacked bar segments (cycling)
const BAR_HUES = [
  "#6366f1", // indigo
  "#10b981", // emerald
  "#f59e0b", // amber
  "#3b82f6", // blue
  "#ec4899", // pink
  "#14b8a6", // teal
  "#f97316", // orange
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#84cc16", // lime
];

// ────────────────────────────────────────────────────────────────────────────
// Pool-dedup helpers
// ────────────────────────────────────────────────────────────────────────────

const RECURRING_TYPES = new Set(["recurring-daily", "recurring-monthly", "keyless"]);

interface BarSegment {
  /** Unique key for React rendering */
  key: string;
  /** Label shown in the tooltip */
  label: string;
  tokens: number;
  color: string;
}

/**
 * Build an ordered list of bar segments from per-model data.
 * - For recurring-type models that share a poolKey, emit ONE segment using the
 *   pool's MAX monthlyTokens, labeled by the top model's displayName.
 * - For recurring-type models with poolKey===null, emit one segment each.
 * The segments therefore sum to `steadyRecurringTokens` (the deduped header total).
 */
function buildBarSegments(perModel: FreeBudgetPerModel[]): BarSegment[] {
  // Deterministic color by provider — stable hue even if model order changes
  const providerColorCache = new Map<string, string>();
  function colorFor(provider: string): string {
    if (!providerColorCache.has(provider)) {
      // Assign from BAR_HUES in first-seen order
      const idx = providerColorCache.size;
      providerColorCache.set(provider, BAR_HUES[idx % BAR_HUES.length]);
    }
    return providerColorCache.get(provider)!;
  }

  const seenPools = new Map<string, BarSegment>();
  const looseSegments: BarSegment[] = [];

  for (const m of perModel) {
    if (!RECURRING_TYPES.has(m.freeType)) continue;
    if (m.monthlyTokens <= 0) continue;

    if (m.poolKey) {
      const existing = seenPools.get(m.poolKey);
      if (!existing) {
        seenPools.set(m.poolKey, {
          key: `pool:${m.poolKey}`,
          label: `${m.displayName} (${m.provider})`,
          tokens: m.monthlyTokens,
          color: colorFor(m.provider),
        });
      } else if (m.monthlyTokens > existing.tokens) {
        // Keep max within the pool; update label to the larger model
        seenPools.set(m.poolKey, { ...existing, tokens: m.monthlyTokens, label: `${m.displayName} (${m.provider})` });
      }
    } else {
      looseSegments.push({
        key: `model:${m.modelId}`,
        label: `${m.displayName}`,
        tokens: m.monthlyTokens,
        color: colorFor(m.provider),
      });
    }
  }

  return [...seenPools.values(), ...looseSegments];
}

/**
 * Map each perModel entry to the color of its pool/provider bar segment.
 * Used so the legend swatches match the bar segment for that provider.
 */
function buildLegendColorMap(
  perModel: FreeBudgetPerModel[],
  segments: BarSegment[],
): Map<string, string> {
  // Build: poolKey → color, provider → color from the resolved segments
  const poolColorMap = new Map<string, string>();
  const providerColorMap = new Map<string, string>();
  for (const seg of segments) {
    if (seg.key.startsWith("pool:")) {
      const pk = seg.key.slice("pool:".length);
      poolColorMap.set(pk, seg.color);
    }
  }
  for (const m of perModel) {
    if (m.poolKey && poolColorMap.has(m.poolKey)) {
      providerColorMap.set(m.provider, poolColorMap.get(m.poolKey)!);
    }
  }
  // For loose segments, map by model key directly
  const modelColorMap = new Map<string, string>();
  for (const seg of segments) {
    if (seg.key.startsWith("model:")) {
      const mid = seg.key.slice("model:".length);
      modelColorMap.set(mid, seg.color);
    }
  }
  // Final lookup: per modelId → color
  const result = new Map<string, string>();
  for (const m of perModel) {
    if (modelColorMap.has(m.modelId)) {
      result.set(m.modelId, modelColorMap.get(m.modelId)!);
    } else if (m.poolKey && poolColorMap.has(m.poolKey)) {
      result.set(m.modelId, poolColorMap.get(m.poolKey)!);
    } else {
      // Fallback: stable hash by provider
      const provColor = providerColorMap.get(m.provider) ?? BAR_HUES[0];
      result.set(m.modelId, provColor);
    }
  }
  return result;
}

// ────────────────────────────────────────────────────────────────────────────
// Pure view (SSR-testable — no hooks)
// ────────────────────────────────────────────────────────────────────────────

export function FreeBudgetView({ data }: { data: FreeBudgetData }) {
  const {
    steadyRecurringTokens,
    firstMonthRealisticTokens,
    remaining,
    perModel,
  } = data;

  const pct =
    steadyRecurringTokens > 0
      ? Math.round((remaining / steadyRecurringTokens) * 100)
      : 0;

  const avoidModels = perModel.filter((m) => m.tos === "avoid");

  // Pool-deduped bar segments — their token sum equals steadyRecurringTokens
  const barSegments = buildBarSegments(perModel);
  const totalBarTokens = barSegments.reduce((s, seg) => s + seg.tokens, 0);

  // Per-model color lookup for legend swatches (matches bar)
  const legendColorMap = buildLegendColorMap(perModel, barSegments);

  // Filter legend to entries with something to show (no zero-budget clutter)
  const legendModels = perModel.filter((m) => m.monthlyTokens > 0 || m.creditTokens > 0);

  return (
    <div className="rounded-lg border border-border bg-surface">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
        <span className="material-symbols-outlined text-[14px] text-text-muted">
          token
        </span>
        <span className="text-[13px] font-semibold text-text-main">
          Monthly free-token budget
        </span>
        <span className="ml-auto text-[11px] text-text-muted tabular-nums">
          {fmt(remaining)} remaining · {pct}% of {fmt(steadyRecurringTokens)}
        </span>
      </div>

      {/* Stacked bar — pool-deduped; segments sum to steadyRecurringTokens */}
      {barSegments.length > 0 && (
        <div className="px-3 pt-2">
          <div className="flex h-3 rounded-sm overflow-hidden w-full" data-testid="budget-bar">
            {barSegments.map((seg) => {
              const width =
                totalBarTokens > 0
                  ? ((seg.tokens / totalBarTokens) * 100).toFixed(2)
                  : "0";
              return (
                <div
                  key={seg.key}
                  title={`${seg.label}: ${fmt(seg.tokens)}`}
                  data-testid="bar-segment"
                  style={{
                    flexBasis: `${width}%`,
                    background: seg.color,
                    minWidth: "2px",
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* First-month callout */}
      <div className="px-3 py-2 text-[11px] text-text-muted tabular-nums">
        Up to{" "}
        <span className="font-semibold text-text-main">
          {fmt(firstMonthRealisticTokens)}
        </span>{" "}
        in your first month with signup credits
      </div>

      {/* ToS-restricted callout */}
      {avoidModels.length > 0 && (
        <div className="mx-3 mb-2 flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-1.5">
          <span className="material-symbols-outlined text-[14px] text-text-muted">
            warning
          </span>
          <span className="text-[11px] text-amber-400">
            {avoidModels.length} model
            {avoidModels.length !== 1 ? "s" : ""} flagged as ToS-restricted
          </span>
        </div>
      )}

      {/* Per-model legend grid — filtered to non-zero entries; colors match bar */}
      <div className="px-3 pb-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-0.5 mt-1">
          {legendModels.map((m) => {
            const swatchColor = legendColorMap.get(m.modelId) ?? BAR_HUES[0];
            return (
              <div
                key={m.modelId}
                className="flex items-center gap-1.5 px-0 py-1 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] rounded"
                title={`${m.provider} · ${m.freeType}${m.tos === "avoid" ? " · ⚠ ToS-restricted" : m.tos === "caution" ? " · ⚡ caution" : ""}`}
              >
                <span
                  className="inline-block w-2 h-2 rounded-sm flex-shrink-0"
                  style={{ background: swatchColor }}
                />
                <span className="text-[11px] text-text-muted tabular-nums truncate">
                  {m.displayName}
                </span>
                <span className="text-[11px] text-text-muted tabular-nums ml-auto">
                  {m.monthlyTokens >= 1e6 ? fmt(m.monthlyTokens) : m.monthlyTokens.toLocaleString()}
                </span>
                {m.tos === "avoid" && (
                  <span className="material-symbols-outlined text-[11px] text-amber-400">
                    warning
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Fetch wrapper (client component)
// ────────────────────────────────────────────────────────────────────────────

export default function FreeBudgetCard() {
  const [data, setData] = useState<FreeBudgetData | null>(null);

  useEffect(() => {
    fetch("/api/free-tier/summary")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json) setData(json as FreeBudgetData);
      })
      .catch(() => {
        /* best-effort */
      });
  }, []);

  if (!data) return null;

  return <FreeBudgetView data={data} />;
}
