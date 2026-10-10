/**
 * Kiro credit metering.
 *
 * Kiro bills each request in credits and reports them in `meteringEvent` frames
 * (`{ unit: "credit", usage: <number> }`). The credits of one response are summed
 * and converted to USD with `KIRO_CREDIT_PRICE_USD` (default 0.02 USD per credit),
 * then carried in the pipeline's existing exact-cost field `cost_in_usd_ticks`
 * (USD × 1e10) alongside `provider_credits`. Token counts, which Kiro only lets us
 * estimate, never take part in this calculation.
 */

const DEFAULT_KIRO_CREDIT_PRICE_USD = 0.02;
const USD_TICKS_PER_USD = 1e10;

type KiroCreditUsage = {
  provider_credits?: number;
  cost_in_usd_ticks?: number;
};

/**
 * Add one `meteringEvent` payload to the running usage of a Kiro response.
 * Throws on a malformed metering frame or an invalid `KIRO_CREDIT_PRICE_USD`, so a
 * bad measurement fails the stream instead of being billed as zero.
 */
export function addKiroCredits<T extends KiroCreditUsage>(
  usage: T | undefined,
  event: unknown
): T & Required<KiroCreditUsage> {
  const payload = event as { usage?: unknown; unit?: unknown; meteringEvent?: unknown } | null;
  if (payload?.meteringEvent) return addKiroCredits(usage, payload.meteringEvent);
  if (
    !payload ||
    payload.unit !== "credit" ||
    typeof payload.usage !== "number" ||
    !Number.isFinite(payload.usage) ||
    payload.usage < 0
  ) {
    throw new Error("Kiro returned invalid credit metering");
  }
  const price = Number(process.env.KIRO_CREDIT_PRICE_USD ?? DEFAULT_KIRO_CREDIT_PRICE_USD);
  if (!Number.isFinite(price) || price <= 0) throw new Error("Invalid KIRO_CREDIT_PRICE_USD");
  const credits = (usage?.provider_credits ?? 0) + payload.usage;
  return {
    ...(usage as T),
    provider_credits: credits,
    cost_in_usd_ticks: Math.round(credits * price * USD_TICKS_PER_USD),
  };
}
