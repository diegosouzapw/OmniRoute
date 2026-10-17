import type { Logger, OmniRouteEnrichmentMap } from "./shared/index.js";

/**
 * Decide whether the free-tier preset stays active for this refresh.
 * The overlay proves eligibility: with no free-tier entry (no management
 * token, disabled enrichment, or failed fetch) the preset is disabled for
 * this refresh instead of publishing an empty catalog. Warns once per
 * refresh when falling back. The options stay untouched.
 */
export function resolveFreeOnlyActive(
  freeOnly: boolean | undefined,
  enrichment: OmniRouteEnrichmentMap,
  log: Logger
): boolean {
  if (freeOnly !== true) return false;
  for (const entry of enrichment.values()) {
    if (entry.freeType !== undefined) return true;
  }
  log.warn(
    `[omniroute-v2] freeOnly is on but the enrichment overlay has no free-tier entries (no management token, enrichment disabled, or free-tier fetch failed); freeOnly filter disabled for this refresh. Disable freeOnly or configure the management token.`
  );
  return false;
}
