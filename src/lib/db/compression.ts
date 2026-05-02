import { backupDbFile } from "./backup";
import { getDbInstance } from "./core";
import { invalidateDbCache } from "./readCache";
import {
  DEFAULT_AGGRESSIVE_CONFIG,
  DEFAULT_CAVEMAN_CONFIG,
  DEFAULT_COMPRESSION_CONFIG,
  DEFAULT_ULTRA_CONFIG,
  type AggressiveConfig,
  type CavemanConfig,
  type CompressionConfig,
  type CompressionMode,
  type UltraConfig,
} from "@omniroute/open-sse/services/compression/types.ts";

const NAMESPACE = "compression";
const COMPRESSION_MODES = new Set<CompressionMode>([
  "off",
  "lite",
  "standard",
  "aggressive",
  "ultra",
]);

type JsonRecord = Record<string, unknown>;
type DbInstance = ReturnType<typeof getDbInstance>;

// TTL cache for compression settings (5s)
let compressionSettingsCache: {
  value: CompressionConfig;
  expiresAt: number;
  db: DbInstance;
} | null = null;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

function parseJsonSafe(raw: string | null): unknown {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function normalizeCavemanConfig(value: unknown): CavemanConfig {
  const record = toRecord(value);
  return {
    ...DEFAULT_CAVEMAN_CONFIG,
    ...record,
    compressRoles: Array.isArray(record.compressRoles)
      ? record.compressRoles.filter(
          (role): role is "user" | "assistant" | "system" =>
            role === "user" || role === "assistant" || role === "system"
        )
      : DEFAULT_CAVEMAN_CONFIG.compressRoles,
    skipRules: Array.isArray(record.skipRules)
      ? record.skipRules.filter((rule): rule is string => typeof rule === "string")
      : DEFAULT_CAVEMAN_CONFIG.skipRules,
    minMessageLength:
      typeof record.minMessageLength === "number" && Number.isFinite(record.minMessageLength)
        ? Math.max(0, Math.floor(record.minMessageLength))
        : DEFAULT_CAVEMAN_CONFIG.minMessageLength,
    preservePatterns: Array.isArray(record.preservePatterns)
      ? record.preservePatterns.filter((pattern): pattern is string => typeof pattern === "string")
      : DEFAULT_CAVEMAN_CONFIG.preservePatterns,
  };
}

function boundedInt(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

function boundedNumber(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function normalizeAggressiveConfig(value: unknown): AggressiveConfig {
  const record = toRecord(value);
  const thresholds = toRecord(record.thresholds);
  const toolStrategies = toRecord(record.toolStrategies);

  return {
    ...DEFAULT_AGGRESSIVE_CONFIG,
    thresholds: {
      fullSummary: boundedInt(
        thresholds.fullSummary,
        DEFAULT_AGGRESSIVE_CONFIG.thresholds.fullSummary,
        1,
        100
      ),
      moderate: boundedInt(
        thresholds.moderate,
        DEFAULT_AGGRESSIVE_CONFIG.thresholds.moderate,
        1,
        100
      ),
      light: boundedInt(thresholds.light, DEFAULT_AGGRESSIVE_CONFIG.thresholds.light, 1, 100),
      verbatim: boundedInt(
        thresholds.verbatim,
        DEFAULT_AGGRESSIVE_CONFIG.thresholds.verbatim,
        1,
        100
      ),
    },
    toolStrategies: {
      fileContent:
        typeof toolStrategies.fileContent === "boolean"
          ? toolStrategies.fileContent
          : DEFAULT_AGGRESSIVE_CONFIG.toolStrategies.fileContent,
      grepSearch:
        typeof toolStrategies.grepSearch === "boolean"
          ? toolStrategies.grepSearch
          : DEFAULT_AGGRESSIVE_CONFIG.toolStrategies.grepSearch,
      shellOutput:
        typeof toolStrategies.shellOutput === "boolean"
          ? toolStrategies.shellOutput
          : DEFAULT_AGGRESSIVE_CONFIG.toolStrategies.shellOutput,
      json:
        typeof toolStrategies.json === "boolean"
          ? toolStrategies.json
          : DEFAULT_AGGRESSIVE_CONFIG.toolStrategies.json,
      errorMessage:
        typeof toolStrategies.errorMessage === "boolean"
          ? toolStrategies.errorMessage
          : DEFAULT_AGGRESSIVE_CONFIG.toolStrategies.errorMessage,
    },
    summarizerEnabled:
      typeof record.summarizerEnabled === "boolean"
        ? record.summarizerEnabled
        : DEFAULT_AGGRESSIVE_CONFIG.summarizerEnabled,
    maxTokensPerMessage: boundedInt(
      record.maxTokensPerMessage,
      DEFAULT_AGGRESSIVE_CONFIG.maxTokensPerMessage,
      256,
      32768
    ),
    minSavingsThreshold: boundedNumber(
      record.minSavingsThreshold,
      DEFAULT_AGGRESSIVE_CONFIG.minSavingsThreshold,
      0,
      1
    ),
  };
}

function normalizeUltraConfig(value: unknown): UltraConfig {
  const record = toRecord(value);
  const modelPath = typeof record.modelPath === "string" ? record.modelPath.trim() : "";

  return {
    ...DEFAULT_ULTRA_CONFIG,
    enabled: typeof record.enabled === "boolean" ? record.enabled : DEFAULT_ULTRA_CONFIG.enabled,
    compressionRate: boundedNumber(
      record.compressionRate,
      DEFAULT_ULTRA_CONFIG.compressionRate,
      0,
      1
    ),
    minScoreThreshold: boundedNumber(
      record.minScoreThreshold,
      DEFAULT_ULTRA_CONFIG.minScoreThreshold,
      0,
      1
    ),
    slmFallbackToAggressive:
      typeof record.slmFallbackToAggressive === "boolean"
        ? record.slmFallbackToAggressive
        : DEFAULT_ULTRA_CONFIG.slmFallbackToAggressive,
    ...(modelPath ? { modelPath } : {}),
    maxTokensPerMessage: boundedInt(
      record.maxTokensPerMessage,
      DEFAULT_ULTRA_CONFIG.maxTokensPerMessage,
      0,
      32768
    ),
  };
}

export async function getCompressionSettings(): Promise<CompressionConfig> {
  const db = getDbInstance();
  if (
    compressionSettingsCache &&
    compressionSettingsCache.db === db &&
    Date.now() < compressionSettingsCache.expiresAt
  ) {
    return compressionSettingsCache.value;
  }

  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = ?").all(NAMESPACE);

  const config: CompressionConfig = {
    ...DEFAULT_COMPRESSION_CONFIG,
    cavemanConfig: { ...DEFAULT_CAVEMAN_CONFIG },
    aggressive: normalizeAggressiveConfig(undefined),
    ultra: normalizeUltraConfig(undefined),
  };

  for (const row of rows) {
    const record = toRecord(row);
    const key = typeof record.key === "string" ? record.key : null;
    const rawValue = typeof record.value === "string" ? record.value : null;
    if (!key || rawValue === null) continue;
    const parsed = parseJsonSafe(rawValue);
    if (parsed === undefined) continue;

    switch (key) {
      case "enabled":
        config.enabled = parsed === true;
        break;
      case "defaultMode":
        if (typeof parsed === "string" && COMPRESSION_MODES.has(parsed as CompressionMode)) {
          config.defaultMode = parsed as CompressionMode;
        }
        break;
      case "autoTriggerTokens":
        config.autoTriggerTokens =
          typeof parsed === "number" && Number.isFinite(parsed)
            ? Math.max(0, Math.floor(parsed))
            : 0;
        break;
      case "cacheMinutes":
        config.cacheMinutes =
          typeof parsed === "number" && Number.isFinite(parsed)
            ? Math.max(1, Math.floor(parsed))
            : DEFAULT_COMPRESSION_CONFIG.cacheMinutes;
        break;
      case "preserveSystemPrompt":
        config.preserveSystemPrompt = parsed !== false;
        break;
      case "comboOverrides":
        if (parsed && typeof parsed === "object") {
          const overrides: Record<string, CompressionMode> = {};
          for (const [comboId, mode] of Object.entries(parsed as Record<string, unknown>)) {
            if (typeof mode === "string" && COMPRESSION_MODES.has(mode as CompressionMode)) {
              overrides[comboId] = mode as CompressionMode;
            }
          }
          config.comboOverrides = overrides;
        }
        break;
      case "cavemanConfig":
        config.cavemanConfig = normalizeCavemanConfig(parsed);
        break;
      case "aggressive":
      case "aggressiveConfig":
        config.aggressive = normalizeAggressiveConfig(parsed);
        break;
      case "ultra":
      case "ultraConfig":
        config.ultra = normalizeUltraConfig(parsed);
        break;
    }
  }

  // Store in TTL cache (5s expiry)
  compressionSettingsCache = {
    value: config,
    expiresAt: Date.now() + 5000,
    db,
  };

  return config;
}

export async function updateCompressionSettings(
  updates: Partial<CompressionConfig>
): Promise<CompressionConfig> {
  const db = getDbInstance();

  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );

  db.exec("BEGIN");

  try {
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined) continue;
      insert.run(NAMESPACE, key, JSON.stringify(value));
    }

    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }

  backupDbFile("pre-write");
  compressionSettingsCache = null;
  invalidateDbCache();

  return getCompressionSettings();
}

export function getDefaultAggressiveConfig(): AggressiveConfig {
  return {
    ...DEFAULT_AGGRESSIVE_CONFIG,
    thresholds: { ...DEFAULT_AGGRESSIVE_CONFIG.thresholds },
    toolStrategies: { ...DEFAULT_AGGRESSIVE_CONFIG.toolStrategies },
  };
}

export function getDefaultUltraConfig(): UltraConfig {
  return { ...DEFAULT_ULTRA_CONFIG };
}
