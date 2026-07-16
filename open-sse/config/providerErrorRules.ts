/**
 * Provider-specific error rules.
 *
 * Different providers expose different quota signals:
 *   - Opencode: account-wide quota. A 429 with `x-ratelimit-remaining-requests: 0`
 *     means the whole organization is out — we must lock the connection, not
 *     a specific model, so the combo router falls back to a different provider.
 *   - Minimax: per-model quota. A 429 with `x-model-quota-remaining: <model>=0`
 *     means only that model is locked — the rest of the connection stays healthy.
 *
 * New providers register a `ProviderErrorRule[]` in `providerRuleRegistry`. Rules
 * are evaluated BEFORE the global ERROR_RULES in classifyError. If no rule
 * matches, behavior falls through to the existing global text/status rules.
 *
 * Adding a new provider = create one ProviderErrorRule[] and register it below.
 * No changes to classifyError, lockModel, or updateProviderConnection needed.
 */

import type { ConfiguredErrorReason } from "./errorConfig.ts";

export type ProviderErrorRule = {
  id: string;
  match: (ctx: {
    status: number;
    headers: Record<string, string>;
    body: unknown;
  }) => ProviderErrorRuleMatch | null;
};

export type ProviderErrorRuleMatch = {
  reason: ConfiguredErrorReason;
  /** Default "provider" — lock the whole connection so other providers take over. */
  scope: "model" | "provider" | "connection";
  /** Optional explicit cooldown; falls back to the existing per-reason defaults. */
  cooldownMs?: number;
};

// ─── Opencode ───────────────────────────────────────────────────────────────────
// Opencode Go uses an account-wide quota. The body usually says "rate limit
// reached" but the presence of `x-ratelimit-remaining-requests: 0` is the
// tell. Without this rule, an exhausted org quota would be classified as
// RATE_LIMIT_EXCEEDED (~5s cooldown), causing the combo to keep retrying
// every model on the same provider until the 5h window resets.
//
// Scope note: `scope: "connection"` (not "provider") is correct because the
// upstream quota is per-account, and a single OmniRoute provider entry maps to
// one user account. Multiple OmniRoute connections under the same provider
// name mean the user has multiple upstream accounts — locking at the provider
// level would disable every one of them when only one is exhausted. See
// Issue #2 (Monthly quota exhausted treated as transient 429).
function buildOpencodeRules(): ProviderErrorRule[] {
  return [
    {
      id: "opencode-monthly-quota-resets-in",
      match: ({ status, body }) => {
        if (status !== 429) return null;
        // The exact body envelope we observe in the wild:
        //   "[429] Monthly usage limit reached. Resets in 13 days. To continue
        //    using this model now, enable usage from your available balance: ..."
        // Also covers the headers-less case where only the body carries the
        // reset hint (the opencode-quota-exhausted-headers rule above requires
        // headers, but the upstream sometimes omits them).
        const text = JSON.stringify(body ?? "").toLowerCase();
        if (!text.includes("monthly usage limit reached")) return null;
        const cooldownMs = parseResetCountdownMs(text);
        if (cooldownMs === null) return null;
        return {
          reason: "quota_exhausted",
          scope: "connection",
          cooldownMs,
        };
      },
    },
    {
      id: "opencode-quota-exhausted-headers",
      match: ({ status, headers }) => {
        if (status !== 429) return null;
        const remainingRequests = headers["x-ratelimit-remaining-requests"];
        if (remainingRequests === "0") {
          return { reason: "quota_exhausted", scope: "connection" };
        }
        const remainingTokens = headers["x-ratelimit-remaining-tokens"];
        if (remainingTokens === "0") {
          return { reason: "quota_exhausted", scope: "connection" };
        }
        return null;
      },
    },
    {
      id: "opencode-quota-exhausted-body",
      match: ({ status, body }) => {
        if (status !== 429) return null;
        const text = JSON.stringify(body ?? "").toLowerCase();
        if (
          text.includes("organization_quota_exceeded") ||
          text.includes("account_quota_exceeded") ||
          text.includes("plan_limit_reached")
        ) {
          return { reason: "quota_exhausted", scope: "connection" };
        }
        return null;
      },
    },
  ];
}

// ─── Minimax ────────────────────────────────────────────────────────────────
// Minimax returns per-model quota info via custom headers. The body is generic
// "rate limit exceeded" so we MUST read the headers. Other models on the same
// connection stay healthy; only the named model gets locked.
function buildMinimaxRules(): ProviderErrorRule[] {
  return [
    {
      id: "minimax-per-model-quota",
      match: ({ status, headers }) => {
        if (status !== 429) return null;
        // Header pattern: "x-model-quota-remaining: haiku=0,sonnet=42,opus=100"
        const headerVal = headers["x-model-quota-remaining"];
        if (!headerVal) return null;
        // If any model reports 0 remaining, the request was rejected for that
        // model. We classify as quota_exhausted so lockModel is called with
        // scope=model instead of poisoning the whole connection.
        const exhausted = headerVal.split(",").some((pair) => pair.split("=")[1]?.trim() === "0");
        if (exhausted) {
          return { reason: "quota_exhausted", scope: "model" };
        }
        return null;
      },
    },
  ];
}

// ─── Cloudflare Workers AI ─────────────────────────────────────────────────────
// Free tier = 10,000 Neurons/day, shared across the WHOLE account
// (docs/reference/FREE_TIERS.md; official: developers.cloudflare.com/
// workers-ai/platform/errors/). The exhaustion body doesn't match any
// QUOTA_PATTERNS keyword so it falls through to rate_limit and gets
// retried every ~60s against a budget that only resets at UTC midnight.
// Issue #6980.
function buildCloudflareAiRules(): ProviderErrorRule[] {
  return [
    {
      id: "cloudflare-ai-daily-neuron-allocation",
      match: ({ status, body }) => {
        if (status !== 429) return null;
        const text = JSON.stringify(body ?? "").toLowerCase();
        // Body: "you have used up your daily free allocation of 10,000 neurons,
        //        please upgrade to Cloudflare's Workers Paid plan..."
        if (!text.includes("daily free allocation")) return null;
        // No cooldownMs: recordModelLockoutFailure already sets
        // quota_exhausted without one to "next UTC midnight".
        return { reason: "quota_exhausted", scope: "connection" };
      },
    },
  ];
}

/**
 * Global registry. Provider name → ordered list of rules (first match wins).
 * Add new providers here; the matcher in classifyError will pick them up
 * automatically.
 */
export const providerRuleRegistry = new Map<string, ProviderErrorRule[]>([
  ["opencode", buildOpencodeRules()],
  ["opencode-go", buildOpencodeRules()],
  ["opencode-cli", buildOpencodeRules()],
  ["minimax", buildMinimaxRules()],
  ["minimax-passthrough", buildMinimaxRules()],
  ["cloudflare-ai", buildCloudflareAiRules()],
]);

/**
 * Returns the first matching rule for a provider, or null if none match.
 * Callers use this to (a) classify the reason and (b) decide whether to
 * lock just the model or the whole connection.
 */
export function getProviderErrorRuleMatch(
  provider: string | null | undefined,
  status: number,
  headers: Headers | Record<string, string> | null | undefined,
  body?: unknown
): ProviderErrorRuleMatch | null {
  if (!provider) return null;
  const rules = providerRuleRegistry.get(provider.toLowerCase());
  if (!rules) return null;
  // Normalize headers: accept either a `Headers` object (from `fetch()`) or
  // a plain record. Provider rules access headers via plain object indexing.
  const safeHeaders: Record<string, string> = !headers
    ? {}
    : typeof (headers as Headers).get === "function"
      ? Object.fromEntries((headers as Headers).entries())
      : Object.fromEntries(
          Object.entries(headers as Record<string, string>).map(([key, value]) => [
            key.toLowerCase(),
            value,
          ])
        );
  for (const rule of rules) {
    const match = rule.match({ status, headers: safeHeaders, body });
    if (match) return match;
  }
  return null;
}

/**
 * Parse a "Resets in N <unit>" countdown phrase from an upstream error body.
 *
 * Returns the cooldown in milliseconds, or null if no recognizable phrase is
 * present. Supports the units observed across OpenCode-Go / Workplace /
 * Deepseek envelopes: `days`, `day`, `hours`, `hour`, `minutes`, `minute`,
 * `seconds`, `second`. Variants like `Resets in 13 days.`, `resets in 2 hours`
 * and `Resets in 30 minutes.` all parse correctly.
 *
 * Input must already be lowercased — callers pass a `.toLowerCase()`'d body
 * because the upstream envelopes are case-inconsistent.
 *
 * Fix C / Issue #2: this is what lets a single rule declare an explicit
 * cooldown of "13 days" instead of falling through to the engine's scaled
 * ~60s default.
 */
export function parseResetCountdownMs(text: string): number | null {
  if (typeof text !== "string" || text.length === 0) return null;
  const match = text.match(
    /resets?\s+in\s+(\d+)\s+(day|days|hour|hours|minute|minutes|second|seconds)\b/
  );
  if (!match) return null;
  const n = Number(match[1]);
  if (!Number.isFinite(n) || n <= 0) return null;
  const unit = match[2];
  switch (unit) {
    case "day":
    case "days":
      return n * 86_400_000;
    case "hour":
    case "hours":
      return n * 3_600_000;
    case "minute":
    case "minutes":
      return n * 60_000;
    case "second":
    case "seconds":
      return n * 1_000;
    default:
      return null;
  }
}
