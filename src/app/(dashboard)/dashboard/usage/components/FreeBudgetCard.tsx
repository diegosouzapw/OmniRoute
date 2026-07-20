"use client";

import { useState, useEffect, useMemo } from "react";
import React from "react";
import { useTranslations } from "next-intl";
import { matchesSearch } from "@/shared/utils/turkishText";

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
  /** ISO timestamp of the last catalog update. Absent/null → freshness is not shown. */
  catalogUpdatedAt?: string | null;
  /**
   * Providers callable with nothing configured, derived server-side from real
   * routing behaviour (see shared/utils/providerCredentialRequirement). NOT the
   * same as freeType: "keyless", which only means "not quantifiable in tokens"
   * — several of those reject anonymous calls with 401/403.
   */
  noCredentialProviders?: string[];
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

/**
 * Compact "N unit(s) ago" formatting for the catalog freshness indicator.
 * Returns null on unparsable input so callers can degrade to "show nothing".
 */
export function relativeTimeFromNow(iso: string, now: number = Date.now()): string | null {
  const ts = Date.parse(iso);
  if (Number.isNaN(ts)) return null;
  const diffMs = now - ts;
  if (diffMs < 60_000) return "just now";
  const min = Math.floor(diffMs / 60_000);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d ago`;
  const month = Math.floor(day / 30);
  if (month < 12) return `${month}mo ago`;
  const year = Math.floor(month / 12);
  return `${year}y ago`;
}

interface FreeBudgetLabels {
  title: string;
  remaining: (remaining: string, percent: number, total: string) => string;
  steadyMonth: string;
  firstMonth: string;
  usedThisMonth: string;
  segmentHint: string;
  boost: (tokens: string) => string;
  uncapped: string;
  tosRestricted: (count: number) => string;
  provider: string;
  model: string;
  type: string;
  tokensMonth: string;
  credit: (tokens: string) => string;
  freeTypes: Record<string, string>;
  tosTitles: Record<string, string>;
}

const DEFAULT_LABELS: FreeBudgetLabels = {
  title: "Free-token budget",
  remaining: (remaining, percent, total) => `${remaining} remaining · ${percent}% of ${total}`,
  steadyMonth: "Steady / month",
  firstMonth: "First month (+ credits)",
  usedThisMonth: "Used this month",
  segmentHint:
    "Each segment = one free pool · pool-deduped, honest counting (no inflated rate-limit ceilings).",
  boost: (tokens) =>
    `Unlock ~${tokens} more/mo with a one-time $10 OpenRouter top-up (50 → 1000 req/day)`,
  uncapped:
    "Permanently free, no published cap (rate-limited) — real access, not counted in the headline:",
  tosRestricted: (count) =>
    `${count} model${count === 1 ? "" : "s"} flagged as ToS-restricted — you decide`,
  provider: "Provider",
  model: "Model",
  type: "Type",
  tokensMonth: "Tokens/mo",
  credit: (tokens) => `${tokens} credit`,
  freeTypes: {
    "recurring-daily": "daily",
    "recurring-monthly": "monthly",
    "recurring-credit": "credit/mo",
    "recurring-uncapped": "uncapped",
    "one-time-initial": "signup credit",
    keyless: "keyless",
    discontinued: "discontinued",
  },
  tosTitles: {
    avoid: "ToS-restricted — review terms",
    caution: "Caution — personal-use / proxy clauses",
    ok: "Generally permissive",
  },
};

// Distinct hues for stacked bar segments (cycling)
const BAR_HUES = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
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
        seenPools.set(m.poolKey, {
          ...existing,
          tokens: m.monthlyTokens,
          label: `${m.displayName} (${m.provider})`,
        });
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
    return copy.sort(
      (a, b) => a.provider.localeCompare(b.provider) || b.monthlyTokens - a.monthlyTokens
    );
  return copy.sort((a, b) => b.monthlyTokens - a.monthlyTokens || b.creditTokens - a.creditTokens);
}

/**
 * Substring filter across displayName / modelId / provider (case-insensitive).
 * Empty/whitespace-only query is a no-op (returns all rows).
 */
function filterRows(
  rows: FreeBudgetPerModel[],
  {
    search,
    providerFilter,
    keylessOnly,
    noCredentialProviders,
  }: {
    search: string;
    providerFilter: string;
    keylessOnly: boolean;
    noCredentialProviders: string[];
  }
): FreeBudgetPerModel[] {
  let out = rows;
  if (keylessOnly) out = out.filter((m) => noCredentialProviders.includes(m.provider));
  if (providerFilter !== "all") out = out.filter((m) => m.provider === providerFilter);
  if (search.trim()) {
    out = out.filter(
      (m) => matchesSearch(m.displayName, search) || matchesSearch(m.modelId, search) || matchesSearch(m.provider, search)
    );
  }
  return out;
}

function tosBadge(
  tos: string,
  labels: FreeBudgetLabels
): { icon: string; cls: string; title: string } | null {
  if (tos === "avoid") {
    return { icon: "warning", cls: "text-amber-400", title: labels.tosTitles.avoid };
  }
  if (tos === "caution") {
    return { icon: "bolt", cls: "text-text-muted", title: labels.tosTitles.caution };
  }
  if (tos === "ok") {
    return { icon: "check_circle", cls: "text-emerald-500", title: labels.tosTitles.ok };
  }
  return null;
}

// ────────────────────────────────────────────────────────────────────────────
// KPI tile
// ────────────────────────────────────────────────────────────────────────────

function Kpi({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex flex-col gap-0.5 px-3 py-2 rounded-md border border-border bg-black/[0.015] dark:bg-white/[0.015]">
      <span className="text-[10px] uppercase tracking-wide text-text-muted">{label}</span>
      <span className={`text-[19px] font-bold tabular-nums ${valueClass ?? "text-text-main"}`}>
        {value}
      </span>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Free-type badge (keyless gets an emerald highlight; the rest stay neutral)
// ────────────────────────────────────────────────────────────────────────────

function FreeTypeBadge({ freeType, label }: { freeType: string; label: string }) {
  const isKeyless = freeType === "keyless";
  return (
    <span
      data-testid="free-type-badge"
      className={`inline-flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap ${
        isKeyless
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
          : "border-border bg-black/[0.02] dark:bg-white/[0.03] text-text-muted"
      }`}
    >
      {isKeyless && <span className="material-symbols-outlined text-[10px]">lock_open</span>}
      {label}
    </span>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Pure view (SSR-testable — no hooks). Sort/filter are controlled via props.
// ────────────────────────────────────────────────────────────────────────────

export function FreeBudgetView({
  data,
  sort = "tokens",
  hideAvoid = false,
  search = "",
  providerFilter = "all",
  keylessOnly = false,
  labels = DEFAULT_LABELS,
}: {
  data: FreeBudgetData;
  sort?: FreeBudgetSort;
  hideAvoid?: boolean;
  search?: string;
  providerFilter?: string;
  keylessOnly?: boolean;
  labels?: FreeBudgetLabels;
}) {
  const {
    steadyRecurringTokens,
    firstMonthRealisticTokens,
    usedThisMonth,
    remaining,
    perModel,
    boostMonthlyTokens = 0,
    uncappedProviders = [],
    catalogUpdatedAt,
    noCredentialProviders = [],
  } = data;

  const pct = steadyRecurringTokens > 0 ? Math.round((remaining / steadyRecurringTokens) * 100) : 0;
  const avoidModels = perModel.filter((m) => m.tos === "avoid");

  const barSegments = buildBarSegments(perModel);
  const totalBarTokens = barSegments.reduce((s, seg) => s + seg.tokens, 0);
  const providerColor = colorForProvider(perModel);

  // "No API key required" — derived from routing behaviour, NOT from
  // freeType: "keyless". That field means "free access not quantifiable in
  // tokens"; probing the endpoints showed several of those rows (blackbox,
  // puter, iflytek, sparkdesk, friendliai, muse-spark-web) answering 401/403
  // with no credential. Listing them here would invite users to call providers
  // that reject them.
  const keylessModels = perModel.filter((m) => noCredentialProviders.includes(m.provider));
  const keylessProviders = Array.from(new Set(keylessModels.map((m) => m.provider))).sort();

  // Table rows: only entries with real budget; hide-ToS-avoid + search + provider + keyless filters; sorted.
  let rows = perModel.filter((m) => m.monthlyTokens > 0 || m.creditTokens > 0);
  if (hideAvoid) rows = rows.filter((m) => m.tos !== "avoid");
  rows = filterRows(rows, { search, providerFilter, keylessOnly, noCredentialProviders });
  rows = sortRows(rows, sort);

  const freshness = catalogUpdatedAt ? relativeTimeFromNow(catalogUpdatedAt) : null;

  return (
    <div className="rounded-lg border border-border bg-surface">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
        <span className="material-symbols-outlined text-[14px] text-text-muted">savings</span>
        <span className="text-[13px] font-semibold text-text-main">{labels.title}</span>
        {freshness && (
          <span
            data-testid="catalog-freshness"
            className="text-[10px] text-text-muted"
            title={catalogUpdatedAt ?? undefined}
          >
            · updated {freshness}
          </span>
        )}
        <span className="ml-auto text-[11px] text-text-muted tabular-nums">
          {labels.remaining(fmt(remaining), pct, fmt(steadyRecurringTokens))}
        </span>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-3 pt-3">
        <Kpi label={labels.steadyMonth} value={`~${fmt(steadyRecurringTokens)}`} />
        <Kpi
          label={labels.firstMonth}
          value={`~${fmt(firstMonthRealisticTokens)}`}
          valueClass="text-emerald-500"
        />
        <Kpi label={labels.usedThisMonth} value={fmt(usedThisMonth)} valueClass="text-text-muted" />
      </div>

      {/* Stacked bar — pool-deduped; segments sum to steadyRecurringTokens */}
      {barSegments.length > 0 && (
        <div className="px-3 pt-3">
          <div className="flex h-3 rounded-sm overflow-hidden w-full" data-testid="budget-bar">
            {barSegments.map((seg) => {
              const width =
                totalBarTokens > 0 ? ((seg.tokens / totalBarTokens) * 100).toFixed(2) : "0";
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
          <p className="mt-1 text-[10.5px] text-text-muted">{labels.segmentHint}</p>
        </div>
      )}

      {/* "No API key required" — highlighted overview of keyless providers */}
      {keylessProviders.length > 0 && (
        <div
          data-testid="keyless-section"
          className="mx-3 mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-2"
        >
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-emerald-500">lock_open</span>
            <span className="text-[11px] font-semibold text-emerald-500">No API key required</span>
            <span className="text-[10.5px] text-text-muted">
              ({keylessModels.length} model{keylessModels.length !== 1 ? "s" : ""} · {keylessProviders.length}{" "}
              provider{keylessProviders.length !== 1 ? "s" : ""})
            </span>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {keylessProviders.map((p) => (
              <span
                key={p}
                className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] text-text-muted tabular-nums"
                style={{ borderColor: providerColor.get(p) ?? "var(--border)" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Boost + uncapped callouts */}
      {boostMonthlyTokens > 0 && (
        <div className="mx-3 mt-2 flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
          <span className="material-symbols-outlined text-[14px] text-emerald-500">bolt</span>
          <span className="text-[11px] text-emerald-500">
            {labels.boost(fmt(boostMonthlyTokens))}
          </span>
        </div>
      )}
      {uncappedProviders.length > 0 && (
        <div className="mx-3 mt-2 rounded-md border border-border bg-black/[0.015] dark:bg-white/[0.015] px-3 py-2">
          <span className="text-[11px] text-text-muted">{labels.uncapped}</span>
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
            {labels.tosRestricted(avoidModels.length)}
          </span>
        </div>
      )}

      {/* Per-model table */}
      <div className="px-3 pb-3 pt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]" data-testid="budget-table">
            <thead>
              <tr className="text-text-muted text-left border-b border-border">
                <th className="font-medium py-1 pr-2">{labels.provider}</th>
                <th className="font-medium py-1 pr-2">{labels.model}</th>
                <th className="font-medium py-1 pr-2">{labels.type}</th>
                <th className="font-medium py-1 pr-2 text-right">{labels.tokensMonth}</th>
                <th className="font-medium py-1 pr-1 text-center">ToS</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-3 text-center text-text-muted">
                    No models match the current filters.
                  </td>
                </tr>
              )}
              {rows.map((m) => {
                const badge = tosBadge(m.tos, labels);
                const amount =
                  m.monthlyTokens > 0
                    ? fmt(m.monthlyTokens)
                    : m.creditTokens > 0
                      ? labels.credit(fmt(m.creditTokens))
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
                    <td
                      className="py-1 pr-2 text-text-main truncate max-w-[180px]"
                      title={m.modelId}
                    >
                      {m.displayName}
                    </td>
                    <td className="py-1 pr-2">
                      <FreeTypeBadge
                        freeType={m.freeType}
                        label={labels.freeTypes[m.freeType] ?? m.freeType}
                      />
                    </td>
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
  const t = useTranslations("freeBudget");
  const [data, setData] = useState<FreeBudgetData | null>(null);
  const [sort, setSort] = useState<FreeBudgetSort>("tokens");
  const [hideAvoid, setHideAvoid] = useState(false);
  const [search, setSearch] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [keylessOnly, setKeylessOnly] = useState(false);

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

  const providers = useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.perModel.map((m) => m.provider))).sort();
  }, [data]);

  if (!data) return null;

  return (
    <div className="flex flex-col gap-2">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 px-1 text-[11px] text-text-muted">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search model, provider…"
          aria-label="Search free models"
          data-testid="budget-search-input"
          className="rounded border border-border bg-surface px-2 py-1 text-[11px] text-text-main placeholder:text-text-muted min-w-[160px]"
        />
        <select
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          aria-label="Filter by provider"
          data-testid="budget-provider-select"
          className="rounded border border-border bg-surface px-1.5 py-1 text-[11px] text-text-main"
        >
          <option value="all">All providers</option>
          {providers.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={keylessOnly}
            onChange={(e) => setKeylessOnly(e.target.checked)}
            className="accent-emerald-500"
            data-testid="budget-keyless-toggle"
          />
          Keyless only
        </label>
        <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={hideAvoid}
            onChange={(e) => setHideAvoid(e.target.checked)}
            className="accent-indigo-500"
          />
          {t("hideTosRestricted")}
        </label>
        <span className="ml-auto inline-flex items-center gap-1.5">
          {t("sort")}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as FreeBudgetSort)}
            className="rounded border border-border bg-surface px-1.5 py-0.5 text-[11px] text-text-main"
          >
            <option value="tokens">{t("tokensMonth")}</option>
            <option value="provider">{t("provider")}</option>
            <option value="name">{t("modelName")}</option>
          </select>
        </span>
      </div>
      <FreeBudgetView
        data={data}
        sort={sort}
        hideAvoid={hideAvoid}
        search={search}
        providerFilter={providerFilter}
        keylessOnly={keylessOnly}
        labels={{
          title: t("title"),
          remaining: (remaining, percent, total) => t("remaining", { remaining, percent, total }),
          steadyMonth: t("steadyMonth"),
          firstMonth: t("firstMonth"),
          usedThisMonth: t("usedThisMonth"),
          segmentHint: t("segmentHint"),
          boost: (tokens) => t("boost", { tokens }),
          uncapped: t("uncapped"),
          tosRestricted: (count) => t("tosRestricted", { count }),
          provider: t("provider"),
          model: t("model"),
          type: t("type"),
          tokensMonth: t("tokensMonth"),
          credit: (tokens) => t("credit", { tokens }),
          freeTypes: {
            "recurring-daily": t("freeType.daily"),
            "recurring-monthly": t("freeType.monthly"),
            "recurring-credit": t("freeType.creditMonthly"),
            "recurring-uncapped": t("freeType.uncapped"),
            "one-time-initial": t("freeType.signupCredit"),
            keyless: t("freeType.keyless"),
            discontinued: t("freeType.discontinued"),
          },
          tosTitles: {
            avoid: t("tosTitle.avoid"),
            caution: t("tosTitle.caution"),
            ok: t("tosTitle.ok"),
          },
        }}
      />
    </div>
  );
}
