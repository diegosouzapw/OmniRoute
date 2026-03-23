"use client";

import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Card, Button, Input, Modal, CardSkeleton } from "@/shared/components";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { useTranslations } from "next-intl";

// Constants for validation
const MAX_KEY_NAME_LENGTH = 100;
const MAX_SELECTED_MODELS = 500;

// Debounce hook for search optimization
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Sanitize user input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/"/g, "")
    .replace(/'/g, "")
    .trim()
    .slice(0, MAX_KEY_NAME_LENGTH);
}

// Validate key name
function validateKeyName(
  name: string,
  t: (key: string, values?: Record<string, unknown>) => string
): { valid: boolean; error?: string } {
  if (!name || !name.trim()) {
    return { valid: false, error: t("keyNameRequired") };
  }
  if (name.length > MAX_KEY_NAME_LENGTH) {
    return { valid: false, error: t("keyNameTooLong", { max: MAX_KEY_NAME_LENGTH }) };
  }
  // Only allow alphanumeric, spaces, hyphens, underscores
  if (!/^[a-zA-Z0-9_\-\s]+$/.test(name)) {
    return {
      valid: false,
      error: t("keyNameInvalid"),
    };
  }
  return { valid: true };
}

interface AccessSchedule {
  enabled: boolean;
  from: string;
  until: string;
  days: number[];
  tz: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  allowedModels: string[] | null;
  allowedConnections: string[] | null;
  noLog?: boolean;
  autoResolve?: boolean;
  isActive?: boolean;
  maxSessions?: number;
  accessSchedule?: AccessSchedule | null;
  createdAt: string;
}

interface ProviderConnection {
  id: string;
  name: string;
  provider: string;
  isActive: boolean;
}

interface KeyUsageStats {
  totalRequests: number;
  lastUsed: string | null;
}

interface Model {
  id: string;
  owned_by: string;
}

/** Tuple type for models grouped by provider: [providerName, models[]] */
type ProviderGroup = [provider: string, models: Model[]];

export default function ApiManagerPageClient() {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [allModels, setAllModels] = useState<Model[]>([]);
  const [allConnections, setAllConnections] = useState<ProviderConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [searchModel, setSearchModel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usageStats, setUsageStats] = useState<Record<string, KeyUsageStats>>({});
  const [sessionCounts, setSessionCounts] = useState<Record<string, number>>({});

  const { copied, copy } = useCopyToClipboard();

  useEffect(() => {
    fetchData();
    fetchModels();
    fetchConnections();
  }, []);

  const fetchModels = async () => {
    try {
      const res = await fetch("/v1/models");
      if (res.ok) {
        const data = await res.json();
        setAllModels(data.data || []);
      }
    } catch (error) {
      console.log("Error fetching models:", error);
    }
  };

  const fetchConnections = async () => {
    try {
      const res = await fetch("/api/providers");
      if (res.ok) {
        const data = await res.json();
        setAllConnections(data.connections || []);
      }
    } catch (error) {
      console.log("Error fetching connections:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/keys");
      if (res.ok) {
        const data = await res.json();
        setKeys(data.keys || []);
        // Fetch usage stats after keys are loaded
        fetchUsageStats(data.keys || []);
        fetchSessionCounts(data.keys || []);
      }
    } catch (error) {
      console.log("Error fetching keys:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsageStats = async (apiKeys: ApiKey[]) => {
    if (apiKeys.length === 0) return;
    try {
      const res = await fetch("/api/usage/call-logs?limit=1000");
      if (!res.ok) return;
      const logs = await res.json();
      const stats: Record<string, KeyUsageStats> = {};

      for (const key of apiKeys) {
        const keyLogs = (logs || []).filter(
          (log: any) => log.apiKeyId === key.id || log.apiKeyName === key.name
        );
        stats[key.id] = {
          totalRequests: keyLogs.length,
          lastUsed:
            keyLogs.length > 0
              ? keyLogs.sort(
                  (a: any, b: any) =>
                    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                )[0]?.timestamp
              : null,
        };
      }
      setUsageStats(stats);
    } catch (e) {
      console.log("Error fetching usage stats:", e);
    }
  };

  const fetchSessionCounts = async (apiKeys: ApiKey[]) => {
    if (apiKeys.length === 0) {
      setSessionCounts({});
      return;
    }
    try {
      const res = await fetch("/api/sessions");
      if (!res.ok) return;
      const data = await res.json();
      const byApiKeyRaw =
        data && typeof data.byApiKey === "object" && !Array.isArray(data.byApiKey)
          ? data.byApiKey
          : {};
      const normalized: Record<string, number> = {};
      for (const key of apiKeys) {
        const value = byApiKeyRaw[key.id];
        normalized[key.id] =
          typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
      }
      setSessionCounts(normalized);
    } catch (error) {
      console.log("Error fetching session counts:", error);
    }
  };

  const clearError = useCallback(() => setError(null), []);

  const handleCreateKey = async () => {
    // Validate and sanitize input
    const sanitizedName = sanitizeInput(newKeyName);
    const validation = validateKeyName(sanitizedName, t);

    if (!validation.valid) {
      setError(validation.error || t("invalidKeyName"));
      return;
    }

    setIsSubmitting(true);
    clearError();

    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: sanitizedName }),
      });
      const data = await res.json();

      if (res.ok) {
        setCreatedKey(data.key);
        await fetchData();
        setNewKeyName("");
        setShowAddModal(false);
      } else {
        setError(data.error || t("failedCreateKey"));
      }
    } catch (error) {
      console.error("Error creating key:", error);
      setError(t("failedCreateKeyRetry"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteKey = async (id: string) => {
    // Validate ID format to prevent injection
    if (!id || typeof id !== "string" || !/^[a-zA-Z0-9_-]+$/.test(id)) {
      setError(t("invalidKeyId"));
      return;
    }

    if (!confirm(t("deleteConfirm"))) return;

    setIsSubmitting(true);
    clearError();

    try {
      const res = await fetch(`/api/keys/${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        setKeys((prev) => prev.filter((k) => k.id !== id));
      } else {
        const data = await res.json();
        setError(data.error || t("failedDeleteKey"));
      }
    } catch (error) {
      console.error("Error deleting key:", error);
      setError(t("failedDeleteKeyRetry"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenPermissions = (key: ApiKey) => {
    if (!key || !key.id) return;
    setEditingKey(key);
    setShowPermissionsModal(true);
  };

  const handleUpdatePermissions = async (
    allowedModels: string[],
    noLog: boolean,
    allowedConnections: string[],
    autoResolve: boolean,
    isActive: boolean,
    maxSessions: number,
    accessSchedule: AccessSchedule | null
  ) => {
    if (!editingKey || !editingKey.id) return;

    // Validate models array
    if (!Array.isArray(allowedModels)) {
      setError(t("invalidModelsSelection"));
      return;
    }

    // Limit number of selected models to prevent abuse
    if (allowedModels.length > MAX_SELECTED_MODELS) {
      setError(t("cannotSelectMoreThanModels", { max: MAX_SELECTED_MODELS }));
      return;
    }

    // Validate each model ID
    const validModels = allowedModels.filter(
      (id) => typeof id === "string" && id.length > 0 && id.length < 200
    );

    // Validate connections (must be UUIDs)
    const validConnections = allowedConnections.filter(
      (id) => typeof id === "string" && /^[0-9a-f-]{36}$/i.test(id)
    );
    const normalizedMaxSessions =
      typeof maxSessions === "number" && Number.isFinite(maxSessions)
        ? Math.max(0, Math.floor(maxSessions))
        : 0;

    setIsSubmitting(true);
    clearError();

    try {
      const res = await fetch(`/api/keys/${encodeURIComponent(editingKey.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          allowedModels: validModels,
          allowedConnections: validConnections,
          noLog,
          autoResolve,
          isActive,
          maxSessions: normalizedMaxSessions,
          accessSchedule,
        }),
      });

      if (res.ok) {
        await fetchData();
        setShowPermissionsModal(false);
        setEditingKey(null);
      } else {
        const data = await res.json();
        setError(data.error || t("failedUpdatePermissions"));
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
      setError(t("failedUpdatePermissionsRetry"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debounced search for performance
  const debouncedSearchModel = useDebouncedValue(searchModel, 150);

  // Group models by provider
  const modelsByProvider = useMemo((): ProviderGroup[] => {
    const grouped: Record<string, Model[]> = {};
    for (const model of allModels) {
      const provider = model.owned_by || t("unknownProvider");
      if (!grouped[provider]) grouped[provider] = [];
      grouped[provider].push(model);
    }
    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
  }, [allModels]);

  // Filter models based on debounced search
  const filteredModelsByProvider = useMemo((): ProviderGroup[] => {
    if (!debouncedSearchModel.trim()) return modelsByProvider;

    const search = debouncedSearchModel.toLowerCase();
    return modelsByProvider
      .map(
        ([provider, models]): ProviderGroup => [
          provider,
          models.filter(
            (m) => m.id.toLowerCase().includes(search) || provider.toLowerCase().includes(search)
          ),
        ]
      )
      .filter(([, models]) => models.length > 0);
  }, [modelsByProvider, debouncedSearchModel]);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <span className="material-symbols-outlined text-red-500">error</span>
          <p className="text-sm text-red-700 dark:text-red-300 flex-1">{error}</p>
          <button
            onClick={clearError}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}

      {/* Stats Summary Cards */}
      {keys.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-9 rounded-lg bg-primary/10">
                <span className="material-symbols-outlined text-primary text-lg">vpn_key</span>
              </div>
              <div>
                <p className="text-2xl font-bold">{keys.length}</p>
                <p className="text-xs text-text-muted">{t("totalKeys")}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-9 rounded-lg bg-amber-500/10">
                <span className="material-symbols-outlined text-amber-500 text-lg">lock</span>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {
                    keys.filter((k) => Array.isArray(k.allowedModels) && k.allowedModels.length > 0)
                      .length
                  }
                </p>
                <p className="text-xs text-text-muted">{t("restricted")}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-9 rounded-lg bg-blue-500/10">
                <span className="material-symbols-outlined text-blue-500 text-lg">bar_chart</span>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Object.values(usageStats).reduce((sum, s) => sum + s.totalRequests, 0)}
                </p>
                <p className="text-xs text-text-muted">{t("totalRequests")}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-9 rounded-lg bg-emerald-500/10">
                <span className="material-symbols-outlined text-emerald-500 text-lg">
                  model_training
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold">{allModels.length}</p>
                <p className="text-xs text-text-muted">{t("modelsAvailable")}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Header Card */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">{t("keyManagement")}</h2>
            <p className="text-sm text-text-muted">{t("keyManagementDesc")}</p>
          </div>
          <Button icon="add" onClick={() => setShowAddModal(true)}>
            {t("createKey")}
          </Button>
        </div>
      </Card>

      {/* Keys List Card */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-amber-500/10 shrink-0">
              <span className="material-symbols-outlined text-xl text-amber-500">vpn_key</span>
            </div>
            <div>
              <h3 className="font-semibold">{t("registeredKeys")}</h3>
              <p className="text-xs text-text-muted">
                {keys.length}{" "}
                {keys.length === 1
                  ? t("keyRegistered", { count: keys.length })
                  : t("keysRegistered", { count: keys.length })}
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-text-muted mb-4">{t("keysSecurityNote")}</p>

        {keys.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <span className="material-symbols-outlined text-[32px]">vpn_key</span>
            </div>
            <p className="text-text-main font-medium mb-2">{t("noKeys")}</p>
            <p className="text-sm text-text-muted mb-4">{t("noKeysDesc")}</p>
            <Button icon="add" onClick={() => setShowAddModal(true)}>
              {t("createFirstKey")}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col border border-border rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-surface/50 border-b border-border text-xs font-semibold text-text-muted uppercase tracking-wider">
              <div className="col-span-2">{t("name")}</div>
              <div className="col-span-3">{t("key")}</div>
              <div className="col-span-2">{t("permissions")}</div>
              <div className="col-span-2">{t("usage")}</div>
              <div className="col-span-1">{t("created")}</div>
              <div className="col-span-2 text-right">{t("actions")}</div>
            </div>

            {/* Table Rows */}
            {keys.map((key) => {
              const stats = usageStats[key.id];
              const isRestricted = Array.isArray(key.allowedModels) && key.allowedModels.length > 0;
              const hasConnectionRestrictions =
                Array.isArray(key.allowedConnections) && key.allowedConnections.length > 0;
              const noLogEnabled = key.noLog === true;
              const keyIsActive = key.isActive !== false; // default true
              const maxSessions = typeof key.maxSessions === "number" ? key.maxSessions : 0;
              const hasSessionLimit = maxSessions > 0;
              const activeSessions = sessionCounts[key.id] || 0;
              const hasSchedule = key.accessSchedule?.enabled === true;
              return (
                <div
                  key={key.id}
                  className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-black/[0.03] dark:border-white/[0.03] last:border-b-0 hover:bg-surface/30 transition-colors group"
                >
                  <div className="col-span-2 flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-sm ${isRestricted ? "text-amber-500" : "text-emerald-500"}`}
                    >
                      {isRestricted ? "lock" : "lock_open"}
                    </span>
                    <span className="text-sm font-medium truncate" title={key.name}>
                      {key.name}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center gap-1.5">
                    <code className="text-sm text-text-muted font-mono truncate">{key.key}</code>
                    <span
                      className="p-1 text-text-muted/40 opacity-0 group-hover:opacity-100 transition-all shrink-0 cursor-help"
                      title={t("keyOnlyAvailableAtCreation")}
                    >
                      <span className="material-symbols-outlined text-[14px]">lock</span>
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className="flex flex-col items-start gap-1">
                      {isRestricted ? (
                        <button
                          onClick={() => handleOpenPermissions(key)}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">lock</span>
                          {t("modelsCount", { count: key.allowedModels.length })}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenPermissions(key)}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">lock_open</span>
                          {t("allModels")}
                        </button>
                      )}
                      {hasConnectionRestrictions && (
                        <button
                          onClick={() => handleOpenPermissions(key)}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">cable</span>
                          {key.allowedConnections.length} conn
                        </button>
                      )}
                      {noLogEnabled && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">
                            visibility_off
                          </span>
                          No-Log
                        </span>
                      )}
                      {key.autoResolve && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">
                            auto_fix_high
                          </span>
                          Auto-Resolve
                        </span>
                      )}
                      {hasSessionLimit && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">group</span>
                          Sessions: {activeSessions}/{maxSessions}
                        </span>
                      )}
                      {!keyIsActive && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">block</span>
                          {t("disabled")}
                        </span>
                      )}
                      {hasSchedule && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">schedule</span>
                          {t("scheduleActive")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col justify-center">
                    <span className="text-sm font-medium tabular-nums">
                      {stats?.totalRequests ?? 0}{" "}
                      <span className="text-text-muted font-normal text-xs">{t("reqs")}</span>
                    </span>
                    {stats?.lastUsed ? (
                      <span className="text-[10px] text-text-muted">
                        {t("lastUsedOn", { date: new Date(stats.lastUsed).toLocaleDateString() })}
                      </span>
                    ) : (
                      <span className="text-[10px] text-text-muted italic">{t("neverUsed")}</span>
                    )}
                  </div>
                  <div className="col-span-1 flex items-center text-sm text-text-muted">
                    {new Date(key.createdAt).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleOpenPermissions(key)}
                      className="p-2 hover:bg-primary/10 rounded text-text-muted hover:text-primary opacity-0 group-hover:opacity-100 transition-all"
                      title={t("editPermissions")}
                    >
                      <span className="material-symbols-outlined text-[18px]">tune</span>
                    </button>
                    <button
                      onClick={() => handleDeleteKey(key.id)}
                      className="p-2 hover:bg-red-500/10 rounded text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      title={t("deleteKey")}
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Usage Tips Card */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-blue-500/10 shrink-0">
            <span className="material-symbols-outlined text-xl text-blue-500">lightbulb</span>
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t("usageTips")}</h3>
            <ul className="text-sm text-text-muted space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-xs text-primary mt-1">check</span>
                <span>{t("tipAuth")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-xs text-primary mt-1">check</span>
                <span>{t("tipSecure")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-xs text-primary mt-1">check</span>
                <span>{t("tipSeparate")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-xs text-primary mt-1">check</span>
                <span>{t("tipRestrict")}</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Add Key Modal */}
      <Modal
        isOpen={showAddModal}
        title={t("createKey")}
        onClose={() => {
          setShowAddModal(false);
          setNewKeyName("");
        }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-text-main mb-1.5 block">
              {t("keyName")}
            </label>
            <Input
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder={t("keyNamePlaceholder")}
              autoFocus
            />
            <p className="text-xs text-text-muted mt-1.5">{t("keyNameDesc")}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setShowAddModal(false);
                setNewKeyName("");
              }}
              variant="ghost"
              fullWidth
            >
              {tc("cancel")}
            </Button>
            <Button onClick={handleCreateKey} fullWidth disabled={!newKeyName.trim()}>
              {t("createKey")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Created Key Modal */}
      <Modal isOpen={!!createdKey} title={t("keyCreated")} onClose={() => setCreatedKey(null)}>
        <div className="flex flex-col gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400">
                check_circle
              </span>
              <div>
                <p className="text-sm text-green-800 dark:text-green-200 font-medium mb-1">
                  {t("keyCreatedSuccess")}
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">{t("keyCreatedNote")}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Input value={createdKey || ""} readOnly className="flex-1 font-mono text-sm" />
            <Button
              variant="secondary"
              icon={copied === "created_key" ? "check" : "content_copy"}
              onClick={() => copy(createdKey, "created_key")}
            >
              {copied === "created_key" ? tc("copied") : tc("copy")}
            </Button>
          </div>
          <Button onClick={() => setCreatedKey(null)} fullWidth>
            {t("done")}
          </Button>
        </div>
      </Modal>

      {/* Permissions Modal */}
      {editingKey && (
        <PermissionsModal
          key={editingKey.id}
          isOpen={showPermissionsModal}
          onClose={() => {
            setShowPermissionsModal(false);
            setEditingKey(null);
          }}
          apiKey={editingKey}
          modelsByProvider={filteredModelsByProvider}
          allModels={allModels}
          allConnections={allConnections}
          searchModel={searchModel}
          onSearchChange={setSearchModel}
          onSave={handleUpdatePermissions}
        />
      )}
    </div>
  );
}

// -- Permissions Modal Component (Memoized for Performance) ------------------------------------------

const PermissionsModal = memo(function PermissionsModal({
  isOpen,
  onClose,
  apiKey,
  modelsByProvider,
  allModels,
  allConnections,
  searchModel,
  onSearchChange,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  apiKey: ApiKey;
  modelsByProvider: ProviderGroup[];
  allModels: Model[];
  allConnections: ProviderConnection[];
  searchModel: string;
  onSearchChange: (v: string) => void;
  onSave: (
    models: string[],
    noLog: boolean,
    connections: string[],
    autoResolve: boolean,
    isActive: boolean,
    maxSessions: number,
    accessSchedule: AccessSchedule | null
  ) => void;
}) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  // Initialize state from props - component remounts when key prop changes
  const initialModels = Array.isArray(apiKey?.allowedModels) ? apiKey.allowedModels : [];
  const initialConnections = Array.isArray(apiKey?.allowedConnections)
    ? apiKey.allowedConnections
    : [];
  const [selectedModels, setSelectedModels] = useState<string[]>(initialModels);
  const [allowAll, setAllowAll] = useState(initialModels.length === 0);
  const [noLogEnabled, setNoLogEnabled] = useState(apiKey?.noLog === true);
  const [autoResolveEnabled, setAutoResolveEnabled] = useState(apiKey?.autoResolve === true);
  const [keyIsActive, setKeyIsActive] = useState(apiKey?.isActive !== false);
  const [maxSessions, setMaxSessions] = useState(
    typeof apiKey?.maxSessions === "number" && apiKey.maxSessions > 0 ? apiKey.maxSessions : 0
  );
  const [scheduleEnabled, setScheduleEnabled] = useState(apiKey?.accessSchedule?.enabled === true);
  const [scheduleFrom, setScheduleFrom] = useState(apiKey?.accessSchedule?.from ?? "08:00");
  const [scheduleUntil, setScheduleUntil] = useState(apiKey?.accessSchedule?.until ?? "18:00");
  const [scheduleDays, setScheduleDays] = useState<number[]>(
    apiKey?.accessSchedule?.days ?? [1, 2, 3, 4, 5]
  );
  const [scheduleTz, setScheduleTz] = useState(
    apiKey?.accessSchedule?.tz ?? Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [selectedConnections, setSelectedConnections] = useState<string[]>(initialConnections);
  const [allowAllConnections, setAllowAllConnections] = useState(initialConnections.length === 0);
  const [expandedProviders, setExpandedProviders] = useState<Set<string>>(() => {
    // Expand all providers by default when in restrict mode with existing selections
    if (initialModels.length > 0) {
      return new Set(modelsByProvider.map(([p]) => p));
    }
    return new Set();
  });

  // Memoize callbacks to prevent child re-renders
  const handleToggleModel = useCallback(
    (modelId: string) => {
      if (allowAll) return;

      setSelectedModels((prev) => {
        if (prev.includes(modelId)) {
          return prev.filter((m) => m !== modelId);
        }
        return [...prev, modelId];
      });
    },
    [allowAll]
  );

  const handleToggleProvider = useCallback(
    (provider: string, models: Model[]) => {
      if (allowAll) return;

      const modelIds = models.map((m) => m.id);
      setSelectedModels((prev) => {
        const allSelected = modelIds.every((id) => prev.includes(id));
        if (allSelected) {
          return prev.filter((m) => !modelIds.includes(m));
        }
        return [...new Set([...prev, ...modelIds])];
      });
    },
    [allowAll]
  );

  const handleSelectAll = useCallback(() => {
    setAllowAll(true);
    setSelectedModels([]);
  }, []);

  const handleRestrictMode = useCallback(() => {
    setAllowAll(false);
    // Expand all providers when entering restrict mode
    const allProviders = new Set(modelsByProvider.map(([p]) => p));
    setExpandedProviders(allProviders);
  }, [modelsByProvider]);

  const handleToggleExpand = useCallback((provider: string) => {
    setExpandedProviders((prev) => {
      const next = new Set(prev);
      if (next.has(provider)) {
        next.delete(provider);
      } else {
        next.add(provider);
      }
      return next;
    });
  }, []);

  const handleSelectAllModels = useCallback(() => {
    const allModelIds = allModels.map((m) => m.id);
    setSelectedModels(allModelIds);
  }, [allModels]);

  const handleDeselectAllModels = useCallback(() => {
    setSelectedModels([]);
  }, []);

  const handleToggleConnection = useCallback(
    (connectionId: string) => {
      if (allowAllConnections) return;
      setSelectedConnections((prev) =>
        prev.includes(connectionId)
          ? prev.filter((c) => c !== connectionId)
          : [...prev, connectionId]
      );
    },
    [allowAllConnections]
  );

  const handleSave = useCallback(() => {
    const schedule: AccessSchedule | null = scheduleEnabled
      ? {
          enabled: true,
          from: scheduleFrom,
          until: scheduleUntil,
          days: scheduleDays,
          tz: scheduleTz,
        }
      : null;
    onSave(
      allowAll ? [] : selectedModels,
      noLogEnabled,
      allowAllConnections ? [] : selectedConnections,
      autoResolveEnabled,
      keyIsActive,
      maxSessions,
      schedule
    );
  }, [
    onSave,
    allowAll,
    selectedModels,
    noLogEnabled,
    allowAllConnections,
    selectedConnections,
    autoResolveEnabled,
    keyIsActive,
    maxSessions,
    scheduleEnabled,
    scheduleFrom,
    scheduleUntil,
    scheduleDays,
    scheduleTz,
  ]);

  const selectedCount = selectedModels.length;
  const totalModels = allModels.length;

  return (
    <Modal
      isOpen={onClose ? isOpen : false}
      title={t("permissionsTitle", { name: apiKey?.name || "" })}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        {/* Access Mode Toggle */}
        <div className="flex gap-2 p-1 bg-surface rounded-lg">
          <button
            onClick={handleSelectAll}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              allowAll
                ? "bg-primary text-white"
                : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">lock_open</span>
            {t("allowAll")}
          </button>
          <button
            onClick={handleRestrictMode}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              !allowAll
                ? "bg-primary text-white"
                : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            {t("restrict")}
          </button>
        </div>

        {/* Info Banner */}
        <div
          className={`flex items-start gap-2 p-3 rounded-lg ${
            allowAll
              ? "bg-green-500/10 border border-green-500/30"
              : "bg-amber-500/10 border border-amber-500/30"
          }`}
        >
          <span
            className={`material-symbols-outlined text-[18px] ${
              allowAll ? "text-green-500" : "text-amber-500"
            }`}
          >
            {allowAll ? "info" : "warning"}
          </span>
          <p
            className={`text-xs ${
              allowAll ? "text-green-700 dark:text-green-300" : "text-amber-700 dark:text-amber-300"
            }`}
          >
            {allowAll ? t("allowAllDesc") : t("restrictDesc", { selectedCount, totalModels })}
          </p>
        </div>

        {/* Key Active Toggle */}
        <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">{t("keyActive")}</p>
            <p className="text-xs text-text-muted">{t("keyActiveDesc")}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={keyIsActive}
            onClick={() => setKeyIsActive((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              keyIsActive
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                : "bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/30"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {keyIsActive ? "check_circle" : "block"}
            </span>
            {keyIsActive ? tc("enabled") : tc("disabled")}
          </button>
        </div>

        {/* Max Sessions Limit (T08) */}
        <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">Max Active Sessions</p>
            <p className="text-xs text-text-muted">
              0 = unlimited. Return 429 when this key exceeds concurrent sticky sessions.
            </p>
          </div>
          <div className="w-32">
            <Input
              type="number"
              min={0}
              step={1}
              value={String(maxSessions)}
              onChange={(e) => {
                const parsed = Number.parseInt(e.target.value || "0", 10);
                setMaxSessions(Number.isFinite(parsed) && parsed > 0 ? parsed : 0);
              }}
            />
          </div>
        </div>

        {/* Access Schedule */}
        <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-text-main">{t("accessSchedule")}</p>
              <p className="text-xs text-text-muted">{t("accessScheduleDesc")}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={scheduleEnabled}
              onClick={() => setScheduleEnabled((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors shrink-0 ${
                scheduleEnabled
                  ? "bg-orange-500/15 text-orange-700 dark:text-orange-300 border border-orange-500/30"
                  : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {scheduleEnabled ? tc("enabled") : tc("disabled")}
            </button>
          </div>
          {scheduleEnabled && (
            <div className="flex flex-col gap-3 pt-1">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-text-muted mb-1 block">{t("scheduleFrom")}</label>
                  <input
                    type="time"
                    value={scheduleFrom}
                    onChange={(e) => setScheduleFrom(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-border rounded-md bg-background text-text-main"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1 block">{t("scheduleUntil")}</label>
                  <input
                    type="time"
                    value={scheduleUntil}
                    onChange={(e) => setScheduleUntil(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-border rounded-md bg-background text-text-main"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1.5 block">{t("scheduleDays")}</label>
                <div className="flex gap-1 flex-wrap">
                  {(
                    [
                      [0, t("daySun")],
                      [1, t("dayMon")],
                      [2, t("dayTue")],
                      [3, t("dayWed")],
                      [4, t("dayThu")],
                      [5, t("dayFri")],
                      [6, t("daySat")],
                    ] as [number, string][]
                  ).map(([dayIdx, label]) => {
                    const selected = scheduleDays.includes(dayIdx);
                    return (
                      <button
                        key={dayIdx}
                        type="button"
                        onClick={() =>
                          setScheduleDays((prev) =>
                            prev.includes(dayIdx)
                              ? prev.filter((d) => d !== dayIdx)
                              : [...prev, dayIdx].sort((a, b) => a - b)
                          )
                        }
                        className={`px-2 py-1 text-[11px] font-medium rounded transition-all ${
                          selected
                            ? "bg-primary text-white"
                            : "bg-surface border border-border text-text-muted hover:border-primary/50"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">
                  {t("scheduleTimezone")}
                </label>
                <input
                  type="text"
                  value={scheduleTz}
                  onChange={(e) => setScheduleTz(e.target.value)}
                  placeholder="America/Sao_Paulo"
                  className="w-full px-2 py-1.5 text-sm border border-border rounded-md bg-background text-text-main font-mono"
                />
                <p className="text-[10px] text-text-muted mt-1">{t("scheduleTimezoneHint")}</p>
              </div>
            </div>
          )}
        </div>

        {/* Privacy Toggle */}
        <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">No-Log Payload Privacy</p>
            <p className="text-xs text-text-muted">
              Disable request/response payload persistence for this API key.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={noLogEnabled}
            onClick={() => setNoLogEnabled((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              noLogEnabled
                ? "bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/30"
                : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {noLogEnabled ? "visibility_off" : "visibility"}
            </span>
            {noLogEnabled ? tc("enabled") : tc("disabled")}
          </button>
        </div>

        {/* Auto-Resolve Toggle */}
        <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">{t("autoResolve")}</p>
            <p className="text-xs text-text-muted">{t("autoResolveDesc")}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={autoResolveEnabled}
            onClick={() => setAutoResolveEnabled((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              autoResolveEnabled
                ? "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30"
                : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {autoResolveEnabled ? "auto_fix_high" : "auto_fix_normal"}
            </span>
            {autoResolveEnabled ? tc("enabled") : tc("disabled")}
          </button>
        </div>

        {/* Selected Models Summary (only in restrict mode) */}
        {!allowAll && selectedCount > 0 && (
          <div className="flex flex-col gap-1.5 p-2 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-primary">
                {t("selectedCount", { count: selectedCount })}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={handleSelectAllModels}
                  className="text-[10px] text-primary hover:bg-primary/10 px-1.5 py-0.5 rounded transition-colors"
                >
                  {tc("all")}
                </button>
                <button
                  onClick={handleDeselectAllModels}
                  className="text-[10px] text-red-500 hover:bg-red-500/10 px-1.5 py-0.5 rounded transition-colors"
                >
                  {t("clear")}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto content-start">
              {selectedModels.map((modelId) => (
                <span
                  key={modelId}
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white dark:bg-surface text-text-main text-[10px] rounded border border-border"
                >
                  <span className="font-mono truncate max-w-[120px]" title={modelId}>
                    {modelId}
                  </span>
                  <button
                    onClick={() => handleToggleModel(modelId)}
                    className="text-text-muted hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Search and Model Selection (only in restrict mode) */}
        {!allowAll && (
          <>
            <div className="relative">
              <Input
                value={searchModel}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t("searchModels")}
                icon="search"
              />
              {searchModel && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            <div className="max-h-[280px] overflow-y-auto border border-border rounded-lg divide-y divide-border">
              {modelsByProvider.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-text-muted">
                  <span className="material-symbols-outlined text-2xl mb-1">search_off</span>
                  <p className="text-xs">{t("noModelsFound")}</p>
                </div>
              ) : (
                modelsByProvider.map(([provider, models]) => {
                  const selectedInProvider = selectedModels.filter((m) =>
                    models.some((model) => model.id === m)
                  ).length;
                  const allSelected = models.every((m) => selectedModels.includes(m.id));
                  const someSelected = selectedInProvider > 0 && !allSelected;

                  return (
                    <div key={provider} className="group">
                      <button
                        onClick={() => handleToggleExpand(provider)}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-surface/50 transition-colors text-left"
                      >
                        <span
                          className={`material-symbols-outlined text-base transition-transform duration-200 ${
                            expandedProviders.has(provider) ? "rotate-90" : ""
                          }`}
                        >
                          chevron_right
                        </span>
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div
                            className="relative flex items-center cursor-pointer shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleProvider(provider, models);
                            }}
                          >
                            <div
                              className={`w-4 h-4 rounded border-2 transition-colors flex items-center justify-center ${
                                allSelected
                                  ? "bg-primary border-primary"
                                  : someSelected
                                    ? "bg-primary/20 border-primary"
                                    : "border-border hover:border-primary/50"
                              }`}
                            >
                              {allSelected && (
                                <span className="material-symbols-outlined text-white text-[12px]">
                                  check
                                </span>
                              )}
                              {someSelected && !allSelected && (
                                <span className="material-symbols-outlined text-primary text-[12px]">
                                  remove
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-text-main truncate">
                            {provider}
                          </span>
                          <span className="text-[10px] text-text-muted bg-surface px-1 py-0.5 rounded shrink-0">
                            {models.length}
                          </span>
                        </div>
                        {selectedInProvider > 0 && (
                          <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full shrink-0">
                            {selectedInProvider}
                          </span>
                        )}
                      </button>

                      {/* Expandable model list */}
                      {expandedProviders.has(provider) && (
                        <div className="px-3 pb-2 pl-9">
                          <div className="flex flex-wrap gap-1">
                            {models.map((model) => {
                              const isSelected = selectedModels.includes(model.id);
                              return (
                                <button
                                  key={model.id}
                                  onClick={() => handleToggleModel(model.id)}
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono transition-all ${
                                    isSelected
                                      ? "bg-primary text-white"
                                      : "bg-surface border border-border text-text-muted hover:border-primary/50 hover:text-text-main"
                                  }`}
                                  title={model.id}
                                >
                                  {model.id}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* Allowed Connections Section */}
        {allConnections.length > 0 && (
          <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-text-main">Allowed Connections</p>
              <div className="flex gap-1 p-0.5 bg-surface rounded-md">
                <button
                  onClick={() => {
                    setAllowAllConnections(true);
                    setSelectedConnections([]);
                  }}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    allowAllConnections
                      ? "bg-primary text-white"
                      : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setAllowAllConnections(false)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    !allowAllConnections
                      ? "bg-primary text-white"
                      : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  Restrict
                </button>
              </div>
            </div>
            <p className="text-xs text-text-muted">
              {allowAllConnections
                ? "This key can use any active connection."
                : `Restricted to ${selectedConnections.length} connection${selectedConnections.length !== 1 ? "s" : ""}.`}
            </p>
            {!allowAllConnections && (
              <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                {Object.entries(
                  allConnections.reduce<Record<string, ProviderConnection[]>>((acc, conn) => {
                    const p = conn.provider || "Other";
                    if (!acc[p]) acc[p] = [];
                    acc[p].push(conn);
                    return acc;
                  }, {})
                )
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([provider, conns]) => (
                    <div key={provider}>
                      <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider px-1 py-0.5">
                        {provider}
                      </p>
                      {conns.map((conn) => {
                        const isSelected = selectedConnections.includes(conn.id);
                        return (
                          <button
                            key={conn.id}
                            onClick={() => handleToggleConnection(conn.id)}
                            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-left text-xs transition-all ${
                              isSelected
                                ? "bg-primary/10 text-primary"
                                : "text-text-muted hover:bg-surface/50 hover:text-text-main"
                            }`}
                          >
                            <div
                              className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                                isSelected ? "bg-primary border-primary" : "border-border"
                              }`}
                            >
                              {isSelected && (
                                <span className="material-symbols-outlined text-white text-[10px]">
                                  check
                                </span>
                              )}
                            </div>
                            <span className="truncate flex-1">
                              {conn.name || conn.id.slice(0, 8)}
                            </span>
                            {!conn.isActive && (
                              <span className="text-[9px] text-red-400 shrink-0">inactive</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={handleSave} fullWidth>
            {t("savePermissions")}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            {tc("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
});
