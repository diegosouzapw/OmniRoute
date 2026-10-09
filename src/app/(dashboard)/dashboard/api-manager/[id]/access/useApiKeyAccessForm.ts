import { useState, useCallback, useMemo, type Dispatch, type SetStateAction } from "react";
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
  // `connectionAccessMode` is a PATCH-only input: the stored key has no such column, so
  // GET never returns it and an empty list is what "all connections" looks like.
  allowedConnections?: string[] | null;
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

type StoredApiKey = ApiKeyAccessData | null | undefined;

function arrayOrEmpty<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

function positiveNumberOrZero(value: number | null | undefined): number {
  return typeof value === "number" && value > 0 ? value : 0;
}

/** A stored USD limit as the text-field value: positive numbers only, anything else is empty. */
function positiveUsdLimitText(value: number | null | undefined): string {
  return typeof value === "number" && value > 0 ? String(value) : "";
}

function defaultScheduleTimeZone(): string {
  return typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";
}

function initialAccessListState(apiKey: StoredApiKey) {
  const initialModels = arrayOrEmpty(apiKey?.allowedModels);
  const initialBlockedModels = arrayOrEmpty(apiKey?.blockedModels);
  const initialCombos = arrayOrEmpty(apiKey?.allowedCombos).filter(
    (combo) => combo !== ALL_COMBOS_ACCESS_RULE
  );
  const initialConnections = arrayOrEmpty(apiKey?.allowedConnections);
  const initialEndpoints = arrayOrEmpty(apiKey?.allowedEndpoints);

  const allowAllModels =
    apiKey?.modelAccessMode === "restricted" ? false : initialModels.length === 0;

  const allowAllConnections = initialConnections.length === 0;

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
  };
}

function initialKeyStatusState(apiKey: StoredApiKey) {
  return {
    noLog: apiKey?.noLog === true,
    autoResolve: apiKey?.autoResolve === true,
    isActive: apiKey?.isActive !== false,
    throttleDelayMs: positiveNumberOrZero(apiKey?.throttleDelayMs),
    isBanned: apiKey?.isBanned === true,
    expiresAt: apiKey?.expiresAt ?? "",
    maxSessions: positiveNumberOrZero(apiKey?.maxSessions),
  };
}

function initialScheduleState(apiKey: StoredApiKey) {
  const schedule = apiKey?.accessSchedule;
  return {
    scheduleEnabled: schedule?.enabled === true,
    scheduleFrom: schedule?.from ?? "08:00",
    scheduleUntil: schedule?.until ?? "18:00",
    scheduleDays: schedule?.days ?? [1, 2, 3, 4, 5],
    scheduleTz: schedule?.tz ?? defaultScheduleTimeZone(),
    rateLimits: [...arrayOrEmpty(apiKey?.rateLimits)],
  };
}

function initialScopeState(apiKey: StoredApiKey) {
  return {
    manageEnabled: Array.isArray(apiKey?.scopes) && apiKey.scopes.includes("manage"),
    selfUsageEnabled: Array.isArray(apiKey?.scopes) && apiKey.scopes.includes(SELF_USAGE_SCOPE),
    selfAccountQuotaEnabled:
      Array.isArray(apiKey?.scopes) && apiKey.scopes.includes(SELF_ACCOUNT_QUOTA_SCOPE),
    bypassProviderQuotaPolicyEnabled: hasProviderQuotaBypassScope(apiKey?.scopes),
  };
}

type BehaviourStateField =
  | "streamDefaultMode"
  | "compressionEnabled"
  | "allowAutoCombos"
  | "catalogScope"
  | "disableNonPublicModels"
  | "allowUsageCommand"
  | "usageLimitEnabled"
  | "dailyUsageLimitUsd"
  | "weeklyUsageLimitUsd"
  | "chaosModeEnabled";

function initialBehaviourState(
  apiKey: StoredApiKey
): Pick<ApiKeyAccessFormState, BehaviourStateField> {
  return {
    streamDefaultMode: apiKey?.streamDefaultMode === "json" ? "json" : "legacy",
    compressionEnabled: apiKey?.compressionEnabled !== false,
    allowAutoCombos: apiKey?.allowAutoCombos !== false,
    catalogScope: apiKey?.catalogScope ?? "all",
    disableNonPublicModels: apiKey?.disableNonPublicModels === true,
    allowUsageCommand: apiKey?.allowUsageCommand === true,
    usageLimitEnabled: apiKey?.usageLimitEnabled === true,
    dailyUsageLimitUsd: positiveUsdLimitText(apiKey?.dailyUsageLimitUsd),
    weeklyUsageLimitUsd: positiveUsdLimitText(apiKey?.weeklyUsageLimitUsd),
    chaosModeEnabled: apiKey?.chaosModeEnabled === true,
  };
}

// The groups are spread in the original field order, so JSON.stringify (the dirty check) sees
// the same key order as before.
export function createInitialFormState(apiKey: StoredApiKey): ApiKeyAccessFormState {
  return {
    ...initialAccessListState(apiKey),
    ...initialKeyStatusState(apiKey),
    ...initialScheduleState(apiKey),
    ...initialScopeState(apiKey),
    ...initialBehaviourState(apiKey),
  };
}

/**
 * Blocked models logic: keep non-Claude patterns from originalKey, and add selected blocked
 * Claude families.
 */
function buildValidBlockedModels(
  formState: ApiKeyAccessFormState,
  originalKey: ApiKeyAccessData
): string[] {
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
  return blockedModels.filter((id) => typeof id === "string" && id.length > 0 && id.length < 200);
}

function buildValidCombos(formState: ApiKeyAccessFormState): string[] {
  const allowedCombos = formState.allowAllCombos
    ? [ALL_COMBOS_ACCESS_RULE]
    : formState.selectedCombos;
  return allowedCombos.filter(
    (name) => typeof name === "string" && name.trim().length > 0 && name.length < 200
  );
}

function buildValidConnections(formState: ApiKeyAccessFormState): string[] {
  const allowedConnections = formState.allowAllConnections ? [] : formState.selectedConnections;
  return allowedConnections.filter((id) => typeof id === "string" && /^[0-9a-f-]{36}$/i.test(id));
}

function normalizeMaxSessions(maxSessions: number): number {
  return typeof maxSessions === "number" && Number.isFinite(maxSessions)
    ? Math.max(0, Math.floor(maxSessions))
    : 0;
}

function normalizeThrottleDelayMs(throttleDelayMs: number): number {
  return typeof throttleDelayMs === "number" && Number.isFinite(throttleDelayMs)
    ? Math.max(0, Math.min(300000, Math.floor(throttleDelayMs)))
    : 0;
}

function buildAccessSchedule(formState: ApiKeyAccessFormState): AccessSchedule | null {
  return formState.scheduleEnabled
    ? {
        enabled: true,
        from: formState.scheduleFrom,
        until: formState.scheduleUntil,
        days: formState.scheduleDays,
        tz: formState.scheduleTz,
      }
    : null;
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

  const validBlockedModels = buildValidBlockedModels(formState, originalKey);
  const validCombos = buildValidCombos(formState);
  const validConnections = buildValidConnections(formState);
  const normalizedMaxSessions = normalizeMaxSessions(formState.maxSessions);
  const normalizedThrottleDelayMs = normalizeThrottleDelayMs(formState.throttleDelayMs);
  const schedule = buildAccessSchedule(formState);

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
    errors.limits.push(tr("throttleDelayRangeError"));
  }
  if (formState.maxSessions < 0) {
    errors.limits.push(tr("maxSessionsNegativeError"));
  }
  for (const rl of formState.rateLimits) {
    if (rl.limit <= 0 || rl.window <= 0) {
      errors.limits.push(tr("rateLimitPositiveError"));
      break;
    }
  }

  return errors;
}

type FormStateSetter = Dispatch<SetStateAction<ApiKeyAccessFormState>>;

/** Name, status, expiry, scopes and endpoint setters (General tab). */
function useGeneralSetters(setFormState: FormStateSetter) {
  const setName = useCallback(
    (name: string) => {
      setFormState((prev) => ({ ...prev, name }));
    },
    [setFormState]
  );

  const setIsActive = useCallback(
    (isActive: boolean) => {
      setFormState((prev) => ({ ...prev, isActive }));
    },
    [setFormState]
  );

  const setIsBanned = useCallback(
    (isBanned: boolean) => {
      setFormState((prev) => ({ ...prev, isBanned }));
    },
    [setFormState]
  );

  const setExpiresAt = useCallback(
    (expiresAt: string) => {
      setFormState((prev) => ({ ...prev, expiresAt }));
    },
    [setFormState]
  );

  return { setName, setIsActive, setIsBanned, setExpiresAt };
}

/** Management scope, self-service scopes and endpoint setters (General tab). */
function useScopeAndEndpointSetters(setFormState: FormStateSetter) {
  const setManageEnabled = useCallback(
    (manageEnabled: boolean) => {
      setFormState((prev) => ({ ...prev, manageEnabled }));
    },
    [setFormState]
  );

  const setSelfUsageEnabled = useCallback(
    (selfUsageEnabled: boolean) => {
      setFormState((prev) => ({
        ...prev,
        selfUsageEnabled,
        ...(selfUsageEnabled ? {} : { selfAccountQuotaEnabled: false }),
      }));
    },
    [setFormState]
  );

  const setSelfAccountQuotaEnabled = useCallback(
    (selfAccountQuotaEnabled: boolean) => {
      setFormState((prev) => ({ ...prev, selfAccountQuotaEnabled }));
    },
    [setFormState]
  );

  const setAllowAllEndpoints = useCallback(
    (allowAllEndpoints: boolean) => {
      setFormState((prev) => ({
        ...prev,
        allowAllEndpoints,
        ...(allowAllEndpoints ? { selectedEndpoints: [] } : {}),
      }));
    },
    [setFormState]
  );

  const toggleEndpoint = useCallback(
    (endpointId: string) => {
      setFormState((prev) => {
        if (prev.allowAllEndpoints) return prev;
        const exists = prev.selectedEndpoints.includes(endpointId);
        const nextEndpoints = exists
          ? prev.selectedEndpoints.filter((e) => e !== endpointId)
          : [...prev.selectedEndpoints, endpointId];
        return { ...prev, selectedEndpoints: nextEndpoints };
      });
    },
    [setFormState]
  );

  return {
    setManageEnabled,
    setSelfUsageEnabled,
    setSelfAccountQuotaEnabled,
    setAllowAllEndpoints,
    toggleEndpoint,
  };
}

/** Allow-all and selected-model setters (Models tab). */
function useModelSelectionSetters(setFormState: FormStateSetter) {
  const setAllowAll = useCallback(
    (allowAll: boolean) => {
      setFormState((prev) => ({
        ...prev,
        allowAll,
        ...(allowAll ? { selectedModels: [], blockedClaudeCodeFamilies: [] } : {}),
      }));
    },
    [setFormState]
  );

  const setSelectedModels = useCallback(
    (models: string[] | ((prev: string[]) => string[])) => {
      setFormState((prev) => ({
        ...prev,
        selectedModels: typeof models === "function" ? models(prev.selectedModels) : models,
      }));
    },
    [setFormState]
  );

  const toggleModel = useCallback(
    (modelId: string) => {
      setFormState((prev) => {
        if (prev.allowAll) return prev;
        const exists = prev.selectedModels.includes(modelId);
        const nextModels = exists
          ? prev.selectedModels.filter((m) => m !== modelId)
          : [...prev.selectedModels, modelId];
        return { ...prev, selectedModels: nextModels };
      });
    },
    [setFormState]
  );

  const selectAllModels = useCallback(
    (allModelIds: string[]) => {
      setFormState((prev) => ({
        ...prev,
        selectedModels: [...allModelIds],
        blockedClaudeCodeFamilies: [],
      }));
    },
    [setFormState]
  );

  const deselectAllModels = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      selectedModels: [],
      blockedClaudeCodeFamilies: [],
    }));
  }, [setFormState]);

  return { setAllowAll, setSelectedModels, toggleModel, selectAllModels, deselectAllModels };
}

/** Claude Code family, catalog scope and non-public model setters (Models tab). */
function useModelPolicySetters(setFormState: FormStateSetter) {
  const blockClaudeCodeFamily = useCallback(
    (familyId: ClaudeCodeBlockableFamilyId) => {
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
    },
    [setFormState]
  );

  const setCatalogScope = useCallback(
    (catalogScope: CatalogScope) => {
      setFormState((prev) => ({ ...prev, catalogScope }));
    },
    [setFormState]
  );

  const setDisableNonPublicModels = useCallback(
    (disableNonPublicModels: boolean) => {
      setFormState((prev) => ({ ...prev, disableNonPublicModels }));
    },
    [setFormState]
  );

  return { blockClaudeCodeFamily, setCatalogScope, setDisableNonPublicModels };
}

/** Combo and connection setters (Combos and Connections tabs). */
function useComboAndConnectionSetters(setFormState: FormStateSetter) {
  const setAllowAllCombos = useCallback(
    (allowAllCombos: boolean) => {
      setFormState((prev) => ({ ...prev, allowAllCombos }));
    },
    [setFormState]
  );

  const setSelectedCombos = useCallback(
    (combos: string[] | ((prev: string[]) => string[])) => {
      setFormState((prev) => ({
        ...prev,
        selectedCombos: typeof combos === "function" ? combos(prev.selectedCombos) : combos,
      }));
    },
    [setFormState]
  );

  const toggleCombo = useCallback(
    (comboName: string) => {
      setFormState((prev) => {
        if (prev.allowAllCombos) return prev;
        const exists = prev.selectedCombos.includes(comboName);
        const nextCombos = exists
          ? prev.selectedCombos.filter((c) => c !== comboName)
          : [...prev.selectedCombos, comboName];
        return { ...prev, selectedCombos: nextCombos };
      });
    },
    [setFormState]
  );

  const setAllowAutoCombos = useCallback(
    (allowAutoCombos: boolean) => {
      setFormState((prev) => ({ ...prev, allowAutoCombos }));
    },
    [setFormState]
  );

  const setAllowAllConnections = useCallback(
    (allowAllConnections: boolean) => {
      setFormState((prev) => ({
        ...prev,
        allowAllConnections,
        ...(allowAllConnections ? { selectedConnections: [] } : {}),
      }));
    },
    [setFormState]
  );

  const setSelectedConnections = useCallback(
    (connections: string[] | ((prev: string[]) => string[])) => {
      setFormState((prev) => ({
        ...prev,
        selectedConnections:
          typeof connections === "function" ? connections(prev.selectedConnections) : connections,
      }));
    },
    [setFormState]
  );

  return {
    setAllowAllCombos,
    setSelectedCombos,
    toggleCombo,
    setAllowAutoCombos,
    setAllowAllConnections,
    setSelectedConnections,
  };
}

/** Session, throttle, rate-limit and usage-limit setters (Limits tab). */
function useLimitSetters(setFormState: FormStateSetter) {
  const setMaxSessions = useCallback(
    (maxSessions: number) => {
      setFormState((prev) => ({ ...prev, maxSessions }));
    },
    [setFormState]
  );

  const setThrottleDelayMs = useCallback(
    (throttleDelayMs: number) => {
      setFormState((prev) => ({ ...prev, throttleDelayMs }));
    },
    [setFormState]
  );

  const addRateLimit = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      rateLimits: [...prev.rateLimits, { limit: 100, window: 60 }],
    }));
  }, [setFormState]);

  const removeRateLimit = useCallback(
    (index: number) => {
      setFormState((prev) => ({
        ...prev,
        rateLimits: prev.rateLimits.filter((_, i) => i !== index),
      }));
    },
    [setFormState]
  );

  const updateRateLimit = useCallback(
    (index: number, limit: number, windowVal: number) => {
      setFormState((prev) => {
        const next = [...prev.rateLimits];
        if (next[index]) {
          next[index] = { limit, window: windowVal };
        }
        return { ...prev, rateLimits: next };
      });
    },
    [setFormState]
  );

  const setUsageLimitEnabled = useCallback(
    (usageLimitEnabled: boolean) => {
      setFormState((prev) => ({ ...prev, usageLimitEnabled }));
    },
    [setFormState]
  );

  const setDailyUsageLimitUsd = useCallback(
    (dailyUsageLimitUsd: string) => {
      setFormState((prev) => ({ ...prev, dailyUsageLimitUsd }));
    },
    [setFormState]
  );

  const setWeeklyUsageLimitUsd = useCallback(
    (weeklyUsageLimitUsd: string) => {
      setFormState((prev) => ({ ...prev, weeklyUsageLimitUsd }));
    },
    [setFormState]
  );

  return {
    setMaxSessions,
    setThrottleDelayMs,
    addRateLimit,
    removeRateLimit,
    updateRateLimit,
    setUsageLimitEnabled,
    setDailyUsageLimitUsd,
    setWeeklyUsageLimitUsd,
  };
}

/** Access schedule setters (Limits tab). */
function useScheduleSetters(setFormState: FormStateSetter) {
  const setScheduleEnabled = useCallback(
    (scheduleEnabled: boolean) => {
      setFormState((prev) => ({ ...prev, scheduleEnabled }));
    },
    [setFormState]
  );

  const setScheduleFrom = useCallback(
    (scheduleFrom: string) => {
      setFormState((prev) => ({ ...prev, scheduleFrom }));
    },
    [setFormState]
  );

  const setScheduleUntil = useCallback(
    (scheduleUntil: string) => {
      setFormState((prev) => ({ ...prev, scheduleUntil }));
    },
    [setFormState]
  );

  const setScheduleDays = useCallback(
    (days: number[] | ((prev: number[]) => number[])) => {
      setFormState((prev) => ({
        ...prev,
        scheduleDays: typeof days === "function" ? days(prev.scheduleDays) : days,
      }));
    },
    [setFormState]
  );

  const setScheduleTz = useCallback(
    (scheduleTz: string) => {
      setFormState((prev) => ({ ...prev, scheduleTz }));
    },
    [setFormState]
  );

  return {
    setScheduleEnabled,
    setScheduleFrom,
    setScheduleUntil,
    setScheduleDays,
    setScheduleTz,
  };
}

/** Logging, routing and policy toggles (Behaviour tab). */
function useBehaviourSetters(setFormState: FormStateSetter) {
  const setNoLog = useCallback(
    (noLog: boolean) => {
      setFormState((prev) => ({ ...prev, noLog }));
    },
    [setFormState]
  );

  const setAutoResolve = useCallback(
    (autoResolve: boolean) => {
      setFormState((prev) => ({ ...prev, autoResolve }));
    },
    [setFormState]
  );

  const setStreamDefaultMode = useCallback(
    (streamDefaultMode: StreamDefaultMode) => {
      setFormState((prev) => ({ ...prev, streamDefaultMode }));
    },
    [setFormState]
  );

  const setCompressionEnabled = useCallback(
    (compressionEnabled: boolean) => {
      setFormState((prev) => ({ ...prev, compressionEnabled }));
    },
    [setFormState]
  );

  const setChaosModeEnabled = useCallback(
    (chaosModeEnabled: boolean) => {
      setFormState((prev) => ({ ...prev, chaosModeEnabled }));
    },
    [setFormState]
  );

  const setAllowUsageCommand = useCallback(
    (allowUsageCommand: boolean) => {
      setFormState((prev) => ({ ...prev, allowUsageCommand }));
    },
    [setFormState]
  );

  const setBypassProviderQuotaPolicyEnabled = useCallback(
    (bypassProviderQuotaPolicyEnabled: boolean) => {
      setFormState((prev) => ({ ...prev, bypassProviderQuotaPolicyEnabled }));
    },
    [setFormState]
  );

  return {
    setNoLog,
    setAutoResolve,
    setStreamDefaultMode,
    setCompressionEnabled,
    setChaosModeEnabled,
    setAllowUsageCommand,
    setBypassProviderQuotaPolicyEnabled,
  };
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

  /** Adopt the current values as the saved baseline (used right after a successful PATCH). */
  const markClean = useCallback(() => {
    setInitialState(formState);
  }, [formState]);

  return {
    formState,
    isDirty,
    resetForm,
    markClean,
    tabErrors,
    getTabErrorCount,
    hasErrors,
    buildPayload,
    ...useGeneralSetters(setFormState),
    ...useScopeAndEndpointSetters(setFormState),
    ...useModelSelectionSetters(setFormState),
    ...useModelPolicySetters(setFormState),
    ...useComboAndConnectionSetters(setFormState),
    ...useLimitSetters(setFormState),
    ...useScheduleSetters(setFormState),
    ...useBehaviourSetters(setFormState),
  };
}
