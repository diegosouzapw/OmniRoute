/**
 * functionalGatewayPredicate.ts — catalog-side predicate for the functional
 * gateway mirror gate.
 *
 * Mirrors the 3-level gate of ccDiscoveryAliases (global > provider > model) but
 * for functional gateway mirrors. Storage reuses the same `key_value` namespace
 * conventions but under a dedicated feature flag (see db wiring in Task 4).
 */

export type FunctionalGatewaySetting = "on" | "off" | null;

export interface FunctionalGatewayGateSnapshot {
  global: boolean;
  providers: Map<string, FunctionalGatewaySetting>;
  models: Map<string, FunctionalGatewaySetting>;
}

function resolveSetting(
  model: FunctionalGatewaySetting,
  provider: FunctionalGatewaySetting,
  global: boolean
): boolean {
  if (model === "off") return false;
  if (model === "on") return true;
  if (provider === "off") return false;
  if (provider === "on") return true;
  return global;
}

/**
 * Builds a predicate suitable for filtering `appendFunctionalGatewayMirrors`
 * output from a single settings snapshot.
 */
export function buildFunctionalGatewayPredicate(
  snapshot: FunctionalGatewayGateSnapshot
): (entry: { id?: unknown; owned_by?: unknown }) => boolean {
  return (entry) => {
    const id = entry.id;
    if (typeof id !== "string" || id.length === 0) return false;

    const slashIndex = id.indexOf("/");
    if (slashIndex === -1) return snapshot.global;

    const providerId = id.slice(0, slashIndex);
    const modelId = id.slice(slashIndex + 1);
    const provider = snapshot.providers.get(providerId) ?? null;
    const model = snapshot.models.get(`${providerId}/${modelId}`) ?? null;
    return resolveSetting(model, provider, snapshot.global);
  };
}
