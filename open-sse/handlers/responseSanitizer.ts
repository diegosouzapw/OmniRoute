/**
 * Response Sanitizer — Normalizes LLM responses to strict OpenAI SDK format.
 *
 * Fixes Issues:
 * 1. Strips non-standard fields (x_groq, usage_breakdown, service_tier) that
 *    break OpenAI Python SDK v1.83+ Pydantic validation (returns str instead of object)
 * 2. Extracts <think> tags from thinking models into reasoning_content
 * 3. Normalizes response id, object, and usage fields
 * 4. Converts developer role → system for non-OpenAI providers
 */

// ── Standard OpenAI ChatCompletion fields ──────────────────────────────────
const ALLOWED_TOP_LEVEL_FIELDS = new Set([
  "id",
  "object",
  "created",
  "model",
  "choices",
  "usage",
  "system_fingerprint",
]);

const ALLOWED_USAGE_FIELDS = new Set([
  "prompt_tokens",
  "completion_tokens",
  "total_tokens",
  "prompt_tokens_details",
  "completion_tokens_details",
]);

const ALLOWED_MESSAGE_FIELDS = new Set([
  "role",
  "content",
  "tool_calls",
  "function_call",
  "refusal",
  "reasoning_content",
]);

const ALLOWED_CHOICE_FIELDS = new Set(["index", "message", "delta", "finish_reason", "logprobs"]);

// ── Think tag regex ────────────────────────────────────────────────────────
// Matches <think>...</think> blocks (greedy, dotAll)
const THINK_TAG_REGEX = /<think>([\s\S]*?)<\/think>/gi;

/**
 * Extract <think> blocks from text content and return separated parts.
 * @returns {{ content: string, thinking: string | null }}
 */
export function extractThinkingFromContent(text: string): {
  content: string;
  thinking: string | null;
} {
  if (!text || typeof text !== "string") {
    return { content: text || "", thinking: null };
  }

  const thinkingParts: string[] = [];
  let hasThinkTags = false;

  const cleaned = text.replace(THINK_TAG_REGEX, (_, thinkContent) => {
    hasThinkTags = true;
    const trimmed = thinkContent.trim();
    if (trimmed) {
      thinkingParts.push(trimmed);
    }
    return "";
  });

  if (!hasThinkTags) {
    return { content: text, thinking: null };
  }

  return {
    content: cleaned.trim(),
    thinking: thinkingParts.length > 0 ? thinkingParts.join("\n\n") : null,
  };
}

/**
 * Sanitize a non-streaming OpenAI ChatCompletion response.
 * Strips non-standard fields and normalizes required fields.
 */
export function sanitizeOpenAIResponse(body: any): any {
  if (!body || typeof body !== "object") return body;

  // Build sanitized response with only allowed top-level fields
  const sanitized: Record<string, any> = {};

  // Ensure required fields exist
  sanitized.id = normalizeResponseId(body.id);
  sanitized.object = body.object || "chat.completion";
  sanitized.created = body.created || Math.floor(Date.now() / 1000);
  sanitized.model = body.model || "unknown";

  // Sanitize choices
  if (Array.isArray(body.choices)) {
    sanitized.choices = body.choices.map((choice: any, idx: number) => sanitizeChoice(choice, idx));
  } else {
    sanitized.choices = [];
  }

  // Sanitize usage
  if (body.usage && typeof body.usage === "object") {
    sanitized.usage = sanitizeUsage(body.usage);
  }

  // Keep system_fingerprint if present (it's a valid OpenAI field)
  if (body.system_fingerprint) {
    sanitized.system_fingerprint = body.system_fingerprint;
  }

  return sanitized;
}

/**
 * Sanitize a single choice object.
 */
function sanitizeChoice(choice: any, defaultIndex: number): any {
  const sanitized: Record<string, any> = {
    index: choice.index ?? defaultIndex,
    finish_reason: choice.finish_reason || null,
  };

  // Sanitize message (non-streaming) or delta (streaming)
  if (choice.message) {
    sanitized.message = sanitizeMessage(choice.message);
  }
  if (choice.delta) {
    sanitized.delta = sanitizeMessage(choice.delta);
  }

  // Keep logprobs if present
  if (choice.logprobs !== undefined) {
    sanitized.logprobs = choice.logprobs;
  }

  return sanitized;
}

/**
 * Sanitize a message object, extracting <think> tags if present.
 */
function sanitizeMessage(msg: any): any {
  if (!msg || typeof msg !== "object") return msg;

  const sanitized: Record<string, any> = {};

  // Copy only allowed fields
  if (msg.role) sanitized.role = msg.role;
  if (msg.refusal !== undefined) sanitized.refusal = msg.refusal;

  // Handle content — extract <think> tags
  if (typeof msg.content === "string") {
    const { content, thinking } = extractThinkingFromContent(msg.content);
    sanitized.content = content;

    // Set reasoning_content from <think> tags (if not already set)
    if (thinking && !msg.reasoning_content) {
      sanitized.reasoning_content = thinking;
    }
  } else if (msg.content !== undefined) {
    sanitized.content = msg.content;
  }

  // Preserve existing reasoning_content (from providers that natively support it)
  if (msg.reasoning_content && !sanitized.reasoning_content) {
    sanitized.reasoning_content = msg.reasoning_content;
  }

  // Preserve tool_calls
  if (msg.tool_calls) {
    sanitized.tool_calls = msg.tool_calls;
  }

  // Preserve function_call (legacy)
  if (msg.function_call) {
    sanitized.function_call = msg.function_call;
  }

  return sanitized;
}

/**
 * Sanitize usage object — keep only standard fields.
 */
function sanitizeUsage(usage: any): any {
  if (!usage || typeof usage !== "object") return usage;

  const sanitized: Record<string, any> = {};
  for (const key of ALLOWED_USAGE_FIELDS) {
    if (usage[key] !== undefined) {
      sanitized[key] = usage[key];
    }
  }

  // Ensure required fields
  if (sanitized.prompt_tokens === undefined) sanitized.prompt_tokens = 0;
  if (sanitized.completion_tokens === undefined) sanitized.completion_tokens = 0;
  if (sanitized.total_tokens === undefined) {
    sanitized.total_tokens = sanitized.prompt_tokens + sanitized.completion_tokens;
  }

  return sanitized;
}

/**
 * Normalize response ID to use chatcmpl- prefix.
 */
function normalizeResponseId(id: any): string {
  if (!id || typeof id !== "string") {
    return `chatcmpl-${crypto.randomUUID().replace(/-/g, "").slice(0, 29)}`;
  }
  // Already correct format
  if (id.startsWith("chatcmpl-")) return id;
  // Keep custom IDs but don't break them
  return id;
}

/**
 * Sanitize a streaming SSE chunk for passthrough mode.
 * Lighter than full sanitization — only strips problematic extra fields.
 */
export function sanitizeStreamingChunk(parsed: any): any {
  if (!parsed || typeof parsed !== "object") return parsed;

  // Build sanitized chunk
  const sanitized: Record<string, any> = {};

  // Keep only standard fields
  if (parsed.id !== undefined) sanitized.id = parsed.id;
  sanitized.object = parsed.object || "chat.completion.chunk";
  if (parsed.created !== undefined) sanitized.created = parsed.created;
  if (parsed.model !== undefined) sanitized.model = parsed.model;

  // Sanitize choices with delta
  if (Array.isArray(parsed.choices)) {
    sanitized.choices = parsed.choices.map((choice: any) => {
      const c: Record<string, any> = {
        index: choice.index ?? 0,
      };
      if (choice.delta !== undefined) {
        c.delta = {};
        const delta = choice.delta;
        if (delta.role !== undefined) c.delta.role = delta.role;
        if (delta.content !== undefined) c.delta.content = delta.content;
        if (delta.reasoning_content !== undefined)
          c.delta.reasoning_content = delta.reasoning_content;
        if (delta.tool_calls !== undefined) c.delta.tool_calls = delta.tool_calls;
        if (delta.function_call !== undefined) c.delta.function_call = delta.function_call;
      }
      if (choice.finish_reason !== undefined) c.finish_reason = choice.finish_reason;
      if (choice.logprobs !== undefined) c.logprobs = choice.logprobs;
      return c;
    });
  }

  // Sanitize usage if present
  if (parsed.usage && typeof parsed.usage === "object") {
    sanitized.usage = sanitizeUsage(parsed.usage);
  }

  // Keep system_fingerprint if present
  if (parsed.system_fingerprint) {
    sanitized.system_fingerprint = parsed.system_fingerprint;
  }

  return sanitized;
}
