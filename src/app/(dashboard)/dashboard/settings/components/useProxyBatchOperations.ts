import { useCallback, useState } from "react";

interface BatchDeleteResult {
  id: string;
  success: boolean;
  error?: string;
}

interface AutoTestResult {
  proxyId: string;
  host: string;
  port: number;
  alive: boolean;
  latencyMs: number | null;
  error?: string;
}

export function useProxyBatchOperations(load: () => Promise<void>) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [batchDeleting, setBatchDeleting] = useState(false);
  const [autoTesting, setAutoTesting] = useState(false);

  const toggleSelectAll = useCallback(
    (allSelected: boolean, items: Array<{ id: string }>) => {
      setSelectedIds(allSelected ? new Set() : new Set(items.map((i) => i.id)));
    },
    []
  );

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleBatchDelete = useCallback(
    async (setError: (msg: string | null) => void) => {
      if (selectedIds.size === 0) return;
      setBatchDeleting(true);
      try {
        const res = await fetch("/api/settings/proxies/batch-delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: Array.from(selectedIds), force: true }),
        });
        const data: { error?: { message?: string }; results?: BatchDeleteResult[] } =
          await res.json().catch(() => ({}));
        if (res.ok) {
          setSelectedIds(new Set());
          await load();
        } else {
          setError(data?.error?.message || "Batch delete failed");
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Batch delete failed");
      } finally {
        setBatchDeleting(false);
      }
    },
    [selectedIds, load]
  );

  const handleAutoTestAll = useCallback(
    async (
      setError: (msg: string | null) => void,
      setTestById: React.Dispatch<React.SetStateAction<Record<string, { success: boolean; publicIp?: string; latencyMs?: number | null; error?: string } | null>>>
    ) => {
      setAutoTesting(true);
      try {
        const res = await fetch("/api/settings/proxies/auto-test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        const data: { error?: { message?: string }; results?: AutoTestResult[] } =
          await res.json().catch(() => ({}));
        if (res.ok && data?.results) {
          const newTestResults: Record<string, { success: boolean; publicIp?: string; latencyMs?: number | null; error?: string } | null> = {};
          for (const r of data.results) {
            newTestResults[r.proxyId] = {
              success: r.alive,
              publicIp: r.alive ? r.host : undefined,
              latencyMs: r.latencyMs,
              error: r.error,
            };
          }
          setTestById((prev) => ({ ...prev, ...newTestResults }));
        } else if (data?.error?.message) {
          setError(data.error.message);
        }
        await load();
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Auto-test failed");
      } finally {
        setAutoTesting(false);
      }
    },
    [load]
  );

  return {
    selectedIds,
    setSelectedIds,
    batchDeleting,
    autoTesting,
    toggleSelectAll,
    toggleSelect,
    handleBatchDelete,
    handleAutoTestAll,
  };
}
