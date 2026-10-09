/**
 * Catalog user-pricing layer (#15528): PATCH /api/pricing overrides live in the
 * `pricing` key_value namespace and must win over models.dev / LiteLLM / defaults
 * in GET /v1/models, same as the dashboard's merged pricing view.
 */
import { getDbInstance } from "@/lib/db/core";

export type UserPricingByProvider = Record<string, Record<string, Record<string, unknown>>>;

const MEMO_TTL_MS = 5_000;
let memo: { at: number; value: UserPricingByProvider } | null = null;

/** Drop the memo after a pricing write (called from db/settings/pricing.ts). */
export function invalidateUserPricingMemo(): void {
  memo = null;
}

/**
 * Short-lived memo for callers without a build-local snapshot: keeps the object
 * identity stable so findInsensitive's WeakMap index is reused across lookups.
 */
export function readUserPricingMemoized(): UserPricingByProvider {
  const now = Date.now();
  if (memo && now - memo.at < MEMO_TTL_MS) return memo.value;
  const value = readUserPricingSync();
  memo = { at: now, value };
  return value;
}

type PricingFields = Record<string, number>;

const PRICING_FIELDS = ["input", "output", "cached", "cache_creation"] as const;

/** Bulk-load the user `pricing` namespace once (sync, no per-entry SQLite). */
export function readUserPricingSync(): UserPricingByProvider {
  const out: UserPricingByProvider = {};
  try {
    const rows = getDbInstance()
      .prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing'")
      .all() as Array<{ key?: unknown; value?: unknown }>;
    for (const row of rows) {
      if (typeof row.key !== "string" || typeof row.value !== "string") continue;
      try {
        const parsed = JSON.parse(row.value);
        if (parsed && typeof parsed === "object") out[row.key] = parsed;
      } catch {
        // corrupted row: fall back to lower layers
      }
    }
  } catch {
    // user pricing is optional for catalog assembly
  }
  return out;
}

type Finder = <T>(obj: Record<string, T> | null | undefined, key: string) => T | undefined;

/** Numeric user-override fields for provider/model, or null when none apply.
 * `findKey` is the registry's indexed case-insensitive finder (injected to avoid an import cycle). */
export function lookupUserCatalogPricing(
  user: UserPricingByProvider | null | undefined,
  provider: string,
  model: string,
  findKey: Finder
): PricingFields | null {
  if (!user) return null;
  const providerPricing = findKey(user, provider) || findKey(user, provider.replace(/-cn$/, ""));
  if (!providerPricing) return null;
  const tail = model.includes("/") ? model.split("/").pop() || model : model;
  const modelPricing =
    findKey(providerPricing, model) ||
    findKey(providerPricing, model.replace(/\./g, "-")) ||
    findKey(providerPricing, tail);
  if (!modelPricing || typeof modelPricing !== "object") return null;
  const fields: PricingFields = {};
  for (const name of PRICING_FIELDS) {
    const value = modelPricing[name];
    if (typeof value === "number") fields[name] = value;
  }
  return Object.keys(fields).length > 0 ? fields : null;
}
