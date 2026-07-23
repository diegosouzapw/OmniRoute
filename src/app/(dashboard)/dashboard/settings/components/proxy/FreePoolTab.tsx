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
  const translateOrFallback = (
    key: string,
    fallback: string,
    values?: Record<string, string | number>
  ) => (typeof t.has === "function" && !t.has(key) ? fallback : t(key, values));
  const tc = useTranslations("common");
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
      const data = await res.json().catch(() => null);
      if (data?.results) {
        const errors: Record<string, string[]> = {};
        for (const [source, result] of Object.entries(
          data.results as Record<string, { errors?: string[] }>
        )) {
          if (Array.isArray(result?.errors) && result.errors.length > 0) {
            errors[source] = result.errors;
          }
        }
        if (Object.keys(errors).length > 0) setSyncErrors(errors);
      } else if (!res.ok) {
        setSyncErrors(data?.errors ?? null);
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

  const handleToggleSource = (source: SourceId) => {
    setDisabledSources((prev) => {
      const next = new Set(prev);
      if (next.has(source)) next.delete(source);
      else next.add(source);
      saveDisabledSources(next);
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
    setBulkProgress(t("proxyFreePoolTesting"));
    try {
      const res = await fetch("/api/settings/free-proxies/bulk-add-to-pool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const data = await res.json();
      setBulkProgress(
        t("proxyFreePoolBulkResult", {
          succeeded: data.succeeded ?? 0,
          failed: data.failed ?? 0,
        })
      );
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
            aria-label={translateOrFallback("proxyFreePoolFilterProtocol", "Filter by protocol")}
          >
            <option value="">{translateOrFallback("proxyFreePoolProtocol", "Protocol")}</option>
            {["http", "https", "socks4", "socks5"].map((p) => (
              <option key={p} value={p}>
                {p.toUpperCase()}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder={translateOrFallback(
              "proxyFreePoolCountryPlaceholder",
              "Country (e.g. US)"
            )}
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value.toUpperCase().slice(0, 2))}
            className="text-xs bg-surface-alt border border-border rounded px-2 py-1 w-28"
            aria-label={translateOrFallback("proxyFreePoolFilterCountry", "Filter by country")}
          />
          <input
            type="number"
            placeholder={translateOrFallback("proxyFreePoolMinQualityPlaceholder", "Min quality")}
            value={minQuality}
            onChange={(e) => setMinQuality(e.target.value)}
            min={0}
            max={100}
            className="text-xs bg-surface-alt border border-border rounded px-2 py-1 w-24"
            aria-label={translateOrFallback(
              "proxyFreePoolMinQualityLabel",
              "Minimum quality score"
            )}
          />
          <Button size="sm" variant="secondary" icon="sync" onClick={handleSync} disabled={syncing}>
            {syncing
              ? translateOrFallback("syncing", "Syncing...")
              : translateOrFallback("proxyFreePoolSyncAll", "Sync all")}
          </Button>
        </div>
      </div>

      {stats && (
        <div className="text-xs text-text-muted flex gap-4 flex-wrap">
          <span>
            {translateOrFallback("proxyFreePoolTotal", "Total")}: {stats.total}
          </span>
          <span>
            {translateOrFallback("proxyFreePoolInPool", "In pool")}: {stats.inPool}
          </span>
          {stats.avgQuality != null && (
            <span>
              {translateOrFallback("proxyFreePoolAvgQuality", "Average quality")}:{" "}
              {stats.avgQuality}
            </span>
          )}
          {stats.lastSyncAt && (
            <span suppressHydrationWarning>
              {translateOrFallback("lastSync", "Last sync")}:{" "}
              {new Date(stats.lastSyncAt).toLocaleTimeString()}
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
          <span className="text-xs">
            {translateOrFallback("proxyFreePoolSelected", `${selected.size} selected`, {
              count: selected.size,
            })}
          </span>
          <Button size="sm" variant="primary" onClick={() => handleBulkAdd(Array.from(selected))}>
            {translateOrFallback("proxyFreePoolAddSelected", "Add selected to pool")}
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
            {translateOrFallback("proxyFreePoolAddVisible", "Add all visible to pool")}
          </Button>
        </div>
      )}

      <div className="overflow-x-auto rounded border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-surface-alt text-text-muted text-xs">
            <tr>
              <th className="px-3 py-2 text-left w-8" scope="col"></th>
              <th className="px-3 py-2 text-left" scope="col">
                {translateOrFallback("proxyFreePoolSource", "Source")}
              </th>
              <th className="px-3 py-2 text-left" scope="col">
                {translateOrFallback("proxyFreePoolHostPort", "Host:Port")}
              </th>
              <th className="px-3 py-2 text-left" scope="col">
                {translateOrFallback("proxyFreePoolType", "Type")}
              </th>
              <th className="px-3 py-2 text-left" scope="col">
                {translateOrFallback("proxyFreePoolCountry", "Country")}
              </th>
              <th className="px-3 py-2 text-left" scope="col">
                {translateOrFallback("proxyFreePoolQuality", "Quality")}
              </th>
              <th className="px-3 py-2 text-left" scope="col">
                {translateOrFallback("proxyFreePoolLatency", "Latency")}
              </th>
              <th className="px-3 py-2 text-left" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-text-muted">
                  {translateOrFallback("loading", "Loading...")}
                </td>
              </tr>
            ) : proxies.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-text-muted">
                  {translateOrFallback(
                    "proxyFreePoolEmpty",
                    "No proxies found. Click Sync all to fetch from sources."
                  )}
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
            aria-label={tc("previousPage")}
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
            aria-label={tc("nextPage")}
          >
            &raquo;
          </button>
        </div>
      )}

      {/* Per-page summary */}
      <div className="text-center text-xs text-text-muted">
        {total > 0
          ? t("proxyFreePoolPageSummary", { page, totalPages, total })
          : t("proxyFreePoolTotalSummary", { total })}
      </div>
    </div>
  );
}
