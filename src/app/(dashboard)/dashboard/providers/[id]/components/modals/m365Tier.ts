/**
 * M365 Copilot (BizChat) tier selector helpers (#6334).
 *
 * The `copilot-m365-web` executor (`open-sse/executors/copilot-m365-connection.ts`)
 * reads `providerSpecificData.tier` to pick the BizChat surface: unset/`individual`
 * uses the consumer defaults, `edu` (alias `included`) applies the education overrides,
 * and `enterprise` (alias `work`) applies the Microsoft 365 Copilot for-work overrides.
 *
 * These pure helpers gate the Advanced-Settings tier dropdown to tier-capable
 * providers and normalize the stored value <-> the dropdown value so the UI can be
 * unit-tested without a DOM.
 */

/** Providers that expose the tier selector in connection Advanced Settings. */
export const M365_TIER_CAPABLE_PROVIDERS = new Set<string>(["copilot-m365-web"]);

/** Dropdown value: "" is Individual (default / unset tier). */
export type M365TierValue = "" | "edu" | "enterprise";

export function isM365TierCapableProvider(provider?: string | null): boolean {
  return !!provider && M365_TIER_CAPABLE_PROVIDERS.has(provider);
}

/**
 * Normalize a stored `providerSpecificData.tier` into the dropdown value.
 * Mirrors the executor's alias handling (`work`->enterprise, `included`->edu) so a
 * connection saved with an alias round-trips to the right option. Anything else
 * (unset, null, "individual", unknown) maps to "" (Individual).
 */
export function normalizeM365TierValue(raw: unknown): M365TierValue {
  const tier = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  if (tier === "edu" || tier === "included") return "edu";
  if (tier === "enterprise" || tier === "work") return "enterprise";
  return "";
}

/**
 * Apply the selected tier onto a `providerSpecificData` target.
 *
 * `edu`/`enterprise` write the canonical tier string. Individual ("") writes
 * `null` — the PUT route merges `{ ...existing, ...incoming }`, so an omitted /
 * `undefined` key would keep a previously-saved tier; an explicit `null` overrides
 * it and the executor treats a non-string tier as Individual.
 */
export function applyM365Tier(target: Record<string, unknown>, tier: M365TierValue): void {
  if (tier === "edu" || tier === "enterprise") {
    target.tier = tier;
  } else {
    target.tier = null;
  }
}
