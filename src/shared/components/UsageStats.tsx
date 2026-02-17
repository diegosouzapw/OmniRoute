"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "./Card";
import Badge from "./Badge";
import { CardSkeleton } from "./Loading";
import { fmtFull, fmtCost } from "@/shared/utils/formatting";

function SortIcon({ field, currentSort, currentOrder }: { field: string; currentSort: string; currentOrder: string }) {
  if (currentSort !== field) return <span className="ml-1 opacity-20">↕</span>;
  return <span className="ml-1">{currentOrder === "asc" ? "↑" : "↓"}</span>;
}

SortIcon.propTypes = {
  field: PropTypes.string.isRequired,
  currentSort: PropTypes.string.isRequired,
  currentOrder: PropTypes.string.isRequired,
};

function MiniBarGraph({ data, colorClass = "bg-primary" }: { data: number[]; colorClass?: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-8 w-24">
      {data.slice(-9).map((val, idx) => (
        <div
          key={`bar-${idx}-${val}`}
          className={`flex-1 rounded-t-sm transition-all duration-500 ${colorClass}`}
          style={{ height: `${Math.max((val / max) * 100, 5)}%` }}
          title={String(val)}
        />
      ))}
    </div>
  );
}

MiniBarGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  colorClass: PropTypes.string,
};

export default function UsageStats() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "rawModel";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [viewMode, setViewMode] = useState("tokens"); // 'tokens' or 'costs'
  const [refreshInterval, setRefreshInterval] = useState(5000); // Start with 5s
  const prevTotalRequestsRef = useRef(0);

  const toggleSort = (field: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortBy === field) {
      params.set("sortOrder", sortOrder === "asc" ? "desc" : "asc");
    } else {
      params.set("sortBy", field);
      params.set("sortOrder", "asc");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const sortData = useCallback(
    (dataMap: Record<string, any>, pendingMap: Record<string, any> = {}) => {
      return Object.entries(dataMap || {})
        .map(([key, data]: [string, any]) => {
          const totalTokens = (data.promptTokens || 0) + (data.completionTokens || 0);
          const totalCost = data.cost || 0;

          // Calculate cost breakdown (estimated based on token ratio)
          const inputCost =
            totalTokens > 0 ? (data.promptTokens || 0) * (totalCost / totalTokens) : 0;
          const outputCost =
            totalTokens > 0 ? (data.completionTokens || 0) * (totalCost / totalTokens) : 0;

          return {
            ...data,
            key,
            totalTokens,
            totalCost,
            inputCost,
            outputCost,
            pending: pendingMap[key] || 0,
          };
        })
        .sort((a, b) => {
          let valA = a[sortBy];
          let valB = b[sortBy];

          // Handle case-insensitive sorting for strings
          if (typeof valA === "string") valA = valA.toLowerCase();
          if (typeof valB === "string") valB = valB.toLowerCase();

          if (valA < valB) return sortOrder === "asc" ? -1 : 1;
          if (valA > valB) return sortOrder === "asc" ? 1 : -1;
          return 0;
        });
    },
    [sortBy, sortOrder]
  );

  const sortedModels = useMemo(
    () => sortData(stats?.byModel, stats?.pending?.byModel),
    [stats?.byModel, stats?.pending?.byModel, sortData]
  );
  const sortedAccounts = useMemo(() => {
    // For accounts, pendingMap is by connectionId, but dataMap is by accountKey
    // We need to map connectionId pending counts to accountKeys
    const accountPendingMap: Record<string, any> = {};
    if (stats?.pending?.byAccount) {
      Object.entries(stats.byAccount || {}).forEach(([accountKey, data]: [string, any]) => {
        const connPending = stats.pending.byAccount[data.connectionId];
        if (connPending) {
          // Get modelKey (rawModel (provider))
          const modelKey = data.provider ? `${data.rawModel} (${data.provider})` : data.rawModel;
          accountPendingMap[accountKey] = connPending[modelKey] || 0;
        }
      });
    }
    return sortData(stats?.byAccount, accountPendingMap);
  }, [stats?.byAccount, stats?.pending?.byAccount, sortData]);

  const fetchStats = useCallback(async (showLoading = true): Promise<void> => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch("/api/usage/history");
      if (res.ok) {
        const data = await res.json();
        setStats(data);

        // Smart polling: adjust interval based on activity
        const currentTotal = data.totalRequests || 0;
        if (currentTotal > prevTotalRequestsRef.current) {
          // New requests detected - reset to fast polling
          setRefreshInterval(5000);
        } else {
          // No change - increase interval (exponential backoff)
          setRefreshInterval((prev) => Math.min(prev * 2, 60000)); // Max 60s
        }
        prevTotalRequestsRef.current = currentTotal;
      }
    } catch (error) {
      console.error("Failed to fetch usage stats:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let isPageVisible = true;

    // Page Visibility API - pause when tab is hidden
    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && autoRefresh) {
        fetchStats(false); // Fetch immediately when tab becomes visible
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (autoRefresh) {
      // Clear any existing interval first
      if (intervalId) clearInterval(intervalId);

      intervalId = setInterval(() => {
        if (isPageVisible) {
          fetchStats(false); // fetch without loading skeleton
        }
      }, refreshInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [autoRefresh, refreshInterval, fetchStats]);

  if (loading) return <CardSkeleton />;

  if (!stats) return <div className="text-text-muted">Failed to load usage statistics.</div>;

  // Format number with commas — delegated to shared module
  const fmt = (n: number) => fmtFull(n);

  // Format cost with dollar sign and 2 decimals — delegated to shared module

  // Time format for "Last Used"
  const fmtTime = (iso: string) => {
    if (!iso) return "Never";
    const date = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Auto Refresh Toggle and View Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Usage Overview</h2>
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-bg-subtle rounded-lg p-1 border border-border">
            <button
              onClick={() => setViewMode("tokens")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === "tokens"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text hover:bg-bg-hover"
              }`}
            >
              Tokens
            </button>
            <button
              onClick={() => setViewMode("costs")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === "costs"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text hover:bg-bg-hover"
              }`}
            >
              Costs
            </button>
          </div>

          {/* Auto Refresh Toggle */}
          <div className="text-sm font-medium text-text-muted flex items-center gap-2">
            <span>Auto Refresh ({refreshInterval / 1000}s)</span>
            <button
              type="button"
              onClick={() => setAutoRefresh(!autoRefresh)}
              role="switch"
              aria-checked={autoRefresh}
              aria-label="Toggle auto refresh"
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                autoRefresh ? "bg-primary" : "bg-bg-subtle border border-border"
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  autoRefresh ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Active Requests Summary */}
      {(stats.activeRequests || []).length > 0 && (
        <Card className="p-3 border-primary/20 bg-primary/5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Active Requests
            </div>
            <div className="flex flex-wrap gap-3">
              {stats.activeRequests.map((req) => (
                <div
                  key={`${req.model}-${req.provider}-${req.account}`}
                  className="px-3 py-1.5 rounded-md bg-bg-subtle border border-primary/20 text-xs font-mono shadow-sm"
                >
                  <span className="text-primary font-bold">{req.model}</span>
                  <span className="mx-1 text-text-muted">|</span>
                  <span className="text-text">{req.provider}</span>
                  <span className="mx-1 text-text-muted">|</span>
                  <span className="text-text font-medium">{req.account}</span>
                  {req.count > 1 && (
                    <span className="ml-2 px-1.5 py-0.5 rounded bg-primary text-white font-bold">
                      x{req.count}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="px-4 py-3 flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-text-muted text-sm uppercase font-semibold">
                Total Requests
              </span>
              <span className="text-2xl font-bold">{fmt(stats.totalRequests)}</span>
            </div>
            <MiniBarGraph
              data={(stats.last10Minutes || []).map((m) => m.requests)}
              colorClass="bg-text-muted/30"
            />
          </div>
        </Card>
        <Card className="px-4 py-3 flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-text-muted text-sm uppercase font-semibold">
                Total Input Tokens
              </span>
              <span className="text-2xl font-bold text-primary">
                {fmt(stats.totalPromptTokens)}
              </span>
            </div>
            <MiniBarGraph
              data={(stats.last10Minutes || []).map((m) => m.promptTokens)}
              colorClass="bg-primary/50"
            />
          </div>
        </Card>
        <Card className="px-4 py-2 flex flex-col gap-1">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-text-muted text-sm uppercase font-semibold">Output Tokens</span>
              <span className="text-2xl font-bold text-success">
                {fmt(stats.totalCompletionTokens)}
              </span>
            </div>
            <div className="w-px bg-border self-stretch mx-2" />
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-text-muted text-sm uppercase font-semibold">Total Cost</span>
              <span className="text-2xl font-bold text-warning">{fmtCost(stats.totalCost)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Usage by Model Table */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-border bg-bg-subtle/50">
          <h3 className="font-semibold">Usage by Model</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-bg-subtle/30 text-text-muted uppercase text-xs">
              <tr>
                <th
                  className="px-6 py-3 cursor-pointer hover:bg-bg-subtle/50"
                  onClick={() => toggleSort("rawModel")}
                >
                  Model <SortIcon field="rawModel" currentSort={sortBy} currentOrder={sortOrder} />
                </th>
                <th
                  className="px-6 py-3 cursor-pointer hover:bg-bg-subtle/50"
                  onClick={() => toggleSort("provider")}
                >
                  Provider{" "}
                  <SortIcon field="provider" currentSort={sortBy} currentOrder={sortOrder} />
                </th>
                <th
                  className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                  onClick={() => toggleSort("requests")}
                >
                  Requests{" "}
                  <SortIcon field="requests" currentSort={sortBy} currentOrder={sortOrder} />
                </th>
                <th
                  className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                  onClick={() => toggleSort("lastUsed")}
                >
                  Last Used{" "}
                  <SortIcon field="lastUsed" currentSort={sortBy} currentOrder={sortOrder} />
                </th>
                {viewMode === "tokens" ? (
                  <>
                    <th
                      className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                      onClick={() => toggleSort("promptTokens")}
                    >
                      Input Tokens{" "}
                      <SortIcon
                        field="promptTokens"
                        currentSort={sortBy}
                        currentOrder={sortOrder}
                      />
                    </th>
                    <th
                      className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                      onClick={() => toggleSort("completionTokens")}
                    >
                      Output Tokens{" "}
                      <SortIcon
                        field="completionTokens"
                        currentSort={sortBy}
                        currentOrder={sortOrder}
                      />
                    </th>
                    <th
                      className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                      onClick={() => toggleSort("totalTokens")}
                    >
                      Total Tokens{" "}
                      <SortIcon field="totalTokens" currentSort={sortBy} currentOrder={sortOrder} />
                    </th>
                  </>
                ) : (
                  <>
                    <th
                      className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                      onClick={() => toggleSort("promptTokens")}
                    >
                      Input Cost{" "}
                      <SortIcon
                        field="promptTokens"
                        currentSort={sortBy}
                        currentOrder={sortOrder}
                      />
                    </th>
                    <th
                      className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                      onClick={() => toggleSort("completionTokens")}
                    >
                      Output Cost{" "}
                      <SortIcon
                        field="completionTokens"
                        currentSort={sortBy}
                        currentOrder={sortOrder}
                      />
                    </th>
                    <th
                      className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                      onClick={() => toggleSort("cost")}
                    >
                      Total Cost{" "}
                      <SortIcon field="cost" currentSort={sortBy} currentOrder={sortOrder} />
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedModels.map((data) => (
                <tr key={data.key} className="hover:bg-bg-subtle/20">
                  <td
                    className={`px-6 py-3 font-medium transition-colors ${
                      data.pending > 0 ? "text-primary" : ""
                    }`}
                  >
                    {data.rawModel}
                  </td>
                  <td className="px-6 py-3">
                    <Badge variant={data.pending > 0 ? "primary" : "default"} size="sm">
                      {data.provider}
                    </Badge>
                  </td>
                  <td className="px-6 py-3 text-right">{fmt(data.requests)}</td>
                  <td className="px-6 py-3 text-right text-text-muted whitespace-nowrap">
                    {fmtTime(data.lastUsed)}
                  </td>
                  {viewMode === "tokens" ? (
                    <>
                      <td className="px-6 py-3 text-right text-text-muted">
                        {fmt(data.promptTokens)}
                      </td>
                      <td className="px-6 py-3 text-right text-text-muted">
                        {fmt(data.completionTokens)}
                      </td>
                      <td className="px-6 py-3 text-right font-medium">{fmt(data.totalTokens)}</td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-3 text-right text-text-muted">
                        {fmtCost(data.inputCost)}
                      </td>
                      <td className="px-6 py-3 text-right text-text-muted">
                        {fmtCost(data.outputCost)}
                      </td>
                      <td className="px-6 py-3 text-right font-medium text-warning">
                        {fmtCost(data.totalCost)}
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {sortedModels.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-text-muted">
                    No usage recorded yet. Make some requests to see data here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Usage by Account Table */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-border bg-bg-subtle/50">
          <h3 className="font-semibold">Usage by Account</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-bg-subtle/30 text-text-muted uppercase text-xs">
              <tr>
                <th
                  className="px-6 py-3 cursor-pointer hover:bg-bg-subtle/50"
                  onClick={() => toggleSort("rawModel")}
                >
                  Model <SortIcon field="rawModel" currentSort={sortBy} currentOrder={sortOrder} />
                </th>
                <th
                  className="px-6 py-3 cursor-pointer hover:bg-bg-subtle/50"
                  onClick={() => toggleSort("provider")}
                >
                  Provider{" "}
                  <SortIcon field="provider" currentSort={sortBy} currentOrder={sortOrder} />
                </th>
                <th
                  className="px-6 py-3 cursor-pointer hover:bg-bg-subtle/50"
                  onClick={() => toggleSort("accountName")}
                >
                  Account{" "}
                  <SortIcon field="accountName" currentSort={sortBy} currentOrder={sortOrder} />
                </th>
                <th
                  className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                  onClick={() => toggleSort("requests")}
                >
                  Requests{" "}
                  <SortIcon field="requests" currentSort={sortBy} currentOrder={sortOrder} />
                </th>
                <th
                  className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                  onClick={() => toggleSort("lastUsed")}
                >
                  Last Used{" "}
                  <SortIcon field="lastUsed" currentSort={sortBy} currentOrder={sortOrder} />
                </th>
                {viewMode === "tokens" ? (
                  <>
                    <th
                      className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                      onClick={() => toggleSort("promptTokens")}
                    >
                      Input Tokens{" "}
                      <SortIcon
                        field="promptTokens"
                        currentSort={sortBy}
                        currentOrder={sortOrder}
                      />
                    </th>
                    <th
                      className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                      onClick={() => toggleSort("completionTokens")}
                    >
                      Output Tokens{" "}
                      <SortIcon
                        field="completionTokens"
                        currentSort={sortBy}
                        currentOrder={sortOrder}
                      />
                    </th>
                    <th
                      className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                      onClick={() => toggleSort("totalTokens")}
                    >
                      Total Tokens{" "}
                      <SortIcon field="totalTokens" currentSort={sortBy} currentOrder={sortOrder} />
                    </th>
                  </>
                ) : (
                  <>
                    <th
                      className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                      onClick={() => toggleSort("promptTokens")}
                    >
                      Input Cost{" "}
                      <SortIcon
                        field="promptTokens"
                        currentSort={sortBy}
                        currentOrder={sortOrder}
                      />
                    </th>
                    <th
                      className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                      onClick={() => toggleSort("completionTokens")}
                    >
                      Output Cost{" "}
                      <SortIcon
                        field="completionTokens"
                        currentSort={sortBy}
                        currentOrder={sortOrder}
                      />
                    </th>
                    <th
                      className="px-6 py-3 text-right cursor-pointer hover:bg-bg-subtle/50"
                      onClick={() => toggleSort("cost")}
                    >
                      Total Cost{" "}
                      <SortIcon field="cost" currentSort={sortBy} currentOrder={sortOrder} />
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedAccounts.map((data) => (
                <tr key={data.key} className="hover:bg-bg-subtle/20">
                  <td
                    className={`px-6 py-3 font-medium transition-colors ${
                      data.pending > 0 ? "text-primary" : ""
                    }`}
                  >
                    {data.rawModel}
                  </td>
                  <td className="px-6 py-3">
                    <Badge variant={data.pending > 0 ? "primary" : "default"} size="sm">
                      {data.provider}
                    </Badge>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`font-medium transition-colors ${
                        data.pending > 0 ? "text-primary" : ""
                      }`}
                    >
                      {data.accountName || `Account ${data.connectionId?.slice(0, 8)}...`}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">{fmt(data.requests)}</td>
                  <td className="px-6 py-3 text-right text-text-muted whitespace-nowrap">
                    {fmtTime(data.lastUsed)}
                  </td>
                  {viewMode === "tokens" ? (
                    <>
                      <td className="px-6 py-3 text-right text-text-muted">
                        {fmt(data.promptTokens)}
                      </td>
                      <td className="px-6 py-3 text-right text-text-muted">
                        {fmt(data.completionTokens)}
                      </td>
                      <td className="px-6 py-3 text-right font-medium">{fmt(data.totalTokens)}</td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-3 text-right text-text-muted">
                        {fmtCost(data.inputCost)}
                      </td>
                      <td className="px-6 py-3 text-right text-text-muted">
                        {fmtCost(data.outputCost)}
                      </td>
                      <td className="px-6 py-3 text-right font-medium text-warning">
                        {fmtCost(data.totalCost)}
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {sortedAccounts.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-text-muted">
                    No account-specific usage recorded yet. Make requests using OAuth accounts to
                    see data here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
