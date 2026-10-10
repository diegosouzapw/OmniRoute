/**
 * Credit-metered provider classification.
 *
 * Some providers do not bill per token: the upstream meters each request in its own
 * credits and reports how many were consumed, which OmniRoute converts to USD and
 * carries as an exact provider-reported cost (`cost_in_usd_ticks`, read by
 * `extractExactCostUsd` in {@link module:lib/usage/costCalculator}). Those providers
 * still carry per-token pricing rows — the model catalog fills them for every
 * model — so pricing such a request by tokens mixes two accounting models: it bills
 * the same request twice, at a tariff that does not describe the plan at all.
 *
 * Unlike the flat-rate signal ({@link module:lib/usage/flatRateProviders}), this is
 * NOT display-only. The credits ARE the bill, so every surface — quota, budget and
 * analytics alike — reads the reported cost and never the token estimate. A request
 * that reported no cost has nothing billable to read.
 *
 * Adding a provider id here is the whole cost integration: persistence and every
 * cost surface key on the stored `usage_history.provider_cost_usd`, not on the
 * provider id. The provider's own metering (reading its credit events and
 * converting them to USD) stays in its executor; `usage_history.provider_credits`
 * keeps the measured quantity as provenance only.
 *
 * @module lib/usage/creditMeteredProviders
 */

/**
 * Provider ids billed by credit rather than by token. Kept explicit (not derived)
 * because these providers sit in the oauth category next to genuinely
 * token-metered ones and carry real per-token pricing rows.
 */
const CREDIT_METERED_PROVIDER_IDS: Readonly<Record<string, true>> = {
  kiro: true, // Kiro reports `credit` metering events; KIRO_CREDIT_PRICE_USD converts them
  kr: true, // the same connection under its alias id
};

/**
 * Whether a provider bills by credit, so its per-token pricing rows must never be
 * used as a cost basis.
 */
export function isCreditMeteredProvider(providerId: string | null | undefined): boolean {
  if (!providerId || typeof providerId !== "string") return false;
  const id = providerId.trim().toLowerCase();
  return Object.prototype.hasOwnProperty.call(CREDIT_METERED_PROVIDER_IDS, id);
}

const isNonNegativeNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

/**
 * The `usage_history` billing columns for one request. An exact provider-reported
 * cost (`cost_in_usd_ticks`) is the billed amount for ANY provider (xAI,
 * credit-metered providers); without one the row stays NULL and is priced from its
 * tokens. Credits are provenance, kept only for credit-metered providers.
 */
export function readReportedCost(
  providerId: string | null | undefined,
  tokens: unknown
): { providerCredits: number | null; providerCostUsd: number | null } {
  const usage = tokens as { provider_credits?: unknown; cost_in_usd_ticks?: unknown } | null;
  const credits = usage?.provider_credits;
  const ticks = usage?.cost_in_usd_ticks;
  return {
    providerCredits:
      isCreditMeteredProvider(providerId) && isNonNegativeNumber(credits) ? credits : null,
    providerCostUsd: isNonNegativeNumber(ticks) ? ticks / 1e10 : null,
  };
}
