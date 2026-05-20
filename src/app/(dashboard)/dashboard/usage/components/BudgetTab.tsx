"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card, Button, Input, EmptyState } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

type ApiKey = {
  id: string;
  name?: string;
  provider?: string;
};

type BudgetSummary = {
  dailyLimitUsd?: number;
  weeklyLimitUsd?: number;
  monthlyLimitUsd?: number;
  warningThreshold?: number | null;
  resetInterval?: "daily" | "weekly" | "monthly" | null;
  resetTime?: string | null;
  totalCostToday?: number;
  totalCostMonth?: number;
  totalCostPeriod?: number;
  activeLimitUsd?: number;
  budgetResetAt?: number | null;
  nextResetAt?: number | null;
  periodStartAt?: number | null;
  budgetCheck?: { allowed: boolean; remaining?: number };
};

type KeyRow = ApiKey & { budget: BudgetSummary | null };

type StatusKey = "all" | "blocked" | "alerting" | "warning" | "safe" | "no-limit";

type Template = {
  id: string;
  name: string;
  emoji: string;
  dailyLimitUsd?: number;
  weeklyLimitUsd?: number;
  monthlyLimitUsd?: number;
  warningThreshold: number;
  resetInterval: "daily" | "weekly" | "monthly";
  resetTime: string;
};

type ProviderBreakdown = { provider: string; cost: number; pct: number };

const LS_TEMPLATES = "omniroute:budget:templates";

const DEFAULT_TEMPLATES: Template[] = [
  {
    id: "tpl-prod",
    name: "Production",
    emoji: "💎",
    dailyLimitUsd: 50,
    monthlyLimitUsd: 1000,
    warningThreshold: 80,
    resetInterval: "monthly",
    resetTime: "00:00",
  },
  {
    id: "tpl-dev",
    name: "Dev",
    emoji: "🛠",
    dailyLimitUsd: 10,
    monthlyLimitUsd: 200,
    warningThreshold: 75,
    resetInterval: "monthly",
    resetTime: "00:00",
  },
  {
    id: "tpl-ci",
    name: "CI",
    emoji: "📊",
    monthlyLimitUsd: 500,
    warningThreshold: 90,
    resetInterval: "monthly",
    resetTime: "00:00",
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function statusOf(row: KeyRow): StatusKey {
  const b = row.budget;
  if (!b) return "no-limit";
  const limit = b.activeLimitUsd || b.dailyLimitUsd || b.monthlyLimitUsd || 0;
  if (limit <= 0) return "no-limit";
  const used = b.totalCostPeriod ?? b.totalCostToday ?? 0;
  const pct = limit > 0 ? (used / limit) * 100 : 0;
  const warnPct = (b.warningThreshold ?? 0.8) * 100;
  if (pct >= 100) return "blocked";
  if (pct >= warnPct) return "alerting";
  if (pct >= 50) return "warning";
  return "safe";
}

function pctUsed(row: KeyRow): number {
  const b = row.budget;
  if (!b) return 0;
  const limit = b.activeLimitUsd || b.dailyLimitUsd || b.monthlyLimitUsd || 0;
  if (limit <= 0) return 0;
  const used = b.totalCostPeriod ?? b.totalCostToday ?? 0;
  return (used / limit) * 100;
}

// Project end-of-month spend based on current burn rate. Simple linear
// extrapolation: (monthly cost so far) / (days elapsed) * (days in month).
function projectEndOfMonth(monthlyCost: number, now = new Date()): number {
  const dayOfMonth = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  if (dayOfMonth <= 0) return monthlyCost;
  const burnRate = monthlyCost / dayOfMonth;
  return burnRate * daysInMonth;
}

const STATUS_META: Record<StatusKey, { label: string; tone: string; bg: string; dot: string }> = {
  all: { label: "All", tone: "text-text-main", bg: "bg-bg-subtle", dot: "var(--color-text-muted)" },
  blocked: {
    label: "Blocked",
    tone: "text-red-400",
    bg: "bg-red-500/10 border-red-500/30",
    dot: "#ef4444",
  },
  alerting: {
    label: "Alerting",
    tone: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/30",
    dot: "#f59e0b",
  },
  warning: {
    label: "Warning",
    tone: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/30",
    dot: "#eab308",
  },
  safe: {
    label: "Safe",
    tone: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30",
    dot: "#22c55e",
  },
  "no-limit": {
    label: "No limit",
    tone: "text-text-muted",
    bg: "bg-bg-subtle border-border",
    dot: "var(--color-text-muted)",
  },
};

// ────────────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────────────

export default function BudgetTab() {
  const t = useTranslations("usage");
  const locale = useLocale();
  const notify = useNotificationStore();

  const [rows, setRows] = useState<KeyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusKey>("all");
  const [sortKey, setSortKey] = useState<"usedDesc" | "todayDesc" | "monthDesc" | "name">(
    "usedDesc"
  );
  const [expandedKeyId, setExpandedKeyId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [templates] = useState<Template[]>(() => {
    if (typeof window === "undefined") return DEFAULT_TEMPLATES;
    try {
      const saved = localStorage.getItem(LS_TEMPLATES);
      if (saved) return JSON.parse(saved);
    } catch {
      /* ignore */
    }
    return DEFAULT_TEMPLATES;
  });
  const [breakdownCache, setBreakdownCache] = useState<Record<string, ProviderBreakdown[]>>({});

  const formatCurrency = useCallback(
    (value: number | undefined | null) =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(Number(value || 0)),
    [locale]
  );

  const formatDateTime = useCallback(
    (value: number | string | null | undefined) =>
      value
        ? new Intl.DateTimeFormat(locale, {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "UTC",
          }).format(new Date(value))
        : "—",
    [locale]
  );

  // ── Data fetching ────────────────────────────────────────────────────────

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      // Bulk: one request for the key list + one for every key's budget
      // (was N+1: one budget request per key).
      const [keysRes, bulkRes] = await Promise.all([
        fetch("/api/keys"),
        fetch("/api/usage/budget/bulk"),
      ]);
      const keysData = keysRes.ok ? await keysRes.json() : null;
      const keys: ApiKey[] = Array.isArray(keysData) ? keysData : keysData?.keys || [];

      const bulkPayload = bulkRes.ok ? await bulkRes.json() : null;
      const budgetsMap: Record<string, BudgetSummary> =
        bulkPayload && typeof bulkPayload === "object" && bulkPayload.budgets
          ? bulkPayload.budgets
          : {};

      setRows(keys.map((k) => ({ ...k, budget: budgetsMap[k.id] ?? null })));
    } catch (err) {
      console.error("[Budget] load failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const fetchBreakdown = useCallback(async (apiKeyId: string) => {
    try {
      const r = await fetch(`/api/usage/analytics?range=30d&apiKeyIds=${apiKeyId}`);
      if (!r.ok) return;
      const data = await r.json();
      const arr = Array.isArray(data?.byProvider) ? data.byProvider : [];
      const total =
        arr.reduce((s: number, p: any) => s + Number(p?.totalCost ?? p?.cost ?? 0), 0) || 0;
      const breakdown: ProviderBreakdown[] = arr
        .map((p: any) => {
          const cost = Number(p?.totalCost ?? p?.cost ?? 0);
          return {
            provider: String(p?.provider ?? "unknown"),
            cost,
            pct: total > 0 ? (cost / total) * 100 : 0,
          };
        })
        .filter((p: ProviderBreakdown) => p.cost > 0)
        .sort((a: ProviderBreakdown, b: ProviderBreakdown) => b.cost - a.cost);
      setBreakdownCache((prev) => ({ ...prev, [apiKeyId]: breakdown }));
    } catch {
      /* breakdown is best-effort */
    }
  }, []);

  // ── Derived data ─────────────────────────────────────────────────────────

  const visibleRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = (r: KeyRow) =>
      !query ||
      (r.name || "").toLowerCase().includes(query) ||
      r.id.toLowerCase().includes(query) ||
      (r.provider || "").toLowerCase().includes(query);
    const matchesStatus = (r: KeyRow) => statusFilter === "all" || statusOf(r) === statusFilter;
    const filtered = rows.filter((r) => matchesQuery(r) && matchesStatus(r));

    return [...filtered].sort((a, b) => {
      if (sortKey === "name") return (a.name || a.id).localeCompare(b.name || b.id);
      if (sortKey === "todayDesc")
        return (b.budget?.totalCostToday || 0) - (a.budget?.totalCostToday || 0);
      if (sortKey === "monthDesc")
        return (b.budget?.totalCostMonth || 0) - (a.budget?.totalCostMonth || 0);
      // usedDesc
      return pctUsed(b) - pctUsed(a);
    });
  }, [rows, searchQuery, statusFilter, sortKey]);

  const stats = useMemo(() => {
    let today = 0;
    let month = 0;
    const counts = { blocked: 0, alerting: 0, warning: 0, safe: 0, noLimit: 0, active: 0 };
    for (const r of rows) {
      today += r.budget?.totalCostToday || 0;
      month += r.budget?.totalCostMonth || 0;
      const st = statusOf(r);
      if (st === "blocked") counts.blocked += 1;
      else if (st === "alerting") counts.alerting += 1;
      else if (st === "warning") counts.warning += 1;
      else if (st === "safe") counts.safe += 1;
      else counts.noLimit += 1;
      if ((r.budget?.totalCostMonth || 0) > 0) counts.active += 1;
    }
    return { today, month, projectionEom: projectEndOfMonth(month), counts };
  }, [rows]);

  const statusCounts = useMemo(() => {
    const counts: Record<StatusKey, number> = {
      all: rows.length,
      blocked: 0,
      alerting: 0,
      warning: 0,
      safe: 0,
      "no-limit": 0,
    };
    for (const r of rows) counts[statusOf(r)] += 1;
    return counts;
  }, [rows]);

  // ── Mutations ────────────────────────────────────────────────────────────

  const saveBudgetForKey = useCallback(
    async (
      apiKeyId: string,
      payload: Partial<BudgetSummary> & { warningThresholdPct?: number }
    ) => {
      setSaving(true);
      try {
        const body: Record<string, unknown> = {
          apiKeyId,
          dailyLimitUsd: payload.dailyLimitUsd,
          weeklyLimitUsd: payload.weeklyLimitUsd,
          monthlyLimitUsd: payload.monthlyLimitUsd,
          warningThreshold:
            payload.warningThresholdPct !== undefined
              ? payload.warningThresholdPct / 100
              : payload.warningThreshold,
          resetInterval: payload.resetInterval,
          resetTime: payload.resetTime,
        };
        // Strip undefined keys
        Object.keys(body).forEach((k) => body[k] === undefined && delete body[k]);

        const res = await fetch("/api/usage/budget", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        notify.success(t("budgetSaved"));
        await loadAll();
      } catch (err) {
        console.error("[Budget] save failed", err);
        notify.error(t("budgetSaveFailed"));
      } finally {
        setSaving(false);
      }
    },
    [loadAll, notify, t]
  );

  const applyTemplateToSelected = useCallback(
    async (template: Template) => {
      if (selectedIds.size === 0) {
        notify.error("No keys selected");
        return;
      }
      setSaving(true);
      try {
        await Promise.all(
          Array.from(selectedIds).map((id) =>
            fetch("/api/usage/budget", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                apiKeyId: id,
                dailyLimitUsd: template.dailyLimitUsd,
                weeklyLimitUsd: template.weeklyLimitUsd,
                monthlyLimitUsd: template.monthlyLimitUsd,
                warningThreshold: template.warningThreshold / 100,
                resetInterval: template.resetInterval,
                resetTime: template.resetTime,
              }),
            })
          )
        );
        notify.success(`Applied "${template.name}" to ${selectedIds.size} keys`);
        setSelectedIds(new Set());
        await loadAll();
      } catch {
        notify.error("Failed to apply template");
      } finally {
        setSaving(false);
      }
    },
    [loadAll, notify, selectedIds]
  );

  // ── Effects ──────────────────────────────────────────────────────────────

  useEffect(() => {
    if (expandedKeyId && !breakdownCache[expandedKeyId]) {
      fetchBreakdown(expandedKeyId);
    }
  }, [expandedKeyId, breakdownCache, fetchBreakdown]);

  // ── Render ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-text-muted p-8 animate-pulse">
        <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
        {t("loadingBudgetData")}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <EmptyState
        icon="vpn_key"
        title={t("noApiKeysTitle")}
        description={t("noApiKeysDescription")}
      />
    );
  }

  // True when at least one key's own projected end-of-month spend exceeds
  // that key's monthly limit. Comparing the aggregate projection against an
  // individual limit caused false positives.
  const projectionOverBudget = rows.some((r) => {
    const m = r.budget?.monthlyLimitUsd || 0;
    if (m <= 0) return false;
    const keyProjection = projectEndOfMonth(r.budget?.totalCostMonth || 0);
    return keyProjection > m;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Hero KPIs */}
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-primary">
                account_balance_wallet
              </span>
              Budget
            </h2>
            <p className="text-text-muted text-xs mt-0.5">
              Set daily/weekly/monthly spend limits per API key
            </p>
          </div>
          <span className="text-[11px] text-text-muted">
            {templates.length} templates · edit via localStorage:{" "}
            <code className="text-text-main">{LS_TEMPLATES}</code>
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
          <KpiBlock label="Today" value={formatCurrency(stats.today)} />
          <KpiBlock label="This month" value={formatCurrency(stats.month)} />
          <KpiBlock
            label="Proj EOM"
            value={formatCurrency(stats.projectionEom)}
            tone={projectionOverBudget ? "amber" : undefined}
            hint={projectionOverBudget ? "above limit ⚠" : "on track"}
          />
          <KpiBlock
            label="Blocked"
            value={String(stats.counts.blocked)}
            tone={stats.counts.blocked > 0 ? "red" : undefined}
          />
          <KpiBlock
            label="At risk"
            value={String(stats.counts.alerting)}
            tone={stats.counts.alerting > 0 ? "amber" : undefined}
            hint="≥ warning"
          />
          <KpiBlock label="Active keys" value={`${stats.counts.active} / ${rows.length}`} />
        </div>
      </Card>

      {/* Filters + Templates */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[260px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search keys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-bg-base border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as typeof sortKey)}
            className="bg-bg-base border border-border rounded-md px-2 py-1.5 text-xs text-text-main cursor-pointer"
          >
            <option value="usedDesc">Sort: % Used ↓</option>
            <option value="todayDesc">Sort: Today $ ↓</option>
            <option value="monthDesc">Sort: Month $ ↓</option>
            <option value="name">Sort: Name (A–Z)</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {(["all", "blocked", "alerting", "warning", "safe", "no-limit"] as StatusKey[]).map(
            (key) => {
              const meta = STATUS_META[key];
              const active = statusFilter === key;
              const count = statusCounts[key] || 0;
              if (key !== "all" && count === 0) return null;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStatusFilter(key)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                    active
                      ? meta.bg + " " + meta.tone
                      : "border-border text-text-muted bg-bg-subtle hover:text-text-main"
                  }`}
                >
                  {key !== "all" && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.dot }} />
                  )}
                  <span>{meta.label}</span>
                  <span className="opacity-70">{count}</span>
                </button>
              );
            }
          )}
        </div>

        {templates.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
            <span className="text-text-muted font-semibold uppercase tracking-wide mr-1">
              Templates:
            </span>
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => applyTemplateToSelected(tpl)}
                disabled={selectedIds.size === 0 || saving}
                title={
                  selectedIds.size === 0
                    ? "Select keys first to apply"
                    : `Apply to ${selectedIds.size} selected key(s)`
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border bg-bg-subtle text-text-main hover:bg-black/[0.04] dark:hover:bg-white/[0.04] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>{tpl.emoji}</span>
                <span>{tpl.name}</span>
                <span className="text-text-muted">
                  {tpl.monthlyLimitUsd ? `$${tpl.monthlyLimitUsd}/mo` : `$${tpl.dailyLimitUsd}/d`}
                </span>
              </button>
            ))}
            {selectedIds.size > 0 && (
              <span className="text-text-muted ml-2">
                {selectedIds.size} selected · click a template to apply
              </span>
            )}
          </div>
        )}
      </div>

      {/* Multi-key table */}
      <div className="rounded-xl border border-border overflow-hidden bg-surface">
        <div
          className="items-center px-3 py-2 border-b border-border bg-bg-subtle/40 text-[10px] font-semibold uppercase tracking-wider text-text-muted"
          style={{
            display: "grid",
            gridTemplateColumns: "24px 28px minmax(180px,1.6fr) 90px 100px 90px 100px 80px 100px",
            gap: "8px",
          }}
        >
          <div>
            <input
              type="checkbox"
              checked={selectedIds.size > 0 && selectedIds.size === visibleRows.length}
              ref={(el) => {
                if (el)
                  el.indeterminate = selectedIds.size > 0 && selectedIds.size < visibleRows.length;
              }}
              onChange={(e) =>
                setSelectedIds(e.target.checked ? new Set(visibleRows.map((r) => r.id)) : new Set())
              }
            />
          </div>
          <div></div>
          <div>Key</div>
          <div className="text-right">Today</div>
          <div className="text-right">Month</div>
          <div className="text-right">Daily lim</div>
          <div className="text-right">Monthly lim</div>
          <div className="text-right">Used %</div>
          <div className="text-center">Status</div>
        </div>

        {visibleRows.length === 0 ? (
          <div className="py-10 text-center text-text-muted text-sm">No keys match filters</div>
        ) : (
          visibleRows.map((row, idx) => (
            <BudgetRow
              key={row.id}
              row={row}
              isLast={idx === visibleRows.length - 1}
              isExpanded={expandedKeyId === row.id}
              isSelected={selectedIds.has(row.id)}
              onToggleExpand={() => setExpandedKeyId(expandedKeyId === row.id ? null : row.id)}
              onToggleSelect={() =>
                setSelectedIds((prev) => {
                  const next = new Set(prev);
                  next.has(row.id) ? next.delete(row.id) : next.add(row.id);
                  return next;
                })
              }
              formatCurrency={formatCurrency}
              formatDateTime={formatDateTime}
              breakdown={breakdownCache[row.id]}
              onSave={(payload) => saveBudgetForKey(row.id, payload)}
              saving={saving}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────────────────────

function KpiBlock({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "amber" | "red";
}) {
  const color =
    tone === "red" ? "text-red-400" : tone === "amber" ? "text-amber-400" : "text-text-main";
  return (
    <div className="rounded-lg border border-border/40 bg-bg-subtle/30 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-text-muted font-semibold truncate">
        {label}
      </div>
      <div className={`text-xl font-bold tabular-nums leading-tight ${color}`}>{value}</div>
      {hint && <div className="text-[10px] text-text-muted truncate">{hint}</div>}
    </div>
  );
}

function ProgressBarTinyColored({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const color = pct >= 100 ? "#ef4444" : pct >= 80 ? "#f59e0b" : pct >= 50 ? "#eab308" : "#22c55e";
  return (
    <div className="w-full h-1 rounded-sm bg-black/[0.06] dark:bg-white/[0.06] overflow-hidden">
      <div className="h-full" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

function BudgetRow({
  row,
  isLast,
  isExpanded,
  isSelected,
  onToggleExpand,
  onToggleSelect,
  formatCurrency,
  formatDateTime,
  breakdown,
  onSave,
  saving,
}: {
  row: KeyRow;
  isLast: boolean;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleExpand: () => void;
  onToggleSelect: () => void;
  formatCurrency: (v: number | undefined) => string;
  formatDateTime: (v: number | string | null | undefined) => string;
  breakdown?: ProviderBreakdown[];
  onSave: (payload: any) => void;
  saving: boolean;
}) {
  const status = statusOf(row);
  const meta = STATUS_META[status];
  const today = row.budget?.totalCostToday || 0;
  const month = row.budget?.totalCostMonth || 0;
  const daily = row.budget?.dailyLimitUsd || 0;
  const monthly = row.budget?.monthlyLimitUsd || 0;
  const usedPct = pctUsed(row);

  return (
    <div style={{ borderBottom: !isLast || isExpanded ? "1px solid var(--color-border)" : "none" }}>
      <div
        className="items-center px-3 py-2.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
        style={{
          display: "grid",
          gridTemplateColumns: "24px 28px minmax(180px,1.6fr) 90px 100px 90px 100px 80px 100px",
          gap: "8px",
          borderLeft: `3px solid ${status === "all" ? "transparent" : meta.dot}`,
        }}
      >
        {/* Checkbox */}
        <div onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" checked={isSelected} onChange={onToggleSelect} />
        </div>

        {/* Expand chevron (clickable trigger) */}
        <button
          type="button"
          onClick={onToggleExpand}
          className="border-none bg-transparent p-0 flex items-center justify-center cursor-pointer"
          aria-expanded={isExpanded}
        >
          <span className="material-symbols-outlined text-[18px] text-text-muted">
            {isExpanded ? "expand_more" : "chevron_right"}
          </span>
        </button>

        {/* Key info */}
        <button
          type="button"
          onClick={onToggleExpand}
          className="text-left border-none bg-transparent p-0 cursor-pointer min-w-0"
        >
          <div className="text-[13px] font-semibold text-text-main truncate">
            {row.name || row.id}
          </div>
          <div className="text-[10px] text-text-muted truncate">
            {row.provider ? `${row.provider} · ` : ""}
            {row.id}
          </div>
        </button>

        <div className="text-right text-[12px] tabular-nums">{formatCurrency(today)}</div>
        <div className="text-right text-[12px] tabular-nums">{formatCurrency(month)}</div>
        <div className="text-right text-[11px] text-text-muted tabular-nums">
          {daily > 0 ? `$${daily}/d` : "—"}
        </div>
        <div className="text-right text-[11px] text-text-muted tabular-nums">
          {monthly > 0 ? `$${monthly}/m` : "—"}
        </div>
        <div className="text-right flex flex-col items-end gap-0.5">
          <span className={`text-[11px] font-semibold tabular-nums ${meta.tone}`}>
            {daily > 0 || monthly > 0 ? `${Math.round(usedPct)}%` : "—"}
          </span>
          {(daily > 0 || monthly > 0) && (
            <div className="w-14">
              <ProgressBarTinyColored value={usedPct} max={100} />
            </div>
          )}
        </div>
        <div className="text-center">
          <span
            className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold border ${meta.bg} ${meta.tone}`}
          >
            {meta.label.toUpperCase()}
          </span>
        </div>
      </div>

      {isExpanded && (
        <BudgetRowExpanded
          // Remount the panel (resetting form state) whenever the budget
          // snapshot changes — e.g. after a save round-trip. Avoids syncing
          // state via useEffect (a known antipattern under react-hooks/purity).
          key={budgetSnapshotKey(row.budget)}
          row={row}
          month={month}
          monthly={monthly}
          breakdown={breakdown}
          formatCurrency={formatCurrency}
          formatDateTime={formatDateTime}
          onSave={onSave}
          saving={saving}
        />
      )}
    </div>
  );
}

function budgetSnapshotKey(b: BudgetSummary | null | undefined): string {
  if (!b) return "empty";
  return [
    b.dailyLimitUsd ?? "",
    b.weeklyLimitUsd ?? "",
    b.monthlyLimitUsd ?? "",
    b.warningThreshold ?? "",
    b.resetInterval ?? "",
    b.resetTime ?? "",
  ].join("|");
}

function BudgetRowExpanded({
  row,
  month,
  monthly,
  breakdown,
  formatCurrency,
  formatDateTime,
  onSave,
  saving,
}: {
  row: KeyRow;
  month: number;
  monthly: number;
  breakdown?: ProviderBreakdown[];
  formatCurrency: (v: number | undefined) => string;
  formatDateTime: (v: number | string | null | undefined) => string;
  onSave: (payload: any) => void;
  saving: boolean;
}) {
  const t = useTranslations("usage");
  const projection = projectEndOfMonth(month);
  const projectionOver = monthly > 0 && projection > monthly;

  const [form, setForm] = useState({
    dailyLimitUsd: row.budget?.dailyLimitUsd ? String(row.budget.dailyLimitUsd) : "",
    weeklyLimitUsd: row.budget?.weeklyLimitUsd ? String(row.budget.weeklyLimitUsd) : "",
    monthlyLimitUsd: row.budget?.monthlyLimitUsd ? String(row.budget.monthlyLimitUsd) : "",
    warningThreshold: row.budget?.warningThreshold
      ? String(Math.round(row.budget.warningThreshold * 100))
      : "80",
    resetInterval: row.budget?.resetInterval || "daily",
    resetTime: row.budget?.resetTime || "00:00",
  });

  return (
    <div className="px-12 py-4 bg-bg-subtle/30 border-t border-border space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-md border border-border/40 bg-bg-base/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[11px] uppercase tracking-wide font-bold text-text-muted">
              Projection
            </h4>
            <span className="text-[10px] text-text-muted">linear extrapolation</span>
          </div>
          <div className="flex items-baseline gap-3">
            <div>
              <div className="text-[10px] text-text-muted">This month so far</div>
              <div className="text-lg font-bold tabular-nums">{formatCurrency(month)}</div>
            </div>
            <span className="text-text-muted">→</span>
            <div>
              <div className="text-[10px] text-text-muted">Projected end of month</div>
              <div
                className={`text-lg font-bold tabular-nums ${
                  projectionOver ? "text-amber-400" : "text-emerald-400"
                }`}
              >
                {formatCurrency(projection)}
                {projectionOver && (
                  <span className="text-[11px] ml-1.5">⚠ above ${monthly}/mo</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-border/40 bg-bg-base/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[11px] uppercase tracking-wide font-bold text-text-muted">
              Cost breakdown (30d)
            </h4>
            <span className="text-[10px] text-text-muted">by provider</span>
          </div>
          {breakdown === undefined ? (
            <div className="text-[11px] text-text-muted py-2 animate-pulse">Loading…</div>
          ) : breakdown.length === 0 ? (
            <div className="text-[11px] text-text-muted py-2">No spend in last 30 days</div>
          ) : (
            <div className="space-y-1.5">
              {breakdown.slice(0, 5).map((b) => (
                <div key={b.provider} className="flex items-center gap-2 text-[11px]">
                  <span className="font-medium text-text-main w-24 truncate">{b.provider}</span>
                  <div className="flex-1 h-1.5 rounded-sm bg-black/[0.08] dark:bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-sm"
                      style={{ width: `${Math.min(b.pct, 100)}%` }}
                    />
                  </div>
                  <span className="text-text-muted tabular-nums w-16 text-right">
                    {formatCurrency(b.cost)}
                  </span>
                  <span className="text-text-muted tabular-nums w-10 text-right">
                    {Math.round(b.pct)}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-md border border-border/40 bg-bg-base/30 p-3">
        <h4 className="text-[11px] uppercase tracking-wide font-bold text-text-muted mb-3">
          Limits
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          <Input
            label="Daily $"
            type="number"
            step="0.01"
            min="0"
            placeholder="—"
            value={form.dailyLimitUsd}
            onChange={(e) => setForm({ ...form, dailyLimitUsd: e.target.value })}
          />
          <Input
            label="Weekly $"
            type="number"
            step="0.01"
            min="0"
            placeholder="—"
            value={form.weeklyLimitUsd}
            onChange={(e) => setForm({ ...form, weeklyLimitUsd: e.target.value })}
          />
          <Input
            label="Monthly $"
            type="number"
            step="0.01"
            min="0"
            placeholder="—"
            value={form.monthlyLimitUsd}
            onChange={(e) => setForm({ ...form, monthlyLimitUsd: e.target.value })}
          />
          <Input
            label="Warn at %"
            type="number"
            min="1"
            max="100"
            value={form.warningThreshold}
            onChange={(e) => setForm({ ...form, warningThreshold: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <div>
            <label className="text-[11px] text-text-muted block mb-1">Reset interval</label>
            <select
              value={form.resetInterval}
              onChange={(e) =>
                setForm({ ...form, resetInterval: e.target.value as typeof form.resetInterval })
              }
              className="w-full px-2 py-1.5 rounded border border-border bg-bg-base text-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <Input
            label="Reset time (UTC)"
            type="time"
            value={form.resetTime}
            onChange={(e) => setForm({ ...form, resetTime: e.target.value })}
          />
          <div className="text-[10px] text-text-muted">
            Next reset:{" "}
            <span className="font-mono">{formatDateTime(row.budget?.budgetResetAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Button
            variant="primary"
            size="sm"
            loading={saving}
            onClick={() =>
              onSave({
                dailyLimitUsd: form.dailyLimitUsd ? parseFloat(form.dailyLimitUsd) : 0,
                weeklyLimitUsd: form.weeklyLimitUsd ? parseFloat(form.weeklyLimitUsd) : 0,
                monthlyLimitUsd: form.monthlyLimitUsd ? parseFloat(form.monthlyLimitUsd) : 0,
                warningThresholdPct: parseInt(form.warningThreshold) || 80,
                resetInterval: form.resetInterval,
                resetTime: form.resetTime,
              })
            }
          >
            {t("saveLimits")}
          </Button>
          <span className="text-[10px] text-text-muted">
            💡 Hard-cap policy and email alerts coming soon
          </span>
        </div>
      </div>
    </div>
  );
}
