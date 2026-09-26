import test from "node:test";
import assert from "node:assert/strict";
import { ALL_COMBOS_ACCESS_RULE } from "@/shared/constants/comboAccess";
import { SELF_ACCOUNT_QUOTA_SCOPE, SELF_USAGE_SCOPE } from "@/shared/constants/selfServiceScopes";
import { API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE } from "@/shared/constants/apiKeyPolicyScopes";
import {
  buildApiKeyAccessPayload,
  createInitialFormState,
  type ApiKeyAccessData,
  type ApiKeyAccessFormState,
} from "@/app/(dashboard)/dashboard/api-manager/[id]/access/useApiKeyAccessForm";

/**
 * Reference implementation of the legacy payload builder,
 * derived verbatim from PermissionsModal + handleUpdatePermissions in ApiManagerPageClient.tsx.
 */
function legacyPayloadBuilder(
  formState: ApiKeyAccessFormState,
  originalKey: ApiKeyAccessData
): Record<string, unknown> {
  const MAX_KEY_NAME_LENGTH = 200;
  const CLAUDE_CODE_DEFAULT_MODEL_ID = "cc/*";
  const CLAUDE_CODE_FAMILY_BLOCK_PATTERNS: Record<string, string[]> = {
    fable: ["claude-fable*", "fable"],
    opus: ["claude-opus*", "opus"],
    sonnet: ["claude-sonnet*", "sonnet"],
    haiku: ["claude-haiku*", "haiku"],
  };
  const CLAUDE_CODE_BLOCK_PATTERN_SET = new Set(
    Object.values(CLAUDE_CODE_FAMILY_BLOCK_PATTERNS).flat()
  );

  const sanitizeInput = (input: string) =>
    input
      .replace(/[<>]/g, "")
      .replace(/"/g, "")
      .replace(/'/g, "")
      .trim()
      .slice(0, MAX_KEY_NAME_LENGTH);

  const sanitizedName = sanitizeInput(formState.name);

  // Models
  const modelAccess = formState.allowAll
    ? { modelAccessMode: "all" as const, allowedModels: [] }
    : { modelAccessMode: "restricted" as const, allowedModels: formState.selectedModels };

  const validModels = modelAccess.allowedModels.filter(
    (id) => typeof id === "string" && id.length > 0 && id.length < 200
  );

  // Blocked models
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

  // Sessions & throttle
  const normalizedMaxSessions =
    typeof formState.maxSessions === "number" && Number.isFinite(formState.maxSessions)
      ? Math.max(0, Math.floor(formState.maxSessions))
      : 0;
  const normalizedThrottleDelayMs =
    typeof formState.throttleDelayMs === "number" && Number.isFinite(formState.throttleDelayMs)
      ? Math.max(0, Math.min(300000, Math.floor(formState.throttleDelayMs)))
      : 0;

  // Schedule
  const schedule = formState.scheduleEnabled
    ? {
        enabled: true,
        from: formState.scheduleFrom,
        until: formState.scheduleUntil,
        days: formState.scheduleDays,
        tz: formState.scheduleTz,
      }
    : null;

  // Scopes
  const currentScopes = new Set(
    (originalKey.scopes ?? []).filter((s): s is string => typeof s === "string")
  );
  if (formState.manageEnabled) currentScopes.add("manage");
  else currentScopes.delete("manage");

  if (formState.selfUsageEnabled) currentScopes.add(SELF_USAGE_SCOPE);
  else currentScopes.delete(SELF_USAGE_SCOPE);

  if (formState.selfUsageEnabled && formState.selfAccountQuotaEnabled) {
    currentScopes.add(SELF_ACCOUNT_QUOTA_SCOPE);
  } else {
    currentScopes.delete(SELF_ACCOUNT_QUOTA_SCOPE);
  }

  if (formState.bypassProviderQuotaPolicyEnabled) {
    currentScopes.add(API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE);
  } else {
    currentScopes.delete(API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE);
  }

  // Endpoints
  const allowedEndpoints = formState.allowAllEndpoints ? [] : formState.selectedEndpoints;

  // Usage limits
  const parseUsdLimit = (val: string | number | null | undefined): number | null => {
    const parsed = Number(val);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  };

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
    scopes: [...currentScopes],
    allowedEndpoints,
    streamDefaultMode: formState.streamDefaultMode,
    compressionEnabled: formState.compressionEnabled,
    allowAutoCombos: formState.allowAutoCombos,
    catalogScope: formState.catalogScope,
    disableNonPublicModels: formState.disableNonPublicModels,
    allowUsageCommand: formState.allowUsageCommand,
    usageLimitEnabled: formState.usageLimitEnabled,
    dailyUsageLimitUsd: parseUsdLimit(formState.dailyUsageLimitUsd),
    weeklyUsageLimitUsd: parseUsdLimit(formState.weeklyUsageLimitUsd),
    chaosModeEnabled: formState.chaosModeEnabled,
  };
}

// 5 Representative fixtures
const fixtureUnrestricted: ApiKeyAccessData = {
  id: "key-1-unrestricted",
  name: "Unrestricted Key",
  key: "omni-unrestricted-1234",
  modelAccessMode: "all",
  allowedModels: [],
  blockedModels: [],
  allowedCombos: [ALL_COMBOS_ACCESS_RULE],
  allowedConnections: [],
  connectionAccessMode: "all",
  noLog: false,
  autoResolve: false,
  isActive: true,
  throttleDelayMs: 0,
  isBanned: false,
  expiresAt: null,
  maxSessions: 0,
  accessSchedule: null,
  rateLimits: null,
  scopes: ["manage", SELF_USAGE_SCOPE],
  allowedEndpoints: [],
  streamDefaultMode: "legacy",
  compressionEnabled: true,
  allowAutoCombos: true,
  catalogScope: "all",
  disableNonPublicModels: false,
  allowUsageCommand: false,
  usageLimitEnabled: false,
  dailyUsageLimitUsd: null,
  weeklyUsageLimitUsd: null,
  chaosModeEnabled: false,
};

const fixtureRestrictedModelsCombos: ApiKeyAccessData = {
  id: "key-2-restricted-models",
  name: "Restricted Models & Combos Key",
  key: "omni-models-combos-5678",
  modelAccessMode: "restricted",
  allowedModels: ["openai/gpt-4o", "anthropic/claude-3-5-sonnet", "cc/*"],
  blockedModels: ["claude-haiku*", "haiku"],
  allowedCombos: ["smart-coding", "vision-ensemble"],
  allowedConnections: [],
  connectionAccessMode: "all",
  noLog: false,
  autoResolve: true,
  isActive: true,
  throttleDelayMs: 100,
  isBanned: false,
  expiresAt: "2026-12-31T23:59:59.000Z",
  maxSessions: 5,
  accessSchedule: null,
  rateLimits: null,
  scopes: [SELF_USAGE_SCOPE],
  allowedEndpoints: [],
  streamDefaultMode: "legacy",
  compressionEnabled: true,
  allowAutoCombos: false,
  catalogScope: "all",
  disableNonPublicModels: true,
  allowUsageCommand: false,
  usageLimitEnabled: false,
  dailyUsageLimitUsd: null,
  weeklyUsageLimitUsd: null,
  chaosModeEnabled: false,
};

const fixtureConnectionsRestricted: ApiKeyAccessData = {
  id: "key-3-connections-restricted",
  name: "Connections Restricted Key",
  key: "omni-connections-9012",
  modelAccessMode: "all",
  allowedModels: [],
  blockedModels: [],
  allowedCombos: [],
  allowedConnections: [
    "3f8a4b6c-1234-4a5b-8c9d-0e1f2a3b4c5d",
    "9a8b7c6d-5432-4e3f-2a1b-0c9d8e7f6a5b",
  ],
  connectionAccessMode: "restricted",
  noLog: false,
  autoResolve: false,
  isActive: true,
  throttleDelayMs: 0,
  isBanned: false,
  expiresAt: null,
  maxSessions: 0,
  accessSchedule: null,
  rateLimits: null,
  scopes: ["manage"],
  allowedEndpoints: ["chat", "completions"],
  streamDefaultMode: "legacy",
  compressionEnabled: true,
  allowAutoCombos: true,
  catalogScope: "all",
  disableNonPublicModels: false,
  allowUsageCommand: false,
  usageLimitEnabled: false,
  dailyUsageLimitUsd: null,
  weeklyUsageLimitUsd: null,
  chaosModeEnabled: false,
};

const fixtureLimitsSchedule: ApiKeyAccessData = {
  id: "key-4-limits-schedule",
  name: "Limits & Schedule Key",
  key: "omni-limits-sched-3456",
  modelAccessMode: "all",
  allowedModels: [],
  blockedModels: [],
  allowedCombos: [],
  allowedConnections: [],
  connectionAccessMode: "all",
  noLog: false,
  autoResolve: false,
  isActive: true,
  throttleDelayMs: 250,
  isBanned: false,
  expiresAt: "2027-01-01T00:00:00.000Z",
  maxSessions: 12,
  accessSchedule: {
    enabled: true,
    from: "09:00",
    until: "17:00",
    days: [1, 2, 3, 4, 5],
    tz: "America/New_York",
  },
  rateLimits: [
    { limit: 60, window: 60 },
    { limit: 1000, window: 3600 },
  ],
  scopes: [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
  allowedEndpoints: [],
  streamDefaultMode: "legacy",
  compressionEnabled: true,
  allowAutoCombos: true,
  catalogScope: "all",
  disableNonPublicModels: false,
  allowUsageCommand: false,
  usageLimitEnabled: true,
  dailyUsageLimitUsd: 25.5,
  weeklyUsageLimitUsd: 150.0,
  chaosModeEnabled: false,
};

const fixtureBehaviourToggles: ApiKeyAccessData = {
  id: "key-5-behaviour-toggles",
  name: "Behaviour Toggles Key",
  key: "omni-behaviour-7890",
  modelAccessMode: "all",
  allowedModels: [],
  blockedModels: [],
  allowedCombos: [],
  allowedConnections: [],
  connectionAccessMode: "all",
  noLog: true,
  autoResolve: true,
  isActive: false,
  throttleDelayMs: 500,
  isBanned: true,
  expiresAt: null,
  maxSessions: 0,
  accessSchedule: null,
  rateLimits: null,
  scopes: ["lease:exclusive", API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE],
  allowedEndpoints: ["embeddings", "audio"],
  streamDefaultMode: "json",
  compressionEnabled: false,
  allowAutoCombos: false,
  catalogScope: "public_only",
  disableNonPublicModels: true,
  allowUsageCommand: true,
  usageLimitEnabled: false,
  dailyUsageLimitUsd: null,
  weeklyUsageLimitUsd: null,
  chaosModeEnabled: true,
};

test("useApiKeyAccessForm payload builder produces identical payload to legacy handler (unrestricted key)", () => {
  const formState = createInitialFormState(fixtureUnrestricted);
  const actual = buildApiKeyAccessPayload(formState, fixtureUnrestricted);
  const expected = legacyPayloadBuilder(formState, fixtureUnrestricted);

  assert.deepEqual(actual, expected);
});

test("useApiKeyAccessForm payload builder produces identical payload to legacy handler (restricted models + combos)", () => {
  const formState = createInitialFormState(fixtureRestrictedModelsCombos);
  const actual = buildApiKeyAccessPayload(formState, fixtureRestrictedModelsCombos);
  const expected = legacyPayloadBuilder(formState, fixtureRestrictedModelsCombos);

  assert.deepEqual(actual, expected);
});

test("useApiKeyAccessForm payload builder produces identical payload to legacy handler (connections restricted)", () => {
  const formState = createInitialFormState(fixtureConnectionsRestricted);
  const actual = buildApiKeyAccessPayload(formState, fixtureConnectionsRestricted);
  const expected = legacyPayloadBuilder(formState, fixtureConnectionsRestricted);

  assert.deepEqual(actual, expected);
});

test("useApiKeyAccessForm payload builder produces identical payload to legacy handler (limits + schedule)", () => {
  const formState = createInitialFormState(fixtureLimitsSchedule);
  const actual = buildApiKeyAccessPayload(formState, fixtureLimitsSchedule);
  const expected = legacyPayloadBuilder(formState, fixtureLimitsSchedule);

  assert.deepEqual(actual, expected);
});

test("useApiKeyAccessForm payload builder produces identical payload to legacy handler (behaviour toggles)", () => {
  const formState = createInitialFormState(fixtureBehaviourToggles);
  const actual = buildApiKeyAccessPayload(formState, fixtureBehaviourToggles);
  const expected = legacyPayloadBuilder(formState, fixtureBehaviourToggles);

  assert.deepEqual(actual, expected);
});

test("useApiKeyAccessForm payload builder matches after form modifications", () => {
  const formState = createInitialFormState(fixtureUnrestricted);
  // Modify some form fields
  formState.name = "Renamed Key <XSS>";
  formState.allowAll = false;
  formState.selectedModels = ["openai/gpt-4o", "cc/*"];
  formState.blockedClaudeCodeFamilies = ["opus", "fable"];
  formState.noLog = true;
  formState.throttleDelayMs = 999999; // Should clamp to 300000
  formState.maxSessions = 15.8; // Should floor to 15
  formState.allowAllConnections = false;
  formState.selectedConnections = ["3f8a4b6c-1234-4a5b-8c9d-0e1f2a3b4c5d", "invalid-not-a-uuid"];
  formState.allowAllEndpoints = false;
  formState.selectedEndpoints = ["chat"];

  const actual = buildApiKeyAccessPayload(formState, fixtureUnrestricted);
  const expected = legacyPayloadBuilder(formState, fixtureUnrestricted);

  assert.deepEqual(actual, expected);
  assert.equal(actual.name, "Renamed Key XSS");
  assert.equal(actual.throttleDelayMs, 300000);
  assert.equal(actual.maxSessions, 15);
  assert.deepEqual(actual.allowedConnections, ["3f8a4b6c-1234-4a5b-8c9d-0e1f2a3b4c5d"]);
  assert.deepEqual(actual.allowedEndpoints, ["chat"]);
});
