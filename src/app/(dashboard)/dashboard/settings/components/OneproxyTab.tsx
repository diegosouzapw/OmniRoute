"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button, Card } from "@/shared/components";

type OneproxyItem = {
  id: string;
  name: string;
  host: string;
  port: number;
  type: string;
  countryCode: string | null;
  qualityScore: number | null;
  latencyMs: number | null;
  anonymity: string | null;
  googleAccess: boolean;
  status: string;
  lastValidated: string | null;
};

type OneproxyStats = {
  total: number;
  active: number;
  avgQuality: number | null;
  lastValidated: string | null;
  byProtocol: Array<{ protocol: string; count: number }>;
  byCountry: Array<{ countryCode: string; count: number }>;
};

type SyncStatus = {
  lastSyncSuccess: boolean;
  lastSyncError: string | null;
  lastSyncAt: string | null;
  lastSyncCount: number;
  consecutiveFailures: number;
};

export default function OneproxyTab() {
  const t = useTranslations("settings");
  const [proxies, setProxies] = useState<OneproxyItem[]>([]);
  const [stats, setStats] = useState<OneproxyStats | null>(null);
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [filterProtocol, setFilterProtocol] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [minQuality, setMinQuality] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterProtocol) params.set("protocol", filterProtocol);
      if (filterCountry) params.set("countryCode", filterCountry);
      if (minQuality) params.set("minQuality", minQuality);

      const [proxiesRes, statsRes] = await Promise.all([
        fetch(`/api/settings/oneproxy?${params.toString()}`),
        fetch("/api/settings/oneproxy?action=stats"),
      ]);

      if (proxiesRes.ok) {
        const data = await proxiesRes.json();
        setProxies(data.items || []);
      }
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
        setStatus(data.status);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, [filterProtocol, filterCountry, minQuality]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSync = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/settings/oneproxy", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSyncResult(`Synced ${data.total} proxies (${data.added} new, ${data.updated} updated)`);
      } else {
        setSyncResult(`Sync failed: ${data.error}`);
      }
      await loadData();
    } catch (err) {
      setSyncResult(`Sync failed: ${err}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleClearAll = async () => {
    if (!confirm("Clear all 1proxy proxies?")) return;
    try {
      await fetch("/api/settings/oneproxy?clearAll=1", { method: "DELETE" });
      await loadData();
    } catch {
      // ignore
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/settings/oneproxy?id=${id}`, { method: "DELETE" });
      setProxies((prev) => prev.filter((p) => p.id !== id));
      if (stats) setStats({ ...stats, total: stats.total - 1, active: stats.active - 1 });
    } catch {
      // ignore
    }
  };

  const qualityColor = (score: number | null) => {
    if (score == null) return "bg-gray-500";
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const protocolBadge = (type: string) => {
    const colors: Record<string, string> = {
      http: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      https: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      socks4: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      socks5: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-main">1proxy Free Proxy Marketplace</h2>
          <p className="text-sm text-text-muted mt-1">
            Fetch and rotate free validated proxies from the 1proxy community platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSync} disabled={syncing} variant="primary">
            {syncing ? "Syncing..." : "Sync Now"}
          </Button>
          {proxies.length > 0 && (
            <Button onClick={handleClearAll} variant="danger">
              Clear All
            </Button>
          )}
        </div>
      </div>

      {syncResult && (
        <div
          className={`p-3 rounded-lg text-sm ${
            syncResult.startsWith("Synced")
              ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          }`}
        >
          {syncResult}
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold text-text-main">{stats.total}</div>
            <div className="text-sm text-text-muted">Total Proxies</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-text-muted">Active</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-text-main">
              {stats.avgQuality != null ? `${stats.avgQuality}` : "—"}
            </div>
            <div className="text-sm text-text-muted">Avg Quality</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-text-main">
              {status?.lastSyncAt ? new Date(status.lastSyncAt).toLocaleTimeString() : "Never"}
            </div>
            <div className="text-sm text-text-muted">Last Sync</div>
          </Card>
        </div>
      )}

      <Card className="p-4">
        <div className="flex flex-wrap gap-3">
          <select
            value={filterProtocol}
            onChange={(e) => setFilterProtocol(e.target.value)}
            className="px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 text-text-main text-sm border border-border"
          >
            <option value="">All Protocols</option>
            <option value="http">HTTP</option>
            <option value="https">HTTPS</option>
            <option value="socks4">SOCKS4</option>
            <option value="socks5">SOCKS5</option>
          </select>
          <input
            type="text"
            placeholder="Country code (e.g. US)"
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 text-text-main text-sm border border-border w-40"
          />
          <input
            type="number"
            placeholder="Min quality"
            value={minQuality}
            onChange={(e) => setMinQuality(e.target.value)}
            className="px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 text-text-main text-sm border border-border w-32"
          />
        </div>
      </Card>

      <Card className="p-4">
        {loading ? (
          <div className="text-center py-8 text-text-muted">Loading proxies...</div>
        ) : proxies.length === 0 ? (
          <div className="text-center py-8 text-text-muted">
            No 1proxy proxies found. Click &quot;Sync Now&quot; to fetch free proxies.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-text-muted font-medium">Host</th>
                  <th className="text-left py-2 px-3 text-text-muted font-medium">Protocol</th>
                  <th className="text-left py-2 px-3 text-text-muted font-medium">Country</th>
                  <th className="text-left py-2 px-3 text-text-muted font-medium">Quality</th>
                  <th className="text-left py-2 px-3 text-text-muted font-medium">Latency</th>
                  <th className="text-left py-2 px-3 text-text-muted font-medium">Anonymity</th>
                  <th className="text-left py-2 px-3 text-text-muted font-medium">Google</th>
                  <th className="text-left py-2 px-3 text-text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {proxies.map((proxy) => (
                  <tr
                    key={proxy.id}
                    className="border-b border-border/50 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <td className="py-2 px-3 font-mono text-text-main">
                      {proxy.host}:{proxy.port}
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${protocolBadge(proxy.type)}`}
                      >
                        {proxy.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-text-main">{proxy.countryCode || "—"}</td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${qualityColor(proxy.qualityScore)}`}
                        />
                        <span className="text-text-main">{proxy.qualityScore ?? "—"}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-text-main">
                      {proxy.latencyMs != null ? `${proxy.latencyMs}ms` : "—"}
                    </td>
                    <td className="py-2 px-3 text-text-main">{proxy.anonymity || "—"}</td>
                    <td className="py-2 px-3">
                      {proxy.googleAccess ? (
                        <span className="text-green-600">&#10003;</span>
                      ) : (
                        <span className="text-red-600">&#10007;</span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => handleDelete(proxy.id)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {status && (
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-text-main mb-2">Sync Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-text-muted">Last sync: </span>
              <span className={status.lastSyncSuccess ? "text-green-600" : "text-red-600"}>
                {status.lastSyncSuccess ? "Success" : "Failed"}
              </span>
            </div>
            <div>
              <span className="text-text-muted">Proxies fetched: </span>
              <span className="text-text-main">{status.lastSyncCount}</span>
            </div>
            <div>
              <span className="text-text-muted">Consecutive failures: </span>
              <span className="text-text-main">{status.consecutiveFailures}</span>
            </div>
            {status.lastSyncError && (
              <div className="col-span-full">
                <span className="text-text-muted">Error: </span>
                <span className="text-red-600 text-xs">{status.lastSyncError}</span>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
