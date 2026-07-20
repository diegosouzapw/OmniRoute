"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Button, Card, Modal } from "@/shared/components";
import { useProxyBatchOperations } from "./useProxyBatchOperations";
import { ProxyStatusBadge } from "./ProxyStatusBadge";
import { ProxyHealthCell } from "./ProxyHealthCell";
import { ProxyBatchActions } from "./ProxyBatchActions";
import { ProxyCheckboxCell } from "./ProxyCheckboxCell";
import {
  parseBulkImportText,
  type ParsedProxyEntry,
  type ParseError,
} from "./parseBulkProxyImport";
import { POOL_STRATEGY_OPTIONS, isPoolStrategy, type PoolStrategy } from "./proxyStrategyOptions";
import type { ProxyItem } from "./proxyRegistryTypes";

type UsageInfo = {
  count: number;
  assignments: Array<{ scope: string; scopeId: string | null }>;
};

type HealthInfo = {
  proxyId: string;
  totalRequests: number;
  successRate: number | null;
  avgLatencyMs: number | null;
  lastSeenAt: string | null;
};

type TestResult = {
  success: boolean;
  publicIp?: string;
  latencyMs?: number;
  country?: string;
  error?: string;
};

const EMPTY_FORM = {
  id: "",
  name: "",
  type: "http",
  host: "",
  port: "8080",
  username: "",
  password: "",
  region: "",
  notes: "",
  status: "active",
  family: "auto",
};

const BULK_IMPORT_TEMPLATE = `# Proxy Bulk Import
# ─────────────────────────────────────────────────────────────────────────────
# FORMAT 1 — Pipe-delimited (full control):
#   NAME|HOST|PORT|USERNAME|PASSWORD|TYPE|REGION|STATUS|NOTES
#   Required: NAME, HOST, PORT
#   Optional: USERNAME, PASSWORD, TYPE (http|https|socks5, default: socks5), REGION, STATUS (active|inactive, default: active), NOTES
#
# FORMAT 2 — Shorthand (one proxy per line, no pipe needed):
#   ip:port                          → no auth, type defaults to socks5
#   ip:port:user:pass                → with auth
#   user:pass@ip:port                → with auth (@-style)
#   user:pass:ip:port                 → with auth (user-pass-first)
#   protocol://ip:port               → explicit protocol
#   protocol://user:pass@ip:port     → explicit protocol + auth
#
# FORMAT 3 — Protocol header mode:
#   Put a bare protocol (http, https, socks5) on its own line to set
#   the default type for all subsequent shorthand lines that don't
#   include an explicit protocol:// prefix.
#
# Lines starting with # are ignored. Existing proxies (same host+port) will be updated.
#
# ─────────────────────────────────────────────────────────────────────────────
# Pipe-delimited examples:
# proxy-us|138.99.147.218|50101|myuser|mypass|socks5|US-East|active|US production proxy
# proxy-eu|200.234.177.62|50101|myuser|mypass|socks5|EU-West
# http-proxy|10.0.0.50|8080|||http||active|Internal HTTP proxy
#
# Shorthand examples:
# 138.99.147.218:50101
# 138.99.147.218:50101:myuser:mypass
# myuser:mypass@138.99.147.218:50101
# myuser:mypass:138.99.147.218:50101
# http://10.0.0.50:8080
# https://admin:secret123@proxy.example.com:443
#
# Protocol header mode example:
# socks5
# 138.99.147.218:50101:myuser:mypass
# 200.234.177.62:50101:otheruser:otherpass
#`;

export default function ProxyRegistryManager({
  onRedeployRelay,
}: {
  onRedeployRelay?: (proxy: ProxyItem) => void;
} = {}) {
  const t = useTranslations("proxyRegistry");
  const [items, setItems] = useState<ProxyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const [usageById, setUsageById] = useState<Record<string, UsageInfo>>({});
  const [healthById, setHealthById] = useState<Record<string, HealthInfo>>({});
  const [testById, setTestById] = useState<Record<string, TestResult | null>>({});
  const [testingId, setTestingId] = useState<string | null>(null);
  const [repairingId, setRepairingId] = useState<string | null>(null);
  const [repairErrorById, setRepairErrorById] = useState<Record<string, string>>({});
  const [relayTested, setRelayTested] = useState<number | null>(null);
  const [relayAlive, setRelayAlive] = useState<number | null>(null);
  const [migrating, setMigrating] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkSaving, setBulkSaving] = useState(false);
  const [bulkScope, setBulkScope] = useState("provider");
  const [bulkScopeIds, setBulkScopeIds] = useState("");
  const [bulkProxyId, setBulkProxyId] = useState("");

  // Proxy pool / rotation state (#6365) — a single scope can hold MULTIPLE
  // proxies and pick a rotation strategy that cycles egress IPs.
  const [poolOpen, setPoolOpen] = useState(false);
  const [poolScope, setPoolScope] = useState("provider");
  const [poolScopeId, setPoolScopeId] = useState("");
  const [poolStrategy, setPoolStrategy] = useState<PoolStrategy>("round-robin");
  const [poolMembers, setPoolMembers] = useState<string[]>([]);
  const [poolAddProxyId, setPoolAddProxyId] = useState("");
  const [poolLoading, setPoolLoading] = useState(false);
  const [poolLoaded, setPoolLoaded] = useState(false);
  const [poolSaving, setPoolSaving] = useState(false);
  const [bulkImportOpen, setBulkImportOpen] = useState(false);
  const [bulkImportText, setBulkImportText] = useState(BULK_IMPORT_TEMPLATE);
  const [bulkImportParsed, setBulkImportParsed] = useState<ParsedProxyEntry[]>([]);
  const [bulkImportErrors, setBulkImportErrors] = useState<ParseError[]>([]);
  const [bulkImportSkipped, setBulkImportSkipped] = useState(0);
  const [bulkImportParsedOnce, setBulkImportParsedOnce] = useState(false);
  const [bulkImporting, setBulkImporting] = useState(false);
  const [bulkImportResult, setBulkImportResult] = useState<{
    created: number;
    updated: number;
    failed: number;
  } | null>(null);

  const editingId = useMemo(() => form.id || "", [form.id]);

  const loadHealth = useCallback(async () => {
    try {
      const res = await fetch("/api/settings/proxies/health?hours=24");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return;
      const entries = Array.isArray(data?.items) ? data.items : [];
      const mapped = Object.fromEntries(
        entries.map((entry: HealthInfo) => [entry.proxyId, entry])
      ) as Record<string, HealthInfo>;
      setHealthById(mapped);
    } catch {
      // ignore health loading errors in UI
    }
  }, []);

  const loadAllUsage = useCallback(async (proxyIds: string[]) => {
    if (!proxyIds.length) return;
    try {
      const results = await Promise.all(
        proxyIds.map((id) =>
          fetch(`/api/settings/proxies/assignments?proxyId=${encodeURIComponent(id)}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
              const rawAssignments: Array<{ scope: string; scopeId: string | null }> =
                Array.isArray(data?.items) ? data.items : [];
              // Deduplicate by scope+scopeId — prevents double-counting when both
              // a provider-scope and account-scope row exist for the same proxy
              const seen = new Set<string>();
              const assignments = rawAssignments.filter((a) => {
                const key = `${a.scope}:${a.scopeId ?? ""}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
              });
              return [id, { count: assignments.length, assignments }] as [string, UsageInfo];
            })
            .catch(() => [id, { count: 0, assignments: [] }] as [string, UsageInfo])
        )
      );
      setUsageById(Object.fromEntries(results));
    } catch {
      // ignore
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxies");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error?.message || t("errorLoadFailed"));
        setItems([]);
        return;
      }
      const stats = data?.relayProbeStats;
      if (stats && typeof stats.tested === "number" && typeof stats.alive === "number") {
        setRelayTested(stats.tested);
        setRelayAlive(stats.alive);
      }
      const loaded: ProxyItem[] = Array.isArray(data?.items) ? data.items : [];
      setItems(loaded);
      const ids = loaded.map((p) => p.id).filter(Boolean);
      void loadHealth();
      void loadAllUsage(ids);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg || t("errorLoadFailed"));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [loadHealth, loadAllUsage, t]);

  // MUST stay after the `load` const — earlier use TDZ-crashes SSR (#5918 guard).
  const {
    selectedIds,
    setSelectedIds,
    batchDeleting,
    autoTesting,
    batchActivating,
    toggleSelectAll: hookToggleSelectAll,
    toggleSelect,
    handleBatchDelete: hookHandleBatchDelete,
    handleBatchActivate: hookHandleBatchActivate,
    handleAutoTestAll: hookHandleAutoTestAll,
  } = useProxyBatchOperations(load);

  const allSelected = items.length > 0 && items.every((item) => selectedIds.has(item.id));

  const handleBatchDelete = useCallback(() => {
    hookHandleBatchDelete(setError);
  }, [hookHandleBatchDelete, setError]);

  const handleBatchActivate = useCallback(() => {
    hookHandleBatchActivate(setError, "active");
  }, [hookHandleBatchActivate, setError]);

  const handleAutoTestAll = useCallback(() => {
    hookHandleAutoTestAll(setError, setTestById);
  }, [hookHandleAutoTestAll, setError, setTestById]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (items.length > 0 && !bulkProxyId) {
      setBulkProxyId(items[0].id);
    }
  }, [items, bulkProxyId]);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (item: ProxyItem) => {
    setForm({
      id: item.id,
      name: item.name || "",
      type: item.type || "http",
      host: item.host || "",
      port: String(item.port || 8080),
      username: "",
      password: "",
      region: item.region || "",
      notes: item.notes || "",
      status: item.status || "active",
      family: item.family || "auto",
    });
    setModalOpen(true);
  };

  const loadUsage = async (proxyId: string) => {
    try {
      const res = await fetch(
        `/api/settings/proxies/assignments?proxyId=${encodeURIComponent(proxyId)}`
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return;
      const rawAssignments: Array<{ scope: string; scopeId: string | null }> = Array.isArray(
        data?.items
      )
        ? data.items
        : [];
      const seen = new Set<string>();
      const assignments = rawAssignments.filter((a) => {
        const key = `${a.scope}:${a.scopeId ?? ""}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      setUsageById((prev) => ({
        ...prev,
        [proxyId]: { count: assignments.length, assignments },
      }));
    } catch {
      // ignore usage loading errors in UI
    }
  };

  const handleTestProxy = async (item: ProxyItem) => {
    if (testingId) return;
    setTestingId(item.id);
    setTestById((prev) => ({ ...prev, [item.id]: null }));
    try {
      const res = await fetch("/api/settings/proxy/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxyId: item.id,
          proxy: {
            type: item.type || "http",
            host: item.host,
            port: String(item.port || 8080),
          },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setTestById((prev) => ({
          ...prev,
          [item.id]: { success: false, error: data?.error?.message || t("failed") },
        }));
        return;
      }
      setTestById((prev) => ({ ...prev, [item.id]: { success: true, ...data } }));
    } catch (e: any) {
      setTestById((prev) => ({ ...prev, [item.id]: { success: false, error: e?.message } }));
    } finally {
      setTestingId(null);
    }
  };

  const repairRelayResponseSchema = z.object({
    repaired: z.boolean().optional(),
    mode: z.enum(["noop", "recovered", "redeploy"]).optional(),
    error: z.object({ message: z.string() }).optional(),
  });

  const handleRepairRelay = async (item: ProxyItem) => {
    if (repairingId || !item.relayInfo?.isRelay) return;
    setRepairingId(item.id);
    setRepairErrorById((prev) => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });
    try {
      const res = await fetch(`/api/settings/proxies/${item.id}/repair-relay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });
      const parsed = repairRelayResponseSchema.safeParse(await res.json());
      const data = parsed.success ? parsed.data : {};
      if (!res.ok) {
        if (res.status === 409 && onRedeployRelay) {
          onRedeployRelay(item);
          return;
        }
        const message =
          res.status === 409
            ? t("relayRepairRedeployRequired")
            : data.error?.message || t("relayRepairFailed");
        setRepairErrorById((prev) => ({ ...prev, [item.id]: message }));
        return;
      }
      if (data.repaired) {
        await load();
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : t("relayRepairFailed");
      setRepairErrorById((prev) => ({ ...prev, [item.id]: message }));
    } finally {
      setRepairingId(null);
    }
  };

  const handleSave = async () => {
    if (!(form.name || "").trim() || !(form.host || "").trim()) {
      setError(t("errorNameHostRequired"));
      return;
    }

    setSaving(true);
    setError(null);

    const normalizedUsername = (form.username || "").trim();

    const normalizedPassword = (form.password || "").trim();

    const payload: Record<string, unknown> = {
      ...(editingId ? { id: editingId } : {}),
      name: (form.name || "").trim(),
      type: form.type,
      host: (form.host || "").trim(),
      port: Number(form.port || 8080),
      region: (form.region || "").trim() || null,
      notes: (form.notes || "").trim() || null,
      status: form.status,
      family: form.family || "auto",
    };
    if (!editingId || normalizedUsername.length > 0) {
      payload.username = normalizedUsername;
    }
    if (!editingId || normalizedPassword.length > 0) {
      payload.password = normalizedPassword;
    }

    try {
      const res = await fetch("/api/settings/proxies", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error?.message || t("errorSaveFailed"));
        return;
      }

      setModalOpen(false);
      setForm(EMPTY_FORM);
      await load();
    } catch (e: any) {
      setError(e?.message || t("errorSaveFailed"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/settings/proxies?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await load();
        return;
      }

      const payload = await res.json().catch(() => ({}));
      const inUse = res.status === 409;
      if (inUse) {
        const ok = window.confirm(t("errorForceDeleteConfirm"));
        if (!ok) return;

        const forceRes = await fetch(`/api/settings/proxies?id=${encodeURIComponent(id)}&force=1`, {
          method: "DELETE",
        });

        if (!forceRes.ok) {
          const forcePayload = await forceRes.json().catch(() => ({}));
          setError(forcePayload?.error?.message || t("errorDeleteFailed"));
          return;
        }

        await load();
        return;
      }

      setError(payload?.error?.message || t("errorDeleteFailed"));
    } catch (e: any) {
      setError(e?.message || t("errorDeleteFailed"));
    }
  };

  const handleMigrate = async () => {
    setMigrating(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxies/migrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force: false }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error?.message || t("errorMigrateFailed"));
        return;
      }
      await load();
    } catch (e: any) {
      setError(e?.message || t("errorMigrateFailed"));
    } finally {
      setMigrating(false);
    }
  };

  const handleBulkAssign = async () => {
    setBulkSaving(true);
    setError(null);
    try {
      const scopeIds =
        bulkScope === "global"
          ? []
          : bulkScopeIds
              .split(/[\n,]/g)
              .map((part) => part.trim())
              .filter(Boolean);

      const res = await fetch("/api/settings/proxies/bulk-assign", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: bulkScope,
          scopeIds,
          proxyId: bulkProxyId || null,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(payload?.error?.message || t("errorBulkFailed"));
        return;
      }

      setBulkOpen(false);
      setBulkScopeIds("");
      await load();
    } catch (e: any) {
      setError(e?.message || t("errorBulkFailed"));
    } finally {
      setBulkSaving(false);
    }
  };

  // ── Proxy pool / rotation (#6365) ──
  const poolQuery = useCallback(() => {
    const params = new URLSearchParams({ scope: poolScope });
    if (poolScope !== "global") params.set("scopeId", poolScopeId.trim());
    return params.toString();
  }, [poolScope, poolScopeId]);

  const loadPool = useCallback(async () => {
    if (poolScope !== "global" && !poolScopeId.trim()) {
      setError(t("poolScopeIdRequired"));
      return;
    }
    setPoolLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/settings/proxies/pool?${poolQuery()}`);
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(payload?.error?.message || t("poolLoadFailed"));
        return;
      }
      const members: Array<{ proxyId: string }> = Array.isArray(payload?.members)
        ? payload.members
        : [];
      setPoolMembers(members.map((m) => m.proxyId));
      setPoolStrategy(isPoolStrategy(payload?.strategy) ? payload.strategy : "round-robin");
      setPoolLoaded(true);
    } catch (e: any) {
      setError(e?.message || t("poolLoadFailed"));
    } finally {
      setPoolLoading(false);
    }
  }, [poolScope, poolScopeId, poolQuery, t]);

  const handlePoolAddMember = async () => {
    if (!poolAddProxyId) return;
    setPoolSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxies/pool", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: poolScope,
          scopeId: poolScope === "global" ? null : poolScopeId.trim(),
          proxyId: poolAddProxyId,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(payload?.error?.message || t("poolAddFailed"));
        return;
      }
      setPoolAddProxyId("");
      await loadPool();
      await load();
    } catch (e: any) {
      setError(e?.message || t("poolAddFailed"));
    } finally {
      setPoolSaving(false);
    }
  };

  const handlePoolRemoveMember = async (proxyId: string) => {
    setPoolSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxies/pool", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: poolScope,
          scopeId: poolScope === "global" ? null : poolScopeId.trim(),
          proxyId,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(payload?.error?.message || t("poolRemoveFailed"));
        return;
      }
      await loadPool();
      await load();
    } catch (e: any) {
      setError(e?.message || t("poolRemoveFailed"));
    } finally {
      setPoolSaving(false);
    }
  };

  const handlePoolStrategyChange = async (strategy: PoolStrategy) => {
    const previous = poolStrategy;
    setPoolStrategy(strategy);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxies/pool", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: poolScope,
          scopeId: poolScope === "global" ? null : poolScopeId.trim(),
          strategy,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPoolStrategy(previous);
        setError(payload?.error?.message || t("poolStrategyFailed"));
      }
    } catch (e: any) {
      setPoolStrategy(previous);
      setError(e?.message || t("poolStrategyFailed"));
    }
  };

  const openPool = () => {
    setPoolMembers([]);
    setPoolLoaded(false);
    setPoolAddProxyId("");
    setPoolStrategy("round-robin");
    setPoolOpen(true);
  };

  const handleBulkImportParse = () => {
    const { entries, errors, skipped } = parseBulkImportText(bulkImportText);
    setBulkImportParsed(entries);
    setBulkImportErrors(errors);
    setBulkImportSkipped(skipped);
    setBulkImportParsedOnce(true);
    setBulkImportResult(null);
  };

  const handleBulkImportExecute = async () => {
    if (bulkImportParsed.length === 0) return;
    if (bulkImportParsed.length > 100) {
      setError(t("bulkImportMaxExceeded"));
      return;
    }

    setBulkImporting(true);
    setError(null);
    setBulkImportResult(null);

    try {
      const payload = {
        items: bulkImportParsed.map((entry) => ({
          name: entry.name,
          type: entry.type,
          host: entry.host,
          port: entry.port,
          username: entry.username || undefined,
          password: entry.password || undefined,
          region: entry.region || null,
          notes: entry.notes || null,
          status: entry.status as "active" | "inactive",
        })),
      };

      const res = await fetch("/api/settings/proxies/bulk-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error?.message || t("errorSaveFailed"));
        return;
      }

      setBulkImportResult({
        created: data.created || 0,
        updated: data.updated || 0,
        failed: data.failed || 0,
      });

      await load();
    } catch (e: any) {
      setError(e?.message || t("errorSaveFailed"));
    } finally {
      setBulkImporting(false);
    }
  };

  const openBulkImport = () => {
    setBulkImportText(BULK_IMPORT_TEMPLATE);
    setBulkImportParsed([]);
    setBulkImportErrors([]);
    setBulkImportSkipped(0);
    setBulkImportParsedOnce(false);
    setBulkImportResult(null);
    setBulkImportOpen(true);
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-semibold">{t("title")}</h3>
            <p className="text-sm text-text-muted">{t("description")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              icon="upgrade"
              onClick={handleMigrate}
              loading={migrating}
              data-testid="proxy-registry-import-legacy"
            >
              {t("importLegacy")}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              icon="upload_file"
              onClick={openBulkImport}
              data-testid="proxy-registry-open-bulk-import"
            >
              {t("bulkImport")}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              icon="account_tree"
              onClick={() => setBulkOpen(true)}
              data-testid="proxy-registry-open-bulk"
            >
              {t("bulkAssign")}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              icon="hub"
              onClick={openPool}
              data-testid="proxy-registry-open-pool"
            >
              {t("managePool")}
            </Button>
            <ProxyBatchActions
              selectedCount={selectedIds.size}
              batchDeleting={batchDeleting}
              autoTesting={autoTesting}
              batchActivating={batchActivating}
              onBatchDelete={handleBatchDelete}
              onBatchActivate={handleBatchActivate}
              onAutoTestAll={handleAutoTestAll}
            />
            <Button
              size="sm"
              icon="add"
              onClick={openCreate}
              data-testid="proxy-registry-open-create"
            >
              {t("addProxy")}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-3 px-3 py-2 rounded border border-red-500/30 bg-red-500/10 text-sm text-red-400">
            {error}
          </div>
        )}
        {relayTested !== null && relayAlive !== null && (
          <div className="mb-3 px-3 py-2 rounded border border-border/60 bg-surface-alt text-xs text-text-muted">
            {t("relayProbeSummary", { tested: relayTested, alive: relayAlive })}
          </div>
        )}

        {loading ? (
          <div className="text-sm text-text-muted">{t("loading")}</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-text-muted">{t("noProxies")}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-text-muted border-b border-border">
                  <th className="py-2 pr-2 w-8">
                    <input
                      type="checkbox"
                      className="accent-blue-500 w-4 h-4 cursor-pointer"
                      checked={allSelected}
                      ref={(el) => {
                        if (el)
                          el.indeterminate =
                            !allSelected && items.some((item) => selectedIds.has(item.id));
                      }}
                      onChange={() => hookToggleSelectAll(allSelected, items)}
                      aria-label={t("selectAllProxies")}
                    />
                  </th>
                  <th className="py-2 pr-3">{t("tableName")}</th>
                  <th className="py-2 pr-3">{t("tableStatus")}</th>
                  <th className="py-2 pr-3">{t("tableHealth")}</th>
                  <th className="py-2 pr-3">{t("tableUsage")}</th>
                  <th className="py-2">{t("tableActions")}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const usage = usageById[item.id];
                  const health = healthById[item.id];
                  return (
                    <tr key={item.id} className="border-b border-border/60">
                      <ProxyCheckboxCell
                        checked={selectedIds.has(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        label={t("selectProxy", { name: item.name })}
                      />
                      <td className="py-2 pr-3">
                        <div className="font-medium text-text-main">{item.name}</div>
                        {item.region && (
                          <div className="text-xs text-text-muted">{item.region}</div>
                        )}
                      </td>
                      <td className="py-2 pr-3 font-mono text-xs text-text-muted">
                        {item.type}://{item.host}:{item.port}
                      </td>
                      <td className="py-2 pr-3">
                        <ProxyStatusBadge status={item.status} />
                      </td>
                      <td className="py-2 pr-3 text-xs text-text-muted">
                        <ProxyHealthCell
                          testResult={testById[item.id] ?? undefined}
                          health={health ?? undefined}
                        />
                      </td>
                      <td className="py-2 pr-3 text-xs text-text-muted">
                        {usageById[item.id] != null
                          ? t("assignmentsCount", { count: usageById[item.id].count })
                          : t("noData")}
                      </td>
                      <td className="py-2">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            icon="speed"
                            onClick={() => void handleTestProxy(item)}
                            loading={testingId === item.id}
                          >
                            {t("test")}
                          </Button>
                          {item.relayInfo?.isRelay &&
                            (item.relayInfo.repairMode === "redeploy" ||
                              item.relayInfo.repairMode === "recovered") && (
                              <Button
                                size="sm"
                                variant="ghost"
                                icon="build"
                                onClick={() => void handleRepairRelay(item)}
                                loading={repairingId === item.id}
                                title={t("relayRepairTooltip")}
                              >
                                {t("repair")}
                              </Button>
                            )}
                          {item.relayInfo?.isRelay && item.relayInfo.authMissing && (
                            <span className="ml-1 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-400">
                              {t("relayAuthMissing")}
                            </span>
                          )}
                          {repairErrorById[item.id] && (
                            <span
                              className="ml-1 text-[10px] text-red-400"
                              title={repairErrorById[item.id]}
                            >
                              {t("relayRepairError")}
                            </span>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            icon="edit"
                            onClick={() => openEdit(item)}
                          >
                            {t("edit")}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            icon="delete"
                            onClick={() => void handleDelete(item.id)}
                            className="!text-red-400"
                          >
                            {t("delete")}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          if (!saving) setModalOpen(false);
        }}
        title={editingId ? t("modalEditTitle") : t("modalCreateTitle")}
        maxWidth="lg"
      >
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          autoComplete="off"
          data-1p-ignore="true"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("labelName")}</label>
              <input
                data-testid="proxy-registry-name-input"
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("labelType")}</label>
              <select
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.type}
                onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
              >
                <option value="http">HTTP</option>
                <option value="https">HTTPS</option>
                <option value="socks5">SOCKS5</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("labelFamily")}</label>
              <select
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.family}
                onChange={(e) => setForm((prev) => ({ ...prev, family: e.target.value }))}
              >
                <option value="auto">{t("familyAuto")}</option>
                <option value="ipv4">{t("familyIpv4")}</option>
                <option value="ipv6">{t("familyIpv6")}</option>
              </select>
              <p className="text-[11px] text-text-muted mt-1">{t("familyHint")}</p>
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("labelHost")}</label>
              <input
                data-testid="proxy-registry-host-input"
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.host}
                onChange={(e) => setForm((prev) => ({ ...prev, host: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("labelPort")}</label>
              <input
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.port}
                onChange={(e) => setForm((prev) => ({ ...prev, port: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("labelUsername")}</label>
              <input
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.username}
                placeholder={editingId ? t("usernamePlaceholderEdit") : ""}
                onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("labelPassword")}</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.password}
                placeholder={editingId ? t("passwordPlaceholderEdit") : ""}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("labelRegion")}</label>
              <input
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.region}
                onChange={(e) => setForm((prev) => ({ ...prev, region: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("labelStatus")}</label>
              <select
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
              >
                <option value="active">{t("statusActive")}</option>
                <option value="inactive">{t("statusInactive")}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-text-muted mb-1 block">{t("labelNotes")}</label>
            <textarea
              className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
              value={form.notes}
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button size="sm" variant="secondary" onClick={() => setModalOpen(false)}>
              {t("cancel")}
            </Button>
            <Button size="sm" icon="save" onClick={handleSave} loading={saving}>
              {t("save")}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={bulkOpen}
        onClose={() => {
          if (!bulkSaving) setBulkOpen(false);
        }}
        title={t("bulkProxyAssignment")}
        maxWidth="lg"
      >
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("labelScope")}</label>
              <select
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={bulkScope}
                onChange={(e) => setBulkScope(e.target.value)}
              >
                <option value="global">{t("scopeGlobal")}</option>
                <option value="provider">{t("scopeProvider")}</option>
                <option value="account">{t("scopeAccount")}</option>
                <option value="combo">{t("scopeCombo")}</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("labelProxy")}</label>
              <select
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={bulkProxyId}
                onChange={(e) => setBulkProxyId(e.target.value)}
              >
                <option value="">{t("clearAssignment")}</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.type}://{item.host}:{item.port})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {bulkScope !== "global" && (
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("bulkLabelScopeIds")}</label>
              <textarea
                data-testid="proxy-registry-bulk-scopeids-input"
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                rows={5}
                value={bulkScopeIds}
                onChange={(e) => setBulkScopeIds(e.target.value)}
                placeholder={t("bulkScopeIdsPlaceholder")}
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button size="sm" variant="secondary" onClick={() => setBulkOpen(false)}>
              {t("cancel")}
            </Button>
            <Button
              size="sm"
              icon="done_all"
              onClick={handleBulkAssign}
              loading={bulkSaving}
              data-testid="proxy-registry-bulk-apply"
            >
              {t("bulkApply")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Proxy Pool / Rotation Modal (#6365) */}
      <Modal
        isOpen={poolOpen}
        onClose={() => {
          if (!poolSaving && !poolLoading) setPoolOpen(false);
        }}
        title={t("poolTitle")}
        maxWidth="lg"
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm text-text-muted">{t("poolDescription")}</p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("labelScope")}</label>
              <select
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={poolScope}
                onChange={(e) => {
                  setPoolScope(e.target.value);
                  setPoolLoaded(false);
                  setPoolMembers([]);
                }}
                data-testid="proxy-registry-pool-scope"
              >
                <option value="global">{t("scopeGlobal")}</option>
                <option value="provider">{t("scopeProvider")}</option>
                <option value="account">{t("scopeAccount")}</option>
                <option value="combo">{t("scopeCombo")}</option>
              </select>
            </div>
            {poolScope !== "global" && (
              <div>
                <label className="text-xs text-text-muted mb-1 block">
                  {t("poolScopeIdLabel")}
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                  value={poolScopeId}
                  onChange={(e) => {
                    setPoolScopeId(e.target.value);
                    setPoolLoaded(false);
                    setPoolMembers([]);
                  }}
                  placeholder={t("poolScopeIdPlaceholder")}
                  data-testid="proxy-registry-pool-scopeid"
                />
              </div>
            )}
          </div>

          <div>
            <Button
              size="sm"
              variant="secondary"
              icon="search"
              onClick={loadPool}
              loading={poolLoading}
              data-testid="proxy-registry-pool-load"
            >
              {t("poolLoad")}
            </Button>
          </div>

          {poolLoaded && (
            <>
              <div>
                <label className="text-xs text-text-muted mb-1 block">
                  {t("poolStrategyLabel")}
                </label>
                <select
                  className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                  value={poolStrategy}
                  onChange={(e) =>
                    handlePoolStrategyChange(e.target.value as "round-robin" | "random" | "sticky")
                  }
                  data-testid="proxy-registry-pool-strategy"
                >
                  {POOL_STRATEGY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {t(opt.labelKey)}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-text-muted mt-1">{t("poolStrategyHint")}</p>
              </div>

              <div>
                <label className="text-xs text-text-muted mb-1 block">
                  {t("poolMembersLabel", { count: poolMembers.length })}
                </label>
                {poolMembers.length === 0 ? (
                  <div className="text-sm text-text-muted px-3 py-2 rounded border border-border bg-bg-subtle">
                    {t("poolNoMembers")}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1" data-testid="proxy-registry-pool-members">
                    {poolMembers.map((proxyId) => {
                      const proxy = items.find((it) => it.id === proxyId);
                      return (
                        <div
                          key={proxyId}
                          className="flex items-center justify-between px-3 py-2 rounded border border-border bg-bg-subtle"
                        >
                          <span className="text-sm">
                            {proxy
                              ? `${proxy.name} (${proxy.type}://${proxy.host}:${proxy.port})`
                              : proxyId}
                          </span>
                          <Button
                            size="sm"
                            variant="secondary"
                            icon="delete"
                            onClick={() => handlePoolRemoveMember(proxyId)}
                            loading={poolSaving}
                          >
                            {t("poolRemove")}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-end gap-2 pt-2 border-t border-border">
                <div className="flex-1">
                  <label className="text-xs text-text-muted mb-1 block">{t("poolAddLabel")}</label>
                  <select
                    className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                    value={poolAddProxyId}
                    onChange={(e) => setPoolAddProxyId(e.target.value)}
                    data-testid="proxy-registry-pool-add-select"
                  >
                    <option value="">{t("poolSelectProxy")}</option>
                    {items
                      .filter((item) => !poolMembers.includes(item.id))
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} ({item.type}://{item.host}:{item.port})
                        </option>
                      ))}
                  </select>
                </div>
                <Button
                  size="sm"
                  icon="add"
                  onClick={handlePoolAddMember}
                  loading={poolSaving}
                  disabled={!poolAddProxyId}
                  data-testid="proxy-registry-pool-add"
                >
                  {t("poolAddMember")}
                </Button>
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button size="sm" variant="secondary" onClick={() => setPoolOpen(false)}>
              {t("close")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Bulk Import Modal */}
      <Modal
        isOpen={bulkImportOpen}
        onClose={() => {
          if (!bulkImporting) setBulkImportOpen(false);
        }}
        title={t("bulkImportTitle")}
        maxWidth="xl"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-text-muted">{t("bulkImportDescription")}</p>

          <div>
            <textarea
              data-testid="proxy-registry-bulk-import-textarea"
              className="w-full px-3 py-2 rounded bg-bg-subtle border border-border font-mono text-xs leading-relaxed"
              rows={14}
              value={bulkImportText}
              onChange={(e) => {
                setBulkImportText(e.target.value);
                setBulkImportParsedOnce(false);
                setBulkImportResult(null);
              }}
              spellCheck={false}
            />
          </div>

          {/* Parse button */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="secondary"
              icon="search"
              onClick={handleBulkImportParse}
              data-testid="proxy-registry-bulk-import-parse"
            >
              {t("bulkImportParse")}
            </Button>

            {bulkImportParsedOnce && (
              <div className="flex items-center gap-3 text-xs">
                <span className="text-emerald-400">
                  {t("bulkImportParsed", { count: bulkImportParsed.length })}
                </span>
                <span className="text-text-muted">
                  {t("bulkImportSkipped", { count: bulkImportSkipped })}
                </span>
                {bulkImportErrors.length > 0 && (
                  <span className="text-red-400">
                    {t("bulkImportParseErrors", { count: bulkImportErrors.length })}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Parse errors */}
          {bulkImportErrors.length > 0 && (
            <div className="max-h-28 overflow-y-auto rounded border border-red-500/30 bg-red-500/10 p-2">
              {bulkImportErrors.map((err, idx) => (
                <div key={idx} className="text-xs text-red-400">
                  {t("bulkImportErrorLine", { line: err.line, reason: t(err.reason as any) })}
                </div>
              ))}
            </div>
          )}

          {/* Preview table */}
          {bulkImportParsedOnce && bulkImportParsed.length > 0 && (
            <div className="overflow-x-auto max-h-48 overflow-y-auto rounded border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-text-muted border-b border-border bg-bg-subtle sticky top-0">
                    <th className="py-1.5 px-2">{t("tableName")}</th>
                    <th className="py-1.5 px-2">{t("labelType")}</th>
                    <th className="py-1.5 px-2">{t("labelHost")}</th>
                    <th className="py-1.5 px-2">{t("labelPort")}</th>
                    <th className="py-1.5 px-2">{t("labelUsername")}</th>
                    <th className="py-1.5 px-2">{t("labelRegion")}</th>
                    <th className="py-1.5 px-2">{t("labelStatus")}</th>
                  </tr>
                </thead>
                <tbody>
                  {bulkImportParsed.map((entry, idx) => (
                    <tr key={idx} className="border-b border-border/40">
                      <td className="py-1 px-2 font-medium text-text-main">{entry.name}</td>
                      <td className="py-1 px-2">
                        <span className="px-1.5 py-0.5 rounded bg-bg-subtle border border-border text-[10px]">
                          {entry.type}
                        </span>
                      </td>
                      <td className="py-1 px-2 font-mono text-text-muted">{entry.host}</td>
                      <td className="py-1 px-2 font-mono text-text-muted">{entry.port}</td>
                      <td className="py-1 px-2 text-text-muted">{entry.username || "—"}</td>
                      <td className="py-1 px-2 text-text-muted">{entry.region || "—"}</td>
                      <td className="py-1 px-2">
                        <span
                          className={
                            entry.status === "active" ? "text-emerald-400" : "text-text-muted"
                          }
                        >
                          {entry.status === "active" ? t("statusActive") : t("statusInactive")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* No valid entries warning */}
          {bulkImportParsedOnce &&
            bulkImportParsed.length === 0 &&
            bulkImportErrors.length === 0 && (
              <div className="text-sm text-amber-400">{t("bulkImportNoValidEntries")}</div>
            )}

          {/* Import result */}
          {bulkImportResult && (
            <div className="px-3 py-2 rounded border border-emerald-500/30 bg-emerald-500/10 text-sm text-emerald-400">
              {t("bulkImportSuccess", {
                created: bulkImportResult.created,
                updated: bulkImportResult.updated,
                failed: bulkImportResult.failed,
              })}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button size="sm" variant="secondary" onClick={() => setBulkImportOpen(false)}>
              {t("cancel")}
            </Button>
            <Button
              size="sm"
              icon="upload"
              onClick={handleBulkImportExecute}
              loading={bulkImporting}
              disabled={!bulkImportParsedOnce || bulkImportParsed.length === 0}
              data-testid="proxy-registry-bulk-import-execute"
            >
              {bulkImporting
                ? t("bulkImportImporting")
                : bulkImportParsed.length > 0
                  ? t("bulkImportImport", { count: bulkImportParsed.length })
                  : t("bulkImport")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
