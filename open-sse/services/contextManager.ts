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
  return resolveTokenLimit(provider, model).limit;
}

/**
 * Same chain as getTokenLimit, but also reports whether the limit came from
 * a provider/model-specific source (env override, synced DB, registry,
 * name heuristic, curated per-provider default) or only from the generic
 * catch-all default.
 */
function resolveTokenLimit(
  provider: string,
  model: string | null = null
): { limit: number; specific: boolean } {
  // 1. Check environment variable override first
  const envOverride = getEnvOverride(provider);
  if (envOverride) return { limit: envOverride, specific: true };

  // 2. Check models.dev synced DB for per-model context limit
  if (model) {
    const dbLimit = getModelContextLimit(provider, model);
    if (dbLimit && dbLimit > 0) return { limit: dbLimit, specific: true };
  }

  // 3. Check registry for provider default
  const registryEntry = REGISTRY[provider];
  if (registryEntry?.defaultContextLength) {
    return { limit: registryEntry.defaultContextLength, specific: true };
  }

  // 4. Check if model name hints at a known limit
  if (model) {
    const lower = model.toLowerCase();
    if (lower.includes("claude")) return { limit: DEFAULT_LIMITS.claude, specific: true };
    if (lower.includes("gemini")) return { limit: DEFAULT_LIMITS.gemini, specific: true };
    if (
      lower.includes("gpt") ||
      lower.includes("o1") ||
      lower.includes("o3") ||
      lower.includes("o4") ||
      lower.includes("codex")
    )
      return { limit: DEFAULT_LIMITS.codex, specific: true };
  }

  // 5. Fallback to DEFAULT_LIMITS or default
  if (DEFAULT_LIMITS[provider]) return { limit: DEFAULT_LIMITS[provider], specific: true };
  return { limit: DEFAULT_LIMITS.default, specific: false };
}

/**
 * Resolve the context limit to use for proactive compression of a COMBO
 * request.
 *
 * chatCore always executes with the CONCRETE target's provider/model
 * (handleSingleModel resolves the target before delegating), so the
 * executing target's own limit is authoritative. Using min(...allTargets)
 * here — the previous behavior — compressed at the smallest sibling's
 * window even when running on the largest target, destructively purging
 * history long before the real window filled ("agent keeps forgetting").
 *
 * min(...comboTargetLimits) is kept only as a defensive fallback for the
 * case where the current provider/model resolves no specific limit at all.
 */
export function resolveComboContextLimit(options: {
  provider: string;
  model: string | null;
  comboTargetLimits: number[];
}): { limit: number; source: "target" | "combo-min" | "fallback" } {
  const own = resolveTokenLimit(options.provider, options.model ?? null);
  if (own.specific) {
    return { limit: own.limit, source: "target" };
  }
  const knownTargets = (options.comboTargetLimits || []).filter(
    (value) => Number.isFinite(value) && value > 0
  );
  if (knownTargets.length > 0) {
    return { limit: Math.min(...knownTargets), source: "combo-min" };
  }
  return { limit: own.limit, source: "fallback" };
}

/**
 * Apply context compression to request body.
 * Operates in 3 layers of increasing aggressiveness:
 *
 * Layer 1: Trim tool_result messages (truncate long outputs)
 * Layer 2: Compress structured thinking blocks (remove from history, keep last)
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
  const stats = { original: currentTokens, layers: [] as { name: string; tokens: number }[] };

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

  // Layer 2: Compress structured thinking blocks (remove from non-last assistant messages)
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

// ─── Layer 2: Compress Structured Thinking Blocks ───────────────────────────

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
    candidate = fixToolAdjacency(candidate);
    // Re-run pair fix: fixToolAdjacency may have stripped tool_use blocks, leaving
    // orphan tool_results that Claude rejects ("tool_result without preceding tool_use").
    candidate = fixToolPairs(candidate);
    candidate = stripTrailingAssistantOrphanToolUse(candidate);
    const tokens = estimateTokens(JSON.stringify(candidate));
    if (tokens <= targetTokens) break;
    keep = Math.max(2, Math.floor(keep * 0.7)); // Drop 30% each iteration
  }

  let result = [...system, ...nonSystem.slice(-keep)];
  result = fixToolPairs(result);
  result = fixToolAdjacency(result);
  // Re-run pair fix to drop any tool_result whose matching tool_use was removed by
  // fixToolAdjacency (discussion #2410 — orphan tool_result -> upstream 400).
  result = fixToolPairs(result);
  result = stripTrailingAssistantOrphanToolUse(result);

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
export function fixToolPairs(messages: Record<string, unknown>[]) {
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

/**
 * Adjacency guard: Claude requires `tool_result` in the IMMEDIATELY NEXT
 * message after `tool_use`, not just somewhere later in the array.
 *
 * `fixToolPairs` checks global ID presence but not adjacency. This function
 * runs after `fixToolPairs` and removes `tool_use` blocks from assistant
 * messages where the next message does not contain a matching `tool_result`.
 */
export function fixToolAdjacency(messages: Record<string, unknown>[]): Record<string, unknown>[] {
  if (messages.length <= 1) return messages;

  const result: Record<string, unknown>[] = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const nextMsg = messages[i + 1];

    if (msg.role !== "assistant" || !nextMsg) {
      result.push(msg);
      continue;
    }

    // Collect tool_result IDs from the NEXT message only
    const nextToolResultIds = new Set<string>();
    if (nextMsg.role === "tool" && nextMsg.tool_call_id) {
      nextToolResultIds.add(String(nextMsg.tool_call_id));
    }
    if (nextMsg.role === "user" && Array.isArray(nextMsg.content)) {
      for (const block of nextMsg.content as Record<string, unknown>[]) {
        if (block.type === "tool_result" && block.tool_use_id) {
          nextToolResultIds.add(String(block.tool_use_id));
        }
      }
    }

    let modified = false;
    const newMsg: Record<string, unknown> = { ...msg };

    // Filter tool_use blocks in content array (Claude format)
    if (Array.isArray(newMsg.content)) {
      const filteredContent = (newMsg.content as Record<string, unknown>[]).filter(
        (block) => block.type !== "tool_use" || !block.id || nextToolResultIds.has(String(block.id))
      );
      if (filteredContent.length !== (newMsg.content as unknown[]).length) {
        newMsg.content = filteredContent;
        modified = true;
      }
    }

    // Filter tool_calls array (OpenAI format) — independently of content
    if (Array.isArray(newMsg.tool_calls)) {
      const filteredToolCalls = (newMsg.tool_calls as Record<string, unknown>[]).filter(
        (tc: Record<string, unknown>) => !tc.id || nextToolResultIds.has(String(tc.id))
      );
      if (filteredToolCalls.length !== (newMsg.tool_calls as unknown[]).length) {
        newMsg.tool_calls = filteredToolCalls;
        modified = true;
      }
    }

    if (modified) {
      // Drop assistant message if it became empty
      const hasContent =
        typeof newMsg.content === "string"
          ? (newMsg.content as string).trim().length > 0
          : Array.isArray(newMsg.content) && (newMsg.content as unknown[]).length > 0;
      const hasToolCalls = Array.isArray(newMsg.tool_calls) && newMsg.tool_calls.length > 0;
      if (!hasContent && !hasToolCalls) continue;
      result.push(newMsg);
    } else {
      result.push(msg);
    }
  }

  return result;
}

/**
 * Upstream-send guard: after `fixToolPairs`, strip a trailing assistant
 * message whose only/remaining content is an orphan `tool_use` block.
 *
 * `fixToolPairs` intentionally preserves a final-message `tool_use` because
 * during context pruning the client is still waiting on the matching
 * `tool_result` — dropping it there would lose state. But on the
 * upstream-send path the request body must end on a user turn; a trailing
 * `assistant(tool_use)` triggers the same Anthropic 400 the guard is
 * trying to prevent:
 *   messages.N: `tool_use` ids were found without `tool_result` blocks
 *   immediately after: toolu_...
 *
 * Behavior:
 *  - If the last message is `assistant` and contains any `tool_use` block,
 *    those blocks are removed.
 *  - If removal leaves the message with no content / tool_calls at all, the
 *    message itself is dropped.
 *  - Idempotent on clean histories (trailing user, trailing assistant with
 *    only text/thinking, etc.).
 */
export function stripTrailingAssistantOrphanToolUse(
  messages: Record<string, unknown>[]
): Record<string, unknown>[] {
  if (!Array.isArray(messages) || messages.length === 0) return messages;

  const lastIdx = messages.length - 1;
  const last = messages[lastIdx];
  if (!last || last.role !== "assistant") return messages;

  let modified = false;
  const newLast: Record<string, unknown> = { ...last };

  if (Array.isArray(newLast.tool_calls)) {
    const filteredCalls = (newLast.tool_calls as Record<string, unknown>[]).filter(
      () => false // remove all trailing tool_calls (none can be paired by definition)
    );
    if (filteredCalls.length !== (newLast.tool_calls as unknown[]).length) {
      newLast.tool_calls = filteredCalls;
      modified = true;
    }
  }

  if (Array.isArray(newLast.content)) {
    const filteredContent = (newLast.content as Record<string, unknown>[]).filter(
      (block) => block.type !== "tool_use"
    );
    if (filteredContent.length !== (newLast.content as unknown[]).length) {
      newLast.content = filteredContent;
      modified = true;
    }
  }

  if (!modified) return messages;

  // If the last message is now empty, drop it.
  const hasContent =
    typeof newLast.content === "string"
      ? (newLast.content as string).trim().length > 0
      : Array.isArray(newLast.content) && (newLast.content as unknown[]).length > 0;
  const hasToolCalls =
    Array.isArray(newLast.tool_calls) && (newLast.tool_calls as unknown[]).length > 0;

  const result = messages.slice(0, lastIdx);
  if (hasContent || hasToolCalls) result.push(newLast);
  return result;
}

/**
 * Providers that strictly require the last message to be `user` or `tool`.
 * A trailing `assistant` message with plain text content (no tool_use) is
 * valid for Anthropic/OpenAI (signals "continue from here") but rejected by
 * Mistral with: "Expected last role User or Tool … but got assistant" (#3396).
 */
const PROVIDERS_REQUIRING_USER_LAST_MESSAGE = new Set(["mistral"]);

/**
 * Strip a trailing `assistant` message that contains ONLY plain text (no
 * `tool_use` / `tool_calls`) for providers that mandate user-last format.
 *
 * Call this AFTER `stripTrailingAssistantOrphanToolUse` on the upstream-send
 * path so `tool_use` orphans are already removed before this check runs.
 */
export function stripTrailingAssistantForProvider(
  messages: Record<string, unknown>[],
  provider: string
): Record<string, unknown>[] {
  if (!PROVIDERS_REQUIRING_USER_LAST_MESSAGE.has(provider)) return messages;
  if (!Array.isArray(messages) || messages.length === 0) return messages;

  const last = messages[messages.length - 1];
  if (!last || last.role !== "assistant") return messages;

  // Only strip when the message has NO tool_use / tool_calls (those are
  // handled by stripTrailingAssistantOrphanToolUse upstream of this call).
  const hasToolUse =
    Array.isArray(last.content) &&
    (last.content as Record<string, unknown>[]).some((b) => b.type === "tool_use");
  const hasToolCalls = Array.isArray(last.tool_calls) && (last.tool_calls as unknown[]).length > 0;
  if (hasToolUse || hasToolCalls) return messages;

  return messages.slice(0, messages.length - 1);
}
