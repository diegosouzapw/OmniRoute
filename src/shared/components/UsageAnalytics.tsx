"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Card from "./Card";
import { CardSkeleton } from "./Loading";
import { fmtCompact as fmt, fmtFull, fmtCost } from "@/shared/utils/formatting";
import {
  StatCard,
  CompactStatGrid,
  ActivityHeatmap,
  DailyTrendChart,
  AccountDonut,
  ApiKeyDonut,
  ApiKeyTable,
  MostActiveDay7d,
  WeeklySquares7d,
  ModelTable,
  ProviderCostDonut,
  ModelOverTimeChart,
  ProviderTable,
  ApiKeyFilterDropdown,
  CustomRangePicker,
} from "./analytics";

// ============================================================================
// Main Component
// ============================================================================

export default function UsageAnalytics() {
  const [range, setRange] = useState("30d");
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Custom date range state
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const customPickerAnchorRef = useRef<HTMLDivElement>(null);

  // API key filter state
  const [selectedApiKeys, setSelectedApiKeys] = useState<string[]>([]);
  const [availableApiKeys, setAvailableApiKeys] = useState<{ id: string; name: string }[]>([]);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set("range", range);
      if (range === "custom" && customStart && customEnd) {
        params.set("startDate", customStart);
        params.set("endDate", customEnd);
      }
      if (selectedApiKeys.length > 0) {
        params.set("apiKeyIds", selectedApiKeys.join(","));
      }
      const res = await fetch(`/api/usage/analytics?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setAnalytics(data);
      setError(null);

      // Update available keys from unfiltered data (only when no filter is active).
      // Use apiKeyName as the stable identifier — it is always populated
      // for every OmniRoute API key regardless of the downstream provider.
      if (selectedApiKeys.length === 0 && data.byApiKey?.length > 0) {
        const seen = new Set<string>();
        const keys: { id: string; name: string }[] = [];
        for (const k of data.byApiKey) {
          const name = k.apiKeyName || k.apiKeyId || "unknown";
          if (seen.has(name)) continue;
          seen.add(name);
          keys.push({ id: name, name });
        }
        setAvailableApiKeys(keys);
      }
    } catch (err) {
      setError((err as any).message);
    } finally {
      setLoading(false);
    }
  }, [range, customStart, customEnd, selectedApiKeys]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleRangeSelect = useCallback((value: string) => {
    if (value === "custom") {
      setShowCustomPicker(true);
    } else {
      setRange(value);
      setShowCustomPicker(false);
    }
  }, []);

  const handleCustomApply = useCallback((start: string, end: string) => {
    setCustomStart(start);
    setCustomEnd(end);
    setRange("custom");
    setShowCustomPicker(false);
  }, []);

  // Format custom range label for display
  const customRangeLabel = useMemo(() => {
    if (range !== "custom" || !customStart || !customEnd) return null;
    const fmt = (iso: string) => {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };
    return `${fmt(customStart)} — ${fmt(customEnd)}`;
  }, [range, customStart, customEnd]);

  const ranges = [
    { value: "1d", label: "1D" },
    { value: "7d", label: "7D" },
    { value: "30d", label: "30D" },
    { value: "90d", label: "90D" },
    { value: "ytd", label: "YTD" },
    { value: "all", label: "All" },
  ];

  const topModel = useMemo(() => {
    const models = analytics?.byModel || [];
    return models.length > 0 ? models[0].model : "—";
  }, [analytics]);

  const topProvider = useMemo(() => {
    const providers = analytics?.byProvider || [];
    return providers.length > 0 ? providers[0].provider : "—";
  }, [analytics]);

  const busiestDay = useMemo(() => {
    const wp = analytics?.weeklyPattern || [];
    if (!wp.length) return "—";
    const max = wp.reduce((a, b) => (a.avgTokens > b.avgTokens ? a : b), wp[0]);
    return max.avgTokens > 0 ? max.day : "—";
  }, [analytics]);

  const providerCount = useMemo(() => {
    return (analytics?.byProvider || []).length;
  }, [analytics]);

  const providerDiversity = useMemo(() => {
    const providers = analytics?.byProvider || [];
    if (providers.length <= 1) return 0;

    let totalCalls = 0;
    for (const p of providers) {
      totalCalls += p.totalRequests || p.apiCalls || 0;
    }
    if (totalCalls === 0) return 0;

    let h = 0;
    for (const p of providers) {
      const p_i = (p.totalRequests || p.apiCalls || 0) / totalCalls;
      if (p_i > 0) h -= p_i * Math.log2(p_i);
    }

    const maxH = Math.log2(providers.length);
    return maxH > 0 ? (h / maxH) * 100 : 0;
  }, [analytics]);

  if (loading && !analytics) return <CardSkeleton />;
  if (error) return <Card className="p-6 text-center text-red-500">Error: {error}</Card>;

  const s = analytics?.summary || {};

  // ── Derived insight values ──
  const avgTokensPerReq = s.totalRequests > 0 ? Math.round(s.totalTokens / s.totalRequests) : 0;
  const costPerReq = s.totalRequests > 0 ? s.totalCost / s.totalRequests : 0;
  const ioRatio = s.completionTokens > 0 ? (s.promptTokens / s.completionTokens).toFixed(1) : "—";

  return (
    <div className="flex flex-col gap-5 min-w-0">
      {/* Header + Filters */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">analytics</span>
          Usage Analytics
        </h2>
        <div className="flex items-center gap-2.5">
          {/* API Key Filter */}
          <ApiKeyFilterDropdown
            available={availableApiKeys}
            selected={selectedApiKeys}
            onChange={setSelectedApiKeys}
          />

          {/* Period Selector + Custom */}
          <div
            className="relative flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.03] rounded-lg p-1 border border-black/5 dark:border-white/5"
            ref={customPickerAnchorRef}
          >
            {ranges.map((r) => (
              <button
                key={r.value}
                onClick={() => handleRangeSelect(r.value)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  range === r.value
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {r.label}
              </button>
            ))}
            <button
              onClick={() => handleRangeSelect("custom")}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
                range === "custom"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">date_range</span>
              {customRangeLabel || "Custom"}
              {range === "custom" && customRangeLabel && (
                <span
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRange("30d");
                    setCustomStart("");
                    setCustomEnd("");
                  }}
                  className="ml-0.5 opacity-70 hover:opacity-100"
                >
                  <span className="material-symbols-outlined text-[11px]">close</span>
                </span>
              )}
            </button>

            {/* Custom Range Picker Popover */}
            {showCustomPicker && (
              <CustomRangePicker
                start={customStart}
                end={customEnd}
                onApply={handleCustomApply}
                onClose={() => setShowCustomPicker(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
        <StatCard
          icon="payments"
          label="Est. Cost"
          value={fmtCost(s.totalCost)}
          color="text-amber-500"
        />
      </div>

      {/* Secondary Metrics — compact grid with sections */}
      <CompactStatGrid
        sections={[
          {
            title: "Infrastructure",
            items: [
              { icon: "group", label: "Accounts", value: s.uniqueAccounts || 0 },
              { icon: "dns", label: "Providers", value: providerCount, color: "text-indigo-500" },
              { icon: "vpn_key", label: "API Keys", value: s.uniqueApiKeys || 0 },
              { icon: "model_training", label: "Models", value: s.uniqueModels || 0 },
            ],
          },
          {
            title: "Performance",
            items: [
              {
                icon: "speed",
                label: "Avg Tokens/Req",
                value: fmt(avgTokensPerReq),
                color: "text-cyan-500",
              },
              {
                icon: "request_quote",
                label: "Cost/Req",
                value: fmtCost(costPerReq),
                color: "text-orange-500",
              },
              {
                icon: "compare_arrows",
                label: "I/O Ratio",
                value: `${ioRatio}x`,
                color: "text-violet-500",
              },
              {
                icon: "swap_horiz",
                label: "Fallback Rate",
                value: `${Number(s.fallbackRatePct || 0).toFixed(1)}%`,
                color: "text-amber-500",
              },
            ],
          },
          {
            title: "Highlights",
            wideValues: true,
            items: [
              { icon: "star", label: "Top Model", value: topModel, color: "text-pink-500" },
              { icon: "cloud", label: "Top Provider", value: topProvider, color: "text-teal-500" },
              { icon: "today", label: "Busiest Day", value: busiestDay, color: "text-rose-500" },
              {
                icon: "network_node",
                label: "Diversity",
                value: `${providerDiversity.toFixed(1)}%`,
                color: "text-sky-500",
              },
            ],
          },
        ]}
      />

      {/* Activity Heatmap + Weekly Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 items-stretch">
        <ActivityHeatmap activityMap={analytics?.activityMap} />
        <div className="flex flex-col gap-4">
          <MostActiveDay7d activityMap={analytics?.activityMap} />
          <WeeklySquares7d activityMap={analytics?.activityMap} />
        </div>
      </div>

      {/* Token & Cost Trend + Provider Cost Donut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DailyTrendChart dailyTrend={analytics?.dailyTrend} />
        <ProviderCostDonut byProvider={analytics?.byProvider} />
      </div>

      {/* Model Usage Over Time (stacked area) */}
      <ModelOverTimeChart
        dailyByModel={analytics?.dailyByModel}
        modelNames={analytics?.modelNames}
      />

      {/* Account Donut + API Key Donut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AccountDonut byAccount={analytics?.byAccount} />
        <ApiKeyDonut byApiKey={analytics?.byApiKey} />
      </div>

      {/* Provider Breakdown Table */}
      <ProviderTable byProvider={analytics?.byProvider} />

      {/* API Key Table */}
      <ApiKeyTable byApiKey={analytics?.byApiKey} />

      {/* Model Breakdown Table */}
      <ModelTable byModel={analytics?.byModel} summary={s} />
    </div>
  );
}
