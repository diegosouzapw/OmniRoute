/**
 * Curated billing classification for provider CONNECTIONS.
 *
 * The economic tier resolver (`open-sse/services/tierResolver.ts`) answers
 * "how much does this MODEL cost per token?" — a fact about the catalog. It
 * cannot answer the question subscription-first routing actually needs:
 *
 *   "does serving this request through THIS connection cost incremental money,
 *    or is it already covered by a flat-rate plan the operator pays anyway?"
 *
 * That is a property of the credential, not the model: `claude/claude-*` is
 * plan-included through a Claude Code OAuth connection and billed per token
 * through an API-key connection — same provider, same model, opposite
 * economics.
 *
 * `provider_connections.auth_type` alone is NOT a safe proxy in either
 * direction: metered OAuth connections exist (cloud-billed OAuth), and
 * plan-included API-key connections exist (Copilot seat tokens). So this is a
 * CURATED table, hand-set from each provider's published terms — deliberately
 * the same pattern `FreeModelBudget.hardStopGuaranteed`
 * (`open-sse/config/freeModelCatalog.ts`) already established: a fact about
 * the upstream's commercial terms, never derived from `authType` and never
 * inferred from a live API response.
 *
 * Uncurated is not "free": anything absent here resolves to `unknown`, which
 * every consumer treats as `metered`. New providers therefore start OUTSIDE
 * the subscription rung and have to be curated in deliberately — the same
 * fail-safe direction STRICT_ZERO_COST uses for uncatalogued models.
 */

/**
 * How a connection's upstream charges for the requests it serves.
 *
 * - `subscription` — covered by a flat-rate plan the operator already pays.
 *   Consuming its quota costs nothing incremental; the plan is a sunk cost.
 * - `metered` — pay-per-token / pay-per-credit. Every request adds spend.
 * - `keyless` — no credential exists at all, so no request can be billed by
 *   construction (the synthetic no-auth path).
 * - `unknown` — not curated. Consumed as `metered` everywhere.
 */
export type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";

/**
 * What happens when a subscription plan's allowance runs out.
 *
 * - `hard-stop` — the upstream refuses further requests until the window
 *   resets. Exhaustion cannot cost money, so such a connection is admissible
 *   to the strictest "never spend a cent extra" grouping.
 * - `meters-to-paid` — the upstream keeps serving and bills the overage.
 *   Perfectly usable while quota remains, never admissible to the strict
 *   grouping.
 * - `unknown` — not established. Treated exactly like `meters-to-paid` by
 *   every consumer; it is the conservative default for a provider whose terms
 *   allow an operator to opt into usage-based billing past the plan.
 */
export type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";

export interface ConnectionBillingEntry {
  /** Provider id as registered in `open-sse/config/providers/registry/`. */
  provider: string;
  /**
   * Restricts the entry to connections whose `authType` matches. Omit for a
   * provider-wide entry. A matching auth-typed entry always wins over the
   * provider-wide one, so a provider offering both a plan-included OAuth login
   * and a metered API key can declare both.
   */
  authType?: string;
  billing: ConnectionBillingClass;
  overage: ConnectionOverageBehavior;
  /** Operator-visible justification for the classification. */
  reason: string;
}

/**
 * Curated entries. Conservative by design — a provider whose terms let the
 * operator enable usage-based billing past the plan is recorded as `unknown`
 * overage, not `hard-stop`, because the strict grouping's entire promise is
 * that it cannot surprise you.
 *
 * Providers already classified free by the economic tier resolver (`kiro`,
 * `qoder`, and the rest of `LEGACY_FREE_PROVIDERS` /
 * `deriveNoAuthFreeProviders()` in `open-sse/services/tierConfig.ts`) are
 * deliberately NOT listed here: they land on the ladder's `free` rung through
 * `classifyTier()` and would only be double-claimed by an entry here.
 */
export const CONNECTION_BILLING_CATALOG: readonly ConnectionBillingEntry[] = [
  {
    provider: "claude",
    authType: "oauth",
    billing: "subscription",
    overage: "hard-stop",
    reason:
      "Claude Code OAuth serves the operator's Anthropic Pro/Max plan windows. " +
      "Exceeding a window is refused until it resets; no per-token charge accrues.",
  },
  {
    provider: "codex",
    authType: "oauth",
    billing: "subscription",
    overage: "hard-stop",
    reason:
      "Codex OAuth serves the ChatGPT plan's included Codex quota. Exhaustion is " +
      "refused until the plan window resets rather than billed.",
  },
  {
    provider: "antigravity",
    authType: "oauth",
    billing: "subscription",
    overage: "hard-stop",
    reason:
      "Antigravity OAuth serves built-in plan quotas that stop serving once consumed; " +
      "OmniRoute already tracks their reset windows (see antigravityCredits.ts).",
  },
  {
    provider: "cursor",
    authType: "oauth",
    billing: "subscription",
    overage: "unknown",
    reason:
      "Cursor Pro includes a request allowance, but usage-based pricing past the plan " +
      "can be enabled per account and OmniRoute cannot observe that setting. Recorded " +
      "as unknown overage so the strict grouping excludes it.",
  },
  {
    provider: "copilot-web",
    authType: "apikey",
    billing: "subscription",
    overage: "unknown",
    reason:
      "GitHub Copilot is a per-seat subscription (the credential is a seat token, not a " +
      "metered API key), but additional premium requests can be billed when the account " +
      "opts in. Recorded as unknown overage.",
  },
  {
    provider: "devin-desktop",
    authType: "oauth",
    billing: "subscription",
    overage: "meters-to-paid",
    reason:
      "Devin Desktop draws on the plan's included ACUs and continues billing past them, " +
      "so it is plan-included while quota remains but never overage-safe.",
  },
];
