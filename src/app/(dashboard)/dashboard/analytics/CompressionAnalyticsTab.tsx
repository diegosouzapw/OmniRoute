/**
 * Compression Analytics Tab
 *
 * Shows compression request stats from call_logs (request_type = 'compression'),
 * mode breakdown, provider breakdown, and cost/token savings summary.
 */

"use client";

import { useEffect, useState } from "react";

interface CompressionAnalyticsSummary {
  totalRequests: number;
  totalTokensSaved: number;
  avgSavingsPct: number;
  avgDurationMs: number;
  byMode: Record<string, { count: number; tokensSaved: number; avgSavingsPct: number }>;
  byProvider: Record<string, { count: number; tokensSaved: number }>;
  last24h: Array<{ hour: string; count: number; tokensSaved: number }>;
  validationFallbacks: number;
  realUsage: {
    requestsWithReceipts: number;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    estimatedUsdSaved: number;
    bySource: Record<string, number>;
  };
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="card p-4 flex flex-col gap-1">
      <div className="flex items-center gap-2 text-text-muted text-sm">
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
        {label}
      </div>
      <div className="text-2xl font-bold text-text">{value}</div>
      {sub && <div className="text-xs text-text-muted">{sub}</div>}
    </div>
  );
}

function ModeBar({
  mode,
  count,
  total,
  tokensSaved,
}: {
  mode: string;
  count: number;
  total: number;
  tokensSaved: number;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-text capitalize">{mode}</span>
        <span className="text-text-muted">
          {count} requests · {tokensSaved.toLocaleString()} tokens saved
        </span>
      </div>
      <div className="h-2 rounded-full bg-bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-text-muted text-right">{pct}%</div>
    </div>
  );
}

function ProviderBar({
  provider,
  count,
  total,
  tokensSaved,
}: {
  provider: string;
  count: number;
  total: number;
  tokensSaved: number;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-text">{provider}</span>
        <span className="text-text-muted">
          {count} requests · {tokensSaved.toLocaleString()} tokens saved
        </span>
      </div>
      <div className="h-2 rounded-full bg-bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-text-muted text-right">{pct}%</div>
    </div>
  );
}

export default function CompressionAnalyticsTab() {
  const [stats, setStats] = useState<CompressionAnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [since, setSince] = useState<"24h" | "7d" | "30d" | "all">("24h");

  useEffect(() => {
    fetch(`/api/analytics/compression?since=${since}`)
      .then((r) => r.json())
      .then((d) => {
        setStats(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [since]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-text-muted">
        <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
        Loading compression analytics…
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="card p-6 text-center text-text-muted">
        <span className="material-symbols-outlined text-[32px] mb-2 block">compress</span>
        {error || "No compression data yet."}
        <p className="text-xs mt-2">
          Compression requests will appear here after the first request via /v1/chat/completions
          with compression enabled.
        </p>
      </div>
    );
  }

  const modes = Object.entries(stats.byMode).sort(([, a], [, b]) => b.count - a.count);
  const providers = Object.entries(stats.byProvider).sort(([, a], [, b]) => b.count - a.count);

  // Calculate max tokens for hourly chart scaling
  const maxTokensPerHour = Math.max(...stats.last24h.map((h) => h.tokensSaved), 1);
  const maxCountPerHour = Math.max(...stats.last24h.map((h) => h.count), 1);

  return (
    <div className="flex flex-col gap-6">
      {/* Time Range Selector */}
      <div className="flex gap-2">
        {(["24h", "7d", "30d", "all"] as const).map((range) => (
          <button
            key={range}
            onClick={() => setSince(range)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              since === range
                ? "bg-primary text-primary-foreground"
                : "bg-bg-muted text-text-muted hover:bg-bg-muted/80"
            }`}
          >
            {range === "24h"
              ? "Last 24h"
              : range === "7d"
                ? "Last 7d"
                : range === "30d"
                  ? "Last 30d"
                  : "All time"}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <StatCard
          icon="compress"
          label="Total Requests"
          value={stats.totalRequests.toLocaleString()}
        />
        <StatCard
          icon="token"
          label="Tokens Saved"
          value={stats.totalTokensSaved.toLocaleString()}
        />
        <StatCard icon="percent" label="Avg Savings" value={`${stats.avgSavingsPct}%`} />
        <StatCard icon="timer" label="Avg Duration" value={`${stats.avgDurationMs}ms`} />
        <StatCard
          icon="receipt_long"
          label="Receipts"
          value={stats.realUsage.requestsWithReceipts.toLocaleString()}
          sub={`${stats.realUsage.totalTokens.toLocaleString()} real tokens`}
        />
        <StatCard
          icon="verified"
          label="Fallbacks"
          value={stats.validationFallbacks.toLocaleString()}
          sub="validation restores"
        />
      </div>

      {stats.realUsage.requestsWithReceipts > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">receipt_long</span>
            Real Usage Receipts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
            <div>
              <div className="text-text-muted">Prompt tokens</div>
              <div className="text-lg font-semibold text-text">
                {stats.realUsage.promptTokens.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-text-muted">Completion tokens</div>
              <div className="text-lg font-semibold text-text">
                {stats.realUsage.completionTokens.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-text-muted">Total tokens</div>
              <div className="text-lg font-semibold text-text">
                {stats.realUsage.totalTokens.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-text-muted">Cache tokens</div>
              <div className="text-lg font-semibold text-text">
                {(
                  (stats.realUsage.cacheReadTokens ?? 0) + (stats.realUsage.cacheWriteTokens ?? 0)
                ).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-text-muted">Sources</div>
              <div className="text-lg font-semibold text-text">
                {Object.entries(stats.realUsage.bySource)
                  .map(([source, count]) => `${source}: ${count}`)
                  .join(", ")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode Breakdown */}
      {modes.length > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
            Mode Breakdown
          </h3>
          <div className="flex flex-col gap-4">
            {modes.map(([mode, data]) => (
              <ModeBar
                key={mode}
                mode={mode}
                count={data.count}
                total={stats.totalRequests}
                tokensSaved={data.tokensSaved}
              />
            ))}
          </div>
        </div>
      )}

      {/* Provider Breakdown */}
      {providers.length > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">hub</span>
            Provider Breakdown
          </h3>
          <div className="flex flex-col gap-4">
            {providers.map(([prov, data]) => (
              <ProviderBar
                key={prov}
                provider={prov}
                count={data.count}
                total={stats.totalRequests}
                tokensSaved={data.tokensSaved}
              />
            ))}
          </div>
        </div>
      )}

      {/* Last 24h Hourly Chart (CSS-only height-based bars) */}
      {stats.last24h.length > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">show_chart</span>
            Last 24 Hours (Activity)
          </h3>
          <div className="flex items-end gap-2 h-48">
            {stats.last24h.map((entry, idx) => {
              const countPct = (entry.count / maxCountPerHour) * 100;
              const tokenPct = (entry.tokensSaved / maxTokensPerHour) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-sm bg-gradient-to-b from-primary to-primary/70 transition-all hover:opacity-80 cursor-pointer group relative"
                    style={{ height: `${Math.max(countPct, 5)}%` }}
                    title={`${entry.hour}: ${entry.count} requests, ${entry.tokensSaved.toLocaleString()} tokens saved`}
                  >
                    <div className="absolute -top-6 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-text-muted whitespace-nowrap text-center">
                      {entry.count}
                    </div>
                  </div>
                  <div className="text-xs text-text-muted rotate-45 origin-left">
                    {entry.hour.substring(11, 13)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-text-muted">
            <div>Max requests/hour: {maxCountPerHour}</div>
            <div>Max tokens/hour: {maxTokensPerHour.toLocaleString()}</div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {stats.totalRequests === 0 && (
        <div className="card p-8 text-center text-text-muted">
          <span className="material-symbols-outlined text-[48px] mb-3 block text-primary opacity-50">
            compress
          </span>
          <p className="font-medium text-text">No compression data yet</p>
          <p className="text-sm mt-1">
            Use <code className="bg-bg-muted px-1 rounded">POST /v1/chat/completions</code> with
            compression configuration to start tracking compression analytics.
          </p>
        </div>
      )}

      {/* Info note */}
      <div className="text-xs text-text-muted border border-border rounded-lg p-3 flex items-start gap-2">
        <span className="material-symbols-outlined text-[16px] text-blue-500 mt-0.5">info</span>
        <span>
          <strong>Compression analytics:</strong> Token savings tracked per mode (off, lite,
          standard, aggressive, ultra, RTK, stacked), engine, compression combo, and provider. Hover
          over charts for details. Use the time selector to view different time periods.
        </span>
      </div>
    </div>
  );
}
