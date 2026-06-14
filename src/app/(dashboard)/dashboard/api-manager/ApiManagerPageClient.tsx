"use client";

import { useState, useEffect, useMemo, useCallback, memo, useRef, useId } from "react";
import { Card, Button, Input, Modal, CardSkeleton } from "@/shared/components";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { useLocale, useTranslations } from "next-intl";
import { getProviderDisplayName } from "@/lib/display/names";
import { compareTr, matchesSearch } from "@/shared/utils/turkishText";
import { ENDPOINT_CATEGORIES } from "@/shared/constants/endpointCategories";
import ApiKeyFilterBar from "./components/ApiKeyFilterBar";
import {
  isKeyActive,
  isExpired,
  isRestricted as isKeyRestricted,
  classifyKeyStatus,
  computeApiKeyCounts,
} from "./apiManagerPageUtils";
import type { KeyStatus, KeyType } from "./apiManagerPageUtils";
import { readActiveOnlyPreference, writeActiveOnlyPreference } from "./apiManagerPageStorage";
import { buildApiKeyCreateScopes, mergeApiKeyPermissionScopes } from "./apiManagerScopes";
import { SELF_ACCOUNT_QUOTA_SCOPE, SELF_USAGE_SCOPE } from "@/shared/constants/selfServiceScopes";

// Constants for validation
const MAX_KEY_NAME_LENGTH = 200;
const MAX_SELECTED_MODELS = 500;
const CLAUDE_CODE_DEFAULT_MODEL_ID = "cc/*";
const CLAUDE_CODE_DEFAULT_MODEL_NAME = "Claude Code default";
const CLAUDE_CODE_DEFAULT_FAMILIES = [
  { id: "other", label: "other" },
  { id: "fable", label: "fable" },
  { id: "opus", label: "opus" },
  { id: "sonnet", label: "sonnet" },
  { id: "haiku", label: "haiku" },
] as const;
type ClaudeCodeFamilyId = (typeof CLAUDE_CODE_DEFAULT_FAMILIES)[number]["id"];
type ClaudeCodeBlockableFamilyId = Exclude<ClaudeCodeFamilyId, "other">;
const CLAUDE_CODE_FAMILY_BLOCK_PATTERNS: Record<ClaudeCodeBlockableFamilyId, string[]> = {
  fable: ["claude-fable*", "fable"],
  opus: ["claude-opus*", "opus"],
  sonnet: ["claude-sonnet*", "sonnet"],
  haiku: ["claude-haiku*", "haiku"],
};
const CLAUDE_CODE_BLOCK_PATTERN_SET = new Set(
  Object.values(CLAUDE_CODE_FAMILY_BLOCK_PATTERNS).flat()
);

function toLocalDateTimeInputValue(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

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
  disableNonPublicModels?: boolean;
  allowedQuotas?: string[] | null;
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
  totalCost: number;
  lastUsed: string | null;
}

function formatUsdCost(value: number, locale: string): string {
  const amount = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount > 0 && amount < 1 ? 4 : 2,
    maximumFractionDigits: amount > 0 && amount < 1 ? 4 : 2,
  }).format(amount);
}

interface Model {
  id: string;
  owned_by: string;
  name?: string;
}

interface ComboOption {
  id?: string;
  name: string;
  models?: unknown[];
}

/** Tuple type for models grouped by provider: [providerName, models[]] */
type ProviderGroup = [provider: string, models: Model[]];

function isClaudeCodeModel(model: Model): boolean {
  return (
    model.owned_by === "claude" || model.id.startsWith("cc/") || model.id.startsWith("claude/")
  );
}

function withClaudeCodeDefaultModel(models: Model[]): Model[] {
  if (!models.some(isClaudeCodeModel)) return models;
  if (models.some((model) => model.id === CLAUDE_CODE_DEFAULT_MODEL_ID)) return models;
  return [
    {
      id: CLAUDE_CODE_DEFAULT_MODEL_ID,
      name: CLAUDE_CODE_DEFAULT_MODEL_NAME,
      owned_by: "claude",
    },
    ...models,
  ];
}

function getBlockedClaudeCodeFamilies(blockedModels: string[]): ClaudeCodeBlockableFamilyId[] {
  return (Object.keys(CLAUDE_CODE_FAMILY_BLOCK_PATTERNS) as ClaudeCodeBlockableFamilyId[]).filter(
    (familyId) =>
      CLAUDE_CODE_FAMILY_BLOCK_PATTERNS[familyId].some((pattern) => blockedModels.includes(pattern))
  );
}

function isClaudeCodeFamilyModel(modelId: string, familyId: ClaudeCodeBlockableFamilyId): boolean {
  const normalized = modelId.toLowerCase();
  return (
    normalized === familyId ||
    normalized.includes(`/${familyId}`) ||
    normalized.includes(`-${familyId}`)
  );
}

export default function ApiManagerPageClient() {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");
  const locale = useLocale();
  const newKeyNameInputId = useId();
  const createKeyFormRef = useRef<HTMLDivElement | null>(null);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [allModels, setAllModels] = useState<Model[]>([]);
  const [allCombos, setAllCombos] = useState<ComboOption[]>([]);
  const [allConnections, setAllConnections] = useState<ProviderConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyManageEnabled, setNewKeyManageEnabled] = useState(false);
  const [newKeySelfUsageEnabled, setNewKeySelfUsageEnabled] = useState(true);
  const [newKeyAccountQuotaEnabled, setNewKeyAccountQuotaEnabled] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [searchModel, setSearchModel] = useState("");
  const [pageError, setPageError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usageStats, setUsageStats] = useState<Record<string, KeyUsageStats>>({});
  const [sessionCounts, setSessionCounts] = useState<Record<string, number>>({});
  const [allowKeyReveal, setAllowKeyReveal] = useState(false);
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
    fetchData();
    fetchModels();
    fetchCombos();
    fetchConnections();
  }, []);

  useEffect(() => {
    if (!showAddModal || !nameError) return;
    requestAnimationFrame(() => {
      createKeyNameFieldRef.current?.scrollIntoView({ block: "center", behavior: "instant" });
    });
  }, [nameError, showAddModal]);

  useEffect(() => {
    setActiveOnly(readActiveOnlyPreference());
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

  const fetchCombos = async () => {
    try {
      const res = await fetch("/api/combos");
      if (res.ok) {
        const data = await res.json();
        const combos = Array.isArray(data.combos) ? data.combos : [];
        setAllCombos(
          combos.filter((combo: any) => typeof combo?.name === "string" && combo.name.trim())
        );
      }
    } catch (error) {
      console.log("Error fetching combos:", error);
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
        setAllowKeyReveal(data.allowKeyReveal === true);
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
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (k) => k.name.toLowerCase().includes(q) || k.key.toLowerCase().includes(q)
      );
    }

    return list;
  }, [keys, activeOnly, statusFilter, typeFilter, searchQuery]);

  const isFiltered =
    activeOnly || statusFilter !== null || typeFilter !== null || searchQuery.trim() !== "";

  const isQuotaKey = (k: ApiKey) => Array.isArray(k.allowedQuotas) && k.allowedQuotas.length > 0;

  const quotaKeys = filteredKeys.filter(isQuotaKey);
  const normalKeys = filteredKeys.filter((k) => !isQuotaKey(k));
  const permissionModels = useMemo(() => withClaudeCodeDefaultModel(allModels), [allModels]);

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
        setShowAddModal(false);
      } else {
        setCreateError(data.error || t("failedCreateKey"));
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
      } else {
        const data = await res.json();
        setPageError(data.error || t("failedDeleteKey"));
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
        setPageError(data.error || t("failedRegenerateKey"));
      }
    } catch (error) {
      console.error("Error regenerating key:", error);
      setPageError(t("failedRegenerateKeyRetry"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenPermissions = (key: ApiKey) => {
    if (!key || !key.id) return;
    setEditingKey(key);
    setShowPermissionsModal(true);
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
        await copy(data.key, `existing_key_${keyId}`);
      }
    } catch (error) {
      console.log("Error copying existing key:", error);
    }
  };

  const handleUpdatePermissions = async (
    name: string,
    allowedModels: string[],
    allowedCombos: string[],
    noLog: boolean,
    allowedConnections: string[],
    autoResolve: boolean,
    isActive: boolean,
    throttleDelayMs: number,
    isBanned: boolean,
    expiresAt: string | null,
    maxSessions: number,
    accessSchedule: AccessSchedule | null,
    rateLimits: Array<{ limit: number; window: number }> | null,
    scopes: string[],
    allowedEndpoints: string[],
    streamDefaultMode: StreamDefaultMode,
    disableNonPublicModels: boolean,
    blockedModels: string[]
  ) => {
    if (!editingKey || !editingKey.id) return;

    const sanitizedName = sanitizeInput(name);

    // Validate models array
    if (!Array.isArray(allowedModels)) {
      return;
    }

    // Limit number of selected models to prevent abuse
    if (allowedModels.length > MAX_SELECTED_MODELS) {
      return;
    }

    // Validate each model ID
    const validModels = allowedModels.filter(
      (id) => typeof id === "string" && id.length > 0 && id.length < 200
    );
    const validBlockedModels = blockedModels.filter(
      (id) => typeof id === "string" && id.length > 0 && id.length < 200
    );

    const validCombos = allowedCombos.filter(
      (name) => typeof name === "string" && name.trim().length > 0 && name.length < 200
    );

    // Validate connections (must be UUIDs)
    const validConnections = allowedConnections.filter(
      (id) => typeof id === "string" && /^[0-9a-f-]{36}$/i.test(id)
    );
    const normalizedMaxSessions =
      typeof maxSessions === "number" && Number.isFinite(maxSessions)
        ? Math.max(0, Math.floor(maxSessions))
        : 0;
    const normalizedThrottleDelayMs =
      typeof throttleDelayMs === "number" && Number.isFinite(throttleDelayMs)
        ? Math.max(0, Math.min(300000, Math.floor(throttleDelayMs)))
        : 0;

    setIsSubmitting(true);
    clearPageError();

    try {
      const res = await fetch(`/api/keys/${encodeURIComponent(editingKey.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizedName,
          allowedModels: validModels,
          blockedModels: validBlockedModels,
          allowedCombos: validCombos,
          allowedConnections: validConnections,
          noLog,
          autoResolve,
          isActive,
          throttleDelayMs: normalizedThrottleDelayMs,
          isBanned,
          expiresAt,
          maxSessions: normalizedMaxSessions,
          accessSchedule,
          rateLimits,
          scopes,
          allowedEndpoints,
          streamDefaultMode,
          disableNonPublicModels,
        }),
      });

      if (res.ok) {
        await fetchData();
        setShowPermissionsModal(false);
        setEditingKey(null);
      } else {
        const data = await res.json();
        setPageError(data.error || t("failedUpdatePermissions"));
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
      setPageError(t("failedUpdatePermissionsRetry"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debounced search for performance
  const debouncedSearchModel = useDebouncedValue(searchModel, 150);

  // Group models by provider (issue #2021 — use centralized display helper so
  // custom OpenAI-/Anthropic-compatible providers don't leak raw synthetic
  // ids like "openai-compatible-chat-<uuid>" into the grouping label)
  const modelsByProvider = useMemo((): ProviderGroup[] => {
    const grouped: Record<string, Model[]> = {};
    for (const model of permissionModels) {
      const provider =
        getProviderDisplayName(model.owned_by) || model.owned_by || t("unknownProvider");
      if (!grouped[provider]) grouped[provider] = [];
      grouped[provider].push(model);
    }
    return Object.entries(grouped).sort((a, b) => compareTr(a[0], b[0]));
  }, [permissionModels, t]);

  // Filter models based on debounced search
  const filteredModelsByProvider = useMemo((): ProviderGroup[] => {
    if (!debouncedSearchModel.trim()) return modelsByProvider;

    return modelsByProvider
      .map(
        ([provider, models]): ProviderGroup => [
          provider,
          models.filter(
            (m) =>
              matchesSearch(m.id, debouncedSearchModel) ||
              matchesSearch(m.name || "", debouncedSearchModel) ||
              matchesSearch(provider, debouncedSearchModel)
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
                {keys.length}{" "}
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
              const isRestricted = Array.isArray(key.allowedModels) && key.allowedModels.length > 0;
              const hasComboRestrictions =
                Array.isArray(key.allowedCombos) && key.allowedCombos.length > 0;
              const hasConnectionRestrictions =
                Array.isArray(key.allowedConnections) && key.allowedConnections.length > 0;
              const noLogEnabled = key.noLog === true;
              const keyIsActive = key.isActive !== false; // default true
              const throttleDelayMs =
                typeof key.throttleDelayMs === "number" && key.throttleDelayMs > 0
                  ? key.throttleDelayMs
                  : 0;
              const hasThrottle = throttleDelayMs > 0;
              const hasManageScope = Array.isArray(key.scopes) && key.scopes.includes("manage");
              const hasJsonStreamDefault = key.streamDefaultMode === "json";
              const maxSessions = typeof key.maxSessions === "number" ? key.maxSessions : 0;
              const hasSessionLimit = maxSessions > 0;
              const activeSessions = sessionCounts[key.id] || 0;
              const hasSchedule = key.accessSchedule?.enabled === true;
              const keyIsQuota = isQuotaKey(key);
              const groups = quotaGroupsForKey(key);
              const visibleGroups = groups.slice(0, 3);
              const extraGroupCount = groups.length - visibleGroups.length;
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
                    {allowKeyReveal ? (
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
                    ) : (
                      <span
                        className="p-1 text-text-muted/40 opacity-0 group-hover:opacity-100 transition-all shrink-0 cursor-help"
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
                      {isRestricted ? (
                        <button
                          onClick={() => handleOpenPermissions(key)}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">lock</span>
                          {t("modelsCount", { count: key.allowedModels!.length })}
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
                          {key.allowedConnections!.length} conn
                        </button>
                      )}
                      {hasComboRestrictions && (
                        <button
                          onClick={() => handleOpenPermissions(key)}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-medium hover:bg-teal-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">hub</span>
                          {key.allowedCombos!.length} combos
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
                      {hasJsonStreamDefault && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">data_object</span>
                          {t("streamDefaultBadge")}
                        </span>
                      )}
                      {hasSessionLimit && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[12px]">group</span>
                          Sessions: {activeSessions}/{maxSessions}
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
                      className="p-2 hover:bg-emerald-500/10 rounded text-text-muted hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all"
                      title={`View costs for ${key.name}`}
                      aria-label={`View costs for ${key.name}`}
                    >
                      <span className="material-symbols-outlined text-[18px]">payments</span>
                    </a>
                    <button
                      onClick={() => handleRegenerateKey(key.id)}
                      className="p-2 hover:bg-amber-500/10 rounded text-text-muted hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-all"
                      title={t("regenerateKey")}
                    >
                      <span className="material-symbols-outlined text-[18px]">refresh</span>
                    </button>
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
            };

            const tableHeader = (
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-surface/50 border-b border-border text-xs font-semibold text-text-muted uppercase tracking-wider">
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
                    <div className="flex flex-col border border-border rounded-lg overflow-hidden">
                      {tableHeader}
                      {normalKeys.map(renderKeyRow)}
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
                    <div className="flex flex-col border border-border rounded-lg overflow-hidden">
                      {tableHeader}
                      {quotaKeys.map(renderKeyRow)}
                    </div>
                  </div>
                )}
              </div>
            );
          })()
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
        bodyClassName="p-6 max-h-[calc(100vh-150px)] overflow-y-auto"
        onClose={() => {
          setShowAddModal(false);
          setNewKeyName("");
          setNewKeyManageEnabled(false);
          setNewKeySelfUsageEnabled(true);
          setNewKeyAccountQuotaEnabled(false);
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
          allModels={permissionModels}
          allCombos={allCombos}
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
  allCombos,
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
  allCombos: ComboOption[];
  allConnections: ProviderConnection[];
  searchModel: string;
  onSearchChange: (v: string) => void;
  onSave: (
    name: string,
    models: string[],
    combos: string[],
    noLog: boolean,
    connections: string[],
    autoResolve: boolean,
    isActive: boolean,
    throttleDelayMs: number,
    isBanned: boolean,
    expiresAt: string | null,
    maxSessions: number,
    accessSchedule: AccessSchedule | null,
    rateLimits: Array<{ limit: number; window: number }> | null,
    scopes: string[],
    allowedEndpoints: string[],
    streamDefaultMode: StreamDefaultMode,
    disableNonPublicModels: boolean,
    blockedModels: string[]
  ) => void;
}) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  // Initialize state from props - component remounts when key prop changes
  const initialModels = Array.isArray(apiKey?.allowedModels) ? apiKey.allowedModels : [];
  const initialBlockedModels = useMemo(
    () => (Array.isArray(apiKey?.blockedModels) ? apiKey.blockedModels : []),
    [apiKey?.blockedModels]
  );
  const initialCombos = Array.isArray(apiKey?.allowedCombos) ? apiKey.allowedCombos : [];
  const initialConnections = Array.isArray(apiKey?.allowedConnections)
    ? apiKey.allowedConnections
    : [];
  const [keyName, setKeyName] = useState(apiKey?.name ?? "");
  const [selectedModels, setSelectedModels] = useState<string[]>(initialModels);
  const [blockedClaudeCodeFamilies, setBlockedClaudeCodeFamilies] = useState<
    ClaudeCodeBlockableFamilyId[]
  >(() => getBlockedClaudeCodeFamilies(initialBlockedModels));
  const [claudeCodeFamiliesExpanded, setClaudeCodeFamiliesExpanded] = useState(false);
  const [selectedCombos, setSelectedCombos] = useState<string[]>(initialCombos);
  const [allowAll, setAllowAll] = useState(initialModels.length === 0);
  const [allowAllCombos, setAllowAllCombos] = useState(initialCombos.length === 0);
  const [noLogEnabled, setNoLogEnabled] = useState(apiKey?.noLog === true);
  const [autoResolveEnabled, setAutoResolveEnabled] = useState(apiKey?.autoResolve === true);
  const [keyIsActive, setKeyIsActive] = useState(apiKey?.isActive !== false);
  const [throttleDelayMs, setThrottleDelayMs] = useState(
    typeof apiKey?.throttleDelayMs === "number" && apiKey.throttleDelayMs > 0
      ? apiKey.throttleDelayMs
      : 0
  );
  const [keyIsBanned, setKeyIsBanned] = useState(apiKey?.isBanned === true);
  const [expiresAt, setExpiresAt] = useState(apiKey?.expiresAt ?? "");
  const [manageEnabled, setManageEnabled] = useState(
    Array.isArray(apiKey?.scopes) && apiKey.scopes.includes("manage")
  );
  const [selfUsageEnabled, setSelfUsageEnabled] = useState(
    Array.isArray(apiKey?.scopes) && apiKey.scopes.includes(SELF_USAGE_SCOPE)
  );
  const [selfAccountQuotaEnabled, setSelfAccountQuotaEnabled] = useState(
    Array.isArray(apiKey?.scopes) && apiKey.scopes.includes(SELF_ACCOUNT_QUOTA_SCOPE)
  );
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
  const [rateLimits, setRateLimits] = useState<Array<{ limit: number; window: number }>>(
    Array.isArray(apiKey?.rateLimits) ? apiKey.rateLimits : []
  );
  const [streamDefaultMode, setStreamDefaultMode] = useState<StreamDefaultMode>(
    apiKey?.streamDefaultMode === "json" ? "json" : "legacy"
  );
  const [nameError, setNameError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [selectedConnections, setSelectedConnections] = useState<string[]>(initialConnections);
  const [allowAllConnections, setAllowAllConnections] = useState(initialConnections.length === 0);
  const [expandedProviders, setExpandedProviders] = useState<Set<string>>(() => {
    // Expand all providers by default when in restrict mode with existing selections
    if (initialModels.length > 0) {
      return new Set(modelsByProvider.map(([p]) => p));
    }
    return new Set();
  });

  const initialEndpoints = Array.isArray(apiKey?.allowedEndpoints) ? apiKey.allowedEndpoints : [];
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>(initialEndpoints);
  const [allowAllEndpoints, setAllowAllEndpoints] = useState(initialEndpoints.length === 0);
  const [disableNonPublicModels, setDisableNonPublicModels] = useState(
    apiKey?.disableNonPublicModels === true
  );
  const getModelDisplayName = useCallback(
    (modelId: string) =>
      modelId === CLAUDE_CODE_DEFAULT_MODEL_ID ? CLAUDE_CODE_DEFAULT_MODEL_NAME : modelId,
    []
  );

  // Memoize callbacks to prevent child re-renders
  const handleToggleModel = useCallback(
    (modelId: string) => {
      if (allowAll) return;

      setSelectedModels((prev) => {
        if (prev.includes(modelId)) {
          if (modelId === CLAUDE_CODE_DEFAULT_MODEL_ID) {
            setClaudeCodeFamiliesExpanded(false);
          }
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
    setBlockedClaudeCodeFamilies([]);
    setClaudeCodeFamiliesExpanded(false);
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
    setBlockedClaudeCodeFamilies([]);
    setClaudeCodeFamiliesExpanded(false);
  }, [allModels]);

  const handleDeselectAllModels = useCallback(() => {
    setSelectedModels([]);
    setBlockedClaudeCodeFamilies([]);
    setClaudeCodeFamiliesExpanded(false);
  }, []);

  const handleBlockClaudeCodeFamily = useCallback((familyId: ClaudeCodeBlockableFamilyId) => {
    setBlockedClaudeCodeFamilies((prev) => (prev.includes(familyId) ? prev : [...prev, familyId]));
    setSelectedModels((prev) =>
      prev.filter((modelId) => !isClaudeCodeFamilyModel(modelId, familyId))
    );
  }, []);

  const handleToggleCombo = useCallback(
    (comboName: string) => {
      if (allowAllCombos) return;
      setSelectedCombos((prev) =>
        prev.includes(comboName) ? prev.filter((name) => name !== comboName) : [...prev, comboName]
      );
    },
    [allowAllCombos]
  );

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

  const handleToggleEndpoint = useCallback(
    (categoryId: string) => {
      if (allowAllEndpoints) return;
      setSelectedEndpoints((prev) =>
        prev.includes(categoryId) ? prev.filter((e) => e !== categoryId) : [...prev, categoryId]
      );
    },
    [allowAllEndpoints]
  );

  const handleSave = useCallback(() => {
    // Clear previous inline errors
    setNameError(null);
    setSaveError(null);

    // Validate name inline before calling onSave
    const validation = validateKeyName(keyName, t);
    if (!validation.valid) {
      setNameError(validation.error || t("invalidKeyName"));
      return;
    }

    // Validate models selection
    if (!allowAll && !Array.isArray(selectedModels)) {
      setSaveError(t("invalidModelsSelection"));
      return;
    }

    // Limit number of selected models to prevent abuse
    if (!allowAll && selectedModels.length > MAX_SELECTED_MODELS) {
      setSaveError(t("cannotSelectMoreThanModels", { max: MAX_SELECTED_MODELS }));
      return;
    }

    const schedule: AccessSchedule | null = scheduleEnabled
      ? {
          enabled: true,
          from: scheduleFrom,
          until: scheduleUntil,
          days: scheduleDays,
          tz: scheduleTz,
        }
      : null;
    const hasClaudeCodeDefaultSelected =
      !allowAll && selectedModels.includes(CLAUDE_CODE_DEFAULT_MODEL_ID);
    const blockedModels = initialBlockedModels.filter(
      (pattern) => !CLAUDE_CODE_BLOCK_PATTERN_SET.has(pattern)
    );
    if (hasClaudeCodeDefaultSelected) {
      for (const familyId of blockedClaudeCodeFamilies) {
        blockedModels.push(...CLAUDE_CODE_FAMILY_BLOCK_PATTERNS[familyId]);
      }
    }
    onSave(
      keyName,
      allowAll ? [] : selectedModels,
      allowAllCombos ? [] : selectedCombos,
      noLogEnabled,
      allowAllConnections ? [] : selectedConnections,
      autoResolveEnabled,
      keyIsActive,
      throttleDelayMs,
      keyIsBanned,
      expiresAt || null,
      maxSessions,
      schedule,
      rateLimits.length > 0 ? rateLimits : null,
      mergeApiKeyPermissionScopes(apiKey?.scopes, {
        manageEnabled,
        selfUsageEnabled,
        selfAccountQuotaEnabled,
      }),
      allowAllEndpoints ? [] : selectedEndpoints,
      streamDefaultMode,
      disableNonPublicModels,
      blockedModels
    );
  }, [
    onSave,
    keyName,
    allowAll,
    selectedModels,
    allowAllCombos,
    selectedCombos,
    noLogEnabled,
    allowAllConnections,
    selectedConnections,
    autoResolveEnabled,
    keyIsActive,
    throttleDelayMs,
    keyIsBanned,
    expiresAt,
    maxSessions,
    manageEnabled,
    selfUsageEnabled,
    selfAccountQuotaEnabled,
    scheduleEnabled,
    scheduleFrom,
    scheduleUntil,
    scheduleDays,
    scheduleTz,
    rateLimits,
    allowAllEndpoints,
    selectedEndpoints,
    streamDefaultMode,
    disableNonPublicModels,
    blockedClaudeCodeFamilies,
    initialBlockedModels,
    apiKey?.scopes,
    t,
  ]);

  const selectedCount = selectedModels.length;
  const totalModels = allModels.length;
  const hasClaudeCodeDefaultSelected =
    !allowAll && selectedModels.includes(CLAUDE_CODE_DEFAULT_MODEL_ID);
  const orderedSelectedModels = useMemo(() => {
    if (!hasClaudeCodeDefaultSelected) return selectedModels;
    return [
      CLAUDE_CODE_DEFAULT_MODEL_ID,
      ...selectedModels.filter((modelId) => modelId !== CLAUDE_CODE_DEFAULT_MODEL_ID),
    ];
  }, [hasClaudeCodeDefaultSelected, selectedModels]);
  const visibleClaudeCodeFamilies = useMemo(
    () =>
      CLAUDE_CODE_DEFAULT_FAMILIES.filter(
        (family) =>
          family.id === "other" ||
          !blockedClaudeCodeFamilies.includes(family.id as ClaudeCodeBlockableFamilyId)
      ),
    [blockedClaudeCodeFamilies]
  );

  return (
    <Modal
      isOpen={onClose ? isOpen : false}
      title={t("permissionsTitle", { name: apiKey?.name || "" })}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        {/* Key Name */}
        <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">{t("keyName")}</p>
            <p className="text-xs text-text-muted">{t("keyNameDesc")}</p>
          </div>
          <div className="w-48 shrink-0">
            <Input
              value={keyName}
              onChange={(e) => {
                setKeyName(e.target.value);
                setNameError(null);
              }}
              placeholder={t("keyNamePlaceholder")}
              maxLength={MAX_KEY_NAME_LENGTH}
              error={nameError}
            />
          </div>
        </div>

        {/* Inline save error */}
        {saveError && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
            <span className="material-symbols-outlined text-red-500 text-sm">error</span>
            <p className="text-sm text-red-700 dark:text-red-300 flex-1">{saveError}</p>
          </div>
        )}

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
            <p className="text-sm font-medium text-text-main">{t("maxActiveSessions")}</p>
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

        {/* Soft Throttle */}
        <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">Throttle Delay</p>
            <p className="text-xs text-text-muted">
              Add a fixed delay before requests for this key are routed. 0 = no slowdown.
            </p>
          </div>
          <div className="w-36">
            <Input
              type="number"
              min={0}
              max={300000}
              step={100}
              value={String(throttleDelayMs)}
              onChange={(e) => {
                const parsed = Number.parseInt(e.target.value || "0", 10);
                setThrottleDelayMs(
                  Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 300000) : 0
                );
              }}
            />
            <p className="text-[10px] text-text-muted mt-1">milliseconds</p>
          </div>
        </div>

        {/* Custom Rate Limits */}
        <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-text-main">
                {t("apiManagerCustomRateLimits")}
              </p>
              <p className="text-xs text-text-muted">{t("apiManagerCustomRateLimitsDesc")}</p>
            </div>
            <button
              type="button"
              onClick={() => setRateLimits((prev) => [...prev, { limit: 100, window: 60 }])}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[14px]">add</span>
              Add Limit
            </button>
          </div>
          {rateLimits.length > 0 && (
            <div className="flex flex-col gap-2 pt-2">
              {rateLimits.map((rl, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    type="number"
                    min={1}
                    value={String(rl.limit)}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setRateLimits((prev) => {
                        const next = [...prev];
                        next[index].limit = val;
                        return next;
                      });
                    }}
                    placeholder={t("apiManagerRateLimitRequestsPlaceholder")}
                  />
                  <span className="text-sm text-text-muted shrink-0">
                    {t("apiManagerRateLimitReqPer")}
                  </span>
                  <Input
                    type="number"
                    min={1}
                    value={String(rl.window)}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setRateLimits((prev) => {
                        const next = [...prev];
                        next[index].window = val;
                        return next;
                      });
                    }}
                    placeholder={t("apiManagerRateLimitSecondsPlaceholder")}
                  />
                  <span className="text-sm text-text-muted shrink-0">sec</span>
                  <button
                    type="button"
                    onClick={() => setRateLimits((prev) => prev.filter((_, i) => i !== index))}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors shrink-0"
                    title={t("apiManagerRemoveLimitTitle")}
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
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
                  placeholder={t("apiManagerTimezonePlaceholder")}
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
            <p className="text-sm font-medium text-text-main">{t("noLogPayloadPrivacy")}</p>
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

        {/* Stream Default Compatibility */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-sm font-medium text-text-main">{t("streamDefaultMode")}</p>
            <p className="text-xs text-text-muted">{t("streamDefaultModeDesc")}</p>
          </div>
          <div className="flex gap-1 p-0.5 bg-surface rounded-md shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setStreamDefaultMode("legacy")}
              className={`inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-semibold transition-all ${
                streamDefaultMode === "legacy"
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">settings_backup_restore</span>
              {t("streamDefaultLegacy")}
            </button>
            <button
              type="button"
              onClick={() => setStreamDefaultMode("json")}
              className={`inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-semibold transition-all ${
                streamDefaultMode === "json"
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">data_object</span>
              {t("streamDefaultJson")}
            </button>
          </div>
        </div>

        {/* Ban Toggle (SECURITY) */}
        <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-red-500/20 bg-red-500/5">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-red-700 dark:text-red-400">{t("bannedStatus")}</p>
            <p className="text-xs text-red-600 dark:text-red-300">
              Immediately revoke all access. Used for suspected abuse or compromised keys.
            </p>
          </div>
          <button
            role="switch"
            aria-checked={keyIsBanned}
            onClick={() => setKeyIsBanned((prev) => !prev)}
            className={`inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition-colors ${
              keyIsBanned
                ? "bg-red-500 text-white shadow-sm"
                : "bg-black/5 dark:bg-white/5 text-text-muted hover:bg-black/10 dark:hover:bg-white/10"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {keyIsBanned ? "block" : "check_circle"}
            </span>
            {keyIsBanned ? "Banned" : "Active"}
          </button>
        </div>
        {/* Expiration Date */}
        <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">{t("expirationDate")}</p>
            <p className="text-xs text-text-muted">
              Key will automatically stop working after this date.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={toLocalDateTimeInputValue(expiresAt)}
              onChange={(e) => {
                const val = e.target.value;
                if (!val) {
                  setExpiresAt("");
                  return;
                }
                const date = new Date(val);
                if (!Number.isNaN(date.getTime())) {
                  setExpiresAt(date.toISOString());
                }
              }}
              className="min-w-0 flex-1 px-2 py-1.5 text-sm border border-border rounded-md bg-background text-text-main"
            />
            <button
              type="button"
              onClick={() => setExpiresAt("")}
              disabled={!expiresAt}
              className="shrink-0 px-3 py-1.5 text-sm font-medium border border-border rounded-md text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              {tc("clear")}
            </button>
          </div>
        </div>
        {/* Management Access */}
        <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">{t("managementAccess")}</p>
            <p className="text-xs text-text-muted">{t("managementAccessDesc")}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={manageEnabled}
            onClick={() => setManageEnabled((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              manageEnabled
                ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30"
                : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
            {manageEnabled ? tc("enabled") : tc("disabled")}
          </button>
        </div>
        {/* Self-service Visibility */}
        <div className="flex flex-col gap-3 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">{t("selfServiceVisibility")}</p>
            <p className="text-xs text-text-muted">{t("selfServiceVisibilityDesc")}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={selfUsageEnabled}
            onClick={() =>
              setSelfUsageEnabled((prev) => {
                if (prev) setSelfAccountQuotaEnabled(false);
                return !prev;
              })
            }
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              selfUsageEnabled
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">query_stats</span>
            {t("ownUsageVisibility")} - {selfUsageEnabled ? tc("enabled") : tc("disabled")}
          </button>
          <p className="text-xs text-text-muted">{t("ownUsageVisibilityDesc")}</p>
          <button
            type="button"
            role="switch"
            aria-checked={selfAccountQuotaEnabled}
            disabled={!selfUsageEnabled}
            onClick={() => setSelfAccountQuotaEnabled((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              selfAccountQuotaEnabled
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
            } ${!selfUsageEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span className="material-symbols-outlined text-[14px]">account_balance</span>
            {t("sharedAccountQuotaVisibility")} -{" "}
            {selfAccountQuotaEnabled ? tc("enabled") : tc("disabled")}
          </button>
          <p className="text-xs text-text-muted">{t("sharedAccountQuotaVisibilityDesc")}</p>
        </div>

        {/* Disable Non-Public Models Toggle */}
        <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">{t("disableNonPublicModels")}</p>
            <p className="text-xs text-text-muted">{t("disableNonPublicModelsDesc")}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={disableNonPublicModels}
            onClick={() => setDisableNonPublicModels((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              disableNonPublicModels
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {disableNonPublicModels ? "shield_lock" : "shield"}
            </span>
            {disableNonPublicModels ? tc("yes") : tc("no")}
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
            <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto content-start">
              {orderedSelectedModels.map((modelId) => {
                if (modelId === CLAUDE_CODE_DEFAULT_MODEL_ID) {
                  return (
                    <div key={modelId} className="flex flex-col gap-1 basis-full">
                      <span className="inline-flex w-fit items-center gap-0.5 px-1.5 py-0.5 bg-primary/10 text-text-main text-[10px] rounded border border-primary/35">
                        <button
                          type="button"
                          onClick={() => setClaudeCodeFamiliesExpanded((prev) => !prev)}
                          className="inline-flex items-center gap-1 font-mono text-text-main"
                          title="Expand Claude Code families"
                          aria-expanded={claudeCodeFamiliesExpanded}
                        >
                          <span className="truncate max-w-[140px]" title={modelId}>
                            {getModelDisplayName(modelId)}
                          </span>
                          <span className="material-symbols-outlined text-[12px] text-primary">
                            {claudeCodeFamiliesExpanded ? "expand_less" : "expand_more"}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleModel(modelId)}
                          className="text-text-muted hover:text-red-500 transition-colors"
                          title="Remove Claude Code default"
                        >
                          <span className="material-symbols-outlined text-[12px]">close</span>
                        </button>
                      </span>

                      {claudeCodeFamiliesExpanded && (
                        <div className="relative ml-2 flex flex-wrap gap-1 pl-5 animate-in fade-in slide-in-from-top-1 duration-150">
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-1.5 top-0 bottom-1 w-px bg-primary/25"
                          />
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-1.5 top-3 h-px w-3 bg-primary/25"
                          />
                          {visibleClaudeCodeFamilies.map((family) => {
                            const canBlock = family.id !== "other";
                            return (
                              <span
                                key={family.id}
                                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] rounded border ${
                                  canBlock
                                    ? "bg-white dark:bg-surface text-text-main border-border"
                                    : "bg-black/5 dark:bg-white/5 text-text-muted border-border"
                                }`}
                                title={
                                  canBlock
                                    ? `Allow ${family.label} family through Claude Code default`
                                    : "Catch-all for other Claude Code models"
                                }
                              >
                                <span className="font-mono">{family.label}</span>
                                {canBlock && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleBlockClaudeCodeFamily(
                                        family.id as ClaudeCodeBlockableFamilyId
                                      )
                                    }
                                    className="text-text-muted hover:text-red-500 transition-colors"
                                    title={`Block ${family.label} family`}
                                  >
                                    <span className="material-symbols-outlined text-[12px]">
                                      close
                                    </span>
                                  </button>
                                )}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <span
                    key={modelId}
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white dark:bg-surface text-text-main text-[10px] rounded border border-border"
                  >
                    <span className="font-mono truncate max-w-[120px]" title={modelId}>
                      {getModelDisplayName(modelId)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleModel(modelId)}
                      className="text-text-muted hover:text-red-500 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[12px]">close</span>
                    </button>
                  </span>
                );
              })}
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
                                  {getModelDisplayName(model.id)}
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
              <p className="text-sm font-medium text-text-main">{t("allowedConnections")}</p>
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
                  .sort(([a], [b]) => compareTr(a, b))
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

        {/* Allowed Combos Section */}
        {allCombos.length > 0 && (
          <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-text-main">Allowed Combos</p>
              <div className="flex gap-1 p-0.5 bg-surface rounded-md">
                <button
                  onClick={() => {
                    setAllowAllCombos(true);
                    setSelectedCombos([]);
                  }}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    allowAllCombos
                      ? "bg-primary text-white"
                      : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setAllowAllCombos(false)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    !allowAllCombos
                      ? "bg-primary text-white"
                      : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  Restrict
                </button>
              </div>
            </div>
            <p className="text-xs text-text-muted">
              {allowAllCombos
                ? "This key can use any combo."
                : `Restricted to ${selectedCombos.length} combo${selectedCombos.length !== 1 ? "s" : ""}.`}
            </p>
            {!allowAllCombos && (
              <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                {allCombos
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((combo) => {
                    const isSelected = selectedCombos.includes(combo.name);
                    return (
                      <button
                        key={combo.id || combo.name}
                        onClick={() => handleToggleCombo(combo.name)}
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
                        <span className="truncate flex-1">{combo.name}</span>
                        {Array.isArray(combo.models) && (
                          <span className="text-[10px] text-text-muted shrink-0">
                            {combo.models.length} models
                          </span>
                        )}
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* Allowed Endpoints Section */}
        <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-text-main">{t("endpointRestrictions")}</p>
              <p className="text-xs text-text-muted">
                {allowAllEndpoints
                  ? t("allEndpointsAllowed")
                  : t("endpointsRestricted", {
                      count: selectedEndpoints.length,
                    })}
              </p>
            </div>
            <div className="flex gap-1 p-0.5 bg-surface rounded-md">
              <button
                onClick={() => {
                  setAllowAllEndpoints(true);
                  setSelectedEndpoints([]);
                }}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  allowAllEndpoints
                    ? "bg-primary text-white"
                    : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {t("all")}
              </button>
              <button
                onClick={() => setAllowAllEndpoints(false)}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  !allowAllEndpoints
                    ? "bg-primary text-white"
                    : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {t("restrict")}
              </button>
            </div>
          </div>
          {!allowAllEndpoints && (
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
              {ENDPOINT_CATEGORIES.map((cat) => {
                const isSelected = selectedEndpoints.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleToggleEndpoint(cat.id)}
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
                    <span className="truncate flex-1">{cat.label}</span>
                    <span className="text-[10px] text-text-muted shrink-0 truncate max-w-[140px]">
                      {cat.description}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

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
