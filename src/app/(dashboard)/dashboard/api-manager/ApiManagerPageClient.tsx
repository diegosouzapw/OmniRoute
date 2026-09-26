"use client";

import { useState, useEffect, useMemo, useCallback, useRef, useId } from "react";
import Link from "next/link";
import { Card, Button, Input, Modal, CardSkeleton } from "@/shared/components";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { useLocale, useTranslations } from "next-intl";
import { matchesSearch } from "@/shared/utils/turkishText";
import ApiKeyFilterBar from "./components/ApiKeyFilterBar";
import {
  isKeyActive,
  isExpired,
  isRestricted as isKeyRestricted,
  computeApiKeyCounts,
  formatProviderModelPermissionSummary,
  formatUsdCost,
  restoreProviderScopeSelection,
  toggleKeyVisibility,
} from "./apiManagerPageUtils";
import type { KeyStatus, KeyType } from "./apiManagerPageUtils";
import { readActiveOnlyPreference, writeActiveOnlyPreference } from "./apiManagerPageStorage";
import { buildApiKeyCreateScopes } from "./apiManagerScopes";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import { hasProviderQuotaBypassScope } from "@/shared/constants/apiKeyPolicyScopes";
import RoutingEntryLink from "@/shared/components/routing/RoutingEntryLink";
import { ALL_COMBOS_ACCESS_RULE } from "@/shared/constants/comboAccess";

// Constants for validation
const MAX_KEY_NAME_LENGTH = 200;

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
  // Allow Unicode letters (accented chars), numbers, spaces, hyphens, underscores
  if (!/^[\p{L}\p{N}_\-\s]+$/u.test(name)) {
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

type StreamDefaultMode = "legacy" | "json";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  allowedModels: string[] | null;
  /** Public shape: "all" | "restricted". Absent on legacy keys. */
  modelAccessMode?: "all" | "restricted" | null;
  blockedModels?: string[] | null;
  allowedCombos: string[] | null;
  allowedConnections: string[] | null;
  noLog?: boolean;
  autoResolve?: boolean;
  isActive?: boolean;
  throttleDelayMs?: number | null;
  isBanned?: boolean;
  expiresAt?: string | null;
  maxSessions?: number;
  accessSchedule?: AccessSchedule | null;
  rateLimits?: Array<{ limit: number; window: number }> | null;
  scopes?: string[];
  allowedEndpoints?: string[];
  streamDefaultMode?: StreamDefaultMode;
  compressionEnabled?: boolean;
  allowAutoCombos?: boolean;
  catalogScope?: string;
  disableNonPublicModels?: boolean;
  allowUsageCommand?: boolean;
  chaosModeEnabled?: boolean;
  usageLimitEnabled?: boolean;
  dailyUsageLimitUsd?: number | null;
  weeklyUsageLimitUsd?: number | null;
  allowedQuotas?: string[] | null;
  createdAt: string;
}

interface KeyUsageStats {
  totalRequests: number;
  totalCost: number;
  lastUsed: string | null;
}

export default function ApiManagerPageClient() {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");
  const locale = useLocale();
  const newKeyNameInputId = useId();
  const createKeyFormRef = useRef<HTMLDivElement | null>(null);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyManageEnabled, setNewKeyManageEnabled] = useState(false);
  const [newKeySelfUsageEnabled, setNewKeySelfUsageEnabled] = useState(true);
  const [newKeyAccountQuotaEnabled, setNewKeyAccountQuotaEnabled] = useState(false);
  const [newKeyAllowUsageCommand, setNewKeyAllowUsageCommand] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usageStats, setUsageStats] = useState<Record<string, KeyUsageStats>>({});
  const [sessionCounts, setSessionCounts] = useState<Record<string, number>>({});
  const [deviceCounts, setDeviceCounts] = useState<Record<string, number>>({});
  const [allowKeyReveal, setAllowKeyReveal] = useState(false);
  // Per-row API key visibility toggle (eye / eye-off). Keys default to masked.
  // Map id -> fully revealed key string fetched on demand from /api/keys/{id}/reveal.
  const [revealedKeys, setRevealedKeys] = useState<Map<string, string>>(new Map());
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const createKeyNameFieldRef = useRef<HTMLDivElement | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState<KeyStatus | null>(null);
  const [typeFilter, setTypeFilter] = useState<KeyType | null>(null);
  const [quotaPoolGroup, setQuotaPoolGroup] = useState<Record<string, string>>({});

  const { copied, copy } = useCopyToClipboard();

  const scrollCreateKeyFormToTop = useCallback(() => {
    const scrollContainer = createKeyFormRef.current?.parentElement;
    if (scrollContainer instanceof HTMLElement) {
      scrollContainer.scrollTop = 0;
    }

    const input = document.getElementById(newKeyNameInputId);
    input?.scrollIntoView({ block: "nearest", inline: "nearest" });
    input?.focus({ preventScroll: true });
  }, [newKeyNameInputId]);

  useEffect(() => {
    if (!showAddModal || !nameError) return;
    requestAnimationFrame(() => {
      createKeyNameFieldRef.current?.scrollIntoView({ block: "center", behavior: "instant" });
    });
  }, [nameError, showAddModal]);

  useEffect(() => {
    // Hydrate the persisted preference after mount, behind an async boundary
    // (react-hooks/set-state-in-effect) — same post-hydration timing as before.
    void (async () => {
      await Promise.resolve();
      setActiveOnly(readActiveOnlyPreference());
    })();
  }, []);

  useEffect(() => {
    writeActiveOnlyPreference(activeOnly);
  }, [activeOnly]);

  useEffect(() => {
    let cancelled = false;
    const loadQuotaGroups = async () => {
      try {
        const [poolsRes, groupsRes] = await Promise.all([
          fetch("/api/quota/pools"),
          fetch("/api/quota/groups"),
        ]);
        if (!poolsRes.ok || !groupsRes.ok) return;
        const poolsData = await poolsRes.json();
        const groupsData = await groupsRes.json();
        const pools: Array<{ id: string; groupId: string }> = Array.isArray(poolsData.pools)
          ? poolsData.pools
          : [];
        const groups: Array<{ id: string; name: string }> = Array.isArray(groupsData.groups)
          ? groupsData.groups
          : [];
        const groupNameById: Record<string, string> = {};
        for (const g of groups) {
          groupNameById[g.id] = g.name;
        }
        const map: Record<string, string> = {};
        for (const p of pools) {
          if (groupNameById[p.groupId]) {
            map[p.id] = groupNameById[p.groupId];
          }
        }
        if (!cancelled) setQuotaPoolGroup(map);
      } catch {
        // fail open — quota group chips simply won't render
      }
    };
    loadQuotaGroups();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!showAddModal || !nameError) return;

    const timeout = window.setTimeout(() => {
      scrollCreateKeyFormToTop();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [showAddModal, nameError, scrollCreateKeyFormToTop]);

  const fetchUsageStats = async (apiKeys: ApiKey[]) => {
    if (apiKeys.length === 0) return;
    try {
      // Fetch analytics (accurate aggregated counts) and recent call-logs
      // (for lastUsed timestamps) in parallel.
      // The previous approach matched call-logs by key.id === log.apiKeyId,
      // but these use different ID schemes and never matched, yielding 0.
      const [analyticsRes, logsRes] = await Promise.all([
        fetch("/api/usage/analytics?range=all"),
        fetch("/api/usage/call-logs?limit=1000"),
      ]);
      const analytics = analyticsRes.ok ? await analyticsRes.json() : null;
      const byApiKey: any[] = analytics?.byApiKey || [];
      const logs = logsRes.ok ? await logsRes.json() : [];
      const stats: Record<string, KeyUsageStats> = {};
      for (const key of apiKeys) {
        // Match analytics entry by unique API Key ID (isolates usage to this specific key instance)
        const matches = byApiKey.filter((entry: any) => entry.apiKeyId === key.id);
        const totalRequests = matches.reduce(
          (sum: number, entry: any) => sum + (Number(entry.requests) || 0),
          0
        );
        const totalCost = matches.reduce((sum: number, entry: any) => {
          const cost = Number(entry.cost);
          return sum + (Number.isFinite(cost) ? cost : 0);
        }, 0);

        // Match call logs by unique ID as well for the lastUsed timestamp
        // Prefer an exact apiKeyId match; fall back to name match for legacy
        // logs that predate per-key IDs (apiKeyId absent).
        const lastUsed =
          (logs || []).find(
            (log: any) => log.apiKeyId === key.id || (!log.apiKeyId && log.apiKeyName === key.name)
          )?.timestamp || null;

        stats[key.id] = {
          totalRequests,
          totalCost,
          lastUsed,
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

  // Per-key device/connection counts (port of upstream 9router#931, thanks
  // @mugnimaestra). One lightweight GET per key against
  // /api/keys/[id]/devices — device counts are in-memory + TTL-evicted, so
  // this is a much smaller payload than session data.
  const fetchDeviceCounts = async (apiKeys: ApiKey[]) => {
    if (apiKeys.length === 0) {
      setDeviceCounts({});
      return;
    }
    try {
      const results = await Promise.all(
        apiKeys.map(async (key) => {
          try {
            const res = await fetch(`/api/keys/${encodeURIComponent(key.id)}/devices`);
            if (!res.ok) return [key.id, 0] as const;
            const data = await res.json();
            const count =
              typeof data?.count === "number" && Number.isFinite(data.count) ? data.count : 0;
            return [key.id, count] as const;
          } catch {
            return [key.id, 0] as const;
          }
        })
      );
      setDeviceCounts(Object.fromEntries(results));
    } catch (error) {
      console.log("Error fetching device counts:", error);
    }
  };

  // fetchData calls the three per-key fetchers above — declared after them so the
  // calls are not TDZ reads (react-hooks/immutability).
  const fetchData = async () => {
    try {
      const res = await fetch("/api/keys");
      if (res.ok) {
        const data = await res.json();
        setKeys(data.keys || []);
        setAllowKeyReveal(data.allowKeyReveal === true);
        // Fetch usage stats after keys are loaded
        fetchUsageStats(data.keys || []);
        fetchSessionCounts(data.keys || []);
        fetchDeviceCounts(data.keys || []);
      }
    } catch (error) {
      console.log("Error fetching keys:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial dashboard load — placed after the fetcher declarations so the effect does
  // not read them in their TDZ (react-hooks/immutability), behind an async boundary
  // (react-hooks/set-state-in-effect).
  useEffect(() => {
    void (async () => {
      await fetchData();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initial dashboard load only
  }, []);

  const clearPageError = useCallback(() => setPageError(null), []);

  const keyCounts = useMemo(() => computeApiKeyCounts(keys), [keys]);

  const filteredKeys = useMemo(() => {
    let list = keys;

    // 1. activeOnly toggle (shortcut for the most common case)
    if (activeOnly) {
      list = list.filter(isKeyActive);
    }

    // 2. status chip filter
    if (statusFilter === "active") list = list.filter(isKeyActive);
    else if (statusFilter === "disabled") list = list.filter((k) => k.isActive === false);
    else if (statusFilter === "banned") list = list.filter((k) => k.isBanned === true);
    else if (statusFilter === "expired") list = list.filter(isExpired);

    // 3. type chip filter
    if (typeFilter === "manage") list = list.filter((k) => k.scopes?.includes("manage"));
    else if (typeFilter === "restricted") list = list.filter(isKeyRestricted);
    else if (typeFilter === "standard")
      list = list.filter((k) => !k.scopes?.includes("manage") && !isKeyRestricted(k));

    // 4. search query (case-insensitive substring on name and key)
    if (searchQuery.trim()) {
      list = list.filter(
        (k) => matchesSearch(k.name, searchQuery) || matchesSearch(k.key, searchQuery)
      );
    }

    return list;
  }, [keys, activeOnly, statusFilter, typeFilter, searchQuery]);

  const isFiltered =
    activeOnly || statusFilter !== null || typeFilter !== null || searchQuery.trim() !== "";

  const isQuotaKey = (k: ApiKey) => Array.isArray(k.allowedQuotas) && k.allowedQuotas.length > 0;

  const quotaKeys = filteredKeys.filter(isQuotaKey);
  const normalKeys = filteredKeys.filter((k) => !isQuotaKey(k));

  const quotaGroupsForKey = (k: ApiKey): string[] => {
    if (!Array.isArray(k.allowedQuotas)) return [];
    const seen = new Set<string>();
    const result: string[] = [];
    for (const poolId of k.allowedQuotas) {
      const groupName = quotaPoolGroup[poolId];
      if (groupName && !seen.has(groupName)) {
        seen.add(groupName);
        result.push(groupName);
      }
    }
    return result;
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveOnly(false);
    setStatusFilter(null);
    setTypeFilter(null);
  };

  const handleCreateKey = async () => {
    // Validate raw input first, then sanitize
    const validation = validateKeyName(newKeyName, t);
    if (!validation.valid) {
      scrollCreateKeyFormToTop();
      setNameError(validation.error || t("invalidKeyName"));
      return;
    }
    const sanitizedName = sanitizeInput(newKeyName);

    setIsSubmitting(true);
    setNameError(null);
    setCreateError(null);

    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizedName,
          scopes: buildApiKeyCreateScopes({
            manageEnabled: newKeyManageEnabled,
            selfUsageEnabled: newKeySelfUsageEnabled,
            selfAccountQuotaEnabled: newKeyAccountQuotaEnabled,
          }),
          allowUsageCommand: newKeyAllowUsageCommand,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setCreatedKey(data.key);
        await fetchData();
        setNewKeyName("");
        setNewKeyManageEnabled(false);
        setNewKeySelfUsageEnabled(true);
        setNewKeyAccountQuotaEnabled(false);
        setNewKeyAllowUsageCommand(false);
        setShowAddModal(false);
      } else {
        setCreateError(extractApiErrorMessage(data, t("failedCreateKey")));
      }
    } catch (error) {
      console.error("Error creating key:", error);
      setCreateError(t("failedCreateKeyRetry"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteKey = async (id: string) => {
    if (!id || typeof id !== "string" || !/^[a-zA-Z0-9_-]+$/.test(id)) {
      setPageError(t("invalidKeyId"));
      return;
    }

    if (!confirm(t("deleteConfirm"))) return;

    setIsSubmitting(true);
    clearPageError();

    try {
      const res = await fetch(`/api/keys/${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        setKeys((prev) => prev.filter((k) => k.id !== id));
        // Clean up any cached reveal/visibility state for this key.
        setRevealedKeys((prev) => {
          if (!prev.has(id)) return prev;
          const next = new Map(prev);
          next.delete(id);
          return next;
        });
        setVisibleKeys((prev) => (prev.has(id) ? toggleKeyVisibility(prev, id) : prev));
      } else {
        const data = await res.json();
        setPageError(extractApiErrorMessage(data, t("failedDeleteKey")));
      }
    } catch (error) {
      console.error("Error deleting key:", error);
      setPageError(t("failedDeleteKeyRetry"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegenerateKey = async (id: string) => {
    if (!id) return;
    if (!confirm(t("regenerateConfirm"))) return;

    setIsSubmitting(true);
    clearPageError();

    try {
      const res = await fetch(`/api/keys/${encodeURIComponent(id)}/regenerate`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setCreatedKey(data.key);
        await fetchData();
      } else {
        setPageError(extractApiErrorMessage(data, t("failedRegenerateKey")));
      }
    } catch (error) {
      console.error("Error regenerating key:", error);
      setPageError(t("failedRegenerateKeyRetry"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyExistingKey = async (keyId: string) => {
    if (!keyId) return;

    try {
      const res = await fetch(`/api/keys/${encodeURIComponent(keyId)}/reveal`);
      if (!res.ok) {
        console.log("Error revealing key:", await res.text());
        return;
      }

      const data = await res.json();
      if (typeof data?.key === "string") {
        // Cache the revealed value so a subsequent show-toggle does not refetch.
        setRevealedKeys((prev) => {
          const next = new Map(prev);
          next.set(keyId, data.key);
          return next;
        });
        await copy(data.key, `existing_key_${keyId}`);
      }
    } catch (error) {
      console.log("Error copying existing key:", error);
    }
  };

  /**
   * Toggle the visibility of one key inline (eye / eye-off button).
   * Lazy-fetches the full key from /api/keys/{id}/reveal on the FIRST show,
   * then caches it in `revealedKeys` so re-toggling is instant. Hiding only
   * flips the visibility set — the cached reveal stays so a re-show is free.
   */
  const handleToggleKeyVisibility = async (keyId: string) => {
    if (!keyId) return;
    const isCurrentlyVisible = visibleKeys.has(keyId);

    if (!isCurrentlyVisible && !revealedKeys.has(keyId)) {
      try {
        const res = await fetch(`/api/keys/${encodeURIComponent(keyId)}/reveal`);
        if (!res.ok) {
          console.log("Error revealing key:", await res.text());
          return;
        }
        const data = await res.json();
        if (typeof data?.key !== "string") return;
        setRevealedKeys((prev) => {
          const next = new Map(prev);
          next.set(keyId, data.key);
          return next;
        });
      } catch (error) {
        console.log("Error revealing key:", error);
        return;
      }
    }

    setVisibleKeys((prev) => toggleKeyVisibility(prev, keyId));
  };

  if (loading) {
    // The skeleton cards are aria-hidden, so without this status wrapper the page
    // has no accessible content at all until /api/keys settles (#12066).
    return (
      <div className="flex flex-col gap-8" role="status" aria-live="polite" aria-busy="true">
        <span className="sr-only">{tc("loading")}</span>
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Error Banner */}
      {pageError && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <span className="material-symbols-outlined text-red-500">error</span>
          <p className="text-sm text-red-700 dark:text-red-300 flex-1">{pageError}</p>
          <button
            onClick={clearPageError}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-3xl font-bold text-text-main">{t("keyManagement")}</h1>
            <p className="mt-1 text-text-muted">{t("keyManagementDesc")}</p>
          </div>
          <div
            className="flex flex-wrap items-center gap-2 text-sm text-text-secondary"
            aria-label={t("requestFlowAria")}
          >
            <span className="rounded-control border border-border bg-surface px-3 py-1.5 font-medium">
              {t("requestFlowYourApp")}
            </span>
            <span
              className="material-symbols-outlined text-base text-text-muted"
              aria-hidden="true"
            >
              arrow_forward
            </span>
            <span className="rounded-control border border-border bg-surface px-3 py-1.5 font-medium">
              {t("requestFlowApiKey")}
            </span>
            <span
              className="material-symbols-outlined text-base text-text-muted"
              aria-hidden="true"
            >
              arrow_forward
            </span>
            <span className="rounded-control border border-border bg-surface px-3 py-1.5 font-medium">
              {t("requestFlowOmniRoute")}
            </span>
          </div>
        </div>
        <Button onClick={() => setShowAddModal(true)} icon="add" className="shrink-0">
          {t("createKey")}
        </Button>
      </div>

      <RoutingEntryLink />

      {/* Filter Bar — shown when there are keys */}
      {keys.length > 0 && (
        <ApiKeyFilterBar
          counts={keyCounts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeOnly={activeOnly}
          onActiveOnlyChange={setActiveOnly}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
        />
      )}

      {/* Keys List Card */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-amber-500/10 shrink-0">
              <span className="material-symbols-outlined text-xl text-amber-500">vpn_key</span>
            </div>
            <div>
              <h3 className="font-semibold">
                {t("registeredKeys")}
                {isFiltered && (
                  <span className="ml-1.5 text-sm font-normal text-text-muted">
                    ({t("shownOf", { shown: filteredKeys.length, total: keys.length })})
                  </span>
                )}
                {!isFiltered && (
                  <span className="ml-1.5 text-sm font-normal text-text-muted">
                    ({keys.length})
                  </span>
                )}
              </h3>
              <p className="text-xs text-text-muted">
                {keys.length === 1
                  ? t("keyRegistered", { count: keys.length })
                  : t("keysRegistered", { count: keys.length })}
              </p>
            </div>
          </div>
          <Button
            icon="add"
            onClick={() => {
              setNameError(null);
              setCreateError(null);
              clearPageError();
              setShowAddModal(true);
            }}
          >
            {t("createKey")}
          </Button>
        </div>

        <p className="text-sm text-text-muted mb-4">{t("keysSecurityNote")}</p>

        {keys.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <span className="material-symbols-outlined text-[32px]">vpn_key</span>
            </div>
            <p className="text-text-main font-medium mb-2">{t("noKeys")}</p>
            <p className="text-sm text-text-muted mb-4">{t("noKeysDesc")}</p>
            <Button
              icon="add"
              onClick={() => {
                setNameError(null);
                setCreateError(null);
                setShowAddModal(true);
              }}
            >
              {t("createFirstKey")}
            </Button>
          </div>
        ) : filteredKeys.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <span className="material-symbols-outlined text-[32px]">search_off</span>
            </div>
            <p className="text-text-main font-medium mb-2">{t("emptyFilterTitle")}</p>
            <Button onClick={handleClearFilters}>{t("emptyFilterClear")}</Button>
          </div>
        ) : (
          (() => {
            const renderKeyRow = (key: ApiKey) => {
              const stats = usageStats[key.id];
              const isRestricted = isKeyRestricted(key);
              const isModelRestricted =
                key.modelAccessMode === "restricted" ||
                (Array.isArray(key.allowedModels) && key.allowedModels.length > 0);
              const { providerWildcards, exactModels } = restoreProviderScopeSelection(
                Array.isArray(key.allowedModels) ? key.allowedModels : []
              );
              const providerCount = providerWildcards.length;
              const modelCount = exactModels.length;
              const hasComboRestrictions =
                Array.isArray(key.allowedCombos) &&
                !key.allowedCombos.includes(ALL_COMBOS_ACCESS_RULE);
              const hasConnectionRestrictions =
                Array.isArray(key.allowedConnections) && key.allowedConnections.length > 0;
              const hasExclusiveLeaseScope =
                Array.isArray(key.scopes) && key.scopes.includes("lease:exclusive");
              const noLogEnabled = key.noLog === true;
              const keyIsActive = key.isActive !== false; // default true
              const throttleDelayMs =
                typeof key.throttleDelayMs === "number" && key.throttleDelayMs > 0
                  ? key.throttleDelayMs
                  : 0;
              const hasThrottle = throttleDelayMs > 0;
              const hasManageScope = Array.isArray(key.scopes) && key.scopes.includes("manage");
              const hasProviderQuotaBypass = hasProviderQuotaBypassScope(key.scopes);
              const hasJsonStreamDefault = key.streamDefaultMode === "json";
              const hasLocalUsageCommand = key.allowUsageCommand === true;
              const maxSessions = typeof key.maxSessions === "number" ? key.maxSessions : 0;
              const hasSessionLimit = maxSessions > 0;
              const activeSessions = sessionCounts[key.id] || 0;
              const deviceCount = deviceCounts[key.id] || 0;
              const hasSchedule = key.accessSchedule?.enabled === true;
              const keyIsQuota = isQuotaKey(key);
              const groups = quotaGroupsForKey(key);
              const visibleGroups = groups.slice(0, 3);
              const extraGroupCount = groups.length - visibleGroups.length;
              return (
                <div
                  key={key.id}
                  className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-black/[0.03] dark:border-white/[0.03] last:border-b-0 hover:bg-surface/30 transition-colors group min-w-[760px]"
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
                    <code className="text-sm text-text-muted font-mono truncate">
                      {visibleKeys.has(key.id) ? (revealedKeys.get(key.id) ?? key.key) : key.key}
                    </code>
                    {allowKeyReveal ? (
                      <>
                        <button
                          onClick={() => handleToggleKeyVisibility(key.id)}
                          className="p-1 text-text-muted/60 hover:text-primary transition-colors shrink-0"
                          title={visibleKeys.has(key.id) ? t("hideKey") : t("showKey")}
                          aria-label={visibleKeys.has(key.id) ? t("hideKey") : t("showKey")}
                          aria-pressed={visibleKeys.has(key.id)}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {visibleKeys.has(key.id) ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                        <button
                          onClick={() => handleCopyExistingKey(key.id)}
                          className="p-1 text-text-muted/60 hover:text-primary transition-colors shrink-0"
                          title={tc("copy")}
                          aria-label={tc("copy")}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {copied === `existing_key_${key.id}` ? "check" : "content_copy"}
                          </span>
                        </button>
                      </>
                    ) : (
                      <span
                        className="p-1 text-text-muted/40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shrink-0 cursor-help"
                        title={t("keyOnlyAvailableAtCreation")}
                      >
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className="flex flex-col items-start gap-1">
                      {/* QUOTA differentiation chips — prepended before existing badges */}
                      {keyIsQuota && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[11px] font-medium">
                          {t("quotaModeOnly")}
                        </span>
                      )}
                      {keyIsQuota &&
                        visibleGroups.map((groupName) => (
                          <span
                            key={groupName}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[11px] font-medium truncate max-w-full"
                          >
                            {groupName}
                          </span>
                        ))}
                      {keyIsQuota && extraGroupCount > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[11px] font-medium">
                          +{extraGroupCount}
                        </span>
                      )}
                      {/* Existing badges */}
                      {isModelRestricted ? (
                        <Link
                          href={`/dashboard/api-manager/${encodeURIComponent(key.id)}/access?tab=models`}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">lock</span>
                          {formatProviderModelPermissionSummary(providerCount, modelCount, t, tc)}
                        </Link>
                      ) : (
                        <Link
                          href={`/dashboard/api-manager/${encodeURIComponent(key.id)}/access?tab=models`}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">lock_open</span>
                          {t("allModels")}
                        </Link>
                      )}
                      {hasConnectionRestrictions && (
                        <Link
                          href={`/dashboard/api-manager/${encodeURIComponent(key.id)}/access?tab=connections`}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">cable</span>
                          {key.allowedConnections!.length} conn
                        </Link>
                      )}
                      {hasExclusiveLeaseScope && (
                        <Link
                          href={`/dashboard/api-manager/${encodeURIComponent(key.id)}/access`}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-medium hover:bg-purple-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            key_vertical
                          </span>
                          {t("exclusiveLease")}
                        </Link>
                      )}
                      {hasComboRestrictions && (
                        <Link
                          href={`/dashboard/api-manager/${encodeURIComponent(key.id)}/access?tab=combos`}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-medium hover:bg-teal-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">hub</span>
                          {key.allowedCombos!.length} combos
                        </Link>
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
                      {hasJsonStreamDefault && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">data_object</span>
                          {t("streamDefaultBadge")}
                        </span>
                      )}
                      {hasLocalUsageCommand && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-500/10 text-slate-600 dark:text-slate-300 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">terminal</span>
                          {t("localUsageCommandBadge")}
                        </span>
                      )}
                      {key.usageLimitEnabled === true && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">paid</span>
                          USD quota
                        </span>
                      )}
                      {hasProviderQuotaBypass && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">alt_route</span>
                          Bypass quota policy
                        </span>
                      )}
                      {hasSessionLimit && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">group</span>
                          Sessions: {activeSessions}/{maxSessions}
                        </span>
                      )}
                      {deviceCount > 0 && (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 text-[11px] font-medium"
                          title={t("devicesTooltip", { count: deviceCount })}
                        >
                          <span className="material-symbols-outlined text-[12px]">devices</span>
                          {t("devicesCount", { count: deviceCount })}
                        </span>
                      )}
                      {hasThrottle && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">speed</span>+
                          {throttleDelayMs}ms
                        </span>
                      )}
                      {hasManageScope && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">
                            admin_panel_settings
                          </span>
                          manage
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
                      {key.isBanned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-600/10 text-red-700 dark:text-red-400 text-[11px] font-bold animate-pulse">
                          <span className="material-symbols-outlined text-[12px]">gavel</span>
                          BANNED
                        </span>
                      )}
                      {key.expiresAt && new Date(key.expiresAt).getTime() < Date.now() && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-500/10 text-gray-600 dark:text-gray-400 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">event_busy</span>
                          EXPIRED
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col justify-center">
                    <span className="text-sm font-medium tabular-nums">
                      {stats?.totalRequests ?? 0}{" "}
                      <span className="text-text-muted font-normal text-xs">{t("reqs")}</span>
                    </span>
                    {(stats?.totalRequests ?? 0) > 0 && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 tabular-nums">
                        {formatUsdCost(stats?.totalCost ?? 0, locale)}
                      </span>
                    )}
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
                    <a
                      href={`/dashboard/costs?range=all&apiKeyIds=${encodeURIComponent(key.id)}&groupBy=model`}
                      className="p-2 hover:bg-emerald-500/10 rounded text-text-muted hover:text-emerald-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                      title={`View costs for ${key.name}`}
                      aria-label={`View costs for ${key.name}`}
                    >
                      <span className="material-symbols-outlined text-[18px]">payments</span>
                    </a>
                    <button
                      onClick={() => handleRegenerateKey(key.id)}
                      className="p-2 hover:bg-amber-500/10 rounded text-text-muted hover:text-amber-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                      title={t("regenerateKey")}
                    >
                      <span className="material-symbols-outlined text-[18px]">refresh</span>
                    </button>
                    <Link
                      href={`/dashboard/api-manager/${encodeURIComponent(key.id)}/access`}
                      className="p-2 hover:bg-primary/10 rounded text-text-muted hover:text-primary opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all inline-flex items-center justify-center"
                      title={t("editPermissions")}
                    >
                      <span className="material-symbols-outlined text-[18px]">tune</span>
                    </Link>
                    <button
                      onClick={() => handleDeleteKey(key.id)}
                      className="p-2 hover:bg-red-500/10 rounded text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                      title={t("deleteKey")}
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              );
            };

            const tableHeader = (
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-surface/50 border-b border-border text-xs font-semibold text-text-muted uppercase tracking-wider min-w-[760px]">
                <div className="col-span-2">{t("name")}</div>
                <div className="col-span-3">{t("key")}</div>
                <div className="col-span-2">{t("permissions")}</div>
                <div className="col-span-2">{t("usage")}</div>
                <div className="col-span-1">{t("created")}</div>
                <div className="col-span-2 text-right">{t("actions")}</div>
              </div>
            );

            return (
              <div className="flex flex-col gap-4">
                {normalKeys.length > 0 && (
                  <div>
                    {/* Normal keys section heading */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-base text-text-muted">
                        vpn_key
                      </span>
                      <span className="text-sm font-medium text-text-main">
                        {t("normalKeysSection")}
                      </span>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-surface/80 border border-border text-[11px] font-semibold text-text-muted">
                        {normalKeys.length}
                      </span>
                    </div>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        {tableHeader}
                        {normalKeys.map(renderKeyRow)}
                      </div>
                    </div>
                  </div>
                )}
                {quotaKeys.length > 0 && (
                  <div>
                    {/* Quota keys section heading */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-base text-violet-500">
                        toll
                      </span>
                      <span className="text-sm font-medium text-text-main">
                        {t("quotaKeysSection")}
                      </span>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-surface/80 border border-border text-[11px] font-semibold text-text-muted">
                        {quotaKeys.length}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[11px] font-semibold">
                        {t("quotaPill")}
                      </span>
                    </div>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        {tableHeader}
                        {quotaKeys.map(renderKeyRow)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()
        )}
      </Card>

      {/* Add Key Modal */}
      <Modal
        isOpen={showAddModal}
        title={t("createKey")}
        bodyClassName="p-6 max-h-[calc(100vh-150px)] overflow-y-auto"
        onClose={() => {
          setShowAddModal(false);
          setNewKeyName("");
          setNewKeyManageEnabled(false);
          setNewKeySelfUsageEnabled(true);
          setNewKeyAccountQuotaEnabled(false);
          setNewKeyAllowUsageCommand(false);
          setNameError(null);
          setCreateError(null);
        }}
      >
        <div ref={createKeyFormRef} className="flex flex-col gap-4">
          <div ref={createKeyNameFieldRef}>
            <label className="text-sm font-medium text-text-main mb-1.5 block">
              {t("keyName")}
            </label>
            <Input
              id={newKeyNameInputId}
              value={newKeyName}
              onChange={(e) => {
                setNewKeyName(e.target.value);
                setNameError(null);
              }}
              placeholder={t("keyNamePlaceholder")}
              maxLength={MAX_KEY_NAME_LENGTH}
              error={nameError}
              autoFocus
            />
            <p className="text-xs text-text-muted mt-1.5">{t("keyNameDesc")}</p>
          </div>
          <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-text-main">{t("managementAccess")}</p>
              <p className="text-xs text-text-muted">{t("managementAccessDesc")}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={newKeyManageEnabled}
              onClick={() => setNewKeyManageEnabled((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors shrink-0 ${
                newKeyManageEnabled
                  ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30"
                  : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
              {newKeyManageEnabled ? tc("enabled") : tc("disabled")}
            </button>
          </div>
          <div className="flex flex-col gap-3 p-3 rounded-lg border border-border bg-surface/40">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-text-main">{t("selfServiceVisibility")}</p>
              <p className="text-xs text-text-muted">{t("selfServiceVisibilityDesc")}</p>
            </div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-text-main">{t("ownUsageVisibility")}</p>
                <p className="text-xs text-text-muted">{t("ownUsageVisibilityDesc")}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={newKeySelfUsageEnabled}
                onClick={() =>
                  setNewKeySelfUsageEnabled((prev) => {
                    if (prev) setNewKeyAccountQuotaEnabled(false);
                    return !prev;
                  })
                }
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors shrink-0 ${
                  newKeySelfUsageEnabled
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                    : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">query_stats</span>
                {newKeySelfUsageEnabled ? tc("enabled") : tc("disabled")}
              </button>
            </div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-text-main">{t("sharedAccountQuotaVisibility")}</p>
                <p className="text-xs text-text-muted">{t("sharedAccountQuotaVisibilityDesc")}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={newKeyAccountQuotaEnabled}
                disabled={!newKeySelfUsageEnabled}
                onClick={() => setNewKeyAccountQuotaEnabled((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors shrink-0 ${
                  newKeyAccountQuotaEnabled
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                    : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
                } ${!newKeySelfUsageEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="material-symbols-outlined text-[14px]">account_balance</span>
                {newKeyAccountQuotaEnabled ? tc("enabled") : tc("disabled")}
              </button>
            </div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-text-main">{t("localUsageCommand")}</p>
                <p className="text-xs text-text-muted">{t("localUsageCommandDesc")}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={newKeyAllowUsageCommand}
                onClick={() => setNewKeyAllowUsageCommand((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors shrink-0 ${
                  newKeyAllowUsageCommand
                    ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30"
                    : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">terminal</span>
                {newKeyAllowUsageCommand ? tc("enabled") : tc("disabled")}
              </button>
            </div>
          </div>
          {createError && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
              <span className="material-symbols-outlined text-red-500 text-sm">error</span>
              <p className="text-sm text-red-700 dark:text-red-300 flex-1">{createError}</p>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setShowAddModal(false);
                setNewKeyName("");
                setNewKeyManageEnabled(false);
                setNewKeySelfUsageEnabled(true);
                setNewKeyAccountQuotaEnabled(false);
                setNewKeyAllowUsageCommand(false);
                setNameError(null);
                setCreateError(null);
              }}
              variant="ghost"
              fullWidth
            >
              {tc("cancel")}
            </Button>
            <Button
              onClick={handleCreateKey}
              fullWidth
              disabled={!newKeyName.trim()}
              loading={isSubmitting}
            >
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
    </div>
  );
}
