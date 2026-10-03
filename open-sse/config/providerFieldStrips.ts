// Fields that, when literally named in an upstream 400 body, are safe to strip and
// retry once (FCC NIM-style recovery). Mirrors the existing context_management 400
// fallback in base.ts, generalized to these OpenAI-compat / NIM reasoning fields.
// `context_management` (9router#1468): Claude Code sends it top-level; strict
// anthropic-compatible gateways 400 with "context_management: Extra inputs are not
// permitted". The dedicated base.ts fallback only fires when OmniRoute's own
// contextEditing feature is enabled, so a client-sent field passed through
// untouched when the feature is off — this generic strip covers that case.
export const KNOWN_OFFENDING_FIELDS: readonly string[] = [
  "reasoning_budget",
  // OpenAI's reasoning-effort knob, sent top-level on Chat Completions.
  // Strict OpenAI-compatible gateways that don't implement it 400 with
  // "Unsupported parameter: reasoning_effort" — findOffendingField() must
  // recognize it so the reactive strip-and-retry in base.ts fires instead
  // of surfacing the 400 to the client.
  "reasoning_effort",
  "chat_template",
  "reasoning_content",
  "context_management",
  // GPT-5's Chat Completions-only output control. It can be present when a
  // routing rule substitutes a non-GPT OpenAI-compatible target (for example
  // Codex → GLM or Ollama Cloud), whose strict endpoint rejects it as an extra
  // field. Retrying without it is safe because it only changes output style.
  "verbosity",
];

/** Return the first known-offending field literally named in a 400 body, or null. */
export function findOffendingField(bodyText: string): string | null {
  if (typeof bodyText !== "string" || !bodyText) return null;
  for (const field of KNOWN_OFFENDING_FIELDS) {
    if (bodyText.includes(field)) return field;
  }
  return null;
}

/**
 * Regex to extract an unsupported parameter name from upstream 400 error text.
 * Matches:
 *   - "Unsupported parameter(s): thinking"
 *   - "Unsupported parameter: max_tokens"
 *   - "Unsupported parameter 'reasoning_budget'"
 */
export const UNSUPPORTED_PARAM_RE =
  /unsupported\s+parameter\w*(?:\s*\(s\))?[:\s]+["'`]?(\w+)["'`]?/i;

/**
 * Anthropic's wording for a retired sampling param:
 *   "`temperature` is deprecated for this model."
 * The name must be backtick-quoted so plain prose never matches.
 */
export const DEPRECATED_PARAM_RE = /`(\w+)`\s+is\s+deprecated\b/i;

// Stripping these changes what is asked, not how, so auto-learn must never block them.
const NON_STRIPPABLE_PARAMS = new Set([
  "model",
  "messages",
  "input",
  "contents",
  "system",
  "stream",
]);

/**
 * Extract a single unsupported parameter name from a 400 error body,
 * or null if the error does not match a known pattern.
 */
export function detectUnsupportedParam(bodyText: string): string | null {
  if (typeof bodyText !== "string" || !bodyText) return null;
  const name =
    UNSUPPORTED_PARAM_RE.exec(bodyText)?.[1] ?? DEPRECATED_PARAM_RE.exec(bodyText)?.[1] ?? null;
  return name && !NON_STRIPPABLE_PARAMS.has(name.toLowerCase()) ? name : null;
}

/**
 * Anthropic's 400 message when a request carries an `advisor_redacted_result` whose
 * `encrypted_content` was produced by a different organization.
 */
export const ADVISOR_UNDECRYPTABLE_MESSAGE = "Advisor tool result content could not be processed.";

/** True when a 400 body is Anthropic's undecryptable-advisor-result error. */
export function isAdvisorUndecryptableError(bodyText: string): boolean {
  if (typeof bodyText !== "string" || !bodyText) return false;
  try {
    const parsed = JSON.parse(bodyText) as { error?: { message?: unknown } };
    return parsed?.error?.message === ADVISOR_UNDECRYPTABLE_MESSAGE;
  } catch {
    return false;
  }
}

/**
 * Replace the content of every `advisor_tool_result` block that holds an encrypted
 * `advisor_redacted_result` with an `advisor_tool_result_error` (`unavailable`). The
 * paired `server_tool_use` and every other block stay as they are, so the message
 * structure is unchanged. Returns the same body when nothing was replaced.
 */
export function replaceRedactedAdvisorResults<T>(body: T): { body: T; replaced: number } {
  const messages = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(messages)) return { body, replaced: 0 };
  let replaced = 0;
  const nextMessages = messages.map((message) => {
    const content = (message as { content?: unknown } | null)?.content;
    if (!Array.isArray(content)) return message;
    let changed = false;
    const nextContent = content.map((block) => {
      const b = block as { type?: unknown; content?: { type?: unknown } } | null;
      if (b?.type !== "advisor_tool_result" || b.content?.type !== "advisor_redacted_result") {
        return block;
      }
      changed = true;
      replaced += 1;
      return {
        ...b,
        content: { type: "advisor_tool_result_error", error_code: "unavailable" },
      };
    });
    return changed ? { ...(message as object), content: nextContent } : message;
  });
  if (replaced === 0) return { body, replaced: 0 };
  return { body: { ...(body as object), messages: nextMessages } as T, replaced };
}
/** Immutably drop request fields Groq rejects with a 400. */
export function stripGroqUnsupportedFields<T extends Record<string, unknown>>(body: T): T {
  if (!body || typeof body !== "object") return body;
  const next: Record<string, unknown> = { ...body };
  delete next.logprobs;
  delete next.logit_bias;
  delete next.top_logprobs;
  if (Array.isArray(next.messages)) {
    next.messages = next.messages.map((m) => {
      if (m && typeof m === "object") {
        const {
          name: _name,
          model: _model,
          messageId: _msgId,
          sender: _sender,
          ...rest
        } = m as Record<string, unknown>;

        return rest;
      }

      return m;
    });
  }
  return next as T;
}
