import { clearHealthCheckLogCache } from "@/lib/tokenHealthCheck";
import { setCustomBannedSignals } from "@omniroute/open-sse/services/accountFallback.ts";
import { isAutomatedTestProcess } from "@/shared/utils/testProcess";

type JsonRecord = Record<string, unknown>;

export type RuntimeReloadSection =
  | "payloadRules"
  | "modelAliases"
  | "backgroundDegradation"
  | "cliCompatProviders"
  | "cacheControl"
  | "usageTracking"
  | "healthCheckLogs"
  | "thoughtSignature"
  | "modelsDevSync"
  | "corsOrigins"
  | "ccBridgeTransforms"
  | "systemTransforms"
  | "authzBypass"
  | "bannedSignals";

export interface RuntimeReloadChange {
  section: RuntimeReloadSection;
  source: string;
}

interface AuthzBypassSnapshot {
  enabled: boolean;
  prefixes: string[];
}

interface RuntimeSettingsSnapshot {
  payloadRules: unknown;
  modelAliases: Record<string, string>;
  backgroundDegradation: JsonRecord | null;
  cliCompatProviders: string[];
  alwaysPreserveClientCache: string;
  antigravitySignatureCacheMode: string;
  usageTokenBuffer: unknown;
  hideHealthCheckLogs: boolean;
  modelsDevSyncEnabled: boolean;
  modelsDevSyncInterval: number | null;
  corsOrigins: string;
  ccBridgeTransforms: unknown;
  systemTransforms: unknown;
  authzBypass: AuthzBypassSnapshot;
  customBannedSignals: string[];
}

// Default bypass policy: kill-switch on, `/api/mcp/` bypassable. Mirrors the
// pre-T-011 compile-time constant so the route guard works identically before
// the first `applyRuntimeSettings` call (e.g. cold-boot requests).
const DEFAULT_AUTHZ_BYPASS_SNAPSHOT: AuthzBypassSnapshot = {
  enabled: true,
  prefixes: ["/api/mcp/"],
};

const DEFAULT_RUNTIME_SETTINGS_SNAPSHOT: RuntimeSettingsSnapshot = {
  payloadRules: null,
  modelAliases: {},
  backgroundDegradation: null,
  cliCompatProviders: [],
  alwaysPreserveClientCache: "auto",
  antigravitySignatureCacheMode: "enabled",
  usageTokenBuffer: null,
  hideHealthCheckLogs: false,
  modelsDevSyncEnabled: false,
  modelsDevSyncInterval: null,
  corsOrigins: "",
  ccBridgeTransforms: null,
  systemTransforms: null,
  authzBypass: DEFAULT_AUTHZ_BYPASS_SNAPSHOT,
  customBannedSignals: [],
};

let lastAppliedSnapshot: RuntimeSettingsSnapshot | null = null;

// Module-local mirror of the current bypass policy. Read by the route guard
// on every non-loopback hit to a LOCAL_ONLY path via `getAuthzBypassSnapshot`.
// Initialised to the default so cold-boot requests (before any
// `applyRuntimeSettings` call) behave identically to PR #2473.
let currentAuthzBypass: AuthzBypassSnapshot = DEFAULT_AUTHZ_BYPASS_SNAPSHOT;

function isTruthyEnvFlag(value: string | undefined): boolean {
  if (typeof value !== "string") return false;
  return new Set(["1", "true", "yes", "on"]).has(value.trim().toLowerCase());
}


function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function stableSerialize(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((entry) => canonicalize(entry));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value as JsonRecord)
        .sort((left, right) => left.localeCompare(right))
        .map((key) => [key, canonicalize((value as JsonRecord)[key])])
    );
  }

  return value;
}

function parseStoredJson(value: unknown, field: string): unknown {
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn(
      `[HOT_RELOAD] Failed to parse persisted settings field "${field}":`,
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(
      value
        .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
        .filter((entry) => entry.length > 0)
    )
  );
}

function normalizeStringRecord(value: unknown): Record<string, string> {
  const record = toRecord(parseStoredJson(value, "modelAliases"));
  const entries = Object.entries(record)
    .map(([key, entryValue]) => [
      key.trim(),
      typeof entryValue === "string" ? entryValue.trim() : "",
    ])
    .filter(([key, entryValue]) => key.length > 0 && entryValue.length > 0);

  return Object.fromEntries(entries);
}

function normalizeBackgroundDegradation(value: unknown): JsonRecord | null {
  const record = toRecord(parseStoredJson(value, "backgroundDegradation"));
  if (Object.keys(record).length === 0) return null;

  const degradationMap = Object.fromEntries(
    Object.entries(toRecord(record.degradationMap))
      .map(([key, entryValue]) => [
        key.trim(),
        typeof entryValue === "string" ? entryValue.trim() : "",
      ])
      .filter(([key, entryValue]) => key.length > 0 && entryValue.length > 0)
  );
  const detectionPatterns = normalizeStringArray(record.detectionPatterns);

  return {
    enabled: record.enabled === true,
    degradationMap,
    detectionPatterns,
  };
}

function normalizeNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function normalizePayloadRules(value: unknown): unknown {
  return parseStoredJson(value, "payloadRules");
}

function normalizeAuthzBypass(settings: Record<string, unknown>): AuthzBypassSnapshot {
  const enabled =
    settings.localOnlyManageScopeBypassEnabled === false
      ? false
      : settings.localOnlyManageScopeBypassEnabled === true
        ? true
        : DEFAULT_AUTHZ_BYPASS_SNAPSHOT.enabled;
  const rawPrefixes = settings.localOnlyManageScopeBypassPrefixes;
  const prefixes = Array.isArray(rawPrefixes)
    ? Array.from(
        new Set(
          rawPrefixes
            .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
            .filter((entry) => entry.length > 0 && entry.startsWith("/"))
        )
      )
    : [...DEFAULT_AUTHZ_BYPASS_SNAPSHOT.prefixes];
  return { enabled, prefixes };
}

/**
 * O(1) accessor for the current LOCAL_ONLY manage-scope bypass policy.
 *
 * Consumed by the route-guard hot path (`isLocalOnlyBypassableByManageScope`).
 * Returns the default snapshot (`{ enabled: true, prefixes: ["/api/mcp/"] }`)
 * before the first `applyRuntimeSettings` call so cold-boot requests behave
 * identically to PR #2473. Mutated only by `applyAuthzBypassSection`.
 *
 * Hot-reload latency: <50 ms (no I/O, no async, pure read of module-local
 * state). Spec §Non-Functional Requirements / Performance.
 */
export function getAuthzBypassSnapshot(): AuthzBypassSnapshot {
  return currentAuthzBypass;
}

export function buildRuntimeSettingsSnapshot(
  settings: Record<string, unknown>
): RuntimeSettingsSnapshot {
  return {
    payloadRules: normalizePayloadRules(settings.payloadRules),
    modelAliases: normalizeStringRecord(settings.modelAliases),
    backgroundDegradation: normalizeBackgroundDegradation(settings.backgroundDegradation),
    cliCompatProviders: normalizeStringArray(settings.cliCompatProviders),
    alwaysPreserveClientCache:
      typeof settings.alwaysPreserveClientCache === "string"
        ? settings.alwaysPreserveClientCache
        : DEFAULT_RUNTIME_SETTINGS_SNAPSHOT.alwaysPreserveClientCache,
    antigravitySignatureCacheMode:
      typeof settings.antigravitySignatureCacheMode === "string"
        ? settings.antigravitySignatureCacheMode
        : DEFAULT_RUNTIME_SETTINGS_SNAPSHOT.antigravitySignatureCacheMode,
    usageTokenBuffer: settings.usageTokenBuffer ?? null,
    hideHealthCheckLogs: settings.hideHealthCheckLogs === true,
    modelsDevSyncEnabled: settings.modelsDevSyncEnabled === true,
    modelsDevSyncInterval: normalizeNumber(settings.modelsDevSyncInterval),
    corsOrigins: typeof settings.corsOrigins === "string" ? settings.corsOrigins : "",
    ccBridgeTransforms: parseStoredJson(settings.ccBridgeTransforms, "ccBridgeTransforms"),
    systemTransforms: parseStoredJson(settings.systemTransforms, "systemTransforms"),
    authzBypass: normalizeAuthzBypass(settings),
    customBannedSignals: normalizeStringArray(settings.customBannedSignals),
  };
}

function getPreviousSnapshot(): RuntimeSettingsSnapshot {
  return lastAppliedSnapshot || DEFAULT_RUNTIME_SETTINGS_SNAPSHOT;
}

async function applyPayloadRulesSection(payloadRules: unknown) {
  const { clearPayloadRulesConfigOverride, setPayloadRulesConfig } =
    await import("@omniroute/open-sse/services/payloadRules.ts");

  if (payloadRules === null || payloadRules === undefined) {
    clearPayloadRulesConfigOverride();
    return;
  }

  setPayloadRulesConfig(payloadRules);
}

async function applyModelAliasesSection(modelAliases: Record<string, string>) {
  const { setCustomAliases } = await import("@omniroute/open-sse/services/modelDeprecation.ts");
  setCustomAliases(modelAliases);
}

async function applyBackgroundDegradationSection(backgroundDegradation: JsonRecord | null) {
  const { getDefaultDegradationMap, getDefaultDetectionPatterns, setBackgroundDegradationConfig } =
    await import("@omniroute/open-sse/services/backgroundTaskDetector.ts");

  if (!backgroundDegradation) {
    setBackgroundDegradationConfig({
      enabled: false,
      degradationMap: getDefaultDegradationMap(),
      detectionPatterns: getDefaultDetectionPatterns(),
    });
    return;
  }

  setBackgroundDegradationConfig({
    enabled: backgroundDegradation.enabled === true,
    degradationMap: {
      ...getDefaultDegradationMap(),
      ...normalizeStringRecord(backgroundDegradation.degradationMap),
    },
    detectionPatterns:
      normalizeStringArray(backgroundDegradation.detectionPatterns).length > 0
        ? normalizeStringArray(backgroundDegradation.detectionPatterns)
        : getDefaultDetectionPatterns(),
  });
}

async function applyCliCompatProvidersSection(cliCompatProviders: string[]) {
  const { setCliCompatProviders } = await import("@omniroute/open-sse/config/cliFingerprints");
  setCliCompatProviders(cliCompatProviders);
}

async function applyCacheControlSection() {
  const { invalidateCacheControlSettingsCache } = await import("@/lib/cacheControlSettings");
  invalidateCacheControlSettingsCache();
}

async function applyUsageTrackingSection(newBuffer: number | null) {
  const { invalidateBufferTokensCache, setBufferTokensCache } =
    await import("@omniroute/open-sse/utils/usageTracking.ts");
  if (typeof newBuffer === "number" && newBuffer >= 0) {
    // Set the value directly so the first request after a settings save gets the
    // correct count synchronously — no race window back to DEFAULT (2000).
    setBufferTokensCache(newBuffer);
  } else {
    invalidateBufferTokensCache();
  }
}

async function applyThoughtSignatureSection(mode: string) {
  const { setGeminiThoughtSignatureMode } =
    await import("@omniroute/open-sse/services/geminiThoughtSignatureStore.ts");
  setGeminiThoughtSignatureMode(mode);
}

async function applyCorsOriginsSection(corsOrigins: string) {
  const { setRuntimeAllowedOrigins } = await import("@/server/cors/origins");
  setRuntimeAllowedOrigins(corsOrigins);
}

/**
 * Legacy alias for the v2 systemTransforms config. The `ccBridgeTransforms`
 * settings field carried the single-provider shape `{ enabled, pipeline }`
 * during Phase 2 (commit e3e962db, pre-release). v2 unifies everything under
 * `systemTransforms.providers[*]`. We migrate the legacy shape into the v2
 * registry on every reload so users with persisted Phase-2 data keep working.
 *
 * `setSystemTransformsConfig` accepts both shapes and routes legacy into
 * `providers[PROVIDER_CC_BRIDGE]`.
 */
async function applyCcBridgeTransformsSection(ccBridgeTransforms: unknown) {
  const { setSystemTransformsConfig } =
    await import("@omniroute/open-sse/services/systemTransforms.ts");
  if (ccBridgeTransforms && typeof ccBridgeTransforms === "object") {
    setSystemTransformsConfig(ccBridgeTransforms);
  }
}

/**
 * Swap the in-process bypass policy. Synchronous, O(1), no I/O — the SLA
 * (<50 ms hot-reload) is structurally satisfied by this shape.
 */
function applyAuthzBypassSection(snapshot: AuthzBypassSnapshot) {
  currentAuthzBypass = { enabled: snapshot.enabled, prefixes: [...snapshot.prefixes] };
}

async function applySystemTransformsSection(systemTransforms: unknown) {
  const { setSystemTransformsConfig, resetSystemTransformsConfig } =
    await import("@omniroute/open-sse/services/systemTransforms.ts");

  if (
    systemTransforms === null ||
    systemTransforms === undefined ||
    typeof systemTransforms !== "object"
  ) {
    resetSystemTransformsConfig();
    return;
  }

  setSystemTransformsConfig(systemTransforms);
}

async function applyModelsDevSyncSection(
  previousSnapshot: RuntimeSettingsSnapshot,
  currentSnapshot: RuntimeSettingsSnapshot,
  force: boolean
) {
  const { startPeriodicSync, stopPeriodicSync } = await import("@/lib/modelsDevSync");
  const skipBackgroundSyncInTests =
    (isAutomatedTestProcess() && process.env.OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS !== "1") ||
    isTruthyEnvFlag(process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES);

  if (skipBackgroundSyncInTests) {
    stopPeriodicSync();
    return;
  }

  const wasEnabled = previousSnapshot.modelsDevSyncEnabled === true;
  const isEnabled = currentSnapshot.modelsDevSyncEnabled === true;
  const intervalChanged =
    previousSnapshot.modelsDevSyncInterval !== currentSnapshot.modelsDevSyncInterval;

  if (!isEnabled) {
    if (wasEnabled || force) {
      stopPeriodicSync();
    }
    return;
  }

  if (force) {
    stopPeriodicSync();
    startPeriodicSync(currentSnapshot.modelsDevSyncInterval || undefined);
    return;
  }

  if (!wasEnabled) {
    startPeriodicSync(currentSnapshot.modelsDevSyncInterval || undefined);
    return;
  }

  if (intervalChanged) {
    stopPeriodicSync();
    startPeriodicSync(currentSnapshot.modelsDevSyncInterval || undefined);
  }
}

export async function applyRuntimeSettings(
  settings: Record<string, unknown>,
  options: { force?: boolean; source?: string } = {}
): Promise<RuntimeReloadChange[]> {
  const source = options.source || "runtime";
  const force = options.force === true;
  const hasBootstrappedSnapshot = lastAppliedSnapshot !== null;
  const currentSnapshot = buildRuntimeSettingsSnapshot(settings);
  const previousSnapshot = getPreviousSnapshot();
  const changes: RuntimeReloadChange[] = [];

  const markChanged = (section: RuntimeReloadSection) => {
    changes.push({ section, source });
  };

  const hasChanged = <T>(currentValue: T, previousValue: T) =>
    stableSerialize(currentValue) !== stableSerialize(previousValue);

  if (force || hasChanged(currentSnapshot.payloadRules, previousSnapshot.payloadRules)) {
    await applyPayloadRulesSection(currentSnapshot.payloadRules);
    markChanged("payloadRules");
  }

  if (force || hasChanged(currentSnapshot.modelAliases, previousSnapshot.modelAliases)) {
    await applyModelAliasesSection(currentSnapshot.modelAliases);
    markChanged("modelAliases");
  }

  if (
    force ||
    hasChanged(currentSnapshot.backgroundDegradation, previousSnapshot.backgroundDegradation)
  ) {
    await applyBackgroundDegradationSection(currentSnapshot.backgroundDegradation);
    markChanged("backgroundDegradation");
  }

  if (
    force ||
    hasChanged(currentSnapshot.cliCompatProviders, previousSnapshot.cliCompatProviders)
  ) {
    await applyCliCompatProvidersSection(currentSnapshot.cliCompatProviders);
    markChanged("cliCompatProviders");
  }

  if (
    force ||
    hasChanged(
      currentSnapshot.alwaysPreserveClientCache,
      previousSnapshot.alwaysPreserveClientCache
    )
  ) {
    await applyCacheControlSection();
    markChanged("cacheControl");
  }

  if (force || hasChanged(currentSnapshot.usageTokenBuffer, previousSnapshot.usageTokenBuffer)) {
    const newBuffer =
      typeof currentSnapshot.usageTokenBuffer === "number"
        ? currentSnapshot.usageTokenBuffer
        : null;
    await applyUsageTrackingSection(newBuffer);
    markChanged("usageTracking");
  }

  if (force || currentSnapshot.hideHealthCheckLogs !== previousSnapshot.hideHealthCheckLogs) {
    clearHealthCheckLogCache();
    markChanged("healthCheckLogs");
  }

  if (
    force ||
    hasChanged(
      currentSnapshot.antigravitySignatureCacheMode,
      previousSnapshot.antigravitySignatureCacheMode
    )
  ) {
    await applyThoughtSignatureSection(currentSnapshot.antigravitySignatureCacheMode);
    markChanged("thoughtSignature");
  }

  if (
    force ||
    (hasBootstrappedSnapshot &&
      (currentSnapshot.modelsDevSyncEnabled !== previousSnapshot.modelsDevSyncEnabled ||
        currentSnapshot.modelsDevSyncInterval !== previousSnapshot.modelsDevSyncInterval))
  ) {
    await applyModelsDevSyncSection(previousSnapshot, currentSnapshot, force);
    markChanged("modelsDevSync");
  }

  if (force || hasChanged(currentSnapshot.corsOrigins, previousSnapshot.corsOrigins)) {
    await applyCorsOriginsSection(currentSnapshot.corsOrigins);
    markChanged("corsOrigins");
  }

  if (
    force ||
    hasChanged(currentSnapshot.ccBridgeTransforms, previousSnapshot.ccBridgeTransforms)
  ) {
    await applyCcBridgeTransformsSection(currentSnapshot.ccBridgeTransforms);
    markChanged("ccBridgeTransforms");
  }

  if (force || hasChanged(currentSnapshot.systemTransforms, previousSnapshot.systemTransforms)) {
    await applySystemTransformsSection(currentSnapshot.systemTransforms);
    markChanged("systemTransforms");
  }

  if (force || hasChanged(currentSnapshot.authzBypass, previousSnapshot.authzBypass)) {
    applyAuthzBypassSection(currentSnapshot.authzBypass);
    markChanged("authzBypass");
  }

  if (
    force ||
    hasChanged(currentSnapshot.customBannedSignals, previousSnapshot.customBannedSignals)
  ) {
    setCustomBannedSignals(currentSnapshot.customBannedSignals);
    markChanged("bannedSignals");
  }

  lastAppliedSnapshot = currentSnapshot;
  return changes;
}

export function resetRuntimeSettingsStateForTests() {
  lastAppliedSnapshot = null;
  currentAuthzBypass = DEFAULT_AUTHZ_BYPASS_SNAPSHOT;
}
