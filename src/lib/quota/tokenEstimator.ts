/**
 * tokenEstimator.ts — cheap, deterministic request token-cost estimation.
 *
 * Estimates the token cost of a chat request (input + reserved output) so
 * the quota scheduler can decide whether a connection has budget before
 * dispatching. Not a model — a heuristic:
 *   - chars / 4 approximates tokens for most latin text (OpenAI's classic
 *     heuristic); CJK and code skew higher, so the estimate is a floor.
 *   - max_tokens / max_completion_tokens reserves the output budget when
 *     present; otherwise a small default output allowance is used.
 *
 * The estimate deliberately OVER-provisions input (×1.1) so an exhausted
 * budget is not misjudged as available. Errors never throw — a broken
 * estimate degrades to "unknown cost" (scheduler treats as affordable).
 */

export interface TokenCostEstimate {
  /** estimated input tokens (may be 0 when body is unparseable) */
  inputTokens: number;
  /** reserved output budget (max_tokens or default) */
  outputTokens: number;
  /** input + output */
  totalTokens: number;
}

const DEFAULT_OUTPUT_ALLOWANCE = 1024;
const CHARS_PER_TOKEN = 4;
const OVER_PROVISION = 1.1;

/** Count a string's tokens by chars/4 (floor). */
export function estimateStringTokens(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.length / CHARS_PER_TOKEN);
}

/**
 * Estimate the token cost of an OpenAI-style chat body.
 * Accepts both `messages` (chat.completions) and `input` (Responses API).
 */
export function estimateChatTokenCost(
  body: Record<string, unknown> | null | undefined
): TokenCostEstimate {
  if (!body || typeof body !== "object") {
    return {
      inputTokens: 0,
      outputTokens: DEFAULT_OUTPUT_ALLOWANCE,
      totalTokens: DEFAULT_OUTPUT_ALLOWANCE,
    };
  }

  let inputTokens = 0;

  const messages = body.messages;
  if (Array.isArray(messages)) {
    for (const msg of messages) {
      if (!msg || typeof msg !== "object") continue;
      const content = (msg as Record<string, unknown>).content;
      if (typeof content === "string") {
        inputTokens += estimateStringTokens(content);
      } else if (Array.isArray(content)) {
        for (const part of content) {
          if (part && typeof part === "object") {
            const text = (part as Record<string, unknown>).text;
            if (typeof text === "string") inputTokens += estimateStringTokens(text);
          }
        }
      }
    }
  }

  const input = body.input;
  if (Array.isArray(input)) {
    for (const item of input) {
      if (!item || typeof item !== "object") continue;
      const text = (item as Record<string, unknown>).text;
      if (typeof text === "string") inputTokens += estimateStringTokens(text);
    }
  }

  if (typeof body.system === "string") {
    inputTokens += estimateStringTokens(body.system);
  }

  // Reserved output budget: max_tokens / max_completion_tokens win; fall back
  // to the default allowance.
  const rawMax =
    typeof body.max_tokens === "number"
      ? body.max_tokens
      : typeof body.max_completion_tokens === "number"
        ? body.max_completion_tokens
        : undefined;
  const outputTokens =
    typeof rawMax === "number" && rawMax > 0 ? Math.ceil(rawMax) : DEFAULT_OUTPUT_ALLOWANCE;

  const totalTokens = Math.ceil(inputTokens * OVER_PROVISION) + outputTokens;
  return { inputTokens, outputTokens, totalTokens };
}
