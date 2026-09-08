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
  /**
   * Intended lock scope. #10334: for a BUILT-IN catalog rule, this field is
   * CONSUMED end-to-end only for providers in `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
   * (agentrouter-exclusive today, gated by `honorsRuleLockScope()`) — for those,
   * `checkFallbackError` surfaces it as `ruleScope` on its return value for the
   * persistence layer to honor instead of re-deriving scope from
   * `hasPerModelQuota()`. For every other built-in-rule provider it remains
   * INFORMATIONAL. #11104: an OPERATOR-declared rule (`OperatorProviderErrorRule`)
   * is exempt from this allowlist — `honorsRuleLockScope()` always returns true
   * when the provider has one, since the operator already opted in by declaring
   * the rule. Widening `HONORS_RULE_LOCK_SCOPE_PROVIDERS` itself (for a new
   * built-in catalog rule) is tracked as a follow-up — see
   * `docs/architecture/RESILIENCE_GUIDE.md` §7.
   */
  scope: "model" | "provider" | "connection";
  /** Optional explicit cooldown; falls back to the existing per-reason defaults. */
  cooldownMs?: number;
};

/**
 * Operator-declared per-provider error rule (settings-driven).
 *
 * Mirrors the catalog `ProviderErrorRule` but is data-only so an operator can
 * add a scope/cooldown/reason override for a provider without editing this
 * file. `match` is a plain case-insensitive SUBSTRING of the error body — never
 * a RegExp — so an operator-supplied pattern can never introduce a ReDoS on the
 * error-classification hot path. Bounded to <= 50 rules total by the settings
 * schema. An operator rule is consulted BEFORE the built-in `providerRuleRegistry`
 * and wins on the first status+substring match for a provider.
 */
export type OperatorProviderErrorRule = {
  status: number;
  match: string;
  scope: "model" | "provider" | "connection";
  reason?: ConfiguredErrorReason;
  cooldownMs?: number;
};

let operatorProviderErrorRules: Record<string, OperatorProviderErrorRule[]> = {};

/**
 * Inject operator-declared rules. Called from the runtime-settings applier
 * (`applyRuntimeSettings`) once at boot and on every settings update, with the
 * value validated by the settings schema. Pass `undefined`/empty/null to clear.
 * Provider keys are lowercased so lookups are case-insensitive.
 */
export function setOperatorProviderErrorRules(
  rules: Record<string, OperatorProviderErrorRule[]> | undefined | null
): void {
  operatorProviderErrorRules = {};
  if (!rules) return;
  for (const [provider, list] of Object.entries(rules)) {
    if (Array.isArray(list) && list.length > 0) {
      operatorProviderErrorRules[provider.toLowerCase()] = list;
    }
  }
}

// ─── Opencode ───────────────────────────────────────────────────────────────────
// Opencode Go uses an account-wide quota. The body usually says "rate limit
// reached" but the presence of `x-ratelimit-remaining-requests: 0` is the
// tell. Without this rule, an exhausted org quota would be classified as
// RATE_LIMIT_EXCEEDED (~5s cooldown), causing the combo to keep retrying
// every model on the same provider until the 5h window resets.
//
// Scope note: `scope: "connection"` (not "provider") is correct because the
// upstream quota is per egress IP for the free tier (the opencode free tier
// is IP-bucketed, not account-bucketed — see #9611) and per account for paid
// plans; a single OmniRoute provider entry maps to one user account. Multiple
// OmniRoute connections under the same provider name mean the user has
// multiple upstream accounts — locking at the provider level would disable
// every one of them when only one is exhausted. See Issue #2 (Monthly quota
// exhausted treated as transient 429) and #10880 (egress-bucketed cooldown).
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

// ─── OpenRouter ─────────────────────────────────────────────────────────────
// #6842: OpenRouter returns 402 for both a negative account balance and a
// depleted per-key credit cap. The global `status_402` rule already maps this
// to `quota_exhausted` with a zero cooldown (immediate fallback to the next
// connection), but leaves the scope ambiguous and doesn't stop the SAME
// connection from being reselected instantly (credits genuinely need a
// top-up, not a timed wait). This explicit rule locks the whole connection
// (scope: "connection" — credits are account-wide, not per-model) for a real
// cooldown so combo routing skips it instead of hot-looping back onto it.
function buildOpenrouterRules(): ProviderErrorRule[] {
  return [
    {
      id: "openrouter-credit-exhausted-402",
      match: ({ status }) => {
        if (status !== 402) return null;
        return { reason: "quota_exhausted", scope: "connection", cooldownMs: 2 * 60 * 1000 };
      },
    },
  ];
}

// ─── AgentRouter ────────────────────────────────────────────────────────────
// agentrouter.org misstates temporary quota exhaustion as 403/400 with a
// Chinese body. upstreamStatusRestatement.ts rewrites the status to 429
// BEFORE classification, so rules here accept both the raw 403/400 and the
// restated 429 (text is the real discriminator either way). Both the raw 403
// path AND the restated 429 path reach these rules in production:
// checkFallbackError's `honorsRuleLockScope("agentrouter")` pre-check
// (#10334) consults these rules BEFORE the generic apikey-category FORBIDDEN
// branch, and the restated 429 reaches them via the existing provider-rule
// lookup in the configured-rule branch. Both paths use resolveRuleMatchBody,
// the only mechanism in checkFallbackError that hands agentrouter's rules the
// full error text instead of just {code, type}.
//  - "额度不足": account-wide temporary quota → quota_exhausted, scope
//    "connection" (mirror of the Opencode account-wide rationale above).
//    `scope` on ProviderErrorRuleMatch is CONSUMED for agentrouter (#10334,
//    exclusive allowlist via `honorsRuleLockScope`): checkFallbackError
//    surfaces it as `ruleScope` on its return value. Whether the persistence
//    layer (markAccountUnavailable / combo target exhaustion) actually
//    switches from `hasPerModelQuota()`-derived scope to honoring `ruleScope`
//    is Tasks 2/3 of #10334 — this task only surfaces the field.
//  - "无权访问模型": declares auth_error/scope "model" (intent: lock only the
//    model so the connection keeps serving the rest — Model Lockout tier).
//    This rule now fires on the production 403 path (#10334): the
//    `honorsRuleLockScope` pre-check matches it and returns its declared
//    reason/cooldown/scope before the generic apikey-FORBIDDEN early-return
//    ever runs. A live `无权访问模型` 403 therefore no longer falls through to
//    the base apikey-provider 403 handling.
function buildAgentrouterRules(): ProviderErrorRule[] {
  const AGENTROUTER_ERROR_STATUSES = new Set([400, 403, 429]);
  return [
    {
      id: "agentrouter-user-quota-exhausted",
      match: ({ status, body }) => {
        if (!AGENTROUTER_ERROR_STATUSES.has(status)) return null;
        const text = JSON.stringify(body ?? "").toLowerCase();
        if (!text.includes("额度不足")) return null;
        return { reason: "quota_exhausted", scope: "connection" };
      },
    },
    {
      id: "agentrouter-model-access-denied",
      match: ({ status, body }) => {
        if (status !== 403) return null;
        const text = JSON.stringify(body ?? "").toLowerCase();
        if (!text.includes("无权访问模型")) return null;
        // Declares a 6h cooldown, but the effective cooldown is NOT 6h: the
        // model-lockout persistence layer (recordModelLockoutFailure, called from
        // markAccountUnavailable) clamps every base cooldown — this one included —
        // to the configured model-lockout maxCooldownMs, which defaults to
        // 1_800_000ms / 30min (src/lib/resilience/modelLockoutSettings.ts,
        // DEFAULT_MODEL_LOCKOUT_SETTINGS.maxCooldownMs). So in practice this is
        // "locked for ~30min by default (up to 6h if an operator raises the model-
        // lockout cap in settings)", not "until the operator fixes the key's model
        // grants" — it is a recoverable window, not a real fix-driven unlock.
        return { reason: "auth_error", scope: "model", cooldownMs: 6 * 60 * 60 * 1000 };
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
  ["openrouter", buildOpenrouterRules()],
  ["agentrouter", buildAgentrouterRules()],
]);

/**
 * Providers whose ProviderErrorRuleMatch.scope is actually CONSUMED at the
 * persistence layer (markAccountUnavailable / combo target exhaustion) to pick
 * connection-vs-model lock scope. EXCLUSIVE allowlist by owner decision
 * (2026-08-14, issue #10334) — deliberately SEPARATE from
 * FULL_TEXT_RULE_PROVIDERS: that set controls what body a rule matches against
 * (input), this one controls whether the matched scope changes caller behavior
 * (output). A provider could need one without the other.
 *
 * Providers with an operator-declared rule (`setOperatorProviderErrorRules`)
 * are honored too, without being added here: the allowlist exists to gate
 * BUILT-IN catalog rules, which change default behavior for every operator
 * running that provider — an operator rule is already an explicit, per-operator
 * opt-in, so gating it a second time behind this list would make the settings
 * mechanism (#11104) silently inert for every provider except the ones listed
 * below. See `hasOperatorRuleForProvider`.
 */
const HONORS_RULE_LOCK_SCOPE_PROVIDERS = new Set(["agentrouter"]);

export function honorsRuleLockScope(provider: string | null | undefined): boolean {
  if (!provider) return false;
  const key = provider.toLowerCase();
  return HONORS_RULE_LOCK_SCOPE_PROVIDERS.has(key) || hasOperatorRuleForProvider(key);
}

/**
 * Providers whose upstream quota is bucketed by EGRESS IP, not by account —
 * the opencode free tier is IP-bucketed, not account-bucketed (see #9611).
 * When such a provider answers 429 quota_exhausted or
 * rate_limit_exceeded (see the markAccountUnavailable branch comment — the
 * real opencode 429 arrives as rate_limit_exceeded on that path), every
 * connection egressing through that IP shares the exhausted budget, so the
 * lock is applied at egress-IP scope (see markAccountUnavailable /
 * applyEgressIpLockout). EXCLUSIVE allowlist by design — same pattern as
 * HONORS_RULE_LOCK_SCOPE_PROVIDERS (#10334): a provider must opt in, and any
 * widening is an explicit owner decision.
 */
// Default free-tier set (#9611). PAID plans are account-bucketed, not
// IP-bucketed, so operators running paid subscriptions can disable or trim
// the egress-IP lockout via OMNIROUTE_EGRESS_IP_LOCK_PROVIDERS:
//   unset            → default set below (free-tier behavior)
//   none/off/false/0 → empty set (egress-IP lockout fully disabled)
//   "a,b,c"          → exact replacement set
// Static default as a plain lookup table; the runtime set is env-derived
// (dynamic membership), so a Set is the right structure there.
const EGRESS_BUCKETED_LOCK_PROVIDERS_DEFAULT: Record<string, true> = {
  opencode: true,
  "opencode-go": true,
  "opencode-cli": true,
};

/**
 * Pure parser for OMNIROUTE_EGRESS_IP_LOCK_PROVIDERS (exported for tests).
 * Returns the effective provider set: default free-tier family when unset,
 * empty for none/off/false/0, otherwise the comma-separated replacement set.
 */
export function egressIpLockProvidersFromEnv(
  raw: string | undefined,
  fallback: Record<string, true> = EGRESS_BUCKETED_LOCK_PROVIDERS_DEFAULT
): Set<string> {
  const trimmed = raw?.trim();
  if (trimmed === undefined || trimmed === "") return new Set(Object.keys(fallback));
  if (/^(none|off|false|0)$/i.test(trimmed)) return new Set<string>();
  return new Set(
    trimmed
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
}

const EGRESS_BUCKETED_LOCK_PROVIDERS = egressIpLockProvidersFromEnv(
  process.env.OMNIROUTE_EGRESS_IP_LOCK_PROVIDERS
);

export function isEgressBucketedLockScope(provider: string | null | undefined): boolean {
  return !!provider && EGRESS_BUCKETED_LOCK_PROVIDERS.has(provider.toLowerCase());
}

/**
 * The same allowlist as a sorted array, for callers that must express it as
 * data rather than a predicate (the sibling lookup in `applyEgressIpLockout`
 * binds it into a SQL `IN (...)`). Single source of truth on purpose: a
 * literal provider list duplicated in a query would silently NOT follow a
 * widening of `EGRESS_BUCKETED_LOCK_PROVIDERS`, leaving the opt-in half
 * applied.
 */
export function egressBucketedLockProviders(): string[] {
  return [...EGRESS_BUCKETED_LOCK_PROVIDERS].sort();
}

/**
 * Providers whose BUILT-IN catalog rules match on the FULL upstream error
 * text. checkFallbackError's rule lookup normally passes only the structured
 * error ({code, type} — message stripped by the combo callers), which is
 * enough for header/status/code rules but blind to body-text markers like
 * agentrouter's "额度不足". Providers in this set get the raw error text as
 * the match body instead. EXCLUSIVE allowlist by owner decision (2026-08-13):
 * adding a provider here is an explicit opt-in — the default path for every
 * other provider must remain byte-for-byte unchanged.
 *
 * Operator-declared rules bypass this allowlist entirely (see
 * `hasOperatorRuleForProvider`): the operator's `match` is a literal substring
 * of the error body by construction, so a rule that never sees body text could
 * never match anything, defeating the point of declaring it.
 */
const FULL_TEXT_RULE_PROVIDERS = new Set(["agentrouter"]);

/**
 * True when an operator has declared at least one rule for this provider via
 * `settings.providerErrorRules` (injected through `setOperatorProviderErrorRules`).
 * Presence of the rule IS the opt-in — no separate allowlist to maintain, and
 * no widening decision needed as new operators configure new providers.
 */
export function hasOperatorRuleForProvider(provider: string | null | undefined): boolean {
  if (!provider) return false;
  const rules = operatorProviderErrorRules[provider.toLowerCase()];
  return !!rules && rules.length > 0;
}

/**
 * Resolve the body handed to getProviderErrorRuleMatch inside
 * checkFallbackError: full error text for FULL_TEXT_RULE_PROVIDERS or any
 * provider with an operator-declared rule, the structured error for everyone
 * else.
 */
export function resolveRuleMatchBody(
  provider: string | null | undefined,
  structuredError: unknown,
  errorText: string | null | undefined
): unknown {
  if (
    provider &&
    (FULL_TEXT_RULE_PROVIDERS.has(provider.toLowerCase()) ||
      hasOperatorRuleForProvider(provider)) &&
    errorText
  ) {
    return errorText;
  }
  return structuredError ?? null;
}

/**
 * Returns the first matching rule for a provider, or null if none match.
 * Callers use this to (a) classify the reason and (b) decide whether to
 * lock just the model or the whole connection.
 */
export function getProviderErrorRuleMatch(
  provider: string | null | undefined,
  status: number,
  headers: Headers | Record<string, string> | null | undefined,
  body?: unknown,
  operatorRules?: Record<string, OperatorProviderErrorRule[]>
): ProviderErrorRuleMatch | null {
  if (!provider) return null;
  const key = provider.toLowerCase();

  // Operator-declared rules win first: an operator can override any catalog
  // rule for a provider without editing this file. `operatorRules` is the
  // injected source (tests / direct callers); when omitted we fall back to the
  // settings-backed cache populated by `setOperatorProviderErrorRules`.
  const opRules = (operatorRules ?? operatorProviderErrorRules)?.[key];
  if (opRules && opRules.length > 0) {
    const text = typeof body === "string" ? body : JSON.stringify(body ?? "");
    const lowered = text.toLowerCase();
    for (const r of opRules) {
      if (r.status === status && lowered.includes(r.match.toLowerCase())) {
        return {
          reason: r.reason ?? "quota_exhausted",
          scope: r.scope,
          cooldownMs: r.cooldownMs,
        };
      }
    }
  }

  const rules = providerRuleRegistry.get(key);
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
