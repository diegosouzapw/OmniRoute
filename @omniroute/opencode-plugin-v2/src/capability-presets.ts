import type { LegacyModel } from "./legacy-model.js";
import type { OmniRouteEnrichmentEntry, OmniRouteEnrichmentMap } from "./shared/enrich.js";
import { lookupEnrichment } from "./shared/enrich.js";
import type { OmniRouteRawCombo } from "./shared/combos-map.js";
import type { OmniRouteRawModelEntry } from "./shared/models-map.js";
import { isFreeOnlyFreeType } from "./shared/naming.js";

export interface CapabilityPresetFlags {
  freeOnly?: boolean;
  /** The caller's inferred-free verdict for this entry (see `inferFreeSignal`). */
  freeInferred?: boolean;
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
  if (
    flags.freeOnly === true &&
    !isFreeOnlyFreeType(enrichment?.freeType) &&
    flags.freeInferred !== true
  )
    return false;
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
  if (
    flags.freeOnly === true &&
    !isFreeOnlyFreeType(enrichment?.freeType) &&
    flags.freeInferred !== true
  )
    return false;
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

/** True when any preset subtracts: the pool narrows, combos resolve per member. */
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
  flags: CapabilityPresetFlags,
  isFreeInferred?: (id: string, entry: OmniRouteEnrichmentEntry | undefined) => boolean
): OmniRouteRawModelEntry[] {
  if (!presetsActive(flags)) return [...entries];
  return entries.filter((entry) => {
    if (!entry.id) return false;
    const row = lookupEnrichment(entry.id, enrichment, canonicalToAlias);
    return passesRawPreset(entry, row, {
      ...flags,
      freeInferred: isFreeInferred?.(entry.id, row) ?? flags.freeInferred,
    });
  });
}

interface ComboPresetStep {
  memberEntries: OmniRouteRawModelEntry[];
  deferred: boolean;
  failsPreset: boolean;
  countable: boolean;
}

function readComboStepField(step: unknown, key: "kind" | "comboName" | "model"): unknown {
  return (step as Record<string, unknown> | null | undefined)?.[key];
}

/**
 * Fold one combo step list into member entries plus the preset verdict.
 * A `combo-ref` step reads the child verdict from `presetByName` (kept
 * for dropped combos too): a ref to an unknown name stays deferred, a
 * ref to a dropped combo fails. Never looks up an enrichment row for
 * the synthesized `combo-ref:<name>` id (there is none). An unknown
 * model id fails under an active preset, stays neutral without one.
 */
export function foldComboPresetSteps(
  combo: OmniRouteRawCombo,
  rawModelById: ReadonlyMap<string, OmniRouteRawModelEntry>,
  resolvedByName: ReadonlyMap<string, LegacyModel>,
  presetByName: ReadonlyMap<string, boolean>,
  enrichment: OmniRouteEnrichmentMap | undefined,
  canonicalToAlias: Map<string, string>,
  flags: CapabilityPresetFlags,
  isFreeInferred?: (id: string, entry: OmniRouteEnrichmentEntry | undefined) => boolean
): ComboPresetStep {
  const memberEntries: OmniRouteRawModelEntry[] = [];
  const active = presetsActive(flags);
  let deferred = false;
  let failsPreset = false;
  let countable = false;
  const memberSteps = Array.isArray(combo.models) ? combo.models : [];
  for (const step of memberSteps) {
    const kind = readComboStepField(step, "kind");
    if (kind === "combo-ref") {
      const comboName = readComboStepField(step, "comboName");
      if (typeof comboName !== "string" || comboName.length === 0) continue;
      if (active && presetByName.get(comboName) === false) {
        failsPreset = true;
        break;
      }
      const nested = resolvedByName.get(comboName);
      if (!nested) {
        deferred = true;
        break;
      }
      if (active) countable = true;
      memberEntries.push(synthesizeNestedMember(comboName, nested));
      continue;
    }
    const modelId = readComboStepField(step, "model");
    if (typeof modelId !== "string" || modelId.length === 0) continue;
    const member = rawModelById.get(modelId);
    if (!member) {
      if (active) failsPreset = true;
      continue;
    }
    if (active) {
      countable = true;
      const memberRow = lookupEnrichment(member.id, enrichment, canonicalToAlias);
      if (
        !passesRawPreset(member, memberRow, {
          ...flags,
          freeInferred: isFreeInferred?.(member.id, memberRow) ?? flags.freeInferred,
        })
      ) {
        failsPreset = true;
        break;
      }
    }
    memberEntries.push(member);
  }
  return { memberEntries, deferred, failsPreset, countable };
}

/**
 * Record the preset verdict of a resolved combo (published or dropped)
 * under its lookup name: `name` trimmed, else `id`. Under an active
 * preset a combo with no countable member never passes, so it is
 * dropped, never partial.
 */
export function recordComboPresetVerdict(
  presetByName: Map<string, boolean>,
  combo: OmniRouteRawCombo,
  failsPreset: boolean,
  countable: boolean,
  flags: CapabilityPresetFlags
): boolean {
  const comboName =
    typeof combo.name === "string" && combo.name.trim().length > 0 ? combo.name.trim() : combo.id;
  const passes = !presetsActive(flags) || (failsPreset !== true && countable);
  presetByName.set(comboName, passes);
  return passes;
}

/** Lookup name of a combo: `name` trimmed, else `id`. */
export function comboLookupName(combo: OmniRouteRawCombo): string {
  return typeof combo.name === "string" && combo.name.trim().length > 0
    ? combo.name.trim()
    : combo.id;
}

/**
 * Synthesize a raw-model entry from an already-resolved nested combo so a
 * parent combo's LCD folds the whole nested capability vector (context,
 * output, modalities, capabilities) instead of only direct raw members.
 * v1 parity (combo member synthesis at nested resolution time).
 */
export function synthesizeNestedMember(name: string, nested: LegacyModel): OmniRouteRawModelEntry {
  const inputModalities: string[] = [];
  if (nested.capabilities.input.text) inputModalities.push("text");
  if (nested.capabilities.input.audio) inputModalities.push("audio");
  if (nested.capabilities.input.image) inputModalities.push("image");
  if (nested.capabilities.input.video) inputModalities.push("video");
  if (nested.capabilities.input.pdf) inputModalities.push("pdf");
  const outputModalities: string[] = [];
  if (nested.capabilities.output.text) outputModalities.push("text");
  if (nested.capabilities.output.audio) outputModalities.push("audio");
  if (nested.capabilities.output.image) outputModalities.push("image");
  if (nested.capabilities.output.video) outputModalities.push("video");
  if (nested.capabilities.output.pdf) outputModalities.push("pdf");
  return {
    id: `combo-ref:${name}`,
    context_length: nested.limit.context,
    max_output_tokens: nested.limit.output,
    ...(nested.limit.input !== undefined ? { max_input_tokens: nested.limit.input } : {}),
    owned_by: "combo",
    input_modalities: inputModalities,
    output_modalities: outputModalities,
    capabilities: {
      temperature: nested.capabilities.temperature,
      // A raw entry carries plain flags; the mapped model widens them to
      // `boolean | { field }` (custom reasoning/thinking field). Every
      // non-false form means the capability is present, which is all the
      // LCD fold reads.
      reasoning: nested.capabilities.reasoning !== false,
      thinking: nested.capabilities.interleaved !== false,
      attachment: nested.capabilities.attachment,
      tool_calling: nested.capabilities.toolcall,
    },
  };
}
