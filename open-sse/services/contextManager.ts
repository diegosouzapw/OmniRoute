/**
 * Context Manager — Phase 4
 *
 * Pre-flight context compression to prevent "prompt too long" errors.
 * 3 layers: trim tool messages, compress thinking, aggressive purification.
 */

import { REGISTRY } from "../config/providerRegistry.ts";
import { getModelContextLimit } from "../../src/lib/modelCapabilities.ts";

// Default token limits per provider (fallbacks when not in registry)
const DEFAULT_LIMITS: Record<string, number> = {
  claude: 200000,
  openai: 128000,
  gemini: 1000000,
  codex: 400000,
  default: 128000,
};

// Environment variable overrides (highest priority)
function getEnvOverride(provider: string): number | null {
  const envKey = `CONTEXT_LENGTH_${provider.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`;
  const envValue = process.env[envKey];
  if (envValue) {
    const parsed = parseInt(envValue, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  // Global override
  const globalValue = process.env.CONTEXT_LENGTH_DEFAULT;
  if (globalValue) {
    const parsed = parseInt(globalValue, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return null;
}

// Reserve tokens override from environment variable
function getReserveTokensOverride(): number | null {
  const envValue = process.env.CONTEXT_RESERVE_TOKENS;
  if (envValue) {
    const parsed = parseInt(envValue, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return null;
}

// Rough chars-per-token ratio for quick estimation
const CHARS_PER_TOKEN = 4;

/**
 * Estimate token count from text length
 */
export function estimateTokens(text: string | object | null | undefined): number {
  if (!text) return 0;
  const str = typeof text === "string" ? text : JSON.stringify(text);
  return Math.ceil(str.length / CHARS_PER_TOKEN);
}

/**
 * Get token limit for a provider/model combination
 * Priority: Env override > models.dev DB > Registry defaultContextLength > DEFAULT_LIMITS
 */
export function getTokenLimit(provider: string, model: string | null = null): number {
  // 1. Check environment variable override first
  const envOverride = getEnvOverride(provider);
  if (envOverride) return envOverride;

  // 2. Check models.dev synced DB for per-model context limit
  if (model) {
    const dbLimit = getModelContextLimit(provider, model);
    if (dbLimit && dbLimit > 0) return dbLimit;
  }

  // 3. Check registry for provider default
  const registryEntry = REGISTRY[provider];
  if (registryEntry?.defaultContextLength) {
    return registryEntry.defaultContextLength;
  }

  // 4. Check if model name hints at a known limit
  if (model) {
    const lower = model.toLowerCase();
    if (lower.includes("claude")) return DEFAULT_LIMITS.claude;
    if (lower.includes("gemini")) return DEFAULT_LIMITS.gemini;
    if (
      lower.includes("gpt") ||
      lower.includes("o1") ||
      lower.includes("o3") ||
      lower.includes("o4") ||
      lower.includes("codex")
    )
      return DEFAULT_LIMITS.codex;
  }

  // 5. Fallback to DEFAULT_LIMITS or default
  return DEFAULT_LIMITS[provider] || DEFAULT_LIMITS.default;
}

/**
 * Apply context compression to request body.
 * Operates in 3 layers of increasing aggressiveness:
 *
 * Layer 1: Trim tool_result messages (truncate long outputs)
 * Layer 2: Compress thinking blocks (remove from history, keep last)
 * Layer 3: Aggressive purification (drop old messages until fitting)
 *
 * @param {object} body - Request body with messages[]
 * @param {object} options - { provider?, model?, maxTokens?, reserveTokens? }
 * @returns {{ body: object, compressed: boolean, stats: object }}
 */
export function compressContext(
  body: Record<string, unknown>,
  options: { provider?: string; model?: string; maxTokens?: number; reserveTokens?: number } = {}
) {
  if (!body || !body.messages || !Array.isArray(body.messages)) {
    return { body, compressed: false, stats: {} };
  }

  const provider = options.provider || "default";
  const maxTokens =
    options.maxTokens || getTokenLimit(provider, (body.model as string) || options.model || null);
  const defaultReserveTokens = Math.min(16000, Math.max(256, Math.floor(maxTokens * 0.15)));
  const reserveTokens = Math.min(
    options.reserveTokens ?? getReserveTokensOverride() ?? defaultReserveTokens,
    Math.max(0, maxTokens - 1)
  );
  const targetTokens = Math.max(0, maxTokens - reserveTokens);

  let messages = [...body.messages];
  let currentTokens = estimateTokens(JSON.stringify(messages));
  const stats = { original: currentTokens, layers: [] };

  // Already fits
  if (currentTokens <= targetTokens) {
    return { body, compressed: false, stats: { original: currentTokens, final: currentTokens } };
  }

  // Layer 1: Trim tool_result/tool messages
  messages = trimToolMessages(messages, 2000); // Max 2000 chars per tool result
  currentTokens = estimateTokens(JSON.stringify(messages));
  stats.layers.push({ name: "trim_tools", tokens: currentTokens });

  if (currentTokens <= targetTokens) {
    return {
      body: { ...body, messages },
      compressed: true,
      stats: { ...stats, final: currentTokens },
    };
  }

  // Layer 2: Compress thinking blocks (remove from non-last assistant messages)
  messages = compressThinking(messages);
  currentTokens = estimateTokens(JSON.stringify(messages));
  stats.layers.push({ name: "compress_thinking", tokens: currentTokens });

  if (currentTokens <= targetTokens) {
    return {
      body: { ...body, messages },
      compressed: true,
      stats: { ...stats, final: currentTokens },
    };
  }

  // Layer 3: Aggressive purification — drop oldest messages keeping system + last N pairs
  messages = purifyHistory(messages, targetTokens);
  currentTokens = estimateTokens(JSON.stringify(messages));
  stats.layers.push({ name: "purify_history", tokens: currentTokens });

  return {
    body: { ...body, messages },
    compressed: true,
    stats: { ...stats, final: currentTokens },
  };
}

// ─── Layer 1: Trim Tool Messages ────────────────────────────────────────────

function trimToolMessages(messages: Record<string, unknown>[], maxChars: number) {
  return messages.map((msg) => {
    if (msg.role === "tool" && typeof msg.content === "string" && msg.content.length > maxChars) {
      return {
        ...msg,
        content: msg.content.slice(0, maxChars) + "\n... [truncated]",
      };
    }
    // Handle array content (Claude format with tool_result blocks)
    if (msg.role === "user" && Array.isArray(msg.content)) {
      return {
        ...msg,
        content: msg.content.map((block) => {
          if (
            block.type === "tool_result" &&
            typeof block.content === "string" &&
            block.content.length > maxChars
          ) {
            return { ...block, content: block.content.slice(0, maxChars) + "\n... [truncated]" };
          }
          return block;
        }),
      };
    }
    return msg;
  });
}

// ─── Layer 2: Compress Thinking Blocks ──────────────────────────────────────

function compressThinking(messages: Record<string, unknown>[]) {
  // Find last assistant message index
  let lastAssistantIdx = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "assistant") {
      lastAssistantIdx = i;
      break;
    }
  }

  return messages.map((msg, i) => {
    if (msg.role !== "assistant") return msg;
    if (i === lastAssistantIdx) return msg; // Keep thinking in last assistant msg

    // Remove thinking blocks from content array
    if (Array.isArray(msg.content)) {
      const filtered = msg.content.filter((block) => block.type !== "thinking");
      if (filtered.length === 0) {
        return { ...msg, content: "[thinking compressed]" };
      }
      return { ...msg, content: filtered };
    }

    // Remove thinking XML tags from string content
    if (typeof msg.content === "string") {
      let cleaned = msg.content;
      for (const [start, end] of [
        ["<thinking>", "</thinking>"],
        ["<antThinking>", "</antThinking>"],
      ]) {
        while (true) {
          const s = cleaned.indexOf(start);
          if (s === -1) break;
          const e = cleaned.indexOf(end, s + start.length);
          if (e === -1) {
            cleaned = cleaned.slice(0, s);
            break;
          }
          cleaned = cleaned.slice(0, s) + cleaned.slice(e + end.length);
        }
      }
      cleaned = cleaned.trim();
      return { ...msg, content: cleaned || "[thinking compressed]" };
    }

    return msg;
  });
}

// ─── Layer 3: Aggressive Purification ───────────────────────────────────────

function purifyHistory(messages: Record<string, unknown>[], targetTokens: number) {
  // Keep system message(s) and the last N message pairs
  const system = messages.filter((m) => m.role === "system" || m.role === "developer");
  const nonSystem = messages.filter((m) => m.role !== "system" && m.role !== "developer");

  // Binary search for how many messages to keep from the end
  let keep = nonSystem.length;
  while (keep > 2) {
    let candidate = [...system, ...nonSystem.slice(-keep)];
    candidate = fixToolPairs(candidate);
    const tokens = estimateTokens(JSON.stringify(candidate));
    if (tokens <= targetTokens) break;
    keep = Math.max(2, Math.floor(keep * 0.7)); // Drop 30% each iteration
  }

  let result = [...system, ...nonSystem.slice(-keep)];
  result = fixToolPairs(result);

  // Add summary of dropped messages
  if (keep < nonSystem.length) {
    const dropped = nonSystem.length - keep;
    result.splice(system.length, 0, {
      role: "system",
      content: `[Context compressed: ${dropped} earlier messages removed to fit context window]`,
    });
  }

  return result;
}

/**
 * Remove orphaned tool_result messages whose preceding tool_use was dropped.
 * Also removes orphaned tool_use messages without a corresponding tool_result.
 *
 * When purifyHistory() drops oldest messages, it can split tool_use/tool_result
 * pairs — keeping the tool_result but dropping the tool_use that initiated it.
 * This causes upstream providers to reject the request with errors like:
 *   - Claude: "tool_result message must be preceded by a tool_use message"
 *   - OpenAI: "Invalid message format"
 *   - Gemini: "Function response without function call"
 */
function fixToolPairs(messages: Record<string, unknown>[]) {
  // Pass 1: Collect all tool_result IDs from user/tool messages
  const toolResultIds = new Set();
  for (const msg of messages) {
    if (msg.role === "tool" && msg.tool_call_id) {
      toolResultIds.add(msg.tool_call_id);
    }
    if (msg.role === "user" && Array.isArray(msg.content)) {
      for (const block of msg.content) {
        if (block.type === "tool_result" && block.tool_use_id) {
          toolResultIds.add(block.tool_use_id);
        }
      }
    }
  }

  // Pass 2: Filter assistant messages to remove tool_use without tool_result
  // (Exception: keep tool_use if the assistant message is the last message)
  const isLastMessage = (idx: number) => idx === messages.length - 1;
  const filteredMessages = messages.map((msg, idx) => {
    if (msg.role === "assistant" && !isLastMessage(idx)) {
      let modified = false;
      const newMsg = { ...msg };

      if (Array.isArray(newMsg.tool_calls)) {
        const filteredToolCalls = newMsg.tool_calls.filter(
          (tc: Record<string, unknown>) => !tc.id || toolResultIds.has(tc.id)
        );
        if (filteredToolCalls.length !== newMsg.tool_calls.length) {
          newMsg.tool_calls = filteredToolCalls;
          modified = true;
        }
      }

      if (Array.isArray(newMsg.content)) {
        const filteredContent = newMsg.content.filter(
          (block: Record<string, unknown>) =>
            block.type !== "tool_use" || !block.id || toolResultIds.has(block.id)
        );
        if (filteredContent.length !== newMsg.content.length) {
          newMsg.content = filteredContent;
          modified = true;
        }
      }

      return modified ? newMsg : msg;
    }
    return msg;
  });

  // Pass 3: Collect all remaining tool_use IDs from assistant messages
  const toolCallIds = new Set();
  for (const msg of filteredMessages) {
    if (msg.role === "assistant") {
      if (Array.isArray(msg.tool_calls)) {
        for (const tc of msg.tool_calls) {
          if (tc.id) toolCallIds.add(tc.id);
        }
      }
      if (Array.isArray(msg.content)) {
        for (const block of msg.content) {
          if (block.type === "tool_use" && block.id) {
            toolCallIds.add(block.id);
          }
        }
      }
    }
  }

  // Pass 4: Filter user/tool messages to remove tool_result without tool_use
  return filteredMessages
    .map((msg) => {
      if (msg.role === "tool" && msg.tool_call_id) {
        if (!toolCallIds.has(msg.tool_call_id)) return null;
      }

      if (msg.role === "user" && Array.isArray(msg.content)) {
        const filteredContent = msg.content.filter(
          (block: Record<string, unknown>) =>
            block.type !== "tool_result" || !block.tool_use_id || toolCallIds.has(block.tool_use_id)
        );
        if (filteredContent.length !== msg.content.length) {
          if (filteredContent.length === 0) return null;
          return { ...msg, content: filteredContent };
        }
      }

      // Drop assistant messages if their content AND tool_calls became empty
      if (msg.role === "assistant") {
        const hasContent =
          typeof msg.content === "string"
            ? msg.content.trim().length > 0
            : Array.isArray(msg.content) && msg.content.length > 0;
        const hasToolCalls = Array.isArray(msg.tool_calls) && msg.tool_calls.length > 0;
        if (!hasContent && !hasToolCalls) {
          return null;
        }
      }

      return msg;
    })
    .filter(Boolean) as Record<string, unknown>[];
}
