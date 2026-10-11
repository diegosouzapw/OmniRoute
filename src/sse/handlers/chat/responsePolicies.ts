/**
 * Carry per-Response routing policies from the provider response onto the wrapper that
 * chat.ts / chatHelpers.ts actually return. Both markers live in module-level WeakMaps keyed by
 * the Response object, so a cloned/wrapped Response loses them unless they are copied here:
 *  - provider-probe provenance (`providerProbeResult`);
 *  - the trusted empty-turn execution record (#16072, `emptyTurnPolicy`), without which a
 *    valid empty terminal turn is re-classified as a failed empty response after wrapping.
 *
 * Extracted so the frozen chat.ts / chatHelpers.ts do not grow (file-size gate).
 */
import { inheritEmptyTurnPolicy } from "@omniroute/open-sse/utils/emptyTurnPolicy.ts";
import { inheritProviderProbeResponse } from "@/shared/utils/providerProbeResult";

export { inheritProviderProbeResponse };

export function inheritResponsePolicies(source: Response, target: Response): Response {
  return inheritEmptyTurnPolicy(source, inheritProviderProbeResponse(source, target));
}
