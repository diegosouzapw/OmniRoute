import { useState, useCallback, useMemo } from "react";
import { ALL_COMBOS_ACCESS_RULE } from "@/shared/constants/comboAccess";
import { SELF_ACCOUNT_QUOTA_SCOPE, SELF_USAGE_SCOPE } from "@/shared/constants/selfServiceScopes";
import { hasProviderQuotaBypassScope } from "@/shared/constants/apiKeyPolicyScopes";
import { mergeApiKeyPermissionScopes } from "@/app/(dashboard)/dashboard/api-manager/apiManagerScopes";
import { buildModelAccessSavePayload } from "@/app/(dashboard)/dashboard/api-manager/apiManagerPageUtils";
import type { CatalogScope } from "@/app/(dashboard)/dashboard/api-manager/components/ApiKeyCatalogScopeSelect";

export const MAX_KEY_NAME_LENGTH = 200;
export const MAX_SELECTED_MODELS = 500;
export const CLAUDE_CODE_DEFAULT_MODEL_ID = "cc/*";
export const CLAUDE_CODE_DEFAULT_MODEL_NAME = "Claude Code default";

export const CLAUDE_CODE_DEFAULT_FAMILIES = [
  { id: "other", label: "other" },
  { id: "fable", label: "fable" },
  { id: "opus", label: "opus" },
  { id: "sonnet", label: "sonnet" },
  { id: "haiku", label: "haiku" },
] as const;

export type ClaudeCodeFamilyId = (typeof CLAUDE_CODE_DEFAULT_FAMILIES)[number]["id"];
export type ClaudeCodeBlockableFamilyId = Exclude<ClaudeCodeFamilyId, "other">;

export const CLAUDE_CODE_FAMILY_BLOCK_PATTERNS: Record<ClaudeCodeBlockableFamilyId, string[]> = {
  fable: ["claude-fable*", "fable"],
  opus: ["claude-opus*", "opus"],
  sonnet: ["claude-sonnet*", "sonnet"],
  haiku: ["claude-haiku*", "haiku"],
};

export const CLAUDE_CODE_BLOCK_PATTERN_SET = new Set(
  Object.values(CLAUDE_CODE_FAMILY_BLOCK_PATTERNS).flat()
);

export function getBlockedClaudeCodeFamilies(
  blockedModels: string[]
): ClaudeCodeBlockableFamilyId[] {
  return (Object.keys(CLAUDE_CODE_FAMILY_BLOCK_PATTERNS) as ClaudeCodeBlockableFamilyId[]).filter(
    (familyId) =>
      CLAUDE_CODE_FAMILY_BLOCK_PATTERNS[familyId].some((pattern) => blockedModels.includes(pattern))
  );
}

export function isClaudeCodeFamilyModel(
  modelId: string,
  familyId: ClaudeCodeBlockableFamilyId
): boolean {
  const normalized = modelId.toLowerCase();
  return (
    normalized === familyId ||
    normalized.includes(`/${familyId}`) ||
    normalized.includes(`-${familyId}`)
  );
}

export function isClaudeCodeModel(model: { id: string; owned_by?: string }): boolean {
  return (
    model.id === CLAUDE_CODE_DEFAULT_MODEL_ID ||
    model.owned_by === "claude" ||
    model.id.startsWith("cc/") ||
    model.id.startsWith("claude/")
  );
}

export function withClaudeCodeDefaultModel<
  T extends { id: string; name?: string; owned_by?: string },
>(models: T[]): T[] {
  if (!models.some(isClaudeCodeModel)) return models;
  if (models.some((model) => model.id === CLAUDE_CODE_DEFAULT_MODEL_ID)) return models;
  return [
    {
      id: CLAUDE_CODE_DEFAULT_MODEL_ID,
      name: CLAUDE_CODE_DEFAULT_MODEL_NAME,
      owned_by: "claude",
    } as T,
    ...models,
  ];
}

export interface AccessSchedule {
  enabled: boolean;
  from: string;
  until: string;
  days: number[];
  tz: string;
}

export type StreamDefaultMode = "legacy" | "json";

export interface RateLimitEntry {
  limit: number;
  window: number;
}

export interface ApiKeyAccessData {
  id: string;
  name: string;
  key?: string | null;
  allowedModels?: string[] | null;
  modelAccessMode?: "all" | "restricted" | null;
  blockedModels?: string[] | null;
  allowedCombos?: string[] | null;
  allowedConnections?: string[] | null;
  connectionAccessMode?: "all" | "restricted" | null;
  noLog?: boolean | null;
  autoResolve?: boolean | null;
  isActive?: boolean | null;
  throttleDelayMs?: number | null;
  isBanned?: boolean | null;
  expiresAt?: string | null;
  maxSessions?: number | null;
  accessSchedule?: AccessSchedule | null;
  rateLimits?: RateLimitEntry[] | null;
  scopes?: string[] | null;
  allowedEndpoints?: string[] | null;
  streamDefaultMode?: StreamDefaultMode | null;
  compressionEnabled?: boolean | null;
  allowAutoCombos?: boolean | null;
  catalogScope?: CatalogScope | null;
  disableNonPublicModels?: boolean | null;
  allowUsageCommand?: boolean | null;
  usageLimitEnabled?: boolean | null;
  dailyUsageLimitUsd?: number | null;
  weeklyUsageLimitUsd?: number | null;
  chaosModeEnabled?: boolean | null;
  createdAt?: string;
  lastUsedAt?: string | null;
  totalRequests?: number;
}

export type AccessEditorTab =
  "general" | "models" | "combos" | "connections" | "limits" | "behaviour";

export interface ApiKeyAccessFormState {
  name: string;
  allowAll: boolean;
  selectedModels: string[];
  blockedClaudeCodeFamilies: ClaudeCodeBlockableFamilyId[];
  allowAllCombos: boolean;
  selectedCombos: string[];
  allowAllConnections: boolean;
  selectedConnections: string[];
  allowAllEndpoints: boolean;
  selectedEndpoints: string[];
  noLog: boolean;
  autoResolve: boolean;
  isActive: boolean;
  throttleDelayMs: number;
  isBanned: boolean;
  expiresAt: string;
  maxSessions: number;
  scheduleEnabled: boolean;
  scheduleFrom: string;
  scheduleUntil: string;
  scheduleDays: number[];
  scheduleTz: string;
  rateLimits: RateLimitEntry[];
  manageEnabled: boolean;
  selfUsageEnabled: boolean;
  selfAccountQuotaEnabled: boolean;
  bypassProviderQuotaPolicyEnabled: boolean;
  streamDefaultMode: StreamDefaultMode;
  compressionEnabled: boolean;
  allowAutoCombos: boolean;
  catalogScope: CatalogScope;
  disableNonPublicModels: boolean;
  allowUsageCommand: boolean;
  usageLimitEnabled: boolean;
  dailyUsageLimitUsd: string;
  weeklyUsageLimitUsd: string;
  chaosModeEnabled: boolean;
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/"/g, "")
    .replace(/'/g, "")
    .trim()
    .slice(0, MAX_KEY_NAME_LENGTH);
}

export function validateKeyName(
  name: string,
  t?: (key: string, values?: Record<string, unknown>) => string
): { valid: boolean; error?: string } {
  const tr = t ?? ((k: string) => k);
  if (!name || !name.trim()) {
    return { valid: false, error: tr("keyNameRequired") };
  }
  if (name.length > MAX_KEY_NAME_LENGTH) {
    return { valid: false, error: tr("keyNameTooLong", { max: MAX_KEY_NAME_LENGTH }) };
  }
  if (!/^[\p{L}\p{N}_\-\s]+$/u.test(name)) {
    return { valid: false, error: tr("keyNameInvalid") };
  }
  return { valid: true };
}

export function parseUsdLimitInput(value: string | number | null | undefined): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0 ? value : null;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  return null;
}

export function createInitialFormState(
  apiKey: ApiKeyAccessData | null | undefined
): ApiKeyAccessFormState {
  const initialModels = Array.isArray(apiKey?.allowedModels) ? apiKey.allowedModels : [];
  const initialBlockedModels = Array.isArray(apiKey?.blockedModels) ? apiKey.blockedModels : [];
  const initialCombos = Array.isArray(apiKey?.allowedCombos)
    ? apiKey.allowedCombos.filter((combo) => combo !== ALL_COMBOS_ACCESS_RULE)
    : [];
  const initialConnections = Array.isArray(apiKey?.allowedConnections)
    ? apiKey.allowedConnections
    : [];
  const initialEndpoints = Array.isArray(apiKey?.allowedEndpoints) ? apiKey.allowedEndpoints : [];

  const allowAllModels =
    apiKey?.modelAccessMode === "restricted" ? false : initialModels.length === 0;

  const allowAllConnections =
    apiKey?.connectionAccessMode === "restricted" ? false : initialConnections.length === 0;

  return {
    name: apiKey?.name || "",
    allowAll: allowAllModels,
    selectedModels: [...initialModels],
    blockedClaudeCodeFamilies: getBlockedClaudeCodeFamilies(initialBlockedModels),
    allowAllCombos: apiKey?.allowedCombos?.includes(ALL_COMBOS_ACCESS_RULE) === true,
    selectedCombos: [...initialCombos],
    allowAllConnections,
    selectedConnections: [...initialConnections],
    allowAllEndpoints: initialEndpoints.length === 0,
    selectedEndpoints: [...initialEndpoints],
    noLog: apiKey?.noLog === true,
    autoResolve: apiKey?.autoResolve === true,
    isActive: apiKey?.isActive !== false,
    throttleDelayMs:
      typeof apiKey?.throttleDelayMs === "number" && apiKey.throttleDelayMs > 0
        ? apiKey.throttleDelayMs
        : 0,
    isBanned: apiKey?.isBanned === true,
    expiresAt: apiKey?.expiresAt ?? "",
    maxSessions:
      typeof apiKey?.maxSessions === "number" && apiKey.maxSessions > 0 ? apiKey.maxSessions : 0,
    scheduleEnabled: apiKey?.accessSchedule?.enabled === true,
    scheduleFrom: apiKey?.accessSchedule?.from ?? "08:00",
    scheduleUntil: apiKey?.accessSchedule?.until ?? "18:00",
    scheduleDays: apiKey?.accessSchedule?.days ?? [1, 2, 3, 4, 5],
    scheduleTz:
      apiKey?.accessSchedule?.tz ??
      (typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC"),
    rateLimits: Array.isArray(apiKey?.rateLimits) ? [...apiKey.rateLimits] : [],
    manageEnabled: Array.isArray(apiKey?.scopes) && apiKey.scopes.includes("manage"),
    selfUsageEnabled: Array.isArray(apiKey?.scopes) && apiKey.scopes.includes(SELF_USAGE_SCOPE),
    selfAccountQuotaEnabled:
      Array.isArray(apiKey?.scopes) && apiKey.scopes.includes(SELF_ACCOUNT_QUOTA_SCOPE),
    bypassProviderQuotaPolicyEnabled: hasProviderQuotaBypassScope(apiKey?.scopes),
    streamDefaultMode: apiKey?.streamDefaultMode === "json" ? "json" : "legacy",
    compressionEnabled: apiKey?.compressionEnabled !== false,
    allowAutoCombos: apiKey?.allowAutoCombos !== false,
    catalogScope: apiKey?.catalogScope ?? "all",
    disableNonPublicModels: apiKey?.disableNonPublicModels === true,
    allowUsageCommand: apiKey?.allowUsageCommand === true,
    usageLimitEnabled: apiKey?.usageLimitEnabled === true,
    dailyUsageLimitUsd:
      typeof apiKey?.dailyUsageLimitUsd === "number" && apiKey.dailyUsageLimitUsd > 0
        ? String(apiKey.dailyUsageLimitUsd)
        : "",
    weeklyUsageLimitUsd:
      typeof apiKey?.weeklyUsageLimitUsd === "number" && apiKey.weeklyUsageLimitUsd > 0
        ? String(apiKey.weeklyUsageLimitUsd)
        : "",
    chaosModeEnabled: apiKey?.chaosModeEnabled === true,
  };
}

export function buildApiKeyAccessPayload(
  formState: ApiKeyAccessFormState,
  originalKey: ApiKeyAccessData
): Record<string, unknown> {
  const sanitizedName = sanitizeInput(formState.name);

  // Model access mode & allowed models
  const modelAccess = buildModelAccessSavePayload({
    allowAll: formState.allowAll,
    selectedModels: formState.selectedModels,
  });

  const validModels = modelAccess.allowedModels.filter(
    (id) => typeof id === "string" && id.length > 0 && id.length < 200
  );

  // Blocked models logic: keep non-Claude patterns from originalKey, and add selected blocked Claude families
  const initialBlockedModels = Array.isArray(originalKey.blockedModels)
    ? originalKey.blockedModels
    : [];
  const hasClaudeCodeDefaultSelected =
    !formState.allowAll && formState.selectedModels.includes(CLAUDE_CODE_DEFAULT_MODEL_ID);
  const blockedModels = initialBlockedModels.filter(
    (pattern) => !CLAUDE_CODE_BLOCK_PATTERN_SET.has(pattern)
  );
  if (hasClaudeCodeDefaultSelected) {
    for (const familyId of formState.blockedClaudeCodeFamilies) {
      if (CLAUDE_CODE_FAMILY_BLOCK_PATTERNS[familyId]) {
        blockedModels.push(...CLAUDE_CODE_FAMILY_BLOCK_PATTERNS[familyId]);
      }
    }
  }
  const validBlockedModels = blockedModels.filter(
    (id) => typeof id === "string" && id.length > 0 && id.length < 200
  );

  // Combos
  const allowedCombos = formState.allowAllCombos
    ? [ALL_COMBOS_ACCESS_RULE]
    : formState.selectedCombos;
  const validCombos = allowedCombos.filter(
    (name) => typeof name === "string" && name.trim().length > 0 && name.length < 200
  );

  // Connections
  const allowedConnections = formState.allowAllConnections ? [] : formState.selectedConnections;
  const validConnections = allowedConnections.filter(
    (id) => typeof id === "string" && /^[0-9a-f-]{36}$/i.test(id)
  );

  // Sessions and throttle
  const normalizedMaxSessions =
    typeof formState.maxSessions === "number" && Number.isFinite(formState.maxSessions)
      ? Math.max(0, Math.floor(formState.maxSessions))
      : 0;
  const normalizedThrottleDelayMs =
    typeof formState.throttleDelayMs === "number" && Number.isFinite(formState.throttleDelayMs)
      ? Math.max(0, Math.min(300000, Math.floor(formState.throttleDelayMs)))
      : 0;

  // Schedule
  const schedule: AccessSchedule | null = formState.scheduleEnabled
    ? {
        enabled: true,
        from: formState.scheduleFrom,
        until: formState.scheduleUntil,
        days: formState.scheduleDays,
        tz: formState.scheduleTz,
      }
    : null;

  // Scopes
  const scopes = mergeApiKeyPermissionScopes(originalKey.scopes, {
    manageEnabled: formState.manageEnabled,
    selfUsageEnabled: formState.selfUsageEnabled,
    selfAccountQuotaEnabled: formState.selfAccountQuotaEnabled,
    bypassProviderQuotaPolicyEnabled: formState.bypassProviderQuotaPolicyEnabled,
  });

  // Endpoints
  const allowedEndpoints = formState.allowAllEndpoints ? [] : formState.selectedEndpoints;

  return {
    name: sanitizedName,
    modelAccessMode: modelAccess.modelAccessMode,
    connectionAccessMode: formState.allowAllConnections ? "all" : "restricted",
    allowedModels: validModels,
    blockedModels: validBlockedModels,
    allowedCombos: validCombos,
    allowedConnections: validConnections,
    noLog: formState.noLog,
    autoResolve: formState.autoResolve,
    isActive: formState.isActive,
    throttleDelayMs: normalizedThrottleDelayMs,
    isBanned: formState.isBanned,
    expiresAt: formState.expiresAt || null,
    maxSessions: normalizedMaxSessions,
    accessSchedule: schedule,
    rateLimits: formState.rateLimits.length > 0 ? formState.rateLimits : null,
    scopes,
    allowedEndpoints,
    streamDefaultMode: formState.streamDefaultMode,
    compressionEnabled: formState.compressionEnabled,
    allowAutoCombos: formState.allowAutoCombos,
    catalogScope: formState.catalogScope,
    disableNonPublicModels: formState.disableNonPublicModels,
    allowUsageCommand: formState.allowUsageCommand,
    usageLimitEnabled: formState.usageLimitEnabled,
    dailyUsageLimitUsd: parseUsdLimitInput(formState.dailyUsageLimitUsd),
    weeklyUsageLimitUsd: parseUsdLimitInput(formState.weeklyUsageLimitUsd),
    chaosModeEnabled: formState.chaosModeEnabled,
  };
}

export function validateForm(
  formState: ApiKeyAccessFormState,
  t?: (key: string, values?: Record<string, unknown>) => string
): Record<AccessEditorTab, string[]> {
  const tr = t ?? ((k: string) => k);
  const errors: Record<AccessEditorTab, string[]> = {
    general: [],
    models: [],
    combos: [],
    connections: [],
    limits: [],
    behaviour: [],
  };

  // General tab: name validation
  const nameVal = validateKeyName(formState.name, tr);
  if (!nameVal.valid && nameVal.error) {
    errors.general.push(nameVal.error);
  }

  // Models tab
  if (!formState.allowAll) {
    if (!Array.isArray(formState.selectedModels)) {
      errors.models.push(tr("invalidModelsSelection"));
    } else if (formState.selectedModels.length > MAX_SELECTED_MODELS) {
      errors.models.push(tr("cannotSelectMoreThanModels", { max: MAX_SELECTED_MODELS }));
    }
  }

  // Connections tab
  if (!formState.allowAllConnections && formState.selectedConnections.length === 0) {
    errors.connections.push(tr("selectAtLeastOneConnection"));
  }

  // Limits tab
  if (formState.throttleDelayMs < 0 || formState.throttleDelayMs > 300000) {
    errors.limits.push("Throttle delay must be between 0 and 300000 ms");
  }
  if (formState.maxSessions < 0) {
    errors.limits.push("Max sessions must be non-negative");
  }
  for (const rl of formState.rateLimits) {
    if (rl.limit <= 0 || rl.window <= 0) {
      errors.limits.push("Rate limits must have positive requests and seconds");
      break;
    }
  }

  return errors;
}

export function useApiKeyAccessForm(
  initialKey: ApiKeyAccessData | null,
  t?: (key: string, values?: Record<string, unknown>) => string
) {
  const [prevKey, setPrevKey] = useState(initialKey);
  const [initialState, setInitialState] = useState<ApiKeyAccessFormState>(() =>
    createInitialFormState(initialKey)
  );
  const [formState, setFormState] = useState<ApiKeyAccessFormState>(() =>
    createInitialFormState(initialKey)
  );

  // Sync state when initialKey reference or identity changes
  if (initialKey !== prevKey) {
    setPrevKey(initialKey);
    const fresh = createInitialFormState(initialKey);
    setInitialState(fresh);
    setFormState(fresh);
  }

  const isDirty = useMemo(() => {
    return JSON.stringify(formState) !== JSON.stringify(initialState);
  }, [formState, initialState]);

  const resetForm = useCallback(() => {
    setFormState(initialState);
  }, [initialState]);

  const tabErrors = useMemo(() => {
    return validateForm(formState, t);
  }, [formState, t]);

  const getTabErrorCount = useCallback(
    (tab: AccessEditorTab): number => {
      return tabErrors[tab]?.length ?? 0;
    },
    [tabErrors]
  );

  const hasErrors = useMemo(() => {
    return Object.values(tabErrors).some((errs) => errs.length > 0);
  }, [tabErrors]);

  const buildPayload = useCallback((): Record<string, unknown> => {
    return buildApiKeyAccessPayload(formState, initialKey || { id: "", name: "" });
  }, [formState, initialKey]);

  // Setters
  const setName = useCallback((name: string) => {
    setFormState((prev) => ({ ...prev, name }));
  }, []);

  const setAllowAll = useCallback((allowAll: boolean) => {
    setFormState((prev) => ({
      ...prev,
      allowAll,
      ...(allowAll ? { selectedModels: [], blockedClaudeCodeFamilies: [] } : {}),
    }));
  }, []);

  const setSelectedModels = useCallback((models: string[] | ((prev: string[]) => string[])) => {
    setFormState((prev) => ({
      ...prev,
      selectedModels: typeof models === "function" ? models(prev.selectedModels) : models,
    }));
  }, []);

  const toggleModel = useCallback((modelId: string) => {
    setFormState((prev) => {
      if (prev.allowAll) return prev;
      const exists = prev.selectedModels.includes(modelId);
      const nextModels = exists
        ? prev.selectedModels.filter((m) => m !== modelId)
        : [...prev.selectedModels, modelId];
      return { ...prev, selectedModels: nextModels };
    });
  }, []);

  const selectAllModels = useCallback((allModelIds: string[]) => {
    setFormState((prev) => ({
      ...prev,
      selectedModels: [...allModelIds],
      blockedClaudeCodeFamilies: [],
    }));
  }, []);

  const deselectAllModels = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      selectedModels: [],
      blockedClaudeCodeFamilies: [],
    }));
  }, []);

  const blockClaudeCodeFamily = useCallback((familyId: ClaudeCodeBlockableFamilyId) => {
    setFormState((prev) => {
      const nextFamilies = prev.blockedClaudeCodeFamilies.includes(familyId)
        ? prev.blockedClaudeCodeFamilies
        : [...prev.blockedClaudeCodeFamilies, familyId];
      const nextModels = prev.selectedModels.filter(
        (modelId) => !isClaudeCodeFamilyModel(modelId, familyId)
      );
      return {
        ...prev,
        blockedClaudeCodeFamilies: nextFamilies,
        selectedModels: nextModels,
      };
    });
  }, []);

  const unblockClaudeCodeFamily = useCallback((familyId: ClaudeCodeBlockableFamilyId) => {
    setFormState((prev) => ({
      ...prev,
      blockedClaudeCodeFamilies: prev.blockedClaudeCodeFamilies.filter((id) => id !== familyId),
    }));
  }, []);

  const setAllowAllCombos = useCallback((allowAllCombos: boolean) => {
    setFormState((prev) => ({ ...prev, allowAllCombos }));
  }, []);

  const setSelectedCombos = useCallback((combos: string[] | ((prev: string[]) => string[])) => {
    setFormState((prev) => ({
      ...prev,
      selectedCombos: typeof combos === "function" ? combos(prev.selectedCombos) : combos,
    }));
  }, []);

  const toggleCombo = useCallback((comboName: string) => {
    setFormState((prev) => {
      if (prev.allowAllCombos) return prev;
      const exists = prev.selectedCombos.includes(comboName);
      const nextCombos = exists
        ? prev.selectedCombos.filter((c) => c !== comboName)
        : [...prev.selectedCombos, comboName];
      return { ...prev, selectedCombos: nextCombos };
    });
  }, []);

  const setAllowAllConnections = useCallback((allowAllConnections: boolean) => {
    setFormState((prev) => ({
      ...prev,
      allowAllConnections,
      ...(allowAllConnections ? { selectedConnections: [] } : {}),
    }));
  }, []);

  const setSelectedConnections = useCallback(
    (connections: string[] | ((prev: string[]) => string[])) => {
      setFormState((prev) => ({
        ...prev,
        selectedConnections:
          typeof connections === "function" ? connections(prev.selectedConnections) : connections,
      }));
    },
    []
  );

  const setAllowAllEndpoints = useCallback((allowAllEndpoints: boolean) => {
    setFormState((prev) => ({
      ...prev,
      allowAllEndpoints,
      ...(allowAllEndpoints ? { selectedEndpoints: [] } : {}),
    }));
  }, []);

  const setSelectedEndpoints = useCallback(
    (endpoints: string[] | ((prev: string[]) => string[])) => {
      setFormState((prev) => ({
        ...prev,
        selectedEndpoints:
          typeof endpoints === "function" ? endpoints(prev.selectedEndpoints) : endpoints,
      }));
    },
    []
  );

  const toggleEndpoint = useCallback((endpointId: string) => {
    setFormState((prev) => {
      if (prev.allowAllEndpoints) return prev;
      const exists = prev.selectedEndpoints.includes(endpointId);
      const nextEndpoints = exists
        ? prev.selectedEndpoints.filter((e) => e !== endpointId)
        : [...prev.selectedEndpoints, endpointId];
      return { ...prev, selectedEndpoints: nextEndpoints };
    });
  }, []);

  const setNoLog = useCallback((noLog: boolean) => {
    setFormState((prev) => ({ ...prev, noLog }));
  }, []);

  const setAutoResolve = useCallback((autoResolve: boolean) => {
    setFormState((prev) => ({ ...prev, autoResolve }));
  }, []);

  const setIsActive = useCallback((isActive: boolean) => {
    setFormState((prev) => ({ ...prev, isActive }));
  }, []);

  const setThrottleDelayMs = useCallback((throttleDelayMs: number) => {
    setFormState((prev) => ({ ...prev, throttleDelayMs }));
  }, []);

  const setIsBanned = useCallback((isBanned: boolean) => {
    setFormState((prev) => ({ ...prev, isBanned }));
  }, []);

  const setExpiresAt = useCallback((expiresAt: string) => {
    setFormState((prev) => ({ ...prev, expiresAt }));
  }, []);

  const setMaxSessions = useCallback((maxSessions: number) => {
    setFormState((prev) => ({ ...prev, maxSessions }));
  }, []);

  const setScheduleEnabled = useCallback((scheduleEnabled: boolean) => {
    setFormState((prev) => ({ ...prev, scheduleEnabled }));
  }, []);

  const setScheduleFrom = useCallback((scheduleFrom: string) => {
    setFormState((prev) => ({ ...prev, scheduleFrom }));
  }, []);

  const setScheduleUntil = useCallback((scheduleUntil: string) => {
    setFormState((prev) => ({ ...prev, scheduleUntil }));
  }, []);

  const setScheduleDays = useCallback((days: number[] | ((prev: number[]) => number[])) => {
    setFormState((prev) => ({
      ...prev,
      scheduleDays: typeof days === "function" ? days(prev.scheduleDays) : days,
    }));
  }, []);

  const setScheduleTz = useCallback((scheduleTz: string) => {
    setFormState((prev) => ({ ...prev, scheduleTz }));
  }, []);

  const setRateLimits = useCallback(
    (rateLimits: RateLimitEntry[] | ((prev: RateLimitEntry[]) => RateLimitEntry[])) => {
      setFormState((prev) => ({
        ...prev,
        rateLimits: typeof rateLimits === "function" ? rateLimits(prev.rateLimits) : rateLimits,
      }));
    },
    []
  );

  const addRateLimit = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      rateLimits: [...prev.rateLimits, { limit: 100, window: 60 }],
    }));
  }, []);

  const removeRateLimit = useCallback((index: number) => {
    setFormState((prev) => ({
      ...prev,
      rateLimits: prev.rateLimits.filter((_, i) => i !== index),
    }));
  }, []);

  const updateRateLimit = useCallback((index: number, limit: number, windowVal: number) => {
    setFormState((prev) => {
      const next = [...prev.rateLimits];
      if (next[index]) {
        next[index] = { limit, window: windowVal };
      }
      return { ...prev, rateLimits: next };
    });
  }, []);

  const setManageEnabled = useCallback((manageEnabled: boolean) => {
    setFormState((prev) => ({ ...prev, manageEnabled }));
  }, []);

  const setSelfUsageEnabled = useCallback((selfUsageEnabled: boolean) => {
    setFormState((prev) => ({
      ...prev,
      selfUsageEnabled,
      ...(selfUsageEnabled ? {} : { selfAccountQuotaEnabled: false }),
    }));
  }, []);

  const setSelfAccountQuotaEnabled = useCallback((selfAccountQuotaEnabled: boolean) => {
    setFormState((prev) => ({ ...prev, selfAccountQuotaEnabled }));
  }, []);

  const setBypassProviderQuotaPolicyEnabled = useCallback(
    (bypassProviderQuotaPolicyEnabled: boolean) => {
      setFormState((prev) => ({ ...prev, bypassProviderQuotaPolicyEnabled }));
    },
    []
  );

  const setStreamDefaultMode = useCallback((streamDefaultMode: StreamDefaultMode) => {
    setFormState((prev) => ({ ...prev, streamDefaultMode }));
  }, []);

  const setCompressionEnabled = useCallback((compressionEnabled: boolean) => {
    setFormState((prev) => ({ ...prev, compressionEnabled }));
  }, []);

  const setAllowAutoCombos = useCallback((allowAutoCombos: boolean) => {
    setFormState((prev) => ({ ...prev, allowAutoCombos }));
  }, []);

  const setCatalogScope = useCallback((catalogScope: CatalogScope) => {
    setFormState((prev) => ({ ...prev, catalogScope }));
  }, []);

  const setDisableNonPublicModels = useCallback((disableNonPublicModels: boolean) => {
    setFormState((prev) => ({ ...prev, disableNonPublicModels }));
  }, []);

  const setAllowUsageCommand = useCallback((allowUsageCommand: boolean) => {
    setFormState((prev) => ({ ...prev, allowUsageCommand }));
  }, []);

  const setUsageLimitEnabled = useCallback((usageLimitEnabled: boolean) => {
    setFormState((prev) => ({ ...prev, usageLimitEnabled }));
  }, []);

  const setDailyUsageLimitUsd = useCallback((dailyUsageLimitUsd: string) => {
    setFormState((prev) => ({ ...prev, dailyUsageLimitUsd }));
  }, []);

  const setWeeklyUsageLimitUsd = useCallback((weeklyUsageLimitUsd: string) => {
    setFormState((prev) => ({ ...prev, weeklyUsageLimitUsd }));
  }, []);

  const setChaosModeEnabled = useCallback((chaosModeEnabled: boolean) => {
    setFormState((prev) => ({ ...prev, chaosModeEnabled }));
  }, []);

  return {
    formState,
    isDirty,
    resetForm,
    tabErrors,
    getTabErrorCount,
    hasErrors,
    buildPayload,
    setName,
    setAllowAll,
    setSelectedModels,
    toggleModel,
    selectAllModels,
    deselectAllModels,
    blockClaudeCodeFamily,
    unblockClaudeCodeFamily,
    setAllowAllCombos,
    setSelectedCombos,
    toggleCombo,
    setAllowAllConnections,
    setSelectedConnections,
    setAllowAllEndpoints,
    setSelectedEndpoints,
    toggleEndpoint,
    setNoLog,
    setAutoResolve,
    setIsActive,
    setThrottleDelayMs,
    setIsBanned,
    setExpiresAt,
    setMaxSessions,
    setScheduleEnabled,
    setScheduleFrom,
    setScheduleUntil,
    setScheduleDays,
    setScheduleTz,
    setRateLimits,
    addRateLimit,
    removeRateLimit,
    updateRateLimit,
    setManageEnabled,
    setSelfUsageEnabled,
    setSelfAccountQuotaEnabled,
    setBypassProviderQuotaPolicyEnabled,
    setStreamDefaultMode,
    setCompressionEnabled,
    setAllowAutoCombos,
    setCatalogScope,
    setDisableNonPublicModels,
    allowUsageCommand: formState.allowUsageCommand,
    setAllowUsageCommand,
    setUsageLimitEnabled,
    setDailyUsageLimitUsd,
    setWeeklyUsageLimitUsd,
    setChaosModeEnabled,
  };
}
