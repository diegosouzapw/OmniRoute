/**
 * comboAgentMiddleware.ts — Combo Agent Features
 *
 * Implements the "combo as agent" features from issues #399 and #401:
 *
 * 1. **System Message Override** (#399): If the combo defines a `system_message`,
 *    it is injected as the first system message, replacing any existing system message.
 *
 * 2. **Tool Filter Regex** (#399): If the combo defines a `tool_filter_regex`,
 *    only tools whose name matches the pattern are forwarded to the provider.
 *
 * 3. **Context Caching Protection** (#401): If the combo enables
 *    `context_cache_protection`, the proxy:
 *    a. On response: injects `<omniModel>provider/model</omniModel>` tag into
 *       the first assistant message content string.
 *    b. On request: scans the message history for the tag, and if found,
 *       overrides the requested model with the pinned one.
 *
 * All features are opt-in per combo and backward compatible with existing setups.
 */

interface ComboConfig {
  system_message?: string | null;
  tool_filter_regex?: string | null;
  context_cache_protection?: number | boolean;
  [key: string]: unknown;
}

interface Message {
  role?: string;
  content?: unknown;
  [key: string]: unknown;
}

// ── Context Caching Tag ─────────────────────────────────────────────────────

// Handles both actual newlines (U+000A) and literal \n sequences injected
// by combo.ts streaming around the <omniModel> tag (#531). Non-global so that
// .exec() and .test() stay stateless; callers that need full replacement use
// String.prototype.replace() which replaces all non-overlapping matches.
const CACHE_TAG_PATTERN = /(?:\\n|\n|\r)*<omniModel>([^<]+)<\/omniModel>(?:\\n|\n|\r)*/;

/**
 * Inject the model tag into the last assistant message (or append a new one).
 * Only modifies string content — does not touch array content to avoid breaking
 * Claude/Gemini multi-part message formats.
 */
export function injectModelTag(messages: Message[], providerModel: string): Message[] {
  // Remove any existing tag first to avoid duplication on context compaction
  const cleaned = messages.map((msg) => {
    if (msg.role === "assistant" && typeof msg.content === "string") {
      return { ...msg, content: msg.content.replace(CACHE_TAG_PATTERN, "").trimEnd() };
    }
    return msg;
  });

  // Find last assistant message with string content
  const lastAssistantIdx = cleaned.map((m) => m.role).lastIndexOf("assistant");

  // #474: If no assistant message exists yet (first turn), append a synthetic one
  // so the tag is present when the client sends the next request with the response.
  if (lastAssistantIdx === -1) {
    return [...cleaned, { role: "assistant", content: `<omniModel>${providerModel}</omniModel>` }];
  }

  const msg = cleaned[lastAssistantIdx];
  // Fix #721: Handle messages where content is not a string (tool_calls responses).
  // In this case, append a synthetic assistant message with the tag so the pin
  // roundtrips through the conversation history.
  if (typeof msg.content !== "string") {
    // If the message has tool_calls but no string content, append a new assistant
    // message with the tag rather than silently failing.
    return [...cleaned, { role: "assistant", content: `<omniModel>${providerModel}</omniModel>` }];
  }

  const tagged = [...cleaned];
  tagged[lastAssistantIdx] = {
    ...msg,
    content: `${msg.content}<omniModel>${providerModel}</omniModel>`,
  };
  return tagged;
}

/**
 * Scan message history for the model tag injected by a previous response.
 * Returns the pinned "provider/model" string, or null if not found.
 */
export function extractPinnedModel(messages: Message[]): string | null {
  // Scan from newest to oldest for efficiency
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role === "assistant" && typeof msg.content === "string") {
      const match = CACHE_TAG_PATTERN.exec(msg.content);
      if (match) return match[1];
    }
  }
  return null;
}

// ── System Message Override ──────────────────────────────────────────────────

/**
 * Replace or inject a system message at the beginning of the messages array.
 * Existing system messages are removed if a combo override is set.
 */
export function applySystemMessageOverride(messages: Message[], systemMessage: string): Message[] {
  // Remove all existing system messages
  const filtered = messages.filter((m) => m.role !== "system");
  // Inject combo system message at start
  return [{ role: "system", content: systemMessage }, ...filtered];
}

// ── Tool Filter Regex ────────────────────────────────────────────────────────

/**
 * Filter the tools array, keeping only tools whose name matches the regex.
 * Returns the original array unchanged if pattern is null/empty.
 */
export function applyToolFilter(
  tools: unknown[] | undefined,
  pattern: string | null | undefined
): unknown[] | undefined {
  if (!tools || !pattern) return tools;

  let regex: RegExp;
  try {
    regex = new RegExp(pattern);
  } catch {
    // Invalid regex — return tools unchanged rather than crashing
    console.warn(`[ComboAgent] Invalid tool_filter_regex: "${pattern}"`);
    return tools;
  }

  return tools.filter((tool) => {
    const t = tool as Record<string, unknown>;
    // Support both OpenAI format ({ function: { name } }) and Anthropic ({ name })
    const name = (t.function as Record<string, unknown> | undefined)?.name ?? t.name ?? "";
    return regex.test(String(name));
  });
}

/**
 * Strip all <omniModel> tags from message content before forwarding to the provider.
 * The tag is an internal OmniRoute marker; providers must never see it or their
 * cache will treat every tagged request as a new session (#454).
 */
export function stripModelTags(messages: Message[]): Message[] {
  return messages.map((msg) => {
    if (typeof msg.content === "string" && CACHE_TAG_PATTERN.test(msg.content)) {
      return { ...msg, content: msg.content.replace(CACHE_TAG_PATTERN, "").trimEnd() };
    }
    return msg;
  });
}

// ── Main Middleware ──────────────────────────────────────────────────────────

/**
 * Apply all combo agent features to the request body.
 * Safe to call with null/undefined comboConfig — returns body unchanged.
 */
export function applyComboAgentMiddleware(
  body: Record<string, unknown>,
  comboConfig: ComboConfig | null | undefined,
  providerModel: string // "provider/model" string for context caching
): { body: Record<string, unknown>; pinnedModel: string | null } {
  if (!comboConfig) return { body, pinnedModel: null };

  let messages: Message[] = Array.isArray(body.messages) ? [...body.messages] : [];
  let pinnedModel: string | null = null;

  // 1. Context caching: check for pinned model in history
  if (comboConfig.context_cache_protection) {
    pinnedModel = extractPinnedModel(messages);
    if (pinnedModel) {
      // (#535) Model is pinned via <omniModel> tag — override body.model so the combo
      // router uses exactly this model instead of picking a different one. Without this,
      // the extracted pinnedModel is returned but body.model is unchanged, breaking
      // context cache sessions by sending subsequent turns to a different model.
      body = { ...body, model: pinnedModel };
    }
  }

  // 2. System message override
  if (comboConfig.system_message && comboConfig.system_message.trim()) {
    messages = applySystemMessageOverride(messages, comboConfig.system_message);
  }

  // 3. Tool filter
  const filteredTools = applyToolFilter(
    body.tools as unknown[] | undefined,
    comboConfig.tool_filter_regex
  );

  // 4. Strip internal <omniModel> tags before forwarding to provider (#454)
  //    These tags are OmniRoute-internal markers and must never reach the provider
  //    since providers would treat each tagged request as a new cache session.
  messages = stripModelTags(messages);

  return {
    body: {
      ...body,
      messages,
      ...(filteredTools !== body.tools && { tools: filteredTools }),
    },
    pinnedModel,
  };
}
