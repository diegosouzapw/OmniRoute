"use client";

import { useState, useEffect, useCallback } from "react";
import Card from "./Card";
import { CardSkeleton } from "./Loading";
import { fmtCompact as fmt, fmtFull, fmtCost } from "@/shared/utils/formatting";
import {
  StatCard,
  ActivityHeatmap,
  DailyTrendChart,
  AccountDonut,
  ApiKeyDonut,
  ApiKeyTable,
  MostActiveDay7d,
  WeeklySquares7d,
  ModelTable,
} from "./analytics";

// ============================================================================
// Main Component
// ============================================================================

export default function UsageAnalytics() {
  const [range, setRange] = useState("30d");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/usage/analytics?range=${range}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setAnalytics(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const ranges = [
    { value: "7d", label: "7D" },
    { value: "30d", label: "30D" },
    { value: "90d", label: "90D" },
    { value: "ytd", label: "YTD" },
    { value: "all", label: "All" },
  ];

  if (loading && !analytics) return <CardSkeleton />;
  if (error) return <Card className="p-6 text-center text-red-500">Error: {error}</Card>;

  const s = analytics?.summary || {};

  return (
    <div className="flex flex-col gap-5">
      {/* Header + Time Range */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">analytics</span>
          Usage Analytics
        </h2>
        <div className="flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.03] rounded-lg p-1 border border-black/5 dark:border-white/5">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                range === r.value
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <StatCard
          icon="generating_tokens"
          label="Total Tokens"
          value={fmt(s.totalTokens)}
          subValue={`${fmtFull(s.totalRequests)} requests`}
        />
        <StatCard
          icon="input"
          label="Input Tokens"
          value={fmt(s.promptTokens)}
          color="text-primary"
        />
        <StatCard
          icon="output"
          label="Output Tokens"
          value={fmt(s.completionTokens)}
          color="text-emerald-500"
        />
        <StatCard icon="group" label="Accounts" value={s.uniqueAccounts || 0} />
        <StatCard icon="vpn_key" label="API Keys" value={s.uniqueApiKeys || 0} />
        <StatCard icon="model_training" label="Models" value={s.uniqueModels || 0} />
      </div>

      {/* Activity Heatmap + Weekly Widgets */}
      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, alignItems: "stretch" }}
      >
        <ActivityHeatmap activityMap={analytics?.activityMap} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <MostActiveDay7d activityMap={analytics?.activityMap} />
          <WeeklySquares7d activityMap={analytics?.activityMap} />
        </div>
      </div>

      {/* Token Trend + Account Donut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DailyTrendChart dailyTrend={analytics?.dailyTrend} />
        <AccountDonut byAccount={analytics?.byAccount} />
      </div>

      {/* API Key Graph + Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ApiKeyDonut byApiKey={analytics?.byApiKey} />
        <ApiKeyTable byApiKey={analytics?.byApiKey} />
      </div>

      {/* Model Breakdown Table */}
      <ModelTable byModel={analytics?.byModel} summary={s} />

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold">Requests</span>
          <div className="text-lg font-bold mt-1">{fmtFull(s.totalRequests)}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold">Models</span>
          <div className="text-lg font-bold mt-1">{s.uniqueModels}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold">Accounts</span>
          <div className="text-lg font-bold mt-1">{s.uniqueAccounts}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold">Streak</span>
          <div className="text-lg font-bold mt-1">{s.streak || 0}d</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold">Total Tokens</span>
          <div className="text-lg font-bold mt-1">{fmt(s.totalTokens)}</div>
          <span className="text-[10px] text-text-muted">Est. {fmtCost(s.totalCost)}</span>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="text-xs text-text-muted uppercase font-semibold">Usage Cost</span>
          <div className="text-lg font-bold text-amber-500 mt-1">{fmtCost(s.totalCost)}</div>
        </Card>
      </div>
    </div>
  );
}
