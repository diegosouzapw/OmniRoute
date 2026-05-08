import { clearHealthCheckLogCache } from "@/lib/tokenHealthCheck";

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
  | "corsOrigins";

export interface RuntimeReloadChange {
  section: RuntimeReloadSection;
  source: string;
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
}

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
};

let lastAppliedSnapshot: RuntimeSettingsSnapshot | null = null;

function isTruthyEnvFlag(value: string | undefined): boolean {
  if (typeof value !== "string") return false;
  return new Set(["1", "true", "yes", "on"]).has(value.trim().toLowerCase());
}

function isAutomatedTestProcess(): boolean {
  return (
    typeof process !== "undefined" &&
    (process.env.NODE_ENV === "test" ||
      process.env.VITEST !== undefined ||
      process.argv.some((arg) => arg.includes("test")))
  );
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

async function applyUsageTrackingSection() {
  const { invalidateBufferTokensCache } =
    await import("@omniroute/open-sse/utils/usageTracking.ts");
  invalidateBufferTokensCache();
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
    await applyUsageTrackingSection();
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

  lastAppliedSnapshot = currentSnapshot;
  return changes;
}

export function getLastAppliedRuntimeSettingsSnapshotForTests() {
  return lastAppliedSnapshot;
}

export function resetRuntimeSettingsStateForTests() {
  lastAppliedSnapshot = null;
}
