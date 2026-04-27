"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Modal } from "@/shared/components";

type ProxyItem = {
  id: string;
  name: string;
  type: string;
  host: string;
  port: number;
  username?: string | null;
  password?: string | null;
  region?: string | null;
  notes?: string | null;
  status?: string;
};

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
};

export default function ProxyRegistryManager() {
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
  const [migrating, setMigrating] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkSaving, setBulkSaving] = useState(false);
  const [bulkScope, setBulkScope] = useState("provider");
  const [bulkScopeIds, setBulkScopeIds] = useState("");
  const [bulkProxyId, setBulkProxyId] = useState("");

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
      const loaded: ProxyItem[] = Array.isArray(data?.items) ? data.items : [];
      setItems(loaded);
      const ids = loaded.map((p) => p.id).filter(Boolean);
      void loadHealth();
      void loadAllUsage(ids);
    } catch (e: any) {
      setError(e?.message || t("errorLoadFailed"));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [loadHealth, loadAllUsage]);

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
              icon="account_tree"
              onClick={() => setBulkOpen(true)}
              data-testid="proxy-registry-open-bulk"
            >
              {t("bulkAssign")}
            </Button>
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

        {loading ? (
          <div className="text-sm text-text-muted">{t("loading")}</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-text-muted">{t("noProxies")}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-text-muted border-b border-border">
                  <th className="py-2 pr-3">{t("tableName")}</th>
                  <th className="py-2 pr-3">{t("tableEndpoint")}</th>
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
                        <span className="text-xs px-2 py-1 rounded border border-border bg-bg-subtle">
                          {item.status || "active"}
                        </span>
                      </td>
                      <td className="py-2 pr-3 text-xs text-text-muted">
                        <div className="flex flex-col gap-0.5">
                          {testById[item.id] ? (
                            testById[item.id]!.success ? (
                              <>
                                <span className="text-emerald-400">
                                  ✓ {testById[item.id]!.publicIp}
                                </span>
                                {testById[item.id]!.latencyMs && (
                                  <span>{testById[item.id]!.latencyMs}ms</span>
                                )}
                              </>
                            ) : (
                              <span className="text-red-400">
                                ✗ {testById[item.id]!.error || "failed"}
                              </span>
                            )
                          ) : health ? (
                            <>
                              <span>{t("successRate", { rate: health.successRate ?? 0 })}</span>
                              <span>
                                {t("avgLatency", { latency: health.avgLatencyMs ?? "-" })}
                              </span>
                            </>
                          ) : (
                            <span>—</span>
                          )}
                        </div>
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
              <label className="text-xs text-text-muted mb-1 block">Type</label>
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
              <label className="text-xs text-text-muted mb-1 block">Host</label>
              <input
                data-testid="proxy-registry-host-input"
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.host}
                onChange={(e) => setForm((prev) => ({ ...prev, host: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">Port</label>
              <input
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.port}
                onChange={(e) => setForm((prev) => ({ ...prev, port: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">Username</label>
              <input
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.username}
                placeholder={editingId ? "Leave blank to keep current username" : ""}
                onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.password}
                placeholder={editingId ? "Leave blank to keep current password" : ""}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">Region</label>
              <input
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.region}
                onChange={(e) => setForm((prev) => ({ ...prev, region: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">Status</label>
              <select
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-text-muted mb-1 block">Notes</label>
            <textarea
              className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
              value={form.notes}
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button size="sm" variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" icon="save" onClick={handleSave} loading={saving}>
              Save
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={bulkOpen}
        onClose={() => {
          if (!bulkSaving) setBulkOpen(false);
        }}
        title="Bulk Proxy Assignment"
        maxWidth="lg"
      >
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-text-muted mb-1 block">Scope</label>
              <select
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={bulkScope}
                onChange={(e) => setBulkScope(e.target.value)}
              >
                <option value="global">global</option>
                <option value="provider">provider</option>
                <option value="account">account</option>
                <option value="combo">combo</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">Proxy</label>
              <select
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                value={bulkProxyId}
                onChange={(e) => setBulkProxyId(e.target.value)}
              >
                <option value="">(clear assignment)</option>
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
              <label className="text-xs text-text-muted mb-1 block">
                Scope IDs (comma or newline)
              </label>
              <textarea
                data-testid="proxy-registry-bulk-scopeids-input"
                className="w-full px-3 py-2 rounded bg-bg-subtle border border-border"
                rows={5}
                value={bulkScopeIds}
                onChange={(e) => setBulkScopeIds(e.target.value)}
                placeholder="provider-openai,provider-anthropic"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button size="sm" variant="secondary" onClick={() => setBulkOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              icon="done_all"
              onClick={handleBulkAssign}
              loading={bulkSaving}
              data-testid="proxy-registry-bulk-apply"
            >
              Apply
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
