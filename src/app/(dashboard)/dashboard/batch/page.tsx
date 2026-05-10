"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SegmentedControl } from "@/shared/components";
import BatchListTab from "./BatchListTab";
import FilesListTab from "./FilesListTab";
import { FileRecord } from "@/lib/db/files";
import { BatchRecord } from "@/lib/db/batches";
import { mapBatchApiToRecord, mapFileApiToRecord } from "./batch-utils";

export default function BatchPage() {
  const [batches, setBatches] = useState<BatchRecord[]>([]);
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [batchesTotal, setBatchesTotal] = useState(0);
  const [filesTotal, setFilesTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState<"batches" | "files">("batches");

  const [batchesHasMore, setBatchesHasMore] = useState(false);
  const [batchesLastId, setBatchesLastId] = useState<string | null>(null);
  const [filesHasMore, setFilesHasMore] = useState(false);
  const [filesLastId, setFilesLastId] = useState<string | null>(null);
  const bottomRefBatches = useRef<HTMLDivElement>(null);
  const bottomRefFiles = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFetchingRef = useRef(false);
  const fetchDataRef = useRef<typeof fetchData | null>(null);

  const fetchData = useCallback(
    async (
      isBackground = false,
      opts: { appendBatches?: boolean; appendFiles?: boolean; limit?: number } = {}
    ) => {
      if (isFetchingRef.current) return;
      if (!isBackground) setLoading(true);
      if (opts.appendBatches || opts.appendFiles) setLoadingMore(true);
      isFetchingRef.current = true;
      const limit = opts.limit ?? 20;
      try {
        const batchUrl =
          `/api/v1/batches?limit=${limit}` +
          (opts.appendBatches && batchesLastId ? `&after=${batchesLastId}` : "");
        const filesUrl =
          `/api/v1/files?limit=${limit}` +
          (opts.appendFiles && filesLastId ? `&after=${filesLastId}` : "");

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

          if (opts.appendFiles) {
            setFiles((prev) => [...prev, ...mapped]);
            setFilesHasMore(Boolean(data.has_more));
            setFilesLastId(data.last_id || null);
          } else if (isBackground) {
            // Background refresh: merge new items with existing ones, preserve pagination state
            setFiles((prev) => {
              const fileMap = new Map(prev.map((f) => [f.id, f]));
              for (const m of mapped) {
                fileMap.set(m.id, m);
              }
              return Array.from(fileMap.values()).sort(
                (a, b) => b.createdAt - a.createdAt || b.id.localeCompare(a.id)
              );
            });
            // Don't reset filesLastId or filesHasMore on background refresh
          } else {
            setFiles(mapped);
            setFilesHasMore(Boolean(data.has_more));
            setFilesLastId(data.last_id || null);
          }
          setFilesTotal(data.total_count || 0);
        }
      } catch (error) {
        console.error("Failed to fetch batches/files", error);
      } finally {
        isFetchingRef.current = false;
        if (!isBackground) setLoading(false);
        if (opts.appendBatches || opts.appendFiles) setLoadingMore(false);
      }
    },
    [batchesLastId, filesLastId]
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

  // IntersectionObserver for infinite scroll - re-created only when tab or hasMore state changes
  // (NOT when loadingMore changes, to avoid re-triggering immediately after load)
  useEffect(() => {
    const currentBottomRef = activeTab === "batches" ? bottomRefBatches : bottomRefFiles;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (activeTab === "batches" && batchesHasMore && !loadingMoreRef.current) {
            fetchDataRef.current?.(true, { appendBatches: true });
          } else if (activeTab === "files" && filesHasMore && !loadingMoreRef.current) {
            fetchDataRef.current?.(true, { appendFiles: true });
          }
        }
      },
      { threshold: 0.1 }
    );

    if (currentBottomRef.current) {
      observer.observe(currentBottomRef.current);
    }

    return () => observer.disconnect();
  }, [activeTab, batchesHasMore, filesHasMore]);

  const batchesCount = batches.length;
  const filesCount = files.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <SegmentedControl
          options={[
            { value: "batches", label: `Batches${batchesTotal ? ` (${batchesTotal})` : ""}` },
            { value: "files", label: `Files${filesTotal ? ` (${filesTotal})` : ""}` },
          ]}
          value={activeTab}
          onChange={(v) => setActiveTab(v as "batches" | "files")}
        />

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

      {/* Tab content with scroll container for position preservation */}
      <div ref={listContainerRef} className="flex flex-col gap-6">
        {activeTab === "batches" ? (
          <>
            <BatchListTab batches={batches} files={files} loading={loading} />
            {loadingMore && batchesCount > 0 && (
              <div className="text-center text-sm">Loading more…</div>
            )}
            <div ref={bottomRefBatches} className="h-10" />
          </>
        ) : (
          <>
            <FilesListTab files={files} loading={loading} onRefresh={() => fetchData(false)} />
            {loadingMore && filesCount > 0 && (
              <div className="text-center text-sm">Loading more…</div>
            )}
            <div ref={bottomRefFiles} className="h-10" />
          </>
        )}
      </div>
    </div>
  );
}
