"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import BatchListTab from "./BatchListTab";
import { FileRecord } from "@/lib/db/files";
import { BatchRecord } from "@/lib/db/batches";
import { mapBatchApiToRecord, mapFileApiToRecord } from "./batch-utils";

export default function BatchPage() {
  const [batches, setBatches] = useState<BatchRecord[]>([]);
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [batchesTotal, setBatchesTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

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
            // Background refresh: merge new items with existing ones, preserve pagination state
            setBatches((prev) => {
              const batchMap = new Map(prev.map((b) => [b.id, b]));
              for (const m of mapped) {
                batchMap.set(m.id, m);
              }
              return Array.from(batchMap.values()).sort(
                (a, b) => b.createdAt - a.createdAt || b.id.localeCompare(a.id)
              );
            });
            // Don't reset batchesLastId or batchesHasMore on background refresh
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
                (a, b) => b.createdAt - a.createdAt || b.id.localeCompare(a.id)
              );
            });
          } else {
            setFiles(mapped);
          }
        }
      } catch (error) {
        console.error("Failed to fetch batches/files", error);
      } finally {
        isFetchingRef.current = false;
        if (!isBackground) setLoading(false);
        if (opts.appendBatches) setLoadingMore(false);
      }
    },
    [batchesLastId]
  );

  // Keep fetchData ref in sync
  useEffect(() => {
    fetchDataRef.current = fetchData;
  }, [fetchData]);

  // Track loadingMore in a ref for use in observer callback (avoids re-creating observer)
  const loadingMoreRef = useRef(loadingMore);
  useEffect(() => {
    loadingMoreRef.current = loadingMore;
  }, [loadingMore]);

  // Initial fetch and background refresh timer (runs once on mount)
  useEffect(() => {
    const scheduleRefresh = () => {
      refreshTimeoutRef.current = setTimeout(async () => {
        await fetchDataRef.current?.(true);
        scheduleRefresh();
      }, 10_000);
    };

    // Initial fetch (with loading)
    fetchDataRef.current?.();
    // Schedule background refreshes
    scheduleRefresh();

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    };
  }, []); // Empty deps - only run once, uses ref for latest fetchData

  // IntersectionObserver for infinite scroll on batches
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && batchesHasMore && !loadingMoreRef.current) {
          fetchDataRef.current?.(true, { appendBatches: true });
        }
      },
      { threshold: 0.1 }
    );

    if (bottomRefBatches.current) {
      observer.observe(bottomRefBatches.current);
    }

    return () => observer.disconnect();
  }, [batchesHasMore]);

  const batchesCount = batches.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <span className="text-sm text-text-muted">
          {batchesTotal ? `${batchesTotal} batches` : "Batches"}
        </span>

        <button
          onClick={() => fetchData(false)}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
            bg-surface border border-border
            text-text-secondary hover:text-text-primary
            hover:border-primary transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[16px]">refresh</span>
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <BatchListTab
          batches={batches}
          files={files}
          loading={loading}
          onRefresh={() => fetchData(false)}
        />
        {loadingMore && batchesCount > 0 && (
          <div className="text-center text-sm">Loading more…</div>
        )}
        <div ref={bottomRefBatches} className="h-10" />
      </div>
    </div>
  );
}
