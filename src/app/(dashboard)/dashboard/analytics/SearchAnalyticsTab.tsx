/**
 * Search Analytics Tab
 *
 * Shows search request stats from call_logs (request_type = 'search'),
 * provider breakdown, cache hit rate, and cost summary.
 */

"use client";

import { useEffect, useState } from "react";

interface SearchStats {
  total: number;
  today: number;
  cached: number;
  errors: number;
  totalCostUsd: number;
  byProvider: Record<string, { count: number; costUsd: number }>;
  last24h: Array<{ hour: string; count: number }>;
  cacheHitRate: number;
  avgDurationMs: number;
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

function ProviderBar({
  provider,
  count,
  total,
  costUsd,
}: {
  provider: string;
  count: number;
  total: number;
  costUsd: number;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-text">{provider}</span>
        <span className="text-text-muted">
          {count} queries · ${costUsd.toFixed(4)}
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

export default function SearchAnalyticsTab() {
  const [stats, setStats] = useState<SearchStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/v1/search/analytics")
      .then((r) => r.json())
      .then((d) => {
        setStats(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-text-muted">
        <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
        Loading search analytics…
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="card p-6 text-center text-text-muted">
        <span className="material-symbols-outlined text-[32px] mb-2 block">search_off</span>
        {error || "No search data available yet."}
        <p className="text-xs mt-2">
          Search requests will appear here after the first search via /v1/search.
        </p>
      </div>
    );
  }

  const providers = Object.entries(stats.byProvider).sort(([, a], [, b]) => b.count - a.count);

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon="manage_search"
          label="Total Searches"
          value={stats.total.toLocaleString()}
          sub={`${stats.today} today`}
        />
        <StatCard
          icon="cached"
          label="Cache Hit Rate"
          value={`${stats.cacheHitRate}%`}
          sub={`${stats.cached} cached requests`}
        />
        <StatCard
          icon="attach_money"
          label="Total Cost"
          value={`$${stats.totalCostUsd.toFixed(4)}`}
          sub="search API costs"
        />
        <StatCard
          icon="timer"
          label="Avg Response"
          value={`${stats.avgDurationMs}ms`}
          sub={stats.errors > 0 ? `${stats.errors} errors` : "No errors"}
        />
      </div>

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
                total={stats.total}
                costUsd={data.costUsd}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {stats.total === 0 && (
        <div className="card p-8 text-center text-text-muted">
          <span className="material-symbols-outlined text-[48px] mb-3 block text-primary opacity-50">
            travel_explore
          </span>
          <p className="font-medium text-text">No searches yet</p>
          <p className="text-sm mt-1">
            Use <code className="bg-bg-muted px-1 rounded">POST /v1/search</code> to start routing
            web searches.
          </p>
        </div>
      )}

      {/* Free tier note */}
      <div className="text-xs text-text-muted border border-border rounded-lg p-3 flex items-start gap-2">
        <span className="material-symbols-outlined text-[16px] text-green-500 mt-0.5">
          check_circle
        </span>
        <span>
          <strong>Free tier available:</strong> Serper (2,500/mo), Brave (2,000/mo), Exa (1,000/mo),
          Tavily (1,000/mo) — total 6,500+ free searches/month with automatic failover.
        </span>
      </div>
    </div>
  );
}
