"use client";

/**
 * useProviderConnections — Phase 1f extraction for Issue #3501.
 *
 * Owns ALL connection-management state and handlers that were previously
 * inline in ProviderDetailPageClient:
 *  - connections / providerNode / loading state
 *  - fetchConnections (with compatible-node retry logic)
 *  - batch activate / deactivate / retest / delete (with MAX_BULK_IDS chunking)
 *  - single-connection handlers: delete, update status, proxy toggles,
 *    rate-limit, claude extra-usage, codex limit, cpa mode,
 *    retest, token refresh, swap priority
 *  - selection state: selectedIds, handleToggleSelectOne/All, batchDeleteConfirmOpen
 *  - batch-test runner (runBatchTest / handleBatchTestAll / handleBatchRetest)
 *  - health/pagination filters (healthFilter, page)
 *  - proxy/distribution helpers (loadConnProxies, handleDistributeProxies,
 *    toggleProxyEnabled, togglePerKeyProxyEnabled)
 *
 * The hook is cycle-safe: it imports only from leaf modules (@/store, @/shared,
 * providers constants) — never from ProviderDetailPageClient.
 */

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import { isClaudeCodeCompatibleProvider } from "@/shared/constants/providers";
import type { ConnectionRowConnection } from "../components/ConnectionRow";
import { normalizeCodexLimitPolicy } from "../providerPageHelpers";

// Max connection ids accepted per bulk request — mirrors API-side cap.
const MAX_BULK_IDS = 100;
const PAGE_SIZE = 50;

// ──── types ─────────────────────────────────────────────────────────────────

export type BatchTestResults = {
  error: string | null;
  results: any[];
  summary: { passed: number; failed: number; total: number } | null;
} | null;

export interface UseProviderConnectionsReturn {
  // State
  connections: ConnectionRowConnection[];
  providerNode: any;
  loading: boolean;
  retestingId: string | null;
  batchTesting: boolean;
  batchTestResults: BatchTestResults;
  selectedIds: Set<string>;
  batchDeleting: boolean;
  batchUpdating: "activate" | "deactivate" | null;
  batchRetesting: boolean;
  batchDeleteConfirmOpen: boolean;
  healthFilter: string;
  page: number;
  distributingProxies: boolean;
  proxyConfig: any;
  connProxyMap: Record<string, { proxy: any; level: string } | null>;
  cpaProviderEnabled: boolean;
  refreshingId: string | null;

  // Setters (minimal surface for UI)
  setPage: (p: number) => void;
  setHealthFilter: (f: string) => void;
  setSelectedIds: (updater: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
  setBatchDeleteConfirmOpen: (open: boolean) => void;
  setBatchTestResults: (r: BatchTestResults) => void;
  setConnections: (
    updater:
      | ConnectionRowConnection[]
      | ((prev: ConnectionRowConnection[]) => ConnectionRowConnection[])
  ) => void;
  setProviderNode: (node: any) => void;

  // Connection fetch
  fetchConnections: () => Promise<void>;
  fetchProxyConfig: () => Promise<void>;

  // Single-connection handlers
  handleDelete: (connectionId: string) => Promise<void>;
  handleUpdateConnectionStatus: (id: string, isActive: boolean) => Promise<void>;
  handleToggleRateLimit: (connectionId: string, enabled: boolean) => Promise<void>;
  handleToggleClaudeExtraUsage: (connectionId: string, enabled: boolean) => Promise<void>;
  handleToggleCodexLimit: (
    connectionId: string,
    field: string,
    enabled: boolean
  ) => Promise<void>;
  handleToggleCliproxyapiMode: (connectionId: string, enabled: boolean) => Promise<void>;
  handleToggleProxyEnabled: (connectionId: string, proxyEnabled: boolean) => Promise<void>;
  handleTogglePerKeyProxyEnabled: (
    connectionId: string,
    perKeyProxyEnabled: boolean
  ) => Promise<void>;
  handleRetestConnection: (connectionId: string) => Promise<void>;
  handleRefreshToken: (connectionId: string) => Promise<void>;
  handleSwapPriority: (conn1: any, conn2: any) => Promise<void>;

  // Batch handlers
  handleBatchSetActive: (isActive: boolean) => Promise<void>;
  handleBatchDeleteOpenModal: () => void;
  handleBatchDeleteConfirm: (
    onAfter?: () => Promise<void>
  ) => Promise<void>;
  handleBatchRetest: () => Promise<void>;
  handleBatchTestAll: () => Promise<void>;

  // Selection helpers
  handleToggleSelectOne: (id: string) => void;
  handleToggleSelectAll: () => void;

  // Proxy distribution
  handleDistributeProxies: (tagFilter?: string) => Promise<void>;

  // Helpers for parsing API responses
  parseApiErrorMessage: (res: Response, fallback: string) => Promise<string>;
  getAttachmentFilename: (res: Response, fallback: string) => string;

  // Constants exposed for render
  PAGE_SIZE: number;
}

export function useProviderConnections(
  providerId: string,
  isCompatible: boolean,
  isSearchProvider: boolean
): UseProviderConnectionsReturn {
  const t = useTranslations("providers");
  const notify = useNotificationStore();

  const isCcCompatible = isClaudeCodeCompatibleProvider(providerId);

  // ── core state ──────────────────────────────────────────────────────────
  const [connections, setConnections] = useState<ConnectionRowConnection[]>([]);
  const [providerNode, setProviderNode] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ── test state ──────────────────────────────────────────────────────────
  const [retestingId, setRetestingId] = useState<string | null>(null);
  const [batchTesting, setBatchTesting] = useState(false);
  const [batchTestResults, setBatchTestResults] = useState<BatchTestResults>(null);

  // ── selection + batch state ─────────────────────────────────────────────
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [batchDeleting, setBatchDeleting] = useState(false);
  const [batchUpdating, setBatchUpdating] = useState<"activate" | "deactivate" | null>(null);
  const [batchRetesting, setBatchRetesting] = useState(false);
  const [batchDeleteConfirmOpen, setBatchDeleteConfirmOpen] = useState(false);

  // ── filter / pagination state ───────────────────────────────────────────
  const [healthFilter, setHealthFilter] = useState<string>("all");
  const [page, setPage] = useState(0);

  // ── proxy state ─────────────────────────────────────────────────────────
  const [distributingProxies, setDistributingProxies] = useState(false);
  const [proxyConfig, setProxyConfig] = useState<any>(null);
  const [connProxyMap, setConnProxyMap] = useState<
    Record<string, { proxy: any; level: string } | null>
  >({});

  // ── CLIProxyAPI state ───────────────────────────────────────────────────
  const [cpaProviderEnabled, setCpaProviderEnabled] = useState(false);

  // ── token refresh state ─────────────────────────────────────────────────
  const [refreshingId, setRefreshingId] = useState<string | null>(null);

  // ────────────────────────────────────────────────────────────────────────
  // Fetch helpers
  // ────────────────────────────────────────────────────────────────────────

  const fetchProxyConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/settings/proxy", { cache: "no-store" });
      if (res.ok) {
        setProxyConfig(await res.json());
      } else {
        setProxyConfig(null);
      }
    } catch {
      // Proxy indicators are best-effort.
    }
  }, []);

  const fetchConnections = useCallback(async () => {
    try {
      const [connectionsRes, nodesRes] = await Promise.all([
        fetch("/api/providers", { cache: "no-store" }),
        fetch("/api/provider-nodes", { cache: "no-store" }),
      ]);
      const connectionsData = await connectionsRes.json();
      const nodesData = await nodesRes.json();
      if (connectionsRes.ok) {
        const filtered = (connectionsData.connections || []).filter(
          (c: any) => c.provider === providerId
        );
        setConnections(filtered);
      }
      if (nodesRes.ok) {
        let node =
          (nodesData.nodes || []).find((entry: any) => entry.id === providerId) || null;

        // Newly created compatible nodes can be briefly unavailable on one worker.
        if (!node && isCompatible) {
          for (let attempt = 0; attempt < 3; attempt += 1) {
            await new Promise((resolve) => setTimeout(resolve, 150));
            const retryRes = await fetch("/api/provider-nodes", { cache: "no-store" });
            if (!retryRes.ok) continue;
            const retryData = await retryRes.json();
            node =
              (retryData.nodes || []).find((entry: any) => entry.id === providerId) || null;
            if (node) break;
          }
        }

        setProviderNode(node);
      }
    } catch (error) {
      console.log("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  }, [providerId, isCompatible]);

  const loadConnProxies = useCallback(async (conns: { id?: string }[]) => {
    if (!conns.length) return;
    try {
      const results = await Promise.all(
        conns
          .filter((c) => c.id)
          .map((c) =>
            fetch(
              `/api/settings/proxy?resolve=${encodeURIComponent(c.id!)}`,
              { cache: "no-store" }
            )
              .then((r) => (r.ok ? r.json() : null))
              .then((data) => [c.id!, data] as [string, any])
              .catch(() => [c.id!, null] as [string, any])
          )
      );
      const map: Record<string, { proxy: any; level: string } | null> = {};
      for (const [id, data] of results) {
        map[id] = data?.proxy ? data : null;
      }
      setConnProxyMap(map);
    } catch {
      // ignore
    }
  }, []);

  // ── effects ──────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchConnections();
    void fetchProxyConfig();
  }, [fetchConnections, fetchProxyConfig]);

  // Per-connection proxy (handles registry assignments)
  useEffect(() => {
    if (!loading && connections.length > 0) {
      void loadConnProxies(connections);
    }
  }, [loading, connections, loadConnProxies]);

  // CLIProxyAPI upstream proxy config
  useEffect(() => {
    if (!isCcCompatible) return;

    fetch(`/api/settings`)
      .then((r) => r.json())
      .then(() => {
        // Check if this provider has CLIProxyAPI routing enabled
      })
      .catch(() => {});

    fetch(`/api/upstream-proxy/${providerId}`)
      .then((r) => {
        if (!r.ok) return null;
        return r.json();
      })
      .then((data) => {
        if (data?.enabled && (data.mode === "cliproxyapi" || data.mode === "fallback")) {
          setCpaProviderEnabled(true);
        }
      })
      .catch(() => {});
  }, [isCcCompatible, providerId]);

  // ────────────────────────────────────────────────────────────────────────
  // API error helpers
  // ────────────────────────────────────────────────────────────────────────

  const parseApiErrorMessage = async (res: Response, fallback: string): Promise<string> => {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await res.json().catch(() => ({}));
      if (typeof data?.error === "string" && data.error.trim()) return data.error;
      if (data?.error?.message) return data.error.message;
    }
    const text = await res.text().catch(() => "");
    return text.trim() || fallback;
  };

  const getAttachmentFilename = (res: Response, fallback: string): string => {
    const disposition = res.headers.get("content-disposition") || "";
    const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
    if (utf8Match?.[1]) return decodeURIComponent(utf8Match[1]);
    const plainMatch = disposition.match(/filename="([^"]+)"/i);
    if (plainMatch?.[1]) return plainMatch[1];
    return fallback;
  };

  // ────────────────────────────────────────────────────────────────────────
  // Single-connection handlers
  // ────────────────────────────────────────────────────────────────────────

  const handleDelete = useCallback(
    async (connectionId: string) => {
      if (!connectionId) return;
      try {
        const res = await fetch(`/api/providers/${connectionId}`, { method: "DELETE" });
        if (res.ok) {
          notify.success("Connection deleted");
          await fetchConnections();
        } else {
          const data = await res.json().catch(() => ({}));
          const message =
            (typeof data?.error === "string" && data.error) ||
            data?.error?.message ||
            "Failed to delete connection";
          notify.error(message);
        }
      } catch (error) {
        console.error("Error deleting connection:", error);
        notify.error("Failed to delete connection");
      }
    },
    [fetchConnections, notify]
  );

  const handleUpdateConnectionStatus = async (id: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/providers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });
      if (res.ok) {
        setConnections((prev: any[]) =>
          prev.map((c) => (c.id === id ? { ...c, isActive } : c))
        );
      }
    } catch (error) {
      console.log("Error updating connection status:", error);
    }
  };

  const handleToggleRateLimit = async (connectionId: string, enabled: boolean) => {
    try {
      const res = await fetch("/api/rate-limits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectionId, enabled }),
      });
      if (res.ok) {
        setConnections((prev: any[]) =>
          prev.map((c) =>
            c.id === connectionId ? { ...c, rateLimitProtection: enabled } : c
          )
        );
      }
    } catch (error) {
      console.error("Error toggling rate limit:", error);
    }
  };

  const handleToggleClaudeExtraUsage = async (connectionId: string, enabled: boolean) => {
    try {
      const target = (connections as any[]).find((connection) => connection.id === connectionId);
      if (!target) return;

      const providerSpecificData =
        target.providerSpecificData && typeof target.providerSpecificData === "object"
          ? target.providerSpecificData
          : {};

      const res = await fetch(`/api/providers/${connectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerSpecificData: { ...providerSpecificData, blockExtraUsage: enabled },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        notify.error(data.error || "Failed to update Claude extra-usage policy");
        return;
      }

      setConnections((prev: any[]) =>
        prev.map((connection) =>
          connection.id === connectionId
            ? {
                ...connection,
                providerSpecificData: {
                  ...(connection.providerSpecificData || {}),
                  blockExtraUsage: enabled,
                },
                ...(!enabled && connection.lastErrorSource === "extra_usage"
                  ? {
                      testStatus: "active",
                      lastError: null,
                      lastErrorAt: null,
                      lastErrorType: null,
                      lastErrorSource: null,
                      errorCode: null,
                      rateLimitedUntil: null,
                    }
                  : {}),
              }
            : connection
        )
      );
      notify.success(
        enabled
          ? "Claude extra-usage blocking enabled (extra usage will be blocked)"
          : "Claude extra-usage blocking disabled (extra usage is allowed)"
      );
    } catch (error) {
      console.error("Error toggling Claude extra-usage policy:", error);
      notify.error("Failed to update Claude extra-usage policy");
    }
  };

  const handleToggleCodexLimit = async (
    connectionId: string,
    field: string,
    enabled: boolean
  ) => {
    try {
      const target = (connections as any[]).find((connection) => connection.id === connectionId);
      if (!target) return;

      const providerSpecificData =
        target.providerSpecificData && typeof target.providerSpecificData === "object"
          ? target.providerSpecificData
          : {};
      const existingPolicy =
        providerSpecificData.codexLimitPolicy &&
        typeof providerSpecificData.codexLimitPolicy === "object"
          ? providerSpecificData.codexLimitPolicy
          : {};

      const nextPolicy = {
        ...normalizeCodexLimitPolicy(existingPolicy),
        [field]: enabled,
      };

      const res = await fetch(`/api/providers/${connectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerSpecificData: { ...providerSpecificData, codexLimitPolicy: nextPolicy },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        notify.error(data.error || "Failed to update Codex limit policy");
        return;
      }

      setConnections((prev: any[]) =>
        prev.map((connection) =>
          connection.id === connectionId
            ? {
                ...connection,
                providerSpecificData: {
                  ...(connection.providerSpecificData || {}),
                  codexLimitPolicy: nextPolicy,
                },
              }
            : connection
        )
      );
      notify.success("Codex limit policy updated");
    } catch (error) {
      console.error("Error toggling Codex quota policy:", error);
      notify.error("Failed to update Codex limit policy");
    }
  };

  const handleToggleCliproxyapiMode = async (_connectionId: string, enabled: boolean) => {
    try {
      const res = await fetch(`/api/upstream-proxy/${providerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: enabled ? "cliproxyapi" : "native", enabled }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        notify.error(data.error || "Failed to update CLIProxyAPI routing");
        return;
      }

      setCpaProviderEnabled(enabled);
      notify.success(
        enabled
          ? "Requests now route through CLIProxyAPI (deeper emulation)"
          : "Requests now use native OmniRoute (direct)"
      );
    } catch {
      notify.error("Failed to update CLIProxyAPI routing");
    }
  };

  const handleToggleProxyEnabled = async (connectionId: string, proxyEnabled: boolean) => {
    try {
      const res = await fetch(`/api/providers/${connectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proxyEnabled }),
      });
      if (res.ok) {
        setConnections((prev: any[]) =>
          prev.map((c) => (c.id === connectionId ? { ...c, proxyEnabled } : c))
        );
      }
    } catch (error) {
      console.error("Error toggling proxy enabled:", error);
    }
  };

  const handleTogglePerKeyProxyEnabled = async (
    connectionId: string,
    perKeyProxyEnabled: boolean
  ) => {
    try {
      const res = await fetch(`/api/providers/${connectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ perKeyProxyEnabled }),
      });
      if (res.ok) {
        setConnections((prev: any[]) =>
          prev.map((c) => (c.id === connectionId ? { ...c, perKeyProxyEnabled } : c))
        );
      }
    } catch (error) {
      console.error("Error toggling per-key proxy enabled:", error);
    }
  };

  const handleRetestConnection = async (connectionId: string) => {
    if (!connectionId || retestingId) return;
    setRetestingId(connectionId);
    try {
      const res = await fetch(`/api/providers/${connectionId}/test`, { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || t("failedRetestConnection"));
        return;
      }
      await fetchConnections();
    } catch (error) {
      console.error("Error retesting connection:", error);
    } finally {
      setRetestingId(null);
    }
  };

  const handleRefreshToken = async (connectionId: string) => {
    if (refreshingId) return;
    setRefreshingId(connectionId);
    try {
      const res = await fetch(`/api/providers/${connectionId}/refresh`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        notify.success(t("tokenRefreshed"));
        await fetchConnections();
      } else {
        notify.error(data.error || t("tokenRefreshFailed"));
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      notify.error(t("tokenRefreshFailed"));
    } finally {
      setRefreshingId(null);
    }
  };

  const handleSwapPriority = async (conn1: any, conn2: any) => {
    if (!conn1 || !conn2) return;
    try {
      let p1 = conn2.priority;
      let p2 = conn1.priority;

      if (p1 === p2) {
        const isConn1MovingUp =
          (connections as any[]).indexOf(conn1) > (connections as any[]).indexOf(conn2);
        if (isConn1MovingUp) {
          p1 = conn2.priority - 0.5;
        } else {
          p1 = conn2.priority + 0.5;
        }
      }

      await Promise.all([
        fetch(`/api/providers/${conn1.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priority: p1 }),
        }),
        fetch(`/api/providers/${conn2.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priority: p2 }),
        }),
      ]);
      await fetchConnections();
    } catch (error) {
      console.log("Error swapping priority:", error);
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // Selection handlers
  // ────────────────────────────────────────────────────────────────────────

  const handleToggleSelectOne = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleToggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (
        prev.size === (connections as any[]).length &&
        (connections as any[]).length > 0
      ) {
        return new Set();
      }
      return new Set((connections as any[]).map((c: { id: string }) => c.id));
    });
  }, [connections]);

  // ────────────────────────────────────────────────────────────────────────
  // Batch handlers
  // ────────────────────────────────────────────────────────────────────────

  const handleBatchDeleteOpenModal = () => {
    if (selectedIds.size === 0) return;
    setBatchDeleteConfirmOpen(true);
  };

  const handleBatchDeleteConfirm = async (onAfter?: () => Promise<void>) => {
    setBatchDeleteConfirmOpen(false);
    setBatchDeleting(true);
    try {
      const res = await fetch("/api/providers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });

      if (res.ok) {
        const count = selectedIds.size;
        setSelectedIds(new Set());
        await fetchConnections();
        notify.success(t("batchDeleteSuccess", { count }));
        if (onAfter) await onAfter();
      } else {
        const data = await res.json();
        notify.error(data.error || "Batch delete failed");
      }
    } catch {
      notify.error("Network error during batch delete");
    } finally {
      setBatchDeleting(false);
    }
  };

  const handleBatchSetActive = async (isActive: boolean) => {
    if (selectedIds.size === 0 || batchUpdating) return;
    setBatchUpdating(isActive ? "activate" : "deactivate");
    try {
      const ids = Array.from(selectedIds);
      let updated = 0;
      let notFound = 0;
      for (let i = 0; i < ids.length; i += MAX_BULK_IDS) {
        const chunk = ids.slice(i, i + MAX_BULK_IDS);
        const res = await fetch("/api/providers", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: chunk, isActive }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error?.message || data.error || "Batch update failed");
        }
        const data = await res.json();
        updated += data.updated ?? 0;
        notFound += Array.isArray(data.notFound) ? data.notFound.length : 0;
      }

      await fetchConnections();

      if (updated === 0) {
        notify.warning(t("batchUpdateNone"));
      } else if (notFound > 0) {
        notify.warning(t("batchUpdatePartial", { count: updated, skipped: notFound }));
      } else {
        notify.success(
          isActive
            ? t("batchActivateSuccess", { count: updated })
            : t("batchDeactivateSuccess", { count: updated })
        );
      }
    } catch (error: any) {
      notify.error(error?.message || "Network error during batch update");
    } finally {
      setBatchUpdating(null);
    }
  };

  // Shared runner for batch connection tests (all-for-provider or selected IDs)
  const runBatchTest = async (payload: Record<string, unknown>) => {
    setBatchTestResults(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120_000); // 2min max
    try {
      const res = await fetch("/api/providers/test-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      let data: any;
      try {
        data = await res.json();
      } catch {
        data = { error: t("providerTestFailed"), results: [], summary: null };
      }
      setBatchTestResults({
        ...data,
        error: data.error
          ? typeof data.error === "object"
            ? data.error.message || data.error.error || JSON.stringify(data.error)
            : String(data.error)
          : null,
      });
      if (data?.summary) {
        const { passed, failed, total } = data.summary;
        if (total === 0) notify.warning(t("noConnectionsToTest"));
        else if (failed === 0) notify.success(t("allTestsPassed", { total }));
        else notify.warning(t("testSummary", { passed, failed, total }));
      }
      await fetchConnections();
    } catch (error: any) {
      const isAbort = error?.name === "AbortError";
      const msg = isAbort ? t("providerTestTimeout") : t("providerTestFailed");
      setBatchTestResults({ error: msg, results: [], summary: null });
      notify.error(msg);
    } finally {
      clearTimeout(timeoutId);
    }
  };

  // Batch test all connections for this provider
  const handleBatchTestAll = async () => {
    if (batchTesting || (connections as any[]).length === 0) return;
    setBatchTesting(true);
    try {
      await runBatchTest({ mode: "provider", providerId });
    } finally {
      setBatchTesting(false);
    }
  };

  // Batch retest only the selected connections
  const handleBatchRetest = async () => {
    if (batchRetesting || selectedIds.size === 0) return;
    // Live-testing a huge selection risks the 120s client abort; bound it to
    // the same cap the API enforces and tell the user to narrow the selection.
    if (selectedIds.size > MAX_BULK_IDS) {
      notify.warning(t("batchRetestLimit", { max: MAX_BULK_IDS }));
      return;
    }
    setBatchRetesting(true);
    try {
      await runBatchTest({ mode: "selected", connectionIds: Array.from(selectedIds) });
    } finally {
      setBatchRetesting(false);
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // Proxy distribution
  // ────────────────────────────────────────────────────────────────────────

  const handleDistributeProxies = async (tagFilter?: string) => {
    const targetConnections = tagFilter
      ? (connections as any[]).filter(
          (c: any) => (c.providerSpecificData?.tag as string | undefined)?.trim() === tagFilter
        )
      : connections;
    if ((targetConnections as any[]).length === 0) return;
    setDistributingProxies(true);
    try {
      const proxiesRes = await fetch("/api/settings/proxies");
      if (!proxiesRes.ok) throw new Error("Failed to fetch proxies");
      const proxiesData = await proxiesRes.json();
      const savedProxies = (proxiesData?.items || []).filter((p: any) => p.status === "active");
      if (savedProxies.length === 0) {
        notify.error("No saved proxies found. Add proxies in Settings → Proxy first.");
        return;
      }

      let assigned = 0;
      const sorted = [...(targetConnections as any[])].sort(
        (a: any, b: any) => (a.priority || 0) - (b.priority || 0)
      );

      for (let i = 0; i < sorted.length; i++) {
        const conn = sorted[i] as any;
        const proxy = savedProxies[i % savedProxies.length];

        try {
          await fetch("/api/settings/proxies/assignments", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ scope: "account", scopeId: conn.id, proxyId: null }),
          });
        } catch {
          /* clear old assignment */
        }

        const patchRes = await fetch(`/api/providers/${conn.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ proxyEnabled: true, perKeyProxyEnabled: true }),
        });

        if (!patchRes.ok) {
          console.error(`Failed to update connection ${conn.id}`);
          continue;
        }

        const assignRes = await fetch("/api/settings/proxies/assignments", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scope: "account", scopeId: conn.id, proxyId: proxy.id }),
        });

        if (!assignRes.ok) {
          console.error(`Failed to assign proxy to ${conn.id}`);
          continue;
        }

        assigned++;
      }

      await fetchConnections();
      const tagLabel = tagFilter ? `"${tagFilter}" ` : "";
      notify.success(
        `Distributed ${assigned} proxy assignment(s) across ${tagLabel}${sorted.length} connection(s).`
      );
    } catch (err) {
      console.error("Error distributing proxies:", err);
      notify.error("Failed to distribute proxies.");
    } finally {
      setDistributingProxies(false);
    }
  };

  // ────────────────────────────────────────────────────────────────────────

  return {
    // State
    connections,
    providerNode,
    loading,
    retestingId,
    batchTesting,
    batchTestResults,
    selectedIds,
    batchDeleting,
    batchUpdating,
    batchRetesting,
    batchDeleteConfirmOpen,
    healthFilter,
    page,
    distributingProxies,
    proxyConfig,
    connProxyMap,
    cpaProviderEnabled,
    refreshingId,

    // Setters
    setPage,
    setHealthFilter,
    setSelectedIds,
    setBatchDeleteConfirmOpen,
    setBatchTestResults,
    setConnections,
    setProviderNode,

    // Fetch
    fetchConnections,
    fetchProxyConfig,

    // Single-connection handlers
    handleDelete,
    handleUpdateConnectionStatus,
    handleToggleRateLimit,
    handleToggleClaudeExtraUsage,
    handleToggleCodexLimit,
    handleToggleCliproxyapiMode,
    handleToggleProxyEnabled,
    handleTogglePerKeyProxyEnabled,
    handleRetestConnection,
    handleRefreshToken,
    handleSwapPriority,

    // Batch handlers
    handleBatchSetActive,
    handleBatchDeleteOpenModal,
    handleBatchDeleteConfirm,
    handleBatchRetest,
    handleBatchTestAll,

    // Selection
    handleToggleSelectOne,
    handleToggleSelectAll,

    // Proxy distribution
    handleDistributeProxies,

    // Helpers
    parseApiErrorMessage,
    getAttachmentFilename,

    // Constants
    PAGE_SIZE,
  };
}
