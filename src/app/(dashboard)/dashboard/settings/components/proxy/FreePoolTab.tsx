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

const PER_PAGE = 50;
const MAX_VISIBLE_PAGES = 7;

export default function FreePoolTab() {
  const t = useTranslations("settings");
  const [proxies, setProxies] = useState<FreeProxyRowData[]>([]);
  const [stats, setStats] = useState<FreePoolStats | null>(null);
  const [disabledSources, setDisabledSources] = useState<Set<SourceId>>(new Set());
  const [filterProtocol, setFilterProtocolRaw] = useState("");
  const [filterCountry, setFilterCountryRaw] = useState("");
  const [minQuality, setMinQualityRaw] = useState("");
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [addingIds, setAddingIds] = useState<Set<string>>(new Set());
  const [bulkProgress, setBulkProgress] = useState<string | null>(null);
  // #5595: per-source sync errors so a "Total: 0" result is never silent.
  const [syncErrors, setSyncErrors] = useState<Record<string, string[]> | null>(null);
  // Pagination state
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Load persisted disabled-sources from localStorage on mount
  useEffect(() => {
    const saved = loadDisabledSources();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage hydration, runs once
    if (saved) setDisabledSources(saved);
  }, []);
  // Wrapper setters that also reset page to 1
  const setFilterProtocol = (v: string) => {
    setFilterProtocolRaw(v);
    setPage(1);
  };
  const setFilterCountry = (v: string) => {
    setFilterCountryRaw(v);
    setPage(1);
  };
  const setMinQuality = (v: string) => {
    setMinQualityRaw(v);
    setPage(1);
  };

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
      params.set("limit", String(PER_PAGE));
      params.set("offset", String((page - 1) * PER_PAGE));

      const [proxiesRes, statsRes] = await Promise.all([
        fetch(`/api/settings/free-proxies?${params.toString()}`),
        fetch("/api/settings/free-proxies/stats"),
      ]);
      if (proxiesRes.ok) {
        const data = await proxiesRes.json();
        setProxies(data.items || []);
        setTotal(data.total ?? 0);
      }
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats || null);
      }
    } catch {}
    setLoading(false);
  }, [disabledSources, filterProtocol, filterCountry, minQuality, page]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async data fetch on filter change
    loadData();
  }, [loadData]);

  const handleSync = async () => {
    setSyncing(true);
    setSyncErrors(null);
    try {
      const enabledSources = ALL_SOURCE_IDS.filter((s) => !disabledSources.has(s));
      const body = enabledSources.length < ALL_SOURCE_IDS.length ? { sources: enabledSources } : {};
      const res = await fetch("/api/settings/free-proxies/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setSyncErrors(data.errors ?? null);
      }
      await loadData();
    } catch {}
    setSyncing(false);
  };

  const handleAddToPool = async (id: string) => {
    setAddingIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    try {
      const res = await fetch(`/api/settings/free-proxies/${id}/add-to-pool`, {
        method: "POST",
      });
      if (res.ok) {
        const body = await res.json();
        if (body.ok !== true) return;
        // Optimistic: remove from local list since it's now in pool
        setProxies((prev) => prev.filter((p) => p.id !== id));
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
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  // Build visible page range around current page
  const buildPageRange = (): (number | "ellipsis")[] => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "ellipsis")[] = [];
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, page + half);

    // Adjust if near start/end
    if (page - half < 1) {
      end = Math.min(totalPages, MAX_VISIBLE_PAGES);
    }
    if (page + half > totalPages) {
      start = Math.max(1, totalPages - MAX_VISIBLE_PAGES + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("ellipsis");
    }
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

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

      {syncErrors && (
        <div
          className="text-xs text-red-500 flex flex-col gap-1"
          role="alert"
          data-testid="free-pool-sync-errors"
        >
          {Object.entries(syncErrors).map(([src, errs]) => (
            <span key={src}>
              {src}: {errs.join("; ")}
            </span>
          ))}
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

      {/* Page-number pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 pt-2">
          <button
            type="button"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            &laquo;
          </button>
          {buildPageRange().map((p, i) =>
            p === "ellipsis" ? (
              <span key={`ellipsis-${i}`} className="px-1 text-text-muted text-xs">
                ...
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => handlePageChange(p)}
                className={`px-2.5 py-1 text-xs rounded ${
                  p === page
                    ? "bg-primary text-white font-medium"
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
          >
            &raquo;
          </button>
        </div>
      )}

      {/* Per-page summary */}
      <div className="text-center text-xs text-text-muted">
        {total > 0
          ? `Page ${page} of ${totalPages} (${total} total proxies)`
          : `${total} total proxies`}
      </div>
    </div>
  );
}
