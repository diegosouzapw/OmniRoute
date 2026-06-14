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

// ─── Opencode ──────────────────────────────────────────────────────────────
// Opencode Go uses an account-wide quota. The body usually says "rate limit
// reached" but the presence of `x-ratelimit-remaining-requests: 0` is the
// tell. Without this rule, an exhausted org quota would be classified as
// RATE_LIMIT_EXCEEDED (~5s cooldown), causing the combo to keep retrying
// every model on the same provider until the 5h window resets.
function buildOpencodeRules(): ProviderErrorRule[] {
  return [
    {
      id: "opencode-quota-exhausted-headers",
      match: ({ status, headers }) => {
        if (status !== 429) return null;
        const remainingRequests = headers["x-ratelimit-remaining-requests"];
        if (remainingRequests === "0") {
          return { reason: "quota_exhausted", scope: "provider" };
        }
        const remainingTokens = headers["x-ratelimit-remaining-tokens"];
        if (remainingTokens === "0") {
          return { reason: "quota_exhausted", scope: "provider" };
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
          return { reason: "quota_exhausted", scope: "provider" };
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
        const exhausted = headerVal
          .split(",")
          .some((pair) => pair.split("=")[1]?.trim() === "0");
        if (exhausted) {
          return { reason: "quota_exhausted", scope: "model" };
        }
        return null;
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
  const rules = providerRuleRegistry.get(provider);
  if (!rules) return null;
  // Normalize headers: accept either a `Headers` object (from `fetch()`) or
  // a plain record. Provider rules access headers via plain object indexing.
  const safeHeaders: Record<string, string> = !headers
    ? {}
    : typeof (headers as Headers).get === "function"
      ? Object.fromEntries((headers as Headers).entries())
      : (headers as Record<string, string>);
  for (const rule of rules) {
    const match = rule.match({ status, headers: safeHeaders, body });
    if (match) return match;
  }
  return null;
}
