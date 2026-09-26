/**
 * The access editor must send exactly the PATCH body the removed PermissionsModal +
 * handleUpdatePermissions (ApiManagerPageClient.tsx on release/v3.8.51) sent for the same key.
 *
 * Every expected value below is a hard-coded literal, worked out by hand from that legacy code:
 * - modal initial state: allowAll = modelAccessMode === "restricted" ? false : models.length === 0;
 *   allowAllCombos = allowedCombos includes "combo/*"; allowAllConnections = connections.length === 0;
 *   throttle / maxSessions <= 0 or non-numbers -> 0; USD limits > 0 -> String(value), else "".
 * - save: sanitized name; Claude Code family patterns are stripped from blockedModels and only
 *   re-added (in the blocked-family order) while "cc/*" is selected in restricted mode; combos
 *   "All" -> ["combo/*"], restrict keeps the list verbatim (even empty, #12267); connections
 *   filtered to UUIDs; throttle clamped to 0..300000 and floored; maxSessions floored;
 *   mergeApiKeyPermissionScopes keeps unknown scopes in stored order; USD strings -> number | null.
 *
 * Bodies are compared with JSON.stringify so the key order (the wire bytes) must match too.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  buildApiKeyAccessPayload,
  createInitialFormState,
  validateForm,
  type ApiKeyAccessData,
  type ApiKeyAccessFormState,
} from "@/app/(dashboard)/dashboard/api-manager/[id]/access/useApiKeyAccessForm";

const LOCAL_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
const UUID_A = "3f8a4b6c-1234-4a5b-8c9d-0e1f2a3b4c5d";
const UUID_B = "9a8b7c6d-5432-4e3f-2a1b-0c9d8e7f6a5b";

function assertSameBody(actual: Record<string, unknown>, expected: Record<string, unknown>) {
  assert.deepEqual(actual, expected);
  assert.equal(JSON.stringify(actual), JSON.stringify(expected));
}

// ── Fixtures (shape of GET /api/keys/[id]) ──────────────────────────────────

const keyUnrestricted: ApiKeyAccessData = {
  id: "key-unrestricted",
  name: "Unrestricted Key",
  modelAccessMode: "all",
  allowedModels: [],
  blockedModels: [],
  allowedCombos: ["combo/*"],
  allowedConnections: [],
  noLog: false,
  autoResolve: false,
  isActive: true,
  throttleDelayMs: 0,
  isBanned: false,
  expiresAt: null,
  maxSessions: 0,
  accessSchedule: null,
  rateLimits: null,
  scopes: ["manage", "self:usage"],
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

const keyRestrictedModelsCombos: ApiKeyAccessData = {
  ...keyUnrestricted,
  id: "key-restricted-models",
  name: "Restricted Models Key",
  modelAccessMode: "restricted",
  allowedModels: ["openai/gpt-4o", "anthropic/*", "cc/*"],
  blockedModels: ["claude-haiku*", "haiku", "legacy-model"],
  allowedCombos: ["smart-coding", "rt-vision"],
  autoResolve: true,
  throttleDelayMs: 100,
  expiresAt: "2026-12-31T23:59:59.000Z",
  maxSessions: 5,
  scopes: ["self:usage"],
  allowAutoCombos: false,
  catalogScope: "combos",
  disableNonPublicModels: true,
};

const keyConnectionsRestricted: ApiKeyAccessData = {
  ...keyUnrestricted,
  id: "key-connections",
  name: "Connections Key",
  modelAccessMode: null,
  allowedCombos: [],
  allowedConnections: [UUID_A, UUID_B],
  scopes: ["manage"],
  allowedEndpoints: ["chat", "embeddings"],
  catalogScope: "models",
};

const keyLimitsSchedule: ApiKeyAccessData = {
  ...keyUnrestricted,
  id: "key-limits",
  name: "Limits Key",
  allowedCombos: [],
  throttleDelayMs: 250,
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
  scopes: ["self:usage", "self:account-quota"],
  usageLimitEnabled: true,
  dailyUsageLimitUsd: 25.5,
  weeklyUsageLimitUsd: 150,
};

const keyBehaviourToggles: ApiKeyAccessData = {
  ...keyUnrestricted,
  id: "key-behaviour",
  name: "Behaviour Key",
  allowedCombos: [],
  noLog: true,
  autoResolve: true,
  isActive: false,
  throttleDelayMs: 500,
  isBanned: true,
  scopes: ["lease:exclusive", "policy:bypass-provider-quota"],
  allowedEndpoints: ["embeddings"],
  streamDefaultMode: "json",
  compressionEnabled: false,
  allowAutoCombos: false,
  catalogScope: "combos",
  disableNonPublicModels: true,
  allowUsageCommand: true,
  chaosModeEnabled: true,
};

// ── Legacy modal initial state for each fixture (literal) ──────────────────

const unrestrictedState: ApiKeyAccessFormState = {
  name: "Unrestricted Key",
  allowAll: true,
  selectedModels: [],
  blockedClaudeCodeFamilies: [],
  allowAllCombos: true,
  selectedCombos: [],
  allowAllConnections: true,
  selectedConnections: [],
  allowAllEndpoints: true,
  selectedEndpoints: [],
  noLog: false,
  autoResolve: false,
  isActive: true,
  throttleDelayMs: 0,
  isBanned: false,
  expiresAt: "",
  maxSessions: 0,
  scheduleEnabled: false,
  scheduleFrom: "08:00",
  scheduleUntil: "18:00",
  scheduleDays: [1, 2, 3, 4, 5],
  scheduleTz: LOCAL_TZ,
  rateLimits: [],
  manageEnabled: true,
  selfUsageEnabled: true,
  selfAccountQuotaEnabled: false,
  bypassProviderQuotaPolicyEnabled: false,
  streamDefaultMode: "legacy",
  compressionEnabled: true,
  allowAutoCombos: true,
  catalogScope: "all",
  disableNonPublicModels: false,
  allowUsageCommand: false,
  usageLimitEnabled: false,
  dailyUsageLimitUsd: "",
  weeklyUsageLimitUsd: "",
  chaosModeEnabled: false,
};

test("initial state matches the legacy modal: unrestricted key (combo/* means all combos)", () => {
  assert.deepEqual(createInitialFormState(keyUnrestricted), unrestrictedState);
});

test("initial state matches the legacy modal: restricted models + combos", () => {
  assert.deepEqual(createInitialFormState(keyRestrictedModelsCombos), {
    ...unrestrictedState,
    name: "Restricted Models Key",
    allowAll: false,
    selectedModels: ["openai/gpt-4o", "anthropic/*", "cc/*"],
    blockedClaudeCodeFamilies: ["haiku"],
    allowAllCombos: false,
    selectedCombos: ["smart-coding", "rt-vision"],
    autoResolve: true,
    throttleDelayMs: 100,
    expiresAt: "2026-12-31T23:59:59.000Z",
    maxSessions: 5,
    manageEnabled: false,
    allowAutoCombos: false,
    catalogScope: "combos",
    disableNonPublicModels: true,
  });
});

test("initial state matches the legacy modal: connections restricted (legacy absent model mode)", () => {
  assert.deepEqual(createInitialFormState(keyConnectionsRestricted), {
    ...unrestrictedState,
    name: "Connections Key",
    allowAll: true,
    allowAllCombos: false,
    allowAllConnections: false,
    selectedConnections: [UUID_A, UUID_B],
    allowAllEndpoints: false,
    selectedEndpoints: ["chat", "embeddings"],
    selfUsageEnabled: false,
    catalogScope: "models",
  });
});

test("initial state matches the legacy modal: limits + schedule (USD limits become strings)", () => {
  assert.deepEqual(createInitialFormState(keyLimitsSchedule), {
    ...unrestrictedState,
    name: "Limits Key",
    allowAllCombos: false,
    throttleDelayMs: 250,
    expiresAt: "2027-01-01T00:00:00.000Z",
    maxSessions: 12,
    scheduleEnabled: true,
    scheduleFrom: "09:00",
    scheduleUntil: "17:00",
    scheduleDays: [1, 2, 3, 4, 5],
    scheduleTz: "America/New_York",
    rateLimits: [
      { limit: 60, window: 60 },
      { limit: 1000, window: 3600 },
    ],
    manageEnabled: false,
    selfAccountQuotaEnabled: true,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: "25.5",
    weeklyUsageLimitUsd: "150",
  });
});

test("initial state matches the legacy modal: behaviour toggles", () => {
  assert.deepEqual(createInitialFormState(keyBehaviourToggles), {
    ...unrestrictedState,
    name: "Behaviour Key",
    allowAllCombos: false,
    noLog: true,
    autoResolve: true,
    isActive: false,
    throttleDelayMs: 500,
    isBanned: true,
    allowAllEndpoints: false,
    selectedEndpoints: ["embeddings"],
    manageEnabled: false,
    selfUsageEnabled: false,
    bypassProviderQuotaPolicyEnabled: true,
    streamDefaultMode: "json",
    compressionEnabled: false,
    allowAutoCombos: false,
    catalogScope: "combos",
    disableNonPublicModels: true,
    allowUsageCommand: true,
    chaosModeEnabled: true,
  });
});

test("initial state: allowAll follows modelAccessMode, falling back to 'empty list = all'", () => {
  const base: ApiKeyAccessData = { id: "k", name: "k" };
  assert.equal(createInitialFormState({ ...base, modelAccessMode: "restricted" }).allowAll, false);
  assert.equal(
    createInitialFormState({ ...base, modelAccessMode: "restricted", allowedModels: [] }).allowAll,
    false
  );
  assert.equal(createInitialFormState({ ...base, allowedModels: [] }).allowAll, true);
  assert.equal(createInitialFormState({ ...base, modelAccessMode: null }).allowAll, true);
  assert.equal(
    createInitialFormState({ ...base, allowedModels: ["openai/gpt-4o"] }).allowAll,
    false
  );
  assert.equal(
    createInitialFormState({ ...base, modelAccessMode: "all", allowedModels: ["openai/gpt-4o"] })
      .allowAll,
    false
  );
});

test("initial state: combo/* selects All and is dropped from the explicit combo list", () => {
  const state = createInitialFormState({
    id: "k",
    name: "k",
    allowedCombos: ["combo/*", "rt-vision"],
  });
  assert.equal(state.allowAllCombos, true);
  assert.deepEqual(state.selectedCombos, ["rt-vision"]);

  const restrictedEmpty = createInitialFormState({ id: "k", name: "k", allowedCombos: [] });
  assert.equal(restrictedEmpty.allowAllCombos, false);
  assert.deepEqual(restrictedEmpty.selectedCombos, []);
});

test("initial state: throttle and max sessions clamp non-positive values to 0 only", () => {
  const base: ApiKeyAccessData = { id: "k", name: "k" };
  assert.equal(createInitialFormState({ ...base, throttleDelayMs: -5 }).throttleDelayMs, 0);
  assert.equal(createInitialFormState({ ...base, throttleDelayMs: null }).throttleDelayMs, 0);
  // The legacy modal only clamped the upper bound at save time.
  assert.equal(
    createInitialFormState({ ...base, throttleDelayMs: 400000 }).throttleDelayMs,
    400000
  );
  assert.equal(createInitialFormState({ ...base, maxSessions: -1 }).maxSessions, 0);
  assert.equal(createInitialFormState({ ...base, maxSessions: null }).maxSessions, 0);
});

test("initial state: USD limits become strings and non-positive limits become empty", () => {
  const base: ApiKeyAccessData = { id: "k", name: "k" };
  const state = createInitialFormState({
    ...base,
    dailyUsageLimitUsd: 0,
    weeklyUsageLimitUsd: 7.25,
  });
  assert.equal(state.dailyUsageLimitUsd, "");
  assert.equal(state.weeklyUsageLimitUsd, "7.25");
  const negative = createInitialFormState({ ...base, dailyUsageLimitUsd: -3 });
  assert.equal(negative.dailyUsageLimitUsd, "");
  assert.equal(negative.weeklyUsageLimitUsd, "");
});

test("initial state: an empty connection list always opens in All mode", () => {
  const state = createInitialFormState({ id: "k", name: "k", allowedConnections: [] });
  assert.equal(state.allowAllConnections, true);
  assert.deepEqual(state.selectedConnections, []);
});

// ── PATCH bodies (literal) ─────────────────────────────────────────────────

test("PATCH body matches the legacy handler: unrestricted key", () => {
  const actual = buildApiKeyAccessPayload(createInitialFormState(keyUnrestricted), keyUnrestricted);
  assertSameBody(actual, {
    name: "Unrestricted Key",
    modelAccessMode: "all",
    connectionAccessMode: "all",
    allowedModels: [],
    blockedModels: [],
    allowedCombos: ["combo/*"],
    allowedConnections: [],
    noLog: false,
    autoResolve: false,
    isActive: true,
    throttleDelayMs: 0,
    isBanned: false,
    expiresAt: null,
    maxSessions: 0,
    accessSchedule: null,
    rateLimits: null,
    scopes: ["manage", "self:usage"],
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
  });
});

test("PATCH body matches the legacy handler: restricted models + combos", () => {
  const actual = buildApiKeyAccessPayload(
    createInitialFormState(keyRestrictedModelsCombos),
    keyRestrictedModelsCombos
  );
  assertSameBody(actual, {
    name: "Restricted Models Key",
    modelAccessMode: "restricted",
    connectionAccessMode: "all",
    allowedModels: ["openai/gpt-4o", "anthropic/*", "cc/*"],
    // Non-Claude patterns stay first; the blocked family is re-appended because cc/* is selected.
    blockedModels: ["legacy-model", "claude-haiku*", "haiku"],
    allowedCombos: ["smart-coding", "rt-vision"],
    allowedConnections: [],
    noLog: false,
    autoResolve: true,
    isActive: true,
    throttleDelayMs: 100,
    isBanned: false,
    expiresAt: "2026-12-31T23:59:59.000Z",
    maxSessions: 5,
    accessSchedule: null,
    rateLimits: null,
    scopes: ["self:usage"],
    allowedEndpoints: [],
    streamDefaultMode: "legacy",
    compressionEnabled: true,
    allowAutoCombos: false,
    catalogScope: "combos",
    disableNonPublicModels: true,
    allowUsageCommand: false,
    usageLimitEnabled: false,
    dailyUsageLimitUsd: null,
    weeklyUsageLimitUsd: null,
    chaosModeEnabled: false,
  });
});

test("PATCH body matches the legacy handler: connections restricted", () => {
  const actual = buildApiKeyAccessPayload(
    createInitialFormState(keyConnectionsRestricted),
    keyConnectionsRestricted
  );
  assertSameBody(actual, {
    name: "Connections Key",
    modelAccessMode: "all",
    connectionAccessMode: "restricted",
    allowedModels: [],
    blockedModels: [],
    allowedCombos: [],
    allowedConnections: [UUID_A, UUID_B],
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
    allowedEndpoints: ["chat", "embeddings"],
    streamDefaultMode: "legacy",
    compressionEnabled: true,
    allowAutoCombos: true,
    catalogScope: "models",
    disableNonPublicModels: false,
    allowUsageCommand: false,
    usageLimitEnabled: false,
    dailyUsageLimitUsd: null,
    weeklyUsageLimitUsd: null,
    chaosModeEnabled: false,
  });
});

test("PATCH body matches the legacy handler: limits + schedule", () => {
  const actual = buildApiKeyAccessPayload(
    createInitialFormState(keyLimitsSchedule),
    keyLimitsSchedule
  );
  assertSameBody(actual, {
    name: "Limits Key",
    modelAccessMode: "all",
    connectionAccessMode: "all",
    allowedModels: [],
    blockedModels: [],
    allowedCombos: [],
    allowedConnections: [],
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
    scopes: ["self:usage", "self:account-quota"],
    allowedEndpoints: [],
    streamDefaultMode: "legacy",
    compressionEnabled: true,
    allowAutoCombos: true,
    catalogScope: "all",
    disableNonPublicModels: false,
    allowUsageCommand: false,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 25.5,
    weeklyUsageLimitUsd: 150,
    chaosModeEnabled: false,
  });
});

test("PATCH body matches the legacy handler: behaviour toggles", () => {
  const actual = buildApiKeyAccessPayload(
    createInitialFormState(keyBehaviourToggles),
    keyBehaviourToggles
  );
  assertSameBody(actual, {
    name: "Behaviour Key",
    modelAccessMode: "all",
    connectionAccessMode: "all",
    allowedModels: [],
    blockedModels: [],
    allowedCombos: [],
    allowedConnections: [],
    noLog: true,
    autoResolve: true,
    isActive: false,
    throttleDelayMs: 500,
    isBanned: true,
    expiresAt: null,
    maxSessions: 0,
    accessSchedule: null,
    rateLimits: null,
    scopes: ["lease:exclusive", "policy:bypass-provider-quota"],
    allowedEndpoints: ["embeddings"],
    streamDefaultMode: "json",
    compressionEnabled: false,
    allowAutoCombos: false,
    catalogScope: "combos",
    disableNonPublicModels: true,
    allowUsageCommand: true,
    usageLimitEnabled: false,
    dailyUsageLimitUsd: null,
    weeklyUsageLimitUsd: null,
    chaosModeEnabled: true,
  });
});

test("PATCH body matches the legacy handler after edits (sanitize, clamp, filter, scopes)", () => {
  const state: ApiKeyAccessFormState = {
    ...createInitialFormState(keyUnrestricted),
    name: '  Renamed "key" <x> ',
    allowAll: false,
    selectedModels: ["openai/gpt-4o", "cc/*"],
    blockedClaudeCodeFamilies: ["opus", "fable"],
    allowAllCombos: false,
    selectedCombos: [],
    allowAllConnections: false,
    selectedConnections: [UUID_A, "not-a-uuid"],
    allowAllEndpoints: false,
    selectedEndpoints: ["chat"],
    noLog: true,
    throttleDelayMs: 999999,
    maxSessions: 15.8,
    scheduleEnabled: false,
    scheduleFrom: "10:00",
    manageEnabled: false,
    selfAccountQuotaEnabled: true,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: "abc",
    weeklyUsageLimitUsd: "0",
  };

  assertSameBody(buildApiKeyAccessPayload(state, keyUnrestricted), {
    name: "Renamed key x",
    modelAccessMode: "restricted",
    connectionAccessMode: "restricted",
    allowedModels: ["openai/gpt-4o", "cc/*"],
    blockedModels: ["claude-opus*", "opus", "claude-fable*", "fable"],
    // #12267: an empty restriction is persisted as-is (deny-all), never widened to combo/*.
    allowedCombos: [],
    allowedConnections: [UUID_A],
    noLog: true,
    autoResolve: false,
    isActive: true,
    throttleDelayMs: 300000,
    isBanned: false,
    expiresAt: null,
    maxSessions: 15,
    accessSchedule: null,
    rateLimits: null,
    scopes: ["self:usage", "self:account-quota"],
    allowedEndpoints: ["chat"],
    streamDefaultMode: "legacy",
    compressionEnabled: true,
    allowAutoCombos: true,
    catalogScope: "all",
    disableNonPublicModels: false,
    allowUsageCommand: false,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: null,
    weeklyUsageLimitUsd: null,
    chaosModeEnabled: false,
  });
});

test("PATCH body drops Claude Code family patterns once models are back to Allow All", () => {
  const state: ApiKeyAccessFormState = {
    ...createInitialFormState(keyRestrictedModelsCombos),
    allowAll: true,
  };
  const actual = buildApiKeyAccessPayload(state, keyRestrictedModelsCombos);
  assert.equal(actual.modelAccessMode, "all");
  assert.deepEqual(actual.allowedModels, []);
  assert.deepEqual(actual.blockedModels, ["legacy-model"]);
});

// ── Validation → tab mapping ────────────────────────────────────────────────

const echo = (key: string, values?: Record<string, unknown>) =>
  values ? `${key}:${JSON.stringify(values)}` : key;

test("validation reports each message on the tab that owns the field", () => {
  const errors = validateForm(
    {
      ...unrestrictedState,
      name: "",
      allowAll: false,
      selectedModels: Array.from({ length: 501 }, (_, i) => `provider/model-${i}`),
      allowAllConnections: false,
      selectedConnections: [],
      throttleDelayMs: 300001,
      maxSessions: -1,
      rateLimits: [{ limit: 0, window: 60 }],
    },
    echo
  );

  assert.deepEqual(errors, {
    general: ["keyNameRequired"],
    models: ['cannotSelectMoreThanModels:{"max":500}'],
    combos: [],
    connections: ["selectAtLeastOneConnection"],
    limits: ["throttleDelayRangeError", "maxSessionsNegativeError", "rateLimitPositiveError"],
    behaviour: [],
  });
});

test("validation accepts an empty combo restriction (#12267)", () => {
  const errors = validateForm({ ...unrestrictedState, allowAllCombos: false, selectedCombos: [] });
  assert.deepEqual(errors.combos, []);
  assert.equal(Object.values(errors).flat().length, 0);
});
