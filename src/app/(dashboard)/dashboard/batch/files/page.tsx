"use client";

import { useState, useEffect, useCallback } from "react";
import FilesListTab from "../FilesListTab";
import { mapFileApiToRecord, mapBatchApiToRecord } from "../batch-utils";
import { FileRecord } from "@/lib/db/files";
import { BatchRecord } from "@/lib/db/batches";

export default function BatchFilesPage() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [batches, setBatches] = useState<BatchRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [filesRes, batchesRes] = await Promise.all([
        fetch("/api/v1/files?limit=20"),
        fetch("/api/v1/batches?limit=20"),
      ]);
      if (filesRes.ok) {
        const data = await filesRes.json();
        setFiles((data.data || []).map(mapFileApiToRecord));
      }
      if (batchesRes.ok) {
        const data = await batchesRes.json();
        setBatches((data.data || []).map(mapBatchApiToRecord));
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  return (
    <FilesListTab files={files} loading={loading} onRefresh={fetchAll} batches={batches} />
  );
}
