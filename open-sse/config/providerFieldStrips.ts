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
 * Extract a single unsupported parameter name from a 400 error body,
 * or null if the error does not match the known pattern.
 */
export function detectUnsupportedParam(bodyText: string): string | null {
  if (typeof bodyText !== "string" || !bodyText) return null;
  const match = UNSUPPORTED_PARAM_RE.exec(bodyText);
  return match?.[1] ?? null;
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
      if (m && typeof m === "object" && "name" in m) {
        const { name: _name, ...rest } = m as Record<string, unknown>;
        return rest;
      }
      return m;
    });
  }
  return next as T;
}
