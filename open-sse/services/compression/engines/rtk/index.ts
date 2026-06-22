import { createCompressionStats, estimateCompressionTokens } from "../../stats.ts";
import { DEFAULT_RTK_CONFIG, type CompressionResult, type RtkConfig } from "../../types.ts";
import type { CompressionEngine, EngineConfigField, EngineValidationResult } from "../types.ts";
import { detectCommandType } from "./commandDetector.ts";
import { deduplicateRepeatedLines } from "./deduplicator.ts";
import { groupSimilarLines } from "./grouper.ts";
import { matchRtkFilter } from "./filterLoader.ts";
import { applyLineFilter } from "./lineFilter.ts";
import { smartTruncate } from "./smartTruncate.ts";
import { normalizeCodeLanguage, stripCode } from "./codeStripper.ts";
import { maybePersistRtkRawOutput, type RtkRawOutputPointer } from "./rawOutput.ts";
import { isTextBlock } from "../../messageContent.ts";
import { adaptBodyForCompression } from "../../bodyAdapter.ts";
import { isAnthropicToolResultBlock } from "../../toolResultCompressor.ts";

type Message = {
  role: string;
  content?: string | Array<{ type?: string; text?: string; [key: string]: unknown }>;
  [key: string]: unknown;
};

type ToolMeta = { toolName: string; command: string | null };

// Same terminal-tool pattern as grok-web.ts isTerminalTool(): RTK's command-aware filters
// only apply to bash/shell tool results. Non-shell tools (read, glob, grep, edit, write…)
// skip filter matching to avoid content-based false positives (e.g. a .ts file matching
// the build-typescript filter).
const SHELL_TOOL_NAME_RE = /\b(bash|shell|terminal|run_command|execute_command|exec|command)\b/;

/**
 * A content block (or text sub-block) carrying `cache_control` is an explicit upstream
 * prompt-cache breakpoint — the provider caches the prefix up to and INCLUDING it. Rewriting
 * such a block's text invalidates that cached prefix every turn (guaranteed cache miss), the
 * "provider cache broken" regression once RTK started compressing Anthropic tool_result blocks.
 * So we preserve any cache_control-marked block byte-for-byte. (#3936: under caching, only ever
 * preserve more of the prefix — never rewrite a client-declared breakpoint.)
 */
function hasCacheControlMarker(part: unknown): boolean {
  return (
    !!part &&
    typeof part === "object" &&
    (part as Record<string, unknown>).cache_control !== undefined &&
    (part as Record<string, unknown>).cache_control !== null
  );
}

/**
 * Resolve the shell command + whether to skip RTK filters for a tool result, given the
 * tool id (OpenAI `tool_call_id` / Anthropic `tool_use_id`) and the lookup built from the
 * preceding assistant tool calls. A missing entry runs filters with text-based command
 * detection; a non-shell tool name skips filters.
 */
function resolveToolMeta(
  toolId: string | null,
  lookup: Map<string, ToolMeta>
): { command: string | null; skipFilters: boolean } {
  const meta = toolId ? lookup.get(toolId) : null;
  if (!meta) return { command: null, skipFilters: false };
  if (SHELL_TOOL_NAME_RE.test(meta.toolName.toLowerCase())) {
    return { command: meta.command, skipFilters: false };
  }
  return { command: null, skipFilters: true };
}

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
  // Anthropic-shape tool results live in (typically role:"user") messages as `tool_result`
  // content blocks — treat them like OpenAI tool messages (gated by applyToToolResults).
  if (
    config.applyToToolResults &&
    Array.isArray(message.content) &&
    message.content.some(isAnthropicToolResultBlock)
  )
    return true;
  if (message.role === "tool")
    return config.applyToToolResults || (config.applyToCodeBlocks && hasCodeFence(message.content));
  if (message.role === "assistant")
    return (
      config.applyToAssistantMessages || (config.applyToCodeBlocks && hasCodeFence(message.content))
    );
  return false;
}

function hasCodeFence(content: Message["content"]): boolean {
  if (!content) return false;
  if (typeof content === "string") return /```/.test(content);
  if (!Array.isArray(content)) return false;
  return content.some(
    (part) => isTextBlock(part) && typeof part.text === "string" && /```/.test(part.text)
  );
}

function codeOnlyConfig(config: RtkConfig): boolean {
  return config.applyToCodeBlocks && !config.applyToToolResults && !config.applyToAssistantMessages;
}

function processRtkCodeBlocksOnly(
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
  const processText = (text: string) => {
    let compressed = false;
    const nextText = text.replace(/```([\s\S]*?)```/g, (match) => {
      const processed = processRtkText(match, { config });
      techniquesUsed.push(...processed.techniquesUsed);
      rulesApplied.push(...processed.rulesApplied);
      if (processed.rawOutputPointers) rawOutputPointers.push(...processed.rawOutputPointers);
      if (!processed.compressed) return match;
      compressed = true;
      return processed.text;
    });
    return { text: compressed ? nextText : text, compressed };
  };

  if (typeof content === "string") {
    const processed = processText(content);
    return {
      content: processed.text,
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
    const processed = processText(part.text);
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

export function processRtkText(
  text: string,
  options: { command?: string | null; config?: Partial<RtkConfig>; skipFilters?: boolean } = {}
): RtkProcessResult {
  const config = mergeRtkConfig(options.config);
  const originalTokens = estimateCompressionTokens(text);
  const techniquesUsed: string[] = [];
  const rulesApplied: string[] = [];
  const rawOutputPointers: RtkRawOutputPointer[] = [];
  let result = text;

  const detection = detectCommandType(text, options.command);
  let matchedFilterPatterns: string[] = [];
  if (!options.skipFilters) {
    const filter = matchRtkFilter(text, detection.command, {
      customFiltersEnabled: config.customFiltersEnabled,
      trustProjectFilters: config.trustProjectFilters,
    });
    if (filter && !config.disabledFilters.includes(filter.id)) {
      if (config.enabledFilters.length === 0 || config.enabledFilters.includes(filter.id)) {
        const filtered = applyLineFilter(result, {
          ...filter,
          maxLines: effectiveMaxLines(
            filter.maxLines || config.maxLinesPerResult,
            config.intensity
          ),
        });
        result = filtered.text;
        if (filtered.appliedRules.length > 0) {
          techniquesUsed.push("rtk-filter");
          rulesApplied.push(...filtered.appliedRules);
        }
        matchedFilterPatterns = filter.priorityPatterns;
      }
    }
  }

  if (config.applyToCodeBlocks) {
    let strippedCodeBlocks = 0;
    result = result.replace(
      /```([A-Za-z0-9_+.-]*)\r?\n([\s\S]*?)```/g,
      (match, languageHint: string, code: string) => {
        const stripped = stripCode(code, normalizeCodeLanguage(languageHint), {
          // Opt-in comment removal (default off = no silent production change). Docstrings/JSDoc
          // are preserved unless explicitly disabled.
          removeComments: config.stripCodeComments === true,
          preserveDocstrings: config.preserveDocstrings !== false,
        });
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

  const deduped = deduplicateRepeatedLines(result, { threshold: config.deduplicateThreshold });
  if (deduped.collapsed > 0) {
    result = deduped.text;
    techniquesUsed.push("rtk-dedup");
    rulesApplied.push("rtk:dedup");
  }

  // R5: grouping — opt-in via enableGrouping flag (default OFF)
  if (config.enableGrouping) {
    const grouped = groupSimilarLines(result, {
      threshold: config.groupingThreshold,
    });
    if (grouped.grouped > 0) {
      result = grouped.text;
      techniquesUsed.push("rtk-grouping");
      rulesApplied.push("rtk:grouping");
    }
  }

  const defaultPriorityPatterns: RegExp[] = [/error|failed|exception|traceback|TS\d{4}|FAIL|✖/i];
  const filterPriorityPatterns: RegExp[] = matchedFilterPatterns.flatMap((pattern) => {
    try {
      return [new RegExp(pattern, "i")];
    } catch {
      return [];
    }
  });
  const truncated = smartTruncate(result, {
    maxLines: effectiveMaxLines(config.maxLinesPerResult, config.intensity),
    maxChars: config.maxCharsPerResult,
    preserveHead: config.intensity === "aggressive" ? 16 : 24,
    preserveTail: config.intensity === "aggressive" ? 16 : 24,
    priorityPatterns: [...defaultPriorityPatterns, ...filterPriorityPatterns],
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

/**
 * Compress the text inside Anthropic-shape `tool_result` content blocks (string or nested
 * text-block content), resolving the shell command per block from its `tool_use_id`. The
 * block type and `tool_use_id` are preserved exactly — only the inner text is rewritten.
 */
function processToolResultBlocks(
  content: Message["content"],
  config: RtkConfig,
  toolCallLookup: Map<string, ToolMeta>
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

  if (!Array.isArray(content)) {
    return { content, compressed: false, techniquesUsed, rulesApplied, rawOutputPointers };
  }

  const collect = (processed: RtkProcessResult) => {
    techniquesUsed.push(...processed.techniquesUsed);
    rulesApplied.push(...processed.rulesApplied);
    if (processed.rawOutputPointers) rawOutputPointers.push(...processed.rawOutputPointers);
  };

  let compressed = false;
  const nextContent = content.map((part) => {
    if (!isAnthropicToolResultBlock(part)) return part;
    // The block itself is a cache breakpoint — preserve it byte-for-byte.
    if (hasCacheControlMarker(part)) return part;
    const toolUseId = typeof part.tool_use_id === "string" ? part.tool_use_id : null;
    const { command, skipFilters } = resolveToolMeta(toolUseId, toolCallLookup);
    const inner = part.content;

    if (typeof inner === "string") {
      if (!inner) return part;
      const processed = processRtkText(inner, { config, command, skipFilters });
      collect(processed);
      if (!processed.compressed) return part;
      compressed = true;
      return { ...part, content: processed.text };
    }

    if (Array.isArray(inner)) {
      let blockChanged = false;
      const nextInner = inner.map((sub) => {
        if (!isTextBlock(sub) || !sub.text) return sub;
        // A text sub-block can carry its own cache breakpoint — preserve it byte-for-byte.
        if (hasCacheControlMarker(sub)) return sub;
        const processed = processRtkText(sub.text, { config, command, skipFilters });
        collect(processed);
        if (!processed.compressed) return sub;
        blockChanged = true;
        compressed = true;
        return { ...sub, text: processed.text };
      });
      return blockChanged ? { ...part, content: nextInner } : part;
    }

    return part;
  });

  return {
    content: compressed ? nextContent : content,
    compressed,
    techniquesUsed,
    rulesApplied,
    rawOutputPointers,
  };
}

function processRtkContent(
  content: Message["content"],
  config: RtkConfig,
  options?: { command?: string | null; skipFilters?: boolean }
): {
  content: Message["content"];
  compressed: boolean;
  techniquesUsed: string[];
  rulesApplied: string[];
  rawOutputPointers: RtkRawOutputPointer[];
} {
  if (codeOnlyConfig(config)) {
    return processRtkCodeBlocksOnly(content, config);
  }
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
    const processed = processRtkText(content, {
      config,
      command: options?.command,
      skipFilters: options?.skipFilters,
    });
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
    const processed = processRtkText(part.text, {
      config,
      command: options?.command,
      skipFilters: options?.skipFilters,
    });
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

/**
 * Scale a line budget by intensity so minimal / standard / aggressive produce
 * meaningfully different output on truncation-based filters (B-RTK-INTENSITY).
 * Truncation always runs through smartTruncate with priorityPatterns, so error /
 * failure lines survive at EVERY intensity. (Include/collapse filters like docker-logs
 * compress by content, not line budget, so they are intensity-independent by nature.)
 */
export function effectiveMaxLines(base: number, intensity: string | undefined): number {
  const factor = intensity === "aggressive" ? 0.5 : intensity === "minimal" ? 1.5 : 1;
  return Math.max(1, Math.round(base * factor));
}

export function applyRtkCompression(
  body: Record<string, unknown>,
  options: { config?: Partial<RtkConfig>; stepConfig?: Record<string, unknown> } = {}
): CompressionResult {
  const start = performance.now();
  const stepConfig =
    options.stepConfig && options.stepConfig.enabled === undefined
      ? { enabled: true, ...options.stepConfig }
      : options.stepConfig;
  const explicitConfig = options.config && Object.keys(options.config).length > 0;
  const baseConfig = !explicitConfig && !stepConfig ? { enabled: true } : (options.config ?? {});
  const config = mergeRtkConfig(baseConfig, stepConfig);
  if (!config.enabled) return { body, compressed: false, stats: null };

  const adapter = adaptBodyForCompression(body);
  const messages = adapter.body.messages as Message[] | undefined;
  if (!Array.isArray(messages) || messages.length === 0) {
    return { body, compressed: false, stats: null };
  }

  const allTechniques: string[] = [];
  const allRules: string[] = [];
  const rawOutputPointers: RtkRawOutputPointer[] = [];

  // Build tool_call_id → tool metadata lookup from assistant messages.
  // This lets us distinguish bash tool results (which RTK filters are designed for)
  // from non-shell tool results (read, grep, glob, etc.) that should skip filters.
  const toolCallLookup = new Map<string, ToolMeta>();
  for (const msg of messages) {
    if (msg.role !== "assistant") continue;
    // OpenAI-shape: assistant.tool_calls[].function.{name, arguments(JSON).command}
    const toolCalls = msg.tool_calls;
    if (Array.isArray(toolCalls)) {
      for (const tc of toolCalls as Array<Record<string, unknown>>) {
        if (!tc || typeof tc !== "object") continue;
        const id = typeof tc.id === "string" ? tc.id : null;
        if (!id) continue;
        const fn = tc.function as Record<string, unknown> | undefined;
        if (!fn || typeof fn !== "object") continue;
        const toolName = typeof fn.name === "string" ? fn.name : "";
        let command: string | null = null;
        if (typeof fn.arguments === "string") {
          try {
            const args = JSON.parse(fn.arguments);
            command =
              typeof args.command === "string"
                ? args.command
                : typeof args.cmd === "string"
                  ? args.cmd
                  : null;
          } catch {
            // non-JSON arguments
          }
        }
        toolCallLookup.set(id, { toolName, command });
      }
    }
    // Anthropic-shape: assistant.content[] holds { type:"tool_use", id, name, input.command }.
    if (Array.isArray(msg.content)) {
      for (const part of msg.content as Array<Record<string, unknown>>) {
        if (!part || typeof part !== "object" || part.type !== "tool_use") continue;
        const id = typeof part.id === "string" ? part.id : null;
        if (!id) continue;
        const toolName = typeof part.name === "string" ? part.name : "";
        const input = part.input as Record<string, unknown> | undefined;
        let command: string | null = null;
        if (input && typeof input === "object") {
          command =
            typeof input.command === "string"
              ? input.command
              : typeof input.cmd === "string"
                ? input.cmd
                : null;
        }
        toolCallLookup.set(id, { toolName, command });
      }
    }
  }

  const compressedMessages = messages.map((message) => {
    if (!shouldCompressMessage(message, config)) return message;

    // Anthropic-shape tool results: `tool_result` content blocks inside a (typically
    // role:"user") message. Compress each block's inner text, resolving the shell command
    // per block from the matching assistant `tool_use` (mirrors the OpenAI tool path).
    if (Array.isArray(message.content) && message.content.some(isAnthropicToolResultBlock)) {
      const processed = processToolResultBlocks(message.content, config, toolCallLookup);
      allTechniques.push(...processed.techniquesUsed);
      allRules.push(...processed.rulesApplied);
      rawOutputPointers.push(...processed.rawOutputPointers);
      if (!processed.compressed) return message;
      return { ...message, content: processed.content };
    }

    // OpenAI-shape tool message: resolve metadata from the preceding assistant tool_calls.
    let command: string | null = null;
    let skipFilters = false;
    if (message.role === "tool") {
      const callId = typeof message.tool_call_id === "string" ? message.tool_call_id : null;
      ({ command, skipFilters } = resolveToolMeta(callId, toolCallLookup));
    }

    const processed = processRtkContent(message.content, config, { command, skipFilters });
    allTechniques.push(...processed.techniquesUsed);
    allRules.push(...processed.rulesApplied);
    rawOutputPointers.push(...processed.rawOutputPointers);
    if (!processed.compressed) return message;
    return {
      ...message,
      content: processed.content,
    };
  });

  const compressedBody = { ...adapter.body, messages: compressedMessages };
  const stats = createCompressionStats(
    adapter.body,
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
    body: adapter.restore(compressedBody),
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
export {
  maybePersistRtkRawOutput,
  readRtkRawOutput,
  redactRtkRawOutput,
  listRtkCommandSamples,
} from "./rawOutput.ts";
// RTK learn/discover: the sample-source adapter (rawOutput) feeds these pure miners.
export { discoverRepeatedNoise, type NoiseCandidate, type CommandSample } from "./discover.ts";
export { suggestFilter, commandToId, type SuggestedFilter } from "./learn.ts";
