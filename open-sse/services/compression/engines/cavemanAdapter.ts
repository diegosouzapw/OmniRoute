import { applyLiteCompression } from "../lite.ts";
import { cavemanCompress } from "../caveman.ts";
import { compressAggressive } from "../aggressive.ts";
import { ultraCompress } from "../ultra.ts";
import { createCompressionStats } from "../stats.ts";
import {
  DEFAULT_AGGRESSIVE_CONFIG,
  DEFAULT_ULTRA_CONFIG,
  type CavemanIntensity,
} from "../types.ts";
import type { CompressionEngine, EngineConfigField, EngineValidationResult } from "./types.ts";

const CAVEMAN_INTENSITIES: CavemanIntensity[] = ["lite", "full", "ultra"];

const CAVEMAN_SCHEMA: EngineConfigField[] = [
  {
    key: "intensity",
    type: "select",
    label: "Intensity",
    defaultValue: "full",
    options: CAVEMAN_INTENSITIES.map((value) => ({ value, label: value })),
  },
  {
    key: "minMessageLength",
    type: "number",
    label: "Minimum message length",
    defaultValue: 50,
    min: 0,
    max: 10000,
  },
  {
    key: "enabled",
    type: "boolean",
    label: "Enabled",
    defaultValue: true,
  },
];

const AGGRESSIVE_SCHEMA: EngineConfigField[] = [
  {
    key: "summarizerEnabled",
    type: "boolean",
    label: "Summarizer enabled",
    defaultValue: DEFAULT_AGGRESSIVE_CONFIG.summarizerEnabled,
  },
  {
    key: "maxTokensPerMessage",
    type: "number",
    label: "Max tokens per message",
    defaultValue: DEFAULT_AGGRESSIVE_CONFIG.maxTokensPerMessage,
    min: 256,
    max: 32768,
  },
  {
    key: "minSavingsThreshold",
    type: "number",
    label: "Minimum savings threshold",
    defaultValue: DEFAULT_AGGRESSIVE_CONFIG.minSavingsThreshold,
    min: 0,
    max: 1,
  },
  {
    key: "preserveSystemPrompt",
    type: "boolean",
    label: "Preserve system prompt",
    defaultValue: true,
  },
];

const ULTRA_SCHEMA: EngineConfigField[] = [
  {
    key: "enabled",
    type: "boolean",
    label: "Enabled",
    defaultValue: DEFAULT_ULTRA_CONFIG.enabled,
  },
  {
    key: "compressionRate",
    type: "number",
    label: "Compression rate",
    defaultValue: DEFAULT_ULTRA_CONFIG.compressionRate,
    min: 0,
    max: 1,
  },
  {
    key: "minScoreThreshold",
    type: "number",
    label: "Minimum score threshold",
    defaultValue: DEFAULT_ULTRA_CONFIG.minScoreThreshold,
    min: 0,
    max: 1,
  },
  {
    key: "slmFallbackToAggressive",
    type: "boolean",
    label: "Fallback to aggressive",
    defaultValue: DEFAULT_ULTRA_CONFIG.slmFallbackToAggressive,
  },
  {
    key: "modelPath",
    type: "string",
    label: "Model path",
    defaultValue: "",
  },
  {
    key: "maxTokensPerMessage",
    type: "number",
    label: "Max tokens per message",
    defaultValue: DEFAULT_ULTRA_CONFIG.maxTokensPerMessage,
    min: 0,
    max: 32768,
  },
  {
    key: "preserveSystemPrompt",
    type: "boolean",
    label: "Preserve system prompt",
    defaultValue: true,
  },
];

function ok(): EngineValidationResult {
  return { valid: true, errors: [] };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function validateBoolean(config: Record<string, unknown>, key: string, errors: string[]): void {
  if (config[key] !== undefined && typeof config[key] !== "boolean") {
    errors.push(`${key} must be a boolean`);
  }
}

function validateNumberRange(
  config: Record<string, unknown>,
  key: string,
  min: number,
  max: number,
  errors: string[]
): void {
  const value = config[key];
  if (value === undefined) return;
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) {
    errors.push(`${key} must be a number between ${min} and ${max}`);
  }
}

function validateCavemanLikeConfig(config: Record<string, unknown>): EngineValidationResult {
  const errors: string[] = [];
  if (
    config.intensity !== undefined &&
    !CAVEMAN_INTENSITIES.includes(config.intensity as CavemanIntensity)
  ) {
    errors.push("intensity must be lite, full, or ultra");
  }
  if (
    config.minMessageLength !== undefined &&
    (typeof config.minMessageLength !== "number" || config.minMessageLength < 0)
  ) {
    errors.push("minMessageLength must be a non-negative number");
  }
  if (config.enabled !== undefined && typeof config.enabled !== "boolean") {
    errors.push("enabled must be a boolean");
  }
  return { valid: errors.length === 0, errors };
}

function validateAggressiveConfig(config: Record<string, unknown>): EngineValidationResult {
  const errors: string[] = [];
  validateBoolean(config, "summarizerEnabled", errors);
  validateBoolean(config, "preserveSystemPrompt", errors);
  validateNumberRange(config, "maxTokensPerMessage", 256, 32768, errors);
  validateNumberRange(config, "minSavingsThreshold", 0, 1, errors);

  if (config.thresholds !== undefined) {
    if (!isRecord(config.thresholds)) {
      errors.push("thresholds must be an object");
    } else {
      for (const key of ["fullSummary", "moderate", "light", "verbatim"]) {
        validateNumberRange(config.thresholds, key, 1, 100, errors);
      }
    }
  }

  if (config.toolStrategies !== undefined) {
    if (!isRecord(config.toolStrategies)) {
      errors.push("toolStrategies must be an object");
    } else {
      for (const key of ["fileContent", "grepSearch", "shellOutput", "json", "errorMessage"]) {
        validateBoolean(config.toolStrategies, key, errors);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

function validateUltraConfig(config: Record<string, unknown>): EngineValidationResult {
  const errors: string[] = [];
  validateBoolean(config, "enabled", errors);
  validateBoolean(config, "slmFallbackToAggressive", errors);
  validateBoolean(config, "preserveSystemPrompt", errors);
  validateNumberRange(config, "compressionRate", 0, 1, errors);
  validateNumberRange(config, "minScoreThreshold", 0, 1, errors);
  validateNumberRange(config, "maxTokensPerMessage", 0, 32768, errors);
  if (config.modelPath !== undefined && typeof config.modelPath !== "string") {
    errors.push("modelPath must be a string");
  }
  return { valid: errors.length === 0, errors };
}

export const liteEngine: CompressionEngine = {
  id: "lite",
  name: "Lite",
  description: "Fast whitespace, tool-result and image URL reduction.",
  icon: "compress",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 5,
  metadata: {
    id: "lite",
    name: "Lite",
    description: "Fast whitespace, tool-result and image URL reduction.",
    inputScope: "messages",
    targetLatencyMs: 1,
    supportsPreview: true,
    stable: true,
  },
  apply(body, options) {
    return applyLiteCompression(body, {
      ...options,
      preserveSystemPrompt: options?.config?.preserveSystemPrompt !== false,
    });
  },
  compress(body, config) {
    return this.apply(body, { stepConfig: config });
  },
  getConfigSchema() {
    return AGGRESSIVE_SCHEMA;
  },
  validateConfig(config) {
    return validateAggressiveConfig(config);
  },
};

export const cavemanEngine: CompressionEngine = {
  id: "caveman",
  name: "Caveman",
  description: "Rule-based message compression with preservation and validation.",
  icon: "compress",
  targets: ["messages"],
  stackable: true,
  stackPriority: 20,
  metadata: {
    id: "caveman",
    name: "Caveman",
    description: "Rule-based message compression with preservation and validation.",
    inputScope: "messages",
    targetLatencyMs: 1,
    supportsPreview: true,
    stable: true,
  },
  apply(body, options) {
    const cavemanConfig = {
      ...(options?.config?.cavemanConfig ?? {}),
      ...(options?.stepConfig ?? {}),
      ...(options?.config?.languageConfig?.enabled
        ? {
            language: options.config.languageConfig.defaultLanguage,
            autoDetectLanguage: options.config.languageConfig.autoDetect,
            enabledLanguagePacks: options.config.languageConfig.enabledPacks,
          }
        : {}),
      ...(options?.config?.preserveSystemPrompt !== false
        ? {
            compressRoles: (options?.config?.cavemanConfig?.compressRoles ?? ["user"]).filter(
              (role) => role !== "system"
            ),
          }
        : {}),
    };
    return cavemanCompress(body as Parameters<typeof cavemanCompress>[0], cavemanConfig);
  },
  compress(body, config) {
    return this.apply(body, { stepConfig: config });
  },
  getConfigSchema() {
    return CAVEMAN_SCHEMA;
  },
  validateConfig(config) {
    return validateCavemanLikeConfig(config);
  },
};

export const aggressiveEngine: CompressionEngine = {
  id: "aggressive",
  name: "Aggressive",
  description: "Summarization, tool result compression and progressive aging.",
  icon: "speed",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 30,
  metadata: {
    id: "aggressive",
    name: "Aggressive",
    description: "Summarization, tool result compression and progressive aging.",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },
  apply(body, options) {
    const messages = (body.messages ?? []) as Array<{
      role: string;
      content?: string | Array<{ type: string; text?: string }>;
      [key: string]: unknown;
    }>;
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }
    const aggressiveConfig = {
      ...(options?.config?.aggressive ?? {}),
      ...(options?.stepConfig ?? {}),
      preserveSystemPrompt: options?.config?.preserveSystemPrompt !== false,
    };
    const result = compressAggressive(messages, aggressiveConfig);
    const compressedBody = { ...body, messages: result.messages };
    return {
      body: compressedBody,
      compressed: result.stats.savingsPercent > 0,
      stats: createCompressionStats(
        body,
        compressedBody,
        "aggressive",
        ["aggressive"],
        result.stats.rulesApplied,
        result.stats.durationMs
      ),
    };
  },
  compress(body, config) {
    return this.apply(body, { stepConfig: config });
  },
  getConfigSchema() {
    return AGGRESSIVE_SCHEMA;
  },
  validateConfig(config) {
    return validateAggressiveConfig(config);
  },
};

export const ultraEngine: CompressionEngine = {
  id: "ultra",
  name: "Ultra",
  description: "Heuristic token pruning with optional local SLM fallback.",
  icon: "bolt",
  targets: ["messages"],
  stackable: true,
  stackPriority: 40,
  metadata: {
    id: "ultra",
    name: "Ultra",
    description: "Heuristic token pruning with optional local SLM fallback.",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },
  apply(body, options) {
    const messages = (body.messages ?? []) as Array<{
      role: string;
      content?: string | unknown[];
      [key: string]: unknown;
    }>;
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }
    const ultraConfig = {
      ...(options?.config?.ultra ?? {}),
      ...(options?.stepConfig ?? {}),
      preserveSystemPrompt: options?.config?.preserveSystemPrompt !== false,
    };
    const result = ultraCompress(messages, ultraConfig);
    const compressedBody = { ...body, messages: result.messages };
    return {
      body: compressedBody,
      compressed: result.stats.savingsPercent > 0,
      stats: createCompressionStats(
        body,
        compressedBody,
        "ultra",
        ["ultra"],
        result.stats.rulesApplied,
        result.stats.durationMs
      ),
    };
  },
  compress(body, config) {
    return this.apply(body, { stepConfig: config });
  },
  getConfigSchema() {
    return ULTRA_SCHEMA;
  },
  validateConfig(config) {
    return validateUltraConfig(config);
  },
};
