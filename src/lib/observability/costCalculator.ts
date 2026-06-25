/**
 * src/lib/observability/costCalculator.ts
 *
 * Maps (provider, model, inputTokens, outputTokens) → cost in USD.
 *
 * The table is intentionally STATIC: it represents the canonical pricing
 * OmniRoute charges customers, not the upstream provider's list price.
 * When prices change, this file is updated via a code change (with a
 * release note + changelog entry). Operators may override rates per
 * tenant via `OTEL_EXCHANGE_RATES`, but model-level pricing lives here.
 *
 * Unknown models fall back to a conservative $0.01/1k-token rate (both
 * directions). This is intentionally pessimistic — we want over-attribution
 * rather than free inference.
 *
 * All inputs are validated: negative or non-finite token counts throw,
 * non-string provider/model throw, missing entries trigger the fallback.
 */

export interface PricingRow {
  provider: string;
  model: string;
  /** USD per 1,000 input tokens. */
  inputPer1kTokens: number;
  /** USD per 1,000 output tokens. */
  outputPer1kTokens: number;
}

/**
 * Canonical pricing table. Add new models here; do NOT mutate at runtime.
 * Values are USD per 1,000 tokens. Last reviewed: 2026-06.
 */
export const MODEL_PRICING: ReadonlyArray<PricingRow> = [
  // OpenAI
  { provider: "openai", model: "gpt-4o", inputPer1kTokens: 0.0025, outputPer1kTokens: 0.01 },
  { provider: "openai", model: "gpt-4o-mini", inputPer1kTokens: 0.00015, outputPer1kTokens: 0.0006 },
  { provider: "openai", model: "gpt-4.1", inputPer1kTokens: 0.002, outputPer1kTokens: 0.008 },
  { provider: "openai", model: "gpt-4.1-mini", inputPer1kTokens: 0.0004, outputPer1kTokens: 0.0016 },
  { provider: "openai", model: "gpt-4.1-nano", inputPer1kTokens: 0.0001, outputPer1kTokens: 0.0004 },
  { provider: "openai", model: "o1", inputPer1kTokens: 0.015, outputPer1kTokens: 0.06 },
  { provider: "openai", model: "o1-mini", inputPer1kTokens: 0.003, outputPer1kTokens: 0.012 },
  { provider: "openai", model: "o3", inputPer1kTokens: 0.01, outputPer1kTokens: 0.04 },
  { provider: "openai", model: "o3-mini", inputPer1kTokens: 0.0011, outputPer1kTokens: 0.0044 },
  { provider: "openai", model: "o4-mini", inputPer1kTokens: 0.0011, outputPer1kTokens: 0.0044 },
  // Anthropic
  { provider: "anthropic", model: "claude-sonnet-4", inputPer1kTokens: 0.003, outputPer1kTokens: 0.015 },
  { provider: "anthropic", model: "claude-3-5-sonnet-latest", inputPer1kTokens: 0.003, outputPer1kTokens: 0.015 },
  { provider: "anthropic", model: "claude-3-5-haiku-latest", inputPer1kTokens: 0.0008, outputPer1kTokens: 0.004 },
  { provider: "anthropic", model: "claude-3-opus-latest", inputPer1kTokens: 0.015, outputPer1kTokens: 0.075 },
  { provider: "anthropic", model: "claude-opus-4", inputPer1kTokens: 0.015, outputPer1kTokens: 0.075 },
  { provider: "anthropic", model: "claude-haiku-4", inputPer1kTokens: 0.0008, outputPer1kTokens: 0.004 },
  // Google
  { provider: "google", model: "gemini-1.5-pro", inputPer1kTokens: 0.00125, outputPer1kTokens: 0.005 },
  { provider: "google", model: "gemini-1.5-flash", inputPer1kTokens: 0.000075, outputPer1kTokens: 0.0003 },
  { provider: "google", model: "gemini-2.0-flash", inputPer1kTokens: 0.0001, outputPer1kTokens: 0.0004 },
  { provider: "google", model: "gemini-2.5-pro", inputPer1kTokens: 0.00125, outputPer1kTokens: 0.01 },
  // Mistral
  { provider: "mistral", model: "mistral-large-latest", inputPer1kTokens: 0.002, outputPer1kTokens: 0.006 },
  { provider: "mistral", model: "mistral-small-latest", inputPer1kTokens: 0.0002, outputPer1kTokens: 0.0006 },
  // DeepSeek
  { provider: "deepseek", model: "deepseek-chat", inputPer1kTokens: 0.00014, outputPer1kTokens: 0.00028 },
  { provider: "deepseek", model: "deepseek-reasoner", inputPer1kTokens: 0.00014, outputPer1kTokens: 0.00219 },
];

/** Default per-1k rate used when the (provider, model) pair is not in the table. */
export const FALLBACK_RATE_PER_1K = 0.01;

export interface CalculateCostArgs {
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

export class CostCalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CostCalculationError";
  }
}

/**
 * Look up the pricing row for a (provider, model) pair. Returns the
 * fallback rate when missing. Performs case-insensitive matching on
 * provider; model matching is exact (callers can normalise first).
 */
export function lookupPricing(provider: string, model: string): PricingRow {
  const lcProvider = provider.toLowerCase();
  for (const row of MODEL_PRICING) {
    if (row.provider === lcProvider && row.model === model) return row;
  }
  return {
    provider: lcProvider,
    model,
    inputPer1kTokens: FALLBACK_RATE_PER_1K,
    outputPer1kTokens: FALLBACK_RATE_PER_1K,
  };
}

/**
 * Compute USD cost for a provider call. Returns 0 when both token counts
 * are 0 (no work done → no charge). Throws on negative / non-finite
 * inputs — these would silently zero-out the cost, which would under-
 * charge the tenant.
 */
export function calculateCostUsd(args: CalculateCostArgs): number {
  if (typeof args.provider !== "string" || args.provider.length === 0) {
    throw new CostCalculationError("provider must be a non-empty string");
  }
  if (typeof args.model !== "string" || args.model.length === 0) {
    throw new CostCalculationError("model must be a non-empty string");
  }
  if (!Number.isFinite(args.inputTokens) || args.inputTokens < 0) {
    throw new CostCalculationError(`inputTokens must be a non-negative finite number (got ${args.inputTokens})`);
  }
  if (!Number.isFinite(args.outputTokens) || args.outputTokens < 0) {
    throw new CostCalculationError(`outputTokens must be a non-negative finite number (got ${args.outputTokens})`);
  }
  const row = lookupPricing(args.provider, args.model);
  const cost =
    (args.inputTokens / 1000) * row.inputPer1kTokens +
    (args.outputTokens / 1000) * row.outputPer1kTokens;
  // Round to 6 decimal places — sub-cent precision is enough for telemetry
  // without polluting Prometheus with floating-point noise.
  return Math.round(cost * 1_000_000) / 1_000_000;
}

/**
 * Convert a USD cost to a different currency using a static rate map. The
 * rate is "1 unit of currency = RATE USD" (so a USD→EUR conversion is just
 * `usd / rate`). Unknown currencies return undefined so callers can route
 * them into the "other" bucket.
 */
export function convertCurrency(usd: number, currency: string): number | undefined {
  if (currency === "USD") return usd;
  const rate = EXCHANGE_RATES[currency.toUpperCase()];
  if (typeof rate !== "number" || rate <= 0) return undefined;
  // usd / rate converts USD into the target currency units.
  return Math.round((usd / rate) * 1_000_000) / 1_000_000;
}

/**
 * Static FX rate table. Operators can override per-deployment via the
 * `OTEL_EXCHANGE_RATES` env var (JSON object, e.g. `{"EUR":0.92}`). We
 * never fetch live rates — telemetry attribution is a closed-world
 * calculation, not a market feed.
 */
export const EXCHANGE_RATES: Record<string, number> = loadExchangeRates();

function loadExchangeRates(): Record<string, number> {
  // The rate is "1 unit of currency = RATE USD". For example, EUR=1.087
  // means 1 EUR ≈ 1.087 USD. We invert the market quote (1 USD = 0.92 EUR)
  // so callers can write `convertCurrency(usd, "EUR")` and get the EUR
  // equivalent directly. Telemetry attribution is a closed-world
  // calculation, not a market feed.
  const fallback: Record<string, number> = {
    USD: 1,
    EUR: 1 / 0.92,
    GBP: 1 / 0.78,
    JPY: 1 / 156.0,
    CNY: 1 / 7.2,
    INR: 1 / 83.0,
    BRL: 1 / 5.1,
    CAD: 1 / 1.36,
    AUD: 1 / 1.5,
  };
  const raw = process.env.OTEL_EXCHANGE_RATES;
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fallback;
    const out: Record<string, number> = { ...fallback };
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === "number" && Number.isFinite(v) && v > 0 && typeof k === "string") {
        out[k.toUpperCase()] = v;
      }
    }
    return out;
  } catch {
    return fallback;
  }
}