/**
 * Provider tier-override helpers (#7818).
 *
 * `classifyTier()` (`open-sse/services/tierResolver.ts`) already honors a
 * DB-backed `providerOverrides` list keyed by an arbitrary provider-id string
 * — it works identically for a built-in or a custom provider. These pure
 * helpers + a thin fetch/save pair expose that mechanism through the new
 * `/api/settings/tier-config` route so the Advanced Settings tier dropdown
 * can be unit-tested without a DOM, mirroring `m365Tier.ts`'s shape in the
 * same directory.
 */

import type { ProviderTier, TierConfig } from "@omniroute/open-sse/services/tierTypes";

const VALID_TIERS = new Set<ProviderTier>(["free", "cheap", "premium"]);

/** Normalize a stored override tier into the dropdown value ("" = unset/auto). */
export function normalizeTierValue(raw: unknown): ProviderTier | "" {
  if (typeof raw === "string" && VALID_TIERS.has(raw as ProviderTier)) {
    return raw as ProviderTier;
  }
  return "";
}

/** Fetch the current provider-tier override for `provider`, or "" when unset. */
export async function fetchProviderTierOverride(provider: string): Promise<ProviderTier | ""> {
  const res = await fetch("/api/settings/tier-config");
  if (!res.ok) return "";
  const config = (await res.json()) as TierConfig;
  const match = config.providerOverrides?.find(
    (o) => o.provider.toLowerCase() === provider.toLowerCase()
  );
  return normalizeTierValue(match?.tier);
}

/** Set (or clear, when `tier === ""`) the tier override for `provider`. */
export async function saveProviderTierOverride(
  provider: string,
  tier: ProviderTier | ""
): Promise<void> {
  const res = await fetch("/api/settings/tier-config", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, tier: tier === "" ? null : tier }),
  });
  if (!res.ok) {
    throw new Error(`Failed to save provider tier override (${res.status})`);
  }
}
