"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import { Button, Modal } from "@/shared/components";
import ProviderIcon from "@/shared/components/ProviderIcon";

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

type Allocation = { apiKeyId: string; percent: number };
type PoolPolicy = "hard" | "soft" | "burst";

type QuotaPool = {
  id: string;
  connectionId: string; // provider connection id (account)
  provider: string;
  accountLabel: string;
  window: string; // e.g. "session", "weekly", "credits"
  windowLabel: string;
  totalQuota: number; // numeric total (tokens / sessions / dollars / requests)
  unit: string; // "tokens" | "sessions" | "USD" | "requests" | "credits"
  resetIso?: string | null;
  policy: PoolPolicy;
  allocations: Allocation[];
  createdAt: number;
};

type Connection = {
  id: string;
  provider: string;
  name?: string;
  displayName?: string;
  email?: string;
  authType?: string;
};

type ApiKey = { id: string; name?: string };

type CachedProviderLimit = {
  fetchedAt?: string;
  plan?: string;
  quotas?: Record<string, any>;
};

type CachedAllResponse = {
  caches?: Record<string, CachedProviderLimit>;
};

const LS_POOLS = "omniroute:quota-share:pools";

// Side-effecting helpers kept at module scope so React's purity lint does
// not flag callers — they only ever run inside event handlers.
function generatePoolId(): string {
  return `pool_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
function nowMs(): number {
  return Date.now();
}

// Palette for allocation slices in donut + bars
const SLICE_PALETTE = [
  "#a78bfa", // violet
  "#60a5fa", // blue
  "#34d399", // emerald
  "#fbbf24", // amber
  "#f87171", // red
  "#22d3ee", // cyan
  "#f472b6", // pink
  "#94a3b8", // slate
];

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function loadPools(): QuotaPool[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_POOLS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistPools(pools: QuotaPool[]) {
  try {
    localStorage.setItem(LS_POOLS, JSON.stringify(pools));
  } catch {
    /* ignore */
  }
}

function shortId(value: string, max = 12) {
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

function fmtNumber(n: number, unit?: string): string {
  if (unit === "USD") return `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  if (!Number.isFinite(n)) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return `${n}`;
}

function fmtCountdown(iso?: string | null): string {
  if (!iso) return "—";
  try {
    const diff = new Date(iso).getTime() - Date.now();
    if (diff <= 0) return "now";
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    if (h >= 24) {
      const d = Math.floor(h / 24);
      return `${d}d ${h % 24}h`;
    }
    return `${h}h ${m}m`;
  } catch {
    return "—";
  }
}

// Extract candidate pool sources from a provider's cached quota response.
// Each quota window (session/weekly/credits) becomes a potential pool.
function extractPoolSources(
  conn: Connection,
  cached: CachedProviderLimit | undefined
): Array<{
  window: string;
  windowLabel: string;
  totalQuota: number;
  unit: string;
  resetIso?: string | null;
}> {
  if (!cached?.quotas) return [];
  const out: Array<{
    window: string;
    windowLabel: string;
    totalQuota: number;
    unit: string;
    resetIso?: string | null;
  }> = [];
  for (const [key, q] of Object.entries(cached.quotas)) {
    if (!q || typeof q !== "object") continue;
    const isCredits = (q as any).isCredits === true || /^credits/i.test(key);
    const total = Number((q as any).total ?? 0);
    const remaining = Number((q as any).remaining ?? 0);
    const totalQuota = isCredits ? Math.max(total, remaining) : total;
    if (totalQuota <= 0 && !isCredits) continue;
    const windowLabel =
      (q as any).displayName || key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const unit = isCredits
      ? ((q as any).currency as string) || "USD"
      : key === "session" || key === "weekly"
        ? "tokens"
        : "requests";
    out.push({
      window: key,
      windowLabel,
      totalQuota: totalQuota || remaining,
      unit,
      resetIso: (q as any).resetAt || null,
    });
  }
  return out;
}

// Donut SVG renderer — slices from allocations array + unfilled gap if <100%
function Donut({
  size = 140,
  thickness = 22,
  slices,
}: {
  size?: number;
  thickness?: number;
  slices: Array<{ percent: number; color: string; label?: string }>;
}) {
  const r = size / 2 - thickness / 2;
  const c = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;
  // Precompute cumulative offsets immutably so we can map slices without
  // mutating across renders.
  const lens = slices.map((s) => Math.max(0, Math.min(s.percent, 100)) / 100);
  const offsets = lens.reduce<number[]>((acc, len, idx) => {
    acc.push(idx === 0 ? 0 : (acc[idx - 1] as number) + lens[idx - 1]);
    return acc;
  }, []);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={thickness}
      />
      {slices.map((s, i) => {
        const dash = lens[i] * c;
        const offset = -offsets[i] * c;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={thickness}
            strokeDasharray={`${dash} ${c}`}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="butt"
          />
        );
      })}
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────────────

export default function QuotaSharePageClient() {
  const t = useTranslations("quotaShare");
  const [connections, setConnections] = useState<Connection[]>([]);
  const [caches, setCaches] = useState<Record<string, CachedProviderLimit>>({});
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [pools, setPools] = useState<QuotaPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<QuotaPool | null>(null);

  // ── Fetch ────────────────────────────────────────────────────────────────

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [connsRes, cacheRes, keysRes] = await Promise.all([
        fetch("/api/providers/client"),
        fetch("/api/usage/provider-limits"),
        fetch("/api/keys"),
      ]);
      const connsData = connsRes.ok ? await connsRes.json() : null;
      const conns: Connection[] = Array.isArray(connsData?.connections)
        ? connsData.connections
        : [];
      const cacheData: CachedAllResponse | null = cacheRes.ok ? await cacheRes.json() : null;
      const keysData = keysRes.ok ? await keysRes.json() : null;
      const keys: ApiKey[] = Array.isArray(keysData) ? keysData : keysData?.keys || [];
      setConnections(conns);
      setCaches(cacheData?.caches || {});
      setApiKeys(keys);
    } catch (err) {
      console.error("[QuotaShare] load failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAll();
    setPools(loadPools());
  }, [loadAll]);

  // ── Mutations ────────────────────────────────────────────────────────────

  const savePools = useCallback((next: QuotaPool[]) => {
    setPools(next);
    persistPools(next);
  }, []);

  const upsertPool = useCallback(
    (pool: QuotaPool) => {
      const idx = pools.findIndex((p) => p.id === pool.id);
      const next = [...pools];
      if (idx >= 0) next[idx] = pool;
      else next.push(pool);
      savePools(next);
    },
    [pools, savePools]
  );

  const removePool = useCallback(
    (id: string) => {
      if (!confirm(t("removeConfirm"))) return;
      savePools(pools.filter((p) => p.id !== id));
    },
    [pools, savePools]
  );

  // ── Derived ──────────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    let allocations = 0;
    let atCap = 0;
    let uncappedPct = 0;
    for (const p of pools) {
      allocations += p.allocations.length;
      const totalPct = p.allocations.reduce((s, a) => s + a.percent, 0);
      if (totalPct < 100) uncappedPct += 100 - totalPct;
      // Simulated "at cap" — without backend tracking, mark pools with >=1
      // allocation summing to 100% as "fully utilized config" (proxy metric).
      if (totalPct >= 100 && p.allocations.length > 0) atCap += 0; // see disclaimer
    }
    return {
      activePools: pools.length,
      allocations,
      atCap,
      uncapped: pools.length > 0 ? Math.round(uncappedPct / pools.length) : 0,
    };
  }, [pools]);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-primary">pie_chart</span>
            {t("title")}
          </h1>
          <p className="text-sm text-text-muted mt-0.5">{t("description")}</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setCreateOpen(true)}>
          <span className="material-symbols-outlined text-[14px] mr-1">add</span>
          {t("newPool")}
        </Button>
      </div>

      {/* Beta disclaimer */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
        <span className="material-symbols-outlined text-[18px] shrink-0">science</span>
        <div>
          <strong>{t("betaPreviewLabel")}</strong> {t("betaConfigSavedPrefix")}{" "}
          <code>localStorage</code> {t("betaConfigSavedSuffix")}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label={t("kpiActivePools")} value={String(stats.activePools)} />
        <StatCard label={t("kpiKeysAllocated")} value={String(stats.allocations)} />
        <StatCard
          label={t("kpiAvgUnallocated")}
          value={`${stats.uncapped}%`}
          tone={stats.uncapped > 0 ? "amber" : "green"}
        />
        <StatCard label={t("kpiProvidersWithQuota")} value={String(connections.length)} />
      </div>

      {loading ? (
        <div className="text-text-muted text-sm py-10 text-center animate-pulse">
          {t("loading")}
        </div>
      ) : pools.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface py-16 text-center">
          <span className="material-symbols-outlined text-[64px] opacity-15">pie_chart</span>
          <h3 className="mt-3 text-base font-semibold text-text-main">{t("emptyTitle")}</h3>
          <p className="mt-1 text-sm text-text-muted max-w-md mx-auto">{t("emptyDescription")}</p>
          <Button variant="primary" size="sm" className="mt-4" onClick={() => setCreateOpen(true)}>
            <span className="material-symbols-outlined text-[14px] mr-1">add</span>
            {t("newPool")}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {pools.map((pool) => (
            <PoolCard
              key={pool.id}
              pool={pool}
              cached={caches[pool.connectionId]}
              apiKeys={apiKeys}
              onEdit={() => setEditing(pool)}
              onRemove={() => removePool(pool.id)}
              onPolicyChange={(policy) => upsertPool({ ...pool, policy })}
            />
          ))}
        </div>
      )}

      {createOpen && (
        <CreatePoolModal
          connections={connections}
          caches={caches}
          existingPools={pools}
          onClose={() => setCreateOpen(false)}
          onCreate={(pool) => {
            upsertPool(pool);
            setCreateOpen(false);
          }}
        />
      )}

      {editing && (
        <EditAllocationsModal
          pool={editing}
          apiKeys={apiKeys}
          onClose={() => setEditing(null)}
          onSave={(allocations) => {
            upsertPool({ ...editing, allocations });
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "green" | "amber" | "red";
}) {
  const color =
    tone === "amber"
      ? "text-amber-400"
      : tone === "red"
        ? "text-red-400"
        : tone === "green"
          ? "text-emerald-400"
          : "text-text-main";
  return (
    <div className="rounded-lg border border-border/40 bg-bg-subtle/30 px-4 py-3">
      <div className="text-[10px] uppercase tracking-wide text-text-muted font-semibold">
        {label}
      </div>
      <div className={`text-2xl font-bold tabular-nums leading-tight ${color}`}>{value}</div>
    </div>
  );
}

function PoolCard({
  pool,
  cached,
  apiKeys,
  onEdit,
  onRemove,
  onPolicyChange,
}: {
  pool: QuotaPool;
  cached?: CachedProviderLimit;
  apiKeys: ApiKey[];
  onEdit: () => void;
  onRemove: () => void;
  onPolicyChange: (policy: PoolPolicy) => void;
}) {
  const t = useTranslations("quotaShare");
  // Refresh totalQuota from latest cache if available
  const live = cached?.quotas?.[pool.window];
  const liveTotal = live ? Number((live as any).total || 0) : 0;
  const liveRemaining = live ? Number((live as any).remaining || 0) : 0;
  const total = liveTotal > 0 ? liveTotal : pool.totalQuota;
  const used = liveTotal > 0 ? liveTotal - liveRemaining : 0;
  const usedPct = total > 0 ? Math.min((used / total) * 100, 100) : 0;
  const resetIso = (live as any)?.resetAt || pool.resetIso;
  const totalAllocated = pool.allocations.reduce((s, a) => s + a.percent, 0);
  const unallocated = Math.max(0, 100 - totalAllocated);

  const slices = [
    ...pool.allocations.map((a, i) => ({
      percent: a.percent,
      color: SLICE_PALETTE[i % SLICE_PALETTE.length],
      label: a.apiKeyId,
    })),
  ];
  if (unallocated > 0) {
    slices.push({ percent: unallocated, color: "rgba(255,255,255,0.10)", label: "free" });
  }

  const keyLabel = (id: string) => apiKeys.find((k) => k.id === id)?.name || id.slice(0, 12) + "…";

  return (
    <Card padding="md">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-md flex items-center justify-center overflow-hidden shrink-0 bg-bg-subtle">
            <ProviderIcon providerId={pool.provider} size={28} type="color" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-text-main truncate">
              {pool.provider} · {pool.accountLabel}
            </div>
            <div className="text-[11px] text-text-muted">
              {pool.windowLabel} · {t("resetIn")} {fmtCountdown(resetIso)} · {t("quotaTotal")}{" "}
              {fmtNumber(total, pool.unit)} {pool.unit === "USD" ? "" : pool.unit}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onRemove}
            title={t("removePool")}
            className="p-1.5 rounded-md hover:bg-red-500/10 text-text-muted hover:text-red-400 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 items-start">
        {/* Donut */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <Donut slices={slices} size={160} thickness={24} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-[10px] uppercase tracking-wide text-text-muted font-semibold">
                {t("pool")}
              </div>
              <div className="text-lg font-bold text-text-main tabular-nums">
                {Math.round(usedPct)}%
              </div>
              <div className="text-[10px] text-text-muted">{t("used")}</div>
            </div>
          </div>
          <div className="w-full px-1">
            <div className="h-1.5 rounded-sm bg-black/6 dark:bg-white/6 overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${usedPct}%` }} />
            </div>
            <div className="text-[10px] text-text-muted text-center mt-1 tabular-nums">
              {fmtNumber(used, pool.unit)} / {fmtNumber(total, pool.unit)}
            </div>
          </div>
        </div>

        {/* Allocations */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[11px] uppercase tracking-wide font-bold text-text-muted">
              {t("allocationsCount", { count: pool.allocations.length })}
            </h3>
            <span
              className={`text-[10px] font-bold tabular-nums ${
                totalAllocated === 100
                  ? "text-emerald-400"
                  : totalAllocated > 100
                    ? "text-red-400"
                    : "text-amber-400"
              }`}
            >
              {t("allocatedFree", { allocated: totalAllocated, free: unallocated })}
            </span>
          </div>

          {pool.allocations.length === 0 ? (
            <div className="text-[11px] text-text-muted italic py-3 text-center bg-bg-subtle/40 rounded-md">
              {t("noAllocations")}
            </div>
          ) : (
            <div className="space-y-1.5">
              {pool.allocations.map((a, i) => {
                const cap = total > 0 ? (total * a.percent) / 100 : 0;
                const color = SLICE_PALETTE[i % SLICE_PALETTE.length];
                return (
                  <div
                    key={a.apiKeyId}
                    className="grid items-center gap-2 text-[11px]"
                    style={{ gridTemplateColumns: "12px minmax(0,1fr) 50px 90px 90px" }}
                  >
                    <span
                      className="inline-block w-3 h-3 rounded-sm"
                      style={{ background: color }}
                    />
                    <span className="font-mono truncate text-text-main">
                      {keyLabel(a.apiKeyId)}
                    </span>
                    <span className="text-right font-bold tabular-nums" style={{ color }}>
                      {a.percent}%
                    </span>
                    <span className="text-right text-text-muted tabular-nums">
                      {t("capLabel", { value: fmtNumber(cap, pool.unit) })}
                    </span>
                    <span className="text-text-muted text-right">{t("notTrackedYet")}</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between gap-2 flex-wrap text-[11px]">
            <div className="flex items-center gap-1">
              <span className="text-text-muted font-semibold uppercase tracking-wide">
                {t("policyLabel")}
              </span>
              {(["hard", "soft", "burst"] as PoolPolicy[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPolicyChange(p)}
                  className={`px-2 py-0.5 rounded-md border cursor-pointer ${
                    pool.policy === p
                      ? "bg-primary/15 border-primary/40 text-primary font-semibold"
                      : "border-border text-text-muted hover:text-text-main"
                  }`}
                  title={
                    p === "hard"
                      ? t("policyHardHint")
                      : p === "soft"
                        ? t("policySoftHint")
                        : t("policyBurstHint")
                  }
                >
                  {p === "hard"
                    ? t("policyHard")
                    : p === "soft"
                      ? t("policySoft")
                      : t("policyBurst")}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <Button variant="secondary" size="sm" onClick={onEdit}>
                <span className="material-symbols-outlined text-[14px] mr-1">edit</span>
                {t("editAllocations")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CreatePoolModal({
  connections,
  caches,
  existingPools,
  onClose,
  onCreate,
}: {
  connections: Connection[];
  caches: Record<string, CachedProviderLimit>;
  existingPools: QuotaPool[];
  onClose: () => void;
  onCreate: (pool: QuotaPool) => void;
}) {
  const t = useTranslations("quotaShare");
  const [connectionId, setConnectionId] = useState<string>("");
  const [window, setWindow] = useState<string>("");

  // Connections that have at least one quota window
  const eligibleConnections = useMemo(() => {
    return connections.filter((c) => {
      const cached = caches[c.id];
      return extractPoolSources(c, cached).length > 0;
    });
  }, [connections, caches]);

  const selectedConn = connections.find((c) => c.id === connectionId);
  const windowSources = selectedConn ? extractPoolSources(selectedConn, caches[connectionId]) : [];
  const selectedWindow = windowSources.find((w) => w.window === window);

  // Already used (connection+window) pairs to avoid duplicates
  const usedPairs = new Set(existingPools.map((p) => `${p.connectionId}:${p.window}`));

  const handleCreate = () => {
    if (!selectedConn || !selectedWindow) return;
    if (usedPairs.has(`${connectionId}:${window}`)) {
      alert(t("duplicatePoolError"));
      return;
    }
    const accountLabel =
      selectedConn.name ||
      selectedConn.email ||
      selectedConn.displayName ||
      selectedConn.id.slice(0, 12);
    const pool: QuotaPool = {
      id: generatePoolId(),
      connectionId,
      provider: selectedConn.provider,
      accountLabel,
      window,
      windowLabel: selectedWindow.windowLabel,
      totalQuota: selectedWindow.totalQuota,
      unit: selectedWindow.unit,
      resetIso: selectedWindow.resetIso || null,
      policy: "hard",
      allocations: [],
      createdAt: nowMs(),
    };
    onCreate(pool);
  };

  return (
    <Modal isOpen onClose={onClose} title={t("newPoolTitle")}>
      <div className="space-y-3">
        <div>
          <label className="text-[11px] uppercase tracking-wide text-text-muted font-semibold block mb-1">
            {t("providerConnection")}
          </label>
          <select
            value={connectionId}
            onChange={(e) => {
              setConnectionId(e.target.value);
              setWindow("");
            }}
            className="w-full px-3 py-2 rounded border border-border bg-bg-base text-sm"
          >
            <option value="">{t("selectConnection")}</option>
            {eligibleConnections.map((c) => (
              <option key={c.id} value={c.id}>
                {c.provider} / {c.name || c.email || c.id.slice(0, 12)}
              </option>
            ))}
          </select>
          {eligibleConnections.length === 0 && (
            <p className="text-[10px] text-amber-400 mt-1">{t("noEligibleConnections")}</p>
          )}
        </div>

        {connectionId && (
          <div>
            <label className="text-[11px] uppercase tracking-wide text-text-muted font-semibold block mb-1">
              {t("quotaWindow")}
            </label>
            <select
              value={window}
              onChange={(e) => setWindow(e.target.value)}
              className="w-full px-3 py-2 rounded border border-border bg-bg-base text-sm"
            >
              <option value="">{t("selectWindow")}</option>
              {windowSources.map((w) => {
                const used = usedPairs.has(`${connectionId}:${w.window}`);
                return (
                  <option key={w.window} value={w.window} disabled={used}>
                    {w.windowLabel} · {t("quotaTotal")} {fmtNumber(w.totalQuota, w.unit)} {w.unit}{" "}
                    {used ? t("alreadyUsedSuffix") : ""}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {selectedWindow && (
          <div className="rounded-md border border-border/40 bg-bg-subtle/30 p-3 text-[11px] text-text-muted">
            <div>
              <strong className="text-text-main">{selectedWindow.windowLabel}</strong> ·{" "}
              {fmtNumber(selectedWindow.totalQuota, selectedWindow.unit)} {selectedWindow.unit}
            </div>
            <div>
              {t("windowReset")}:{" "}
              {selectedWindow.resetIso ? new Date(selectedWindow.resetIso).toLocaleString() : "—"}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
          <Button variant="secondary" size="sm" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleCreate}
            disabled={!selectedConn || !selectedWindow}
          >
            {t("createPool")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function EditAllocationsModal({
  pool,
  apiKeys,
  onClose,
  onSave,
}: {
  pool: QuotaPool;
  apiKeys: ApiKey[];
  onClose: () => void;
  onSave: (allocations: Allocation[]) => void;
}) {
  const t = useTranslations("quotaShare");
  const [drafts, setDrafts] = useState<Allocation[]>(pool.allocations);
  const total = drafts.reduce((s, a) => s + (Number.isFinite(a.percent) ? a.percent : 0), 0);

  const availableKeys = apiKeys.filter((k) => !drafts.some((a) => a.apiKeyId === k.id));

  const addKey = (id: string) => {
    setDrafts((prev) => [...prev, { apiKeyId: id, percent: 0 }]);
  };

  const updatePercent = (id: string, value: number) => {
    setDrafts((prev) =>
      prev.map((a) =>
        a.apiKeyId === id ? { ...a, percent: Math.max(0, Math.min(100, value)) } : a
      )
    );
  };

  const removeKey = (id: string) => {
    setDrafts((prev) => prev.filter((a) => a.apiKeyId !== id));
  };

  const equalSplit = () => {
    if (drafts.length === 0) return;
    const each = Math.floor(100 / drafts.length);
    const remainder = 100 - each * drafts.length;
    setDrafts((prev) => prev.map((a, i) => ({ ...a, percent: each + (i < remainder ? 1 : 0) })));
  };

  const keyLabel = (id: string) => apiKeys.find((k) => k.id === id)?.name || shortId(id);

  return (
    <Modal isOpen onClose={onClose} title={t("editTitle")} size="lg">
      <div className="space-y-3">
        <div className="text-xs text-text-muted">
          {t("pool")}:{" "}
          <strong className="text-text-main">
            {pool.provider} / {pool.accountLabel} · {pool.windowLabel}
          </strong>
          <br />
          {t("quotaTotal")}: {fmtNumber(pool.totalQuota, pool.unit)} {pool.unit}
        </div>

        {drafts.length === 0 ? (
          <div className="text-[12px] text-text-muted italic py-4 text-center bg-bg-subtle/40 rounded-md">
            {t("noKeysAdded")}
          </div>
        ) : (
          <div className="space-y-2">
            {drafts.map((a, i) => {
              const color = SLICE_PALETTE[i % SLICE_PALETTE.length];
              const cap = (pool.totalQuota * a.percent) / 100;
              return (
                <div
                  key={a.apiKeyId}
                  className="grid items-center gap-2"
                  style={{ gridTemplateColumns: "12px minmax(0,1fr) 70px 90px 24px" }}
                >
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ background: color }} />
                  <span className="text-[12px] font-mono truncate">{keyLabel(a.apiKeyId)}</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={a.percent}
                    onChange={(e) => updatePercent(a.apiKeyId, Number(e.target.value))}
                    className="px-2 py-1 rounded border border-border bg-bg-base text-sm text-right tabular-nums"
                  />
                  <span className="text-[11px] text-text-muted tabular-nums">
                    {t("capLabel", { value: fmtNumber(cap, pool.unit) })}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeKey(a.apiKeyId)}
                    className="p-0.5 rounded hover:bg-red-500/10 text-text-muted hover:text-red-400 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-border/40">
          <span
            className={`font-bold tabular-nums ${
              total === 100 ? "text-emerald-400" : total > 100 ? "text-red-400" : "text-amber-400"
            }`}
          >
            {t("totalLabel", { percent: total })} {total > 100 && t("totalExceeded")}
          </span>
          <div className="flex items-center gap-2">
            {availableKeys.length > 0 && (
              <select
                value=""
                onChange={(e) => e.target.value && addKey(e.target.value)}
                className="px-2 py-1 rounded border border-border bg-bg-base text-xs"
              >
                <option value="">{t("addKey")}</option>
                {availableKeys.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.name || shortId(k.id)}
                  </option>
                ))}
              </select>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={equalSplit}
              disabled={drafts.length === 0}
            >
              {t("equalSplit")}
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
          <Button variant="secondary" size="sm" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button variant="primary" size="sm" onClick={() => onSave(drafts)} disabled={total > 100}>
            {t("save")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
