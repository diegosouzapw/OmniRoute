"use client";
import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import SourceToggleBar, {
  type SourceId,
  ALL_SOURCE_IDS,
  loadDisabledSources,
  saveDisabledSources,
} from "./SourceToggleBar";
import FreeProxyRow, { type FreeProxyRowData } from "./FreeProxyRow";

type FreePoolStats = {
  total: number;
  inPool: number;
  avgQuality: number | null;
  lastSyncAt: string | null;
};

export default function FreePoolTab() {
  const t = useTranslations("settings");
  const [proxies, setProxies] = useState<FreeProxyRowData[]>([]);
  const [stats, setStats] = useState<FreePoolStats | null>(null);
  const [disabledSources, setDisabledSources] = useState<Set<SourceId>>(new Set());
  const [filterProtocol, setFilterProtocol] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [minQuality, setMinQuality] = useState("");
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [addingIds, setAddingIds] = useState<Set<string>>(new Set());
  const [bulkProgress, setBulkProgress] = useState<string | null>(null);

  // Load persisted disabled-sources from localStorage on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage hydration, runs once
    setDisabledSources(loadDisabledSources());
  }, []);

  const handleToggleSource = useCallback((source: SourceId) => {
    setDisabledSources((prev) => {
      const next = new Set(prev);
      if (next.has(source)) next.delete(source);
      else next.add(source);
      saveDisabledSources(next);
      return next;
    });
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      const enabledSources = ALL_SOURCE_IDS.filter((s) => !disabledSources.has(s));
      if (enabledSources.length < ALL_SOURCE_IDS.length) {
        params.set("sources", enabledSources.join(","));
      }
      if (filterProtocol) params.set("protocol", filterProtocol);
      if (filterCountry) params.set("country", filterCountry);
      if (minQuality) params.set("minQuality", minQuality);
      params.set("limit", "200");

      const [proxiesRes, statsRes] = await Promise.all([
        fetch(`/api/settings/free-proxies?${params.toString()}`),
        fetch("/api/settings/free-proxies/stats"),
      ]);
      if (proxiesRes.ok) {
        const data = await proxiesRes.json();
        setProxies(data.items || []);
      }
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats || null);
      }
    } catch {}
    setLoading(false);
  }, [disabledSources, filterProtocol, filterCountry, minQuality]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async data fetch on filter change
    loadData();
  }, [loadData]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const enabledSources = ALL_SOURCE_IDS.filter((s) => !disabledSources.has(s));
      const body = enabledSources.length < ALL_SOURCE_IDS.length ? { sources: enabledSources } : {};
      await fetch("/api/settings/free-proxies/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await loadData();
    } catch {}
    setSyncing(false);
  };

  const handleAddToPool = async (id: string) => {
    setAddingIds((prev) => new Set(prev).add(id));
    try {
      const res = await fetch(`/api/settings/free-proxies/${id}/add-to-pool`, {
        method: "POST",
      });
      if (res.ok) {
        setProxies((prev) => prev.map((p) => (p.id === id ? { ...p, inPool: true } : p)));
      }
    } catch {}
    setAddingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleToggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkAdd = async (ids: string[]) => {
    if (!ids.length) return;
    setBulkProgress("Testing proxies...");
    try {
      const res = await fetch("/api/settings/free-proxies/bulk-add-to-pool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const data = await res.json();
      setBulkProgress(`${data.succeeded ?? 0} added, ${data.failed ?? 0} failed`);
      await loadData();
      setSelected(new Set());
    } catch {}
    setTimeout(() => setBulkProgress(null), 4000);
  };

  const notInPoolProxies = proxies.filter((p) => !p.inPool);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <SourceToggleBar disabledSources={disabledSources} onToggle={handleToggleSource} />
        <div className="flex gap-2 ml-auto flex-wrap items-center">
          <select
            value={filterProtocol}
            onChange={(e) => setFilterProtocol(e.target.value)}
            className="text-xs bg-surface-alt border border-border rounded px-2 py-1"
            aria-label={t("proxyFreePoolFilterProtocol")}
          >
            <option value="">{t("proxyFreePoolProtocol")}</option>
            {["http", "https", "socks4", "socks5"].map((p) => (
              <option key={p} value={p}>
                {p.toUpperCase()}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder={t("proxyFreePoolCountryPlaceholder")}
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value.toUpperCase().slice(0, 2))}
            className="text-xs bg-surface-alt border border-border rounded px-2 py-1 w-28"
            aria-label={t("proxyFreePoolFilterCountry")}
          />
          <input
            type="number"
            placeholder={t("proxyFreePoolMinQualityPlaceholder")}
            value={minQuality}
            onChange={(e) => setMinQuality(e.target.value)}
            min={0}
            max={100}
            className="text-xs bg-surface-alt border border-border rounded px-2 py-1 w-24"
            aria-label={t("proxyFreePoolMinQualityLabel")}
          />
          <Button size="sm" variant="secondary" icon="sync" onClick={handleSync} disabled={syncing}>
            {syncing ? t("syncing") : t("proxyFreePoolSyncAll")}
          </Button>
        </div>
      </div>

      {stats && (
        <div className="text-xs text-text-muted flex gap-4 flex-wrap">
          <span>
            {t("proxyFreePoolTotal")}: {stats.total}
          </span>
          <span>
            {t("proxyFreePoolInPool")}: {stats.inPool}
          </span>
          {stats.avgQuality != null && (
            <span>
              {t("proxyFreePoolAvgQuality")}: {stats.avgQuality}
            </span>
          )}
          {stats.lastSyncAt && (
            <span>
              {t("lastSync")}: {new Date(stats.lastSyncAt).toLocaleTimeString()}
            </span>
          )}
        </div>
      )}

      {selected.size > 0 && (
        <div className="flex items-center gap-2 p-2 bg-primary/10 rounded border border-primary/20">
          <span className="text-xs">{t("proxyFreePoolSelected", { count: selected.size })}</span>
          <Button size="sm" variant="primary" onClick={() => handleBulkAdd(Array.from(selected))}>
            {t("proxyFreePoolAddSelected")}
          </Button>
          {bulkProgress && <span className="text-xs text-text-muted">{bulkProgress}</span>}
        </div>
      )}

      {notInPoolProxies.length > 0 && selected.size === 0 && (
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleBulkAdd(notInPoolProxies.slice(0, 100).map((p) => p.id))}
          >
            {t("proxyFreePoolAddVisible")}
          </Button>
        </div>
      )}

      <div className="overflow-x-auto rounded border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-surface-alt text-text-muted text-xs">
            <tr>
              <th className="px-3 py-2 text-left w-8" scope="col"></th>
              <th className="px-3 py-2 text-left" scope="col">
                {t("proxyFreePoolSource")}
              </th>
              <th className="px-3 py-2 text-left" scope="col">
                {t("proxyFreePoolHostPort")}
              </th>
              <th className="px-3 py-2 text-left" scope="col">
                {t("proxyFreePoolType")}
              </th>
              <th className="px-3 py-2 text-left" scope="col">
                {t("proxyFreePoolCountry")}
              </th>
              <th className="px-3 py-2 text-left" scope="col">
                {t("proxyFreePoolQuality")}
              </th>
              <th className="px-3 py-2 text-left" scope="col">
                {t("proxyFreePoolLatency")}
              </th>
              <th className="px-3 py-2 text-left" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-text-muted">
                  {t("loading")}
                </td>
              </tr>
            ) : proxies.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-text-muted">
                  {t("proxyFreePoolEmpty")}
                </td>
              </tr>
            ) : (
              proxies.map((p) => (
                <FreeProxyRow
                  key={p.id}
                  proxy={p}
                  selected={selected.has(p.id)}
                  onToggleSelect={handleToggleSelect}
                  onAddToPool={handleAddToPool}
                  adding={addingIds.has(p.id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
