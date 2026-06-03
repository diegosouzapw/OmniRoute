"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import Card from "@/shared/components/Card";
import { CardSkeleton } from "@/shared/components/Loading";
import {
  extractComboRuntimeConfig,
  getComboControlCenterTargets,
  getResolvedComboControlCenterTargets,
  summarizeComboControlCenter,
  type ComboControlCenterCombo,
  type ComboControlCenterHealth,
  type ComboControlCenterMetrics,
  type ComboControlCenterSummary,
  type ComboControlCenterTarget,
  type ComboControlCenterTargetHealth,
} from "@/lib/combos/controlCenter";
import { getProviderDisplayName } from "@/lib/display/names";

type TimeRange = "1h" | "24h" | "7d" | "30d";

type ComboMetricsResponse = {
  metrics?: ComboControlCenterMetrics | null;
  message?: string;
};

type ComboHealthResponse = {
  combos?: ComboControlCenterHealth[];
};

type CallLogEntry = {
  id?: string;
  requestId?: string;
  timestamp?: string;
  status?: number;
  model?: string;
  provider?: string;
  duration?: number;
  comboName?: string;
  comboStepId?: string | null;
  comboExecutionKey?: string | null;
  error?: string | null;
};

const TIME_RANGES: TimeRange[] = ["1h", "24h", "7d", "30d"];

const STATE_STYLES: Record<ComboControlCenterSummary["healthState"], string> = {
  healthy: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  critical: "border-red-500/20 bg-red-500/10 text-red-400",
  idle: "border-blue-500/20 bg-blue-500/10 text-blue-400",
};

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      typeof json?.error === "string"
        ? json.error
        : typeof json?.error?.message === "string"
          ? json.error.message
          : `HTTP ${res.status}`;
    throw new Error(message);
  }
  return json as T;
}

function fmtPercent(value: number | null | undefined): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return `${Math.round(value)}%`;
}

function fmtMs(value: number | null | undefined): string {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return "—";
  return `${Math.round(value)}ms`;
}

function fmtDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString();
}

function shortId(value: string | null | undefined, max = 10): string {
  if (!value) return "dynamic";
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

function metricValue(label: string, value: string, hint?: string) {
  return (
    <div className="rounded-xl border border-border bg-bg-subtle p-3">
      <p className="text-xs uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-1 text-xl font-semibold text-text-main">{value}</p>
      {hint && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
    </div>
  );
}

function stateLabel(state: ComboControlCenterSummary["healthState"]): string {
  if (state === "healthy") return "Healthy";
  if (state === "warning") return "Needs attention";
  if (state === "critical") return "Critical";
  return "Idle";
}

function targetHealthTone(target: ComboControlCenterTarget | ComboControlCenterTargetHealth) {
  const health = "health" in target ? target.health : target;
  if (!health) return "border-border bg-surface text-text-muted";
  if (health.lastStatus === "error" || health.quotaIsExhausted) {
    return "border-red-500/20 bg-red-500/10 text-red-300";
  }
  if ((health.quotaRemainingPct ?? 100) < 25 || (health.successRate ?? 100) < 95) {
    return "border-amber-500/20 bg-amber-500/10 text-amber-300";
  }
  return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
}

function TargetConfiguredRow({ target }: { target: ComboControlCenterTarget }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {target.index + 1}
            </span>
            <span className="rounded-full border border-border bg-bg-subtle px-2 py-0.5 text-[11px] uppercase tracking-wide text-text-muted">
              {target.kind === "combo-ref" ? "Nested combo" : "Model target"}
            </span>
            {target.weight > 0 && (
              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-300">
                {target.weight}% weight
              </span>
            )}
          </div>
          <p className="mt-2 truncate font-mono text-sm text-text-main">{target.label}</p>
          <p className="mt-1 text-xs text-text-muted">
            {target.provider ? getProviderDisplayName(target.provider) : "Combo reference"} ·
            account {shortId(target.connectionId)}
          </p>
        </div>
        <div className={`rounded-lg border px-3 py-2 text-xs ${targetHealthTone(target)}`}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <span>Requests</span>
            <span className="text-right font-semibold">{target.health?.requests ?? 0}</span>
            <span>Success</span>
            <span className="text-right font-semibold">
              {fmtPercent(target.health?.successRate)}
            </span>
            <span>Latency</span>
            <span className="text-right font-semibold">{fmtMs(target.health?.avgLatencyMs)}</span>
            <span>Quota</span>
            <span className="text-right font-semibold">
              {fmtPercent(target.health?.quotaRemainingPct)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResolvedTargetRow({ target }: { target: ComboControlCenterTargetHealth }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="truncate font-mono text-sm text-text-main">{target.model || "unknown"}</p>
          <p className="mt-1 text-xs text-text-muted">
            {target.provider ? getProviderDisplayName(target.provider) : "unknown provider"} ·
            account {shortId(target.connectionId)} · key {shortId(target.executionKey)}
          </p>
        </div>
        <div className={`rounded-lg border px-3 py-2 text-xs ${targetHealthTone(target)}`}>
          {target.requests ?? 0} req · {fmtPercent(target.successRate)} success ·{" "}
          {fmtMs(target.avgLatencyMs)} · quota {fmtPercent(target.quotaRemainingPct)}
        </div>
      </div>
    </div>
  );
}

function RecentLogRow({ log }: { log: CallLogEntry }) {
  const ok = typeof log.status === "number" && log.status >= 200 && log.status < 400;
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="truncate text-sm text-text-main">
            <span className={ok ? "text-emerald-400" : "text-red-400"}>{log.status || "—"}</span>{" "}
            {log.model || "unknown model"}
          </p>
          <p className="text-xs text-text-muted">
            {fmtDate(log.timestamp)} · {log.provider || "unknown provider"} · step{" "}
            {shortId(log.comboStepId || log.comboExecutionKey)}
          </p>
        </div>
        <div className="text-xs text-text-muted">{fmtMs(log.duration)}</div>
      </div>
      {log.error && <p className="mt-1 text-xs text-red-300">{log.error}</p>}
    </div>
  );
}

export default function ComboControlCenterClient({ comboId }: { comboId: string }) {
  const [combo, setCombo] = useState<ComboControlCenterCombo | null>(null);
  const [metrics, setMetrics] = useState<ComboControlCenterMetrics | null>(null);
  const [health, setHealth] = useState<ComboControlCenterHealth | null>(null);
  const [logs, setLogs] = useState<CallLogEntry[]>([]);
  const [range, setRange] = useState<TimeRange>("24h");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const comboData = await fetchJson<ComboControlCenterCombo>(`/api/combos/${comboId}`);
      const [metricsData, healthData, logsData] = await Promise.all([
        fetchJson<ComboMetricsResponse>(
          `/api/combos/metrics?combo=${encodeURIComponent(comboData.name || "")}`
        ).catch(() => ({ metrics: null })),
        fetchJson<ComboHealthResponse>(`/api/usage/combo-health?range=${range}&comboId=${comboId}`)
          .then((data) => data.combos?.[0] || null)
          .catch(() => null),
        fetchJson<CallLogEntry[]>(
          `/api/usage/call-logs?combo=1&search=${encodeURIComponent(comboData.name || "")}&limit=8`
        ).catch(() => []),
      ]);

      setCombo(comboData);
      setMetrics(metricsData.metrics || null);
      setHealth(healthData);
      setLogs(toArray<CallLogEntry>(logsData));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load combo control center");
    } finally {
      setLoading(false);
    }
  }, [comboId, range]);

  useEffect(() => {
    void load();
  }, [load]);

  const summary = useMemo(
    () => (combo ? summarizeComboControlCenter(combo, metrics, health) : null),
    [combo, metrics, health]
  );
  const configuredTargets = useMemo(
    () => (combo ? getComboControlCenterTargets(combo, health) : []),
    [combo, health]
  );
  const resolvedTargets = useMemo(() => getResolvedComboControlCenterTargets(health), [health]);
  const runtimeConfig = useMemo(() => (combo ? extractComboRuntimeConfig(combo) : {}), [combo]);

  if (loading && !combo) {
    return (
      <div className="space-y-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (error && !combo) {
    return (
      <div className="space-y-4">
        <Link href="/dashboard/combos" className="text-sm text-primary hover:underline">
          ← Back to Combos
        </Link>
        <Card className="border border-red-500/20 bg-red-500/10 p-6">
          <h1 className="text-lg font-semibold text-red-300">Combo Control Center unavailable</h1>
          <p className="mt-2 text-sm text-red-200">{error}</p>
        </Card>
      </div>
    );
  }

  if (!combo || !summary) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link href="/dashboard/combos" className="text-sm text-primary hover:underline">
            ← Back to Combos
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-text-main">Combo Control Center</h1>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${STATE_STYLES[summary.healthState]}`}
            >
              {stateLabel(summary.healthState)}
            </span>
            <span className="rounded-full border border-border bg-bg-subtle px-3 py-1 text-xs text-text-muted">
              {summary.isActive ? "Active" : "Disabled"}
            </span>
          </div>
          <p className="mt-2 max-w-3xl text-sm text-text-muted">
            Central read-only view for routing behavior, health, quota, runtime metrics and recent
            decisions for <code className="font-mono text-text-main">{combo.name}</code>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main transition-colors hover:bg-surface/80"
          >
            Refresh
          </button>
          <Link
            href="/dashboard/combos"
            className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary transition-colors hover:bg-primary/20"
          >
            Edit in Combos
          </Link>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metricValue("Requests", String(summary.totalRequests), `${range} window`)}
        {metricValue("Success", fmtPercent(summary.successRate), "runtime/health blend")}
        {metricValue("Latency", fmtMs(summary.avgLatencyMs), "average response time")}
        {metricValue(
          "Worst quota",
          fmtPercent(summary.worstQuotaRemainingPct),
          "provider/account telemetry"
        )}
      </div>

      <Card className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-main">Overview</h2>
            <p className="mt-1 text-sm text-text-muted">
              Strategy, runtime status and control links for this combo.
            </p>
          </div>
          <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-bg-subtle p-1">
            {TIME_RANGES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRange(item)}
                className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${
                  range === item
                    ? "bg-primary/10 text-primary"
                    : "text-text-muted hover:bg-surface hover:text-text-main"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-bg-subtle p-3">
            <p className="text-xs uppercase tracking-wide text-text-muted">Strategy</p>
            <p className="mt-1 font-semibold text-text-main">{summary.strategy}</p>
          </div>
          <div className="rounded-xl border border-border bg-bg-subtle p-3">
            <p className="text-xs uppercase tracking-wide text-text-muted">Targets</p>
            <p className="mt-1 font-semibold text-text-main">
              {summary.targetCount} configured · {resolvedTargets.length} resolved
            </p>
          </div>
          <div className="rounded-xl border border-border bg-bg-subtle p-3">
            <p className="text-xs uppercase tracking-wide text-text-muted">Providers</p>
            <p className="mt-1 font-semibold text-text-main">{summary.providerCount}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-border bg-surface p-3">
          <p className="text-sm font-medium text-text-main">Health reasons</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {summary.healthReasons.map((reason) => (
              <span
                key={reason}
                className="rounded-full border border-border bg-bg-subtle px-2 py-1 text-xs text-text-muted"
              >
                {reason}
              </span>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-text-main">Configured targets</h2>
              <p className="mt-1 text-sm text-text-muted">
                The saved combo steps, enriched with matching health data when available.
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {configuredTargets.length === 0 ? (
              <p className="text-sm text-text-muted">No targets configured.</p>
            ) : (
              configuredTargets.map((target) => (
                <TargetConfiguredRow key={target.id} target={target} />
              ))
            )}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-semibold text-text-main">Runtime config</h2>
          <p className="mt-1 text-sm text-text-muted">Selected advanced settings for this combo.</p>
          <div className="mt-4 space-y-2">
            {Object.keys(runtimeConfig).length === 0 ? (
              <p className="text-sm text-text-muted">No custom runtime config.</p>
            ) : (
              Object.entries(runtimeConfig).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2"
                >
                  <span className="text-sm text-text-muted">{key}</span>
                  <code className="max-w-45 truncate text-xs text-text-main">
                    {typeof value === "object" ? JSON.stringify(value) : String(value)}
                  </code>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="text-lg font-semibold text-text-main">Resolved runtime targets</h2>
        <p className="mt-1 text-sm text-text-muted">
          Flattened targets after nested combo resolution and target-level metrics.
        </p>
        <div className="mt-4 space-y-3">
          {resolvedTargets.length === 0 ? (
            <p className="text-sm text-text-muted">No resolved target health yet.</p>
          ) : (
            resolvedTargets.map((target) => (
              <ResolvedTargetRow
                key={target.executionKey || `${target.model}-${target.connectionId}`}
                target={target}
              />
            ))
          )}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-text-main">Quota and distribution</h2>
          <div className="mt-4 space-y-3">
            {(health?.quotaHealth?.providers || []).length === 0 ? (
              <p className="text-sm text-text-muted">No quota snapshots for this combo window.</p>
            ) : (
              health?.quotaHealth?.providers?.map((provider) => (
                <div
                  key={provider.provider}
                  className="rounded-lg border border-border bg-surface px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-text-main">
                      {getProviderDisplayName(provider.provider)}
                    </span>
                    <span className={provider.isExhausted ? "text-red-300" : "text-text-muted"}>
                      {fmtPercent(provider.remainingPct)} · {provider.trend}
                    </span>
                  </div>
                </div>
              ))
            )}
            <div className="rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm text-text-muted">
              Usage skew: <span className="text-text-main">{summary.usageSkew.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-semibold text-text-main">Recent routing decisions</h2>
          <p className="mt-1 text-sm text-text-muted">
            Recent call logs filtered by this combo name. Open Analytics for full explainability.
          </p>
          <div className="mt-4 space-y-2">
            {logs.length === 0 ? (
              <p className="text-sm text-text-muted">No recent combo call logs found.</p>
            ) : (
              logs.map((log) => (
                <RecentLogRow key={log.id || `${log.timestamp}-${log.model}`} log={log} />
              ))
            )}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="text-lg font-semibold text-text-main">Quick links</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ["Combo Health", "/dashboard/analytics/combo-health"],
            ["Call Logs", "/dashboard/logs"],
            ["Costs", "/dashboard/costs"],
            ["Quota", "/dashboard/quota"],
            ["Playground", "/dashboard/playground"],
            ["Providers", "/dashboard/providers"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main transition-colors hover:bg-surface/80"
            >
              {label}
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
