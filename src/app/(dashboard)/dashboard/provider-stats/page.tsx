"use client";

/**
 * Provider Stats Dashboard
 *
 * Shows per-provider and per-model statistics aggregated from call_logs,
 * plus in-memory combo metrics and telemetry data.
 */

import { useState, useEffect, useCallback, Fragment } from "react";
import { Card } from "@/shared/components";
import { useProviderNodeMap, resolveProviderName } from "@/lib/display/useProviderNodeMap";

interface ProviderStat {
  provider: string;
  totalRequests: number;
  successfulRequests: number;
  avgLatencyMs: number;
  totalTokensIn: number;
  totalTokensOut: number;
}

interface ModelStat {
  provider: string;
  model: string;
  requests: number;
  avgLatencyMs: number;
  successfulRequests: number;
}

interface ToolLatencyStat {
  avgTtftAfterToolMs: number;
  avgGapAfterToolMs: number;
  measurementCount: number;
}

type SortKey =
  | "totalRequests"
  | "successfulRequests"
  | "avgLatencyMs"
  | "totalTokensIn"
  | "totalTokensOut"
  | "avgTtftAfterToolMs"
  | "avgGapAfterToolMs";
type SortDir = "asc" | "desc";

function formatNumber(n: number | null): string {
  if (n == null) return "0";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function formatLatency(ms: number | null): string {
  if (ms == null) return "—";
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.round(ms)}ms`;
}

function successRate(successful: number, total: number): string {
  if (total === 0) return "—";
  return `${((successful / total) * 100).toFixed(1)}%`;
}

export default function ProviderStatsPage() {
  const nodeMap = useProviderNodeMap();
  const [data, setData] = useState<{
    providers: ProviderStat[];
    models: ModelStat[];
    comboMetrics: Record<string, unknown>;
    telemetry: Record<string, unknown>;
    toolLatency: Record<string, ToolLatencyStat>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("totalRequests");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/provider-stats");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  // Compute summary stats
  const totalRequests = data?.providers.reduce((s, p) => s + (p.totalRequests || 0), 0) ?? 0;
  const totalSuccessful = data?.providers.reduce((s, p) => s + (p.successfulRequests || 0), 0) ?? 0;
  const avgLatency = data?.providers.length
    ? Math.round(
        data.providers.reduce((s, p) => s + (p.avgLatencyMs || 0), 0) / data.providers.length
      )
    : 0;
  const activeProviders = data?.providers.length ?? 0;

  // Sorted providers
  const sortedProviders = [...(data?.providers ?? [])].sort((a, b) => {
    if (sortKey === "avgTtftAfterToolMs" || sortKey === "avgGapAfterToolMs") {
      const aLatency = data?.toolLatency?.[a.provider] ?? null;
      const bLatency = data?.toolLatency?.[b.provider] ?? null;
      const va = aLatency ? ((aLatency[sortKey] as number) ?? 0) : 0;
      const vb = bLatency ? ((bLatency[sortKey] as number) ?? 0) : 0;
      return sortDir === "desc" ? vb - va : va - vb;
    }
    const va = (a[sortKey] as number) ?? 0;
    const vb = (b[sortKey] as number) ?? 0;
    return sortDir === "desc" ? vb - va : va - vb;
  });

  // Group models by provider
  const modelsByProvider = new Map<string, ModelStat[]>();
  for (const m of data?.models ?? []) {
    if (!modelsByProvider.has(m.provider)) modelsByProvider.set(m.provider, []);
    modelsByProvider.get(m.provider)!.push(m);
  }

  // Sort helper icon
  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null;
    return (
      <span className="material-symbols-outlined text-[14px] ml-1 align-middle text-primary">
        {sortDir === "desc" ? "arrow_downward" : "arrow_upward"}
      </span>
    );
  };

  if (!data && !error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <p className="text-text-muted mt-4">Loading provider stats...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <span className="material-symbols-outlined text-red-500 text-[32px] mb-2">error</span>
          <p className="text-red-400">Failed to load provider stats: {error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-end gap-3">
        {lastRefresh && (
          <span className="text-xs text-text-muted">
            Updated {lastRefresh.toLocaleTimeString()}
          </span>
        )}
        <button
          onClick={fetchData}
          className="p-2 rounded-lg bg-surface hover:bg-surface/80 text-text-muted hover:text-text-main transition-colors"
          title="Refresh"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[18px]">analytics</span>
            </div>
            <span className="text-sm text-text-muted">Total Requests</span>
          </div>
          <p className="text-xl font-semibold text-text-main">{formatNumber(totalRequests)}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-blue-500/10 text-blue-500">
              <span className="material-symbols-outlined text-[18px]">timer</span>
            </div>
            <span className="text-sm text-text-muted">Avg Latency</span>
          </div>
          <p className="text-xl font-semibold text-text-main">{formatLatency(avgLatency)}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-green-500/10 text-green-500">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </div>
            <span className="text-sm text-text-muted">Success Rate</span>
          </div>
          <p className="text-xl font-semibold text-text-main">
            {successRate(totalSuccessful, totalRequests)}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-purple-500/10 text-purple-500">
              <span className="material-symbols-outlined text-[18px]">dns</span>
            </div>
            <span className="text-sm text-text-muted">Active Providers</span>
          </div>
          <p className="text-xl font-semibold text-text-main">{activeProviders}</p>
        </Card>
      </div>

      {/* Provider Table */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">table_chart</span>
            Provider Breakdown
          </h2>
          <span className="text-xs text-text-muted">{activeProviders} providers</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-text-muted font-medium">Provider</th>
                <th
                  className="text-right py-2 px-3 text-text-muted font-medium cursor-pointer hover:text-text-main transition-colors select-none"
                  onClick={() => handleSort("totalRequests")}
                >
                  Requests <SortIcon column="totalRequests" />
                </th>
                <th
                  className="text-right py-2 px-3 text-text-muted font-medium cursor-pointer hover:text-text-main transition-colors select-none"
                  onClick={() => handleSort("successfulRequests")}
                >
                  Success <SortIcon column="successfulRequests" />
                </th>
                <th className="text-right py-2 px-3 text-text-muted font-medium">Rate</th>
                <th
                  className="text-right py-2 px-3 text-text-muted font-medium cursor-pointer hover:text-text-main transition-colors select-none"
                  onClick={() => handleSort("avgLatencyMs")}
                >
                  Avg Latency <SortIcon column="avgLatencyMs" />
                </th>
                <th
                  className="text-right py-2 px-3 text-text-muted font-medium cursor-pointer hover:text-text-main transition-colors select-none"
                  onClick={() => handleSort("totalTokensIn")}
                >
                  Tokens In <SortIcon column="totalTokensIn" />
                </th>
                <th
                  className="text-right py-2 px-3 text-text-muted font-medium cursor-pointer hover:text-text-main transition-colors select-none"
                  onClick={() => handleSort("totalTokensOut")}
                >
                  Tokens Out <SortIcon column="totalTokensOut" />
                </th>
                <th
                  className="text-right py-2 px-3 text-text-muted font-medium cursor-pointer hover:text-text-main transition-colors select-none"
                  onClick={() => handleSort("avgTtftAfterToolMs")}
                >
                  TTFT After Tool <SortIcon column="avgTtftAfterToolMs" />
                </th>
                <th
                  className="text-right py-2 px-3 text-text-muted font-medium cursor-pointer hover:text-text-main transition-colors select-none"
                  onClick={() => handleSort("avgGapAfterToolMs")}
                >
                  Gap After Tool <SortIcon column="avgGapAfterToolMs" />
                </th>
                <th className="py-2 px-3 w-8" />
              </tr>
            </thead>
            <tbody>
              {sortedProviders.map((p) => {
                const isExpanded = expandedProvider === p.provider;
                const models = modelsByProvider.get(p.provider) ?? [];
                const rate =
                  p.totalRequests > 0 ? (p.successfulRequests / p.totalRequests) * 100 : 0;
                return (
                  <Fragment key={p.provider}>
                    <tr
                      className="border-b border-border/50 hover:bg-surface/50 transition-colors cursor-pointer"
                      onClick={() =>
                        setExpandedProvider(
                          isExpanded ? null : models.length > 0 ? p.provider : null
                        )
                      }
                    >
                      <td className="py-2.5 px-3 font-medium text-text-main">
                        {resolveProviderName(p.provider, nodeMap)}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-text-main">
                        {formatNumber(p.totalRequests)}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-text-main">
                        {formatNumber(p.successfulRequests)}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums">
                        <span
                          className={
                            rate >= 99
                              ? "text-green-500"
                              : rate >= 95
                                ? "text-amber-500"
                                : "text-red-500"
                          }
                        >
                          {rate.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-text-main">
                        {formatLatency(p.avgLatencyMs)}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-text-muted">
                        {formatNumber(p.totalTokensIn)}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-text-muted">
                        {formatNumber(p.totalTokensOut)}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-text-main">
                        {formatLatency(data?.toolLatency?.[p.provider]?.avgTtftAfterToolMs ?? null)}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-text-main">
                        {formatLatency(data?.toolLatency?.[p.provider]?.avgGapAfterToolMs ?? null)}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {models.length > 0 && (
                          <span
                            className={`material-symbols-outlined text-[16px] text-text-muted transition-transform ${
                              isExpanded ? "rotate-90" : ""
                            }`}
                          >
                            chevron_right
                          </span>
                        )}
                      </td>
                    </tr>
                    {isExpanded && models.length > 0 && (
                      <tr key={`${p.provider}-models`}>
                        <td colSpan={10} className="p-0">
                          <div className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-border/30">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="text-text-muted">
                                  <th className="text-left py-1.5 px-6 pl-12 font-medium">Model</th>
                                  <th className="text-right py-1.5 px-3 font-medium">Requests</th>
                                  <th className="text-right py-1.5 px-3 font-medium">Success</th>
                                  <th className="text-right py-1.5 px-3 font-medium">Rate</th>
                                  <th className="text-right py-1.5 px-3 font-medium">
                                    Avg Latency
                                  </th>
                                  <th className="px-3 w-8" />
                                </tr>
                              </thead>
                              <tbody>
                                {models.map((m) => {
                                  const mRate =
                                    m.requests > 0 ? (m.successfulRequests / m.requests) * 100 : 0;
                                  return (
                                    <tr key={m.model} className="border-t border-border/20">
                                      <td className="py-1.5 px-6 pl-12 font-mono text-text-main">
                                        {m.model}
                                      </td>
                                      <td className="py-1.5 px-3 text-right tabular-nums text-text-main">
                                        {formatNumber(m.requests)}
                                      </td>
                                      <td className="py-1.5 px-3 text-right tabular-nums text-text-main">
                                        {formatNumber(m.successfulRequests)}
                                      </td>
                                      <td className="py-1.5 px-3 text-right tabular-nums">
                                        <span
                                          className={
                                            mRate >= 99
                                              ? "text-green-500"
                                              : mRate >= 95
                                                ? "text-amber-500"
                                                : "text-red-500"
                                          }
                                        >
                                          {mRate.toFixed(1)}%
                                        </span>
                                      </td>
                                      <td className="py-1.5 px-3 text-right tabular-nums text-text-main">
                                        {formatLatency(m.avgLatencyMs)}
                                      </td>
                                      <td className="px-3 w-8" />
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {sortedProviders.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-text-muted">
                    No provider data recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* In-Memory Metrics */}
      {data?.comboMetrics && Object.keys(data.comboMetrics).length > 0 && (
        <Card
          title="Combo Metrics"
          subtitle="Per-combo latency and throughput from streaming"
          icon="speed"
          className="p-5"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-text-muted font-medium">Combo</th>
                  <th className="text-right py-2 px-3 text-text-muted font-medium">Requests</th>
                  <th className="text-right py-2 px-3 text-text-muted font-medium">Avg TTFT</th>
                  <th className="text-right py-2 px-3 text-text-muted font-medium">Avg Total</th>
                  <th className="text-right py-2 px-3 text-text-muted font-medium">Success</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.comboMetrics).map(([name, m]: [string, any]) => (
                  <tr
                    key={name}
                    className="border-b border-border/50 hover:bg-surface/50 transition-colors"
                  >
                    <td className="py-2 px-3 font-medium text-text-main">{name}</td>
                    <td className="py-2 px-3 text-right tabular-nums text-text-main">
                      {formatNumber(m.requestCount ?? m.totalRequests ?? 0)}
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums text-text-main">
                      {formatLatency(m.avgTtft ?? m.ttftMs ?? null)}
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums text-text-main">
                      {formatLatency(m.avgLatency ?? m.avgTotalMs ?? null)}
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums">
                      {typeof m.successRate === "number"
                        ? `${(m.successRate * 100).toFixed(1)}%`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Telemetry Phase Breakdown */}
      {data?.telemetry && Object.keys(data.telemetry).length > 0 && (
        <Card
          title="Request Telemetry"
          subtitle="7-phase pipeline breakdown (last 5 minutes)"
          icon="route"
          className="p-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(data.telemetry).map(([key, val]: [string, any]) => {
              if (val == null || typeof val === "object") return null;
              return (
                <div key={key} className="rounded-lg border border-border/40 bg-surface/30 p-3">
                  <p className="text-xs text-text-muted uppercase tracking-wide">
                    {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                  </p>
                  <p className="text-lg font-semibold text-text-main mt-1 tabular-nums">
                    {typeof val === "number" ? formatNumber(val) : String(val)}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
