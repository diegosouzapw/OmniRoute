import {
  getExplicitModelOutputCap,
  getResolvedModelCapabilities,
} from "../../src/lib/modelCapabilities.ts";

/**
 * Below this caller-supplied `max_tokens`, the request is treated as a probe
 * (e.g. Claude Code's `/model` capability check sends `max_tokens: 1`) rather
 * than a genuine reasoning budget, so no headroom is added. Keeping it a named
 * constant makes the threshold easy to tune. See issue #6274 (probe inflated to
 * 1001 upstream) vs. issue #3587 (headroom for real reasoning budgets).
 */
export const REASONING_BUFFER_MIN_TRIGGER = 256;

/**
 * Opt-in minimum output budget for reasoning models (#10281 follow-up).
 * When set (env `OMNIROUTE_REASONING_MIN_BUDGET`, positive integer), a caller
 * budget in [REASONING_BUFFER_MIN_TRIGGER, floor) on a thinking model is raised
 * to the floor so reasoning tokens cannot consume the entire budget and yield
 * a zero-content `finish_reason: "length"` turn (which validateQuality then
 * rejects as a 502). Opt-in via env keeps the #9507 "never enlarge a client's
 * explicit max_tokens" contract: operators who set the env declare the floor.
 * Budgets below REASONING_BUFFER_MIN_TRIGGER stay verbatim (#6274 probes), and
 * the floor never exceeds the model's known output cap.
 */
export const REASONING_MIN_BUDGET_ENV = "OMNIROUTE_REASONING_MIN_BUDGET";

export function getReasoningMinBudget(): number | null {
  return toPositiveInteger(process.env[REASONING_MIN_BUDGET_ENV]);
}

export function toPositiveInteger(value: unknown): number | null {
  const numericValue =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim() !== ""
        ? Number(value)
        : null;
  if (numericValue === null || !Number.isFinite(numericValue)) return null;
  const normalized = Math.floor(numericValue);
  return normalized > 0 ? normalized : null;
}

export function resolveReasoningBufferedMaxTokens(
  modelStr: string,
  currentMaxTokens: unknown,
  options: { enabled?: boolean } = {}
): number | null {
  if (options.enabled === false) return null;

  const current = toPositiveInteger(currentMaxTokens);
  if (current === null) return null;

  const capabilities = getResolvedModelCapabilities(modelStr);
  if (capabilities.supportsThinking !== true) return null;

  const maxOutputTokens = toPositiveInteger(getExplicitModelOutputCap(modelStr));
  if (maxOutputTokens === null) return null;
  if (current > maxOutputTokens) return maxOutputTokens;

  // Issue #6274: a tiny explicit budget is a capability probe, not a reasoning
  // request. Respect it verbatim instead of inflating (e.g. 1 -> 1001).
  if (current < REASONING_BUFFER_MIN_TRIGGER) return current;

  // Opt-in reasoning budget floor: raise budgets below the operator-declared
  // floor (env OMNIROUTE_REASONING_MIN_BUDGET) up to that floor so reasoning
  // cannot consume the whole budget. #9507 contract preserved — the env IS the
  // opt-in. The floor is itself capped by the model's output cap.
  const minBudget = getReasoningMinBudget();
  if (minBudget !== null && current < minBudget) {
    const floored = Math.min(minBudget, maxOutputTokens);
    if (floored > current) return floored;
  }

  // Issue #9507: never enlarge a client's explicit max_tokens. The #3587
  // headroom heuristic (Math.ceil(current * 1.5)) silently rewrote reasoning
  // budgets upward (64000 -> 96000 on claude-opus-5), violating the #1761
  // contract that upward adjustment must be opt-in. The over-cap clamp above
  // (line 42) already narrows, and the model's own output cap is the only
  // legitimate ceiling; any headroom beyond the client-declared value is a
  // silent cost increase the client did not authorize.
  return current;
}

/**
 * A tiny-budget reasoning probe is a request with an explicit `max_tokens`
 * below REASONING_BUFFER_MIN_TRIGGER targeting a reasoning-capable model — e.g.
 * Claude Code's `/model` capability check sends `max_tokens: 1`. Reasoning
 * models burn the whole probe on thinking, so the upstream produces no visible
 * content; some upstreams (e.g. api.cline.bot for deepseek-v4-flash) answer the
 * non-streaming probe with an HTTP 5xx (`"empty response content"`) instead of
 * a truncated 200. See #10281.
 */
export function isTinyBudgetReasoningProbe(opts: { model: string; body: unknown }): boolean {
  const body = (opts.body ?? {}) as Record<string, unknown>;
  const maxTokens = toPositiveInteger(body.max_tokens ?? body.max_completion_tokens);
  if (maxTokens === null || maxTokens >= REASONING_BUFFER_MIN_TRIGGER) return false;
  const capabilities = getResolvedModelCapabilities(opts.model);
  return capabilities.supportsThinking === true;
}

/**
 * Upstream failure markers that describe the "model reasoned but produced no
 * visible content" outcome (e.g. `{"error":{"message":"empty response content"}}`).
 */
const EMPTY_CONTENT_FAILURE_RE =
  /empty(\s+response)?\s+content|no\s+(usable\s+)?content|reasoning\s+consumed/i;

/**
 * True when the upstream failure is a 5xx describing the empty-content outcome
 * of a reasoning probe rather than a genuine provider outage. Combined with
 * `isTinyBudgetReasoningProbe`, false positives are not practical (a real 5xx
 * carrying these markers on a tiny-budget reasoning request is this exact case).
 */
export function isEmptyContentUpstreamFailure(statusCode: number, message: string): boolean {
  if (!Number.isFinite(statusCode) || statusCode < 500 || statusCode >= 600) return false;
  return EMPTY_CONTENT_FAILURE_RE.test(String(message || ""));
}

/**
 * Build a valid truncated OpenAI chat.completion response (200, empty content,
 * `finish_reason: "length"`) used to answer a tiny-budget reasoning probe whose
 * upstream answered the empty outcome with a 5xx. Mirrors the semantics OmniRoute
 * already grants to `finish_reason: "length"` empty 200s (errorClassifier.ts).
 */
export function buildReasoningProbeTruncatedResponse(opts: {
  model: string;
  maxTokens: number | null;
  requestId: string;
}): Response {
  const maxTokens = opts.maxTokens ?? 1;
  const body = {
    id: `chatcmpl-${opts.requestId}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: opts.model,
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: "" },
        finish_reason: "length",
      },
    ],
    usage: {
      prompt_tokens: 0,
      completion_tokens: maxTokens,
      total_tokens: maxTokens,
    },
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
