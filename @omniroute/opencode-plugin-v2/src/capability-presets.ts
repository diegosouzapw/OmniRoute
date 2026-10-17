import type { LegacyModel } from "./legacy-model.js";
import type { OmniRouteEnrichmentEntry, OmniRouteEnrichmentMap } from "./shared/enrich.js";
import { lookupEnrichment } from "./shared/enrich.js";
import type { OmniRouteRawModelEntry } from "./shared/models-map.js";
import { isFreeOnlyFreeType } from "./shared/naming.js";

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
 * allowlist at the model collection point.
 */
export function passesCapabilityPresets(
  mapped: LegacyModel,
  enrichment: OmniRouteEnrichmentEntry | undefined,
  flags: CapabilityPresetFlags
): boolean {
  if (flags.freeOnly === true && !isFreeOnlyFreeType(enrichment?.freeType)) return false;
  if (flags.toolsOnly === true && mapped.capabilities.toolcall !== true) return false;
  if (
    flags.visionOnly === true &&
    !(mapped.capabilities.attachment === true || mapped.capabilities.input.image === true)
  )
    return false;
  return true;
}

/**
 * Raw-entry form of the preset predicate for the ranks-before-filters
 * pool. Reads the same signals as `passesCapabilityPresets` without
 * mapping the entry first: `freeOnly` uses `isFreeOnlyFreeType` on the
 * overlay row the caller resolved, `toolsOnly` reads `capabilities.tool_calling`,
 * `visionOnly`
 * reads `capabilities.attachment ?? capabilities.vision` or an `image`
 * input modality (same `?? ["text"]` default as the mapper). Neutral
 * when no preset is on, so the default view is unchanged without one.
 */
export function passesRawPreset(
  raw: OmniRouteRawModelEntry,
  enrichment: OmniRouteEnrichmentEntry | undefined,
  flags: CapabilityPresetFlags
): boolean {
  if (flags.freeOnly === true && !isFreeOnlyFreeType(enrichment?.freeType)) return false;
  if (flags.toolsOnly === true && Boolean(raw.capabilities?.tool_calling ?? false) !== true)
    return false;
  if (
    flags.visionOnly === true &&
    !(
      Boolean(raw.capabilities?.attachment ?? raw.capabilities?.vision ?? false) ||
      new Set(raw.input_modalities ?? ["text"]).has("image")
    )
  )
    return false;
  return true;
}

/** True when any preset subtracts: the pool narrows. */
export function presetsActive(flags: CapabilityPresetFlags): boolean {
  return flags.freeOnly === true || flags.toolsOnly === true || flags.visionOnly === true;
}

/**
 * Narrow a raw pool to the entries that pass the presets. The showcase
 * and the recent picks rank this narrowed pool instead of ranking
 * everything and letting the preset empty the pick. Neutral when no
 * preset is on, so the default view is unchanged without one.
 */
export function filterRawPoolByPreset(
  entries: readonly OmniRouteRawModelEntry[],
  enrichment: OmniRouteEnrichmentMap | undefined,
  canonicalToAlias: Map<string, string>,
  flags: CapabilityPresetFlags
): OmniRouteRawModelEntry[] {
  if (!presetsActive(flags)) return [...entries];
  return entries.filter(
    (entry) =>
      entry.id &&
      passesRawPreset(entry, lookupEnrichment(entry.id, enrichment, canonicalToAlias), flags)
  );
}
