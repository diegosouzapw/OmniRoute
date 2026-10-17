/**
 * Combos-only export/import (portable combo file).
 *
 * The full settings backup (`/api/settings/export-json`) carries credentials,
 * so it cannot be shared. This module defines a shareable file that holds ONLY
 * combo definitions: no ids, timestamps, sort order, connection-scoped refs
 * (`connectionId`, `allowedConnectionIds`, step ids derived from them) or
 * credential-looking config keys. The same sanitizer runs on import, so a
 * hand-edited file can never smuggle credentials or foreign connection ids in.
 */
import { z } from "zod";
import { validateComboDAG } from "@omniroute/open-sse/services/combo/comboStructure.ts";
import { clampComboDepth } from "@omniroute/open-sse/services/combo/comboPredicates.ts";
import { resolveProviderAlias } from "@omniroute/open-sse/services/providerAlias.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { validateCompositeTiersConfig } from "@/lib/combos/compositeTiers";
import { stripDeadComboConfigKeys } from "@/lib/combos/deadConfigKeys";
import { normalizeComboModels } from "@/lib/combos/steps";
import { createComboSchema } from "@/shared/validation/schemas";
import { isNoAuthProviderKey } from "@/shared/utils/noAuthProviders";

type JsonRecord = Record<string, unknown>;

export const COMBO_EXPORT_VERSION = "omniroute-combos-v1";
export const MAX_IMPORTED_COMBOS = 500;

export type ComboImportMode = "merge" | "replace";

/** Top-level combo fields that travel between installs (mirrors createComboSchema). */
const PORTABLE_COMBO_KEYS = [
  "name",
  "description",
  "displayName",
  "models",
  "strategy",
  "config",
  "universal_handoff",
  "universalHandoff",
  "allowedProviders",
  "allowedModelFamilies",
  "system_message",
  "tool_filter_regex",
  "context_cache_protection",
  "context_length",
  "dimensions",
] as const;

/** Install-local step fields: connection refs and ids (step ids embed connection ids). */
const LOCAL_STEP_KEYS = new Set(["id", "connectionId", "allowedConnectionIds"]);

const CREDENTIAL_KEY_PATTERN =
  /^(api[_-]?key|secret|client[_-]?secret|password|authorization|(access|refresh|bearer)[_-]?token)$/i;

export const combosImportFileSchema = z.object({
  _meta: z
    .object({ version: z.literal(COMBO_EXPORT_VERSION) })
    .passthrough()
    .optional(),
  mode: z.enum(["merge", "replace"]).optional(),
  combos: z.array(z.unknown()).min(1, "at least one combo is required").max(MAX_IMPORTED_COMBOS),
});

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function stripCredentialKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripCredentialKeys);
  if (!isRecord(value)) return value;
  const out: JsonRecord = {};
  for (const [key, child] of Object.entries(value)) {
    if (CREDENTIAL_KEY_PATTERN.test(key)) continue;
    out[key] = stripCredentialKeys(child);
  }
  return out;
}

export function toPortableComboStep(step: unknown): unknown {
  if (!isRecord(step)) return step;
  if (step.kind === "provider-wildcard") {
    // Re-encode as the `provider/pattern` model form createComboSchema accepts;
    // normalizeComboModels turns it back into a wildcard step on import.
    const providerId = typeof step.providerId === "string" ? step.providerId : "";
    const pattern = typeof step.modelPattern === "string" ? step.modelPattern : "*";
    const out: JsonRecord = { model: `${providerId}/${pattern}`, providerId };
    if (typeof step.weight === "number") out.weight = step.weight;
    if (typeof step.label === "string") out.label = step.label;
    return out;
  }
  const out: JsonRecord = {};
  for (const [key, value] of Object.entries(step)) {
    if (LOCAL_STEP_KEYS.has(key)) continue;
    out[key] = value;
  }
  return out;
}

function toPortableConfig(config: unknown): unknown {
  if (!isRecord(config)) return config;
  const out = stripCredentialKeys(config) as JsonRecord;
  const shadow = out.shadowRouting;
  if (isRecord(shadow) && Array.isArray(shadow.targets)) {
    out.shadowRouting = { ...shadow, targets: shadow.targets.map(toPortableComboStep) };
  }
  return out;
}

/** Strip a stored (or imported) combo down to its shareable, secret-free definition. */
export function toPortableCombo(combo: unknown): JsonRecord {
  if (!isRecord(combo)) return {};
  const out: JsonRecord = {};
  for (const key of PORTABLE_COMBO_KEYS) {
    if (combo[key] === undefined || combo[key] === null) continue;
    out[key] = combo[key];
  }
  if (Array.isArray(out.models)) out.models = out.models.map(toPortableComboStep);
  if (out.config !== undefined) out.config = toPortableConfig(out.config);
  return out;
}

export function buildCombosExport(combos: JsonRecord[], now = new Date()) {
  return {
    _meta: { version: COMBO_EXPORT_VERSION, exportedAt: now.toISOString() },
    combos: combos.filter((combo) => combo.isHidden !== true).map(toPortableCombo),
  };
}

export interface PreparedComboImport {
  toCreate: JsonRecord[];
  skipped: string[];
  warnings: string[];
}

export type ComboImportPreparation =
  | { ok: true; value: PreparedComboImport }
  | { ok: false; code: "COMBO_002" | "COMBO_003" | "COMBO_004" | "COMBO_005"; message: string };

function entryLabel(raw: unknown, index: number): string {
  const name = isRecord(raw) && typeof raw.name === "string" ? raw.name.slice(0, 100) : "";
  return name ? `combo #${index + 1} "${name}"` : `combo #${index + 1}`;
}

function stepProvider(step: unknown): string | null {
  if (!isRecord(step) || step.kind === "combo-ref") return null;
  const model = typeof step.model === "string" ? step.model : "";
  const provider =
    (typeof step.providerId === "string" && step.providerId) ||
    (typeof step.provider === "string" && step.provider) ||
    (model.includes("/") ? model.split("/")[0] : "");
  return provider || null;
}

function collectWarnings(
  combo: JsonRecord,
  allNames: Set<string>,
  knownProviders: Set<string>
): string[] {
  const warnings: string[] = [];
  const models = Array.isArray(combo.models) ? combo.models : [];
  for (const step of models) {
    if (isRecord(step) && step.kind === "combo-ref") {
      const ref = typeof step.comboName === "string" ? step.comboName : "";
      if (ref && !allNames.has(ref)) {
        warnings.push(`combo "${combo.name}": references unknown combo "${ref}"`);
      }
      continue;
    }
    const provider = stepProvider(step);
    if (!provider) continue;
    const resolved = resolveProviderAlias(provider) || provider;
    if (knownProviders.has(provider) || knownProviders.has(resolved)) continue;
    if (isNoAuthProviderKey(provider, resolved)) continue;
    warnings.push(`combo "${combo.name}": no connection configured for provider "${provider}"`);
  }
  return warnings;
}

/**
 * Validate a parsed import file against the current combos without writing.
 * Every entry goes through the same pipeline as POST /api/combos (Zod schema,
 * step normalization, dead-key strip, composite-tier and DAG validation).
 * `merge` keeps every existing combo and skips name conflicts; `replace` keeps
 * only hidden system-managed combos (quota pools), which are never replaced.
 */
export function prepareComboImport(
  rawEntries: unknown[],
  context: { existing: JsonRecord[]; mode: ComboImportMode; knownProviders: Set<string> }
): ComboImportPreparation {
  const parsed: JsonRecord[] = [];
  const seen = new Set<string>();
  for (const [index, raw] of rawEntries.entries()) {
    const result = createComboSchema.safeParse(toPortableCombo(raw));
    if (!result.success) {
      const issue = result.error.issues[0];
      const field = issue?.path?.length ? `${issue.path.join(".")}: ` : "";
      return {
        ok: false,
        code: "COMBO_002",
        message: `Invalid ${entryLabel(raw, index)}: ${field}${issue?.message ?? "invalid entry"}`,
      };
    }
    const combo = result.data as JsonRecord;
    const name = String(combo.name);
    if (seen.has(name)) {
      return { ok: false, code: "COMBO_004", message: `Duplicate combo name "${name}" in file` };
    }
    seen.add(name);
    parsed.push(combo);
  }

  const retained = context.existing.filter(
    (combo) => context.mode === "merge" || combo.isHidden === true
  );
  const retainedNames = new Set(retained.map((combo) => String(combo.name)));
  const skipped = parsed
    .filter((c) => retainedNames.has(String(c.name)))
    .map((c) => String(c.name));
  const candidates = parsed.filter((c) => !retainedNames.has(String(c.name)));
  const allNames = new Set([...retainedNames, ...candidates.map((c) => String(c.name))]);

  const toCreate: JsonRecord[] = [];
  for (const candidate of candidates) {
    const name = String(candidate.name);
    const combo: JsonRecord = {
      ...candidate,
      models: normalizeComboModels(candidate.models, { comboName: name, allCombos: allNames }),
    };
    if (isRecord(combo.config)) combo.config = stripDeadComboConfigKeys(combo.config);
    const composite = validateCompositeTiersConfig(combo);
    if (composite.success === false) {
      const failure = composite as { success: false; error: { message: string } };
      return {
        ok: false,
        code: "COMBO_003",
        message: `Invalid combo "${name}": ${sanitizeErrorMessage(failure.error.message)}`,
      };
    }
    toCreate.push(combo);
  }

  const finalSet = [...retained, ...toCreate] as Array<{ name: string; models: unknown[] }>;
  for (const combo of toCreate) {
    const config = isRecord(combo.config) ? combo.config : {};
    try {
      validateComboDAG(
        String(combo.name),
        finalSet as never,
        new Set(),
        0,
        clampComboDepth(config.maxComboDepth)
      );
    } catch (dagError) {
      return {
        ok: false,
        code: "COMBO_005",
        message: `Invalid combo "${combo.name}": ${sanitizeErrorMessage((dagError as Error).message)}`,
      };
    }
  }

  const warnings = Array.from(
    new Set(toCreate.flatMap((combo) => collectWarnings(combo, allNames, context.knownProviders)))
  );
  return { ok: true, value: { toCreate, skipped, warnings } };
}
