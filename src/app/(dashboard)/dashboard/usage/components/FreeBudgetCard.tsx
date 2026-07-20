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
  poolKey: string | null;
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
  /** Extra recurring tokens/mo unlocked by a one-time small deposit (OpenRouter $10 → 1000 RPD). */
  boostMonthlyTokens?: number;
  /** Providers that are permanently free but publish no token cap (rate/concurrency-limited). */
  uncappedProviders?: string[];
  headline?: string;
}

export type FreeBudgetSort = "tokens" | "name" | "provider";

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(2).replace(/\.?0+$/, "") + "B";
  if (n >= 1e6) return Math.round(n / 1e6) + "M";
  if (n >= 1e3) return Math.round(n / 1e3) + "K";
  return String(n);
}

const FREE_TYPE_LABEL: Record<string, string> = {
  "recurring-daily": "daily",
  "recurring-monthly": "monthly",
  "recurring-credit": "credit/mo",
  "recurring-uncapped": "uncapped",
  "one-time-initial": "signup credit",
  keyless: "keyless",
  discontinued: "discontinued",
};

// Distinct hues for stacked bar segments (cycling)
const BAR_HUES = [
  "#6366f1", "#10b981", "#f59e0b", "#3b82f6", "#ec4899",
  "#14b8a6", "#f97316", "#8b5cf6", "#06b6d4", "#84cc16",
];

const RECURRING_TYPES = new Set(["recurring-daily", "recurring-monthly", "keyless"]);

interface BarSegment {
  key: string;
  label: string;
  tokens: number;
  color: string;
}

/**
 * Build an ordered list of bar segments from per-model data.
 * Recurring models sharing a poolKey collapse to ONE segment (pool MAX); poolKey===null
 * models each get a segment. Segments therefore sum to `steadyRecurringTokens`.
 */
function buildBarSegments(perModel: FreeBudgetPerModel[]): BarSegment[] {
  const providerColorCache = new Map<string, string>();
  function colorFor(provider: string): string {
    if (!providerColorCache.has(provider)) {
      providerColorCache.set(provider, BAR_HUES[providerColorCache.size % BAR_HUES.length]);
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

function colorForProvider(perModel: FreeBudgetPerModel[]): Map<string, string> {
  const cache = new Map<string, string>();
  for (const m of perModel) {
    if (!cache.has(m.provider)) cache.set(m.provider, BAR_HUES[cache.size % BAR_HUES.length]);
  }
  return cache;
}

function sortRows(rows: FreeBudgetPerModel[], sort: FreeBudgetSort): FreeBudgetPerModel[] {
  const copy = rows.slice();
  if (sort === "name") return copy.sort((a, b) => a.displayName.localeCompare(b.displayName));
  if (sort === "provider")
    return copy.sort((a, b) => a.provider.localeCompare(b.provider) || b.monthlyTokens - a.monthlyTokens);
  return copy.sort((a, b) => b.monthlyTokens - a.monthlyTokens || b.creditTokens - a.creditTokens);
}

function tosBadge(tos: string): { icon: string; cls: string; title: string } | null {
  if (tos === "avoid") return { icon: "warning", cls: "text-amber-400", title: "ToS-restricted — review terms" };
  if (tos === "caution") return { icon: "bolt", cls: "text-text-muted", title: "Caution — personal-use / proxy clauses" };
  if (tos === "ok") return { icon: "check_circle", cls: "text-emerald-500", title: "Generally permissive" };
  return null;
}

// ────────────────────────────────────────────────────────────────────────────
// KPI tile
// ────────────────────────────────────────────────────────────────────────────

function Kpi({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex flex-col gap-0.5 px-3 py-2 rounded-md border border-border bg-black/[0.015] dark:bg-white/[0.015]">
      <span className="text-[10px] uppercase tracking-wide text-text-muted">{label}</span>
      <span className={`text-[19px] font-bold tabular-nums ${valueClass ?? "text-text-main"}`}>{value}</span>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Pure view (SSR-testable — no hooks). Sort/filter are controlled via props.
// ────────────────────────────────────────────────────────────────────────────

export function FreeBudgetView({
  data,
  sort = "tokens",
  hideAvoid = false,
}: {
  data: FreeBudgetData;
  sort?: FreeBudgetSort;
  hideAvoid?: boolean;
}) {
  const {
    steadyRecurringTokens,
    firstMonthRealisticTokens,
    usedThisMonth,
    remaining,
    perModel,
    boostMonthlyTokens = 0,
    uncappedProviders = [],
  } = data;

  const pct = steadyRecurringTokens > 0 ? Math.round((remaining / steadyRecurringTokens) * 100) : 0;
  const avoidModels = perModel.filter((m) => m.tos === "avoid");

  const barSegments = buildBarSegments(perModel);
  const totalBarTokens = barSegments.reduce((s, seg) => s + seg.tokens, 0);
  const providerColor = colorForProvider(perModel);

  // Table rows: only entries with real budget; optional hide-ToS-avoid; sorted.
  let rows = perModel.filter((m) => m.monthlyTokens > 0 || m.creditTokens > 0);
  if (hideAvoid) rows = rows.filter((m) => m.tos !== "avoid");
  rows = sortRows(rows, sort);

  return (
    <div className="rounded-lg border border-border bg-surface">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
        <span className="material-symbols-outlined text-[14px] text-text-muted">savings</span>
        <span className="text-[13px] font-semibold text-text-main">Free-token budget</span>
        <span className="ml-auto text-[11px] text-text-muted tabular-nums">
          {fmt(remaining)} remaining · {pct}% of {fmt(steadyRecurringTokens)}
        </span>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-3 pt-3">
        <Kpi label="Steady / month" value={`~${fmt(steadyRecurringTokens)}`} />
        <Kpi label="First month (+ credits)" value={`~${fmt(firstMonthRealisticTokens)}`} valueClass="text-emerald-500" />
        <Kpi label="Used this month" value={fmt(usedThisMonth)} valueClass="text-text-muted" />
      </div>

      {/* Stacked bar — pool-deduped; segments sum to steadyRecurringTokens */}
      {barSegments.length > 0 && (
        <div className="px-3 pt-3">
          <div className="flex h-3 rounded-sm overflow-hidden w-full" data-testid="budget-bar">
            {barSegments.map((seg) => {
              const width = totalBarTokens > 0 ? ((seg.tokens / totalBarTokens) * 100).toFixed(2) : "0";
              return (
                <div
                  key={seg.key}
                  title={`${seg.label}: ${fmt(seg.tokens)}`}
                  data-testid="bar-segment"
                  style={{ flexBasis: `${width}%`, background: seg.color, minWidth: "2px" }}
                />
              );
            })}
          </div>
          <p className="mt-1 text-[10.5px] text-text-muted">
            Each segment = one free pool · pool-deduped, honest counting (no inflated rate-limit ceilings).
          </p>
        </div>
      )}

      {/* Boost + uncapped callouts */}
      {boostMonthlyTokens > 0 && (
        <div className="mx-3 mt-2 flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
          <span className="material-symbols-outlined text-[14px] text-emerald-500">bolt</span>
          <span className="text-[11px] text-emerald-500">
            Unlock ~{fmt(boostMonthlyTokens)} more/mo with a one-time $10 OpenRouter top-up (50 → 1000 req/day)
          </span>
        </div>
      )}
      {uncappedProviders.length > 0 && (
        <div className="mx-3 mt-2 rounded-md border border-border bg-black/[0.015] dark:bg-white/[0.015] px-3 py-2">
          <span className="text-[11px] text-text-muted">
            Permanently free, no published cap (rate-limited) — real access, not counted in the headline:
          </span>
          <div className="mt-1 flex flex-wrap gap-1">
            {uncappedProviders.map((p) => (
              <span
                key={p}
                className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10.5px] text-text-muted tabular-nums"
                style={{ borderColor: providerColor.get(p) ?? "var(--border)" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ToS-restricted callout */}
      {avoidModels.length > 0 && (
        <div className="mx-3 mt-2 flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-1.5">
          <span className="material-symbols-outlined text-[14px] text-text-muted">warning</span>
          <span className="text-[11px] text-amber-400">
            {avoidModels.length} model{avoidModels.length !== 1 ? "s" : ""} flagged as ToS-restricted — you decide
          </span>
        </div>
      )}

      {/* Per-model table */}
      <div className="px-3 pb-3 pt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]" data-testid="budget-table">
            <thead>
              <tr className="text-text-muted text-left border-b border-border">
                <th className="font-medium py-1 pr-2">Provider</th>
                <th className="font-medium py-1 pr-2">Model</th>
                <th className="font-medium py-1 pr-2">Type</th>
                <th className="font-medium py-1 pr-2 text-right">Tokens/mo</th>
                <th className="font-medium py-1 pr-1 text-center">ToS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => {
                const badge = tosBadge(m.tos);
                const amount =
                  m.monthlyTokens > 0
                    ? fmt(m.monthlyTokens)
                    : m.creditTokens > 0
                      ? `${fmt(m.creditTokens)} credit`
                      : "—";
                return (
                  <tr
                    key={`${m.provider}:${m.modelId}`}
                    className="border-b border-border/40 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                  >
                    <td className="py-1 pr-2">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="inline-block w-2 h-2 rounded-sm flex-shrink-0"
                          style={{ background: providerColor.get(m.provider) ?? BAR_HUES[0] }}
                        />
                        <span className="text-text-muted">{m.provider}</span>
                      </span>
                    </td>
                    <td className="py-1 pr-2 text-text-main truncate max-w-[180px]" title={m.modelId}>
                      {m.displayName}
                    </td>
                    <td className="py-1 pr-2 text-text-muted">{FREE_TYPE_LABEL[m.freeType] ?? m.freeType}</td>
                    <td className="py-1 pr-2 text-right text-text-main tabular-nums">{amount}</td>
                    <td className="py-1 pr-1 text-center">
                      {badge && (
                        <span
                          className={`material-symbols-outlined text-[13px] ${badge.cls}`}
                          title={badge.title}
                        >
                          {badge.icon}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Fetch + interactivity wrapper (client component)
// ────────────────────────────────────────────────────────────────────────────

export default function FreeBudgetCard() {
  const [data, setData] = useState<FreeBudgetData | null>(null);
  const [sort, setSort] = useState<FreeBudgetSort>("tokens");
  const [hideAvoid, setHideAvoid] = useState(false);

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

  return (
    <div className="flex flex-col gap-2">
      {/* Controls */}
      <div className="flex items-center gap-3 px-1 text-[11px] text-text-muted">
        <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={hideAvoid}
            onChange={(e) => setHideAvoid(e.target.checked)}
            className="accent-indigo-500"
          />
          Hide ToS-restricted
        </label>
        <span className="ml-auto inline-flex items-center gap-1.5">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as FreeBudgetSort)}
            className="rounded border border-border bg-surface px-1.5 py-0.5 text-[11px] text-text-main"
          >
            <option value="tokens">Tokens/mo</option>
            <option value="provider">Provider</option>
            <option value="name">Model name</option>
          </select>
        </span>
      </div>
      <FreeBudgetView data={data} sort={sort} hideAvoid={hideAvoid} />
    </div>
  );
}
