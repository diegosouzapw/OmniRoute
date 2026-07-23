"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import BatchListTab from "./BatchListTab";
import { FileRecord } from "@/lib/db/files";
import { BatchRecord } from "@/lib/db/batches";
import { mapBatchApiToRecord, mapFileApiToRecord } from "./batch-utils";
import BatchConceptCard from "./components/BatchConceptCard";
import NewBatchWizard from "./components/NewBatchWizard";

// ── Batch-capable providers (D16) ─────────────────────────────────────────────

const BATCH_SUPPORTED = ["openai", "anthropic", "gemini"];
const MODEL_DEFAULTS: Record<string, string[]> = {
  openai: ["gpt-4o-mini", "gpt-4o", "gpt-4-turbo"],
  anthropic: ["claude-3-5-sonnet-20241022", "claude-3-5-haiku-20241022"],
  gemini: ["gemini-2.5-flash", "gemini-2.5-pro"],
};
const PROVIDER_NAMES: Record<string, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  gemini: "Gemini",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function BatchPage() {
  const t = useTranslations("common");
  const [batches, setBatches] = useState<BatchRecord[]>([]);
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [batchesTotal, setBatchesTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [createdBanner, setCreatedBanner] = useState<string | null>(null);
  const [providers, setProviders] = useState<Array<{ id: string; name: string; models: string[] }>>(
    [],
  );

  // Auto-dismiss "batch created" banner after 5s (A-6)
  useEffect(() => {
    if (!createdBanner) return;
    const id = setTimeout(() => setCreatedBanner(null), 5000);
    return () => clearTimeout(id);
  }, [createdBanner]);

  const [batchesHasMore, setBatchesHasMore] = useState(false);
  const [batchesLastId, setBatchesLastId] = useState<string | null>(null);
  const bottomRefBatches = useRef<HTMLDivElement>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFetchingRef = useRef(false);
  const fetchDataRef = useRef<typeof fetchData | null>(null);

  const fetchData = useCallback(
    async (isBackground = false, opts: { appendBatches?: boolean; limit?: number } = {}) => {
      if (isFetchingRef.current) return;
      if (!isBackground) setLoading(true);
      if (opts.appendBatches) setLoadingMore(true);
      isFetchingRef.current = true;
      const limit = opts.limit ?? 20;
      try {
        const batchUrl =
          `/api/v1/batches?limit=${limit}` +
          (opts.appendBatches && batchesLastId ? `&after=${batchesLastId}` : "");
        const filesUrl = `/api/v1/files?limit=${limit}`;

        const [batchesRes, filesRes] = await Promise.all([fetch(batchUrl), fetch(filesUrl)]);

        if (batchesRes.ok) {
          const data = await batchesRes.json();
          const mapped = (data.data || []).map(mapBatchApiToRecord);

          if (opts.appendBatches) {
            setBatches((prev) => [...prev, ...mapped]);
            setBatchesHasMore(Boolean(data.has_more));
            setBatchesLastId(data.last_id || null);
          } else if (isBackground) {
            // Background refresh: merge new items, preserve pagination state
            setBatches((prev) => {
              const batchMap = new Map(prev.map((b) => [b.id, b]));
              for (const m of mapped) {
                batchMap.set(m.id, m);
              }
              return Array.from(batchMap.values()).sort(
                (a, b) => b.createdAt - a.createdAt || b.id.localeCompare(a.id), // teknik sıralama: ASCII kasıtlı
              );
            });
          } else {
            setBatches(mapped);
            setBatchesHasMore(Boolean(data.has_more));
            setBatchesLastId(data.last_id || null);
          }
          setBatchesTotal(data.total_count || 0);
        }

        if (filesRes.ok) {
          const data = await filesRes.json();
          const mapped = (data.data || []).map(mapFileApiToRecord);
          if (isBackground) {
            setFiles((prev) => {
              const fileMap = new Map(prev.map((f) => [f.id, f]));
              for (const m of mapped) {
                fileMap.set(m.id, m);
              }
              return Array.from(fileMap.values()).sort(
                (a, b) => b.createdAt - a.createdAt || b.id.localeCompare(a.id), // teknik sıralama: ASCII kasıtlı
              );
            });
          } else {
            setFiles(mapped);
          }
        }
      } catch (error) {
        console.error("[BatchPage] fetchData threw", error);
      } finally {
        isFetchingRef.current = false;
        if (!isBackground) setLoading(false);
        if (opts.appendBatches) setLoadingMore(false);
      }
    },
    [batchesLastId],
  );

  // Keep fetchData ref in sync
  useEffect(() => {
    fetchDataRef.current = fetchData;
  }, [fetchData]);

  // Track loadingMore in a ref for use in observer callback
  const loadingMoreRef = useRef(loadingMore);
  useEffect(() => {
    loadingMoreRef.current = loadingMore;
  }, [loadingMore]);

  // Fetch available batch-capable providers on mount (D16).
  // Intersects /api/providers with BATCH_SUPPORTED list.
  // Falls back to hardcoded list if route errors or returns empty.
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/providers");
        if (res.ok) {
          const data = (await res.json()) as {
            connections: Array<{ provider: string; is_active?: boolean }>;
          };
          const connected = new Set(
            (data.connections ?? [])
              .filter((c) => BATCH_SUPPORTED.includes(c.provider))
              .map((c) => c.provider),
          );
          if (connected.size > 0) {
            setProviders(
              Array.from(connected).map((id) => ({
                id,
                name: PROVIDER_NAMES[id] ?? id,
                models: MODEL_DEFAULTS[id] ?? [],
              })),
            );
            return;
          }
        }
      } catch (e) {
        console.error("[BatchPage] providers fetch error", e);
      }
      // Fallback: hardcoded list per D16
      setProviders(
        BATCH_SUPPORTED.map((id) => ({
          id,
          name: PROVIDER_NAMES[id] ?? id,
          models: MODEL_DEFAULTS[id] ?? [],
        })),
      );
    };
    void load();
  }, []);

  // Initial fetch + 30s polling (D10). Pauses when tab is hidden.
  useEffect(() => {
    const scheduleRefresh = () => {
      refreshTimeoutRef.current = setTimeout(async () => {
        if (!document.hidden) {
          await fetchDataRef.current?.(true);
        }
        scheduleRefresh();
      }, 30_000);
    };

    // Initial fetch (with loading indicator)
    fetchDataRef.current?.();
    // Schedule background refreshes
    scheduleRefresh();

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    };
  }, []);

  // Pause/resume polling on visibility change (D10)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current);
          refreshTimeoutRef.current = null;
        }
      } else if (!refreshTimeoutRef.current) {
        // Resume polling
        const scheduleRefresh = () => {
          refreshTimeoutRef.current = setTimeout(async () => {
            if (!document.hidden) {
              await fetchDataRef.current?.(true);
            }
            scheduleRefresh();
          }, 30_000);
        };
        scheduleRefresh();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // IntersectionObserver for infinite scroll on batches
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && batchesHasMore && !loadingMoreRef.current) {
          fetchDataRef.current?.(true, { appendBatches: true });
        }
      },
      { threshold: 0.1 },
    );

    if (bottomRefBatches.current) {
      observer.observe(bottomRefBatches.current);
    }

    return () => observer.disconnect();
  }, [batchesHasMore]);

  const batchesCount = batches.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Concept card (F3) */}
      <BatchConceptCard />

      {/* "Batch created" success banner (A-6) — auto-dismiss 5s */}
      {createdBanner && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-2"
        >
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            {t("batchListBatchCreated", { id: createdBanner })}
          </div>
          <button
            type="button"
            onClick={() => setCreatedBanner(null)}
            className="text-xs text-emerald-400/80 hover:text-emerald-300 transition-colors px-2 py-0.5 rounded"
          >
            {t("batchListBatchCreatedDismiss")}
          </button>
        </div>
      )}

      {/* Toolbar: auto-refresh indicator + Refresh + New batch */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
          <span className={`material-symbols-outlined text-[14px] ${loading ? "animate-spin" : "animate-pulse"}`}>sync</span>
          {t("batchListAutoRefresh")}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => fetchData(false)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
              bg-[var(--color-surface)] border border-[var(--color-border)]
              text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)]
              hover:border-[var(--color-accent)] transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            {loading ? t("batchListRefreshing") : t("batchListRefresh")}
          </button>
          <button
            onClick={() => setShowWizard(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
              bg-[var(--color-accent)] text-white hover:opacity-90
              transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            {t("batchListNewButton")}
          </button>
        </div>
      </div>

      {/* Batch list + infinite scroll sentinel */}
      <div className="flex flex-col gap-6">
        <BatchListTab
          batches={batches}
          files={files}
          batchesTotal={batchesTotal}
          loading={loading}
          onRefresh={() => fetchData(false)}
        />
        {loadingMore && batchesCount > 0 && (
          <div className="text-center text-sm">{t("batchPageLoadingMore")}</div>
        )}
        <div ref={bottomRefBatches} className="h-10" />
      </div>

      {/* New batch wizard */}
      {showWizard && (
        <NewBatchWizard
          onClose={() => setShowWizard(false)}
          onCreated={(id) => {
            setShowWizard(false);
            setCreatedBanner(id);
            void fetchData(false);
          }}
          availableProviders={providers}
        />
      )}
    </div>
  );
}
