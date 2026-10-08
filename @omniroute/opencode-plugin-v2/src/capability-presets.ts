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
 * allowlist at the model and combo collection points. Auto combos are not
 * published (#15392), so there is no third point to filter.
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
