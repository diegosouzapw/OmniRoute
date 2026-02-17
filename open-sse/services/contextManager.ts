/**
 * Context Manager — Phase 4
 *
 * Pre-flight context compression to prevent "prompt too long" errors.
 * 3 layers: trim tool messages, compress thinking, aggressive purification.
 */

// Default token limits per provider (rough estimates based on model context windows)
const DEFAULT_LIMITS = {
  claude: 200000,
  openai: 128000,
  gemini: 1000000,
  default: 128000,
};

// Rough chars-per-token ratio for quick estimation
const CHARS_PER_TOKEN = 4;

/**
 * Estimate token count from text length
 */
export function estimateTokens(text) {
  if (!text) return 0;
  const str = typeof text === "string" ? text : JSON.stringify(text);
  return Math.ceil(str.length / CHARS_PER_TOKEN);
}

/**
 * Get token limit for a provider/model combination
 */
export function getTokenLimit(provider, model = null) {
  // Check if model has a known limit
  if (model) {
    const lower = model.toLowerCase();
    if (lower.includes("claude")) return DEFAULT_LIMITS.claude;
    if (lower.includes("gemini")) return DEFAULT_LIMITS.gemini;
    if (lower.includes("gpt") || lower.includes("o1") || lower.includes("o3") || lower.includes("o4")) return DEFAULT_LIMITS.openai;
  }
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
export function compressContext(body, options: any = {}) {
  if (!body || !body.messages || !Array.isArray(body.messages)) {
    return { body, compressed: false, stats: {} };
  }

  const provider = options.provider || "default";
  const maxTokens = options.maxTokens || getTokenLimit(provider, body.model || options.model);
  const reserveTokens = options.reserveTokens || 16000; // Reserve for response
  const targetTokens = maxTokens - reserveTokens;

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

function trimToolMessages(messages, maxChars) {
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
          if (block.type === "tool_result" && typeof block.content === "string" && block.content.length > maxChars) {
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

function compressThinking(messages) {
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
      const cleaned = msg.content
        .replace(/<thinking>[\s\S]*?<\/thinking>/g, "")
        .replace(/<antThinking>[\s\S]*?<\/antThinking>/g, "")
        .trim();
      return { ...msg, content: cleaned || "[thinking compressed]" };
    }

    return msg;
  });
}

// ─── Layer 3: Aggressive Purification ───────────────────────────────────────

function purifyHistory(messages, targetTokens) {
  // Keep system message(s) and the last N message pairs
  const system = messages.filter((m) => m.role === "system" || m.role === "developer");
  const nonSystem = messages.filter((m) => m.role !== "system" && m.role !== "developer");

  // Binary search for how many messages to keep from the end
  let keep = nonSystem.length;
  while (keep > 2) {
    const candidate = [...system, ...nonSystem.slice(-keep)];
    const tokens = estimateTokens(JSON.stringify(candidate));
    if (tokens <= targetTokens) break;
    keep = Math.max(2, Math.floor(keep * 0.7)); // Drop 30% each iteration
  }

  const result = [...system, ...nonSystem.slice(-keep)];

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
