"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Card from "@/shared/components/Card";
import ProviderIcon from "@/shared/components/ProviderIcon";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type KnownBreakerState = "CLOSED" | "OPEN" | "HALF_OPEN" | "DEGRADED";
type BreakerState = KnownBreakerState | (string & {});

type ProviderBreaker = {
  provider: string;
  state: BreakerState;
  failureCount: number;
  lastFailure: string | null;
  retryAfterMs: number;
};

type LockoutEntry = {
  reason?: string;
  until?: number | string | null;
  remainingMs?: number;
  model?: string;
  accountId?: string;
};

type SessionTop = {
  sessionId: string;
  requestCount: number;
  connectionId?: string | null;
  ageMs: number;
  idleMs: number;
  createdAt?: string;
  lastActiveAt?: string;
};

type QuotaMonitor = {
  sessionId?: string;
  accountId?: string;
  provider?: string;
  window?: string;
  status?: "ok" | "alerting" | "exhausted" | "error" | string;
  remainingPercent?: number;
};

type HealthPayload = {
  timestamp?: string;
  providerBreakers?: ProviderBreaker[];
  lockouts?: Record<string, LockoutEntry>;
  quotaMonitor?: {
    active?: number;
    alerting?: number;
    exhausted?: number;
    errors?: number;
    monitors?: QuotaMonitor[];
  };
  sessions?: {
    activeCount?: number;
    stickyBoundCount?: number;
    byApiKey?: Record<string, number>;
    top?: SessionTop[];
  };
};

type Connection = {
  id: string;
  provider: string;
  name?: string;
  displayName?: string;
  email?: string;
  authType?: string;
  rateLimitedUntil?: string | null;
  testStatus?: string;
  lastError?: string;
  lastErrorType?: string;
  errorCode?: string | number;
  backoffLevel?: number;
};

type FeedEventKind =
  | "circuit-opened"
  | "circuit-degraded"
  | "circuit-recovered"
  | "circuit-closed"
  | "cooldown-added"
  | "cooldown-cleared"
  | "lockout-added"
  | "lockout-cleared"
  | "session-new"
  | "quota-alert"
  | "quota-exhausted"
  | "quota-recovered";

type FeedEvent = {
  id: string;
  ts: number;
  kind: FeedEventKind;
  title: string;
  detail: string;
};

type FeedFilter = "all" | "circuits" | "cooldowns" | "lockouts" | "sessions" | "quotas";

// ─────────────────────────────────────────────────────────────────────────────
// Constants & helpers
// ─────────────────────────────────────────────────────────────────────────────

const REFRESH_INTERVAL_MS = 5000;
const FEED_MAX_EVENTS = 50;
const EMPTY_PROVIDER_BREAKERS: ProviderBreaker[] = [];

type BreakerTone = { dot: string; bg: string; ring: string; label: string; icon: string };

const BREAKER_TONE: Record<string, BreakerTone> = {
  CLOSED: {
    dot: "#22c55e",
    bg: "rgba(34,197,94,0.10)",
    ring: "rgba(34,197,94,0.30)",
    label: "OK",
    icon: "check_circle",
  },
  HALF_OPEN: {
    dot: "#eab308",
    bg: "rgba(234,179,8,0.10)",
    ring: "rgba(234,179,8,0.30)",
    label: "RECOV",
    icon: "sync",
  },
  DEGRADED: {
    dot: "#f97316",
    bg: "rgba(249,115,22,0.10)",
    ring: "rgba(249,115,22,0.30)",
    label: "DEG",
    icon: "warning",
  },
  OPEN: {
    dot: "#ef4444",
    bg: "rgba(239,68,68,0.10)",
    ring: "rgba(239,68,68,0.30)",
    label: "OPEN",
    icon: "block",
  },
};

const FALLBACK_BREAKER_TONE: BreakerTone = {
  dot: "#64748b",
  bg: "rgba(100,116,139,0.10)",
  ring: "rgba(100,116,139,0.30)",
  label: "UNK",
  icon: "help",
};

const FEED_KIND_META: Record<FeedEventKind, { icon: string; color: string; group: FeedFilter }> = {
  "circuit-opened": { icon: "block", color: "#ef4444", group: "circuits" },
  "circuit-degraded": { icon: "warning", color: "#f97316", group: "circuits" },
  "circuit-recovered": { icon: "sync", color: "#eab308", group: "circuits" },
  "circuit-closed": { icon: "check_circle", color: "#22c55e", group: "circuits" },
  "cooldown-added": { icon: "ac_unit", color: "#3b82f6", group: "cooldowns" },
  "cooldown-cleared": { icon: "lock_open", color: "#22c55e", group: "cooldowns" },
  "lockout-added": { icon: "lock", color: "#f97316", group: "lockouts" },
  "lockout-cleared": { icon: "lock_open", color: "#22c55e", group: "lockouts" },
  "session-new": { icon: "fingerprint", color: "#06b6d4", group: "sessions" },
  "quota-alert": { icon: "warning", color: "#eab308", group: "quotas" },
  "quota-exhausted": { icon: "error", color: "#ef4444", group: "quotas" },
  "quota-recovered": { icon: "check_circle", color: "#22c55e", group: "quotas" },
};

function fmtMs(ms: number | undefined | null): string {
  if (!ms || ms <= 0) return "0s";
  if (ms < 1000) return `${ms}ms`;
  const s = Math.ceil(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rs = s % 60;
  if (m < 60) return rs > 0 ? `${m}m ${rs}s` : `${m}m`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return `${h}h ${rm}m`;
}

function fmtClock(ts: number): string {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function shortId(value: string | null | undefined, max = 12): string {
  if (!value) return "—";
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

function untilMs(value: number | string | null | undefined): number {
  if (typeof value === "number") return value - Date.now();
  if (typeof value === "string") {
    const ts = new Date(value).getTime();
    if (Number.isFinite(ts)) return ts - Date.now();
  }
  return 0;
}

function normalizeBreakerState(state: string | null | undefined): string {
  return String(state || "")
    .trim()
    .toUpperCase();
}

function getBreakerTone(normalizedState: string): BreakerTone {
  return BREAKER_TONE[normalizedState] || FALLBACK_BREAKER_TONE;
}

function pushFeed(prev: FeedEvent[], events: FeedEvent[]): FeedEvent[] {
  if (events.length === 0) return prev;
  const merged = [...events, ...prev];
  return merged.slice(0, FEED_MAX_EVENTS);
}

// Compute new feed events by diffing previous vs next snapshot.
// Conservative: only emit transitions (added/cleared/state-change), never
// emit for items that simply persist between polls.
function diffSnapshots(
  prev: { health: HealthPayload | null; conns: Connection[] },
  next: { health: HealthPayload | null; conns: Connection[] },
  nowTs: number
): FeedEvent[] {
  const out: FeedEvent[] = [];

  // Circuit breakers
  const prevBreakers = new Map((prev.health?.providerBreakers ?? []).map((b) => [b.provider, b]));
  const nextBreakers = new Map((next.health?.providerBreakers ?? []).map((b) => [b.provider, b]));
  for (const [provider, nextB] of nextBreakers) {
    const prevB = prevBreakers.get(provider);
    if (!prevB) continue;
    const prevState = normalizeBreakerState(prevB.state);
    const nextState = normalizeBreakerState(nextB.state);
    if (prevState === nextState) continue;
    if (nextState === "OPEN") {
      out.push({
        id: `cb-open-${provider}-${nowTs}`,
        ts: nowTs,
        kind: "circuit-opened",
        title: `${provider} circuit OPEN`,
        detail: `threshold hit · retry in ${fmtMs(nextB.retryAfterMs)}`,
      });
    } else if (nextState === "HALF_OPEN") {
      out.push({
        id: `cb-half-${provider}-${nowTs}`,
        ts: nowTs,
        kind: "circuit-recovered",
        title: `${provider} HALF_OPEN`,
        detail: `probing recovery`,
      });
    } else if (nextState === "DEGRADED") {
      out.push({
        id: `cb-deg-${provider}-${nowTs}`,
        ts: nowTs,
        kind: "circuit-degraded",
        title: `${provider} DEGRADED`,
        detail: `${nextB.failureCount} failures · degraded but serving`,
      });
    } else if (nextState === "CLOSED" && prevState !== "CLOSED") {
      out.push({
        id: `cb-close-${provider}-${nowTs}`,
        ts: nowTs,
        kind: "circuit-closed",
        title: `${provider} circuit CLOSED`,
        detail: `recovered to healthy`,
      });
    }
  }

  // Cooldowns (per-connection rateLimitedUntil)
  const prevCooldowns = new Map(
    prev.conns
      .filter((c) => c.rateLimitedUntil && untilMs(c.rateLimitedUntil) > 0)
      .map((c) => [c.id, c])
  );
  const nextCooldowns = new Map(
    next.conns
      .filter((c) => c.rateLimitedUntil && untilMs(c.rateLimitedUntil) > 0)
      .map((c) => [c.id, c])
  );
  for (const [id, conn] of nextCooldowns) {
    if (!prevCooldowns.has(id)) {
      const label = conn.name || conn.email || conn.displayName || shortId(id);
      out.push({
        id: `cd-add-${id}-${nowTs}`,
        ts: nowTs,
        kind: "cooldown-added",
        title: `${conn.provider}/${label} cooling`,
        detail: `${fmtMs(untilMs(conn.rateLimitedUntil))} · ${conn.lastError || "unavailable"}`,
      });
    }
  }
  for (const [id, conn] of prevCooldowns) {
    if (!nextCooldowns.has(id)) {
      const label = conn.name || conn.email || conn.displayName || shortId(id);
      out.push({
        id: `cd-clr-${id}-${nowTs}`,
        ts: nowTs,
        kind: "cooldown-cleared",
        title: `${conn.provider}/${label} resumed`,
        detail: `cooldown cleared`,
      });
    }
  }

  // Lockouts
  const prevLockKeys = new Set(Object.keys(prev.health?.lockouts ?? {}));
  const nextLockKeys = new Set(Object.keys(next.health?.lockouts ?? {}));
  for (const key of nextLockKeys) {
    if (!prevLockKeys.has(key)) {
      const entry = next.health?.lockouts?.[key];
      out.push({
        id: `lk-add-${key}-${nowTs}`,
        ts: nowTs,
        kind: "lockout-added",
        title: `${key} locked`,
        detail: entry?.reason ? `reason: ${entry.reason}` : "rate-limit lockout",
      });
    }
  }
  for (const key of prevLockKeys) {
    if (!nextLockKeys.has(key)) {
      out.push({
        id: `lk-clr-${key}-${nowTs}`,
        ts: nowTs,
        kind: "lockout-cleared",
        title: `${key} unlocked`,
        detail: `lockout expired`,
      });
    }
  }

  // Sessions (additions only — sessions are short-lived, deletions are noise)
  const prevSessions = new Set((prev.health?.sessions?.top ?? []).map((s) => s.sessionId));
  for (const s of next.health?.sessions?.top ?? []) {
    if (prevSessions.has(s.sessionId)) continue;
    out.push({
      id: `ss-new-${s.sessionId}-${nowTs}`,
      ts: nowTs,
      kind: "session-new",
      title: `new session ${shortId(s.sessionId, 8)}`,
      detail: s.connectionId ? `bound to ${shortId(s.connectionId, 10)}` : "no binding yet",
    });
  }

  // Quota monitors (alerting / exhausted transitions)
  const prevQuota = new Map(
    (prev.health?.quotaMonitor?.monitors ?? []).map((m) => [
      `${m.accountId ?? ""}:${m.provider ?? ""}:${m.window ?? ""}`,
      m,
    ])
  );
  for (const m of next.health?.quotaMonitor?.monitors ?? []) {
    const key = `${m.accountId ?? ""}:${m.provider ?? ""}:${m.window ?? ""}`;
    const prevM = prevQuota.get(key);
    const prevStatus = prevM?.status;
    if (m.status === prevStatus) continue;
    if (m.status === "exhausted") {
      out.push({
        id: `qe-${key}-${nowTs}`,
        ts: nowTs,
        kind: "quota-exhausted",
        title: `${m.accountId ?? "?"} EXHAUSTED`,
        detail: `${m.window ?? ""}${m.provider ? ` · ${m.provider}` : ""}`,
      });
    } else if (m.status === "alerting") {
      out.push({
        id: `qa-${key}-${nowTs}`,
        ts: nowTs,
        kind: "quota-alert",
        title: `${m.accountId ?? "?"} ALERTING`,
        detail: `${m.window ?? ""}${
          typeof m.remainingPercent === "number" ? ` · ${Math.round(m.remainingPercent)}% left` : ""
        }`,
      });
    } else if (prevStatus === "exhausted" || prevStatus === "alerting") {
      out.push({
        id: `qr-${key}-${nowTs}`,
        ts: nowTs,
        kind: "quota-recovered",
        title: `${m.accountId ?? "?"} recovered`,
        detail: `${m.window ?? ""} back to OK`,
      });
    }
  }

  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function RuntimePageClient() {
  const t = useTranslations("runtime");
  const [health, setHealth] = useState<HealthPayload | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [feed, setFeed] = useState<FeedEvent[]>([]);
  const [feedFilter, setFeedFilter] = useState<FeedFilter>("all");
  const prevSnapshotRef = useRef<{ health: HealthPayload | null; conns: Connection[] }>({
    health: null,
    conns: [],
  });
  const initialLoadRef = useRef(true);

  const fetchAll = useCallback(async () => {
    try {
      const [healthRes, connsRes] = await Promise.all([
        fetch("/api/monitoring/health"),
        fetch("/api/providers/client"),
      ]);
      const healthData: HealthPayload | null = healthRes.ok ? await healthRes.json() : null;
      const connsData = connsRes.ok ? await connsRes.json() : null;
      const conns: Connection[] = Array.isArray(connsData?.connections)
        ? connsData.connections
        : [];

      const nowTs = Date.now();
      const prev = prevSnapshotRef.current;
      // Skip diff on first load — everything is "new" but we don't want a
      // burst of fake events on mount.
      if (!initialLoadRef.current) {
        const events = diffSnapshots(prev, { health: healthData, conns }, nowTs);
        if (events.length > 0) setFeed((cur) => pushFeed(cur, events));
      }
      initialLoadRef.current = false;
      prevSnapshotRef.current = { health: healthData, conns };

      setHealth(healthData);
      setConnections(conns);
      setLastUpdated(nowTs);
    } catch (err) {
      console.error("[Runtime] fetch failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    if (paused) return;
    const id = setInterval(fetchAll, REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchAll, paused]);

  // ── Derived data ────────────────────────────────────────────────────────────

  const cooldowns = useMemo(() => {
    return connections.filter((c) => c.rateLimitedUntil && untilMs(c.rateLimitedUntil) > 0);
  }, [connections]);

  const breakers = health?.providerBreakers ?? EMPTY_PROVIDER_BREAKERS;
  const lockoutEntries = useMemo<Array<[string, LockoutEntry]>>(
    () => Object.entries(health?.lockouts ?? {}),
    [health]
  );

  const counts = useMemo(() => {
    let openCircuits = 0;
    let halfCircuits = 0;
    let degradedCircuits = 0;
    let unknownCircuits = 0;

    for (const breaker of breakers) {
      const state = normalizeBreakerState(breaker.state);
      if (state === "OPEN") {
        openCircuits++;
      } else if (state === "HALF_OPEN") {
        halfCircuits++;
      } else if (state === "DEGRADED") {
        degradedCircuits++;
      } else if (state !== "CLOSED") {
        unknownCircuits++;
      }
    }

    const totalBreakers = breakers.length;
    const affectedCircuits = openCircuits + halfCircuits + degradedCircuits + unknownCircuits;
    const sessions = health?.sessions?.activeCount ?? 0;
    const lockouts = lockoutEntries.length;
    const quota = health?.quotaMonitor;
    const quotaAlertingTotal =
      (quota?.alerting ?? 0) + (quota?.exhausted ?? 0) + (quota?.errors ?? 0);
    return {
      sessions,
      stickyBound: health?.sessions?.stickyBoundCount ?? 0,
      openCircuits,
      halfCircuits,
      degradedCircuits,
      unknownCircuits,
      affectedCircuits,
      totalBreakers,
      cooldowns: cooldowns.length,
      lockouts,
      quotaAlerting: quotaAlertingTotal,
      quotaExhausted: quota?.exhausted ?? 0,
    };
  }, [breakers, cooldowns, health, lockoutEntries]);

  const filteredFeed = useMemo(() => {
    if (feedFilter === "all") return feed;
    return feed.filter((ev) => FEED_KIND_META[ev.kind].group === feedFilter);
  }, [feed, feedFilter]);

  const overallHealthy = counts.totalBreakers - counts.affectedCircuits;
  const overallPercent =
    counts.totalBreakers > 0 ? Math.round((overallHealthy / counts.totalBreakers) * 100) : 100;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-primary">bolt</span>
            {t("title")}
          </h1>
          <p className="text-sm text-text-muted mt-0.5">{t("description")}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-text-muted tabular-nums">
            {lastUpdated ? `↻ ${fmtClock(lastUpdated)}` : "—"}
          </span>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-subtle border border-border text-text-main text-[12px] cursor-pointer hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
          >
            <span className="material-symbols-outlined text-[16px]">
              {paused ? "play_arrow" : "pause"}
            </span>
            {paused ? t("resume") : t("pause")}
          </button>
          <button
            type="button"
            onClick={() => fetchAll()}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-subtle border border-border text-text-main text-[12px] cursor-pointer hover:bg-black/[0.04] dark:hover:bg-white/[0.04] disabled:opacity-50"
            title={t("refreshNow")}
          >
            <span
              className={`material-symbols-outlined text-[16px] ${loading ? "animate-spin" : ""}`}
            >
              refresh
            </span>
          </button>
        </div>
      </div>

      {/* Row 1 — KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard
          icon="fingerprint"
          label={t("kpiSessions")}
          value={counts.sessions}
          hint={t("hintStickyBound", { count: counts.stickyBound })}
          tone="#06b6d4"
          onClick={() => setFeedFilter("sessions")}
          active={feedFilter === "sessions"}
        />
        <KpiCard
          icon="bolt"
          label={t("kpiCircuits")}
          value={`${counts.openCircuits} / ${counts.totalBreakers}`}
          hint={
            counts.halfCircuits + counts.degradedCircuits + counts.unknownCircuits > 0
              ? t("hintRecovering", {
                  count: counts.halfCircuits + counts.degradedCircuits + counts.unknownCircuits,
                })
              : counts.openCircuits === 0
                ? t("hintAllHealthy")
                : t("hintOpen")
          }
          tone={
            counts.openCircuits > 0
              ? "#ef4444"
              : counts.halfCircuits + counts.degradedCircuits + counts.unknownCircuits > 0
                ? "#eab308"
                : "#22c55e"
          }
          onClick={() => setFeedFilter("circuits")}
          active={feedFilter === "circuits"}
        />
        <KpiCard
          icon="ac_unit"
          label={t("kpiCooldowns")}
          value={counts.cooldowns}
          hint={t("hintConnsCooling")}
          tone={counts.cooldowns > 0 ? "#3b82f6" : "#22c55e"}
          onClick={() => setFeedFilter("cooldowns")}
          active={feedFilter === "cooldowns"}
        />
        <KpiCard
          icon="lock"
          label={t("kpiLockouts")}
          value={counts.lockouts}
          hint={t("hintModelsBlocked")}
          tone={counts.lockouts > 0 ? "#f97316" : "#22c55e"}
          onClick={() => setFeedFilter("lockouts")}
          active={feedFilter === "lockouts"}
        />
      </div>

      {/* Row 2 — Resilience layers (left, 2/3) + Live Feed (right, 1/3) */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-3">
        <Card padding="md">
          <SectionHeader
            icon="shield"
            title={t("resilienceTitle")}
            subtitle={t("resilienceSubtitle")}
            trailing={
              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-green-500">✓ {overallHealthy}</span>
                <span className="text-amber-500">
                  ⚠ {counts.halfCircuits + counts.degradedCircuits + counts.unknownCircuits}
                </span>
                <span className="text-red-500">⛔ {counts.openCircuits}</span>
              </div>
            }
          />

          <div className="mb-4 mt-2">
            <div className="h-2 rounded-sm bg-black/[0.06] dark:bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-sm bg-gradient-to-r from-green-500 via-amber-500 to-red-500/40"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <div className="mt-1 text-[11px] text-text-muted tabular-nums">
              {t("providersHealthy", { percent: overallPercent })}
            </div>
          </div>

          {/* Layer 1 */}
          <LayerSection
            id={1}
            title={t("layer1Title")}
            description={t("layer1Desc")}
            badge={t("badgeAffectedOf", {
              affected: counts.affectedCircuits,
              total: counts.totalBreakers,
            })}
            badgeTone={
              counts.openCircuits > 0
                ? "red"
                : counts.halfCircuits + counts.degradedCircuits + counts.unknownCircuits > 0
                  ? "amber"
                  : "green"
            }
          >
            {breakers.length === 0 ? (
              <EmptyHint text={t("emptyCircuits")} />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {breakers.map((b) => {
                  const state = normalizeBreakerState(b.state);
                  const tone = getBreakerTone(state);
                  return (
                    <div
                      key={b.provider}
                      className="rounded-md border px-2.5 py-2 flex flex-col gap-0.5"
                      style={{ borderColor: tone.ring, background: tone.bg }}
                      title={`${b.provider} · ${state || "UNKNOWN"} · failures ${b.failureCount}`}
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-text-main">
                        <ProviderIcon providerId={b.provider} size={14} />
                        <span className="truncate flex-1">{b.provider}</span>
                        <span style={{ color: tone.dot }} className="text-[10px] font-bold">
                          {tone.label}
                        </span>
                      </div>
                      <div className="text-[10px] text-text-muted tabular-nums">
                        {state === "OPEN"
                          ? `retry ${fmtMs(b.retryAfterMs)}`
                          : `${b.failureCount} failures`}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </LayerSection>

          {/* Layer 2 */}
          <LayerSection
            id={2}
            title={t("layer2Title")}
            description={t("layer2Desc")}
            badge={t("badgeCooling", { count: counts.cooldowns })}
            badgeTone={counts.cooldowns > 0 ? "blue" : "green"}
          >
            {cooldowns.length === 0 ? (
              <EmptyHint text={t("emptyCooldowns")} />
            ) : (
              <div className="flex flex-col divide-y divide-border/60">
                {cooldowns.slice(0, 8).map((c) => {
                  const remaining = untilMs(c.rateLimitedUntil);
                  const label = c.name || c.email || c.displayName || shortId(c.id);
                  return (
                    <div
                      key={c.id}
                      className="py-2 grid items-center gap-2"
                      style={{
                        gridTemplateColumns: "minmax(0,1.5fr) 70px minmax(0,1fr) 60px 60px",
                      }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <ProviderIcon providerId={c.provider} size={18} />
                        <div className="min-w-0">
                          <div className="text-[12px] text-text-main truncate font-medium">
                            {c.provider}/{label}
                          </div>
                          {c.lastErrorType && (
                            <div className="text-[10px] text-text-muted truncate">
                              {c.lastErrorType}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-[11px] tabular-nums text-blue-400">
                        {fmtMs(remaining)}
                      </div>
                      <div className="text-[10px] text-text-muted truncate">
                        {c.lastError || "—"}
                      </div>
                      <div className="text-[10px] text-text-muted tabular-nums">
                        L{c.backoffLevel ?? 0}
                      </div>
                      <div className="text-[10px] text-text-muted tabular-nums text-right">
                        {c.errorCode ?? ""}
                      </div>
                    </div>
                  );
                })}
                {cooldowns.length > 8 && (
                  <div className="pt-2 text-[10px] text-text-muted">
                    {t("moreCooldowns", { count: cooldowns.length - 8 })}
                  </div>
                )}
              </div>
            )}
          </LayerSection>

          {/* Layer 3 */}
          <LayerSection
            id={3}
            title={t("layer3Title")}
            description={t("layer3Desc")}
            badge={t("badgeLocked", { count: lockoutEntries.length })}
            badgeTone={lockoutEntries.length > 0 ? "orange" : "green"}
          >
            {lockoutEntries.length === 0 ? (
              <EmptyHint text={t("emptyLockouts")} />
            ) : (
              <div className="flex flex-col divide-y divide-border/60">
                {lockoutEntries.slice(0, 8).map(([key, lk]) => {
                  const remaining =
                    typeof lk.remainingMs === "number" ? lk.remainingMs : untilMs(lk.until);
                  return (
                    <div
                      key={key}
                      className="py-2 grid items-center gap-2"
                      style={{ gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr) 70px" }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-[14px] text-orange-400 shrink-0">
                          lock
                        </span>
                        <span className="text-[12px] text-text-main truncate font-medium">
                          {key}
                        </span>
                      </div>
                      <div className="text-[10px] text-text-muted truncate">
                        {lk.reason || "rate limit"}
                      </div>
                      <div className="text-[11px] tabular-nums text-orange-400 text-right">
                        {remaining > 0 ? fmtMs(remaining) : "—"}
                      </div>
                    </div>
                  );
                })}
                {lockoutEntries.length > 8 && (
                  <div className="pt-2 text-[10px] text-text-muted">
                    {t("moreLockouts", { count: lockoutEntries.length - 8 })}
                  </div>
                )}
              </div>
            )}
          </LayerSection>
        </Card>

        {/* Live Feed */}
        <Card padding="md">
          <SectionHeader
            icon="rss_feed"
            title={t("feedTitle")}
            subtitle={t("feedSubtitle", { count: filteredFeed.length })}
            trailing={
              <div className="flex items-center gap-1.5">
                <select
                  value={feedFilter}
                  onChange={(e) => setFeedFilter(e.target.value as FeedFilter)}
                  className="text-[10px] bg-bg-subtle border border-border rounded px-1.5 py-1 cursor-pointer text-text-main"
                >
                  <option value="all">{t("feedFilterAll")}</option>
                  <option value="circuits">{t("feedFilterCircuits")}</option>
                  <option value="cooldowns">{t("feedFilterCooldowns")}</option>
                  <option value="lockouts">{t("feedFilterLockouts")}</option>
                  <option value="sessions">{t("feedFilterSessions")}</option>
                  <option value="quotas">{t("feedFilterQuotas")}</option>
                </select>
                <button
                  type="button"
                  onClick={() => setFeed([])}
                  className="text-[10px] px-1.5 py-1 rounded border border-border text-text-muted hover:text-text-main hover:bg-black/[0.04] dark:hover:bg-white/[0.04] cursor-pointer"
                  title={t("feedClear")}
                >
                  {t("feedClear")}
                </button>
              </div>
            }
          />

          <div className="mt-2 flex flex-col gap-1.5 max-h-[640px] overflow-auto pr-1">
            {filteredFeed.length === 0 ? (
              <div className="text-center py-12 text-text-muted">
                <span className="material-symbols-outlined text-[40px] opacity-30 block mb-2">
                  hourglass_empty
                </span>
                <p className="text-xs">
                  {feed.length === 0 ? t("feedEmptyWaiting") : t("feedEmptyFiltered")}
                </p>
              </div>
            ) : (
              filteredFeed.map((ev) => {
                const meta = FEED_KIND_META[ev.kind];
                return (
                  <div
                    key={ev.id}
                    className="flex items-start gap-2 px-2 py-1.5 rounded hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                  >
                    <span
                      className="material-symbols-outlined text-[14px] mt-0.5"
                      style={{ color: meta.color }}
                    >
                      {meta.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-[11px] font-medium text-text-main truncate">
                          {ev.title}
                        </div>
                        <span className="text-[9px] text-text-muted tabular-nums shrink-0">
                          {fmtClock(ev.ts)}
                        </span>
                      </div>
                      <div className="text-[10px] text-text-muted truncate">{ev.detail}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>

      {/* Row 3 — Sessions table + Quota Monitors */}
      <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-3">
        <Card padding="md">
          <SectionHeader
            icon="fingerprint"
            title={t("sessionsTitle")}
            subtitle={t("sessionsSubtitle")}
            trailing={
              <span className="text-[11px] text-text-muted">
                {t("sessionsActive", { count: counts.sessions })}
              </span>
            }
          />

          {(health?.sessions?.top ?? []).length === 0 ? (
            <div className="text-center py-8 text-text-muted">
              <span className="material-symbols-outlined text-[40px] opacity-30 block mb-2">
                fingerprint
              </span>
              <p className="text-sm">{t("sessionsEmptyTitle")}</p>
              <p className="text-xs mt-1">{t("sessionsEmptyHint")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left py-2 px-2 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      {t("tblSession")}
                    </th>
                    <th className="text-right py-2 px-2 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      {t("tblAge")}
                    </th>
                    <th className="text-right py-2 px-2 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      {t("tblIdle")}
                    </th>
                    <th className="text-right py-2 px-2 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      {t("tblReqs")}
                    </th>
                    <th className="text-left py-2 px-2 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      {t("tblBoundTo")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(health?.sessions?.top ?? []).map((s) => (
                    <tr key={s.sessionId} className="border-b border-border/10 hover:bg-surface/20">
                      <td className="py-2 px-2">
                        <span className="font-mono text-[11px] text-text-muted">
                          {shortId(s.sessionId, 14)}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-right text-[11px] text-text-muted tabular-nums">
                        {fmtMs(s.ageMs)}
                      </td>
                      <td className="py-2 px-2 text-right text-[11px] text-text-muted tabular-nums">
                        {fmtMs(s.idleMs)}
                      </td>
                      <td className="py-2 px-2 text-right">
                        <span className="text-[11px] font-semibold tabular-nums">
                          {s.requestCount}
                        </span>
                      </td>
                      <td className="py-2 px-2">
                        {s.connectionId ? (
                          <span className="font-mono text-[10px] text-cyan-400">
                            {shortId(s.connectionId, 12)}
                          </span>
                        ) : (
                          <span className="text-text-muted/40">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {Object.keys(health?.sessions?.byApiKey ?? {}).length > 0 && (
                <div className="mt-2 pt-2 border-t border-border/40 text-[10px] text-text-muted">
                  {t("topApiKeys")}:{" "}
                  {Object.entries(health?.sessions?.byApiKey ?? {})
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([k, n]) => `${shortId(k, 8)}(${n})`)
                    .join(" · ")}
                </div>
              )}
            </div>
          )}
        </Card>

        <Card padding="md">
          <SectionHeader
            icon="radar"
            title={t("quotaMonitorsTitle")}
            subtitle={t("quotaMonitorsSubtitle")}
            trailing={
              <Link href="/dashboard/quota" className="text-[11px] text-primary hover:underline">
                {t("openQuota")} →
              </Link>
            }
          />

          {(() => {
            const monitors = health?.quotaMonitor?.monitors ?? [];
            const exhausted = monitors.filter((m) => m.status === "exhausted");
            const alerting = monitors.filter((m) => m.status === "alerting");
            const errors = monitors.filter((m) => m.status === "error");
            const total = exhausted.length + alerting.length + errors.length;
            if (total === 0) {
              return (
                <div className="text-center py-8 text-text-muted">
                  <span className="material-symbols-outlined text-[40px] opacity-30 block mb-2">
                    radar
                  </span>
                  <p className="text-sm">{t("allQuotasHealthy")}</p>
                </div>
              );
            }
            return (
              <div className="mt-2 flex flex-col gap-3">
                {exhausted.length > 0 && (
                  <QuotaGroup tone="red" label={t("statusExhausted")} items={exhausted} />
                )}
                {alerting.length > 0 && (
                  <QuotaGroup tone="amber" label={t("statusAlerting")} items={alerting} />
                )}
                {errors.length > 0 && (
                  <QuotaGroup tone="orange" label={t("statusError")} items={errors} />
                )}
              </div>
            );
          })()}
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function KpiCard({
  icon,
  label,
  value,
  hint,
  tone,
  onClick,
  active,
}: {
  icon: string;
  label: string;
  value: string | number;
  hint: string;
  tone: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left rounded-xl border px-4 py-3 transition-colors cursor-pointer bg-surface"
      style={{
        borderColor: active ? tone : "var(--color-border)",
        boxShadow: active ? `0 0 0 2px ${tone}22` : undefined,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted">
          {label}
        </span>
        <span className="material-symbols-outlined text-[16px]" style={{ color: tone }}>
          {icon}
        </span>
      </div>
      <div className="mt-1 text-2xl font-bold tabular-nums" style={{ color: tone }}>
        {value}
      </div>
      <div className="text-[10px] text-text-muted truncate">{hint}</div>
    </button>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
  trailing,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-2">
        <span className="material-symbols-outlined text-[20px] text-primary mt-0.5">{icon}</span>
        <div>
          <h2 className="text-base font-semibold text-text-main leading-tight">{title}</h2>
          {subtitle && <p className="text-[11px] text-text-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}

function LayerSection({
  id,
  title,
  description,
  badge,
  badgeTone,
  children,
}: {
  id: 1 | 2 | 3;
  title: string;
  description: string;
  badge: string;
  badgeTone: "red" | "amber" | "green" | "blue" | "orange";
  children: React.ReactNode;
}) {
  const toneMap = {
    red: { bg: "rgba(239,68,68,0.10)", text: "#ef4444" },
    amber: { bg: "rgba(234,179,8,0.10)", text: "#eab308" },
    green: { bg: "rgba(34,197,94,0.10)", text: "#22c55e" },
    blue: { bg: "rgba(59,130,246,0.10)", text: "#3b82f6" },
    orange: { bg: "rgba(249,115,22,0.10)", text: "#f97316" },
  } as const;
  const tone = toneMap[badgeTone];
  return (
    <div className="mt-4 border-t border-border/40 pt-3 first-of-type:border-t-0 first-of-type:pt-0">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
            Layer {id}
          </span>
          <h3 className="text-[13px] font-semibold text-text-main">{title}</h3>
        </div>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full tabular-nums"
          style={{ background: tone.bg, color: tone.text }}
        >
          {badge}
        </span>
      </div>
      <p className="text-[11px] text-text-muted mb-2">{description}</p>
      {children}
    </div>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <div className="text-[11px] text-text-muted italic py-3 text-center bg-bg-subtle/40 rounded-md">
      {text}
    </div>
  );
}

function QuotaGroup({
  tone,
  label,
  items,
}: {
  tone: "red" | "amber" | "orange";
  label: string;
  items: QuotaMonitor[];
}) {
  const t = useTranslations("runtime");
  const toneMap = {
    red: { text: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.20)" },
    amber: { text: "#eab308", bg: "rgba(234,179,8,0.08)", border: "rgba(234,179,8,0.20)" },
    orange: { text: "#f97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.20)" },
  } as const;
  const tc = toneMap[tone];
  return (
    <div>
      <div
        className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
        style={{ color: tc.text }}
      >
        {label}
      </div>
      <div className="flex flex-col gap-1">
        {items.slice(0, 6).map((m, i) => (
          <div
            key={`${m.accountId ?? ""}:${m.window ?? ""}:${i}`}
            className="rounded-md border px-2.5 py-1.5 flex items-center justify-between gap-2"
            style={{ background: tc.bg, borderColor: tc.border }}
          >
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-text-main truncate">
                {m.accountId ?? "—"}
                {m.provider ? ` / ${m.provider}` : ""}
              </div>
              <div className="text-[10px] text-text-muted">{m.window ?? ""}</div>
            </div>
            {typeof m.remainingPercent === "number" && (
              <span className="text-[11px] font-bold tabular-nums" style={{ color: tc.text }}>
                {Math.round(m.remainingPercent)}%
              </span>
            )}
          </div>
        ))}
        {items.length > 6 && (
          <div className="text-[10px] text-text-muted text-center pt-1">
            {t("moreSuffix", { count: items.length - 6 })}
          </div>
        )}
      </div>
    </div>
  );
}
