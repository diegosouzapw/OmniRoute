import { createCompressionStats, estimateCompressionTokens } from "../../stats.ts";
import { DEFAULT_RTK_CONFIG, type CompressionResult, type RtkConfig } from "../../types.ts";
import type { CompressionEngine, EngineConfigField, EngineValidationResult } from "../types.ts";
import { detectCommandType } from "./commandDetector.ts";
import { deduplicateRepeatedLines } from "./deduplicator.ts";
import { matchRtkFilter } from "./filterLoader.ts";
import { applyLineFilter } from "./lineFilter.ts";
import { smartTruncate } from "./smartTruncate.ts";
import { normalizeCodeLanguage, stripCode } from "./codeStripper.ts";
import { maybePersistRtkRawOutput, type RtkRawOutputPointer } from "./rawOutput.ts";
import { isTextBlock } from "../../messageContent.ts";

type Message = {
  role: string;
  content?: string | Array<{ type?: string; text?: string; [key: string]: unknown }>;
  [key: string]: unknown;
};

const RTK_SCHEMA: EngineConfigField[] = [
  {
    key: "intensity",
    type: "select",
    label: "Intensity",
    defaultValue: DEFAULT_RTK_CONFIG.intensity,
    options: [
      { value: "minimal", label: "minimal" },
      { value: "standard", label: "standard" },
      { value: "aggressive", label: "aggressive" },
    ],
  },
  {
    key: "applyToToolResults",
    type: "boolean",
    label: "Apply to tool results",
    defaultValue: DEFAULT_RTK_CONFIG.applyToToolResults,
  },
  {
    key: "applyToAssistantMessages",
    type: "boolean",
    label: "Apply to assistant messages",
    defaultValue: DEFAULT_RTK_CONFIG.applyToAssistantMessages,
  },
  {
    key: "applyToCodeBlocks",
    type: "boolean",
    label: "Apply to code blocks",
    defaultValue: DEFAULT_RTK_CONFIG.applyToCodeBlocks,
  },
  {
    key: "maxLinesPerResult",
    type: "number",
    label: "Max lines per result",
    defaultValue: DEFAULT_RTK_CONFIG.maxLinesPerResult,
    min: 0,
    max: 5000,
  },
  {
    key: "maxCharsPerResult",
    type: "number",
    label: "Max chars per result",
    defaultValue: DEFAULT_RTK_CONFIG.maxCharsPerResult,
    min: 0,
    max: 500000,
  },
  {
    key: "deduplicateThreshold",
    type: "number",
    label: "Deduplicate threshold",
    defaultValue: DEFAULT_RTK_CONFIG.deduplicateThreshold,
    min: 2,
    max: 100,
  },
  {
    key: "rawOutputRetention",
    type: "select",
    label: "Raw output retention",
    defaultValue: DEFAULT_RTK_CONFIG.rawOutputRetention,
    options: [
      { value: "never", label: "never" },
      { value: "failures", label: "failures" },
      { value: "always", label: "always" },
    ],
  },
];

function validateRtkEngineConfig(config: Record<string, unknown>): EngineValidationResult {
  const errors: string[] = [];
  if (
    config.intensity !== undefined &&
    config.intensity !== "minimal" &&
    config.intensity !== "standard" &&
    config.intensity !== "aggressive"
  ) {
    errors.push("intensity must be minimal, standard, or aggressive");
  }
  for (const key of [
    "enabled",
    "applyToToolResults",
    "applyToAssistantMessages",
    "applyToCodeBlocks",
  ]) {
    if (config[key] !== undefined && typeof config[key] !== "boolean") {
      errors.push(`${key} must be a boolean`);
    }
  }
  for (const key of ["maxLinesPerResult", "maxCharsPerResult", "deduplicateThreshold"]) {
    if (config[key] !== undefined && (typeof config[key] !== "number" || config[key] < 0)) {
      errors.push(`${key} must be a non-negative number`);
    }
  }
  if (config.enabledFilters !== undefined && !Array.isArray(config.enabledFilters)) {
    errors.push("enabledFilters must be an array");
  }
  if (config.disabledFilters !== undefined && !Array.isArray(config.disabledFilters)) {
    errors.push("disabledFilters must be an array");
  }
  if (
    config.rawOutputRetention !== undefined &&
    config.rawOutputRetention !== "never" &&
    config.rawOutputRetention !== "failures" &&
    config.rawOutputRetention !== "always"
  ) {
    errors.push("rawOutputRetention must be never, failures, or always");
  }
  return { valid: errors.length === 0, errors };
}

export interface RtkProcessResult {
  text: string;
  compressed: boolean;
  originalTokens: number;
  compressedTokens: number;
  techniquesUsed: string[];
  rulesApplied: string[];
  rawOutputPointers?: RtkRawOutputPointer[];
}

function mergeRtkConfig(base?: Partial<RtkConfig>, override?: Record<string, unknown>): RtkConfig {
  const merged = { ...DEFAULT_RTK_CONFIG, ...(base ?? {}), ...(override ?? {}) };
  return {
    ...merged,
    intensity:
      merged.intensity === "minimal" ||
      merged.intensity === "standard" ||
      merged.intensity === "aggressive"
        ? merged.intensity
        : DEFAULT_RTK_CONFIG.intensity,
    enabledFilters: Array.isArray(merged.enabledFilters)
      ? merged.enabledFilters.filter((id): id is string => typeof id === "string")
      : [],
    disabledFilters: Array.isArray(merged.disabledFilters)
      ? merged.disabledFilters.filter((id): id is string => typeof id === "string")
      : [],
    maxLinesPerResult:
      typeof merged.maxLinesPerResult === "number" && Number.isFinite(merged.maxLinesPerResult)
        ? Math.max(0, Math.floor(merged.maxLinesPerResult))
        : DEFAULT_RTK_CONFIG.maxLinesPerResult,
    maxCharsPerResult:
      typeof merged.maxCharsPerResult === "number" && Number.isFinite(merged.maxCharsPerResult)
        ? Math.max(0, Math.floor(merged.maxCharsPerResult))
        : DEFAULT_RTK_CONFIG.maxCharsPerResult,
    deduplicateThreshold:
      typeof merged.deduplicateThreshold === "number" &&
      Number.isFinite(merged.deduplicateThreshold)
        ? Math.max(2, Math.floor(merged.deduplicateThreshold))
        : DEFAULT_RTK_CONFIG.deduplicateThreshold,
    customFiltersEnabled:
      typeof merged.customFiltersEnabled === "boolean"
        ? merged.customFiltersEnabled
        : DEFAULT_RTK_CONFIG.customFiltersEnabled,
    trustProjectFilters:
      typeof merged.trustProjectFilters === "boolean"
        ? merged.trustProjectFilters
        : DEFAULT_RTK_CONFIG.trustProjectFilters,
    rawOutputRetention:
      merged.rawOutputRetention === "never" ||
      merged.rawOutputRetention === "failures" ||
      merged.rawOutputRetention === "always"
        ? merged.rawOutputRetention
        : DEFAULT_RTK_CONFIG.rawOutputRetention,
    rawOutputMaxBytes:
      typeof merged.rawOutputMaxBytes === "number" && Number.isFinite(merged.rawOutputMaxBytes)
        ? Math.max(1024, Math.floor(merged.rawOutputMaxBytes))
        : DEFAULT_RTK_CONFIG.rawOutputMaxBytes,
  };
}

function shouldCompressMessage(message: Message, config: RtkConfig): boolean {
  if (message.role === "tool") return config.applyToToolResults || config.applyToCodeBlocks;
  if (message.role === "assistant")
    return config.applyToAssistantMessages || config.applyToCodeBlocks;
  return false;
}

export function processRtkText(
  text: string,
  options: { command?: string | null; config?: Partial<RtkConfig> } = {}
): RtkProcessResult {
  const config = mergeRtkConfig(options.config);
  const originalTokens = estimateCompressionTokens(text);
  const techniquesUsed: string[] = [];
  const rulesApplied: string[] = [];
  const rawOutputPointers: RtkRawOutputPointer[] = [];
  let result = text;

  const detection = detectCommandType(text, options.command);
  const filter = matchRtkFilter(text, detection.command, {
    customFiltersEnabled: config.customFiltersEnabled,
    trustProjectFilters: config.trustProjectFilters,
  });
  if (filter && !config.disabledFilters.includes(filter.id)) {
    if (config.enabledFilters.length === 0 || config.enabledFilters.includes(filter.id)) {
      const filtered = applyLineFilter(result, {
        ...filter,
        maxLines: filter.maxLines || config.maxLinesPerResult,
      });
      result = filtered.text;
      if (filtered.appliedRules.length > 0) {
        techniquesUsed.push("rtk-filter");
        rulesApplied.push(...filtered.appliedRules);
      }
    }
  }

  if (config.applyToCodeBlocks) {
    let strippedCodeBlocks = 0;
    result = result.replace(
      /```([A-Za-z0-9_+.-]*)\r?\n([\s\S]*?)```/g,
      (match, languageHint: string, code: string) => {
        const stripped = stripCode(code, normalizeCodeLanguage(languageHint));
        if (stripped.strippedLines <= 0 && stripped.text === code.trim()) return match;
        strippedCodeBlocks++;
        const fenceLanguage = languageHint?.trim() || stripped.language;
        return `\`\`\`${fenceLanguage}\n${stripped.text}\n\`\`\``;
      }
    );
    if (strippedCodeBlocks > 0) {
      techniquesUsed.push("rtk-code-strip");
      rulesApplied.push("rtk:code-strip");
    }
  }

  if (config.intensity !== "minimal") {
    const deduped = deduplicateRepeatedLines(result, { threshold: config.deduplicateThreshold });
    if (deduped.collapsed > 0) {
      result = deduped.text;
      techniquesUsed.push("rtk-dedup");
      rulesApplied.push("rtk:dedup");
    }
  }

  const truncated = smartTruncate(result, {
    maxLines: config.maxLinesPerResult,
    maxChars: config.maxCharsPerResult,
    preserveHead: config.intensity === "aggressive" ? 16 : 24,
    preserveTail: config.intensity === "aggressive" ? 16 : 24,
    priorityPatterns: [/error|failed|exception|traceback|TS\d{4}|FAIL|✖/i],
  });
  if (truncated.truncated) {
    result = truncated.text;
    techniquesUsed.push("rtk-truncate");
    rulesApplied.push("rtk:truncate");
  }

  const compressedTokens = estimateCompressionTokens(result);
  if (compressedTokens < originalTokens) {
    const pointer = maybePersistRtkRawOutput(text, {
      retention: config.rawOutputRetention,
      command: detection.command,
      maxBytes: config.rawOutputMaxBytes,
    });
    if (pointer) {
      rawOutputPointers.push(pointer);
      techniquesUsed.push("rtk-raw-output-retention");
      rulesApplied.push("rtk:raw-output-retention");
    }
  }
  return {
    text: result,
    compressed: compressedTokens < originalTokens,
    originalTokens,
    compressedTokens,
    techniquesUsed: [...new Set(techniquesUsed)],
    rulesApplied: [...new Set(rulesApplied)],
    ...(rawOutputPointers.length > 0 ? { rawOutputPointers } : {}),
  };
}

function processRtkContent(
  content: Message["content"],
  config: RtkConfig
): {
  content: Message["content"];
  compressed: boolean;
  techniquesUsed: string[];
  rulesApplied: string[];
  rawOutputPointers: RtkRawOutputPointer[];
} {
  const techniquesUsed: string[] = [];
  const rulesApplied: string[] = [];
  const rawOutputPointers: RtkRawOutputPointer[] = [];

  const collect = (processed: RtkProcessResult) => {
    techniquesUsed.push(...processed.techniquesUsed);
    rulesApplied.push(...processed.rulesApplied);
    if (processed.rawOutputPointers) rawOutputPointers.push(...processed.rawOutputPointers);
  };

  if (typeof content === "string") {
    if (!content) {
      return { content, compressed: false, techniquesUsed, rulesApplied, rawOutputPointers };
    }
    const processed = processRtkText(content, { config });
    collect(processed);
    return {
      content: processed.compressed ? processed.text : content,
      compressed: processed.compressed,
      techniquesUsed,
      rulesApplied,
      rawOutputPointers,
    };
  }

  if (!Array.isArray(content)) {
    return { content, compressed: false, techniquesUsed, rulesApplied, rawOutputPointers };
  }

  let compressed = false;
  const nextContent = content.map((part) => {
    if (!isTextBlock(part) || !part.text) return part;
    const processed = processRtkText(part.text, { config });
    collect(processed);
    if (!processed.compressed) return part;
    compressed = true;
    return { ...part, text: processed.text };
  });

  return {
    content: compressed ? nextContent : content,
    compressed,
    techniquesUsed,
    rulesApplied,
    rawOutputPointers,
  };
}

export function applyRtkCompression(
  body: Record<string, unknown>,
  options: { config?: Partial<RtkConfig>; stepConfig?: Record<string, unknown> } = {}
): CompressionResult {
  const start = performance.now();
  const config = mergeRtkConfig(options.config, options.stepConfig);
  if (!config.enabled) return { body, compressed: false, stats: null };

  const messages = body.messages as Message[] | undefined;
  if (!Array.isArray(messages) || messages.length === 0) {
    return { body, compressed: false, stats: null };
  }

  const allTechniques: string[] = [];
  const allRules: string[] = [];
  const rawOutputPointers: RtkRawOutputPointer[] = [];
  const compressedMessages = messages.map((message) => {
    if (!shouldCompressMessage(message, config)) return message;
    const processed = processRtkContent(message.content, config);
    allTechniques.push(...processed.techniquesUsed);
    allRules.push(...processed.rulesApplied);
    rawOutputPointers.push(...processed.rawOutputPointers);
    if (!processed.compressed) return message;
    return {
      ...message,
      content: processed.content,
    };
  });

  const compressedBody = { ...body, messages: compressedMessages };
  const stats = createCompressionStats(
    body,
    compressedBody,
    "rtk",
    [...new Set(allTechniques)],
    allRules.length > 0 ? [...new Set(allRules)] : undefined,
    Math.round((performance.now() - start) * 100) / 100
  );
  stats.engine = "rtk";
  if (rawOutputPointers.length > 0) {
    stats.rtkRawOutputPointers = rawOutputPointers;
  }
  return {
    body: compressedBody,
    compressed: stats.compressedTokens < stats.originalTokens,
    stats,
  };
}

export const rtkEngine: CompressionEngine = {
  id: "rtk",
  name: "RTK",
  description: "Command-aware tool output compression with declarative filters.",
  icon: "filter_alt",
  targets: ["tool_results", "code_blocks"],
  stackable: true,
  stackPriority: 10,
  metadata: {
    id: "rtk",
    name: "RTK",
    description: "Command-aware tool output compression with declarative filters.",
    inputScope: "tool-results",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },
  apply(body, options) {
    return applyRtkCompression(body, {
      config: options?.config?.rtkConfig,
      stepConfig: options?.stepConfig,
    });
  },
  compress(body, config) {
    return this.apply(body, { stepConfig: config });
  },
  getConfigSchema() {
    return RTK_SCHEMA;
  },
  validateConfig(config) {
    return validateRtkEngineConfig(config);
  },
};

export {
  detectCommandFromText,
  detectCommandOutput,
  detectCommandType,
} from "./commandDetector.ts";
export { runRtkFilterTests } from "./verify.ts";
export { maybePersistRtkRawOutput, readRtkRawOutput, redactRtkRawOutput } from "./rawOutput.ts";
