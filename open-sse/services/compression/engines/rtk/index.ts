import { createCompressionStats, estimateCompressionTokens } from "../../stats.ts";
import { DEFAULT_RTK_CONFIG, type CompressionResult, type RtkConfig } from "../../types.ts";
import type { CompressionEngine } from "../types.ts";
import { detectCommandType } from "./commandDetector.ts";
import { deduplicateRepeatedLines } from "./deduplicator.ts";
import { matchRtkFilter } from "./filterLoader.ts";
import { applyLineFilter } from "./lineFilter.ts";
import { smartTruncate } from "./smartTruncate.ts";

type Message = {
  role: string;
  content?: string | Array<{ type?: string; text?: string; [key: string]: unknown }>;
  [key: string]: unknown;
};

export interface RtkProcessResult {
  text: string;
  compressed: boolean;
  originalTokens: number;
  compressedTokens: number;
  techniquesUsed: string[];
  rulesApplied: string[];
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
  };
}

function shouldCompressMessage(message: Message, config: RtkConfig): boolean {
  if (message.role === "tool") return config.applyToToolResults;
  if (message.role === "assistant") return config.applyToAssistantMessages;
  return false;
}

function mapStringContent(
  content: Message["content"],
  transform: (text: string) => string
): Message["content"] {
  if (typeof content === "string") return transform(content);
  if (!Array.isArray(content)) return content;
  return content.map((part) => {
    if (part && typeof part === "object" && part.type === "text" && typeof part.text === "string") {
      return { ...part, text: transform(part.text) };
    }
    return part;
  });
}

function extractContentText(content: Message["content"]): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) =>
      part && typeof part === "object" && typeof part.text === "string" ? part.text : ""
    )
    .filter(Boolean)
    .join("\n");
}

export function processRtkText(
  text: string,
  options: { command?: string | null; config?: Partial<RtkConfig> } = {}
): RtkProcessResult {
  const config = mergeRtkConfig(options.config);
  const originalTokens = estimateCompressionTokens(text);
  const techniquesUsed: string[] = [];
  const rulesApplied: string[] = [];
  let result = text;

  const detection = detectCommandType(text, options.command);
  const filter = matchRtkFilter(text, detection.command);
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
  return {
    text: result,
    compressed: compressedTokens < originalTokens,
    originalTokens,
    compressedTokens,
    techniquesUsed: [...new Set(techniquesUsed)],
    rulesApplied: [...new Set(rulesApplied)],
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
  const compressedMessages = messages.map((message) => {
    if (!shouldCompressMessage(message, config)) return message;
    const text = extractContentText(message.content);
    if (!text) return message;
    const processed = processRtkText(text, { config });
    allTechniques.push(...processed.techniquesUsed);
    allRules.push(...processed.rulesApplied);
    if (!processed.compressed) return message;
    return {
      ...message,
      content: mapStringContent(message.content, () => processed.text),
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
  return {
    body: compressedBody,
    compressed: stats.compressedTokens < stats.originalTokens,
    stats,
  };
}

export const rtkEngine: CompressionEngine = {
  id: "rtk",
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
};
