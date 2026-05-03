import { applyLiteCompression } from "../lite.ts";
import { cavemanCompress } from "../caveman.ts";
import { compressAggressive } from "../aggressive.ts";
import { ultraCompress } from "../ultra.ts";
import { createCompressionStats } from "../stats.ts";
import type { CavemanIntensity } from "../types.ts";
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

function ok(): EngineValidationResult {
  return { valid: true, errors: [] };
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
    return [];
  },
  validateConfig() {
    return ok();
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
    return [];
  },
  validateConfig() {
    return ok();
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
    return [];
  },
  validateConfig() {
    return ok();
  },
};
