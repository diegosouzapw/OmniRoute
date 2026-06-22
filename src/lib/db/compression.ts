import { backupDbFile } from "./backup";
import { getDefaultCompressionCombo } from "./compressionCombos";
import { getDbInstance } from "./core";
import { invalidateDbCache } from "./readCache";
import {
  ENGINE_IDS,
  DEFAULT_AGGRESSIVE_CONFIG,
  DEFAULT_CAVEMAN_CONFIG,
  DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG,
  DEFAULT_COMPRESSION_LANGUAGE_CONFIG,
  DEFAULT_COMPRESSION_CONFIG,
  DEFAULT_CONTEXT_EDITING_CONFIG,
  DEFAULT_MCP_ACCESSIBILITY_CONFIG,
  DEFAULT_RTK_CONFIG,
  DEFAULT_ULTRA_CONFIG,
  clampMcpAccessibilityConfig,
  type AggressiveConfig,
  type CavemanConfig,
  type CavemanOutputModeConfig,
  type OutputStyleSelectionEntry,
  type CompressionLanguageConfig,
  type CompressionPipelineStep,
  type CompressionConfig,
  type CompressionMode,
  type ContextEditingConfig,
  type EngineToggle,
  type McpAccessibilityConfig,
  type RtkConfig,
  type UltraConfig,
} from "@omniroute/open-sse/services/compression/types.ts";
import { maybePrewarmUltraSlmOnConfig } from "@omniroute/open-sse/services/compression/ultra.ts";

const NAMESPACE = "compression";
const COMPRESSION_MODES = new Set<CompressionMode>([
  "off",
  "lite",
  "standard",
  "aggressive",
  "ultra",
  "rtk",
  "stacked",
]);

type JsonRecord = Record<string, unknown>;
// TTL cache for compression settings (5s)
let compressionSettingsCache: {
  value: CompressionConfig;
  expiresAt: number;
  dbRef: WeakRef<object>;
} | null = null;

// Phase 4 (B): one cold-start SLM pre-warm attempt per process. The save path fires
// on every enable transition; this guard keeps the read path from re-warming on every
// cache miss (the read path runs at most once per 5s, but a cold start should warm once,
// not repeatedly). Best-effort either way (`maybePrewarmUltraSlmOnConfig` never throws).
let _ultraSlmColdPrewarmAttempted = false;

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
  const intensity =
    record.intensity === "lite" || record.intensity === "full" || record.intensity === "ultra"
      ? record.intensity
      : DEFAULT_CAVEMAN_CONFIG.intensity;
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
    intensity,
  };
}

function normalizeCavemanOutputModeConfig(value: unknown): CavemanOutputModeConfig {
  const record = toRecord(value);
  return {
    ...DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG,
    enabled:
      typeof record.enabled === "boolean"
        ? record.enabled
        : DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG.enabled,
    intensity:
      record.intensity === "lite" || record.intensity === "full" || record.intensity === "ultra"
        ? record.intensity
        : DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG.intensity,
    autoClarity:
      typeof record.autoClarity === "boolean"
        ? record.autoClarity
        : DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG.autoClarity,
  };
}

function normalizeOutputStyleSelection(value: unknown): OutputStyleSelectionEntry[] {
  if (!Array.isArray(value)) return [];
  const out: OutputStyleSelectionEntry[] = [];
  for (const raw of value) {
    const record = toRecord(raw);
    const id = typeof record.id === "string" ? record.id.trim() : "";
    const level =
      record.level === "lite" || record.level === "full" || record.level === "ultra"
        ? record.level
        : null;
    if (id && level) out.push({ id, level });
  }
  return out;
}

function normalizeRtkConfig(value: unknown): RtkConfig {
  const record = toRecord(value);
  return {
    ...DEFAULT_RTK_CONFIG,
    enabled: typeof record.enabled === "boolean" ? record.enabled : DEFAULT_RTK_CONFIG.enabled,
    intensity:
      record.intensity === "minimal" ||
      record.intensity === "standard" ||
      record.intensity === "aggressive"
        ? record.intensity
        : DEFAULT_RTK_CONFIG.intensity,
    applyToToolResults:
      typeof record.applyToToolResults === "boolean"
        ? record.applyToToolResults
        : DEFAULT_RTK_CONFIG.applyToToolResults,
    applyToCodeBlocks:
      typeof record.applyToCodeBlocks === "boolean"
        ? record.applyToCodeBlocks
        : DEFAULT_RTK_CONFIG.applyToCodeBlocks,
    applyToAssistantMessages:
      typeof record.applyToAssistantMessages === "boolean"
        ? record.applyToAssistantMessages
        : DEFAULT_RTK_CONFIG.applyToAssistantMessages,
    enabledFilters: Array.isArray(record.enabledFilters)
      ? record.enabledFilters.filter((filter): filter is string => typeof filter === "string")
      : DEFAULT_RTK_CONFIG.enabledFilters,
    disabledFilters: Array.isArray(record.disabledFilters)
      ? record.disabledFilters.filter((filter): filter is string => typeof filter === "string")
      : DEFAULT_RTK_CONFIG.disabledFilters,
    maxLinesPerResult: boundedInt(
      record.maxLinesPerResult,
      DEFAULT_RTK_CONFIG.maxLinesPerResult,
      0,
      100000
    ),
    maxCharsPerResult: boundedInt(
      record.maxCharsPerResult,
      DEFAULT_RTK_CONFIG.maxCharsPerResult,
      0,
      1000000
    ),
    deduplicateThreshold: boundedInt(
      record.deduplicateThreshold,
      DEFAULT_RTK_CONFIG.deduplicateThreshold,
      2,
      100
    ),
    customFiltersEnabled:
      typeof record.customFiltersEnabled === "boolean"
        ? record.customFiltersEnabled
        : DEFAULT_RTK_CONFIG.customFiltersEnabled,
    trustProjectFilters:
      typeof record.trustProjectFilters === "boolean"
        ? record.trustProjectFilters
        : DEFAULT_RTK_CONFIG.trustProjectFilters,
    rawOutputRetention:
      record.rawOutputRetention === "never" ||
      record.rawOutputRetention === "failures" ||
      record.rawOutputRetention === "always"
        ? record.rawOutputRetention
        : DEFAULT_RTK_CONFIG.rawOutputRetention,
    rawOutputMaxBytes: boundedInt(
      record.rawOutputMaxBytes,
      DEFAULT_RTK_CONFIG.rawOutputMaxBytes,
      1024,
      10_000_000
    ),
    enableGrouping:
      typeof record.enableGrouping === "boolean"
        ? record.enableGrouping
        : (DEFAULT_RTK_CONFIG.enableGrouping ?? false),
    groupingThreshold: boundedInt(
      record.groupingThreshold,
      DEFAULT_RTK_CONFIG.groupingThreshold ?? 3,
      2,
      100
    ),
    stripCodeComments:
      typeof record.stripCodeComments === "boolean"
        ? record.stripCodeComments
        : (DEFAULT_RTK_CONFIG.stripCodeComments ?? false),
    preserveDocstrings:
      typeof record.preserveDocstrings === "boolean"
        ? record.preserveDocstrings
        : (DEFAULT_RTK_CONFIG.preserveDocstrings ?? true),
  };
}

function normalizeLanguageConfig(value: unknown): CompressionLanguageConfig {
  const record = toRecord(value);
  const defaultLanguage =
    typeof record.defaultLanguage === "string" && record.defaultLanguage.trim()
      ? record.defaultLanguage.trim()
      : DEFAULT_COMPRESSION_LANGUAGE_CONFIG.defaultLanguage;
  const enabledPacks = Array.isArray(record.enabledPacks)
    ? record.enabledPacks
        .filter((pack): pack is string => typeof pack === "string" && pack.trim().length > 0)
        .map((pack) => pack.trim())
    : DEFAULT_COMPRESSION_LANGUAGE_CONFIG.enabledPacks;
  return {
    ...DEFAULT_COMPRESSION_LANGUAGE_CONFIG,
    enabled:
      typeof record.enabled === "boolean"
        ? record.enabled
        : DEFAULT_COMPRESSION_LANGUAGE_CONFIG.enabled,
    defaultLanguage,
    autoDetect:
      typeof record.autoDetect === "boolean"
        ? record.autoDetect
        : DEFAULT_COMPRESSION_LANGUAGE_CONFIG.autoDetect,
    enabledPacks: [...new Set(enabledPacks.length > 0 ? enabledPacks : ["en"])],
  };
}

function normalizeContextEditingConfig(value: unknown): ContextEditingConfig {
  const record = toRecord(value);
  return {
    ...DEFAULT_CONTEXT_EDITING_CONFIG,
    enabled:
      typeof record.enabled === "boolean" ? record.enabled : DEFAULT_CONTEXT_EDITING_CONFIG.enabled,
  };
}

// Engines allowed in the global stackedPipeline setting. MUST stay in sync with the
// compression-combo KNOWN_ENGINE_IDS (src/lib/db/compressionCombos.ts) — otherwise the
// global setting silently strips engines the combo path accepts (B-PIPELINE-DIVERGENCE).
const STACKED_PIPELINE_ENGINE_IDS = new Set([
  "lite",
  "caveman",
  "aggressive",
  "ultra",
  "rtk",
  "headroom",
  "session-dedup",
  "ccr",
  "llmlingua",
]);

export function normalizeStackedPipeline(value: unknown): CompressionPipelineStep[] {
  const source = Array.isArray(value) ? value : (DEFAULT_COMPRESSION_CONFIG.stackedPipeline ?? []);
  const pipeline: CompressionPipelineStep[] = [];
  for (const entry of source) {
    const record = toRecord(entry);
    const engine = record.engine;
    if (typeof engine !== "string" || !STACKED_PIPELINE_ENGINE_IDS.has(engine)) {
      continue;
    }
    pipeline.push({
      engine: engine as CompressionPipelineStep["engine"],
      ...(typeof record.intensity === "string"
        ? { intensity: record.intensity as CompressionPipelineStep["intensity"] }
        : {}),
      ...(record.config && typeof record.config === "object"
        ? { config: record.config as Record<string, unknown> }
        : {}),
    });
  }
  return pipeline.length > 0 ? pipeline : (DEFAULT_COMPRESSION_CONFIG.stackedPipeline ?? []);
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

// Single-mode → engine id mapping. Mirrors deriveDefaultPlan's SINGLE_MODE_OF: a legacy
// install whose only signal is `defaultMode` should turn on the engine that mode runs, so the
// derived engines map matches the old behavior. Keep conservative — these are the only modes
// that map 1:1 to a single engine.
const SINGLE_MODE_ENGINE: Partial<Record<CompressionMode, string>> = {
  lite: "lite",
  standard: "caveman",
  aggressive: "aggressive",
  ultra: "ultra",
  rtk: "rtk",
};

function normalizeEngineToggle(value: unknown): EngineToggle | null {
  const record = toRecord(value);
  if (typeof record.enabled !== "boolean") return null;
  return {
    enabled: record.enabled,
    ...(typeof record.level === "string" ? { level: record.level } : {}),
  };
}

// Sanitize an engines map for persistence: keep only known engine ids with a well-formed
// `{enabled, level?}` toggle. Mirrors the read-path validation so a malformed write can't poison
// the stored row.
function sanitizeEnginesForWrite(value: unknown): Record<string, EngineToggle> {
  const record = toRecord(value);
  const out: Record<string, EngineToggle> = {};
  for (const id of ENGINE_IDS) {
    const toggle = normalizeEngineToggle(record[id]);
    if (toggle) out[id] = toggle;
  }
  return out;
}

// Read the stored `engines` JSON row, keeping only well-formed `{enabled, level?}` entries for
// known engine ids. Returns null when no usable row exists so the caller falls back to deriving
// the map from the legacy fields (B-backfill, migration 102).
function parseStoredEnginesMap(value: unknown): Record<string, EngineToggle> | null {
  if (!value || typeof value !== "object") return null;
  const out: Record<string, EngineToggle> = {};
  let any = false;
  for (const id of ENGINE_IDS) {
    const toggle = normalizeEngineToggle((value as JsonRecord)[id]);
    if (toggle) {
      out[id] = toggle;
      any = true;
    }
  }
  return any ? out : null;
}

// Derive the per-engine toggle map from the legacy compression fields so existing installs keep
// their behavior before they ever write an `engines` row. Single-engine modes (caveman/rtk/ultra/
// aggressive) come from their dedicated config blocks; structural engines (lite/headroom/
// session-dedup/ccr/llmlingua) come from the default-combo pipeline. `defaultMode` is a last-resort
// signal that turns on its single-mode engine when nothing else already did.
function deriveEnginesMap(config: CompressionConfig): Record<string, EngineToggle> {
  let defaultComboEngines = new Set<string>();
  try {
    const combo = getDefaultCompressionCombo();
    if (combo) {
      defaultComboEngines = new Set(combo.pipeline.map((step) => step.engine));
    }
  } catch {
    defaultComboEngines = new Set<string>();
  }

  const engines: Record<string, EngineToggle> = {};
  for (const id of ENGINE_IDS) {
    let enabled = false;
    let level: string | undefined;
    switch (id) {
      case "caveman":
        enabled = config.cavemanConfig?.enabled === true;
        if (typeof config.cavemanConfig?.intensity === "string") {
          level = config.cavemanConfig.intensity;
        }
        break;
      case "rtk":
        enabled = config.rtkConfig?.enabled === true;
        if (typeof config.rtkConfig?.intensity === "string") {
          level = config.rtkConfig.intensity;
        }
        break;
      case "ultra":
        enabled = config.ultra?.enabled === true;
        break;
      case "aggressive":
        enabled = aggressiveEnabled(config.aggressive);
        break;
      default:
        // Structural engines (lite/headroom/session-dedup/ccr/llmlingua): on when present in the
        // default-combo pipeline.
        enabled = defaultComboEngines.has(id);
        break;
    }
    engines[id] = { enabled, ...(level !== undefined ? { level } : {}) };
  }

  // Last-resort defaultMode signal: if the legacy install only set defaultMode (no engine config),
  // turn on the engine that mode actually ran so the derived default matches the old behavior.
  const fallbackEngine = SINGLE_MODE_ENGINE[config.defaultMode];
  if (fallbackEngine && engines[fallbackEngine] && !engines[fallbackEngine].enabled) {
    engines[fallbackEngine] = { ...engines[fallbackEngine], enabled: true };
  }

  return engines;
}

// `aggressive` config doesn't carry a top-level `enabled` flag in its type, but legacy installs may
// have stored one. Read it defensively for the derived engines map.
function aggressiveEnabled(value: AggressiveConfig | undefined): boolean {
  return toRecord(value).enabled === true;
}

export async function getCompressionSettings(): Promise<CompressionConfig> {
  const db = getDbInstance();
  if (
    compressionSettingsCache &&
    Date.now() < compressionSettingsCache.expiresAt &&
    compressionSettingsCache.dbRef.deref() === db
  ) {
    return compressionSettingsCache.value;
  }
  compressionSettingsCache = null;

  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = ?").all(NAMESPACE);

  const config: CompressionConfig = {
    ...DEFAULT_COMPRESSION_CONFIG,
    cavemanConfig: { ...DEFAULT_CAVEMAN_CONFIG },
    cavemanOutputMode: { ...DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG },
    outputStyles: [],
    rtkConfig: { ...DEFAULT_RTK_CONFIG },
    languageConfig: { ...DEFAULT_COMPRESSION_LANGUAGE_CONFIG },
    stackedPipeline: normalizeStackedPipeline(undefined),
    aggressive: normalizeAggressiveConfig(undefined),
    ultra: normalizeUltraConfig(undefined),
    contextEditing: { ...DEFAULT_CONTEXT_EDITING_CONFIG },
    engines: {},
    activeComboId: null,
  };

  // Tracks whether a usable stored `engines` row was found. When absent (pre-migration-102 install)
  // we derive the engines map from the legacy fields below so behavior is preserved.
  let storedEngines: Record<string, EngineToggle> | null = null;

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
      case "autoTriggerMode":
        if (typeof parsed === "string" && COMPRESSION_MODES.has(parsed as CompressionMode)) {
          config.autoTriggerMode = parsed as CompressionMode;
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
      case "mcpDescriptionCompressionEnabled":
        config.mcpDescriptionCompressionEnabled = parsed !== false;
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
      case "compressionComboId":
        config.compressionComboId =
          typeof parsed === "string" && parsed.trim() ? parsed.trim() : null;
        break;
      case "stackedPipeline":
        config.stackedPipeline = normalizeStackedPipeline(parsed);
        break;
      case "cavemanConfig":
        config.cavemanConfig = normalizeCavemanConfig(parsed);
        break;
      case "cavemanOutputMode":
        config.cavemanOutputMode = normalizeCavemanOutputModeConfig(parsed);
        break;
      case "outputStyles":
        config.outputStyles = normalizeOutputStyleSelection(parsed);
        break;
      case "rtkConfig":
        config.rtkConfig = normalizeRtkConfig(parsed);
        break;
      case "languageConfig":
        config.languageConfig = normalizeLanguageConfig(parsed);
        break;
      case "aggressive":
      case "aggressiveConfig":
        config.aggressive = normalizeAggressiveConfig(parsed);
        break;
      case "ultra":
      case "ultraConfig":
        config.ultra = normalizeUltraConfig(parsed);
        break;
      case "contextEditing":
        config.contextEditing = normalizeContextEditingConfig(parsed);
        break;
      case "engines":
        storedEngines = parseStoredEnginesMap(parsed);
        break;
      case "activeComboId":
        config.activeComboId =
          typeof parsed === "string" && parsed.trim() ? parsed.trim() : null;
        break;
      case "ultraEngine":
        // Phase 4 (B): SLM tier selector. Only the two known values; anything else
        // falls back to the heuristic default so a malformed row can never enable SLM.
        config.ultraEngine = parsed === "slm" ? "slm" : "heuristic";
        break;
      case "ultraSlmPrewarm":
        config.ultraSlmPrewarm = parsed === true;
        break;
    }
  }

  // Engines map: prefer the stored row; otherwise derive from the legacy fields (migration 102
  // backfill on the read path). Always fill EVERY id in ENGINE_IDS so the shape matches
  // DEFAULT_COMPRESSION_CONFIG.
  const derived = storedEngines ?? deriveEnginesMap(config);
  const engines: Record<string, EngineToggle> = {};
  for (const id of ENGINE_IDS) {
    engines[id] = derived[id] ?? { enabled: false };
  }
  config.engines = engines;
  // Runtime-only marker: dispatch trusts the engines map only when it was explicitly stored
  // (panel-saved). A backfilled map (no stored row) is display-only — dispatch stays on the
  // legacy defaultMode/default-combo path so existing installs keep their behaviour.
  config.enginesExplicit = storedEngines !== null;

  // Store in TTL cache (5s expiry)
  compressionSettingsCache = {
    value: config,
    expiresAt: Date.now() + 5000,
    dbRef: new WeakRef(db),
  };

  // Phase 4 (B): cold-restart pre-warm — when the stored config already selects the SLM
  // tier with pre-warm on, warm the model once (best-effort, fire-and-forget, guarded so
  // a frequently-hit read path warms at most once per process). Cache hits return above.
  if (!_ultraSlmColdPrewarmAttempted) {
    _ultraSlmColdPrewarmAttempted = true;
    void maybePrewarmUltraSlmOnConfig({
      ultraEngine: config.ultraEngine,
      ultraSlmPrewarm: config.ultraSlmPrewarm,
    });
  }

  return config;
}

export async function updateCompressionSettings(
  updates: Partial<CompressionConfig>
): Promise<CompressionConfig> {
  const db = getDbInstance();
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );

  const tx = db.transaction(() => {
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined) continue;
      // Persist the engines map as ONE sanitized JSON row so the read path always gets
      // well-formed { enabled, level? } toggles for known engine ids.
      if (key === "engines") {
        insert.run(NAMESPACE, key, JSON.stringify(sanitizeEnginesForWrite(value)));
        continue;
      }
      insert.run(NAMESPACE, key, JSON.stringify(value));
    }
  });

  tx();
  backupDbFile("pre-write");
  compressionSettingsCache = null;
  invalidateDbCache();
  const next = await getCompressionSettings();
  // Phase 4 (B): the SAVE path covers the enable transition — if this write turns the
  // SLM tier + pre-warm on, warm the model once (best-effort, fire-and-forget).
  void maybePrewarmUltraSlmOnConfig({
    ultraEngine: next.ultraEngine,
    ultraSlmPrewarm: next.ultraSlmPrewarm,
  });
  return next;
}

function normalizeMcpAccessibilityConfig(value: unknown): McpAccessibilityConfig {
  // clampMcpAccessibilityConfig (engine layer) owns the numeric floors so the DB normalizer and
  // the live MCP-server read path agree — in particular it floors maxTextChars to a sane minimum
  // (a value below the tail reservation would make smartFilterText truncate the whole text away).
  return clampMcpAccessibilityConfig(value);
}

export async function getMcpAccessibilityConfig(): Promise<McpAccessibilityConfig> {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, "mcpAccessibility") as { value: string } | undefined;
  return normalizeMcpAccessibilityConfig(parseJsonSafe(row?.value ?? null));
}

export async function setMcpAccessibilityConfig(
  value: Partial<McpAccessibilityConfig>
): Promise<void> {
  const next = normalizeMcpAccessibilityConfig({ ...DEFAULT_MCP_ACCESSIBILITY_CONFIG, ...value });
  const db = getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    NAMESPACE,
    "mcpAccessibility",
    JSON.stringify(next)
  );
  compressionSettingsCache = null;
  invalidateDbCache();
}
