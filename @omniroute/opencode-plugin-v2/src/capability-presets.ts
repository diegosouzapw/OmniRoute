import type { LegacyModel } from "./legacy-model.js";
import type { OmniRouteEnrichmentEntry } from "./shared/enrich.js";

export interface CapabilityPresetFlags {
  freeOnly?: boolean;
  toolsOnly?: boolean;
  visionOnly?: boolean;
}

/**
 * Single subtractive predicate for the capability presets. Reads the
 * mapped+enriched entry: `freeOnly` needs the enrichment overlay entry
 * (absent entry = not free = dropped), `toolsOnly`/`visionOnly` read the
 * mapped capabilities (proven 1:1 with the raw signals). Applied after the
 * allowlist at each of the three `collectCatalog` collection points.
 */
export function passesCapabilityPresets(
  mapped: LegacyModel,
  enrichment: OmniRouteEnrichmentEntry | undefined,
  flags: CapabilityPresetFlags
): boolean {
  if (flags.freeOnly === true && enrichment?.freeType === undefined) return false;
  if (flags.toolsOnly === true && mapped.capabilities.toolcall !== true) return false;
  if (
    flags.visionOnly === true &&
    !(mapped.capabilities.attachment === true || mapped.capabilities.input.image === true)
  )
    return false;
  return true;
}
