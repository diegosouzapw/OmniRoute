"use client";

import { useState, useEffect, useCallback } from "react";
import { SegmentedControl } from "@/shared/components";
import BatchListTab from "./BatchListTab";
import FilesListTab from "./FilesListTab";

export default function BatchPage() {
  const [batches, setBatches] = useState<unknown[]>([]);
  const [files, setFiles] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"batches" | "files">("batches");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [batchesRes, filesRes] = await Promise.all([
        fetch("/api/batches"),
        fetch("/api/files"),
      ]);
      if (batchesRes.ok) {
        const data = await batchesRes.json();
        setBatches(data.batches || []);
      }
      if (filesRes.ok) {
        const data = await filesRes.json();
        setFiles(data.files || []);
      }
    } catch (error) {
      console.error("Failed to fetch batches/files", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <SegmentedControl
          options={[
            { value: "batches", label: `Batches${batches.length ? ` (${batches.length})` : ""}` },
            { value: "files", label: `Files${files.length ? ` (${files.length})` : ""}` },
          ]}
          value={activeTab}
          onChange={(v) => setActiveTab(v as "batches" | "files")}
        />

        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
            bg-[var(--card-bg,#1e1e2e)] border border-[var(--border,#333)]
            text-[var(--text-secondary,#aaa)] hover:text-[var(--text-primary,#fff)]
            hover:border-[var(--accent,#7c3aed)] transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[16px]">refresh</span>
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "batches" ? (
        <BatchListTab batches={batches} files={files} loading={loading} />
      ) : (
        <FilesListTab files={files} loading={loading} />
      )}
    </div>
  );
}
