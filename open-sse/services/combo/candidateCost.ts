/**
 * Auto-combo candidate cost resolution (#15546).
 *
 * The scorer min-max normalises `costPer1MTokens` across the pool. A model with
 * no pricing row used to default to a flat $1/M, which sits near the bottom of a
 * pool that contains $20-$40/M frontier models, so genuinely UNPRICED models
 * looked almost free and won cost-weighted routes. We now treat an unpriced
 * model neutrally: it takes the median blended cost of the priced models in the
 * same pool (so it neither wins nor loses on cost), and only falls back to 1
 * when nothing in the pool is priced (every candidate then ties anyway).
 */

/** Share of output tokens assumed when blending input/output prices. */
export const OUTPUT_TOKEN_RATIO = 0.4;
const NO_PRICING_FALLBACK = 1;

export type PricingLookup = (
  provider: string,
  model: string
) => Promise<{ input?: unknown; output?: unknown } | null | undefined>;

export interface CostKey {
  provider: string;
  model: string;
}

export const costKey = (provider: string, model: string): string => `${provider}/${model}`;

function blend(pricing: { input?: unknown; output?: unknown } | null | undefined): number | null {
  const input = Number(pricing?.input);
  if (!Number.isFinite(input) || input < 0) return null;
  const output = Number(pricing?.output);
  if (!Number.isFinite(output) || output < 0) return input;
  return input * (1 - OUTPUT_TOKEN_RATIO) + output * OUTPUT_TOKEN_RATIO;
}

async function lookupBlended(
  provider: string,
  model: string,
  getPricing: PricingLookup
): Promise<number | null> {
  try {
    const exact = blend(await getPricing(provider, model));
    if (exact !== null) return exact;
    // Same fallback as usage/costCalculator: namespaced ids ("org/model").
    const bare = model.includes("/") ? model.split("/").pop() || model : model;
    return bare !== model ? blend(await getPricing(provider, bare)) : null;
  } catch {
    return null;
  }
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** Blended $/1M per `provider/model`; unpriced entries get the priced-pool median. */
export async function resolvePoolCosts(
  items: CostKey[],
  getPricing: PricingLookup
): Promise<Map<string, number>> {
  const unique = new Map<string, CostKey>();
  for (const item of items) unique.set(costKey(item.provider, item.model), item);
  const entries = await Promise.all(
    [...unique.entries()].map(
      async ([key, item]) =>
        [key, await lookupBlended(item.provider, item.model, getPricing)] as const
    )
  );
  const priced = entries.filter((e): e is readonly [string, number] => e[1] !== null);
  const neutral = priced.length > 0 ? median(priced.map((e) => e[1])) : NO_PRICING_FALLBACK;
  return new Map(entries.map(([key, cost]) => [key, cost ?? neutral]));
}
